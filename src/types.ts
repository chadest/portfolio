export interface GalleryImage {
  url: string;
  fallback?: string;
  title: string;
  category: 'web' | 'hardware' | 'all';
}

export interface Project {
  id: string; // slug for routing e.g. 'compteur-energie'
  title: string;
  tech: string;
  desc: string;
  fullDesc: string;
  link?: string;
  isPrivate?: boolean;
  status?: string; // e.g. "Prototype partiel", "Projet finalisé", "En développement"
  platform?: 'Web' | 'Android' | 'Système Embarqué' | 'Logiciel';
  image: string;
  gallery?: string[];
  galleryItems?: GalleryImage[];
}

export interface ExpertiseItem {
  id: string; // slug e.g. 'systemes-embarques'
  title: string;
  categoryName: string;
  color: string;
  desc: string;
  fullDesc: string;
  tools: { name: string; iconUrl?: string; badgeText?: string; customIcon?: string }[];
  hardwareOrDetails?: { title: string; desc: string; image?: string; tag?: string }[];
}
