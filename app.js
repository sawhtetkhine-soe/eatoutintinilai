const STORAGE_KEY = "rasa.restaurantMenus.v2";
const CUSTOMER_ORDERS_KEY = "home.customerOrders.v1";
const HIDDEN_FOLDERS_KEY = "rasa.hiddenMenuFolders.v1";
const TRANSLATION_URL = "https://api.mymemory.translated.net/get";
const HIDDEN_MENU_FOLDERS = loadHiddenMenuFolders();
const DISH_TRANSLATIONS = {
  "ayam goreng": { english: "Fried chicken", myanmar: "ကြက်သားကြော်" },
  "ayam bakar": { english: "Grilled chicken", myanmar: "ကြက်သားကင်" },
  "nasi lemak": { english: "Coconut rice served with sambal and traditional sides", myanmar: "အုန်းနို့ထမင်းကို ဆမ်ဘာလ်ငရုတ်သီးဆော့စ်နှင့် အရံဟင်းများဖြင့် တည်ခင်းထားသည်" },
  "nasi goreng": { english: "Fried rice", myanmar: "ထမင်းကြော်" },
  "mee goreng": { english: "Stir-fried noodles", myanmar: "ခေါက်ဆွဲကြော်" },
  "teh tarik": { english: "Malaysian pulled milk tea", myanmar: "မလေးရှားစတိုင် ဆွဲဖျော်နို့လက်ဖက်ရည်" },
  "roti canai": { english: "Flaky Malaysian flatbread", myanmar: "အလွှာထပ် မလေးရှားရိုတီပေါင်မုန့်" },
  "satay": { english: "Grilled skewers, usually served with peanut sauce", myanmar: "အကင်တုတ်ထိုး၊ များသောအားဖြင့် မြေပဲဆော့စ်နှင့် တည်ခင်းသည်" },
  "sate": { english: "Grilled skewers, usually served with peanut sauce", myanmar: "အကင်တုတ်ထိုး၊ များသောအားဖြင့် မြေပဲဆော့စ်နှင့် တည်ခင်းသည်" },
  "laksa": { english: "Spicy noodle soup", myanmar: "စပ်သော ခေါက်ဆွဲဟင်းရည်" },
  "sambal": { english: "Chilli paste or sauce", myanmar: "ငရုတ်သီးဆော့စ်" },
  "ikan bakar": { english: "Grilled fish", myanmar: "ငါးကင်" },
  "ikan goreng": { english: "Fried fish", myanmar: "ငါးကြော်" },
  "soup ayam": { english: "Chicken soup", myanmar: "ကြက်သားဟင်းရည်" },
  "sup ayam": { english: "Chicken soup", myanmar: "ကြက်သားဟင်းရည်" },
  "daging lembu": { english: "Beef", myanmar: "အမဲသား" },
  "kambing": { english: "Lamb", myanmar: "သိုးသား" },
  "udang": { english: "Prawns", myanmar: "ပုစွန်" },
  "telur": { english: "Egg", myanmar: "ကြက်ဥ" },
  "sayur": { english: "Vegetables", myanmar: "ဟင်းသီးဟင်းရွက်များ" },
  "chicken chop": { english: "Chicken chop", myanmar: "ကြက်သားချော့ပ်" },
  "chicken grill": { english: "Grilled chicken", myanmar: "ကြက်သားကင်" },
  "lamb chop": { english: "Lamb chop", myanmar: "သိုးသားချော့ပ်" },
  "fish and chips": { english: "Fish and chips", myanmar: "ငါးကြော်နှင့် အာလူးချောင်းကြော်" },
  "fish chips": { english: "Fish and chips", myanmar: "ငါးကြော်နှင့် အာလူးချောင်းကြော်" },
  "beef steak": { english: "Beef steak", myanmar: "အမဲသားစတိတ်" },
  "beef steaks": { english: "Beef steaks", myanmar: "အမဲသားစတိတ်" },
  "french fries": { english: "French fries", myanmar: "အာလူးချောင်းကြော်" },
  "french fries cheese": { english: "Cheese fries", myanmar: "ချိစ်ဆော့စ်ဖြင့် အာလူးချောင်းကြော်" },
  "cheese wages": { english: "Cheese wedges", myanmar: "ချိစ်အာလူးစိတ်ကြော်" },
  "cheese wagges": { english: "Cheese wedges", myanmar: "ချိစ်အာလူးစိတ်ကြော်" },
  "french nuggets": { english: "French fries and chicken nuggets", myanmar: "အာလူးချောင်းကြော်နှင့် ကြက်သားနဂတ်" },
  "fries nuggets": { english: "French fries and chicken nuggets", myanmar: "အာလူးချောင်းကြော်နှင့် ကြက်သားနဂတ်" },
  "french and nuggets": { english: "French fries and chicken nuggets", myanmar: "အာလူးချောင်းကြော်နှင့် ကြက်သားနဂတ်" },
  "chicken nuggets": { english: "Chicken nuggets", myanmar: "ကြက်သားနဂတ်" },
  "cheese wedges": { english: "Cheese wedges", myanmar: "ချိစ်အာလူးစိတ်ကြော်" },
  "cheeze wages": { english: "Cheese wedges", myanmar: "ချိစ်အာလူးစိတ်ကြော်" },
  "cheeze wagges": { english: "Cheese wedges", myanmar: "ချိစ်အာလူးစိတ်ကြော်" },
  "salad": { english: "Salad", myanmar: "အသုပ်" },
  "chicken chop with fries": { english: "Chicken chop with fries", myanmar: "ကြက်သားချော့ပ်နှင့် အာလူးချောင်းကြော်" },
  "nasi ayam penyet": { english: "Rice with smashed fried chicken", myanmar: "ထမင်းနှင့် ထောင်းထားသော ကြက်သားကြော်" },
  "ayam penyet": { english: "Smashed fried chicken", myanmar: "ထောင်းထားသော ကြက်သားကြော်" },
  "ikan keli penyet": { english: "Smashed fried catfish", myanmar: "ထောင်းထားသော ငါးခူကြော်" },
  "nasi set budu": { english: "Rice set served with budu, a fermented fish sauce", myanmar: "ဘူဒူငါးချဉ်ဆော့စ်ဖြင့် တည်ခင်းသော ထမင်းဟင်းပွဲ" },
  "orange": { english: "Orange", myanmar: "လိမ္မော်သီး" },
  "apple": { english: "Apple", myanmar: "ပန်းသီး" },
  "tembikai laici": { english: "Watermelon and lychee drink", myanmar: "ဖရဲသီးနှင့် လိုင်ချီးသီးဖျော်ရည်" },
  "tembikai": { english: "Watermelon", myanmar: "ဖရဲသီး" },
  "laici": { english: "Lychee", myanmar: "လိုင်ချီးသီး" },
  "longan": { english: "Longan", myanmar: "လုံဂန်သီး" },
  "nenas": { english: "Pineapple", myanmar: "နာနတ်သီး" },
  "carrot": { english: "Carrot", myanmar: "မုန်လာဥနီ" },
  "nanas": { english: "Pineapple", myanmar: "နာနတ်သီး" },
  "kopi": { english: "Coffee", myanmar: "ကော်ဖီ" },
  "kopi o": { english: "Black coffee", myanmar: "ကော်ဖီကြမ်း" },
  "milo": { english: "Milo malt drink", myanmar: "မိုင်လို မော့လ်တ်အချိုရည်" },
  "nescafe": { english: "Nescafé coffee", myanmar: "နက်စကဖေးကော်ဖီ" },
  "nescafe o": { english: "Black Nescafé coffee", myanmar: "နက်စကဖေးကော်ဖီကြမ်း" },
  "teh o": { english: "Black tea", myanmar: "လက်ဖက်ရည်ကြမ်း" },
  "teh": { english: "Tea", myanmar: "လက်ဖက်ရည်" },
  "sirap": { english: "Sweet syrup drink", myanmar: "ဆီးရပ်အချိုရည်" },
  "limau": { english: "Lime", myanmar: "သံပရာသီး" },
  "asam boi": { english: "Preserved plum", myanmar: "ဆားစိမ်ဇီးသီး" },
  "air buah buahan": { english: "Fruit drinks", myanmar: "သစ်သီးအချိုရည်များ" },
  "chocolate": { english: "Chocolate", myanmar: "ချောကလက်" },
  "cappuccino": { english: "Cappuccino", myanmar: "ကာပူချီနို" },
  "mocha": { english: "Mocha", myanmar: "မိုခါကော်ဖီ" },
  "latte": { english: "Latte", myanmar: "လတ်တေးကော်ဖီ" },
  "orange juice": { english: "Orange juice", myanmar: "လိမ္မော်ရည်" },
  "apple juice": { english: "Apple juice", myanmar: "ပန်းသီးဖျော်ရည်" },
  "ayam": { english: "Chicken", myanmar: "ကြက်သား" },
  "ikan": { english: "Fish", myanmar: "ငါး" },
  "goreng": { english: "Fried", myanmar: "ကြော်" },
};
const MALAY_GLOSSARY_KEYS = new Set([
  "ayam goreng", "ayam bakar", "nasi lemak", "nasi goreng", "mee goreng", "teh tarik", "roti canai", "sate", "satay",
  "sambal", "ikan bakar", "ikan goreng", "sup ayam", "daging lembu", "kambing", "udang", "telur", "sayur", "nasi ayam penyet",
  "ayam penyet", "ikan keli penyet", "nasi set budu", "tembikai", "laici", "nenas", "nanas", "kopi", "teh o", "teh", "sirap",
  "limau", "asam boi", "air buah buahan", "tembikai laici", "kopi o", "nescafe o", "ayam", "ikan", "goreng",
]);
const restaurants = loadRestaurants();
let customerOrders = loadCustomerOrders();
const quantities = new Map();
let activeRestaurantId = null;
let activeCustomerOrderId = null;
let activeLanguage = "en";
let ocrWorkerPromise = null;
let ocrQueue = Promise.resolve();
let photoDatabasePromise = null;
let audioPlayer = null;
const originalPhotoUrls = new Set();

