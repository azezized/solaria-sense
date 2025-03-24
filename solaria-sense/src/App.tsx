import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaTwitter, FaGithub, FaUserPlus } from 'react-icons/fa';


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const contactForm = useRef<HTMLFormElement | null>(null);
  const commandForm = useRef<HTMLFormElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

const sendEmail = (e: React.FormEvent, formRef: React.MutableRefObject<HTMLFormElement | null>) => {
  e.preventDefault();

  if (formRef.current) {
    emailjs
      .sendForm(
        'service_1xcvnhh', // Remplacez par votre service ID
        'template_ub8mrj7', // Remplacez par votre template ID
        formRef.current,
        'cNxEhT6jNt73G6mSI' // Remplacez par votre user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          openConfirmationModal();
          closeModal(); // Fermer le modal "Liste d'attente"
          if (formRef.current) {
            formRef.current.reset(); // Réinitialiser le formulaire
          }
        },
        (error) => {
          console.log(error.text);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      );
  }
};

const scrollToHow = () => {
  const howSection = document.getElementById('how-it-works'); // Assurez-vous que votre section a cet ID
  if (howSection) {
    howSection.scrollIntoView({ behavior: 'smooth' });
  }
};

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Déclencher l'affichage initial des sections visibles
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('nav');
      const button = document.querySelector('button[aria-label="Toggle menu"]');
      if (isMenuOpen && menu && !menu.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Fermer le menu mobile après avoir cliqué sur un lien
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Header avec menu hamburger */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Solaria Sense</h1>
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li>
                <a href="#problem" onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }} className="text-gray-700 hover:text-blue-600">
                  Le Problème
                </a>
              </li>
              <li>
                <a href="#solution" onClick={(e) => { e.preventDefault(); scrollToSection('solution'); }} className="text-gray-700 hover:text-blue-600">
                  Notre Solution
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }} className="text-gray-700 hover:text-blue-600">
                  Équipe
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-700 hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

<section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Vidéo de fond seule */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
    poster="/images/ct-scan-fallback.jpg"
  >
    <source src="/videos/background.mp4" type="video/mp4" />
    <source src="/videos/lung-animation.webm" type="video/webm" />
    <img src="/images/ct-scan-static.jpg" alt="Scanner pulmonaire" />
  </video>

  {/* Contenu principal - Version mobile first */}
  <div className="relative z-20 text-center px-4 w-full max-w-6xl">
    <div className="bg-black/60 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl border border-white/10">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
        <span className="text-blue-300">Dépister</span> le cancer du poumon
      </h1>
      <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
        Avant les premiers symptômes
      </p>
      
      {/* Badges optimisés mobile */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-center items-center gap-3 mb-6 md:mb-8">
        <div className="bg-blue-600/90 px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center text-sm md:text-base">
          <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Résultats instantanés
        </div>
        <div className="bg-green-600/90 px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center text-sm md:text-base">
          <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          98% de précision
        </div>
      </div>

      <p className="text-base md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
        <strong>Solaria Sense</strong> révolutionne le dépistage avec une méthode <span className="text-blue-300">non-invasive</span> par test salivaire, détectant les risques avant l'apparition des symptômes.
      </p>

      {/* Boutons optimisés mobile */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-center gap-3">
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold transition-all text-sm md:text-base"
        >
          Commander mon test
        </button>
        <button
          onClick={(e) => { e.preventDefault(); scrollToSection('solution'); }}
          className="border border-white hover:bg-white/10 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base"
        >
          En savoir plus
        </button>
      </div>
    </div>
  </div>

  {/* Indicateur de défilement */}
  <div 
    onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }}  
    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer"
    aria-label="Défiler vers le bas"
  >
    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/80 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
    </svg>
  </div>
