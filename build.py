import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
IMAGE_TYPES = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}
WEB_FILES = ("index.html", "app.js", "styles.css")


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    for filename in WEB_FILES:
        shutil.copy2(ROOT / filename, DIST / filename)

    for directory in ("assets", "menu"):
        source = ROOT / directory
        if source.is_dir():
            shutil.copytree(source, DIST / directory)

    restaurants = []
    menu_root = ROOT / "menu"
    if menu_root.is_dir():
        for folder in sorted(menu_root.iterdir(), key=lambda entry: entry.name.casefold()):
            if not folder.is_dir():
                continue
            photos = [
                {"name": image.name, "url": image.relative_to(ROOT).as_posix()}
                for image in sorted(folder.iterdir(), key=lambda entry: entry.name.casefold())
                if image.is_file() and image.suffix.lower() in IMAGE_TYPES
            ]
            if photos:
                restaurants.append({"name": folder.name, "photos": photos})

    api_dir = DIST / "api"
    api_dir.mkdir()
    (api_dir / "menus.json").write_text(
        json.dumps(restaurants, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Built static site in {DIST} with {len(restaurants)} menu folder(s).")


if __name__ == "__main__":
    main()
