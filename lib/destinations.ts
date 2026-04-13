import { Destination } from "./types";

export const DESTINATIONS: Destination[] = [
{
    id: "tokyo",
    title: "Tokio Neon Dreams",
    location: "Tokio",
    country: "Japón",
    tags: ["cultura", "gastronomía", "tecnología"],
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1170&auto=format&fit=crop",
    thumbUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=200&auto=format&fit=crop",
    smallUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop",
    description: "La metrópolis del futuro donde la tradición y la modernidad coexisten en perfecta armonía.",
},
  {
    id: "paris",
    title: "París, Luz Eterna",
    location: "París",
    country: "Francia",
    tags: ["romance", "arte", "gastronomía"],
    imageUrl: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "La ciudad del amor y la luz, donde cada rincón es una obra maestra.",
  },
  {
    id: "bali",
    title: "Bali, Isla de los Dioses",
    location: "Bali",
    country: "Indonesia",
    tags: ["naturaleza", "espiritualidad", "playa"],
    imageUrl: "https://images.unsplash.com/photo-1704253411612-e4deb715dcd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1704253411612-e4deb715dcd8?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1704253411612-e4deb715dcd8?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Un paraíso tropical donde la espiritualidad y la naturaleza se fusionan.",
  },
  {
    id: "new-york",
    title: "Nueva York, La Gran Manzana",
    location: "Nueva York",
    country: "Estados Unidos",
    tags: ["urbano", "cultura", "gastronomía"],
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "La ciudad que nunca duerme, epicentro de la cultura global.",
  },
  {
    id: "santorini",
    title: "Santorini, Cielo Azul",
    location: "Santorini",
    country: "Grecia",
    tags: ["romance", "playa", "arquitectura"],
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1138&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "La isla más romántica del Mediterráneo con vistas infinitas al mar Egeo.",
  },
  {
    id: "guatemala",
    title: "Guatemala, Corazón Maya",
    location: "Antigua Guatemala",
    country: "Guatemala",
    tags: ["historia", "cultura", "naturaleza"],
    imageUrl: "https://images.unsplash.com/photo-1528543010705-e7e75169b717?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1528543010705-e7e75169b717?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1528543010705-e7e75169b717?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Tierra de volcanes, mayas y colores vibrantes. Antigua es una joya colonial declarada Patrimonio de la Humanidad.",
  },
  {
    id: "argentina",
    title: "Buenos Aires, París del Sur",
    location: "Buenos Aires",
    country: "Argentina",
    tags: ["cultura", "gastronomía", "tango"],
    imageUrl: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "La capital del tango, los asados y la pasión. Una metrópolis vibrante con alma europea y corazón latinoamericano.",
  },
  {
    id: "mexico",
    title: "Ciudad de México, Megalópolis",
    location: "Ciudad de México",
    country: "México",
    tags: ["cultura", "gastronomía", "historia"],
    imageUrl: "https://images.unsplash.com/photo-1682916114863-ba2f7b7d39c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1682916114863-ba2f7b7d39c9?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1682916114863-ba2f7b7d39c9?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Una de las ciudades más grandes del mundo, donde el pasado azteca convive con una escena gastronómica de clase mundial.",
  },
  {
    id: "machu-picchu",
    title: "Machu Picchu, Ciudad Perdida",
    location: "Cusco",
    country: "Perú",
    tags: ["historia", "aventura", "naturaleza"],
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0",
    thumbUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0",
    smallUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "La ciudadela inca en las nubes, maravilla del mundo antiguo.",
  },
];

export function searchDestinations(query: string): Destination[] {
  if (!query.trim()) return DESTINATIONS;
  const q = query.toLowerCase();
  return DESTINATIONS.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getDestinationById(id: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.id === id);
}

export function getRelatedDestinations(destination: Destination, limit = 4): Destination[] {
  return DESTINATIONS.filter((d) => d.id !== destination.id)
    .filter((d) => d.tags.some((t) => destination.tags.includes(t)))
    .slice(0, limit);
}