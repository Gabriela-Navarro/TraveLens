import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { Destination } from "../lib/types";

interface Props {
  destination: Destination;
  isFavorite: boolean;
  onSelect: () => void;
  onFavorite: () => void;
}

export function DestinationCard({ destination, isFavorite, onSelect, onFavorite }: Props) {
  const [heartAnim, setHeartAnim] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    onFavorite();
  };

  return (
    <div
      data-testid="destination-card"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      aria-label={`Ver ${destination.title}`}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        cursor: "pointer",
        background: "white",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={imgError ? `https://picsum.photos/seed/${destination.id}/400/300` : destination.imageUrl}
          alt={destination.title}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s ease" }} />
        <button
          data-testid="favorite-button"
          onClick={handleFavorite}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          style={{
            position: "absolute", top: "12px", right: "12px",
            width: "36px", height: "36px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            border: "none", cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <Heart
            size={16}
            fill={isFavorite ? "#ff6b8a" : "none"}
            style={{ color: isFavorite ? "#ff6b8a" : "#aaa" }}
          />
        </button>
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e", marginBottom: "4px", lineHeight: 1.3 }}>
          {destination.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#999", fontSize: "0.8rem", marginBottom: "12px" }}>
          <MapPin size={11} />
          <span>{destination.location}, {destination.country}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem", padding: "3px 10px", borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(247,201,72,0.1))",
                border: "1px solid rgba(255,107,53,0.2)", color: "#ff6b35", fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
