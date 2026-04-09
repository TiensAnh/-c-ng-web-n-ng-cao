import { useState } from "react";
import { normalizeText } from "../utils/formatters";

export default function useSearchFilter(items, selectText, initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const normalizedQuery = normalizeText(query.trim());

  const filteredItems = normalizedQuery
    ? items.filter((item) => normalizeText(selectText(item)).includes(normalizedQuery))
    : items;

  return {
    query,
    setQuery,
    filteredItems,
  };
}
