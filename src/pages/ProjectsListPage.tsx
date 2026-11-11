import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Smartphone, Globe, Cpu, Lock, Wrench, Layers 
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Retour à l'accueil</span>
          </button>
          
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Tous les Projets ({filteredProjects.length})
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Projets & Réalisations
            </h1>
            <p className="text-base text-neutral-600 dark:text-neutral-400 font-light max-w-2xl">
              Découvrez en détail chacun de mes projets matériels, IoT, vision par ordinateur et applications avec captures réelles et code source.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs self-start sm:self-auto">
            <button
              onClick={() => setProjectFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                projectFilter === 'all' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Tout ({projectsData.length})
            </button>
            <button
              onClick={() => setProjectFilter('embed')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                projectFilter === 'embed' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Systèmes Embarqués
            </button>
            <button
              onClick={() => setProjectFilter('web-android')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
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
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projets/${project.id}`}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 hover:border-purple-500/50 hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="aspect-video w-full mb-6 overflow-hidden rounded-2xl bg-neutral-950 relative">
                <ImageWithFallback
                  src={project.image}
                  fallbackSrc={project.gallery?.[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {project.platform && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/80 backdrop-blur-md text-white border border-white/10">
                      {project.platform === 'Android' && <Smartphone size={12} />}
                      {project.platform === 'Web' && <Globe size={12} />}
                      {project.platform === 'Système Embarqué' && <Cpu size={12} />}
                      {project.platform === 'Logiciel' && <Layers size={12} />}
                      <span>{project.platform}</span>
                    </span>
                  )}
                  {project.isPrivate && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/90 text-neutral-950 border border-amber-400/40">
                      <Lock size={10} /> Dépôt Privé
                    </span>
                  )}
                  {project.status && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/90 text-white">
                      <Wrench size={10} /> {project.status}
                    </span>
                  )}
                </div>

                {project.galleryItems && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/75 backdrop-blur-md text-white border border-white/10">
                    {project.galleryItems.length} photos & captures
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  {project.tech}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-500 transition-colors">
                {project.title}
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.desc}
              </p>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-purple-500 transition-colors">
                <span>Consulter la page complète</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
};
