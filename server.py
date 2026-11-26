import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parent
MENU_ROOT = ROOT / "menu"
IMAGE_TYPES = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}


class HomeHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if urlsplit(self.path).path not in {"/api/menus", "/api/menus.json"}:
            return super().do_GET()
        restaurants = []
        if MENU_ROOT.is_dir():
            for folder in sorted(MENU_ROOT.iterdir(), key=lambda entry: entry.name.casefold()):
                if not folder.is_dir():
                    continue
                photos = [
                    {
                        "name": image.name,
                        "url": image.relative_to(ROOT).as_posix(),
                    }
                    for image in sorted(folder.iterdir(), key=lambda entry: entry.name.casefold())
                    if image.is_file() and image.suffix.lower() in IMAGE_TYPES
                ]
                if photos:
                    restaurants.append({"name": folder.name, "photos": photos})
        body = json.dumps(restaurants, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    address = ("127.0.0.1", 8000)
    print(f"Home is ready at http://{address[0]}:{address[1]}")
    print(f"Scanning restaurant photos in {MENU_ROOT}")
    ThreadingHTTPServer(address, HomeHandler).serve_forever()
