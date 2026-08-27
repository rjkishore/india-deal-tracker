// Single Responsibility: AI Review UI only — business logic in useAIReview hook
import { useState, useEffect } from "react";
import { useAIReview, AI_STEPS } from "../../hooks/useAIReview";
import { Card } from "../ui/Card";
import { SectionLabel } from "../ui/SectionLabel";
import { ScoreBar } from "../ui/ScoreBar";
import { Disclaimer } from "../ui/Disclaimer";
import { PLATFORM_META } from "../../constants/platforms";
import { buildCompareUrl } from "../../services/urlBuilder";

function LoadingSteps({ step, dark, tc, sc }) {
  return (
    <Card dark={dark} style={{ textAlign: "center", padding: "28px 20px" }}>
      <div style={{ fontSize: 42, marginBottom: 12 }}>🤖</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: tc, marginBottom: 16 }}>Deep Analysis in Progress</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {AI_STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: i <= step ? 1 : 0.3, transition: "opacity 0.4s" }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, flexShrink: 0,
              background: i < step ? "#2E7D32" : i === step ? "#FF9900" : "#eee",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: "#fff", fontWeight: 800 }}>
              {i < step ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: 12, color: i <= step ? tc : sc, fontWeight: i === step ? 700 : 500 }}>{s}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BestDealBanner({ platform, url, reason, verdictColor, copied, onCopy }) {
  return (
    <div style={{ background: dark ? "#1a2a1a" : "#F0FFF0", border: "2px solid #2E7D32",
      borderRadius: 16, padding: "16px 18px", marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#2E7D32", letterSpacing: 1.5, marginBottom: 8 }}>
        🏆 BEST DEAL RIGHT NOW
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{PLATFORM_META[platform]?.icon || "🛒"}</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#1a1a2e" }}>{platform}</div>
          <div style={{ fontSize: 12, color: "#2E7D32", fontWeight: 600 }}>{reason}</div>
        </div>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: 8 }}>
        <div style={{ background: "linear-gradient(135deg,#2E7D32,#1B5E20)", color: "#fff",
          borderRadius: 12, padding: "13px 0", textAlign: "center", fontWeight: 800, fontSize: 15,
          boxShadow: "0 4px 14px rgba(46,125,50,0.4)" }}>
          🚀 Open Best Deal on {platform} →
        </div>
      </a>
      <button onClick={onCopy} style={{ width: "100%", padding: "9px 0", borderRadius: 10,
        border: "1.5px dashed #2E7D32", background: copied ? "#2E7D32" : "transparent",
        color: copied ? "#fff" : "#2E7D32", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
        {copied ? "✅ URL Copied!" : "📋 Copy best deal URL"}
      </button>
    </div>
  );
}

// dark is not in scope for BestDealBanner — fix by passing it
function BestDealBannerFull({ review, dark, copied, onCopy }) {
  return (
    <div style={{ background: dark ? "#1a2a1a" : "#F0FFF0", border: "2px solid #2E7D32",
      borderRadius: 16, padding: "16px 18px", marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#2E7D32", letterSpacing: 1.5, marginBottom: 8 }}>
        🏆 BEST DEAL RIGHT NOW
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{PLATFORM_META[review.bestDealPlatform]?.icon || "🛒"}</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: dark ? "#f0f0f0" : "#1a1a2e" }}>
            {review.bestDealPlatform}
          </div>
          <div style={{ fontSize: 12, color: "#2E7D32", fontWeight: 600 }}>{review.bestDealReason}</div>
        </div>
      </div>
      <a href={review.bestDealUrl} target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", marginBottom: 8 }}>
        <div style={{ background: "linear-gradient(135deg,#2E7D32,#1B5E20)", color: "#fff",
          borderRadius: 12, padding: "13px 0", textAlign: "center", fontWeight: 800, fontSize: 15,
          boxShadow: "0 4px 14px rgba(46,125,50,0.4)" }}>
          🚀 Open Best Deal on {review.bestDealPlatform} →
        </div>
      </a>
      <button onClick={onCopy} style={{ width: "100%", padding: "9px 0", borderRadius: 10,
        border: "1.5px dashed #2E7D32", background: copied ? "#2E7D32" : "transparent",
        color: copied ? "#fff" : "#2E7D32", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
        {copied ? "✅ URL Copied!" : "📋 Copy best deal URL"}
      </button>
    </div>
  );
}

export function AIReviewTab({ globalQuery, autoTrigger, dark }) {
  const [inputQuery, setInputQuery] = useState(globalQuery || "");
  const [copied, setCopied]         = useState(false);
  const { review, loading, error, step, analyze } = useAIReview();

  const tc = dark ? "#f0f0f0" : "#1a1a2e";
  const sc = dark ? "#aaa"    : "#666";

  useEffect(() => { if (globalQuery) setInputQuery(globalQuery); }, [globalQuery]);

  useEffect(() => {
    if (autoTrigger && globalQuery) analyze(globalQuery);
  }, [autoTrigger]);

  const handleAnalyze = () => analyze(inputQuery);

  const copyUrl = () => {
    if (!review?.bestDealUrl) return;
    navigator.clipboard.writeText(review.bestDealUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const pa = review?.pricingAnalysis;
  const cs = review?.customerSatisfaction;
  const ba = review?.buyingAdvice;

  return (
    <div>
      {/* Input card */}
      <Card dark={dark}>
        <SectionLabel text="🤖 AI DEEP ANALYSIS — POWERED BY CLAUDE" />
        <div style={{ fontSize: 12, color: sc, marginBottom: 12, lineHeight: 1.5 }}>
          Analyzes price history · best time to buy · platform comparison · customer satisfaction · gives you the single best deal URL
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={inputQuery} onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="e.g. boAt Rockerz 450, Samsung 43 inch TV..."
            style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1.5px solid #ddd",
              fontSize: 13, outline: "none", background: dark ? "#2a2a4a" : "#fff", color: tc }} />
          <button onClick={handleAnalyze} disabled={loading} style={{
            padding: "10px 18px", borderRadius: 12, border: "none",
            background: loading ? "#ccc" : "linear-gradient(135deg,#1a1a2e,#0f3460)",
            color: "#FFD700", fontWeight: 800, fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
          }}>{loading ? "⏳" : "Analyze"}</button>
        </div>
        {error && <div style={{ color: "#E53935", fontSize: 12, marginTop: 8, fontWeight: 600 }}>{error}</div>}
      </Card>

      {loading && <LoadingSteps step={step} dark={dark} tc={tc} sc={sc} />}

      {review && !loading && (
        <div>
          {/* Verdict */}
          <div style={{ background: `linear-gradient(135deg,${review.verdictColor},${review.verdictColor}cc)`,
            borderRadius: 18, padding: "18px 20px", marginBottom: 12 }}>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, marginBottom: 6 }}>
              AI VERDICT FOR INDIAN BUYERS
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ color: "#fff", fontSize: 28, fontWeight: 900 }}>{review.finalVerdict}</div>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "8px 14px", textAlign: "center" }}>
                <div style={{ color: "#fff", fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{review.overallScore}</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 9, fontWeight: 700 }}>/10</div>
              </div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.5 }}>{review.verdictReason}</div>
          </div>

          {/* Disclaimer */}
          {review.dataDisclaimer && (
            <Disclaimer text={`<b>AI Estimate Notice:</b> ${review.dataDisclaimer}`} dark={dark} />
          )}

          {/* Best Deal */}
          <BestDealBannerFull review={review} dark={dark} copied={copied} onCopy={copyUrl} />

          {/* Pricing */}
          {pa && (
            <Card dark={dark}>
              <SectionLabel text="💰 PRICE ANALYSIS" />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {[
                  { label: "MRP",          value: pa.typicalMRP,         color: "#666"    },
                  { label: "Good Price",   value: pa.currentGoodPrice,   color: "#1565C0" },
                  { label: "Lowest Ever",  value: pa.lowestEverPrice?.split(" ")[0], color: "#2E7D32" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ flex: "1 1 30%", background: dark ? "#2a2a4a" : "#F8F9FA",
                    borderRadius: 10, padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: sc, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {[
                  { ok: pa.isCurrentPriceGood,  icon: pa.isCurrentPriceGood  ? "✅" : "⚠️",
                    text: pa.isCurrentPriceGood  ? "Current price is GOOD" : "Wait for better price",
                    col: pa.isCurrentPriceGood  ? "#2E7D32" : "#E65100", bg: pa.isCurrentPriceGood ? "#E8F5E9" : "#FFF3E0",
                    border: pa.isCurrentPriceGood ? "#2E7D32" : "#FB8C00" },
                  { ok: pa.priceDropExpected, icon: pa.priceDropExpected ? "📉" : "📈",
                    text: pa.priceDropExpected ? "Price drop expected" : "Price unlikely to drop",
                    col: pa.priceDropExpected ? "#1565C0" : "#E53935", bg: pa.priceDropExpected ? "#E3F2FD" : "#FFEBEE",
                    border: pa.priceDropExpected ? "#1565C0" : "#E53935" },
                ].map((item, i) => (
                  <div key={i} style={{ flex: 1, background: item.bg, border: `1.5px solid ${item.border}`,
                    borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 18 }}>{item.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: item.col }}>{item.text}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: sc, lineHeight: 1.5, marginBottom: 6 }}>{pa.priceHistory}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {[
                  { icon: "📅", label: "Best Month", value: pa.bestMonthToBuy },
                  { icon: "📆", label: "Best Day",   value: pa.bestDayToBuy },
                  { icon: "🚫", label: "Avoid",      value: pa.worstTimeToBuy },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ flex: 1, background: dark ? "#2a2a4a" : "#F8F9FA",
                    borderRadius: 10, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 16 }}>{icon}</div>
                    <div style={{ fontSize: 9, color: sc, fontWeight: 700, marginTop: 2 }}>{label}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: tc, marginTop: 2 }}>{value}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Platform comparison */}
          {review.platformComparison?.length > 0 && (
            <Card dark={dark}>
              <SectionLabel text="⚖️ PLATFORM-BY-PLATFORM COMPARISON" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {review.platformComparison.map((p) => (
                  <a key={p.platform} href={p.searchUrl} target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}>
                    <div style={{
                      background: p.recommended ? (dark ? "#1a2a1a" : "#F0FFF0") : (dark ? "#2a2a4a" : "#fafafa"),
                      borderRadius: 14, padding: "12px 14px",
                      border: `2px solid ${p.recommended ? p.color + "88" : p.likelySold === false ? "#ccc" : p.color + "22"}`,
                      opacity: p.likelySold === false ? 0.7 : 1,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 22 }}>{p.icon}</span>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontWeight: 800, fontSize: 14, color: tc }}>{p.platform}</span>
                              {p.recommended && (
                                <span style={{ background: p.color, color: "#fff", borderRadius: 10, padding: "2px 8px", fontSize: 10, fontWeight: 800 }}>✓ BEST</span>
                              )}
                              {p.likelySold === false && (
                                <span style={{ background: "#eee", color: "#999", borderRadius: 10, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>May not sell this</span>
                              )}
                            </div>
                            <div style={{ fontSize: 11, color: sc }}>{p.deliverySpeed} · {p.returnPolicy} returns</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 16, fontWeight: 900, color: p.likelySold === false ? "#aaa" : p.color }}>
                            {p.typicalPrice}
                          </div>
                          {p.likelySold !== false && (
                            <div style={{ fontSize: 11, color: "#2E7D32", fontWeight: 700 }}>{p.discount} off</div>
                          )}
                        </div>
                      </div>
                      {p.likelySold === false ? (
                        <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#888" }}>
                          ℹ️ This branded product may not be listed on {p.platform}. Tap to verify — if found, check seller carefully.
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <div style={{ flex: 1, height: 5, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${p.score * 10}%`, background: p.color, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 800, color: p.color }}>{p.score}/10</span>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ flex: 1, fontSize: 11, color: "#2E7D32" }}>✅ {p.pros}</div>
                            <div style={{ flex: 1, fontSize: 11, color: "#E53935" }}>❌ {p.cons}</div>
                          </div>
                          {p.paymentOffer && (
                            <div style={{ marginTop: 6, background: p.color + "11", borderRadius: 8, padding: "4px 8px", fontSize: 11, color: p.color, fontWeight: 600 }}>
                              💳 {p.paymentOffer}
                            </div>
                          )}
                        </>
                      )}
                      <div style={{ marginTop: 6, fontSize: 11, color: p.likelySold === false ? "#aaa" : p.color, fontWeight: 700, textAlign: "right" }}>
                        {p.likelySold !== false ? `⭐ ${p.rating} (${p.reviewCount}) · ` : ""}Tap to check on {p.platform} →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Customer satisfaction */}
          {cs && (
            <Card dark={dark}>
              <SectionLabel text="⭐ CUSTOMER SATISFACTION" />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 64, height: 64, borderRadius: 32, flexShrink: 0,
                  background: `conic-gradient(#2E7D32 ${cs.overallSatisfaction * 3.6}deg, #eee 0deg)`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 24,
                    background: dark ? "#1e1e2e" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 900, color: "#2E7D32" }}>
                    {cs.overallSatisfaction}%
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <ScoreBar label="Quality"        value={cs.qualityScore}       color="#2874F0" />
                  <ScoreBar label="Value for Money" value={cs.valueForMoneyScore} color="#2E7D32" />
                  <ScoreBar label="Delivery"        value={cs.deliveryScore}      color="#FF9900" />
                  <ScoreBar label="After-Sales"     value={cs.afterSalesScore}    color="#9B2FF7" />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#2E7D32", marginBottom: 6 }}>👍 CUSTOMERS LOVE</div>
                  {(cs.topPositiveFeedback || []).map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: tc, marginBottom: 5, display: "flex", gap: 5 }}>
                      <span style={{ color: "#2E7D32" }}>+</span>{f}
                    </div>
                  ))}
                </div>
                <div style={{ width: 1, background: "#eee" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#E53935", marginBottom: 6 }}>👎 COMPLAINTS</div>
                  {(cs.topNegativeFeedback || []).map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: tc, marginBottom: 5, display: "flex", gap: 5 }}>
                      <span style={{ color: "#E53935" }}>−</span>{f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: cs.fakeReviewRisk === "High" ? "#FFEBEE" : cs.fakeReviewRisk === "Medium" ? "#FFF8E1" : "#E8F5E9",
                border: `1.5px solid ${cs.fakeReviewRisk === "High" ? "#E53935" : cs.fakeReviewRisk === "Medium" ? "#F9A825" : "#2E7D32"}`,
                borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 4,
                  color: cs.fakeReviewRisk === "High" ? "#E53935" : cs.fakeReviewRisk === "Medium" ? "#F57F17" : "#2E7D32" }}>
                  ⚠️ FAKE REVIEW RISK: {cs.fakeReviewRisk?.toUpperCase()}
                </div>
                <div style={{ fontSize: 12, color: sc, lineHeight: 1.4 }}>{cs.fakeReviewWarning}</div>
              </div>
            </Card>
          )}

          {/* Buying advice */}
          {ba && (
            <Card dark={dark}>
              <SectionLabel text="🎯 RIGHT TIME TO BUY" />
              <div style={{ background: dark ? "#1a2a3a" : "#E3F2FD", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1565C0", lineHeight: 1.5 }}>{ba.rightTimeToBuy}</div>
              </div>
              {ba.upcomingSalesToWaitFor?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: sc, letterSpacing: 1, marginBottom: 6 }}>SALES TO WAIT FOR</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {ba.upcomingSalesToWaitFor.map((s, i) => (
                      <span key={i} style={{ background: "#FF9900", color: "#fff", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
                        🎉 {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {ba.extraSavingsTip && (
                <div style={{ background: dark ? "#2a1a0a" : "#FFF8E1", borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#E65100", marginBottom: 4 }}>💡 EXTRA SAVINGS TIP</div>
                  <div style={{ fontSize: 12, color: dark ? "#ffcc88" : sc }}>{ba.extraSavingsTip}</div>
                </div>
              )}
              {ba.redFlags?.length > 0 && (
                <div style={{ background: dark ? "#2a1a1a" : "#FFEBEE", borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#E53935", marginBottom: 6 }}>🚩 RED FLAGS</div>
                  {ba.redFlags.map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: dark ? "#ffaaaa" : "#C62828", marginBottom: 4 }}>• {f}</div>
                  ))}
                </div>
              )}
              {ba.checkBeforeBuying?.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: sc, letterSpacing: 1, marginBottom: 6 }}>✅ CHECK BEFORE BUYING</div>
                  {ba.checkBeforeBuying.map((c, i) => (
                    <div key={i} style={{ fontSize: 12, color: tc, marginBottom: 6, display: "flex", gap: 8 }}>
                      <span style={{ color: "#2874F0", flexShrink: 0 }}>→</span>{c}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Alternatives */}
          {review.alternatives?.length > 0 && (
            <Card dark={dark}>
              <SectionLabel text="🔄 BETTER ALTERNATIVES" />
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {review.alternatives.map((alt, i) => (
                  <a key={i} href={`https://www.amazon.in/s?k=${encodeURIComponent(alt.name)}&s=review-rank`}
                    target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{ background: dark ? "#2a2a4a" : "#F8F9FA", borderRadius: 12,
                      padding: "11px 14px", border: "1px solid #eee",
                      display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: tc }}>{alt.name}</div>
                        <div style={{ fontSize: 11, color: "#2E7D32", marginTop: 2 }}>{alt.reason}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#1565C0" }}>{alt.approxPrice}</div>
                        <div style={{ fontSize: 10, color: sc }}>Search →</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Bottom repeat best deal */}
          <div style={{ background: `linear-gradient(135deg,${review.verdictColor},${review.verdictColor}bb)`,
            borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, marginBottom: 8 }}>
              🏆 FINAL BEST DEAL
            </div>
            <a href={review.bestDealUrl} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 0",
                textAlign: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>
                🚀 Open Best Deal on {review.bestDealPlatform} →
              </div>
            </a>
            <button onClick={copyUrl} style={{ width: "100%", padding: "9px 0", borderRadius: 10,
              border: "1.5px solid rgba(255,255,255,0.5)",
              background: copied ? "rgba(255,255,255,0.3)" : "transparent",
              color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
              {copied ? "✅ URL Copied!" : "📋 Copy Best Deal URL"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
