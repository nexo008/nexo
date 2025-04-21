
import { useState } from "react";

// Resource type definition
type Resource = {
  id: number;
  title: string;
  description: string;
  category: "web-development" | "cybersecurity" | "devops" | "ai-ml" | "mobile" | "blockchain";
  type: "article" | "video" | "tutorial" | "tool" | "project";
  link: string;
  image: string;
};

const Resources = () => {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sample resource data
  const resources: Resource[] = [
    {
      id: 1,
      title: "Modern JavaScript for Beginners",
      description: "A comprehensive guide to modern JavaScript features and best practices for beginners.",
      category: "web-development",
      type: "article",
      link: "#",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    },
    {
      id: 2,
      title: "Building Secure Web Applications",
      description: "Learn how to identify and prevent common security vulnerabilities in web applications.",
      category: "cybersecurity",
      type: "tutorial",
      link: "#",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
    },
    {
      id: 3,
      title: "Intro to Docker and Containerization",
      description: "Understand the basics of containers and how to use Docker for development and deployment.",
      category: "devops",
      type: "video",
      link: "#",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    },
    {
      id: 4,
      title: "Machine Learning with Python",
      description: "A practical introduction to machine learning concepts and implementations using Python.",
      category: "ai-ml",
      type: "tutorial",
      link: "#",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    },
    {
      id: 5,
      title: "React Native: Mobile App Development",
      description: "Build cross-platform mobile applications using React Native and JavaScript.",
      category: "mobile",
      type: "article",
      link: "#",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    },
    {
      id: 6,
      title: "Git & GitHub for Version Control",
      description: "Learn effective version control workflows using Git and GitHub for team collaboration.",
      category: "web-development",
      type: "tutorial",
      link: "#",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
    },
    {
      id: 7,
      title: "Network Security Fundamentals",
      description: "Essential knowledge and practices for securing computer networks against threats.",
      category: "cybersecurity",
      type: "article",
      link: "#",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    },
    {
      id: 8,
      title: "VS Code Extensions for Developers",
      description: "The most useful Visual Studio Code extensions to boost your productivity.",
      category: "web-development",
      type: "tool",
      link: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
      id: 9,
      title: "CI/CD Pipeline Implementation",
      description: "Set up continuous integration and deployment pipelines for your projects.",
      category: "devops",
      type: "tutorial",
      link: "#",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    },
    {
      id: 10,
      title: "Smart Contract Development",
      description: "Learn to build and deploy smart contracts on Ethereum blockchain.",
      category: "blockchain",
      type: "project",
      link: "#",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    },
    {
      id: 11,
      title: "Tensorflow for Deep Learning",
      description: "Implement neural networks and deep learning models with Tensorflow.",
      category: "ai-ml",
      type: "video",
      link: "#",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    },
    {
      id: 12,
      title: "Mobile App UI Design Principles",
      description: "Design principles and patterns for creating intuitive mobile user interfaces.",
      category: "mobile",
      type: "article",
      link: "#",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    },
  ];

  // Category and type mapping for display
  const categoryLabels = {
    "web-development": "Web Development",
    "cybersecurity": "Cybersecurity",
    "devops": "DevOps",
    "ai-ml": "AI & Machine Learning",
    "mobile": "Mobile Development",
    "blockchain": "Blockchain",
  };

  const typeLabels = {
    "article": "Article",
    "video": "Video",
    "tutorial": "Tutorial",
    "tool": "Tool",
    "project": "Project",
  };

  // Resource type badge color mapping
  const typeBadgeColors: Record<string, string> = {
    article: "bg-blue-500/10 text-blue-500",
    video: "bg-red-500/10 text-red-500",
    tutorial: "bg-nexo-green/10 text-nexo-green",
    tool: "bg-purple-500/10 text-purple-500",
    project: "bg-orange-500/10 text-orange-500",
  };

  // Filtered resources based on user selection and search
  const filteredResources = resources.filter((resource) => {
    const categoryMatch = filterCategory === "all" || resource.category === filterCategory;
    const typeMatch = filterType === "all" || resource.type === filterType;
    const searchMatch = searchQuery === "" || 
                      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">Resources</h1>
            <p className="text-xl text-gray-300 animate-fade-in opacity-0 [animation-delay:200ms]">
              A curated collection of tools, tutorials, and content to help you grow your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-8 bg-nexo-dark border-b border-gray-800">
        <div className="nexo-container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 px-4 py-2 pl-10 bg-nexo-darker text-gray-300 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Category:</span>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-nexo-darker text-gray-300 text-sm rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="web-development">Web Development</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="devops">DevOps</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="blockchain">Blockchain</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Type:</span>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-nexo-darker text-gray-300 text-sm rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All Types</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                  <option value="tutorial">Tutorials</option>
                  <option value="tool">Tools</option>
                  <option value="project">Projects</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="nexo-card animate-fade-in opacity-0 hover:transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg mb-6">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-primary text-sm">
                      {categoryLabels[resource.category as keyof typeof categoryLabels]}
                    </span>
                    <span className={`${typeBadgeColors[resource.type]} text-xs font-medium px-2 py-1 rounded-full`}>
                      {typeLabels[resource.type as keyof typeof typeLabels]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-300 mb-6">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="nexo-button text-sm"
                  >
                    Access Resource
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-300 mb-4">No resources found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contribute Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className="nexo-container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="md:w-1/2 nexo-glow order-2 md:order-1">
              <div className="rounded-lg overflow-hidden shadow-xl border border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952" 
                  alt="Contribute to NEXO" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Contribute to Our Resource Library</h2>
              <p className="text-gray-300 mb-6">
                Have a valuable resource to share with the community? We welcome contributions from members. 
                Whether it's an article, tutorial, tool, or project you've created, sharing knowledge helps our community grow.
              </p>
              <button className="nexo-button">
                Submit a Resource
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Collections Section */}
      <section className="nexo-section bg-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Curated Collections</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our hand-picked resource collections focused on specific learning paths and technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collection 1 */}
            <div className="nexo-card animate-fade-in opacity-0">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4">Frontend Development Path</h3>
                <p className="text-gray-300 mb-6 flex-grow">
                  Everything you need to become a proficient frontend developer, from HTML basics to advanced React patterns.
                </p>
                <button className="nexo-button text-sm">
                  View Collection
                </button>
              </div>
            </div>
            
            {/* Collection 2 */}
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:200ms]">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4">Cybersecurity Essentials</h3>
                <p className="text-gray-300 mb-6 flex-grow">
                  A comprehensive collection covering security fundamentals, ethical hacking, and security best practices.
                </p>
                <button className="nexo-button text-sm">
                  View Collection
                </button>
              </div>
            </div>
            
            {/* Collection 3 */}
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:400ms]">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4">AI & ML Starter Pack</h3>
                <p className="text-gray-300 mb-6 flex-grow">
                  Resources for those looking to enter the world of artificial intelligence and machine learning.
                </p>
                <button className="nexo-button text-sm">
                  View Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
