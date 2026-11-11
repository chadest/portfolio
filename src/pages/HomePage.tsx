import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Mail, Linkedin, Github, Code, Cpu, Video, FileText, Download, 
  ExternalLink, Send, ArrowRight, Facebook, MessageCircle, Moon, Sun, 
  Brain, Youtube, GraduationCap, ChevronRight, Layers, Sparkles,
  Lock, Smartphone, Globe
} from 'lucide-react';

import profileImage from '../assets/images/moi.png';
import { projectsData } from '../data/projects';
import { expertisesData } from '../data/expertises';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Footer } from '../components/Footer';
import { NetworkBackground } from '../components/NetworkBackground';

const TypewriterText = ({ text, speed = 15 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, hasStarted]);

  return (
    <p ref={elementRef} className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed min-h-[100px] sm:min-h-[80px]">
      {displayedText}
      {hasStarted && index < text.length && (
        <span className="inline-block w-1.5 h-4 sm:h-5 ml-1 bg-purple-500 animate-pulse align-middle" />
      )}
    </p>
  );
};

interface HomePageProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | 'embed' | 'web-android'>('all');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    { role: "Stagiaire", company: "Compagnie Béninoise des Textiles (CBT)", desc: "Stage d'immersion professionnelle." },
    { role: "Électricité Bâtiment", company: "Hévie", desc: "Installation et maintenance de circuits électriques." },
    { role: "Informatique de gestion", company: "CACOM", desc: "Assistance en informatique de gestion." },
  ];

  const techStack = [
    { name: "Systèmes Embarqués (Arduino & ESP32)", level: 90 },
    { name: "C / C++ (Micrologiciel & Firmware)", level: 85 },
    { name: "IHM Graphique (Écran LCD TFT 2.4\")", level: 80 },
    { name: "Simulation de Circuits (Proteus)", level: 85 },
    { name: "Edge AI & IA Embarquée (AI-Pi Uno)", level: 80 },
    { name: "Python & Computer Vision (OpenCV)", level: 75 },
    { name: "React, TypeScript & Tailwind CSS", level: 80 },
    { name: "Instrumentation Électrique & Capteurs (PZEM)", level: 80 },
    { name: "Réseaux & Protocoles (UART, I2C, SPI, Wi-Fi)", level: 85 },
  ];

  const formations = [
    {
      title: "Licence en Électronique et Informatique Industrielle",
      desc: "Formation approfondie en systèmes embarqués, programmation bas niveau, électronique analogique et numérique, et télécommunications.",
      period: "En cours"
    },
    {
      title: "Baccalauréat Scientifique (Série D)",
      desc: "Bases solides en mathématiques, sciences physiques et démarche scientifique.",
      period: "Obtenu"
    }
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (projectFilter === 'embed') return p.platform === 'Système Embarqué';
    if (projectFilter === 'web-android') return p.platform === 'Web' || p.platform === 'Android' || p.platform === 'Logiciel';
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Animated Network Mesh Background */}
      <NetworkBackground isDarkMode={isDarkMode} />

      {/* Scroll indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }} 
      />

      {/* Floating Header Controls - Responsive mobile & desktop */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-3">
        <a
          href="/chadest-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Prévisualiser le CV (PDF)"
          title="Prévisualiser le CV (PDF)"
          className="p-2.5 sm:p-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg hover:border-purple-500/50 hover:scale-105 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer flex items-center justify-center shrink-0"
        >
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 sm:p-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg hover:border-purple-500/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center shrink-0"
          aria-label="Basculer le thème"
          title="Basculer le thème"
        >
          {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-20 space-y-12 sm:space-y-20 md:space-y-24 relative z-10">
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 text-center md:text-left pt-2 sm:pt-6">
          <div className="relative group shrink-0">
            <img 
              src={profileImage} 
              alt="Espérance Chadrac TCHIDI" 
              className="w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-purple-500/80 shadow-2xl transition-transform duration-300 group-hover:scale-105" 
            />
          </div>

          <div className="flex-grow w-full">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3">
              Chades't Creative
            </h1>
            <p className="text-lg sm:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-1">
              Espérance Chadrac TCHIDI
            </p>
            <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 font-light mb-6">
              Étudiant & Développeur Systèmes Embarqués, IoT & IA
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4 w-full">
              <Link 
                to="/contact"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> Me contacter
              </Link>
              <a 
                href="#projets"
                className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" /> Voir mes projets
              </a>
            </div>
          </div>
        </header>

        {/* À propos */}
        <section className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-purple-500 pl-3 sm:pl-4 mb-4 sm:mb-6">À propos</h2>
          <TypewriterText 
            text="Passionné par l'innovation technologique, je conçois des systèmes embarqués connectés, des applications mobiles Android et des plateformes web avancées. Mon approche allie rigueur matérielle et ingénierie logicielle pour donner vie à des solutions performantes." 
            speed={15} 
          />
        </section>

        {/* Section Projets - Full Page Routing */}
        <section id="projets" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 border-l-4 border-purple-500 pl-3 sm:pl-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projets & Réalisations</h2>
            </div>

            {/* Filter buttons - horizontal scrollable on mobile */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs overflow-x-auto max-w-full pb-0.5 shrink-0">
              <button
                onClick={() => setProjectFilter('all')}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  projectFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Tout ({projectsData.length})
              </button>
              <button
                onClick={() => setProjectFilter('web-android')}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  projectFilter === 'web-android'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Web & Android
              </button>
              <button
                onClick={() => setProjectFilter('embed')}
                className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  projectFilter === 'embed'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Systèmes Embarqués
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projets/${project.id}`}
                className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-purple-500/60 hover:shadow-xl transition-all flex flex-col group relative cursor-pointer"
              >
                <div className="aspect-video w-full mb-4 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 relative">
                  <ImageWithFallback
                    src={project.image}
                    fallbackSrc={project.gallery?.[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.galleryItems && (
                    <span className="absolute top-3 right-3 px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold bg-black/75 backdrop-blur-md text-white border border-white/10 flex items-center gap-1 sm:gap-1.5">
                      <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {project.galleryItems.length} photos
                    </span>
                  )}
                  {project.isPrivate && (
                    <span className="absolute bottom-3 left-3 px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-medium bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Code Privé
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {project.platform && (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] sm:text-[11px] font-semibold">
                      {project.platform === 'Android' ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      {project.platform}
                    </span>
                  )}
                  {project.status && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] sm:text-[11px] font-medium">
                      {project.status}
                    </span>
                  )}
                  <span className="text-[11px] sm:text-xs font-semibold text-purple-600 dark:text-purple-400 ml-auto">
                    {project.tech}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-purple-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {project.desc}
                </p>

                <div className="pt-3 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-purple-500 transition-colors">
                  <span>Accéder à la page complète</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Domaines d'Expertise */}
        <section>
          <div className="mb-6 sm:mb-8 border-l-4 border-purple-500 pl-3 sm:pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Domaines d'Expertise</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-1">
              Explorez mes spécialités techniques détaillées
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {expertisesData.map((exp) => (
              <Link
                key={exp.id}
                to={`/expertise/${exp.id}`}
                className="p-6 sm:p-8 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    {exp.id === 'systemes-embarques' && <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />}
                    {exp.id === 'ia-vision' && <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />}
                    {exp.id === 'design-media' && <Video className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                  </div>

                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {exp.categoryName}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold mt-1 mb-2 sm:mb-3 group-hover:text-purple-500 transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 sm:mb-6">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Compétences Techniques */}
        <section className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-purple-500 pl-3 sm:pl-4 mb-6 sm:mb-8">Compétences Techniques</h2>
          <div className="space-y-4 sm:space-y-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                onClick={() => setSelectedTech(selectedTech === index ? null : index)}
                className="cursor-pointer group"
              >
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <span className="text-xs sm:text-base font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-purple-500 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 ml-2">{tech.level}%</span>
                </div>
                <div className="w-full h-2 sm:h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="h-full bg-purple-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expériences & Formations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Expériences */}
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-purple-500 pl-3 sm:pl-4 mb-5 sm:mb-6">Expériences</h2>
            <div className="space-y-5 sm:space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="border-b border-neutral-100 dark:border-neutral-800 pb-4 sm:pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">{exp.role}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium mb-1">{exp.company}</p>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-purple-500 pl-3 sm:pl-4 mb-5 sm:mb-6">Formations & Diplômes</h2>
            <div className="space-y-5 sm:space-y-6">
              {formations.map((f, i) => (
                <div key={i} className="border-b border-neutral-100 dark:border-neutral-800 pb-4 sm:pb-5 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">{f.title}</h3>
                    <span className="text-[10px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold shrink-0">
                      {f.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact direct */}
        <section className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Un projet en tête ?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6 sm:mb-8 text-xs sm:text-base">
            Je suis disponible pour des missions en systèmes embarqués, IoT, vision artificielle et développement d'applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <Link 
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> Me contacter / Envoyer un message
            </Link>
            <a 
              href="https://www.linkedin.com/in/chadractchidi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" /> LinkedIn
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
