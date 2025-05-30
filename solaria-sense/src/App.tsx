import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaTwitter, FaGithub, FaUserPlus } from 'react-icons/fa';
import { translations } from './translations';
import { LanguageProvider, useLanguage } from './LanguageContext';
import LanguageSelector from './LanguageSelector';

const App: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
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
          'service_1xcvnhh',
          'template_ub8mrj7',
          formRef.current,
          'cNxEhT6jNt73G6mSI'
        )
        .then(
          (result) => {
            console.log(result.text);
            openConfirmationModal();
            closeModal();
            if (formRef.current) {
              formRef.current.reset();
            }
          },
          (error) => {
            console.log(error.text);
            alert(language === 'fr' 
              ? 'Une erreur est survenue. Veuillez réessayer.'
              : 'An error occurred. Please try again.');
          }
        );
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
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
    handleScroll();
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

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black-600">{t.logo}</h1>
          
          <div className="flex items-center">
            <LanguageSelector />
            <button 
              onClick={toggleMenu} 
              className="md:hidden focus:outline-none ml-4"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li>
                <a href="#problem" onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }} className="text-gray-700 hover:text-blue-600">
                  {t.navProblem}
                </a>
              </li>
              <li>
                <a href="#solution" onClick={(e) => { e.preventDefault(); scrollToSection('solution'); }} className="text-gray-700 hover:text-blue-600">
                  {t.navSolution}
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }} className="text-gray-700 hover:text-blue-600">
                  {t.navTeam}
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-700 hover:text-blue-600">
                  {t.navContact}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
   {/* Hero Section - Version simplifiée */}
