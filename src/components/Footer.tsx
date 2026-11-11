import React from 'react';
import { Mail, Linkedin, Github, Facebook, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:chadractchidi58@gmail.com',
      ariaLabel: 'Envoyer un email à Espérance Chadrac TCHIDI',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/chadractchidi',
      ariaLabel: 'Profil LinkedIn d\'Espérance Chadrac TCHIDI',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/chadest',
      ariaLabel: 'Profil GitHub chadest',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/chadest',
      ariaLabel: 'Profil Facebook',
    },
    {
      name: 'WhatsApp / Message',
      icon: MessageCircle,
      href: 'https://wa.me/?text=Bonjour%20Esp%C3%A9rance',
      ariaLabel: 'Envoyer un message WhatsApp',
    },
  ];

  return (
    <footer className="mt-12 sm:mt-16 pt-8 sm:pt-10 pb-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-4 sm:gap-6 text-center text-xs text-neutral-500 dark:text-neutral-400 px-4">
      {/* Boutons d'icônes sociales circulaires - Adaptatifs Mobile/Tablette/Desktop */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
        {socialLinks.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={item.ariaLabel}
              title={item.name}
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500 dark:hover:border-purple-500 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0"
            >
              <IconComp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          );
        })}
      </div>

      {/* Copyright dynamique */}
      <div className="space-y-1 max-w-md mx-auto">
        <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm">
          &copy; {currentYear} Espérance Chadrac TCHIDI. Tous droits réservés.
        </p>
        <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Chades't Creative • Étudiant & Développeur Systèmes Embarqués, IoT & IA
        </p>
      </div>
    </footer>
  );
};
