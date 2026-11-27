#

This is a browser-based restaurant menu assistant for restaurants near INTI
Nilai. The home page lists restaurant menus and includes a chat assistant for
looking up dishes and prices or comparing the same dish across restaurants.
Restaurant pages show original menu photos above translated menu items, customer
orders, and price comparisons. Malay menu names are shown with English and
Myanmar translations; English menu names are shown with Myanmar translations.
Items without a readable price are labelled **Price not found**.

The app scans the `menu/` directory for restaurant subfolders and photos, reads
Malay and English menu text with Tesseract.js sparse-text recognition, pairs
nearby dish names and prices, and filters unclear text fragments before adding
items. Common OCR misspellings use the reviewed glossary; unfamiliar
translations can be corrected in the app. Unreviewed, low-confidence OCR
fragments already saved as menu items are removed when the app loads.

## Run locally

From this directory, run:

```sh
python3 server.py
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). Keep the server running so
Home can discover photos in `menu/`. Organize existing menus as
`menu/Restaurant name/photo.jpg`. You can also create a restaurant and upload
photos in the app.

## Publish on Netlify

Connect this project directory to a Git provider and import the repository in
Netlify. The included `netlify.toml` runs `python3 build.py`, which creates the
static site in `dist/`, includes the `menu/` photos, and generates the menu
folder index used by the app. Netlify publishes `dist/`; no server process is
needed. Each deployment includes the menu photos currently committed in `menu/`.

The app's restaurant edits, uploaded photos, and customer orders remain in the
individual visitor's browser storage; they are not shared across browsers or
devices. Menu photos used for the initial folder scan must be included in the
deployment.

Photo recognition and translation use online services and need an internet
connection. OCR shows its confidence as a photo-quality indicator; unclear
results are flagged for review. A menu item without a readable price is shown as **Price not found** and can
still be added to an order. Use **Compare prices** on a dish to see its saved
prices at other restaurants, or ask the chat assistant to compare a dish by
name. Use **Correct translation** to update a dish name, translations, or price.

The **Hear Malay** action uses Google Translate's free text-to-speech endpoint,
with the device's Malay voice as a fallback. Availability may vary by network
and browser.

Original uploaded photos are saved in this browser's IndexedDB and shown at the
top of each restaurant page. Photos already stored in the `menu/` folder are
displayed from their original files. Restaurant menus and customer orders are
saved in this browser's local storage. Customer orders can be loaded, updated,
or deleted from the restaurant page.

Deleting a restaurant removes its saved menu, customer orders, and browser
copies of uploaded photos. Source photos in the `menu/` folder are not deleted.
Folder-backed restaurants can be hidden after deletion and restored using
**Import menu folder** in the **Add a restaurant** dialog.
