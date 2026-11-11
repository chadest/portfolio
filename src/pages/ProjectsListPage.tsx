import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Smartphone, Globe, Cpu, Lock, Wrench, Layers, FileText 
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Footer } from '../components/Footer';

export const ProjectsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [projectFilter, setProjectFilter] = useState<'all' | 'embed' | 'web-android'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projectsData.filter((p) => {
    if (projectFilter === 'embed') return p.platform === 'Système Embarqué';
    if (projectFilter === 'web-android') return p.platform === 'Web' || p.platform === 'Android' || p.platform === 'Logiciel';
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Retour à l'accueil</span>
            <span className="sm:hidden">Accueil</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/contact"
              className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-lg"
            >
              Contact
            </Link>

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

            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Tous les Projets ({filteredProjects.length})
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3">
              Projets & Réalisations
            </h1>
            <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
              Découvrez en détail chacun de mes projets matériels, IoT, vision par ordinateur et applications avec captures réelles et code source.
            </p>
          </div>

          {/* Filter tabs - horizontal scroll on mobile */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs overflow-x-auto max-w-full pb-0.5 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setProjectFilter('all')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                projectFilter === 'all' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Tout ({projectsData.length})
            </button>
            <button
              onClick={() => setProjectFilter('embed')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                projectFilter === 'embed' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Systèmes Embarqués
            </button>
            <button
              onClick={() => setProjectFilter('web-android')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
                projectFilter === 'web-android' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Web & Android
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projets/${project.id}`}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-purple-500/50 hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="aspect-video w-full mb-4 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 relative">
                <ImageWithFallback
                  src={project.image}
                  fallbackSrc={project.gallery?.[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.platform && (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-black/80 backdrop-blur-md text-white border border-white/10">
                      {project.platform === 'Android' && <Smartphone className="w-3 h-3" />}
                      {project.platform === 'Web' && <Globe className="w-3 h-3" />}
                      {project.platform === 'Système Embarqué' && <Cpu className="w-3 h-3" />}
                      {project.platform === 'Logiciel' && <Layers className="w-3 h-3" />}
                      <span>{project.platform}</span>
                    </span>
                  )}
                  {project.isPrivate && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold bg-amber-500/90 text-neutral-950 border border-amber-400/40">
                      <Lock className="w-3 h-3" /> Dépôt Privé
                    </span>
                  )}
                  {project.status && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold bg-purple-500/90 text-white">
                      <Wrench className="w-3 h-3" /> {project.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] sm:text-xs font-semibold text-purple-600 dark:text-purple-400">
                  {project.tech}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-purple-500 transition-colors">
                {project.title}
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
                {project.desc}
              </p>

              <div className="pt-3 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-purple-500 transition-colors">
                <span>Consulter la page complète</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
};
