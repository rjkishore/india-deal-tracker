// Single Responsibility: Static content — presets, sale calendar

export const PRESETS = [
  { label: "📱 Mobiles",    query: "smartphone",    discount: 60, rating: "4",   sort: "popular" },
  { label: "🎧 Headphones", query: "headphones",    discount: 70, rating: "4.5", sort: "rating"  },
  { label: "👟 Shoes",      query: "branded shoes", discount: 70, rating: "4",   sort: "popular" },
  { label: "👗 Kurtis",     query: "kurti saree",   discount: 60, rating: "3.5", sort: "popular" },
  { label: "🍳 Kitchen",    query: "kitchen set",   discount: 70, rating: "4",   sort: "popular" },
  { label: "💄 Beauty",     query: "beauty kit",    discount: 70, rating: "4",   sort: "rating"  },
  { label: "📺 Smart TVs",  query: "smart tv",      discount: 50, rating: "4",   sort: "popular" },
  { label: "🧸 Kids Toys",  query: "kids toys",     discount: 70, rating: "4",   sort: "popular" },
  { label: "⌚ Watches",    query: "watches",        discount: 70, rating: "4",   sort: "popular" },
  { label: "💻 Laptops",    query: "laptop",         discount: 40, rating: "4",   sort: "popular" },
];

export const SALE_EVENTS = [
  { name: "Amazon Great Indian Festival", date: "Oct 2026",   platform: "Amazon",   icon: "🎉", color: "#FF9900", tip: "Add wishlist 2 weeks before — prices are tracked from that date" },
  { name: "Flipkart Big Billion Days",    date: "Oct 2026",   platform: "Flipkart", icon: "🌟", color: "#2874F0", tip: "Axis Bank card gives 5% extra — activate it 3 days before" },
  { name: "Amazon Prime Day",             date: "Jul 2026",   platform: "Amazon",   icon: "⚡", color: "#FF9900", tip: "Lightning deals go live at midnight — set alarm!" },
  { name: "Myntra End of Reason Sale",    date: "Jun & Dec",  platform: "Myntra",   icon: "👗", color: "#FF3F6C", tip: "Fashion discounts are real — Myntra rarely fakes MRP" },
  { name: "Meesho Mega Blockbuster Sale", date: "Quarterly",  platform: "Meesho",   icon: "🛍️", color: "#9B2FF7", tip: "Prepaid orders get extra 5% off during sale" },
  { name: "Amazon Diwali Sale",           date: "Oct–Nov",    platform: "Amazon",   icon: "🪔", color: "#FF9900", tip: "Kitchen & home products hit all-time lows during Diwali" },
  { name: "Flipkart Big Shopping Days",   date: "Monthly",    platform: "Flipkart", icon: "🛒", color: "#2874F0", tip: "Check price history first — some products are hiked before sale" },
  { name: "Snapdeal Unbox Sale",          date: "Quarterly",  platform: "Snapdeal", icon: "📦", color: "#E53935", tip: "Best for fashion and home — electronics deals are average" },
];

export const COMPARE_TOOLS = [
  { label: "Smartprix",       tool: "Smartprix",       icon: "🔎", color: "#1565C0", desc: "Best for mobiles, laptops, electronics · 15+ stores" },
  { label: "PriceBefore",     tool: "PriceBefore",     icon: "📊", color: "#6A1B9A", desc: "Amazon + Flipkart + Snapdeal side by side" },
  { label: "BuyHatke",        tool: "BuyHatke",        icon: "🛒", color: "#00695C", desc: "30+ stores including Croma, Tata Cliq, Ajio" },
  { label: "Google Shopping", tool: "Google Shopping", icon: "🔍", color: "#1A73E8", desc: "All online stores in India at once" },
];

export const EMI_TENURES = [3, 6, 9, 12, 18, 24];

export const PRO_SHOPPING_TIPS = [
  { icon: "🛒", title: "Add to wishlist 2 weeks before",  desc: "Prices tracked from wishlist date — see the real discount %" },
  { icon: "📱", title: "Use apps not browser",            desc: "App-exclusive deals are 5–15% cheaper + extra UPI cashback" },
  { icon: "🏦", title: "Stack bank card + UPI",           desc: "SBI/HDFC card + UPI = up to 15% extra on top of sale price" },
  { icon: "⏰", title: "Check deals at midnight",         desc: "Lightning deals go live at 12AM on day 1 of sale" },
  { icon: "📊", title: "Check price history first",       desc: "Platforms often hike prices 1 week before sale" },
  { icon: "🔔", title: "Set price alert now",             desc: "Go to PriceHistory.app — get WhatsApp/email alert on drop" },
];
