import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative mr-4">
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
        className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="fr">🇫🇷</option>
        <option value="en">🇬🇧</option>
      </select>
    </div>
  );
};

export default LanguageSelector;