</section>


      {/* Modal pour Commander Maintenant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Commander Solaria Sense</h3>
            <p className="text-gray-700 mb-6">
              Veuillez entrer votre adresse e-mail pour rejoindre la liste d'attente et que nous puissions vous contacter ultérieurement.
            </p>
            <form ref={commandForm} onSubmit={(e) => sendEmail(e, commandForm)}>
              <input
                type="email"
                name="from_email"
                placeholder="Votre Email"
                className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900 border border-gray-300"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4">Message Envoyé</h3>
            <p className="text-gray-700 mb-6">
              Merci ! Nous vous recontacterons dès que possible.
            </p>
            <button
              onClick={closeConfirmationModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

{/* Problem Section - Version scientifiquement validée */}
{/* Section Problème - Version scientifiquement validée */}
<section id="problem" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-4xl mx-auto mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Un défi de santé publique majeur</h2>
<p className="mb-3">
    <strong>Le cancer du poumon évolue souvent sans aucun symptôme perceptible pendant les premiers stades.</strong> 
    La tumeur peut se développer pendant des mois, voire des années, sans provoquer de signes visibles.
  </p>
    </div>
    
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Première carte - Diagnostic tardif */}
      <div className="bg-white p-8 rounded-2xl shadow-lg flex-1">
        <div className="flex items-start mb-6">
          <div className="bg-red-100 p-4 rounded-xl mr-5">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Détection trop tardive</h3>
            <p className="text-red-600 font-medium">1 cas sur 2 découvert à un stade avancé</p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Données INSPQ :</strong> Seulement <span className="text-red-600 font-semibold">45%</span> des cancers du poumon sont dépistés aux stades précoces (1-2) au Québec.
          </p>
          
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold mb-2">🩺 Pourquoi un tel retard ?</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pas de symptômes perceptibles pendant des mois ou des années</li>
              <li>Les premiers signes (toux, fatigue) ressemblent à des problèmes bénins</li>
              <li>La tumeur peut se développer sans causer de douleur</li>
            </ul>
          </div>
          
          <div className="flex items-center bg-white p-3 rounded-lg border">
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-red-600">19%</p>
              <p className="text-sm">Survie à 5 ans</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-red-600">25%</p>
              <p className="text-sm">Décès par cancer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième carte - Délais médicaux */}
      <div className="bg-white p-8 rounded-2xl shadow-lg flex-1">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 p-4 rounded-xl mr-5">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Délais inquiétants</h3>
            <p className="text-blue-600 font-medium">2 mois d'attente pour un scanner</p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Rapport officiel 2022 :</strong> Attente moyenne de <span className="font-semibold">9 semaines</span> pour un scanner, pouvant atteindre <span className="text-blue-600 font-semibold">4 mois</span> en région.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">📉 Conséquences</p>
            <div className="space-y-3">
              <div>
                <p>7.5% de chances en moins par mois de retard</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-white p-4 rounded-lg border border-blue-200">
            <p className="font-semibold mb-2">🏥 Problèmes structurels</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Peu d'appareils disponibles</li>
              <li>Matériel souvent vétuste</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    {/* Chiffres clés */}
    <div className="mt-16 bg-gray-900 text-white p-6 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-300">Mortalité au Canada</p>
          <p className="text-2xl font-bold">2 décès/heure</p>
        </div>
        <div className="h-8 w-px bg-gray-600 hidden md:block"></div>
        <div>
          <p className="text-sm text-gray-300">Coût d'un scanner</p>
          <p className="text-2xl font-bold">427$ CAD</p>
        </div>
      </div>
    </div>

    {/* Sources */}
    <div className="mt-8 text-xs text-gray-500">
      <p>Données valides pour la population québécoise adulte - Sources : INSPQ 2023, Statistique Canada</p>
    </div>
  </div>
</section>

    {/* Solution Section */}
<section id="solution" className="bg-blue-50 py-20">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-bold text-blue-900 mb-4">Notre révolution médicale en 2 étapes</h2>
      <p className="text-xl text-blue-700">
        Une approche intelligente qui transforme le dépistage tout en soulageant les hôpitaux
      </p>
    </div>
    
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Partie 1 - Test Salivaire */}
      <div className="bg-white p-8 rounded-2xl shadow-xl flex-1">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 p-4 rounded-xl mr-5">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Le test salivaire simplissime</h3>
            <p className="text-blue-600 font-medium">Dépistage accessible partout, en 15 minutes</p>
          </div>
        </div>
        
        <div className="space-y-5 text-gray-700">
          <p>
            <strong>Imaginez</strong> : un petit kit discret que vous utilisez chez vous, comme un test de grossesse, mais pour détecter des risques médicaux bien plus complexes. Notre technologie transforme <span className="text-blue-600 font-medium">votre salive en véritable assistant médical</span>.
          </p>
          
          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="font-semibold mb-2">🔄 Comment ça marche ?</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Vous prélevez un échantillon salivaire (sans douleur)</li>
              <li>Notre boîtier connecté analyse les biomarqueurs</li>
              <li>Les résultats arrivent sur votre smartphone en temps réel</li>
            </ol>
          </div>
          
          <p>
            <strong>Pourquoi c'est révolutionnaire ?</strong> Finis les délais d'attente interminables : notre système détecte les anomalies <span className="underline">2 à 3 fois plus tôt</span> que les méthodes conventionnelles, avec une précision comparable aux tests hospitaliers.
          </p>
        </div>
      </div>

      {/* Partie 2 - Filtrage Intelligent */}
      <div className="bg-white p-8 rounded-2xl shadow-xl flex-1">
        <div className="flex items-start mb-6">
          <div className="bg-purple-100 p-4 rounded-xl mr-5">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Le triage intelligent</h3>
            <p className="text-purple-600 font-medium">Un "filtre médical" ultra-efficace</p>
          </div>
        </div>
        
        <div className="space-y-5 text-gray-700">
          <p>
            <strong>Le problème actuel :</strong> Les services de radiologie sont engorgés car le nombre de personnes qui veulent se faire dépister augmente. Notre solution agit comme un <span className="text-purple-600 font-medium">sas de sécurité</span> pour le système de santé. Il permet un premier filtrage et redirigent uniquement les personnes à risque vers les hôpitaux.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg border-l-4 border-purple-500">
            <p className="font-semibold mb-2">⚡ L'effet Solaria Sense :</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
                <span><strong>Étape 1 :</strong> Notre algorithme classe les résultats en 3 catégories : <span className="font-medium">vert</span> (aucun risque), <span className="font-medium">orange</span> (surveillance), <span className="font-medium">rouge</span> (urgence médicale)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
                <span><strong>Étape 2 :</strong> Seuls les cas <span className="font-medium">orange et rouge</span> sont orientés vers des scanners, réduisant ainsi la charge hospitalière</span>
              </li>
            </ul>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
              <p className="font-bold text-blue-800 mb-2">Pour les patients</p>
              <p>✓ Moins d'exposition aux rayons X inutiles</p>
              <p>✓ Diagnostic plus rapide</p>
              <p>✓ Réduction du stress lié à l'attente</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
              <p className="font-bold text-purple-800 mb-2">Pour les hôpitaux</p>
              <p>✓ Jusqu'à 60% de scanners en moins</p>
              <p>✓ Meilleure allocation des ressources</p>
              <p>✓ Délais d'attente divisés par 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Team Section */}
