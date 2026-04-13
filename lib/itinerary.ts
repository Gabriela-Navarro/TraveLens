import { TravelPlan, Destination } from "./types";

// REVIEWER_NOTE: In production this calls Gemini API (gemini.ts service).
// Mock returns realistic structured JSON matching the AI output schema.
export function generateTravelPlan(destination: Destination): TravelPlan {
  const plans: Record<string, TravelPlan> = {
    tokyo: {
      destination: "Tokio, Japón",
      duration: 3,
      bestTime: "Marzo - Mayo (Sakura) / Oct - Nov",
      budget: "$1,500 - $2,500 USD",
      days: [
        {
          day: 1,
          title: "Shinjuku & Tradición",
          activities: [
            { time: "08:00", name: "Desayuno en Tsukiji", description: "Mercado de pescado fresco y sushi matutino", type: "food" },
            { time: "10:00", name: "Templo Senso-ji", description: "El templo más antiguo de Tokio en Asakusa", type: "culture" },
            { time: "13:00", name: "Almuerzo Ramen", description: "Auténtico ramen en Ichiran Shinjuku", type: "food" },
            { time: "15:00", name: "Shibuya Crossing", description: "El cruce peatonal más famoso del mundo", type: "culture" },
            { time: "19:00", name: "Cena Izakaya", description: "Experiencia gastronómica en bar japonés tradicional", type: "food" },
          ],
        },
        {
          day: 2,
          title: "Modernidad & Tecnología",
          activities: [
            { time: "09:00", name: "Akihabara", description: "Distrito electrónico y cultura manga/anime", type: "culture" },
            { time: "12:00", name: "TeamLab Planets", description: "Arte digital inmersivo de clase mundial", type: "culture" },
            { time: "14:00", name: "Harajuku & Takeshita", description: "Moda alternativa y cultura pop japonesa", type: "culture" },
            { time: "17:00", name: "Observatorio Skytree", description: "Vista panorámica de Tokio desde 634m de altura", type: "adventure" },
            { time: "20:00", name: "Cena Omakase", description: "Experiencia gastronómica premium de chef", type: "food" },
          ],
        },
        {
          day: 3,
          title: "Naturaleza & Despedida",
          activities: [
            { time: "07:00", name: "Meiji Jingu", description: "Santuario sintoísta en bosque urbano", type: "culture" },
            { time: "10:00", name: "Parque Yoyogi", description: "Picnic y observación de la cultura local", type: "rest" },
            { time: "13:00", name: "Shinjuku Gyoen", description: "Jardín nacional con influencias europeas y japonesas", type: "rest" },
            { time: "16:00", name: "Shopping en Ginza", description: "Distrito de lujo y tiendas premium", type: "culture" },
            { time: "19:00", name: "Despedida Teppanyaki", description: "Cena espectáculo de cocina en vivo", type: "food" },
          ],
        },
      ],
      tips: [
        "Compra una IC Card (Suica/Pasmo) para el transporte público",
        "El efectivo sigue siendo rey en muchos lugares",
        "Reserva restaurantes populares con semanas de anticipación",
        "El Wi-Fi portátil es esencial para navegar",
      ],
    },
  };

  // Return specific plan or generate generic one
  if (plans[destination.id]) return plans[destination.id];

  return {
    destination: `${destination.location}, ${destination.country}`,
    duration: 3,
    bestTime: "Consulta el clima local antes de viajar",
    budget: "$1,000 - $2,000 USD",
    days: [
      {
        day: 1,
        title: `Llegada a ${destination.location}`,
        activities: [
          { time: "10:00", name: "Llegada y Check-in", description: "Instalarse en el hotel y orientarse", type: "transport" },
          { time: "13:00", name: "Almuerzo Local", description: `Probar la gastronomía típica de ${destination.country}`, type: "food" },
          { time: "15:00", name: "Centro Histórico", description: "Explorar los puntos icónicos del destino", type: "culture" },
          { time: "19:00", name: "Cena de Bienvenida", description: "Restaurante recomendado por locales", type: "food" },
        ],
      },
      {
        day: 2,
        title: "Exploración Profunda",
        activities: [
          { time: "08:00", name: "Desayuno Local", description: "Desayuno típico de la región", type: "food" },
          { time: "09:00", name: "Atracción Principal", description: `La joya turística de ${destination.location}`, type: "culture" },
          { time: "13:00", name: "Almuerzo en Mercado", description: "Gastronomía de mercado local", type: "food" },
          { time: "15:00", name: "Naturaleza & Aventura", description: "Actividad al aire libre", type: "adventure" },
          { time: "19:00", name: "Cena & Vida Nocturna", description: "Experiencia nocturna local", type: "food" },
        ],
      },
      {
        day: 3,
        title: "Último Día & Recuerdos",
        activities: [
          { time: "09:00", name: "Mercado de Artesanías", description: "Compras de souvenirs auténticos", type: "culture" },
          { time: "11:00", name: "Sitio Histórico", description: "Visita cultural de cierre", type: "culture" },
          { time: "13:00", name: "Almuerzo Despedida", description: "Último almuerzo en el destino", type: "food" },
          { time: "16:00", name: "Partida", description: "Traslado al aeropuerto", type: "transport" },
        ],
      },
    ],
    tips: [
      `Aprende algunas frases básicas en el idioma local de ${destination.country}`,
      "Lleva efectivo para mercados y lugares pequeños",
      "Respeta las costumbres y cultura local",
      "Compra seguro de viaje antes de salir",
    ],
  };
}
