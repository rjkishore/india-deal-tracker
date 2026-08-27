/**
 * App.jsx — Orchestration only (Single Responsibility)
 *
 * SOLID principles applied throughout this codebase:
 *
 * S — Single Responsibility
 *   Each file has ONE reason to change:
 *   constants/  → data definitions only
 *   services/   → API calls, URL building, storage
 *   utils/      → pure calculation functions
 *   hooks/      → React state management
 *   components/ → UI rendering only
 *   App.jsx     → wires everything together
 *
 * O — Open/Closed
 *   urlBuilder.js: add a new platform by registering one builder function.
 *   No existing platform code changes.
 *
 * L — Liskov Substitution
 *   storageGet/storageSet accept any JSON-serializable value.
 *   calculateEMI works for both cost and no-cost EMI via getEMISummary.
 *
 * I — Interface Segregation
 *   UI components only receive the props they need.
 *   Pill: label, active, color, onClick, small — nothing else.
 *   Tabs receive only their own slice of state.
 *
 * D — Dependency Inversion
 *   Components depend on abstractions (service functions, hooks),
 *   not on fetch/localStorage directly.
 *   AIReviewTab uses useAIReview hook, not analyzeProduct directly.
 *   FiltersTab uses setters from useFilters hook, not useState directly.
 */

import { useState, useEffect, useRef } from "react";
import { TABS, DEFAULT_FILTERS }        from "./constants/filters";
import { DISCOUNT_OPTIONS }              from "./constants/filters";
import { loadWatchlist, loadRecentSearches } from "./services/storageService";
import { buildDealUrl }                 from "./services/urlBuilder";
import { buildShareText, shareOrCopy }  from "./services/aiService";
import { useSearch }                    from "./hooks/useSearch";
import { useWatchlist }                 from "./hooks/useWatchlist";
import { useFilters }                   from "./hooks/useFilters";
import { SearchTab }   from "./components/tabs/SearchTab";
import { FiltersTab }  from "./components/tabs/FiltersTab";
import { AIReviewTab } from "./components/tabs/AIReviewTab";
import { PaymentTab }  from "./components/tabs/PaymentTab";
import { EMITab }      from "./components/tabs/EMITab";
import { SalesTab }    from "./components/tabs/SalesTab";

