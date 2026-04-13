# TraveLens 🌍

App de planificación de viajes impulsada por IA, construida con **Next.js 16** siguiendo la metodología **AI-Driven SDLC** con prompting basado en roles especializados.

## Estructura del Proyecto

```
travelens/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Inicio — Grid Masonry + búsqueda
│   └── globals.css         # Variables de diseño + animaciones
├── components/
│   ├── DestinationCard.tsx # Tarjeta de destino con favoritos
│   └── DestinationDetail.tsx # Vista detalle + itinerario AI + bento grid
├── lib/
│   ├── types.ts            # Interfaces TypeScript compartidas
│   ├── utils.ts            # Utilidad cn() para clases
│   ├── destinations.ts     # Servicio de datos (mock Unsplash)
│   └── itinerary.ts        # Generador de planes AI (mock Gemini)
└── tests/
    ├── setup.ts
    ├── destinations.test.ts
    ├── itinerary.test.ts
    └── DestinationCard.test.tsx
```

## SDLC con IA — Roles Aplicados

### Rol 1: Arquitecto de Sistema
- Definió la estructura del proyecto y los patrones (BFF, Capa de Servicios)
- Configuró las interfaces TypeScript como "contrato" entre agentes
- Configuró las herramientas: Tailwind, Vitest, path aliases

### Rol 2: Desarrollador Frontend UI/UX
- **Masonry Grid**: Usa CSS `columns` para evitar errores de hidratación en Next.js
- **UI Colorida y Vibrante**: Fondo claro con colores tropicales y tarjetas con sombra suave
- **Responsive**: Mobile-first, diseño de 1 a 3 columnas según el ancho de pantalla
- **Accesibilidad**: Labels ARIA, navegación con teclado (ESC, flechas)
- **Animaciones**: Fade-in escalonado, animación de corazón, transiciones en hover

### Rol 3: QA & Code Reviewer
- 30 pruebas unitarias e integración con Vitest + Testing Library
- Valida los contratos de datos (esquemas de Destination y TravelPlan)
- Pruebas de comportamiento de componentes (clicks, ARIA, favoritos)
- Comentarios `REVIEWER_NOTE` en secciones complejas del código

## Funcionalidades

- 🔍 **Búsqueda en tiempo real** con chips de búsquedas recientes
- ❤️ **Favoritos** con persistencia en localStorage + animación de corazón
- 🗺️ **Itinerario interactivo** (plan AI de 3 días con tabs por día)
- 📱 **Grid Masonry Responsive** (estilo Pinterest)
- 🎨 **Bento Grid** para destinos similares
- ⌨️ **Navegación con teclado** (ESC para regresar)
- 🌎 **9 destinos** incluyendo Guatemala, Argentina y México

## Integración con APIs

### Unsplash (simulado en `lib/destinations.ts`)
- `fetchPopular()` → selección aleatoria de ciudades populares
- `fetchRelated(location, tags)` → búsqueda filtrada por tags con fallbacks
- Mapeo de: `urls.thumb`, `urls.small`, `urls.regular`

### Gemini AI (simulado en `lib/itinerary.ts`)
- `generateTravelPlan(destination)` → retorna JSON estructurado
- Retorna: `ItineraryDay[]`, `tips[]`, `bestTime`, `budget`
- Salida validada contra el esquema de respuesta de Gemini Flash

## Instalación y Uso

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Corre los 30 tests
npm run test:watch # Modo observador
```

## Tecnologías Utilizadas

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** (estilos utilitarios)
- **Lucide React** (íconos)
- **Vitest** + **Testing Library** (pruebas)
