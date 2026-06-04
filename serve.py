#!/usr/bin/env python3
"""Local dev server that mimics .htaccess clean URL rewriting."""
import http.server, os, urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = urllib.parse.unquote(path.split('?')[0])
        local = os.path.join(ROOT, path.lstrip('/'))
        # Exact file/dir exists — serve as-is
        if os.path.exists(local) and not os.path.isdir(local):
            return local
        # Directory with index.html
        if os.path.isdir(local):
            idx = os.path.join(local, 'index.html')
            if os.path.exists(idx):
                return idx
        # Try appending .html (clean URL → .html file)
        html = local.rstrip('/') + '.html'
        if os.path.exists(html):
            return html
        return local

    def log_message(self, fmt, *args):
        print(f"  {self.path}  →  {args[1]}")

os.chdir(ROOT)
port = 8080
print(f"\n  Local server: http://localhost:{port}")
print(f"  All clean URLs work (/about, /contact, /de/about …)\n")
http.server.test(HandlerClass=Handler, port=port, bind='')