export default function App() {
  // ── Theme ──────────────────────────────────────────────────────────────────
  const [dark, setDark] = useState(false);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const [activeTab,      setActiveTab]      = useState(0);
  const [aiAutoTrigger,  setAiAutoTrigger]  = useState(false);
  const [showWL,         setShowWL]         = useState(false);

  // ── Domain hooks ───────────────────────────────────────────────────────────
  const [recentInit, setRecentInit] = useState([]);
  const [wlInit,     setWlInit]     = useState([]);

  useEffect(() => {
    loadWatchlist().then(setWlInit);
    loadRecentSearches().then(setRecentInit);
  }, []);

  const { query, inputVal, recent, search, clearInput, updateInput } =
    useSearch(recentInit);
  const { watchlist, toggle: toggleWL, isWatched } = useWatchlist(wlInit);
  const { discount, rating, sort, budget,
          setDiscount, setRating, setSort, setBudget,
          resetAll, activeCount } = useFilters();

  // ── Share state ─────────────────────────────────────────────────────────────
  const [shareMsg, setShareMsg] = useState("");
  const inputRef = useRef(null);

  // ── Derived values ──────────────────────────────────────────────────────────
  const bg      = dark ? "#0f0f1a" : "#F7F8FA";
  const tc      = dark ? "#f0f0f0" : "#1a1a2e";
  const sc      = dark ? "#aaa"    : "#666";
  const discOpt = DISCOUNT_OPTIONS.find((d) => d.value === discount) || DISCOUNT_OPTIONS[4];

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSearch = (q) => {
    search(q);
    setActiveTab(0);
  };

  const handlePreset = (preset) => {
    setDiscount(preset.discount);
    setRating(preset.rating);
    setSort(preset.sort);
    handleSearch(preset.query);
  };

  const handleOpenAI = () => {
    setAiAutoTrigger(true);
    setActiveTab(2);
  };

  const handleShare = async () => {
    const amzUrl = buildDealUrl("Amazon",   query, discount, rating, sort, budget);
    const fkUrl  = buildDealUrl("Flipkart", query, discount, rating, sort, budget);
    const text   = buildShareText(query, discount, amzUrl, fkUrl);
    const result = await shareOrCopy(text, `${query} — ${discount}% off`);
    const msg = result === "whatsapp" ? "✅ Opening WhatsApp..." : "✅ Copied to clipboard!";
    setShareMsg(msg);
    setTimeout(() => setShareMsg(""), 3000);
  };

  const handleTabChange = (i) => {
    setActiveTab(i);
    if (i !== 2) setAiAutoTrigger(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: bg, minHeight: "100vh", transition: "background 0.3s" }}>

      {/* ── Header ── */}
      <div style={{
        background: dark
          ? "linear-gradient(135deg,#0d0d1f,#1a1a3e)"
          : "linear-gradient(135deg,#1a1a2e 0%,#0f3460 60%,#16213e 100%)",
        padding: "14px 16px 0", color: "#fff",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#FFD700", fontWeight: 700 }}>SMART DEAL TRACKER</div>
              <div style={{ fontSize: 17, fontWeight: 800, marginTop: 1 }}>🏷️ India Shopping Assistant</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowWL((s) => !s)} style={{
                background: showWL ? "#FFD700" : "rgba(255,255,255,0.12)",
                border: "none", borderRadius: 10, padding: "6px 12px",
                color: showWL ? "#1a1a2e" : "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer",
              }}>❤️ {watchlist.length || ""}</button>
              <button onClick={() => setDark((d) => !d)} style={{
                background: "rgba(255,255,255,0.12)", border: "none",
                borderRadius: 10, padding: "6px 10px", color: "#fff", fontSize: 15, cursor: "pointer",
              }}>{dark ? "☀️" : "🌙"}</button>
            </div>
          </div>

          {/* Search bar */}
          <div style={{ background: dark ? "#2a2a4a" : "#fff", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 8, padding: "4px 4px 4px 12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={(e) => updateInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search any product..."
              style={{ flex: 1, border: "none", outline: "none", background: "transparent",
                fontSize: 14, color: dark ? "#fff" : "#333", padding: "8px 0" }}
            />
            {inputVal && (
              <button onClick={() => { clearInput(); inputRef.current?.focus(); }} style={{
                background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "#aaa", padding: "4px",
              }}>✕</button>
            )}
            <button onClick={() => handleSearch()} style={{
              background: "#FFD700", border: "none", borderRadius: 10,
              padding: "9px 14px", fontWeight: 800, fontSize: 13, color: "#1a1a2e", cursor: "pointer",
            }}>Search</button>
          </div>

          {/* Active filters count badge */}
          {activeCount > 0 && (
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ background: discOpt.color, color: "#fff", borderRadius: 20,
                padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>
                {activeCount} filter{activeCount > 1 ? "s" : ""} active
              </span>
              <button onClick={resetAll} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)",
                fontSize: 10, cursor: "pointer", fontWeight: 600 }}>
                Reset ✕
              </button>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 10, overflowX: "auto",
            scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
            maskImage: "linear-gradient(to right, white 80%, transparent 100%)" }}>
            {TABS.map((tab, i) => (
              <button key={i} onClick={() => handleTabChange(i)} style={{
                flexShrink: 0, padding: "8px 10px", border: "none",
                background: activeTab === i ? (dark ? "#0f0f1a" : "#F7F8FA") : "transparent",
                color: activeTab === i ? (dark ? "#FFD700" : "#1a1a2e") : "rgba(255,255,255,0.55)",
                fontWeight: activeTab === i ? 800 : 600, fontSize: 11, cursor: "pointer",
                borderRadius: "8px 8px 0 0", transition: "all 0.15s",
              }}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "14px 14px 32px" }}>

        {/* Watchlist panel */}
        {showWL && (
          <div style={{ background: dark ? "#1e1e2e" : "#fff", borderRadius: 16, padding: "14px 16px",
            marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", border: "2px solid #FFD700" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: tc, marginBottom: 10 }}>❤️ My Watchlist</div>
            {watchlist.length === 0 ? (
              <div style={{ fontSize: 13, color: "#aaa", textAlign: "center", padding: "12px 0" }}>
                Search a product and tap ❤️ to save
              </div>
            ) : watchlist.map((w) => (
              <div key={w} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button onClick={() => handleSearch(w)} style={{
                  flex: 1, background: dark ? "#2a2a4a" : "#F0F4FF", border: "none",
                  borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 600,
                  color: tc, cursor: "pointer", textAlign: "left",
                }}>🔍 {w}</button>
                <button onClick={() => toggleWL(w)} style={{
                  background: "none", border: "none", fontSize: 16, cursor: "pointer",
                }}>❌</button>
              </div>
            ))}
          </div>
        )}

        {/* Tab renderers — each tab only receives its own slice of state */}
        {activeTab === 0 && (
          <SearchTab
            query={query} discount={discount} rating={rating}
            sort={sort} budget={budget} dark={dark} tc={tc} sc={sc}
            recent={recent} watchlist={watchlist} shareMsg={shareMsg}
            onSearch={handleSearch} onToggleWL={toggleWL}
            onShare={handleShare} onOpenAI={handleOpenAI}
            onPreset={handlePreset}
          />
        )}
        {activeTab === 1 && (
          <FiltersTab
            discount={discount} rating={rating} sort={sort} budget={budget}
            dark={dark} tc={tc} query={query}
            setDiscount={setDiscount} setRating={setRating}
            setSort={setSort} setBudget={setBudget}
            onReset={resetAll} onApply={() => query ? setActiveTab(0) : inputRef.current?.focus()}
          />
        )}
        {activeTab === 2 && (
          <AIReviewTab globalQuery={query} autoTrigger={aiAutoTrigger} dark={dark} />
        )}
        {activeTab === 3 && <PaymentTab dark={dark} />}
        {activeTab === 4 && <EMITab dark={dark} />}
        {activeTab === 5 && <SalesTab dark={dark} />}
      </div>
    </div>
  );
}
