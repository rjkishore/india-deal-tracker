// Single Responsibility: AI review state + fetch lifecycle only
import { useState, useCallback } from "react";
import { analyzeProduct } from "../services/aiService";

export const AI_STEPS = [
  "🔍 Scanning Indian market prices...",
  "📊 Comparing platforms...",
  "⭐ Analyzing customer reviews...",
  "📈 Checking price history trends...",
  "💡 Finding best deal URL...",
  "🤖 Generating final verdict...",
];

export function useAIReview() {
  const [review,  setReview]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [step,    setStep]    = useState(0);

  const analyze = useCallback(async (productName) => {
    if (!productName?.trim()) return;
    setLoading(true);
    setError("");
    setReview(null);
    setStep(0);

    const interval = setInterval(() =>
      setStep((s) => (s < AI_STEPS.length - 1 ? s + 1 : s)), 900
    );

    try {
      const result = await analyzeProduct(productName);
      setReview(result);
    } catch (e) {
      setError(`Analysis failed: ${e.message || "Please try again."}`);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setReview(null);
    setError("");
    setStep(0);
  }, []);

  return { review, loading, error, step, analyze, reset };
}
