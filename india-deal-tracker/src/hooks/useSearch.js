// Single Responsibility: Search state + recent searches management only
import { useState, useCallback } from "react";
import { addToRecent, saveRecentSearches } from "../services/storageService";

/**
 * Manages the search query, input value, and recent search history.
 * Separates search state logic from UI rendering.
 */
export function useSearch(initialRecent = []) {
  const [query,    setQuery]    = useState("");
  const [inputVal, setInputVal] = useState("");
  const [recent,   setRecent]   = useState(initialRecent);

  const search = useCallback(
    (q) => {
      const trimmed = (q || inputVal).trim();
      if (!trimmed) return;
      setQuery(trimmed);
      setInputVal(trimmed);
      const updated = addToRecent(recent, trimmed);
      setRecent(updated);
      saveRecentSearches(updated);
    },
    [inputVal, recent]
  );

  const clearInput = useCallback(() => {
    setInputVal("");
  }, []);

  const updateInput = useCallback((val) => {
    setInputVal(val);
  }, []);

  return { query, inputVal, recent, search, clearInput, updateInput };
}
