
import { useEffect, useRef } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-red-50 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FizzDrinks</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Refreshing the World Since 2010
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 title-underline">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  FizzDrinks began with a simple idea: to create soft drinks that taste amazing without compromising on quality. Founded by two friends who were dissatisfied with the artificial flavors and excessive sugar content in mainstream beverages, we set out to craft refreshing alternatives.
                </p>
                <p className="text-gray-600 mb-4">
                  Our journey started in a small kitchen, experimenting with natural ingredients and flavor combinations. After months of taste testing and refinement, we launched our first three flavors in local markets, where they quickly gained a loyal following.
                </p>
                <p className="text-gray-600">
                  Today, FizzDrinks has grown into a beloved brand offering a wide range of sodas, juices, and energy drinks. But our mission remains unchanged: to refresh the world with beverages that delight the taste buds while using quality ingredients you can feel good about.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556711905-b3f402e1f79e?q=80&w=1480&auto=format&fit=crop" 
                  alt="Our factory" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-lg font-bold text-brand-red">15+ Years</p>
                  <p className="text-sm text-gray-600">of refreshing innovation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-red-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl mb-8 italic">
                "To create exceptional beverages that bring joy and refreshment, while maintaining the highest standards of quality and sustainability."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="bg-brand-red inline-flex p-3 rounded-full text-white mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Ingredients</h3>
                  <p className="text-gray-600">
                    We use only premium ingredients, with natural flavors and no artificial preservatives.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="bg-brand-blue inline-flex p-3 rounded-full text-white mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Customer Delight</h3>
                  <p className="text-gray-600">
                    Creating beverages that exceed expectations and bring joy with every sip.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="bg-brand-gold inline-flex p-3 rounded-full text-gray-900 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Sustainability</h3>
                  <p className="text-gray-600">
                    Committed to eco-friendly practices in our production and packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16" ref={timelineRef}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center title-underline">Our Journey</h2>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
              
              {/* Timeline Items */}
              <div className="timeline-item opacity-0 mb-12 relative flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <h3 className="font-bold text-xl mb-2">2010</h3>
                  <p className="text-gray-600">FizzDrinks founded by two college friends in a small kitchen lab.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-red border-4 border-white"></div>
                <div className="w-1/2 pl-8 md:pl-16"></div>
              </div>
              
              <div className="timeline-item opacity-0 mb-12 relative flex items-center">
                <div className="w-1/2 pr-8 md:pr-16"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue border-4 border-white"></div>
                <div className="w-1/2 pl-8 md:pl-16">
                  <h3 className="font-bold text-xl mb-2">2012</h3>
                  <p className="text-gray-600">Opened our first production facility and launched nationally.</p>
                </div>
              </div>
              
              <div className="timeline-item opacity-0 mb-12 relative flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <h3 className="font-bold text-xl mb-2">2015</h3>
                  <p className="text-gray-600">Expanded product line to include energy drinks and fruit juices.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold border-4 border-white"></div>
                <div className="w-1/2 pl-8 md:pl-16"></div>
              </div>
              
              <div className="timeline-item opacity-0 mb-12 relative flex items-center">
                <div className="w-1/2 pr-8 md:pr-16"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-red border-4 border-white"></div>
                <div className="w-1/2 pl-8 md:pl-16">
                  <h3 className="font-bold text-xl mb-2">2018</h3>
                  <p className="text-gray-600">Introduced sustainable packaging initiative and reduced carbon footprint by 30%.</p>
                </div>
              </div>
              
              <div className="timeline-item opacity-0 relative flex items-center">
                <div className="w-1/2 pr-8 md:pr-16 text-right">
                  <h3 className="font-bold text-xl mb-2">2023</h3>
                  <p className="text-gray-600">Celebrated shipping our 10 millionth bottle and expanding to international markets.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue border-4 border-white"></div>
                <div className="w-1/2 pl-8 md:pl-16"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center title-underline">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">Michael Foster</h3>
                  <p className="text-brand-blue font-medium mb-3">Co-Founder & CEO</p>
                  <p className="text-gray-600">
                    With a background in food science, Michael leads our product innovation and company vision.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">Sarah Thompson</h3>
                  <p className="text-brand-blue font-medium mb-3">Co-Founder & COO</p>
                  <p className="text-gray-600">
                    Sarah oversees our operations and ensures we maintain the highest quality standards.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">David Rodriguez</h3>
                  <p className="text-brand-blue font-medium mb-3">Master Flavor Specialist</p>
                  <p className="text-gray-600">
                    With 15 years in beverage development, David creates our signature flavor profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners/Certifications Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 title-underline">Our Certifications</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Certification 1" 
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Certification 2" 
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Certification 3" 
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Certification 4" 
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Certification 5" 
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
