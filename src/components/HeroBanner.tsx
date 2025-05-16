
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create floating bubbles dynamically
    const createBubbles = () => {
      if (!heroRef.current) return;
      
      const bubblesContainer = heroRef.current;
      
      // Clear existing bubbles
      const existingBubbles = bubblesContainer.querySelectorAll('.bubble');
      existingBubbles.forEach(bubble => bubble.remove());
      
      // Create new bubbles
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 60 + 10;
        
        bubble.classList.add('bubble');
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 15 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        
        bubblesContainer.appendChild(bubble);
      }
    };
    
    createBubbles();
    
    // Add parallax effect
    const handleParallax = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const heroElement = heroRef.current;
      const bottles = heroElement.querySelectorAll('.floating-bottle');
      
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      bottles.forEach((bottle, index) => {
        const depth = (index + 1) * 0.1;
        const moveX = mouseX * depth * 40;
        const moveY = mouseY * depth * 40;
        
        (bottle as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleParallax);
    
    return () => {
      window.removeEventListener('mousemove', handleParallax);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="hero-section h-[80vh] min-h-[600px] flex items-center relative overflow-hidden"
    >
      {/* Background elements - bubbles will be added dynamically with JS */}
      
      {/* Content Container */}
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Thirst-Quenching <span className="text-brand-red">Delights!</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700 max-w-lg">
              Experience the refreshing taste of premium soft drinks made with quality ingredients and 
              irresistible flavors. Your perfect fizzy companion for any occasion.
            </p>
            
            <div className="flex space-x-4">
              <Link 
                to="/products" 
                className="btn-primary flex items-center"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="border border-gray-300 text-gray-700 font-medium rounded-lg px-6 py-2.5 transition-all hover:bg-gray-100"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Floating Bottles */}
          <div className="relative h-[400px] hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=1974&auto=format&fit=crop"
              alt="Fizzy Drinks"
              className="floating-bottle absolute w-48 top-0 right-10 animate-float rounded-lg"
              style={{ animationDelay: '0s' }}
            />
            <img 
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80"
              alt="Energy Drink"
              className="floating-bottle absolute w-40 bottom-20 right-40 animate-float rounded-lg"
              style={{ animationDelay: '1s' }}
            />
            <img
              src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Juice Bottle"
              className="floating-bottle absolute w-36 top-40 left-10 animate-float rounded-lg"
              style={{ animationDelay: '2s' }}
            />
          </div>
        </div>
      </div>
      
      {/* Wave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
