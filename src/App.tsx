import { useState, useCallback } from "react";
import { Search, Sparkles, Heart, MapPin } from "lucide-react";
import { Destination } from "../lib/types";
import { DESTINATIONS, searchDestinations } from "../lib/destinations";
import { DestinationCard } from "../components/DestinationCard";
import { DestinationDetail } from "../components/DestinationDetail";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>(DESTINATIONS);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setResults(searchDestinations(q));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

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
    <div data-testid="app-root" style={{ minHeight: "100vh", background: "#fffdf8" }}>
      <header
        data-testid="app-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "1rem 1.5rem",
          background: "rgba(255,253,248,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,107,53,0.1)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={20} style={{ color: "#ff6b35" }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#2a9d8f" }}>
              TraveLens
            </span>
          </div>
          <div style={{ flex: 1, position: "relative", maxWidth: "36rem" }}>
            <Search size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
            <input
              data-testid="search-input"
              type="text"
              style={{ width: "100%", paddingLeft: "2.5rem", paddingRight: "1rem", paddingTop: "0.625rem", paddingBottom: "0.625rem", borderRadius: "9999px", fontSize: "0.875rem", background: "#f5f5f0", border: "2px solid transparent", color: "#1a1a2e", outline: "none" }}
              placeholder="¿A dónde sueñas viajar hoy?"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Buscar destinos"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ff6b8a", fontWeight: 600, fontSize: "0.875rem" }}>
            <Heart size={14} fill="#ff6b8a" />
            <span>{favorites.length} guardados</span>
          </div>
        </div>
      </header>

      <section style={{ padding: "3rem 1.5rem 2rem", maxWidth: "72rem", margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "linear-gradient(135deg, #ff6b35, #f7c948)", borderRadius: "20px", padding: "4px 14px", marginBottom: "12px" }}>
          <p style={{ color: "white", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, fontSize: "0.875rem" }}>
            ✈️ Planificación con IA
          </p>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, color: "#1a1a2e" }}>
          El mundo entero<br />
          <span style={{ color: "#2a9d8f" }}>está esperándote</span>
        </h1>
        <p style={{ marginTop: "0.75rem", fontSize: "1rem", maxWidth: "28rem", color: "#888" }}>
          {results.length} destino{results.length !== 1 ? "s" : ""} increíbles{" "}
          {query ? `para "${query}"` : "listos para explorar"}
        </p>
      </section>

      <main
        data-testid="destination-grid"
        style={{ padding: "0 1.5rem 4rem", maxWidth: "72rem", margin: "0 auto", columns: "3", columnGap: "1.25rem" }}
      >
        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "#aaa" }}>
            <MapPin size={40} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
            <p>No encontramos destinos para &quot;{query}&quot;</p>
            <button onClick={() => handleSearch("")} style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#ff6b35", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Ver todos
            </button>
          </div>
        ) : (
          results.map((dest, i) => (
            <div key={dest.id} style={{ breakInside: "avoid", marginBottom: "1.25rem" }}>
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
