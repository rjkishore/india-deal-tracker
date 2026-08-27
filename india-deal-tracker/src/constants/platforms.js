// Single Responsibility: Platform metadata only — colors, icons, identity
export const PLATFORM_META = {
  Amazon:   { color: "#FF9900", bg: "#FFF3E0", icon: "🛒" },
  Flipkart: { color: "#2874F0", bg: "#E8F0FE", icon: "🏪" },
  Meesho:   { color: "#9B2FF7", bg: "#F3E8FF", icon: "🛍️" },
  Myntra:   { color: "#FF3F6C", bg: "#FFE8ED", icon: "👗" },
  Snapdeal: { color: "#E53935", bg: "#FFEBEE", icon: "🔖" },
  Croma:    { color: "#008000", bg: "#E8F5E9", icon: "🏬" },
};

export const PLATFORMS = Object.keys(PLATFORM_META);

// Payment offers per platform — separate from visual metadata
export const PAYMENT_OFFERS = {
  Amazon: [
    { method: "HDFC Card",     saving: "10% off up to ₹1,750",    icon: "💳" },
    { method: "SBI Card",      saving: "5% cashback up to ₹500",   icon: "💳" },
    { method: "Amazon Pay",    saving: "₹100 cashback on ₹1,000+", icon: "📱" },
    { method: "ICICI Card",    saving: "5% cashback unlimited",     icon: "💳" },
  ],
  Flipkart: [
    { method: "Axis Bank Card", saving: "5% unlimited cashback",    icon: "💳" },
    { method: "PhonePe",        saving: "₹150 off on ₹2,000+",     icon: "📱" },
    { method: "Kotak Card",     saving: "7.5% off up to ₹2,500",   icon: "💳" },
    { method: "Flipkart UPI",   saving: "₹50 cashback on ₹500+",   icon: "📱" },
  ],
  Meesho: [
    { method: "UPI (Any)",     saving: "₹50 cashback on ₹399+",    icon: "📱" },
    { method: "Prepaid order", saving: "Extra 5% off always",       icon: "💰" },
  ],
  Myntra: [
    { method: "Kotak Card",    saving: "10% off up to ₹750",       icon: "💳" },
    { method: "GPay",          saving: "₹100 cashback on ₹999+",   icon: "📱" },
  ],
  Snapdeal: [
    { method: "Any UPI",       saving: "₹75 off on ₹999+",         icon: "📱" },
    { method: "HDFC Card",     saving: "5% off up to ₹500",         icon: "💳" },
  ],
  Croma: [
    { method: "HDFC Card",     saving: "5% off on electronics",     icon: "💳" },
    { method: "Bajaj EMI",     saving: "No-cost EMI available",      icon: "💳" },
  ],
};

// Sale URLs — real working deals pages per platform
export const SALE_URLS = {
  Amazon:   "https://www.amazon.in/deals",
  Flipkart: "https://www.flipkart.com/offers-store",
  Meesho:   "https://www.meesho.com/deals",
  Myntra:   "https://www.myntra.com/sale",
  Snapdeal: "https://www.snapdeal.com/offers/hotdeals",
  Croma:    "https://www.croma.com/offers",
};
