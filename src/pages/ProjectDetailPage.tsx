import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Maximize2, Monitor, Cpu, Layers, X, 
  Calendar, Wrench, Github, Lock, Smartphone, Globe, Shield, FileText, CheckCircle2 
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Projet introuvable</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Le projet demandé n'existe pas ou a été déplacé.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Retour au portfolio</span>
            <span className="sm:hidden">Retour</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/chadest-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prévisualiser le CV (PDF)"
              title="Prévisualiser le CV (PDF)"
              className="p-2 sm:p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-sm hover:border-purple-500/50 hover:scale-105 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer flex items-center justify-center"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="hidden sm:inline">Projet</span>
              <span className="hidden sm:inline">/</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[120px] sm:max-w-[220px]">
                {project.title}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Title & Metadata */}
        <section className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            {project.platform && (
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
                {project.platform === 'Android' ? <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {project.platform}
              </span>
            )}
            {project.status && (
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wider border border-amber-500/20">
                {project.status}
              </span>
            )}
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] sm:text-xs font-semibold tracking-wider border border-purple-500/20">
              <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {project.tech}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            {project.title}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-4xl mb-4 sm:mb-6">
            {project.desc}
          </p>

          {/* GitHub / Private Status Button */}
          {project.link && (
            <div className="pt-1">
              {project.isPrivate ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium border border-neutral-300 dark:border-neutral-700">
                  <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Code source propriétaire </span>
                </div>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>Consulter le code sur GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}
            </div>
          )}
        </section>

        {/* Hero Image Showcase */}
        <section className="mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-xl relative aspect-video md:aspect-[21/9]">
          <ImageWithFallback
            src={project.image}
            fallbackSrc={project.gallery?.[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 flex justify-between items-end">
            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium border border-white/10">
              Aperçu du projet
            </span>
            <button
              onClick={() => setLightboxImage({ url: project.image, title: project.title })}
              className="p-1.5 sm:p-2 rounded-lg bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-colors"
              title="Agrandir l'image"
            >
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </section>

        {/* Technical Description */}
        <section className="mb-10 sm:mb-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-l-4 border-purple-500 pl-3">
            Description & Spécifications
          </h2>
          <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>{project.fullDesc}</p>
          </div>

          {project.advantages && project.advantages.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-neutral-900 dark:text-neutral-100">
                Avantages clés
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.advantages.map((advantage, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Gallery Section */}
        {galleryItems.length > 0 && (
          <section className="mb-12 sm:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-l-4 border-purple-500 pl-3 sm:pl-4">
              <div>
                <h2 className="text-xl sm:text-3xl font-bold">Galerie & Captures du projet</h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Photographies du prototype et captures d'écran des interfaces
                </p>
              </div>

              {/* Category tabs */}
              {webCount > 0 && hardwareCount > 0 && (
                <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs self-start sm:self-auto overflow-x-auto max-w-full pb-0.5 shadow-sm">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      activeTab === 'all'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tout ({galleryItems.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      activeTab === 'web'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Interfaces Web ({webCount})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('hardware')}
                    className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      activeTab === 'hardware'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Matériel & Circuit ({hardwareCount})</span>
                  </button>
                </div>
              )}
            </div>

            {/* Grid of Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  <div className="aspect-[4/3] w-full bg-neutral-950 overflow-hidden relative flex items-center justify-center">
                    <ImageWithFallback
                      src={item.url}
                      fallbackSrc={item.fallback}
                      alt={item.title}
                      className={`w-full h-full ${
                        item.category === 'web' ? 'object-cover object-top' : 'object-cover object-center'
                      } group-hover:scale-105 transition-transform duration-500`}
                    />
                    
                   

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white">
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-xs font-semibold">Agrandir</span>
                    </div>
                  </div>

                  {item.title && (
                    <div className="p-3 sm:p-4 border-t border-neutral-100 dark:border-neutral-800">
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Other Projects Recommendation */}
        <section className="pt-8 sm:pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Découvrir d'autres projets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectsData
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/projets/${other.id}`}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block truncate">
                      {other.tech}
                    </span>
                    <h4 className="font-bold text-sm group-hover:text-purple-500 transition-colors truncate">
                      {other.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-purple-500 transition-all shrink-0 ml-2" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
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
                className="absolute -top-10 sm:-top-12 right-0 p-1.5 text-white hover:text-purple-400 transition-colors cursor-pointer"
                aria-label="Fermer la vue plein écran"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              
              <div className="w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl">
                <ImageWithFallback
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>

              {lightboxImage.title && (
                <div className="mt-3 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs sm:text-sm text-neutral-200 font-medium text-center">
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
