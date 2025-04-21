import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">About NEXO</h1>
            <p className="text-xl text-gray-300 animate-fade-in opacity-0 [animation-delay:200ms]">
              A hub for tech enthusiasts, developers, cybersecurity learners, and digital creators to connect, share, learn, and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in opacity-0">
              <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At NEXO, we believe in the power of community and collaborative learning. Our mission is to create an inclusive space where technology enthusiasts of all levels can come together to share knowledge, build networks, and push the boundaries of innovation.
              </p>
              <p className="text-gray-300 mb-4">
                We strive to bridge the gap between theoretical knowledge and practical application by fostering an environment where learning happens through doing, sharing, and connecting.
              </p>
              <p className="text-gray-300">
                Through our events, resources, and community initiatives, we aim to empower individuals to harness the potential of technology and create meaningful impact in the digital world.
              </p>
            </div>
            <div className="nexo-glow animate-fade-in opacity-0 [animation-delay:300ms]">
              <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                  alt="NEXO Community" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Our Values</h2>
            <p className="text-gray-300">
              The core principles that guide everything we do at NEXO, from our community interactions to our technical content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="nexo-card animate-fade-in opacity-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-nexo-blue/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-300">
                  We encourage creative thinking and cutting-edge solutions. We believe that innovation drives progress and opens up new possibilities in the tech world.
                </p>
              </div>
            </div>
            
            {/* Value 2 */}
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:200ms]">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-nexo-blue/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Collaboration</h3>
                <p className="text-gray-300">
                  We believe in the power of working together. By sharing ideas, skills, and experiences, we can achieve more than we could individually.
                </p>
              </div>
            </div>
            
            {/* Value 3 */}
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:400ms]">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-nexo-blue/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Continuous Learning</h3>
                <p className="text-gray-300">
                  Technology evolves rapidly, and so do we. We embrace a growth mindset and are committed to lifelong learning and improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="nexo-section bg-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Meet Our Team</h2>
            <p className="text-gray-300">
              The passionate individuals behind NEXO who work tirelessly to create a thriving tech community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="nexo-card animate-fade-in opacity-0 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-primary/50">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4E03AQHj-3z-JAqmiw/profile-displayphoto-shrink_400_400/B4EZRoNrNVGgAg-/0/1736915203349?e=1750896000&v=beta&t=-xnE1kRc6-ZgoymrrX7VH1A1mSksidpoEP4oTSI2lfQ" 
                    alt="Thotakura Yashwanth" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Thotakura Yashwanth</h3>
                <p className="text-nexo-blue mb-4">Founder</p>
                <p className="text-gray-300 text-sm mb-4">
                  Visionary leader passionate about building a community that fosters innovation and technological growth.
                </p>
                <a 
                  href="https://www.linkedin.com/in/thotakura-yashwanth-662688319/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
            
            {/* Community Lead */}
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:200ms] hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-primary/50">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D5603AQFxYFHoINYXCQ/profile-displayphoto-shrink_400_400/B56ZV5SZDvGUAg-/0/1741496620570?e=1750896000&v=beta&t=RR_G9dN1VBC9cmZQUFPZSjI3op62X6gy9rfE-LYiV_A" 
                    alt="Sareddy Karthik Reddy" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Sareddy Karthik Reddy</h3>
                <p className="text-nexo-blue mb-4">Community Lead & Manager</p>
                <p className="text-gray-300 text-sm mb-4">
                  Dedicated to building and nurturing a vibrant tech community where members can connect and grow together.
                </p>
                <a 
                  href="https://www.linkedin.com/in/sareddy-karthik-reddy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
            
            {/* Technical Lead */}
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:400ms] hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-primary/50">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D5635AQGueS2RwympFA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1738325529316?e=1745758800&v=beta&t=UJM8mT7p3IJ4vTDTXBOAkIgQbG37CSs-Frs5bj0yCYk" 
                    alt="Pujitha Gedala" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">PUJITHA GEDALA</h3>
                <p className="text-nexo-blue mb-4">Technical Lead</p>
                <p className="text-gray-300 text-sm mb-4">
                  Leading technical initiatives and guiding the community through innovative tech solutions and projects.
                </p>
                <a 
                  href="https://www.linkedin.com/in/pujithagedala/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="nexo-section bg-gradient-to-b from-[#050505] to-[#070707] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nexo-blue opacity-5 blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Join Our Mission</h2>
            <p className="text-gray-300 mb-8">
              Be part of a community that's shaping the future of technology. Join NEXO today and connect with like-minded individuals who share your passion for innovation and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-us" className="nexo-button">
                Become a Member
              </Link>
              <Link to="/events" className="nexo-button-secondary">
                Explore Our Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