const homeView = document.querySelector("#homeView");
const restaurantView = document.querySelector("#restaurantView");
const restaurantGrid = document.querySelector("#restaurantGrid");
const homeStatus = document.querySelector("#homeStatus");
const detailStatus = document.querySelector("#detailStatus");
const createDialog = document.querySelector("#createDialog");
const editDishDialog = document.querySelector("#editDishDialog");
const deleteDialog = document.querySelector("#deleteDialog");

function loadRestaurants() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) throw new Error("Saved restaurant data has an unexpected format.");
    return stored.filter((restaurant) => restaurant && typeof restaurant.id === "string" && typeof restaurant.name === "string" && Array.isArray(restaurant.items));
  } catch (error) {
    console.error("Could not load saved restaurants.", error);
    return [];
  }
}

function loadCustomerOrders() {
  try {
    const stored = JSON.parse(localStorage.getItem(CUSTOMER_ORDERS_KEY) || "[]");
    if (!Array.isArray(stored)) throw new Error("Saved customer orders have an unexpected format.");
    return stored.filter((order) => order && typeof order.id === "string" && typeof order.restaurantId === "string"
      && typeof order.customerName === "string" && Array.isArray(order.items));
  } catch (error) {
    console.error("Could not load saved customer orders.", error);
    return [];
  }
}

function saveCustomerOrders() {
  try {
    localStorage.setItem(CUSTOMER_ORDERS_KEY, JSON.stringify(customerOrders));
    return true;
  } catch (error) {
    console.error("Could not save customer orders.", error);
    setStatus(detailStatus, "Couldn’t save customer orders in this browser. Check available storage space or browser settings.", true);
    return false;
  }
}

function openPhotoDatabase() {
  if (!("indexedDB" in window)) return Promise.reject(new Error("This browser does not support saving original menu photos."));
  if (!photoDatabasePromise) {
    photoDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("home-menu-photos", 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains("photos")) request.result.createObjectStore("photos", { keyPath: "id" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Couldn’t open photo storage."));
    });
  }
  return photoDatabasePromise;
}

async function saveOriginalPhoto(id, restaurantId, file) {
  const database = await openPhotoDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction("photos", "readwrite");
    transaction.objectStore("photos").put({ id, restaurantId, name: file.name, blob: file });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Couldn’t save the original photo."));
    transaction.onabort = () => reject(transaction.error || new Error("Saving the original photo was cancelled."));
  });
}

async function getOriginalPhoto(id) {
  const database = await openPhotoDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction("photos", "readonly").objectStore("photos").get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error("Couldn’t read an original photo."));
  });
}

async function deleteOriginalPhotos(restaurantId) {
  const database = await openPhotoDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction("photos", "readwrite");
    const store = transaction.objectStore("photos");
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      if (cursor.value.restaurantId === restaurantId) cursor.delete();
      cursor.continue();
    };
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Couldn’t remove saved original photos."));
  });
}

async function deleteOriginalPhoto(id) {
  const database = await openPhotoDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction("photos", "readwrite");
    transaction.objectStore("photos").delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Couldn’t remove the saved photo."));
  });
}

