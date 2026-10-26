/**
 * FEATURED PROJECT CONFIGURATION
 * 
 * Project: Pinnacle Movers
 * Category: Website Development
 * Client: Pinnacle Movers
 * Year: 2026
 * Project Type: Client Project
 * Description: A business website developed for Pinnacle Movers to establish its online presence and present its moving services.
 * Responsibility: Website Development
 */

export const featuredProjectData = {
  id: "pinnacle-movers",
  index: "001",
  label: "FEATURED PROJECT / 001",
  title: "PINNACLE MOVERS",
  client: "Pinnacle Movers",
  category: "Website Development",
  service: "Website Development",
  projectType: "Client Project",
  year: "2026",
  status: "Live",
  description: "A business website developed for Pinnacle Movers to establish its online presence and present its moving services.",
  responsibility: "Website Development",
  // Configurable URL for live Pinnacle Movers website (confirmed live at pinnaclemoveww.com)
  liveUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PINNACLE_MOVERS_URL) || "https://pinnaclemoveww.com",
  displayUrl: "pinnaclemoveww.com",
  coverImage: "/images/pinnacle-movers-cover.png",
  alt: "Pinnacle Movers - Business Website Homepage",
};

export default featuredProjectData;
