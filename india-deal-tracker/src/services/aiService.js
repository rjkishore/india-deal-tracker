// Single Responsibility: All Claude API interaction in one place
// Open/Closed: Prompt can be extended; parseResponse is independent

const API_URL  = "https://api.anthropic.com/v1/messages";
const AI_MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 2000;

// ─── JSON extraction — robust against markdown fences or extra text ───────────
export function extractJSON(text) {
  // 1. Direct parse
  try { return JSON.parse(text.trim()); } catch {}
  // 2. Strip markdown fences
  const stripped = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  try { return JSON.parse(stripped); } catch {}
  // 3. Extract first { ... } block
  const start = text.indexOf("{");
  const end   = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(text.slice(start, end + 1)); } catch {}
  }
  throw new Error("Could not parse JSON from AI response");
}

// ─── Prompt builder — separated so it can be updated without touching fetch ──
function buildAnalysisPrompt(productName, urls) {
  const { amzUrl, fkUrl, meUrl, sdUrl } = urls;
  return `You are India's #1 AI shopping analyst. Analyze the product "${productName}" for Indian online shoppers.

CRITICAL RULES:
- Your ENTIRE response must be a single valid JSON object
- Do NOT write anything before the opening brace {
- Do NOT write anything after the closing brace }
- Do NOT use markdown, backticks, or code fences
- Start your response directly with { and end with }
- BE HONEST: You do not have real-time prices. Label all price estimates with "(est.)"
- If a product is unlikely sold on a platform, set "likelySold": false

Use this EXACT structure with honest real data for "${productName}":
{"productName":"REAL NAME","category":"REAL CATEGORY","dataDisclaimer":"Prices and ratings are AI estimates based on training data, not real-time. Always verify on the platform before buying.","finalVerdict":"BUY NOW or WAIT FOR SALE or AVOID or COMPARE FIRST","verdictColor":"#2E7D32 or #FB8C00 or #C62828 or #FF6F00","verdictReason":"One honest sentence","overallScore":8.2,"pricingAnalysis":{"typicalMRP":"₹X,XXX (est.)","currentGoodPrice":"₹X,XXX (est.)","lowestEverPrice":"₹X,XXX (est.)","isCurrentPriceGood":true,"priceDropExpected":false,"priceDropReason":"reason","bestMonthToBuy":"October","bestDayToBuy":"Sale day","worstTimeToBuy":"Before Diwali","priceHistory":"Honest 2 sentence summary."},"platformComparison":[{"platform":"Amazon","icon":"🛒","color":"#FF9900","likelySold":true,"typicalPrice":"₹X,XXX (est.)","discount":"~X%","rating":"4.2★ (est.)","reviewCount":"est. 15,000+","deliverySpeed":"1-2 days","returnPolicy":"10 days","paymentOffer":"5% HDFC card","pros":"Fast delivery, genuine","cons":"May be costlier","score":9,"recommended":true,"searchUrl":"${amzUrl}"},{"platform":"Flipkart","icon":"🏪","color":"#2874F0","likelySold":true,"typicalPrice":"₹X,XXX (est.)","discount":"~X%","rating":"4.0★ (est.)","reviewCount":"est. 8,000+","deliverySpeed":"2-3 days","returnPolicy":"7 days","paymentOffer":"5% Axis card","pros":"Good EMI","cons":"Slower delivery","score":8,"recommended":false,"searchUrl":"${fkUrl}"},{"platform":"Meesho","icon":"🛍️","color":"#9B2FF7","likelySold":false,"typicalPrice":"Not typically available","discount":"N/A","rating":"Unknown","reviewCount":"Unknown","deliverySpeed":"5-7 days","returnPolicy":"7 days","paymentOffer":"5% prepaid","pros":"Cheapest if listed","cons":"Counterfeit risk","score":4,"recommended":false,"searchUrl":"${meUrl}"},{"platform":"Snapdeal","icon":"🔖","color":"#E53935","likelySold":false,"typicalPrice":"May not be available","discount":"Unknown","rating":"Unknown","reviewCount":"Unknown","deliverySpeed":"4-6 days","returnPolicy":"7 days","paymentOffer":"UPI ₹75 off","pros":"Discount if available","cons":"Authenticity risk","score":4,"recommended":false,"searchUrl":"${sdUrl}"}],"bestDealPlatform":"Amazon","bestDealUrl":"${amzUrl}","bestDealReason":"Most reliable for genuine products","customerSatisfaction":{"overallSatisfaction":82,"qualityScore":80,"valueForMoneyScore":85,"deliveryScore":90,"afterSalesScore":70,"topPositiveFeedback":["feedback 1","feedback 2","feedback 3"],"topNegativeFeedback":["complaint 1","complaint 2"],"fakeReviewRisk":"Medium","fakeReviewWarning":"Honest specific warning"},"buyingAdvice":{"rightTimeToBuy":"Specific honest advice","upcomingSalesToWaitFor":["Amazon Great Indian Festival Oct 2026","Flipkart Big Billion Days Oct 2026"],"extraSavingsTip":"Specific tip","redFlags":["red flag 1","red flag 2"],"checkBeforeBuying":["check 1","check 2","check 3"]},"alternatives":[{"name":"Alternative 1","reason":"Why better","approxPrice":"₹X,XXX (est.)"},{"name":"Alternative 2","reason":"Why better","approxPrice":"₹X,XXX (est.)"}]}

Fill in REAL honest values for "${productName}". Output ONLY the JSON object.`;
}

// ─── Main API call ─────────────────────────────────────────────────────────────
export async function analyzeProduct(productName) {
  const enc  = encodeURIComponent(productName);
  const urls = {
    amzUrl: `https://www.amazon.in/s?k=${enc}&s=review-rank`,
    fkUrl:  `https://www.flipkart.com/search?q=${enc}&sort=discount_desc`,
    meUrl:  `https://www.meesho.com/search?q=${enc}&sort=ORDER_COUNT`,
    sdUrl:  `https://www.snapdeal.com/products/all-products?keyword=${enc}&sort=rlvncy`,
  };

  const response = await fetch(API_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model:      AI_MODEL,
      max_tokens: MAX_TOKENS,
      messages:   [{ role: "user", content: buildAnalysisPrompt(productName, urls) }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  const raw = data.content?.find((b) => b.type === "text")?.text || "";
  const result = extractJSON(raw);

  if (!result?.finalVerdict) throw new Error("Incomplete response from AI");
  return result;
}

// ─── Share deal helper ────────────────────────────────────────────────────────
export function buildShareText(query, discount, amzUrl, fkUrl) {
  return `🔥 *${query}* — ${discount}% OFF Deals!\n\n🛒 Amazon: ${amzUrl}\n🏪 Flipkart: ${fkUrl}\n\nFound via India Deal Tracker 🏷️`;
}

export async function shareOrCopy(text, title) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch {
      // User cancelled or not supported — fall through
    }
  }
  // WhatsApp fallback
  const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const win   = window.open(waUrl, "_blank");
  return win ? "whatsapp" : "clipboard";
}
