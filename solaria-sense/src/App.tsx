import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

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

<section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden pt-16">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
    poster="/images/fallback-image.jpg"
  >
    <source src="/videos/background.mp4" type="video/mp4" />
    <source src="/videos/background.webm" type="video/webm" />
    <source src="/videos/background.ogv" type="video/ogg" />
    Votre navigateur ne supporte pas la vidéo.
  </video>
  <div className="absolute z-10 bg-black bg-opacity-50 w-full h-full"></div>
   {/* Contenu */}
  <div className="relative z-20 text-center px-4">
    <h2 className="text-4xl font-bold mb-4 max-w-2xl mx-auto">
      Diagnostic Précoce du Cancer du Poumon
    </h2>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      Solaria Sense est un dispositif révolutionnaire qui permet un dépistage rapide et efficace du cancer du poumon grâce à un simple test salivaire. Plus besoin d'attendre des mois pour un rendez-vous à l'hôpital et surtout donnez-vous l'occasion de réagir à temps.
    </p>
    <button
      onClick={openModal}
      className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
    >
      Rejoindre la liste d'attente
    </button>
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

      {/* Problem Section */}
      <section id="problem" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Le Problème</h2>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-bold mb-4">Cancer Silencieux et Mortel</h3>
              <p className="text-gray-700">
                Le cancer du poumon est l’un des cancers les plus mortels, principalement parce qu’il est souvent diagnostiqué à un stade avancé (stade 3 ou 4). À ces stades, les options de traitement sont limitées et les chances de survie réduites. Cela s’explique par le fait que le cancer du poumon ne provoque généralement aucun symptôme perceptible aux premiers stades, ce qui rend son dépistage difficile sans un examen médical spécifique.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-bold mb-4">Délais d'Attente Longs</h3>
              <p className="text-gray-700">
                Au Canada, la tomodensitométrie (TDM) est le principal outil utilisé pour dépister le cancer du poumon. Cependant, l’accès à cet examen est un véritable défi pour de nombreux patients. Dans de nombreux cas, les délais d’attente pour obtenir un rendez-vous s’étendent sur plusieurs semaines, voire plusieurs mois. Cette attente prolongée est due à une demande croissante, alors que les capacités des centres médicaux ne suffisent pas à y répondre rapidement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Notre Solution</h2>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-bold mb-4">Test Salivaire à Domicile</h3>
              <p className="text-gray-700">
                Solaria Sense propose un dispositif simple et efficace pour un dépistage accessible aussi bien à domicile que chez votre médecin de famille. Grâce à notre technologie avancée, vous pouvez obtenir des résultats en temps réel, sans avoir à vous déplacer à l’hôpital ni à attendre de longues semaines pour un examen.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-bold mb-4">Filtrage Préliminaire</h3>
              <p className="text-gray-700">
                Notre solution permet de désengorger le système de santé en réduisant drastiquement le nombre de patients nécessitant une tomodensitométrie. Grâce à notre dispositif de dépistage précoce, seuls les cas réellement suspects seront orientés vers un examen approfondi.
              </p>
            </div>
          </div>
        </div>
      </section>

 {/* Team Section */}
<section id="team" className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Notre Équipe</h2>

    {/* Section Cofondateurs */}
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-8">Cofondateurs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kathel */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img src="/kathel.png" alt="Kathel" className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-2xl font-bold mb-2">Kathel Dongnang</h3>
          <p className="text-lg text-gray-600 mb-4">CEO & Cofondatrice</p>
          <p className="text-gray-700">
            Kathel a obtenu un baccalauréat en Sciences Biomédicales à l’Université d’Ottawa en 2021, suivi d’une maîtrise en Génie Biomédical à Polytechnique Montréal, où elle poursuit actuellement son doctorat. Elle a acquis une expertise en culture cellulaire, biocompatibilité et fabrication de biosenseurs lors de stages de recherche à l’Université de Cambridge et dans un centre de recherche en Allemagne. Parallèlement, elle a développé ses compétences entrepreneuriales à travers des programmes spécialisés en sciences de la vie et en technologies médicales.
          </p>
        </div>

        {/* Mouhamed Abdoul Aziz Diop */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img src="/aziz.png" alt="Mouhamed Abdoul Aziz Diop" className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-2xl font-bold mb-2">Mouhamed Abdoul Aziz Diop</h3>
          <p className="text-lg text-gray-600 mb-4">CTO & Cofondateur</p>
          <p className="text-gray-700">
            Ingénieur logiciel passionné par la recherche, l'innovation et l'entrepreneuriat, Aziz a obtenu une passation directe du baccalauréat au doctorat grâce à son engagement exceptionnel en recherche et à ses performances académiques remarquables. Il a développé une expertise approfondie dans le développement logiciel, avec une spécialisation en intelligence artificielle, machine learning et architectures logicielles complexes. Son esprit entrepreneurial ne cesse de se renforcer grâce aux formations qu’il suit et aux incubateurs qu'il rejoint.
          </p>
        </div>
      </div>
    </div>

    {/* Section Équipe */}
    <div>
      <h3 className="text-2xl font-bold text-center mb-8">Équipe</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Erwan */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img src="/erwan.jpeg" alt="Erwan" className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-2xl font-bold mb-2">Erwan Henriou</h3>
          <p className="text-lg text-gray-600 mb-4">COO</p>
          <p className="text-gray-700">
            Diplômé en génie chimique de Polytechnique Montréal, Erwan a acquis des compétences en gestion de projet. Il poursuit actuellement une maîtrise en génie biomédical à l’Université de Montréal, tout en mettant son expertise au service de l'innovation en santé chez Solaria Sense. Passionné par les technologies médicales de pointe, il a également développé des compétences en médecine régénératrice et personnalisée lors de son échange universitaire à l’Université des Sciences et des Technologies de Taïwan.
          </p>
        </div>
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