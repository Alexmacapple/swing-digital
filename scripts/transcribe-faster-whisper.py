#!/usr/bin/env python3
"""Transcrit les audios Swing Digital avec faster-whisper."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


SUPPORTED_EXTENSIONS = {".aac", ".aiff", ".flac", ".m4a", ".mp3", ".mp4", ".ogg", ".opus", ".wav", ".webm"}
DEFAULT_FORMATS = ("txt", "srt", "vtt", "json", "tsv")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Transcrire les fichiers audio/vidéo locaux avec faster-whisper.",
    )
    parser.add_argument("--input-dir", default="swing_audio", help="Dossier contenant les fichiers sources.")
    parser.add_argument("--output-dir", default="transcripts", help="Dossier de sortie des transcripts.")
    parser.add_argument("--model", default="medium", help="Modèle faster-whisper à utiliser.")
    parser.add_argument("--language", default="fr", help="Langue forcée pour la transcription.")
    parser.add_argument(
        "--task",
        choices=("transcribe", "translate"),
        default="transcribe",
        help="Tâche faster-whisper : transcribe pour la langue source, translate pour traduire vers l'anglais.",
    )
    parser.add_argument(
        "--output-suffix",
        default="",
        help="Suffixe ajouté au nom des sorties avant l'extension, par exemple fr ou en.",
    )
    parser.add_argument("--device", default="auto", help="Device faster-whisper : auto, cpu, cuda.")
    parser.add_argument("--compute-type", default="default", help="Compute type faster-whisper.")
    parser.add_argument("--beam-size", type=int, default=5, help="Beam size de décodage.")
    parser.add_argument("--vad-filter", action="store_true", help="Activer le filtrage VAD faster-whisper.")
    parser.add_argument(
        "--formats",
        default=",".join(DEFAULT_FORMATS),
        help="Formats de sortie séparés par des virgules : txt,srt,vtt,json,tsv.",
    )
    return parser.parse_args()


def format_timestamp(seconds: float, separator: str) -> str:
    milliseconds = round(seconds * 1000)
    hours = milliseconds // 3_600_000
    milliseconds %= 3_600_000
    minutes = milliseconds // 60_000
    milliseconds %= 60_000
    secs = milliseconds // 1000
    milliseconds %= 1000
    return f"{hours:02d}:{minutes:02d}:{secs:02d}{separator}{milliseconds:03d}"


def collect_sources(input_dir: Path) -> list[Path]:
    return sorted(
        path
        for path in input_dir.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )


def write_txt(path: Path, segments: list[dict[str, object]]) -> None:
    text = "\n".join(str(segment["text"]).strip() for segment in segments if str(segment["text"]).strip())
    path.write_text(text + "\n", encoding="utf-8")


def write_srt(path: Path, segments: list[dict[str, object]]) -> None:
    blocks = []
    for index, segment in enumerate(segments, start=1):
        start = format_timestamp(float(segment["start"]), ",")
        end = format_timestamp(float(segment["end"]), ",")
        text = str(segment["text"]).strip()
        blocks.append(f"{index}\n{start} --> {end}\n{text}")
    path.write_text("\n\n".join(blocks) + "\n", encoding="utf-8")


def write_vtt(path: Path, segments: list[dict[str, object]]) -> None:
    blocks = ["WEBVTT"]
    for segment in segments:
        start = format_timestamp(float(segment["start"]), ".")
        end = format_timestamp(float(segment["end"]), ".")
        text = str(segment["text"]).strip()
        blocks.append(f"{start} --> {end}\n{text}")
    path.write_text("\n\n".join(blocks) + "\n", encoding="utf-8")


def write_tsv(path: Path, segments: list[dict[str, object]]) -> None:
    lines = ["start\tend\ttext"]
    for segment in segments:
        text = str(segment["text"]).strip().replace("\t", " ")
        lines.append(f"{float(segment['start']):.3f}\t{float(segment['end']):.3f}\t{text}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_json(path: Path, source: Path, info: object, segments: list[dict[str, object]]) -> None:
    payload = {
        "source": str(source),
        "language": getattr(info, "language", None),
        "language_probability": getattr(info, "language_probability", None),
        "duration": getattr(info, "duration", None),
        "segments": segments,
    }
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def segment_to_dict(segment: object) -> dict[str, object]:
    return {
        "id": getattr(segment, "id", None),
        "start": getattr(segment, "start"),
        "end": getattr(segment, "end"),
        "text": getattr(segment, "text", ""),
        "avg_logprob": getattr(segment, "avg_logprob", None),
        "no_speech_prob": getattr(segment, "no_speech_prob", None),
    }


def write_outputs(
    output_dir: Path,
    source: Path,
    info: object,
    segments: list[dict[str, object]],
    formats: set[str],
    suffix: str = "",
) -> None:
    output_stem = f"{source.stem}.{suffix}" if suffix else source.stem
    base = output_dir / output_stem
    output_path = lambda extension: base.parent / f"{base.name}.{extension}"
    if "txt" in formats:
        write_txt(output_path("txt"), segments)
    if "srt" in formats:
        write_srt(output_path("srt"), segments)
    if "vtt" in formats:
        write_vtt(output_path("vtt"), segments)
    if "json" in formats:
        write_json(output_path("json"), source, info, segments)
    if "tsv" in formats:
        write_tsv(output_path("tsv"), segments)


def main() -> int:
    args = parse_args()
    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)
    formats = {item.strip().lower() for item in args.formats.split(",") if item.strip()}
    unknown_formats = formats - set(DEFAULT_FORMATS)
    if unknown_formats:
        raise SystemExit(f"Formats non supportés : {', '.join(sorted(unknown_formats))}")
    if not input_dir.is_dir():
        raise SystemExit(f"Dossier source introuvable : {input_dir}")

    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        raise SystemExit("Module faster-whisper introuvable dans ce Python.") from exc

    sources = collect_sources(input_dir)
    if not sources:
        raise SystemExit(f"Aucun fichier audio/vidéo trouvé dans {input_dir}")

    output_dir.mkdir(parents=True, exist_ok=True)
    model = WhisperModel(args.model, device=args.device, compute_type=args.compute_type)

    for source in sources:
        print(f"{args.task} : {source}")
        raw_segments, info = model.transcribe(
            str(source),
            language=args.language,
            task=args.task,
            beam_size=args.beam_size,
            vad_filter=args.vad_filter,
        )
        segments = [segment_to_dict(segment) for segment in raw_segments]
        write_outputs(output_dir, source, info, segments, formats, args.output_suffix.strip())

    print(f"Terminé : {len(sources)} fichier(s), sortie {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
