// Single Responsibility: Watchlist state + persistence only
import { useState, useCallback } from "react";
import { toggleInWatchlist, saveWatchlist } from "../services/storageService";

export function useWatchlist(initialList = []) {
  const [watchlist, setWatchlist] = useState(initialList);

  const toggle = useCallback((item) => {
    setWatchlist((prev) => {
      const updated = toggleInWatchlist(prev, item);
      saveWatchlist(updated);
      return updated;
    });
  }, []);

  const isWatched = useCallback(
    (item) => watchlist.includes(item),
    [watchlist]
  );

  return { watchlist, toggle, isWatched };
}
