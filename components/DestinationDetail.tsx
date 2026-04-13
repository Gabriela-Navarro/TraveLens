"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Clock, Utensils, Landmark, Zap, Coffee, Plane, Sparkles, CalendarDays, Wallet, Sun } from "lucide-react";
import { Destination } from "@/lib/types";
import { getRelatedDestinations } from "@/lib/destinations";
import { generateTravelPlan } from "@/lib/itinerary";

interface Props {
  destination: Destination;
  allDestinations: Destination[];
  isFavorite: boolean;
  onFavorite: () => void;
  onBack: () => void;
  onSelectRelated: (d: Destination) => void;
}

const activityIcons: Record<string, React.ReactNode> = {
  food: <Utensils size={13} />,
  culture: <Landmark size={13} />,
  adventure: <Zap size={13} />,
  rest: <Coffee size={13} />,
  transport: <Plane size={13} />,
};

const activityColors: Record<string, string> = {
  food: "#f7c948",
  culture: "#2a9d8f",
  adventure: "#ff6b8a",
  rest: "#00c49a",
  transport: "#aaa",
};

export function DestinationDetail({ destination, isFavorite, onFavorite, onBack, onSelectRelated }: Props) {
  const [activeDay, setActiveDay] = useState(0);
  const [heartAnim, setHeartAnim] = useState(false);
  const [imgError, setImgError] = useState(false);
  const plan = generateTravelPlan(destination);
  const related = getRelatedDestinations(destination);

  const handleFavorite = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    onFavorite();
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [destination.id]);

  return (
    <div style={{ minHeight: "100vh", background: "#fffdf8" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-6 py-3"
        style={{
          background: "rgba(255,253,248,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,107,53,0.1)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            data-testid="back-button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm transition-all hover:opacity-70"
            style={{ color: "#888", background: "none", border: "none", cursor: "pointer" }}
          >
            <ArrowLeft size={16} />
            <span>Todos los destinos</span>
          </button>
          <button
            onClick={handleFavorite}
            data-testid="detail-favorite-button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
            style={{
              background: isFavorite ? "rgba(255,107,138,0.1)" : "#f5f5f0",
              border: `1px solid ${isFavorite ? "rgba(255,107,138,0.3)" : "rgba(0,0,0,0.08)"}`,
              color: isFavorite ? "#ff6b8a" : "#888",
              cursor: "pointer",
            }}
          >
            <Heart size={14} fill={isFavorite ? "#ff6b8a" : "none"} className={heartAnim ? "heart-pop" : ""} />
            {isFavorite ? "Guardado" : "Guardar"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left */}
        <div>
          {/* Hero Image */}
          <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "16/9" }}>
            <img
              src={imgError ? `https://picsum.photos/seed/${destination.id}/1200/675` : destination.imageUrl}
              alt={destination.title}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.5)", lineHeight: 1.2 }}>
                {destination.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {destination.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 text-base leading-relaxed" style={{ color: "#666" }}>
            {destination.description}
          </p>

          {/* Plan Meta */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: <CalendarDays size={16} />, label: "Duración", value: `${plan.duration} días` },
              { icon: <Sun size={16} />, label: "Mejor época", value: plan.bestTime },
              { icon: <Wallet size={16} />, label: "Presupuesto", value: plan.budget },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-2 mb-1" style={{ color: "#2a9d8f" }}>{icon}<span className="text-xs font-medium">{label}</span></div>
                <p className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Itinerary */}
          <div className="mt-8" data-testid="itinerary-panel">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} style={{ color: "#ff6b35" }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 600, color: "#1a1a2e" }}>
                Plan de Viaje AI
              </h2>
            </div>

            {/* Day Tabs */}
            <div className="flex gap-2 mb-4">
              {plan.days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  data-testid={`day-tab-${i}`}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "all 0.2s",
                    background: activeDay === i ? "#2a9d8f" : "#f5f5f0",
                    border: `1px solid ${activeDay === i ? "#2a9d8f" : "rgba(0,0,0,0.08)"}`,
                    color: activeDay === i ? "white" : "#888",
                    cursor: "pointer",
                  }}
                >
                  Día {day.day}
                </button>
              ))}
            </div>

            {/* Day Content */}
            {plan.days[activeDay] && (
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }} className="fade-in-up">
                <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "#1a1a2e", marginBottom: "16px" }}>
                  {plan.days[activeDay].title}
                </h3>
                <div className="flex flex-col gap-3">
                  {plan.days[activeDay].activities.map((act, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start"
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "#fafafa",
                        borderLeft: `3px solid ${activityColors[act.type]}`,
                      }}
                    >
                      <div className="flex items-center gap-1 shrink-0" style={{ color: activityColors[act.type], minWidth: "50px" }}>
                        {activityIcons[act.type]}
                        <Clock size={11} style={{ color: "#bbb" }} />
                        <span style={{ fontSize: "0.7rem", color: "#bbb", fontWeight: 500 }}>{act.time}</span>
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a2e" }}>{act.name}</p>
                        <p style={{ fontSize: "0.78rem", color: "#888", marginTop: "2px" }}>{act.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="mt-4" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <h4 style={{ fontWeight: 600, fontSize: "0.85rem", color: "#f7c948", marginBottom: "8px" }}>💡 Consejos del Experto</h4>
              <ul className="flex flex-col gap-2">
                {plan.tips.map((tip, i) => (
                  <li key={i} style={{ fontSize: "0.8rem", color: "#666", paddingLeft: "12px", borderLeft: "2px solid rgba(0,0,0,0.08)" }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Similar Destinations */}
        <div>
          <h3 style={{ fontWeight: 600, fontSize: "0.85rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Destinos Similares
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {related.map((dest, i) => (
              <div
                key={dest.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectRelated(dest)}
                onKeyDown={(e) => e.key === "Enter" && onSelectRelated(dest)}
                data-testid="related-card"
                style={{
                  gridColumn: i === 0 ? "1 / -1" : "auto",
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: i === 0 ? "16/9" : "1",
                  transition: "transform 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                className="group hover:scale-[0.98]"
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "10px", left: "10px", right: "10px" }}>
                  <p style={{ fontSize: i === 0 ? "0.85rem" : "0.7rem", fontWeight: 600, color: "white", lineHeight: 1.2 }}>
                    {dest.location}
                  </p>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}>{dest.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}