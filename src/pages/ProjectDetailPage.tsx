import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ExternalLink, Maximize2, Monitor, Cpu, Layers, X, 
  Calendar, Wrench, Github, Lock, Smartphone, Globe, Shield, FileText 
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { GalleryImage } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Footer } from '../components/Footer';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'hardware'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; category?: string } | null>(null);

  // Scroll to top upon page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Manage Escape key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Projet introuvable</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">Le projet demandé n'existe pas ou a été déplacé.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const galleryItems: GalleryImage[] = project.galleryItems || (project.gallery ? project.gallery.map((url, i) => ({
    url,
    fallback: url,
    title: `${project.title} - Photo ${i + 1}`,
    category: 'all' as const
  })) : []);

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab || item.category === 'all'
  );

  const webCount = galleryItems.filter((i) => i.category === 'web').length;
  const hardwareCount = galleryItems.filter((i) => i.category === 'hardware').length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-40 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Retour au portfolio</span>
          </button>
          
          <div className="flex items-center gap-3">
            <a
              href="/chadest-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prévisualiser le CV (PDF)"
              title="Prévisualiser le CV (PDF)"
              className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-sm hover:border-purple-500/50 hover:scale-105 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer flex items-center justify-center"
            >
              <FileText size={18} />
            </a>

            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="hidden sm:inline">Projet</span>
              <span className="hidden sm:inline">/</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[150px] sm:max-w-none">
                {project.title}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Title & Metadata */}
        <section className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            {project.platform && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
                {project.platform === 'Android' ? <Smartphone size={13} /> : <Globe size={13} />}
                {project.platform}
              </span>
            )}
            {project.status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold tracking-wider border border-amber-500/20">
                {project.status}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wider border border-purple-500/20">
              <Wrench size={13} />
              {project.tech}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-4xl mb-6">
            {project.desc}
          </p>

          {/* GitHub / Private Status Button */}
          {project.link && (
            <div className="pt-2">
              {project.isPrivate ? (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium border border-neutral-300 dark:border-neutral-700">
                  <Lock size={15} className="text-amber-500" />
                  <span>Code source propriétaire (Dépôt GitHub privé, accès restreint)</span>
                </div>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Github size={16} />
                  <span>Consulter le code sur GitHub</span>
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              )}
            </div>
          )}
        </section>

        {/* Hero Image Showcase */}
        <section className="mb-12 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-xl relative aspect-video md:aspect-[21/9]">
          <ImageWithFallback
            src={project.image}
            fallbackSrc={project.gallery?.[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex justify-between items-end">
            <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-medium border border-white/10">
              Aperçu du projet
            </span>
            <button
              onClick={() => setLightboxImage({ url: project.image, title: project.title })}
              className="p-2 rounded-lg bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-colors"
              title="Agrandir l'image"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </section>

        {/* Technical Description (No fluff) */}
        <section className="mb-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">
            Description & Spécifications
          </h2>
          <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed text-base md:text-lg">
            <p>{project.fullDesc}</p>
          </div>
        </section>

        {/* Gallery Section - Full presentation of all screenshots and photos */}
        {galleryItems.length > 0 && (
          <section className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-l-4 border-purple-500 pl-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Galerie & Captures du projet</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Photographies du prototype et captures d'écran des interfaces
                </p>
              </div>

              {/* Category tabs if both web and hardware exist */}
              {webCount > 0 && hardwareCount > 0 && (
                <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs self-start sm:self-auto shadow-sm">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'all'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Layers size={14} />
                    <span>Tout ({galleryItems.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'web'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Monitor size={14} />
                    <span>Interfaces Web ({webCount})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('hardware')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'hardware'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Cpu size={14} />
                    <span>Matériel & Circuit ({hardwareCount})</span>
                  </button>
                </div>
              )}
            </div>

            {/* Grid of Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => setLightboxImage(item)}
                  className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-lg transition-all flex flex-col"
                >
                  {/* Image Container with sensible framing */}
                  <div className="aspect-[4/3] w-full bg-neutral-950 overflow-hidden relative flex items-center justify-center">
                    <ImageWithFallback
                      src={item.url}
                      fallbackSrc={item.fallback}
                      alt={item.title}
                      className={`w-full h-full ${
                        item.category === 'web' ? 'object-cover object-top' : 'object-cover object-center'
                      } group-hover:scale-105 transition-transform duration-500`}
                    />
                    
                    {/* Category Tag */}
                    {item.category && item.category !== 'all' && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/10">
                        {item.category === 'web' ? 'Interface Web' : 'Matériel / Circuit'}
                      </span>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                      <Maximize2 size={20} />
                      <span className="text-xs font-semibold">Cliquer pour agrandir</span>
                    </div>
                  </div>

                  {/* Caption / Title */}
                  <div className="p-4 flex-grow flex flex-col justify-between border-t border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-semibold text-sm leading-snug text-neutral-800 dark:text-neutral-200">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Maximize2 size={12} /> Format haute résolution
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Other Projects Navigation */}
        <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold mb-6">Découvrir les autres projets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {projectsData
              .filter((p) => p.id !== project.id)
              .slice(0, 4)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/projets/${other.id}`}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/40 transition-all block group"
                >
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">{other.tech}</p>
                  <h4 className="font-bold text-sm group-hover:text-purple-500 transition-colors line-clamp-1">{other.title}</h4>
                </Link>
              ))}
          </div>
        </section>

        <Footer />
      </main>

      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-purple-400 transition-colors cursor-pointer"
                aria-label="Fermer la vue plein écran"
              >
                <X size={28} />
              </button>
              
              <div className="w-full max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl">
                <ImageWithFallback
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  className="max-h-[82vh] w-auto max-w-full object-contain"
                />
              </div>

              {lightboxImage.title && (
                <div className="mt-3 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs sm:text-sm text-neutral-200 font-medium text-center">
                  {lightboxImage.title}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
