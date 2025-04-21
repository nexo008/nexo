import { useState } from "react";
import { submitToGoogleSheets, SHEET_NAMES, FormSubmitResponse } from "../utils/googleSheets";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    interests: [] as string[],
    experience: "",
    message: "",
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const availableInterests = [
    "Web Development",
    "Mobile Development",
    "Cybersecurity",
    "DevOps",
    "AI & Machine Learning",
    "Blockchain",
    "Cloud Computing",
    "Data Science",
    "UI/UX Design"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleInterestChange = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare data for membership registration
      const memberData = {
        ...formData,
        registrationDate: new Date().toISOString(),
        membershipStatus: "Active",
        memberType: "Regular"
      };
      
      // Submit the form data to Google Sheets using the Members sheet
      const response = await submitToGoogleSheets(memberData, SHEET_NAMES.JOIN_US) as FormSubmitResponse;
      
      // Handle the response
      if (response.success) {
        // Reset the form
        setFormData({
          fullName: "",
          email: "",
          interests: [],
          experience: "",
          message: "",
          agreeToTerms: false
        });
        
        // Set success status
        setSubmitStatus({
          success: true,
          message: response.message || "Thank you for your interest in joining NEXO! We'll be in touch soon."
        });
        
        // Log successful registration
        console.log("New member registered:", response.data);
      } else {
        // Set error status
        setSubmitStatus({
          success: false,
          message: response.message || "There was an error submitting your form. Please try again later."
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "There was an error submitting your form. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent opacity-10 rounded-full filter blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">Join Us</h1>
            <p className="text-xl text-gray-300 animate-fade-in opacity-0 [animation-delay:200ms]">
              Become part of the NEXO community and connect with tech enthusiasts around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="nexo-card animate-fade-in opacity-0">
                <h2 className="text-2xl font-bold mb-6">Register for NEXO Community</h2>
                
                {/* Status Message */}
                {submitStatus && (
                  <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-700/20 text-green-400' : 'bg-red-700/20 text-red-400'}`}>
                    <p>{submitStatus.message}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    {/* Interests */}
                    <div>
                      <span className="block text-sm font-medium text-gray-300 mb-2">
                        Areas of Interest (select all that apply)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableInterests.map((interest) => (
                          <div key={interest} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`interest-${interest}`}
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleInterestChange(interest)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-500 rounded"
                            />
                            <label
                              htmlFor={`interest-${interest}`}
                              className="ml-2 text-sm text-gray-300"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Experience Level */}
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Experience Level
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select your experience level</option>
                        <option value="beginner">Beginner (0-1 years)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3-5 years)</option>
                        <option value="expert">Expert (5+ years)</option>
                      </select>
                    </div>
                    
                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Tell us a bit about yourself
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="What are you hoping to get out of the NEXO community?"
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    {/* Terms */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleCheckboxChange}
                        required
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-500 rounded"
                      />
                      <label
                        htmlFor="agreeToTerms"
                        className="ml-2 text-sm text-gray-300"
                      >
                        I agree to NEXO's <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`nexo-button w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Join the Community'}
                    </button>
                    
                    <p className="text-xs text-gray-400 text-center mt-4">
                      Your information will be stored in our database and used only for community management purposes.
                      View our <a href="#" className="text-primary hover:underline">Privacy Policy</a> for more details.
                    </p>
                  </div>
                </form>
              </div>
              
              {/* Info */}
              <div>
                <div className="nexo-card animate-fade-in opacity-0 [animation-delay:300ms] mb-8">
                  <h3 className="text-xl font-bold mb-4">Benefits of Joining</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Access to exclusive events, workshops, and webinars</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Connect with a network of tech professionals and enthusiasts</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Opportunities to collaborate on community projects</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Premium learning resources and tech content</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Mentorship opportunities with industry experts</span>
                    </li>
                  </ul>
                </div>

                <div className="nexo-card animate-fade-in opacity-0 [animation-delay:500ms]">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <p className="text-gray-300 mb-6">
                    Join our community platforms to start connecting with fellow members right away.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                      <span>Discord</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.678-.483 2.327-.833 4.32l-1.058 4.403c-.082.33-.246.611-.491.837a2.016 2.016 0 01-.917.483c-.329.082-.658.082-.987 0-.33-.082-.616-.246-.863-.483l-2.38-1.715-1.343.894c-.164.123-.37.185-.576.185a.797.797 0 01-.493-.185.797.797 0 01-.246-.35.797.797 0 01-.061-.432l.37-3.942-3.818-1.343c-.165-.042-.309-.144-.411-.288a.812.812 0 01-.144-.432.851.851 0 01.082-.411.731.731 0 01.288-.329c.123-.083.267-.124.411-.124l14.629-3.696c.329-.082.658-.041.946.123a1.999 1.999 0 011.055 1.096c.164.33.164.698.041 1.056z" />
                      </svg>
                      <span>Telegram</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" clipRule="evenodd" />
                      </svg>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about joining the NEXO community.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="nexo-card animate-fade-in opacity-0">
              <h3 className="text-xl font-bold mb-2">Is there a membership fee to join NEXO?</h3>
              <p className="text-gray-300">
                No, NEXO community membership is completely free. We believe in making tech knowledge and networking accessible to everyone.
              </p>
            </div>
            
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:200ms]">
              <h3 className="text-xl font-bold mb-2">Do I need to be an expert to join?</h3>
              <p className="text-gray-300">
                Not at all. We welcome members of all experience levels, from beginners to experts. 
                NEXO is about learning and growing together, no matter where you are in your tech journey.
              </p>
            </div>
            
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:400ms]">
              <h3 className="text-xl font-bold mb-2">How do I participate in NEXO events?</h3>
              <p className="text-gray-300">
                After joining, you'll receive information about upcoming events through email and our community platforms. 
                Most events require registration, which you can do through our Events page or community channels.
              </p>
            </div>
            
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:600ms]">
              <h3 className="text-xl font-bold mb-2">Can I contribute to NEXO as a speaker or mentor?</h3>
              <p className="text-gray-300">
                Absolutely! We're always looking for community members who want to share their knowledge. 
                Once you join, you can express your interest in contributing, and our team will reach out with opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="nexo-section bg-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">What Our Members Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from members who have found value in being part of the NEXO community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="nexo-card animate-fade-in opacity-0">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face"
                    alt="Testimonial"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">David Alvarez</h3>
                  <p className="text-sm text-nexo-blue">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Joining NEXO was a game-changer for my career. The workshops and mentorship helped me level up my skills, 
                and the connections I've made led to amazing collaboration opportunities."
              </p>
            </div>
            
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:200ms]">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face"
                    alt="Testimonial"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Rebecca Nguyen</h3>
                  <p className="text-sm text-nexo-blue">UI Designer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "I was hesitant to join at first since I'm relatively new to tech, but NEXO's inclusive community made me feel welcome. 
                I've learned so much from the diverse perspectives and supportive environment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-darker to-nexo-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nexo-blue opacity-5 blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Stay Updated</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter to receive the latest community updates, event announcements, and tech insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
              <button type="submit" className="nexo-button whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinUs;