<section id="team" className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
      <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
    </div>

    {/* Cofondateurs */}
    <div className="mb-20">
      <h3 className="text-2xl font-semibold text-center mb-12 text-gray-800">Cofondateurs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Kathel */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <img 
              src="/kathel.png" 
              alt="Kathel Dongnang" 
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-100"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kathel Dongnang</h3>
            <p className="text-lg text-blue-600 font-medium mb-6">CEO & Cofondatrice</p>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>
              Kathel a obtenu un baccalauréat en Sciences Biomédicales à l'Université d'Ottawa en 2021, suivi d'une maîtrise en Génie Biomédical à Polytechnique Montréal, où elle poursuit actuellement son doctorat.
            </p>
            <p>
              Elle a acquis une expertise en culture cellulaire, biocompatibilité et fabrication de biosenseurs lors de stages de recherche à l'Université de Cambridge et dans un centre de recherche en Allemagne.
            </p>
            <p>
              Parallèlement, elle a développé ses compétences entrepreneuriales à travers des programmes spécialisés en sciences de la vie et en technologies médicales.
            </p>
          </div>
        </div>

        {/* Aziz */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <img 
              src="/aziz.png" 
              alt="Mouhamed Abdoul Aziz Diop" 
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-100"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Mouhamed Abdoul Aziz Diop</h3>
            <p className="text-lg text-blue-600 font-medium mb-6">CTO & Cofondateur</p>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>
              Ingénieur logiciel passionné par la recherche, l'innovation et l'entrepreneuriat, Aziz a obtenu une passation directe du baccalauréat au doctorat grâce à son engagement exceptionnel en recherche et à ses performances académiques remarquables.
            </p>
            <p>
              Il a développé une expertise approfondie dans le développement logiciel, avec une spécialisation en intelligence artificielle, machine learning et architectures logicielles complexes.
            </p>
            <p>
              Son esprit entrepreneurial ne cesse de se renforcer grâce aux formations qu'il suit et aux incubateurs qu'il rejoint.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Équipe */}
    <div>
      <h3 className="text-2xl font-semibold text-center mb-12 text-gray-800">Équipe</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Erwan */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <img 
              src="/erwan.jpeg" 
              alt="Erwan Henriou" 
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-100"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Erwan Henriou</h3>
            <p className="text-lg text-blue-600 font-medium mb-6">COO</p>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>
              Diplômé en génie chimique de Polytechnique Montréal, Erwan a acquis des compétences en gestion de projet.
            </p>
            <p>
              Il poursuit actuellement une maîtrise en génie biomédical à l'Université de Montréal, tout en mettant son expertise au service de l'innovation en santé chez Solaria Sense.
            </p>
            <p>
              Passionné par les technologies médicales de pointe, il a également développé des compétences en médecine régénératrice et personnalisée lors de son échange universitaire à l'Université des Sciences et des Technologies de Taïwan.
            </p>
          </div>
        </div>

        {/* Ajoutez d'autres membres de l'équipe ici avec la même structure */}
      </div>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Contactez-Nous</h2>
          <p className="text-xl mb-8">
            Vous avez des questions ou souhaitez en savoir plus ? Contactez-nous dès aujourd'hui.
          </p>
          <form className="contactForm max-w-lg mx-auto" ref={contactForm} onSubmit={(e) => sendEmail(e, contactForm)}>
            <input
              type="text"
              name="from_name"
              className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900"
              placeholder="Votre Nom"
              required
            />
            <input
              type="email"
              name="from_email"
              className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900"
              placeholder="Votre Email"
              required
            />
            <textarea
              name="message"
              className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900"
              placeholder="Votre Message"
              rows={4}
              required
            ></textarea>
            <button type="submit" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
              Envoyer
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Solaria Sense. Tous droits réservés.</p>
        </div>
      </footer>

      <style>{`
        section {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        section.fade-in {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default App;