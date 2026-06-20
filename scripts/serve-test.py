#!/usr/bin/env python3
"""
Serveur HTTP threading pour les tests Playwright.

Le `python3 -m http.server` natif est mono-thread et sature
sous la charge multi-worker de Playwright (jusqu'à 5 workers
en parallèle tapant le même port). Cela génère des tests flaky
sur les pages lourdes (vidéos, beaucoup d'images).

Ce script utilise ThreadingHTTPServer (stdlib Python 3.7+)
pour traiter chaque requête dans un thread dédié.

Usage:
    python3 scripts/serve-test.py [port] [directory]
    python3 scripts/serve-test.py 8080 src
"""
import os
import sys
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

try:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
except ValueError:
    print(f"[ERREUR] Port invalide : {sys.argv[1]}")
    sys.exit(1)

directory = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else "src")

if not os.path.isdir(directory):
    print(f"[ERREUR] Répertoire introuvable : {directory}")
    sys.exit(1)

handler = partial(SimpleHTTPRequestHandler, directory=directory)
print(f"Serving HTTP on 127.0.0.1 port {port} (http://127.0.0.1:{port}/) from {directory}")
ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
