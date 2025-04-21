import { useState } from "react";
import { Mail } from "lucide-react";
import { submitToGoogleSheets, SHEET_NAMES, FormSubmitResponse } from "../utils/googleSheets";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare contact data with additional metadata
      const contactData = {
        ...formData,
        contactDate: new Date().toISOString(),
        status: "New"
      };
      
      // Submit the form data to Google Sheets
      const response = await submitToGoogleSheets(contactData, SHEET_NAMES.CONTACT_FORM);
      
      // Handle the response
      if (response.success) {
        // Reset the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        
        // Set success status
        setSubmitStatus({
          success: true,
          message: response.message || "Thank you for your message! We'll get back to you soon."
        });
        
        // Log successful contact submission
        console.log("Contact form submitted successfully");
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterStatus(null);
    
    try {
      // Prepare newsletter data with additional metadata
      const newsletterData = {
        email: newsletterEmail,
        subscribeDate: new Date().toISOString(),
        status: "New"
      };
      
      // Submit the newsletter data to Google Sheets
      const response = await submitToGoogleSheets(newsletterData, SHEET_NAMES.NEWSLETTER);
      
      // Handle the response
      if (response.success) {
        // Reset the newsletter email
        setNewsletterEmail("");
        
        // Set success status
        setNewsletterStatus({
          success: true,
          message: response.message || "Thank you for subscribing! We'll keep you updated with the latest community updates, event announcements, and tech insights."
        });
        
        // Log successful newsletter subscription
        console.log("Newsletter subscription submitted successfully");
      } else {
        // Set error status
        setNewsletterStatus({
          success: false,
          message: response.message || "There was an error subscribing to our newsletter. Please try again later."
        });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setNewsletterStatus({
        success: false,
        message: "There was an error subscribing to our newsletter. Please try again later."
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl"></div>
        <div className="nexo-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0">Contact Us</h1>
            <p className="text-xl text-gray-300 animate-fade-in opacity-0 [animation-delay:200ms]">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className="nexo-container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="nexo-card animate-fade-in opacity-0">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
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
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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
                    
                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`nexo-button w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    <p className="text-xs text-gray-400 text-center mt-4">
                      Your information will be stored securely and used only to respond to your inquiry.
                      View our <a href="#" className="text-primary hover:underline">Privacy Policy</a> for more details.
                    </p>
                  </div>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="lg:pl-8">
                <div className="nexo-card animate-fade-in opacity-0 [animation-delay:300ms] mb-8">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Mail className="h-6 w-6 text-nexo-blue" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Email Us</h4>
                        <a href="mailto:nexoteam08@gmail.com" className="text-gray-300 hover:text-primary">
                          nexoteam08@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Location</h4>
                        <p className="text-gray-300">
                          Hyderabad<br />
                          Telangana<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nexo-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Office Hours</h4>
                        <p className="text-gray-300">
                          Monday - Saturday<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="nexo-card animate-fade-in opacity-0 [animation-delay:500ms]">
                  <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
                  <div className="flex flex-wrap gap-4">
                    <a href="https://discord.gg/nexo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-nexo-darker text-gray-300 hover:text-primary hover:shadow-glow-primary transition-all duration-300 transform hover:-translate-y-1">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                    </a>
                    <a href="https://t.me/nexocommunity" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-nexo-darker text-gray-300 hover:text-primary hover:shadow-glow-primary transition-all duration-300 transform hover:-translate-y-1">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.678-.483 2.327-.833 4.32l-1.058 4.403c-.082.33-.246.611-.491.837a2.016 2.016 0 01-.917.483c-.329.082-.658.082-.987 0-.33-.082-.616-.246-.863-.483l-2.38-1.715-1.343.894c-.164.123-.37.185-.576.185a.797.797 0 01-.493-.185.797.797 0 01-.246-.35.797.797 0 01-.061-.432l.37-3.942-3.818-1.343c-.165-.042-.309-.144-.411-.288a.812.812 0 01-.144-.432.851.851 0 01.082-.411.731.731 0 01.288-.329c.123-.083.267-.124.411-.124l14.629-3.696c.329-.082.658-.041.946.123a1.999 1.999 0 011.055 1.096c.164.33.164.698.041 1.056z" />
                      </svg>
                    </a>
                    <a href="https://github.com/nexo-community" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-nexo-darker text-gray-300 hover:text-primary hover:shadow-glow-primary transition-all duration-300 transform hover:-translate-y-1">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/nexo-community" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-nexo-darker text-gray-300 hover:text-primary hover:shadow-glow-primary transition-all duration-300 transform hover:-translate-y-1">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/nexo_community" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-nexo-darker text-gray-300 hover:text-primary hover:shadow-glow-primary transition-all duration-300 transform hover:-translate-y-1">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Find Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Visit our physical location for events, workshops, and community meetups.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-xl border border-gray-800 h-[400px] animate-fade-in opacity-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0969342397847!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085b7e5da61%3A0x71e95656a8677f0!2sSan%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="NEXO Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="nexo-section bg-nexo-darker">
        <div className="nexo-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about contacting and engaging with NEXO.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="nexo-card animate-fade-in opacity-0">
              <h3 className="text-xl font-bold mb-2">How quickly can I expect a response?</h3>
              <p className="text-gray-300">
                We strive to respond to all inquiries within 24-48 hours during weekdays. For urgent matters, 
                please mention it in your message subject.
              </p>
            </div>
            
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:200ms]">
              <h3 className="text-xl font-bold mb-2">I'd like to propose a collaboration. Who should I contact?</h3>
              <p className="text-gray-300">
                You can use this contact form and select "Partnership/Collaboration" as the subject. 
                Our partnerships team will review your proposal and get back to you.
              </p>
            </div>
            
            <div className="nexo-card animate-fade-in opacity-0 [animation-delay:400ms]">
              <h3 className="text-xl font-bold mb-2">How can I report a technical issue with the website?</h3>
              <p className="text-gray-300">
                For technical issues, please select "Technical Support" as your subject when contacting us. 
                Include details about the issue, such as the page you were on and steps to reproduce the problem.
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
            
            {/* Newsletter Form */}
            <div className="max-w-xl mx-auto">
              {/* Success Message */}
              {newsletterStatus && (
                <div className={`p-4 mb-6 rounded-md ${newsletterStatus.success ? 'bg-green-700/20 text-green-400' : 'bg-red-700/20 text-red-400'}`}>
                  <p>{newsletterStatus.message}</p>
                </div>
              )}
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow px-4 py-3 border border-gray-800 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent shadow-inner transition-all duration-300"
                  required
                />
                <button 
                  type="submit" 
                  className="nexo-button whitespace-nowrap"
                  disabled={isNewsletterSubmitting}
                >
                  {isNewsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
