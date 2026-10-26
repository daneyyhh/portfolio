/**
 * FEATURED PROJECT CONFIGURATION
 * 
 * Client Project: Pinnacle Movers
 * Keep this configuration easy to update:
 * - title: Project name
 * - description: Short project description
 * - category: Category of work
 * - projectType: Project type (e.g. Client Work)
 * - year: Launch/completion year
 * - coverImage: Screenshot path or placeholder
 * - liveUrl: Configurable URL for the live Pinnacle Movers website
 */

export const featuredProjectData = {
  id: "pinnacle-movers",
  label: "FEATURED PROJECT / 001",
  title: "PINNACLE MOVERS",
  description: "A business website developed for Pinnacle Movers.",
  category: "WEB DEVELOPMENT",
  projectType: "CLIENT WORK",
  year: "2026",
  // Primary configurable URL for the live Pinnacle Movers website
  // Update this string or provide VITE_PINNACLE_MOVERS_URL in .env
  liveUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PINNACLE_MOVERS_URL) || "https://pinnaclemovers.com",
  coverImage: "/images/pinnacle-movers-cover.png",
  alt: "Pinnacle Movers - Business Website Development",
};

export default featuredProjectData;
