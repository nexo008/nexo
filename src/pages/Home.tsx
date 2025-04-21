import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-nexo-darker opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1EAEDB]/20 via-transparent to-[#1EAEDB]/10 opacity-100"></div>
        </div>
        
        {/* Enhanced Animated Glow Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#1EAEDB] opacity-5 blur-3xl animate-glow-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-purple-500 opacity-5 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] rounded-full bg-green-500 opacity-5 blur-3xl animate-float-delayed"></div>
        
        <div className="nexo-container text-center z-10">
          <h1 className={`text-6xl md:text-8xl font-bold text-white tracking-tight mb-6 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} [text-shadow:_0_8px_16px_rgba(0,0,0,0.3)]`}>
            NEXO
          </h1>
          <p className={`text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} [text-shadow:_0_4px_8px_rgba(0,0,0,0.2)]`}>
            Building the Future, Together
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link 
              to="/join-us" 
              className="nexo-button transform transition-all duration-300 hover:shadow-glow-primary"
            >
              Join Now
            </Link>
            <Link 
              to="/about" 
              className="nexo-button-secondary transform transition-all duration-300 hover:shadow-glow-secondary"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-smooth">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 transition-colors duration-300 hover:text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 transform transition-all duration-700 hover:translate-x-1">
              <h2 className="text-3xl md:text-4xl nexo-heading mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">Welcome to NEXO</h2>
              <p className="text-gray-300 mb-6">
                NEXO is a vibrant community for tech enthusiasts, developers, cybersecurity learners, and digital creators. 
                We're dedicated to fostering an environment where innovation thrives and knowledge flows freely.
              </p>
              <p className="text-gray-300 mb-8">
                Whether you're a seasoned professional or just beginning your tech journey, 
                NEXO provides the resources, connections, and opportunities to help you grow 
                and make an impact in the ever-evolving world of technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="nexo-link font-medium group">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">About Our Mission</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
                </Link>
                <Link to="/community" className="nexo-link font-medium group">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Meet Our Community</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 nexo-glow transform transition-all duration-700 hover:translate-y-[-4px]">
              <div className="bg-gradient-to-br from-nexo-darker to-nexo-dark p-1 rounded-lg border border-gray-800 shadow-2xl hover:shadow-glow">
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-nexo-darker rounded p-6 text-center transform transition-all duration-300 hover:scale-105">
                    <h3 className="text-5xl font-bold text-primary mb-2">500+</h3>
                    <p className="text-gray-400 text-sm">Community Members</p>
                  </div>
                  <div className="bg-nexo-darker rounded p-6 text-center transform transition-all duration-300 hover:scale-105">
                    <h3 className="text-5xl font-bold text-primary mb-2">50+</h3>
                    <p className="text-gray-400 text-sm">Tech Events</p>
                  </div>
                  <div className="bg-nexo-darker rounded p-6 text-center transform transition-all duration-300 hover:scale-105">
                    <h3 className="text-5xl font-bold text-primary mb-2">20+</h3>
                    <p className="text-gray-400 text-sm">Tech Projects</p>
                  </div>
                  <div className="bg-nexo-darker rounded p-6 text-center transform transition-all duration-300 hover:scale-105">
                    <h3 className="text-5xl font-bold text-primary mb-2">100+</h3>
                    <p className="text-gray-400 text-sm">Learning Resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">Upcoming Events</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our community events to learn, collaborate, and connect with fellow tech enthusiasts.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-nexo-darker/60 border border-gray-800 rounded-xl p-8 text-center shadow-2xl transform transition-all duration-500 hover:shadow-glow hover:-translate-y-1">
            <div className="flex justify-center mb-6">
              <div className="bg-nexo-blue/10 rounded-full p-4 shadow-inner animate-pulse-slow">
                <svg className="h-12 w-12 text-nexo-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">Events Coming Soon</h3>
            <p className="text-gray-300 mb-8">We're planning exciting events for our community. Subscribe to be notified when new events are announced.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="nexo-button shadow-md hover:shadow-glow-primary transition-all duration-300">
                View Events Page
              </Link>
              <button className="nexo-button-secondary shadow-md hover:shadow-glow-secondary transition-all duration-300">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="nexo-section bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nexo-blue opacity-5 blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">Ready to join the NEXO community?</h2>
            <p className="text-gray-300 mb-8">
              Connect with tech enthusiasts, access exclusive resources, and participate in exciting events. 
              Join NEXO today and be part of our growing tech community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-us" className="nexo-button shadow-lg hover:shadow-glow-primary transform transition-all duration-300 hover:scale-105">
                Join NEXO Community
              </Link>
              <Link to="/contact" className="nexo-button-secondary shadow-lg hover:shadow-glow-secondary transform transition-all duration-300 hover:scale-105">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
