"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Sparkles, Heart, MapPin } from "lucide-react";
import { Destination } from "@/lib/types";
import { DESTINATIONS, searchDestinations } from "@/lib/destinations";
import { DestinationCard } from "@/components/DestinationCard";
import { DestinationDetail } from "@/components/DestinationDetail";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>(DESTINATIONS);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const fav = localStorage.getItem("travelens-favorites");
      if (fav) setFavorites(JSON.parse(fav));
      const recent = localStorage.getItem("travelens-recent");
      if (recent) setRecentSearches(JSON.parse(recent));
    } catch {}
  }, []);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setResults(searchDestinations(q));
    if (q.trim() && q.length > 2) {
      setRecentSearches((prev) => {
        const updated = [q, ...prev.filter((r) => r !== q)].slice(0, 5);
        try { localStorage.setItem("travelens-recent", JSON.stringify(updated)); } catch {}
        return updated;
      });
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try { localStorage.setItem("travelens-favorites", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

 useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (selected && e.key === "Escape") setSelected(null);
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [selected]);

  if (selected) {
    return (
      <DestinationDetail
        destination={selected}
        allDestinations={results}
        isFavorite={favorites.includes(selected.id)}
        onFavorite={() => toggleFavorite(selected.id)}
        onBack={() => setSelected(null)}
        onSelectRelated={setSelected}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fffdf8" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: "rgba(255,253,248,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,107,53,0.1)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles size={20} style={{ color: "#ff6b35" }} />
            <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#2a9d8f",
              }}>
                TraveLens
              </span>
          </div>

          <div className="flex-1 relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#bbb" }} />
            <input
              data-testid="search-input"
              className="search-input w-full pl-10 pr-4 py-2.5 rounded-full text-sm"
              style={{
                background: "#f5f5f0",
                border: "2px solid transparent",
                color: "#1a1a2e",
                transition: "all 0.2s",
              }}
              placeholder="¿A dónde sueñas viajar hoy?"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Buscar destinos"
            />
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#ff6b8a" }}>
            <Heart size={14} fill="#ff6b8a" />
            <span>{favorites.length} guardados</span>
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !query && (
          <div className="max-w-6xl mx-auto mt-2 flex items-center gap-2 flex-wrap" style={{ paddingLeft: "3rem" }}>
            <span className="text-xs" style={{ color: "#bbb" }}>Recientes:</span>
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="text-xs px-3 py-1 rounded-full transition-all hover:opacity-80"
                style={{ background: "#fff0eb", border: "1px solid rgba(255,107,53,0.2)", color: "#ff6b35" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="px-6 pt-12 pb-8 max-w-6xl mx-auto">
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #ff6b35, #f7c948)",
          borderRadius: "20px",
          padding: "4px 14px",
          marginBottom: "12px",
        }}>
          <p className="text-sm" style={{ color: "white", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
            ✈️ Planificación con IA
          </p>
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#1a1a2e",
        }}>
          El mundo entero<br />
          <span style={{ color: "#2a9d8f" }}>
            está esperándote
          </span>
        </h1>
        <p className="mt-3 text-base max-w-md" style={{ color: "#888" }}>
          {results.length} destino{results.length !== 1 ? "s" : ""} increíbles {query ? `para "${query}"` : "listos para explorar"}
        </p>
      </section>

      {/* Masonry Grid */}
      <main
        data-testid="destination-grid"
        className="px-6 pb-16 max-w-6xl mx-auto"
        style={{ columnGap: "1.25rem" }}
      >
        <style>{`
          [data-testid="destination-grid"] { columns: 1; }
          @media (min-width: 768px) { [data-testid="destination-grid"] { columns: 2; } }
          @media (min-width: 1100px) { [data-testid="destination-grid"] { columns: 3; } }
        `}</style>

        {results.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#aaa" }}>
            <MapPin size={40} className="mx-auto mb-4 opacity-30" />
            <p>No encontramos destinos para "{query}"</p>
            <button onClick={() => handleSearch("")} className="mt-3 text-sm underline" style={{ color: "#ff6b35" }}>
              Ver todos
            </button>
          </div>
        ) : (
          results.map((dest, i) => (
            <div
              key={dest.id}
              className="fade-in-up"
              style={{ animationDelay: `${i * 0.07}s`, breakInside: "avoid", marginBottom: "1.25rem" }}
            >
              <DestinationCard
                destination={dest}
                isFavorite={favorites.includes(dest.id)}
                onSelect={() => setSelected(dest)}
                onFavorite={() => toggleFavorite(dest.id)}
              />
            </div>
          ))
        )}
      </main>
    </div>
  );
}