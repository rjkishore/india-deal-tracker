// Single Responsibility: Filter option definitions only

export const DISCOUNT_OPTIONS = [
  { value: 30, label: "30%+", color: "#43A047" },
  { value: 40, label: "40%+", color: "#00897B" },
  { value: 50, label: "50%+", color: "#FB8C00" },
  { value: 60, label: "60%+", color: "#F4511E" },
  { value: 70, label: "70%+", color: "#E53935" },
  { value: 80, label: "80%+", color: "#C62828" },
  { value: 90, label: "90%+", color: "#880E4F" },
];

export const RATING_OPTIONS = [
  { value: "any", label: "Any ★"  },
  { value: "3.5", label: "3.5★+" },
  { value: "4",   label: "4★+"   },
  { value: "4.5", label: "4.5★+" },
];

export const SORT_OPTIONS = [
  { value: "popular",  label: "Most Bought",    icon: "🔥" },
  { value: "rating",   label: "Top Rated",      icon: "⭐" },
  { value: "discount", label: "Best Discount",  icon: "🏷️" },
  { value: "price",    label: "Lowest Price",   icon: "💰" },
];

export const BUDGET_OPTIONS = [
  { label: "Any",      max: null  },
  { label: "₹500",     max: 500   },
  { label: "₹1,000",   max: 1000  },
  { label: "₹2,000",   max: 2000  },
  { label: "₹5,000",   max: 5000  },
  { label: "₹10,000",  max: 10000 },
];

export const DEFAULT_FILTERS = {
  discount: 70,
  rating:   "4",
  sort:     "popular",
  budget:   null,
};

export const TABS = [
  "🔍 Search",
  "⚙️ Filters",
  "🤖 AI Review",
  "💳 Payment",
  "📊 EMI",
  "🗓️ Sales",
];
