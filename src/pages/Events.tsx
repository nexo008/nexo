import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

// Event type definition
type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "webinar" | "workshop" | "hackathon" | "meetup";
  description: string;
  location: string;
  image: string;
  isPast: boolean;
};

const Events = () => {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("upcoming");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Empty events array (removed fake data)
  const events: Event[] = [];

  // Filtered events based on user selection
  const filteredEvents = events.filter((event) => {
    const typeMatch = filterType === "all" || event.type === filterType;
    const statusMatch = filterStatus === "all" || 
                        (filterStatus === "upcoming" && !event.isPast) || 
                        (filterStatus === "past" && event.isPast);
    return typeMatch && statusMatch;
  });

  // Event type badge color mapping
  const typeBadgeColors: Record<string, string> = {
    webinar: "bg-nexo-blue/10 text-nexo-blue",
    workshop: "bg-nexo-green/10 text-nexo-green",
    hackathon: "bg-accent/10 text-accent",
    meetup: "bg-purple-500/10 text-purple-500",
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-nexo-darker relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-nexo-blue opacity-10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-purple-500 opacity-10 rounded-full filter blur-3xl animate-float-delayed"></div>
        <div className={`nexo-container relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 [text-shadow:_0_4px_12px_rgba(0,0,0,0.3)]">Events</h1>
            <p className="text-xl text-gray-300">
              Join our community events to learn, connect, and grow with fellow tech enthusiasts.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-nexo-dark border-b border-gray-800">
        <div className={`nexo-container transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Filter:</span>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-nexo-darker text-gray-300 text-sm rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-md"
                >
                  <option value="all">All Types</option>
                  <option value="webinar">Webinars</option>
                  <option value="workshop">Workshops</option>
                  <option value="hackathon">Hackathons</option>
                  <option value="meetup">Meetups</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Show:</span>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-nexo-darker text-gray-300 text-sm rounded-md border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-md"
                >
                  <option value="upcoming">Upcoming Events</option>
                  <option value="past">Past Events</option>
                  <option value="all">All Events</option>
                </select>
              </div>
            </div>
            
            <div className="text-gray-300 text-sm">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            </div>
          </div>
        </div>
      </section>

      {/* Events List Section */}
      <section className="nexo-section bg-nexo-dark">
        <div className={`nexo-container transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center py-20">
            <div className="max-w-md mx-auto transform transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
              <div className="bg-nexo-darker/60 border border-gray-800 rounded-xl p-8 shadow-xl">
                <div className="mb-6 relative">
                  <div className="bg-nexo-blue/10 rounded-full p-4 mx-auto w-24 h-24 flex items-center justify-center shadow-inner animate-pulse-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-nexo-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-nexo-blue opacity-5 filter blur-xl rounded-full animate-pulse-slow"></div>
                </div>
                <h3 className="text-2xl font-medium text-gray-300 mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">No events scheduled yet</h3>
                <p className="text-gray-400 mb-8">We're currently planning our next events. Check back soon for updates or subscribe to our newsletter to be notified when new events are announced.</p>
                <button className="nexo-button shadow-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105">
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host an Event Section */}
      <section className="nexo-section bg-gradient-to-b from-nexo-dark to-nexo-darker">
        <div className={`nexo-container transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl nexo-heading mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">Have an idea for an event?</h2>
              <p className="text-gray-300 mb-6">
                We're always looking for speakers, workshop facilitators, and event organizers to enrich our community. 
                If you have expertise to share or an event idea, we'd love to hear from you.
              </p>
              <button className="nexo-button shadow-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105">
                Propose an Event
              </button>
            </div>
            <div className="md:w-1/2 nexo-glow">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                <img 
                  src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653" 
                  alt="NEXO Community Event" 
                  className="w-full h-auto transition-all duration-700 hover:scale-105 transform origin-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Subscribe Section */}
      <section className="nexo-section bg-nexo-darker">
        <div className={`nexo-container transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl nexo-heading mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">Never Miss an Event</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our community calendar to stay updated with all of our upcoming events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="nexo-button shadow-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105">
                Add to Google Calendar
              </button>
              <button className="nexo-button-secondary shadow-lg hover:shadow-glow-secondary transition-all duration-300 transform hover:scale-105">
                Download iCal File
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
