import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from './translations';

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({
  language: 'fr',
  setLanguage: () => {}
});

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguage(savedLang);
      return;
    }

    // Then detect browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (browserLang === 'fr' || browserLang === 'en') {
      setLanguage(browserLang);
    } else {
      setLanguage('en'); // Default to English
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);