import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2, 
  Linkedin, Github, Facebook, MessageCircle, FileText, 
  User, MessageSquare, Tag, Clock, Sparkles, Copy, Check, Briefcase
} from 'lucide-react';
import profileImage from '../assets/images/moi.png';
import { Footer } from '../components/Footer';

interface ContactPageProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Systèmes Embarqués & IoT',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Basic email check
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('chadractchidi58@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const mailtoUrl = `mailto:chadractchidi58@gmail.com?subject=${encodeURIComponent(
    `[Formulaire Portfolio] ${formData.subject}`
  )}&body=${encodeURIComponent(
    `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Header Navigation */}
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
              to="/projets"
              className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-lg"
            >
              Projets
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
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Page Title & Subtitle */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Me Contacter
          </h1>
          <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
            Vous avez un projet en systèmes embarqués, IoT, vision artificielle ou développement applicatif ? Envoyez-moi un message direct ou utilisez mes coordonnées professionnelles ci-dessous.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Formulaire Minimaliste */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
              Envoyer un message
            </h2>

            {isSubmitted ? (
              <div className="py-8 px-4 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Message envoyé avec succès !
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Merci <strong>{formData.name}</strong>. Votre message concernant "<strong>{formData.subject}</strong>" a bien été enregistré.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Ouvrir dans votre client email
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Systèmes Embarqués & IoT', message: '' });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Nouveau message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Nom & Prénom *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Chadest"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Adresse Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nom@exemple.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Domaine du projet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Tag className="w-4 h-4" />
                    </div>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                    >
                      <option value="Systèmes Embarqués & IoT">Systèmes Embarqués & IoT (Arduino, ESP32, C/C++)</option>
                      <option value="Vision par Ordinateur & Edge AI">Vision par Ordinateur & Edge AI (OpenCV, YOLO)</option>
                      <option value="Développement Web & Android">Développement Web & Android (React, TypeScript, Mobile)</option>
                      <option value="Stage / Offre d'emploi">Stage / Opportunité professionnelle</option>
                      <option value="Autre demande">Autre demande / Collaboration</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Votre Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3.5 text-neutral-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet, vos besoin ou vos questions..."
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-purple-500 transition-colors resize-y"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Coordonnées Professionnelles */}
          <div className="lg:col-span-5 space-y-6">
            {/* Carte Profil */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl sm:rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={profileImage}
                  alt="Espérance Chadrac TCHIDI"
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Espérance Chadrac TCHIDI</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Chades't Creative</p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Développeur IoT & Systèmes Embarqués</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm">
                {/* Email Direct */}
                <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[10px] text-neutral-400 uppercase font-semibold">Email professionnel</p>
                      <a href="mailto:chadractchidi58@gmail.com" className="font-semibold text-neutral-800 dark:text-neutral-200 hover:text-purple-600 dark:hover:text-purple-400 truncate block">
                        chadractchidi58@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-center gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase font-semibold">Localisation</p>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">Cotonou, Bénin</p>
                  </div>
                </div>

                {/* Réponse rapide */}
                <div className="flex items-center gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase font-semibold">Réactivité</p>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};
