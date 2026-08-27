// Single Responsibility: URL construction only
// Open/Closed: Add a new platform by adding a new builder — no existing code changes

// ─── Amazon URL builder ───────────────────────────────────────────────────────
const AMAZON_RATING_NODES = {
  "3.5": "&rh=p_72%3A1318474031",
  "4":   "&rh=p_72%3A1318475031",
  "4.5": "&rh=p_72%3A1318476031",
};

const AMAZON_SORT_MAP = {
  price:    "price-asc-rank",
  default:  "review-rank",
};

function buildAmazonUrl(q, discount, rating, sort, budget) {
  const ratingNode  = AMAZON_RATING_NODES[rating] || "";
  const sortParam   = AMAZON_SORT_MAP[sort] || AMAZON_SORT_MAP.default;
  const budgetParam = budget ? `&rh=p_36%3A-${budget * 100}` : "";
  return `https://www.amazon.in/s?k=${q}&pct-off=${discount}-&s=${sortParam}${ratingNode}${budgetParam}`;
}

// ─── Flipkart URL builder ─────────────────────────────────────────────────────
const FLIPKART_SORT_MAP = {
  price:    "price_asc",
  rating:   "recency",
  discount: "discount_desc",
  default:  "popularity",
};

function buildFlipkartUrl(q, discount, rating, sort, budget) {
  const sortParam   = FLIPKART_SORT_MAP[sort] || FLIPKART_SORT_MAP.default;
  const budgetParam = budget
    ? `&p%5B%5D=facets.price_range.from%3D0%26facets.price_range.to%3D${budget}`
    : "";
  return `https://www.flipkart.com/search?q=${q}&sort=${sortParam}${budgetParam}`;
}

// ─── Meesho URL builder ───────────────────────────────────────────────────────
const MEESHO_SORT_MAP = {
  price:   "PRICE_ASC",
  rating:  "RATING",
  default: "ORDER_COUNT",
};

function buildMeeshoUrl(q, discount, rating, sort) {
  const sortParam = MEESHO_SORT_MAP[sort] || MEESHO_SORT_MAP.default;
  return `https://www.meesho.com/search?q=${q}&sort=${sortParam}`;
}

// ─── Myntra URL builder ───────────────────────────────────────────────────────
const MYNTRA_SORT_MAP = {
  price:   "price_asc",
  rating:  "customer_rating",
  default: "discount",
};

function buildMyntraUrl(q, discount, rating, sort) {
  const sortParam     = MYNTRA_SORT_MAP[sort] || MYNTRA_SORT_MAP.default;
  const discountFilter = encodeURIComponent(`Discount:${discount}+`);
  return `https://www.myntra.com/search?rawQuery=${q}&f=${discountFilter}&sort=${sortParam}`;
}

// ─── Snapdeal URL builder ─────────────────────────────────────────────────────
const SNAPDEAL_SORT_MAP = {
  price:   "plowhi",
  rating:  "rating",
  default: "rlvncy",
};

function buildSnapdealUrl(q, discount, rating, sort) {
  const sortParam = SNAPDEAL_SORT_MAP[sort] || SNAPDEAL_SORT_MAP.default;
  return `https://www.snapdeal.com/products/all-products?keyword=${q}&sort=${sortParam}&discount=${discount}`;
}

// ─── Croma URL builder ────────────────────────────────────────────────────────
function buildCromaUrl(q) {
  return `https://www.croma.com/searchB?q=${q}`;
}

// ─── Platform builder registry (Open/Closed principle) ───────────────────────
// To add a new platform: add one entry here. Nothing else changes.
const PLATFORM_BUILDERS = {
  Amazon:   buildAmazonUrl,
  Flipkart: buildFlipkartUrl,
  Meesho:   buildMeeshoUrl,
  Myntra:   buildMyntraUrl,
  Snapdeal: buildSnapdealUrl,
  Croma:    (q) => buildCromaUrl(q),
};

/**
 * Build a deal search URL for a given platform with all filters applied.
 * @param {string} platform - Platform name key
 * @param {string} query    - Product search query
 * @param {number} discount - Minimum discount %
 * @param {string} rating   - Minimum star rating ("any"|"3.5"|"4"|"4.5")
 * @param {string} sort     - Sort mode ("popular"|"rating"|"discount"|"price")
 * @param {number|null} budget - Max budget in ₹ or null
 * @returns {string} - Full URL
 */
export function buildDealUrl(platform, query, discount, rating, sort, budget) {
  const q       = encodeURIComponent(query || "offers");
  const builder = PLATFORM_BUILDERS[platform];
  if (!builder) return "#";
  return builder(q, discount, rating, sort, budget);
}

// ─── Price history URL builder ────────────────────────────────────────────────
const HISTORY_BUILDERS = {
  amazon:   (eq) => `https://pricehistory.app/page/search?q=${eq}&store=amazon`,
  flipkart: (eq) => `https://pricehistory.app/page/search?q=${eq}&store=flipkart`,
  before:   (eq) => `https://www.pricebefore.com/search/?q=${eq}`,
  all:      (eq) => `https://pricehistory.app/page/search?q=${eq}`,
};

export function buildHistoryUrl(store, query) {
  const eq      = encodeURIComponent(query);
  const builder = HISTORY_BUILDERS[store] || HISTORY_BUILDERS.all;
  return builder(eq);
}

// ─── Compare tool URL builder ─────────────────────────────────────────────────
const COMPARE_BUILDERS = {
  "Smartprix":       (eq) => `https://www.smartprix.com/goods/?q=${eq}`,
  "PriceBefore":     (eq) => `https://www.pricebefore.com/search/?q=${eq}`,
  "BuyHatke":        (eq) => `https://buyhatke.com/search-product/?q=${eq}`,
  "Google Shopping": (eq) => `https://www.google.com/search?q=${eq}+price+India&tbm=shop`,
};

export function buildCompareUrl(tool, query) {
  const eq      = encodeURIComponent(query);
  const builder = COMPARE_BUILDERS[tool];
  return builder ? builder(eq) : "#";
}