function saveRestaurantsWithPhoto(restaurant, photo) {
  restaurant.originalPhotos ||= [];
  restaurant.originalPhotos.push(photo);
  const previousSourceFiles = restaurant.sourceFiles;
  if (photo.sourcePath) restaurant.sourceFiles = [...new Set([...(restaurant.sourceFiles || []), photo.sourcePath])];
  if (saveRestaurants()) return true;
  restaurant.originalPhotos.pop();
  if (previousSourceFiles) restaurant.sourceFiles = previousSourceFiles;
  else delete restaurant.sourceFiles;
  return false;
}

function saveHiddenMenuFolders() {
  try {
    localStorage.setItem(HIDDEN_FOLDERS_KEY, JSON.stringify([...HIDDEN_MENU_FOLDERS]));
    return true;
  } catch (error) {
    console.error("Could not save deleted restaurant folder preferences.", error);
    setStatus(activeRestaurantId ? detailStatus : homeStatus, "Couldn’t save restaurant deletion preferences in this browser.", true);
    return false;
  }
}

function loadHiddenMenuFolders() {
  try {
    const stored = JSON.parse(localStorage.getItem(HIDDEN_FOLDERS_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored.filter((name) => typeof name === "string") : []);
  } catch (error) {
    console.error("Could not load deleted restaurant folder preferences.", error);
    return new Set();
  }
}

function saveRestaurants() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
    return true;
  } catch (error) {
    console.error("Could not save restaurants.", error);
    const message = "Couldn’t save menu changes in this browser. Check available storage space or browser settings.";
    setStatus(activeRestaurantId ? detailStatus : homeStatus, message, true);
    return false;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function makeId(prefix = "id") {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`}`;
}

function setStatus(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("error", isError);
}

function formatPrice(price) {
  const value = Number(price);
  return price === null || price === "" || !Number.isFinite(value) ? "?" : `RM ${value.toFixed(2)}`;
}

function renderRestaurants() {
  const count = restaurants.length;
  document.querySelector("#restaurantCount").textContent = `${count} ${count === 1 ? "restaurant" : "restaurants"}`;
  if (!count) {
    restaurantGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">🍽️</div>
        <h3>Your collection starts here.</h3>
        <p>Add a restaurant and upload its menu photos, or import a menu folder organized with one folder per restaurant.</p>
        <button class="primary-button" type="button" data-open-create>＋ Add your first restaurant</button>
      </div>
    `;
    return;
  }
  restaurantGrid.innerHTML = restaurants.map((restaurant) => `
    <article class="restaurant-card" role="button" tabindex="0" data-restaurant="${escapeHtml(restaurant.id)}" aria-label="Open ${escapeHtml(restaurant.name)} menu">
      <div class="restaurant-icon" aria-hidden="true">${restaurant.cover ? `<img src="${escapeHtml(restaurant.cover)}" alt="" />` : "🍴"}</div>
      <h3 class="restaurant-name">${escapeHtml(restaurant.name)}</h3>
      <span class="restaurant-meta">${restaurant.items.length} ${restaurant.items.length === 1 ? "dish" : "dishes"} on the menu</span>
      <span class="card-arrow" aria-hidden="true">↗</span>
    </article>
  `).join("");
}

function getActiveRestaurant() {
  return restaurants.find((restaurant) => restaurant.id === activeRestaurantId) || null;
}

function showHome() {
  activeRestaurantId = null;
  activeCustomerOrderId = null;
  quantities.clear();
  restaurantView.hidden = true;
  homeView.hidden = false;
  renderRestaurants();
}

function openRestaurant(id) {
  const restaurant = restaurants.find((entry) => entry.id === id);
  if (!restaurant) return;
  activeRestaurantId = id;
  activeCustomerOrderId = null;
  quantities.clear();
  document.querySelector("#customerName").value = "";
  activeLanguage = "en";
  homeView.hidden = true;
  restaurantView.hidden = false;
  setStatus(detailStatus, "");
  renderDetail();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDetail() {
  const restaurant = getActiveRestaurant();
  if (!restaurant) return showHome();
  document.querySelector("#detailHeading").innerHTML = `
    <h1>${escapeHtml(restaurant.name)}</h1>
    <p>${restaurant.items.length} ${restaurant.items.length === 1 ? "dish" : "dishes"} from your menu photos</p>
  `;
  document.querySelectorAll(".language-button").forEach((button) => {
    const selected = button.dataset.language === activeLanguage;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderDishes(restaurant);
  renderOriginalPhotos(restaurant);
  renderOrder();
}

function renderDishes(restaurant) {
  const dishGrid = document.querySelector("#dishGrid");
  if (!restaurant.items.length) {
    dishGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">📷</div>
        <h3>No menu dishes yet.</h3>
        <p>Upload a clear photo of the menu. Home will read dish names and translate them. Prices not found are shown as ?.</p>
        <label class="primary-button" for="restaurantPhotoInput">＋ Upload menu photos</label>
      </div>
    `;
    return;
  }
  const translationKey = activeLanguage === "my" ? "myanmar" : "english";
  dishGrid.innerHTML = restaurant.items.map((item) => `
    <article class="dish-card">
      <div class="dish-art ${escapeHtml(item.art || "rice")}" aria-hidden="true"><div class="plate">${escapeHtml(item.icon || "🍽️")}</div></div>
      <div class="dish-info">
        <div class="dish-category ${item.category === "Review photo reading" ? "review-category" : ""}">${escapeHtml(item.category || "From your menu")} · ${item.photoConfidence == null ? "Manually checked" : `Photo quality ${Math.round(item.photoConfidence)}%`}</div>
        <div class="dish-name-row"><div class="dish-name" title="${escapeHtml(getDisplayDishName(item))}">${escapeHtml(getDisplayDishName(item))}</div><span class="dish-price">${formatPrice(getDishPrice(item))}</span></div>
        <p class="dish-description">${escapeHtml(getDishTranslation(item, translationKey))}</p>
        <div class="dish-bottom">
          <button class="audio-button" type="button" data-speak="${escapeHtml(item.name)}" aria-label="Hear ${escapeHtml(item.name)} in Malay">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6v4h3l4 3V3L5 6H2Zm9-1a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10" /></svg>
            Hear Malay
          </button>
          <button class="edit-dish-button" type="button" data-edit="${escapeHtml(item.id)}">Correct translation</button>
          <button class="add-button" type="button" data-add="${escapeHtml(item.id)}" aria-label="Add ${escapeHtml(item.name)} to your order">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function getDishTranslation(item, language) {
  if (item.translationReviewed || item.sourceText) return item[language] || item.name;
  const known = knownTranslation(item.name);
  return known?.[language] || item[language] || item.english || item.name;
}

function getDisplayDishName(item) {
  if (item.translationReviewed) return item.name;
  const known = findKnownTranslation(item.sourceText || item.name);
  if (known) {
    return isLikelyMalay(item.sourceText || item.name) || MALAY_GLOSSARY_KEYS.has(known.key)
      ? known.key.replace(/\b\w/g, (letter) => letter.toUpperCase())
      : known.translation.english;
  }
  return cleanOcrName(item.name) || item.name;
}

function getDishPrice(item) {
  if (item.price === null || item.price === undefined || item.price === "") return null;
  const price = Number(item.price);
  if (!item.translationReviewed && item.category === "Review photo reading" && Number.isInteger(price) && price >= 100 && price < 1000 && price % 100 === 0) {
    return price / 100;
  }
  return price;
}

function renderOrder() {
  const restaurant = getActiveRestaurant();
  if (!restaurant) return;
  let total = 0;
  let count = 0;
  let hasUnknownPrice = false;
  const rows = [];
  for (const [id, quantity] of quantities) {
    const item = restaurant.items.find((entry) => entry.id === id);
    if (!item || quantity < 1) continue;
    count += quantity;
    const price = getDishPrice(item);
    if (price == null || !Number.isFinite(price)) hasUnknownPrice = true;
    else total += price * quantity;
    rows.push(`
      <div class="order-row">
        <span class="order-dish">${escapeHtml(getDisplayDishName(item))}</span>
        <div class="order-controls">
          <button class="quantity-button" type="button" data-change="${escapeHtml(id)}" data-delta="-1" aria-label="Remove one ${escapeHtml(item.name)}">−</button>
          <span class="quantity-number">${quantity}</span>
          <button class="quantity-button" type="button" data-change="${escapeHtml(id)}" data-delta="1" aria-label="Add one ${escapeHtml(item.name)}">+</button>
          <span class="order-subtotal">${price == null ? "?" : formatPrice(price * quantity)}</span>
        </div>
      </div>
    `);
  }
  document.querySelector("#orderList").innerHTML = rows.length ? rows.join("") : '<p class="empty-order">Your table is waiting. Add a dish to get started.</p>';
  document.querySelector("#itemCount").textContent = `${count} ${count === 1 ? "item" : "items"}`;
  document.querySelector("#orderTotal").textContent = hasUnknownPrice ? `${formatPrice(total)} + ?` : formatPrice(total);
  document.querySelector("#updateCustomerOrder").disabled = !activeCustomerOrderId;
  document.querySelector("#deleteCustomerOrder").disabled = !activeCustomerOrderId;
  renderSavedCustomerOrders(restaurant);
}

function changeQuantity(id, amount) {
  const next = (quantities.get(id) || 0) + amount;
  if (next > 0) quantities.set(id, next);
  else quantities.delete(id);
  renderOrder();
}

async function renderOriginalPhotos(restaurant) {
  for (const url of originalPhotoUrls) URL.revokeObjectURL(url);
  originalPhotoUrls.clear();
  const grid = document.querySelector("#originalPhotoGrid");
  const photos = restaurant.originalPhotos || [];
  document.querySelector("#originalPhotoCount").textContent = `${photos.length} ${photos.length === 1 ? "photo" : "photos"}`;
  if (!photos.length) {
    grid.innerHTML = '<p class="photo-library-empty">No original menu photos have been saved yet.</p>';
    return;
  }
  const rendered = [];
  for (const photo of photos) {
    let src = "";
    if (photo.sourcePath) {
      src = `/${photo.sourcePath.split("/").map(encodeURIComponent).join("/")}`;
    } else {
      try {
        const record = await getOriginalPhoto(photo.id);
        if (record?.blob) {
          src = URL.createObjectURL(record.blob);
          originalPhotoUrls.add(src);
        }
      } catch (error) {
        console.error("Could not load an original menu photo.", error);
        setStatus(detailStatus, `Couldn’t show ${photo.name}: ${error.message}`, true);
      }
    }
    if (src) rendered.push(`<figure><img src="${escapeHtml(src)}" alt="Original menu photo: ${escapeHtml(photo.name)}" loading="lazy" /><figcaption>${escapeHtml(photo.name)}</figcaption></figure>`);
  }
  if (activeRestaurantId === restaurant.id) grid.innerHTML = rendered.length ? rendered.join("") : '<p class="photo-library-empty">Original photos could not be loaded from storage.</p>';
}

async function speakMalay(text) {
  setStatus(detailStatus, "Loading Malay audio…");
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer = null;
  }
  const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ms&q=${encodeURIComponent(text.slice(0, 200))}`;
  audioPlayer = new Audio(audioUrl);
  audioPlayer.onended = () => setStatus(detailStatus, "");
  audioPlayer.onerror = () => {
    if (typeof SpeechSynthesisUtterance !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ms-MY";
      utterance.onerror = () => setStatus(detailStatus, "Malay audio is unavailable from the free audio service and this device.", true);
      window.speechSynthesis.speak(utterance);
      setStatus(detailStatus, "Free audio service unavailable; using your device’s Malay voice.");
      return;
    }
    setStatus(detailStatus, "Couldn’t play Malay audio. Check your connection and try again.", true);
  };
  try {
    await audioPlayer.play();
  } catch (error) {
    console.error("Could not play Malay audio from the free speech service.", error);
    audioPlayer.onerror();
  }
}

function renderSavedCustomerOrders(restaurant) {
  const list = document.querySelector("#savedOrderList");
  const orders = customerOrders.filter((order) => order.restaurantId === restaurant.id);
  list.innerHTML = orders.length ? orders.map((order) => {
    const descriptions = [];
    let total = 0;
    let hasUnknown = false;
    for (const entry of order.items) {
      const item = restaurant.items.find((candidate) => candidate.id === entry.id);
      if (!item || entry.quantity < 1) continue;
      descriptions.push(`${getDisplayDishName(item)} × ${entry.quantity}`);
      const price = getDishPrice(item);
      if (price == null || !Number.isFinite(price)) hasUnknown = true;
      else total += price * entry.quantity;
    }
    return `<button class="saved-order-card ${order.id === activeCustomerOrderId ? "selected" : ""}" type="button" data-load-order="${escapeHtml(order.id)}">
      <strong>${escapeHtml(order.customerName)}</strong>
      <span>${escapeHtml(descriptions.join(", ") || "No available items")}</span>
      <small>Total: ${hasUnknown ? `${formatPrice(total)} + ?` : formatPrice(total)}</small>
    </button>`;
  }).join("") : '<p class="saved-orders-empty">No customer orders saved for this restaurant yet.</p>';
}

function currentOrderItems() {
  return [...quantities.entries()]
    .filter(([, quantity]) => Number.isInteger(quantity) && quantity > 0)
    .map(([id, quantity]) => ({ id, quantity }));
}

function saveCustomerOrder() {
  const restaurant = getActiveRestaurant();
  const customerName = document.querySelector("#customerName").value.trim();
  const items = currentOrderItems();
  const status = document.querySelector("#customerOrderStatus");
  if (!restaurant) return;
  if (!customerName) {
    setStatus(status, "Enter a customer name before saving an order.", true);
    document.querySelector("#customerName").focus();
    return;
  }
  if (!items.length) {
    setStatus(status, "Add at least one menu item before saving this order.", true);
    return;
  }
  const order = { id: makeId("order"), restaurantId: restaurant.id, customerName, items, updatedAt: new Date().toISOString() };
  customerOrders.unshift(order);
  if (!saveCustomerOrders()) {
    customerOrders.shift();
    return;
  }
  activeCustomerOrderId = order.id;
  setStatus(status, `Saved ${customerName}’s order.`);
  renderOrder();
}

function updateCustomerOrder() {
  const restaurant = getActiveRestaurant();
  const order = customerOrders.find((entry) => entry.id === activeCustomerOrderId && entry.restaurantId === restaurant?.id);
  const customerName = document.querySelector("#customerName").value.trim();
  const status = document.querySelector("#customerOrderStatus");
  const items = currentOrderItems();
  if (!order) {
    setStatus(status, "Load a saved customer order before updating it.", true);
    return;
  }
  if (!customerName || !items.length) {
    setStatus(status, "Enter a customer name and add at least one menu item.", true);
    return;
  }
  const previous = { ...order, items: order.items.map((item) => ({ ...item })) };
  Object.assign(order, { customerName, items, updatedAt: new Date().toISOString() });
  if (!saveCustomerOrders()) {
    Object.assign(order, previous);
    return;
  }
  setStatus(status, `Updated ${customerName}’s order.`);
  renderOrder();
}

function deleteCustomerOrder() {
  const index = customerOrders.findIndex((entry) => entry.id === activeCustomerOrderId);
  const status = document.querySelector("#customerOrderStatus");
  if (index < 0) {
    setStatus(status, "Load a saved customer order before deleting it.", true);
    return;
  }
  const [removed] = customerOrders.splice(index, 1);
  if (!saveCustomerOrders()) {
    customerOrders.splice(index, 0, removed);
    return;
  }
  activeCustomerOrderId = null;
  quantities.clear();
  document.querySelector("#customerName").value = "";
  setStatus(status, `${removed.customerName}’s order was deleted.`);
  renderOrder();
}

function loadCustomerOrder(id) {
  const restaurant = getActiveRestaurant();
  const order = customerOrders.find((entry) => entry.id === id && entry.restaurantId === restaurant?.id);
  if (!restaurant || !order) return;
  quantities.clear();
  for (const entry of order.items) {
    if (restaurant.items.some((item) => item.id === entry.id) && Number.isInteger(entry.quantity) && entry.quantity > 0) {
      quantities.set(entry.id, entry.quantity);
    }
  }
  activeCustomerOrderId = order.id;
  document.querySelector("#customerName").value = order.customerName;
  setStatus(document.querySelector("#customerOrderStatus"), `Loaded ${order.customerName}’s saved order. Edit items, then choose Update.`);
  renderOrder();
}

function normalizeText(text) {
  return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function answerMenuQuestion(question) {
  const query = normalizeText(question);
  const allItems = restaurants.flatMap((restaurant) => restaurant.items.map((item) => ({ item, restaurant })));
  if (!restaurants.length) return "There aren’t any restaurants in your collection yet. Add a restaurant and upload its menu photos to get started.";
  if (/(what restaurants|which restaurants|list restaurants|all restaurants|restaurants are here)/.test(query)) {
    return `Your restaurants: ${restaurants.map((restaurant) => `${restaurant.name} (${restaurant.items.length} dishes)`).join(", ")}.`;
  }
  if (/(vegetarian|vegan|meat free|without meat)/.test(query)) {
    const vegetarianItems = allItems.filter(({ item }) => item.vegetarian === true);
    return vegetarianItems.length
      ? `Menu items marked vegetarian: ${vegetarianItems.map(({ item, restaurant }) => `${getDisplayDishName(item)} at ${restaurant.name} (${formatPrice(getDishPrice(item))})`).join(", ")}. Please confirm ingredients with the restaurant.`
      : "I can’t confirm vegetarian options from the saved menu photos. Please ask the restaurant about ingredients.";
  }
  if (/(all dishes|full menu|what.*available|menu items|show me.*menu)/.test(query)) {
    return allItems.length
      ? allItems.map(({ item, restaurant }) => `${getDisplayDishName(item)} at ${restaurant.name} — ${formatPrice(getDishPrice(item))}`).join("\n")
      : "The restaurants are saved, but their menu photos haven’t been added yet.";
  }
  const restaurantMatch = restaurants.find((restaurant) => query.includes(normalizeText(restaurant.name)));
  const scopedItems = restaurantMatch
    ? allItems.filter(({ restaurant }) => restaurant.id === restaurantMatch.id)
    : allItems;
  const dishMatch = scopedItems.find(({ item }) => {
    const name = normalizeText(getDisplayDishName(item));
    return name && (query.includes(name) || name.split(" ").some((word) => word.length > 3 && query.includes(word)));
  });
  if (dishMatch) {
    const location = restaurantMatch ? "" : ` at ${dishMatch.restaurant.name}`;
    return `${getDisplayDishName(dishMatch.item)}${location} is ${formatPrice(getDishPrice(dishMatch.item))}. ${getDishTranslation(dishMatch.item, "english")}`.trim();
  }
  if (restaurantMatch) {
    return restaurantMatch.items.length
      ? `${restaurantMatch.name} has: ${restaurantMatch.items.map((item) => `${getDisplayDishName(item)} (${formatPrice(getDishPrice(item))})`).join(", ")}.`
      : `${restaurantMatch.name} is in your collection, but no menu dishes have been added yet.`;
  }
  if (/(price|cost|how much|rm |ringgit)/.test(query)) return "Which dish or restaurant would you like the price for? You can ask, for example, “How much is nasi lemak at Kedai Melur?”";
  return "I can look up dishes, prices, and restaurant menus saved in your collection. Which restaurant or dish are you curious about?";
}

function addChatMessage(container, text, kind) {
  const message = document.createElement("div");
  message.className = `message ${kind === "user" ? "user-message" : "bot-message"}`;
  message.textContent = text;
  container.append(message);
  message.scrollIntoView({ block: "nearest" });
}

function submitChat(text) {
  const question = text.trim();
  if (!question) return;
  const container = document.querySelector("#homeChatMessages");
  addChatMessage(container, question, "user");
  addChatMessage(container, answerMenuQuestion(question), "bot");
}

function parsePrice(text) {
  const match = text.match(/(?:RM|MYR|ringgit)\s*(\d{1,4}(?:[.,]\d{1,2})?|\d{1,4})|(\d{1,4}[.,]\d{2})\s*$/i);
  const raw = match?.[1] || match?.[2];
  if (!raw) return null;
  const price = Number(raw.replace(",", "."));
  return Number.isFinite(price) && price > 0 && price < 1000 ? price : null;
}

function parseOcrItems(text) {
  const lines = text.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  const candidates = [];
  let pendingName = "";
  for (const line of lines) {
    const price = parsePrice(line);
    if (price === null) {
      if (line.length >= 3 && !/^(menu|makanan|minuman|harga|price|rm|myr)$/i.test(line)) {
        const cleaned = cleanOcrName(line);
        if (cleaned.length >= 3 && pendingName) candidates.push({ name: pendingName, price: null });
        if (cleaned.length >= 3) pendingName = cleaned;
      }
      continue;
    }
    const marker = line.match(/(?:RM|MYR|ringgit)\s*\d|\d{1,4}[.,]\d{2}\s*$/i);
    let name = marker ? line.replace(/(?:RM|MYR|ringgit)\s*\d{1,4}(?:[.,]\d{1,2})?|\d{1,4}[.,]\d{2}\s*$/i, "").trim() : "";
    if (name.length < 3) name = pendingName;
    pendingName = "";
    name = cleanOcrName(name);
    if (name.length >= 3 && !/^\d+$/.test(name)) candidates.push({ name, price });
  }
  if (pendingName.length >= 3) candidates.push({ name: pendingName, price: null });
  return candidates.filter((candidate, index) => candidates.findIndex((entry) => normalizeText(entry.name) === normalizeText(candidate.name)) === index);
}

function cleanOcrName(text) {
  const tokens = String(text)
    .replace(/[^A-Za-zÀ-ÿ\s'-]/g, " ")
    .replace(/\b(?:RM|MYR)\b/gi, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3 || token.toLowerCase() === "o");
  return tokens.join(" ").replace(/\s+/g, " ").trim();
}

async function translateText(text, target) {
  const url = new URL(TRANSLATION_URL);
  url.searchParams.set("q", text.slice(0, 500));
  const source = isLikelyMalay(text) ? "ms" : "en";
  if (target === "en" && source === "en") return text;
  url.searchParams.set("langpair", `${source}|${target}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation service returned ${response.status}.`);
  const payload = await response.json();
  const translated = payload?.responseData?.translatedText;
  if (payload?.responseStatus !== 200 || !translated) {
    throw new Error(payload?.responseDetails || "The translation service couldn’t translate this text.");
  }
  return translated;
}

function isLikelyMalay(text) {
  return /\b(ayam|nasi|ikan|goreng|kambing|daging|lembu|teh|telur|udang|sambal|sayur|sup|lemak|rendang|mee|roti|canai|sate|satay|kuih|sotong|kerabu|masak|kacang|bakar|puding|susu|pedas|manis|kuah|nasi|tembikai|laici|nenas|nanas|kopi|sirap|limau|mangga|jagung)\b/i.test(text);
}

function knownTranslation(text) {
  return findKnownTranslation(text)?.translation || null;
}

function findKnownTranslation(text) {
  const normalized = normalizeText(text);
  const keys = Object.keys(DISH_TRANSLATIONS).sort((left, right) => right.length - left.length);
  const phrase = keys.find((key) => (` ${normalized} `).includes(` ${key} `))
    || keys.find((key) => key.length >= 6 && normalized.includes(key));
  return phrase ? { key: phrase, translation: DISH_TRANSLATIONS[phrase] } : null;
}

function getPhotoStatusTarget() {
  return activeRestaurantId ? detailStatus : homeStatus;
}

async function translateMenuLine(candidate, confidence) {
  const match = findKnownTranslation(candidate.name);
  const known = match?.translation;
  const isMalay = isLikelyMalay(candidate.name) || MALAY_GLOSSARY_KEYS.has(match?.key);
  const myanmar = known?.myanmar || await translateText(candidate.name, "my");
  const english = known?.english || (isMalay ? await translateText(candidate.name, "en") : candidate.name);
  return {
    id: makeId("dish"),
    name: match ? (isMalay ? match.key.replace(/\b\w/g, (letter) => letter.toUpperCase()) : match.translation.english) : candidate.name,
    sourceText: candidate.name,
    english,
    myanmar,
    price: candidate.price,
    category: confidence < 65 ? "Review photo reading" : "From your menu",
    photoConfidence: confidence,
    art: ["rice", "spice", "grill", "noodle", "soup", "drink"][Math.floor(Math.random() * 6)],
    icon: "🍽️",
    vegetarian: false,
  };
}

async function recognizeMenuPhoto(file) {
  const recognition = ocrQueue.then(async () => {
    if (!window.Tesseract) throw new Error("Photo reading couldn’t load. Check your internet connection and reload the page.");
    try {
      if (!ocrWorkerPromise) ocrWorkerPromise = window.Tesseract.createWorker("eng+msa");
      const worker = await ocrWorkerPromise;
      const result = await worker.recognize(file);
      return result.data;
    } catch (error) {
      ocrWorkerPromise = null;
      throw error;
    }
  });
  ocrQueue = recognition.catch(() => {});
  return recognition;
}

async function processPhoto(file, restaurantId, sourcePath = "") {
  const statusTarget = getPhotoStatusTarget();
  if (!file.type.startsWith("image/")) {
    setStatus(statusTarget, `“${file.name}” isn’t an image file. Choose a JPG, PNG, or other image.`, true);
    return;
  }
  const restaurant = restaurants.find((entry) => entry.id === restaurantId);
  if (!restaurant) {
    setStatus(statusTarget, "The restaurant for this upload no longer exists.", true);
    return;
  }
  const photo = { id: makeId("photo"), name: file.name, ...(sourcePath ? { sourcePath } : {}) };
  try {
    if (!sourcePath) await saveOriginalPhoto(photo.id, restaurantId, file);
    if (!saveRestaurantsWithPhoto(restaurant, photo)) {
      if (!sourcePath) await deleteOriginalPhoto(photo.id);
      return;
    }
    if (activeRestaurantId === restaurantId) renderOriginalPhotos(restaurant);
    setStatus(statusTarget, `Reading ${file.name}…`);
    const recognized = await recognizeMenuPhoto(file);
    const extracted = recognized.text.trim();
    if (!extracted) {
      setStatus(statusTarget, `No text was found in ${file.name}. Try a clearer, well-lit photo.`, true);
      return;
    }
    if (recognized.confidence < 35) {
      setStatus(statusTarget, `The text in ${file.name} is too unclear to read reliably (${Math.round(recognized.confidence)}% confidence). Retake it straight-on with better lighting.`, true);
      return;
    }
    const candidates = parseOcrItems(extracted);
    if (!candidates.length) {
      setStatus(statusTarget, `Text was found in ${file.name}, but no dish names could be recognized. Make sure the menu text is readable.`, true);
      return;
    }
    const translatedItems = [];
    for (let index = 0; index < candidates.length; index += 1) {
      setStatus(statusTarget, `Translating dish ${index + 1} of ${candidates.length} from ${file.name}…`);
      translatedItems.push(await translateMenuLine(candidates[index], recognized.confidence));
    }
    const existing = new Set(restaurant.items.map((item) => `${normalizeText(item.name)}-${item.price}`));
    restaurant.items.push(...translatedItems.filter((item) => !existing.has(`${normalizeText(item.name)}-${item.price}`)));
    if (!saveRestaurants()) return;
    if (activeRestaurantId === restaurantId) renderDetail();
    else renderRestaurants();
    const reviewNote = recognized.confidence < 65 ? " Please review the highlighted names and photo quality." : "";
    setStatus(statusTarget, `Added ${translatedItems.length} dish${translatedItems.length === 1 ? "" : "es"} from ${file.name}.${reviewNote}`);
  } catch (error) {
    console.error(`Could not process menu photo “${file.name}”.`, error);
    setStatus(statusTarget, `Couldn’t process ${file.name}: ${error.message || "check your connection and try a clearer image."}`, true);
  }
}

async function processPhotos(files, restaurantId) {
  for (const entry of files) {
    if (entry.file) await processPhoto(entry.file, restaurantId, entry.sourcePath);
    else await processPhoto(entry, restaurantId);
  }
}

function createRestaurant(name) {
  const restaurant = { id: makeId("restaurant"), name: name.trim(), items: [], createdAt: new Date().toISOString() };
  restaurants.unshift(restaurant);
  saveRestaurants();
  renderRestaurants();
  return restaurant;
}

function findOrCreateRestaurant(name) {
  const normalized = normalizeText(name);
  const existing = restaurants.find((restaurant) => normalizeText(restaurant.name) === normalized);
  if (existing) return existing;
  return createRestaurant(name);
}

async function importMenuFolder(files) {
  const groups = new Map();
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    let parts = (file.webkitRelativePath || file.name).split("/").filter(Boolean);
    if (parts[0]?.toLowerCase() === "menu") parts = parts.slice(1);
    const name = parts.length > 1 ? parts[0] : "Imported menus";
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(file);
  }
  if (!groups.size) {
    setStatus(homeStatus, "No menu photos found. Choose a folder with JPG, PNG, or other image files.", true);
    return;
  }
  setStatus(homeStatus, `Importing ${groups.size} restaurant${groups.size === 1 ? "" : "s"}…`);
  for (const [name, photos] of groups) {
    if (HIDDEN_MENU_FOLDERS.delete(name)) saveHiddenMenuFolders();
    const restaurant = findOrCreateRestaurant(name);
    renderRestaurants();
    await processPhotos(photos, restaurant.id);
  }
  setStatus(homeStatus, `Folder import finished: ${groups.size} restaurant${groups.size === 1 ? "" : "s"} processed.`);
}

async function syncMenuFolder() {
  let response;
  try {
    response = await fetch("/api/menus.json");
  } catch (error) {
    console.info("The local menu folder is available when Home is run with python3 server.py.", error);
    setStatus(homeStatus, "To load photos from the menu folder automatically, run python3 server.py and open http://127.0.0.1:8000.");
    return;
  }
  if (!response.ok) {
    setStatus(homeStatus, `Couldn’t scan the menu folder (server returned ${response.status}).`, true);
    return;
  }
  const folders = await response.json();
  for (const folder of folders) {
    if (HIDDEN_MENU_FOLDERS.has(folder.name)) continue;
    const restaurant = findOrCreateRestaurant(folder.name);
    restaurant.sourceFolder = folder.name;
    restaurant.cover = folder.photos[0]?.url || restaurant.cover;
    const imported = new Set(restaurant.sourceFiles || []);
    const photos = folder.photos.filter((photo) => !imported.has(photo.url));
    saveRestaurants();
    renderRestaurants();
    for (const photo of photos) {
      try {
        const imageResponse = await fetch(`/${photo.url}`);
        if (!imageResponse.ok) throw new Error(`Couldn’t read ${photo.url} (${imageResponse.status}).`);
        const image = await imageResponse.blob();
        await processPhoto(new File([image], photo.name, { type: image.type }), restaurant.id, photo.url);
      } catch (error) {
        console.error("Could not import a photo from the menu folder.", error);
        setStatus(homeStatus, `Couldn’t load ${photo.url}: ${error.message}`, true);
      }
    }
  }
  if (folders.length) setStatus(homeStatus, `Found ${folders.length} restaurant${folders.length === 1 ? "" : "s"} in the menu folder.`);
}

function openDishEditor(id) {
  const restaurant = getActiveRestaurant();
  if (!restaurant) return;
  const item = id ? restaurant.items.find((entry) => entry.id === id) : null;
  if (id && !item) return;
  document.querySelector("#editDishId").value = item?.id || "";
  document.querySelector("#editDishName").value = item?.name || "";
  document.querySelector("#editDishEnglish").value = item?.english || "";
  document.querySelector("#editDishMyanmar").value = item?.myanmar || "";
  document.querySelector("#editDishPrice").value = item ? getDishPrice(item).toFixed(2) : "";
  editDishDialog.querySelector("h2").textContent = item ? "Edit dish details" : "Add a dish";
  editDishDialog.querySelector(".dialog-description").textContent = item
    ? "Photo reading and machine translation can make mistakes. Correct the original name or either translation here."
    : "Enter the name as printed on the menu, your reviewed English and Myanmar translations, and the price.";
  editDishDialog.showModal();
}

function deleteActiveRestaurant() {
  const restaurant = getActiveRestaurant();
  if (!restaurant) return;
  const index = restaurants.indexOf(restaurant);
  const previousOrders = customerOrders;
  customerOrders = customerOrders.filter((order) => order.restaurantId !== restaurant.id);
  restaurants.splice(index, 1);
  if (restaurant.sourceFolder) HIDDEN_MENU_FOLDERS.add(restaurant.sourceFolder);
  if ((restaurant.sourceFolder && !saveHiddenMenuFolders()) || !saveRestaurants() || !saveCustomerOrders()) {
    restaurants.splice(index, 0, restaurant);
    customerOrders = previousOrders;
    saveRestaurants();
    saveCustomerOrders();
    if (restaurant.sourceFolder) {
      HIDDEN_MENU_FOLDERS.delete(restaurant.sourceFolder);
      saveHiddenMenuFolders();
    }
    return;
  }
  deleteDialog.close();
  activeRestaurantId = null;
  quantities.clear();
  restaurantView.hidden = true;
  homeView.hidden = false;
  setStatus(homeStatus, `${restaurant.name} was deleted with its saved customer orders. Original menu-folder photos were left untouched.`);
  renderRestaurants();
  deleteOriginalPhotos(restaurant.id).catch((error) => {
    console.error("Could not remove deleted restaurant photo copies.", error);
    setStatus(homeStatus, `Restaurant deleted, but some saved photo copies could not be removed: ${error.message}`, true);
  });
}

document.querySelectorAll("[data-open-create]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#createRestaurantForm").reset();
    createDialog.showModal();
  });
});

