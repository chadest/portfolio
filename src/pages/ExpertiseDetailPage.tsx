import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Brain, Video, CheckCircle, ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { expertisesData } from '../data/expertises';
import { Footer } from '../components/Footer';

export const ExpertiseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const expertise = expertisesData.find((e) => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!expertise) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Domaine introuvable</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Le domaine d'expertise demandé n'existe pas.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const getIcon = () => {
    if (expertise.id === 'systemes-embarques') return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />;
    if (expertise.id === 'ia-vision') return <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />;
    return <Video className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3">
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

            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {expertise.categoryName}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              {getIcon()}
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Expertise Technique
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            {expertise.title}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-3xl leading-relaxed">
            {expertise.desc}
          </p>
        </div>

        {/* Detailed Description */}
        <section className="mb-10 sm:mb-14 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-l-4 border-purple-500 pl-3">
            Approche & Méthodologie
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base md:text-lg">
            {expertise.fullDesc}
          </p>
        </section>

        {/* Tools and Technologies */}
        <section className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-l-4 border-purple-500 pl-3">
            Outils, Logiciels & Environnements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {expertise.tools.map((tool, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-purple-500/40 transition-colors text-center"
              >
                {tool.iconUrl ? (
                  <img
                    src={tool.iconUrl}
                    alt={tool.name}
                    className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 bg-purple-600/10 text-purple-600 dark:text-purple-400 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm">
                    {tool.badgeText || tool.name.slice(0, 2)}
                  </div>
                )}
                <span className="font-semibold text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Implementations & Hardware */}
        {expertise.hardwareOrDetails && expertise.hardwareOrDetails.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 border-l-4 border-purple-500 pl-3">
              Composants & Domaines d'Application
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {expertise.hardwareOrDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl sm:rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    {item.tag && (
                      <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-2 sm:mb-3">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Expertise Links */}
        <section className="pt-8 sm:pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Autres domaines d'expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {expertisesData
              .filter((e) => e.id !== expertise.id)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/expertise/${other.id}`}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      {other.categoryName}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base group-hover:text-purple-500 transition-colors">
                      {other.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:translate-x-1 group-hover:text-purple-500 transition-all shrink-0 ml-2" />
                </Link>
              ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};
