"""Local dev server for the SWUT site with caching disabled.

Serves the site at both / and /swut-html/ — the second mirrors how GitHub
Pages mounts this project, so pages that reference absolute /swut-html/
paths (404.html) behave locally exactly as they do in production. Misses
serve 404.html with a 404 status, as Pages does.

Usage: python serve.py [port]   (default 3000)
"""
import http.server
import os
import posixpath
import sys
import urllib.parse
from functools import partial

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
PREFIX = "/swut-html"


class SiteHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean = urllib.parse.urlparse(path).path
        if clean == PREFIX or clean.startswith(PREFIX + "/"):
            path = clean[len(PREFIX):] or "/"
        return super().translate_path(path)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            page = os.path.join(ROOT, "404.html")
            if os.path.exists(page):
                body = open(page, "rb").read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                if self.command != "HEAD":
                    self.wfile.write(body)
                return
        super().send_error(code, message, explain)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    handler = partial(SiteHandler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
        print(f"Serving {ROOT}")
        print(f"  site:      http://localhost:{PORT}/")
        print(f"  as Pages:  http://localhost:{PORT}{PREFIX}/")
        httpd.serve_forever()
