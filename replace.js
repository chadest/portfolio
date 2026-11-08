const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  ['bg-neutral-950', 'bg-neutral-50 dark:bg-neutral-950'],
  ['text-neutral-100', 'text-neutral-900 dark:text-neutral-100'],
  ['text-neutral-300', 'text-neutral-700 dark:text-neutral-300'],
  ['text-neutral-400', 'text-neutral-600 dark:text-neutral-400'],
  ['bg-neutral-900', 'bg-white dark:bg-neutral-900'],
  ['bg-neutral-800', 'bg-neutral-100 dark:bg-neutral-800'],
  ['border-neutral-800', 'border-neutral-200 dark:border-neutral-800'],
  ['border-neutral-700', 'border-neutral-300 dark:border-neutral-700'],
  ['border-neutral-950', 'border-neutral-50 dark:border-neutral-950'],
  ['bg-black/80', 'bg-white/80 dark:bg-black/80'],
  ['bg-black/50', 'bg-neutral-200/50 dark:bg-black/50'],
  ['text-white', 'text-neutral-900 dark:text-white'], // Wait, 'text-white' might be in a blue button that needs to stay white
];

for (const [from, to] of replacements) {
  if (from === 'text-white') continue; // Let's handle 'text-white' manually or be careful
  // Using word boundaries to avoid matching substrings incorrectly
  const regex = new RegExp(`(?<!dark:)\\b${from.replace(/\//g, '\\/')}\\b`, 'g');
  code = code.replace(regex, to);
}

fs.writeFileSync('src/App.tsx', code);
console.log("Replacements done");