<section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden pt-16">
  <div className="absolute inset-0 bg-black/30 z-10"></div>
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
    <img src="/images/ct-scan-static.jpg" alt="Scan pulmonaire" />
  </video>

  <div className="relative z-20 text-center px-4 w-full max-w-6xl">
    <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/20 mx-4">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
        <span className="text-white">{t.heroTitle}</span>
      </h1>
      
      <p className="text-lg md:text-2xl mb-4 md:mb-6 opacity-90 font-light">
        {t.heroSubtitle}
      </p>
      
      {/* Badges */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-6 md:mb-8">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center text-xs md:text-sm border border-white/30">
          <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          {t.heroBadge1}
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center text-xs md:text-sm border border-white/30">
          <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {t.heroBadge2}
        </div>
      </div>
      
      {/* Boutons */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-center gap-3">
        {/* <button
          onClick={openModal}
          className="bg-white hover:bg-gray-100 text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all text-sm md:text-base shadow-md hover:shadow-lg"
        >
          {t.heroCtaPrimary}
        </button> */}
        <button
          onClick={(e) => { e.preventDefault(); scrollToSection('description'); }}
          className="border-2 border-white hover:bg-white/20 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-colors text-sm md:text-base"
        >
          {t.heroCtaSecondary}
        </button>
      </div>
    </div>
  </div>

  <div 
    onClick={(e) => { e.preventDefault(); scrollToSection('description'); }}  
    className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer"
    aria-label={t.heroScroll}
  >
    {/* <svg className="w-6 h-6 md:w-8 md:h-8 text-white/80 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
    </svg> */}
  </div>
</section>

{/* Description Section - Nouvelle section */}
<section id="description" className="py-16 bg-white">
  <div className="container mx-auto px-4 max-w-4xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">{t.heroTitle}</h2>
      <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
    </div>
    
    <div className="prose prose-lg mx-auto text-gray-700">
      <p className="text-lg leading-relaxed mb-6">
        {t.heroDescription}
      </p>
      
      <div className="flex justify-center mt-10">
        <button
          onClick={openModal}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          {t.heroCtaPrimary}
        </button>
      </div>
    </div>
  </div>
</section>

     {/* Problem Section - Professional Healthcare Design */}
<section id="problem" className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-4 md:px-6">
    {/* Section Header */}
    <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-sans">
        {t.problemTitle}
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        {t.problemSubtitle}
      </p>
    </div>
    
    {/* Problem Cards - Responsive Layout */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Late Detection Card */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-300 flex-1 transition-all hover:shadow-md">
        <div className="flex items-start mb-6">
          <div className="bg-gray-100 p-3 md:p-4 rounded-lg mr-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
              {t.lateDetectionTitle}
            </h3>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {t.lateDetectionSubtitle}
            </p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-gray-700 leading-relaxed">
            {t.lateDetectionStats}
          </p>
          
          <div className="bg-gray-100 p-4 md:p-5 rounded-lg border-l-4 border-black">
            <h4 className="font-semibold text-black mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
              {t.lateDetectionWhy}
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {t.lateDetectionReasons.map((reason, index) => (
                <li key={index} className="leading-relaxed">{reason}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center bg-white p-4 rounded-lg border border-gray-300">
            <div className="text-center px-4">
              <p className="text-2xl md:text-3xl font-bold text-black">19%</p>
              <p className="text-xs md:text-sm text-gray-600">{t.survivalRate}</p>
            </div>
            <div className="h-10 md:h-12 w-px bg-gray-300"></div>
            <div className="text-center px-4">
              <p className="text-2xl md:text-3xl font-bold text-black">25%</p>
              <p className="text-xs md:text-sm text-gray-600">{t.deathRate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delays Card */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-300 flex-1 transition-all hover:shadow-md">
        <div className="flex items-start mb-6">
          <div className="bg-gray-100 p-3 md:p-4 rounded-lg mr-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
              {t.delaysTitle}
            </h3>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {t.delaysSubtitle}
            </p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-gray-700 leading-relaxed">
            {t.delaysStats}
          </p>
          
          <div className="bg-gray-100 p-4 md:p-5 rounded-lg border-l-4 border-black">
            <h4 className="font-semibold text-black mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              {t.delaysConsequences}
            </h4>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                {t.delaysEffect}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 md:p-5 rounded-lg border border-gray-300">
            <h4 className="font-semibold text-black mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              {t.hospitalIssues}
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {t.hospitalIssuesList.map((issue, index) => (
                <li key={index} className="leading-relaxed">{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    {/* Key Statistics */}
    <div className="mt-12 md:mt-16 bg-black text-white p-6 md:p-8 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <p className="text-sm md:text-base text-gray-300">
            {t.mortalityRate}
          </p>
          <p className="text-2xl md:text-3xl font-bold">
            {t.mortalityValue}
          </p>
        </div>
        <div className="h-10 md:h-12 w-px bg-gray-500 hidden md:block"></div>
        <div>
          <p className="text-sm md:text-base text-gray-300">
            {t.scanCost}
          </p>
          <p className="text-2xl md:text-3xl font-bold">
            {t.scanCostValue}
          </p>
        </div>
      </div>
    </div>

    {/* Research Sources */}
    <div className="mt-6 md:mt-8 text-xs md:text-sm text-gray-600 text-center">
      <p>{t.sources}</p>
    </div>
  </div>
</section>

      {/* Solution Section */}
<section id="solution" className="bg-gray-100 py-20">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-bold text-black mb-4">{t.solutionTitle}</h2>
      <p className="text-xl text-gray-700">
        {t.solutionSubtitle}
      </p>
    </div>
    
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Test Part */}
      <div className="bg-white p-8 rounded-2xl shadow-xl flex-1">
        <div className="flex items-start mb-6">
          <div className="bg-gray-200 p-4 rounded-xl mr-5">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">{t.testTitle}</h3>
            <p className="text-gray-700 font-medium">{t.testSubtitle}</p>
          </div>
        </div>
        
        <div className="space-y-5 text-gray-700">
          <p dangerouslySetInnerHTML={{ __html: t.testDescription }} />
          
          <div className="bg-gray-100 p-5 rounded-lg">
            <p className="font-semibold mb-2">🔄 {t.testHow}</p>
            <ol className="list-decimal pl-5 space-y-2">
              {t.testSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          <p dangerouslySetInnerHTML={{ __html: t.testRevolution }} />
        </div>
      </div>

      {/* Triage Part */}
      <div className="bg-white p-8 rounded-2xl shadow-xl flex-1">
        <div className="flex items-start mb-6">
          <div className="bg-gray-200 p-4 rounded-xl mr-5">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">{t.triageTitle}</h3>
            <p className="text-gray-700 font-medium">{t.triageSubtitle}</p>
          </div>
        </div>
        
        <div className="space-y-5 text-gray-700">
          <p dangerouslySetInnerHTML={{ __html: t.triageDescription }} />
          
          <div className="bg-gray-100 p-5 rounded-lg border-l-4 border-black">
            <p className="font-semibold mb-2">⚡ {t.triageEffect}</p>
            <ul className="space-y-3">
              {t.triageSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-gray-200 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">{index + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: step }} />
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
              <p className="font-bold text-black mb-2">{t.patientBenefits}</p>
              {t.patientBenefitsList.map((benefit, index) => (
                <p key={index}>{benefit}</p>
              ))}
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
              <p className="font-bold text-black mb-2">{t.hospitalBenefits}</p>
              {t.hospitalBenefitsList.map((benefit, index) => (
                <p key={index}>{benefit}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

     {/* Team Section */}
<section id="team" className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-black mb-4">{t.teamTitle}</h2>
      <div className="w-20 h-1 bg-black mx-auto"></div>
    </div>

    {/* Founders */}
    <div className="mb-20">
      <h3 className="text-2xl font-semibold text-center mb-12 text-gray-800">{t.foundersTitle}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Kathel */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <div className="flex flex-col items-center">
            <img 
              src="/kathel.png" 
              alt={t.kathelName} 
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-gray-200"
            />
            <h3 className="text-2xl font-bold text-black mb-2">{t.kathelName}</h3>
            <p className="text-lg text-gray-700 font-medium mb-6">{t.kathelRole}</p>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>{t.kathelBio1}</p>
            <p>{t.kathelBio2}</p>
            <p>{t.kathelBio3}</p>
          </div>
        </div>

        {/* Aziz */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <div className="flex flex-col items-center">
            <img 
              src="/aziz.png" 
              alt={t.azizName} 
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-gray-200"
            />
            <h3 className="text-2xl font-bold text-black mb-2">{t.azizName}</h3>
            <p className="text-lg text-gray-700 font-medium mb-6">{t.azizRole}</p>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>{t.azizBio1}</p>
            <p>{t.azizBio2}</p>
            <p>{t.azizBio3}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Team */}
    <div>
      <h3 className="text-2xl font-semibold text-center mb-12 text-gray-800">{t.teamMembersTitle}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Erwan */}
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
          <div className="flex flex-col items-center">
            <img 
              src="/erwan.jpeg" 
              alt={t.erwanName} 
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-gray-200"
            />
            <h3 className="text-2xl font-bold text-black mb-2">{t.erwanName}</h3>
            <p className="text-lg text-gray-700 font-medium mb-6">{t.erwanRole}</p>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>{t.erwanBio1}</p>
            <p>{t.erwanBio2}</p>
            <p>{t.erwanBio3}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Contact Section */}
<section id="contact" className="bg-black text-white py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-8">{t.contactTitle}</h2>
    <p className="text-xl mb-8">
      {t.contactSubtitle}
    </p>
    <form className="contactForm max-w-lg mx-auto" ref={contactForm} onSubmit={(e) => sendEmail(e, contactForm)}>
      <input
        type="text"
        name="from_name"
        className="w-full px-4 py-3 rounded-lg mb-4 text-black"
        placeholder={t.contactName}
        required
      />
      <input
        type="email"
        name="from_email"
        className="w-full px-4 py-3 rounded-lg mb-4 text-black"
        placeholder={t.contactEmail}
        required
      />
      <textarea
        name="message"
        className="w-full px-4 py-3 rounded-lg mb-4 text-black"
        placeholder={t.contactMessage}
        rows={4}
        required
      ></textarea>
      <button type="submit" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
        {t.contactSend}
      </button>
    </form>
  </div>
</section>

      {/* Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">{t.orderTitle}</h3>
            <p className="text-gray-700 mb-6">
              {t.orderDescription}
            </p>
            <form ref={commandForm} onSubmit={(e) => sendEmail(e, commandForm)}>
              <input
                type="email"
                name="from_email"
                placeholder={t.orderEmail}
                className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900 border border-gray-300"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
                >
                  {t.orderCancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  {t.orderSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4">{t.confirmationTitle}</h3>
            <p className="text-gray-700 mb-6">
              {t.confirmationMessage}
            </p>
            <button
              onClick={closeConfirmationModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              {t.confirmationClose}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t.copyright}</p>
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

// Wrapper component to provide language context
const WrappedApp: React.FC = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default WrappedApp;