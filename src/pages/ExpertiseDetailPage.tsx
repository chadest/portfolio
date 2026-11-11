import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Brain, Video, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { expertisesData } from '../data/expertises';

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
        <h1 className="text-3xl font-bold mb-4">Domaine introuvable</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">Le domaine d'expertise demandé n'existe pas.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl font-medium"
        >
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const getIcon = () => {
    if (expertise.id === 'systemes-embarques') return <Cpu size={24} className="text-orange-500" />;
    if (expertise.id === 'ia-vision') return <Brain size={24} className="text-pink-500" />;
    return <Video size={24} className="text-purple-500" />;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>Retour au portfolio</span>
          </button>
          
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {expertise.categoryName}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              {getIcon()}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Expertise Technique
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {expertise.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-3xl leading-relaxed">
            {expertise.desc}
          </p>
        </div>

        {/* Detailed Description */}
        <section className="mb-14 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">
            Approche & Méthodologie
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base md:text-lg">
            {expertise.fullDesc}
          </p>
        </section>

        {/* Tools and Technologies */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-500 pl-3">
            Outils, Logiciels & Environnements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {expertise.tools.map((tool, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-purple-500/40 transition-colors text-center"
              >
                {tool.iconUrl ? (
                  <img
                    src={tool.iconUrl}
                    alt={tool.name}
                    className="w-12 h-12 mb-3 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 mb-3 bg-purple-600/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center font-bold text-sm">
                    {tool.badgeText || tool.name.slice(0, 2)}
                  </div>
                )}
                <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Implementations & Hardware */}
        {expertise.hardwareOrDetails && expertise.hardwareOrDetails.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-500 pl-3">
              Composants & Domaines d'Application
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {expertise.hardwareOrDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    {item.tag && (
                      <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-3">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Expertise Links */}
        <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold mb-6">Autres domaines d'expertise</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {expertisesData
              .filter((e) => e.id !== expertise.id)
              .map((other) => (
                <Link
                  key={other.id}
                  to={`/expertise/${other.id}`}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      {other.categoryName}
                    </span>
                    <h4 className="font-bold text-base group-hover:text-purple-500 transition-colors">
                      {other.title}
                    </h4>
                  </div>
                  <ArrowRight size={18} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-purple-500 transition-all" />
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
