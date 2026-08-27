// Single Responsibility: Filter state management only
import { useState, useCallback } from "react";
import { DEFAULT_FILTERS } from "../constants/filters";

export function useFilters() {
  const [discount, setDiscount] = useState(DEFAULT_FILTERS.discount);
  const [rating,   setRating]   = useState(DEFAULT_FILTERS.rating);
  const [sort,     setSort]     = useState(DEFAULT_FILTERS.sort);
  const [budget,   setBudget]   = useState(DEFAULT_FILTERS.budget);

  const resetAll = useCallback(() => {
    setDiscount(DEFAULT_FILTERS.discount);
    setRating(DEFAULT_FILTERS.rating);
    setSort(DEFAULT_FILTERS.sort);
    setBudget(DEFAULT_FILTERS.budget);
  }, []);

  const activeCount = [
    discount !== DEFAULT_FILTERS.discount,
    rating   !== DEFAULT_FILTERS.rating,
    sort     !== DEFAULT_FILTERS.sort,
    budget   !== DEFAULT_FILTERS.budget,
  ].filter(Boolean).length;

  return { discount, rating, sort, budget, setDiscount, setRating, setSort, setBudget, resetAll, activeCount };
}
