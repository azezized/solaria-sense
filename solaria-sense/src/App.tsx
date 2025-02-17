import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function App() {
  const [navBg, setNavBg] = useState('transparent');

  useEffect(() => {
    const changeNavBg = () => {
      if (window.scrollY >= 80) {
        setNavBg('bg-white shadow-lg');
      } else {
        setNavBg('transparent');
      }
    };
    window.addEventListener('scroll', changeNavBg);
    return () => window.removeEventListener('scroll', changeNavBg);
  }, []);

  const survivalData = [
    { stage: 'Stade I', rate: 60 },
    { stage: 'Stade II', rate: 40 },
    { stage: 'Stade III', rate: 15 },
    { stage: 'Stade IV', rate: 3 }
  ];

  const problemData = [
    { issue: 'Faux positifs TAFD', value: 25 },
    { issue: 'Coût moyen / patient', value: 50000 },
    { issue: 'Accessibilité zones rurales', value: 30 }
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Background Video */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter blur-sm"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className={`${navBg} fixed w-full transition duration-300 z-20`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <img src="/logo.png" alt="Solaria Sense Logo" className="h-20" />
            <div className="flex space-x-4">
              <a href="#about" className="hover:text-blue-600 transition duration-300">À Propos</a>
              <a href="#technology" className="hover:text-blue-600 transition duration-300">Technologie</a>
              <a href="#team" className="hover:text-blue-600 transition duration-300">Équipe</a>
              <a href="#mission" className="hover:text-blue-600 transition duration-300">Mission</a>
              <a href="#contact" className="hover:text-blue-600 transition duration-300">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center relative z-10">
        <div>
          <h1 className="text-5xl font-bold mb-6">Révolutionner le Dépistage du Cancer</h1>
          <p className="text-xl mb-8">Solaria Sense utilise des biomarqueurs salivaires et l'IA pour un diagnostic rapide et précis.</p>
          <a href="#about" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">En Savoir Plus</a>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="bg-white text-gray-800 py-20 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Mission</h2>
        <p className="text-lg text-center max-w-2xl mx-auto">Offrir aux personnes à risque une solution de dépistage innovante, accessible à la maison, sensible et spécifique pour permettre un dépistage précoce du cancer du poumon.</p>
      </section>

      {/* Technologie Section */}
      <section id="technology" className="bg-gray-100 py-20 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Technologie</h2>
        <p className="text-lg text-center max-w-2xl mx-auto">Notre solution combine la détection ultra-sensible de biomarqueurs salivaires et l'IA pour un diagnostic rapide, accessible et précis, réduisant les délais critiques et augmentant les chances de survie.</p>
      </section>

      {/* Nos Valeurs Section */}
      <section id="values" className="bg-white text-gray-800 py-20 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Valeurs</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Innovation et excellence technologique</h3>
              <p>Intégrer les dernières avancées scientifiques et les promesses de l’intelligence artificielle pour développer des solutions à la pointe de la technologie.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Impact sociétal et accessibilité</h3>
              <p>Améliorer le diagnostic en réduisant les délais, atteindre les communautés éloignées dans le besoin pour augmenter leurs chances de survie.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Engagement envers les patients et leur entourage</h3>
              <p>Développer un outil simple et intuitif pour un usage facile, soutenir et accompagner les patients pour une meilleure prise en charge psychologique.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Collaboration et responsabilité</h3>
              <p>Intégrer l’outil dans le système de santé pour aider le corps médical dans ses fonctions, assurer une validation clinique rigoureuse, respecter les données cliniques du patient.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertises Section */}
      <section id="expertises" className="bg-gray-100 py-20 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Expertises</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Génie biomédical</h3>
              <p>Conception des capteurs bio-moléculaires.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Intelligence artificielle et analyse biomédicale</h3>
              <p>Développement d’algorithmes d’IA pour améliorer la sensibilité et la spécificité du test salivaire.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Développement logiciel et intégration SaaS</h3>
              <p>Création d’une plateforme d’analyse connectée aux Dossiers Médicaux Électroniques (DME).</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Propriété intellectuelle et développement des affaires</h3>
              <p>Protection des innovations et structuration des modèles de commercialisation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe Section */}
      <section id="team" className="bg-white text-gray-800 py-20 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Équipe</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Kathel Dongnang</h3>
              <p>Co-fondatrice et Présidente</p>
              <p>Expertise en génie biomédical, conception de biosenseurs électrochimiques, et propriété intellectuelle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Mouhamed Abdoul Aziz Diop</h3>
              <p>Co-fondateur et Directeur technique</p>
              <p>Expertise en intelligence artificielle, génie logiciel, et développement d’applications.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Erwan Henriou</h3>
              <p>Directeur des opérations</p>
              <p>Expertise en génie biomédical, gestion de projet, et conception de biosenseurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 py-20 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
        <p className="text-lg text-center max-w-2xl mx-auto">Pour plus d'informations, n'hésitez pas à nous contacter.</p>
      </section>
    </div>
  );
}

export default App;