document.querySelector("#cancelCreate").addEventListener("click", () => createDialog.close());
document.querySelector("#cancelEditDish").addEventListener("click", () => editDishDialog.close());
document.querySelector("#editDishForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const restaurant = getActiveRestaurant();
  if (!restaurant) {
    editDishDialog.close();
    return;
  }
  const id = document.querySelector("#editDishId").value;
  const item = id ? restaurant.items.find((entry) => entry.id === id) : null;
  if (id && !item) {
    editDishDialog.close();
    return;
  }
  const priceText = document.querySelector("#editDishPrice").value;
  const price = priceText ? Number(priceText) : null;
  if (price !== null && (!Number.isFinite(price) || price <= 0 || price >= 10000)) {
    setStatus(detailStatus, "Enter a valid price greater than RM 0 and below RM 10,000, or leave it blank.", true);
    return;
  }
  const values = {
    name: document.querySelector("#editDishName").value.trim(),
    english: document.querySelector("#editDishEnglish").value.trim(),
    myanmar: document.querySelector("#editDishMyanmar").value.trim(),
    price: price === null ? null : Math.round(price * 100) / 100,
  };
  if (!values.name || !values.english || !values.myanmar) {
    setStatus(detailStatus, "Enter the original name and both translations.", true);
    return;
  }
  const previous = item ? { ...item } : null;
  const updatedItem = item || { id: makeId("dish"), category: "Added manually", art: "rice", icon: "🍽️", vegetarian: false };
  Object.assign(updatedItem, values, { translationReviewed: true, category: item ? "Manually reviewed" : "Added manually" });
  if (!item) restaurant.items.unshift(updatedItem);
  if (!saveRestaurants()) {
    if (item && previous) Object.assign(item, previous);
    else restaurant.items.shift();
    return;
  }
  editDishDialog.close();
  setStatus(detailStatus, "Dish name, translations, and price updated.");
  renderDetail();
});
document.querySelector("#deleteRestaurantButton").addEventListener("click", () => {
  const restaurant = getActiveRestaurant();
  if (!restaurant) return;
  document.querySelector("#deleteDescription").textContent =
    `This removes ${restaurant.name} and its saved translations from this browser. Original photos in the menu folder will not be deleted.`;
  deleteDialog.showModal();
});
document.querySelector("#cancelDelete").addEventListener("click", () => deleteDialog.close());
document.querySelector("#confirmDelete").addEventListener("click", deleteActiveRestaurant);

