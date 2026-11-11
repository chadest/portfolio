import React from 'react';
import { Mail, Linkedin, Github, Facebook, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  // Année dynamique basée sur la date système
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
    <footer className="mt-16 pt-10 pb-10 border-t border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
      {/* Boutons d'icônes sociales circulaires */}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
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
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500 dark:hover:border-purple-500 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <IconComp size={20} />
            </a>
          );
        })}
      </div>

      {/* Copyright dynamique */}
      <div className="space-y-1">
        <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
          &copy; {currentYear} Espérance Chadrac TCHIDI. Tous droits réservés.
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          Chades't Creative • Architecte de Solutions Numériques & Ingénieur Systèmes Embarqués
        </p>
      </div>
    </footer>
  );
};
