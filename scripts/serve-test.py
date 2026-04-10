#!/usr/bin/env python3
"""
Serveur HTTP threading pour les tests Playwright.

Le `python3 -m http.server` natif est mono-thread et sature
sous la charge multi-worker de Playwright (jusqu'a 5 workers
en parallele tapant le meme port). Cela genere des tests flaky
sur les pages lourdes (videos, beaucoup d'images).

Ce script utilise ThreadingHTTPServer (stdlib Python 3.7+)
pour traiter chaque requete dans un thread dedie.

Usage:
    python3 scripts/serve-test.py [port] [directory]
    python3 scripts/serve-test.py 8080 src
"""
import os
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
directory = sys.argv[2] if len(sys.argv) > 2 else "src"

os.chdir(directory)
print(f"Serving HTTP on 127.0.0.1 port {port} (http://127.0.0.1:{port}/) from {os.getcwd()}")
ThreadingHTTPServer(("127.0.0.1", port), SimpleHTTPRequestHandler).serve_forever()