document.querySelector("#createRestaurantForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#restaurantName");
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    return;
  }
  if (restaurants.some((restaurant) => normalizeText(restaurant.name) === normalizeText(name))) {
    nameInput.setCustomValidity("A restaurant with this name is already in your collection.");
    nameInput.reportValidity();
    nameInput.setCustomValidity("");
    return;
  }
  const photos = [...document.querySelector("#createPhotos").files];
  const restaurant = createRestaurant(name);
  createDialog.close();
  openRestaurant(restaurant.id);
  if (photos.length) processPhotos(photos, restaurant.id);
});

restaurantGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-restaurant]");
  if (card) openRestaurant(card.dataset.restaurant);
});

restaurantGrid.addEventListener("keydown", (event) => {
  const card = event.target.closest("[data-restaurant]");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openRestaurant(card.dataset.restaurant);
  }
});

document.querySelector("#homeBrand").addEventListener("click", (event) => {
  event.preventDefault();
  showHome();
});
document.querySelector("#backButton").addEventListener("click", showHome);

document.querySelector("#restaurantPhotoInput").addEventListener("change", (event) => {
  const files = [...event.target.files];
  const restaurant = getActiveRestaurant();
  if (restaurant && files.length) processPhotos(files, restaurant.id);
  event.target.value = "";
});

