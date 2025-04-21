import { Link } from "react-router-dom";

const Community = () => {
  // Empty arrays for community sections
  const testimonials = [];
  const projects = [];

  const platforms = [
    {
      id: 1,
      name: "Discord",
      description: "Join our active Discord server for real-time discussions, help with coding problems, and community announcements.",
      icon: (
        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
      link: "https://discord.gg/4gKEG88cqa",
    },
    {
      id: 2,
      name: "Telegram",
      description: "Subscribe to our Telegram channel for news, event announcements, and learning resources.",
      icon: (
        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.678-.483 2.327-.833 4.32l-1.058 4.403c-.082.33-.246.611-.491.837a2.016 2.016 0 01-.917.483c-.329.082-.658.082-.987 0-.33-.082-.616-.246-.863-.483l-2.38-1.715-1.343.894c-.164.123-.37.185-.576.185a.797.797 0 01-.493-.185.797.797 0 01-.246-.35.797.797 0 01-.061-.432l.37-3.942-3.818-1.343c-.165-.042-.309-.144-.411-.288a.812.812 0 01-.144-.432.851.851 0 01.082-.411.731.731 0 01.288-.329c.123-.083.267-.124.411-.124l14.629-3.696c.329-.082.658-.041.946.123a1.999 1.999 0 011.055 1.096c.164.33.164.698.041 1.056z" />
        </svg>
      ),
      link: "https://t.me/nexotechie",
    },
    {
      id: 3,
      name: "GitHub",
      description: "Collaborate on community projects, contribute to open-source initiatives, and showcase your work.",
      icon: (
        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      link: "https://github.com/nexo008",
    },
    {
      id: 4,
      name: "LinkedIn",
      description: "Connect with our professional network, follow company updates, and engage with our business community.",
      icon: (
        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      link: "https://www.linkedin.com/company/teamnexo/",
    },
    {
      id: 5,
      name: "WhatsApp",
      description: "Join our WhatsApp group for quick updates, informal discussions, and staying connected with fellow members.",
      icon: (
        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      link: "https://chat.whatsapp.com/CvutfhIA1xXF9Jycv8yeSf",
    },
    {
      id: 6,
      name: "Instagram",
      description: "Follow us on Instagram for visual updates, event highlights, and community spotlights.",
      icon: (
        <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      link: "#",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">Community</h1>
            <p className="text-xl text-gray-300 animate-fade-in opacity-0 [animation-delay:200ms]">
              Connect, collaborate, and grow with fellow tech enthusiasts in the NEXO community.
            </p>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Join Our Community Platforms</h2>
            <p className="text-gray-300">
              Connect with NEXO members across various platforms to engage in discussions, 
              collaborate on projects, and stay updated with the latest community activities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform) => (
              <div key={platform.id} className="nexo-card animate-fade-in opacity-0 flex flex-col items-center text-center">
                <div className="mb-6">
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{platform.name}</h3>
                <p className="text-gray-300 mb-6">{platform.description}</p>
                <a href={platform.link} className="nexo-button text-sm mt-auto">
                  Join {platform.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Community Voices</h2>
            <p className="text-gray-300">
              Hear what our members have to say about their experiences with NEXO.
            </p>
          </div>
          
          <div className="text-center py-16 max-w-xl mx-auto">
            <div className="nexo-card">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3 className="text-2xl font-medium text-gray-300 mb-4">Be the first to share your experience</h3>
              <p className="text-gray-400 mb-8">Join our community and share your journey. Your testimonial could inspire others to become part of the NEXO family.</p>
              <button className="nexo-button">
                Join & Share Your Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Projects Section */}
      <section className="nexo-section bg-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Community Projects</h2>
            <p className="text-gray-300">
              Explore projects created by our community members and contributors.
            </p>
          </div>
          
          <div className="text-center py-16 max-w-xl mx-auto">
            <div className="nexo-card">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 className="text-2xl font-medium text-gray-300 mb-4">Start a new community project</h3>
              <p className="text-gray-400 mb-8">Have an idea for a project? Start a new initiative and collaborate with other NEXO members to bring it to life.</p>
              <button className="nexo-button">
                Propose a Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-darker to-nexo-dark">
        <div className="nexo-container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Community Guidelines</h2>
              <p className="text-gray-300 mb-4">
                At NEXO, we're committed to creating a welcoming, inclusive, and supportive environment for all members.
                Our community guidelines help maintain a positive space for learning and collaboration.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Be respectful and considerate to all community members</li>
                <li>Share knowledge and help others grow</li>
                <li>Provide constructive feedback and avoid negativity</li>
                <li>Respect intellectual property and give proper attribution</li>
                <li>Report any violations or concerns to community moderators</li>
              </ul>
              <button className="nexo-button">
                Read Full Guidelines
              </button>
            </div>
            <div className="md:w-1/2 nexo-glow">
              <div className="rounded-lg overflow-hidden shadow-xl border border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a" 
                  alt="NEXO Community" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Ready to Join Our Community?</h2>
            <p className="text-gray-300 mb-8">
              Become part of NEXO today and connect with a network of tech enthusiasts, 
              access exclusive resources, and participate in our community events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join-us" className="nexo-button">
                Join NEXO Community
              </Link>
              <Link to="/contact" className="nexo-button-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Community;
