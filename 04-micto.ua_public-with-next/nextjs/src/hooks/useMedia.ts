import { useState, useEffect } from "react";

export default function useMedia(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