document.querySelector("#addDishButton").addEventListener("click", () => openDishEditor(""));

document.querySelector("#folderInput").addEventListener("change", async (event) => {
  const files = [...event.target.files];
  event.target.value = "";
  if (files.length) await importMenuFolder(files);
});

document.querySelector("#dishGrid").addEventListener("click", (event) => {
  const speakButton = event.target.closest("[data-speak]");
  const editButton = event.target.closest("[data-edit]");
  const addButton = event.target.closest("[data-add]");
  if (speakButton) speakMalay(speakButton.dataset.speak);
  if (editButton) openDishEditor(editButton.dataset.edit);
  if (addButton) changeQuantity(addButton.dataset.add, 1);
});

document.querySelector("#orderList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-change]");
  if (button) changeQuantity(button.dataset.change, Number(button.dataset.delta));
});

document.querySelector("#saveCustomerOrder").addEventListener("click", saveCustomerOrder);
document.querySelector("#updateCustomerOrder").addEventListener("click", updateCustomerOrder);
document.querySelector("#deleteCustomerOrder").addEventListener("click", deleteCustomerOrder);
document.querySelector("#savedOrderList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-load-order]");
  if (button) loadCustomerOrder(button.dataset.loadOrder);
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeLanguage = button.dataset.language;
    const restaurant = getActiveRestaurant();
    if (restaurant) renderDetail();
  });
});

document.querySelector("#homeChatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#homeChatInput");
  submitChat(input.value);
  input.value = "";
});

document.querySelector("#homeSuggestions").addEventListener("click", (event) => {
  const suggestion = event.target.closest(".suggestion");
  if (suggestion) submitChat(suggestion.textContent);
});

renderRestaurants();
syncMenuFolder();
