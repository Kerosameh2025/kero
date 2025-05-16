
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

type OfferProduct = {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  endDate: Date;
  badge: string;
  description: string;
};

// We'll extend the offers from the SpecialOffers component with more details
const allOffers: OfferProduct[] = [
  {
    id: 1,
    name: 'Summer Variety Pack',
    originalPrice: 12.99,
    discountedPrice: 9.99,
    image: 'https://img.freepik.com/premium-photo/four-vibrant-tropical-drinks-one-coconut-are-lined-neatly-white-surface-against-plain-background-exuding-summer-vibe_1160871-29302.jpg?w=1800',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    badge: 'LIMITED TIME OFFER',
    description: '6 refreshing bottles of our most popular summer flavors including Orange Fizz, Lemon Sparkle, and Berry Blast.',
  },
  {
    id: 2,
    name: 'Energy Boost Bundle',
    originalPrice: 15.99,
    discountedPrice: 11.99,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    badge: 'FLASH SALE',
    description: 'Pack of 4 Energy Blast drinks to keep you going through the day. Perfect for workouts or busy days.',
  },
  {
    id: 3,
    name: 'Fruit Fusion Collection',
    originalPrice: 14.99,
    discountedPrice: 10.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1170&auto=format&fit=crop',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    badge: 'HOT DEAL',
    description: 'Our premium juice collection featuring 5 different fruit combinations. 100% natural with no added sugar.',
  },
  {
    id: 4,
    name: 'Classic Cola Family Pack',
    originalPrice: 9.99,
    discountedPrice: 7.49,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=1974&auto=format&fit=crop',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    badge: 'FAMILY SIZE',
    description: '12-pack of our signature Classic Cola. Perfect for parties and family gatherings.',
  },
  {
    id: 5,
    name: 'Mixed Berry Juice Box',
    originalPrice: 18.99,
    discountedPrice: 14.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1170&auto=format&fit=crop',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    badge: 'WEEKLY SPECIAL',
    description: '8 bottles of our premium Mixed Berry Juice. Rich in antioxidants and vitamins.',
  },
  {
    id: 6,
    name: 'Zero Sugar Variety Pack',
    originalPrice: 13.99,
    discountedPrice: 11.49,
    image: 'https://img.freepik.com/free-photo/front-view-fruit-juice-bottles-apple-lemon-feijoas-pipettes-wood-board-lemonades-dark-surface_140725-103278.jpg?t=st=1747275193~exp=1747278793~hmac=93ab7619cc6d9df3d89ce8ebd14f4cdf00941e0be858018abbacee7ad2508d1a&w=1800',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    badge: 'DIET FRIENDLY',
    description: '6 bottles of our zero sugar sodas. All the taste without the calories.',
  },
];

const OffersPage = () => {
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState<{[key: number]: {days: number; hours: number; minutes: number; seconds: number}}>({});
  
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const newTimeRemaining = {} as {[key: number]: {days: number; hours: number; minutes: number; seconds: number}};
      
      allOffers.forEach(offer => {
        const diff = offer.endDate.getTime() - Date.now();
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          newTimeRemaining[offer.id] = { days, hours, minutes, seconds };
        }
      });
      
      setTimeRemaining(newTimeRemaining);
    };
    
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClaimOffer = (offerId: number, offerName: string) => {
    toast({
      title: "Offer Claimed!",
      description: `You've claimed the special offer for ${offerName}!`,
    });
  };

  // Calculate percentage discount
  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-red-50 py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Special Offers</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Grab these limited-time deals before they're gone! Exclusive discounts on your favorite drinks.
            </p>
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-md">
              <p className="text-brand-red font-semibold">
                Use code <span className="bg-gray-100 px-2 py-1 rounded font-bold">WELCOME15</span> for 15% off your first order!
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 animate-float opacity-30">
            <div className="w-20 h-20 rounded-full bg-brand-red"></div>
          </div>
          <div className="absolute bottom-10 right-20 animate-float opacity-30" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 rounded-full bg-brand-blue"></div>
          </div>
          <div className="absolute top-40 right-40 animate-float opacity-30" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 rounded-full bg-brand-gold"></div>
          </div>
        </section>

        {/* Current Offers Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center title-underline">Current Offers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={offer.image}
                      alt={offer.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 left-0 bg-brand-red text-white text-xs font-bold py-1 px-3 rounded-r-full">
                      {offer.badge}
                    </div>
                    <div className="absolute top-4 right-4 bg-brand-gold text-black text-sm font-bold h-12 w-12 rounded-full flex items-center justify-center">
                      {calculateDiscount(offer.originalPrice, offer.discountedPrice)}%
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{offer.name}</h3>
                    
                    <p className="text-gray-600 mb-4">
                      {offer.description}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <span className="text-gray-500 line-through mr-2">${offer.originalPrice.toFixed(2)}</span>
                      <span className="text-brand-red font-bold text-2xl">${offer.discountedPrice.toFixed(2)}</span>
                    </div>

                    {timeRemaining[offer.id] && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Offer ends in:</p>
                        <div className="flex space-x-2 text-center">
                          <div className="bg-gray-100 rounded px-2 py-1">
                            <span className="text-lg font-bold block">{timeRemaining[offer.id].days}</span>
                            <span className="text-xs">days</span>
                          </div>
                          <div className="bg-gray-100 rounded px-2 py-1">
                            <span className="text-lg font-bold block">{timeRemaining[offer.id].hours}</span>
                            <span className="text-xs">hrs</span>
                          </div>
                          <div className="bg-gray-100 rounded px-2 py-1">
                            <span className="text-lg font-bold block">{timeRemaining[offer.id].minutes}</span>
                            <span className="text-xs">min</span>
                          </div>
                          <div className="bg-gray-100 rounded px-2 py-1">
                            <span className="text-lg font-bold block">{timeRemaining[offer.id].seconds}</span>
                            <span className="text-xs">sec</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      className="w-full bg-brand-gold text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                      onClick={() => handleClaimOffer(offer.id, offer.name)}
                    >
                      Claim Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bundle Deals */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Bundle & Save</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Get more for less with our specially curated bundle packages. Perfect for stocking up your pantry or gifting to friends and family.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Monthly Subscription */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-brand-blue">
                <div className="bg-brand-blue text-white py-4 px-6">
                  <h3 className="text-xl font-bold">Monthly Subscription</h3>
                  <p className="text-blue-100">Our most popular option</p>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">$29.99</span>
                    <span className="text-gray-500">/month</span>
                    <p className="text-sm text-gray-600 mt-1">Save $10 per month</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      12 bottles per month
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Curated selection
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free shipping
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Cancel anytime
                    </li>
                  </ul>
                  
                  <button
                    className="w-full bg-brand-blue text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => toast({ 
                      title: "Subscription Added",
                      description: "Your monthly subscription has been added to your cart!"
                    })}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
              
              {/* Family Pack */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-brand-red">
                <div className="bg-brand-red text-white py-4 px-6">
                  <h3 className="text-xl font-bold">Family Pack</h3>
                  <p className="text-red-100">Best value for families</p>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">$39.99</span>
                    <span className="text-gray-500">/one-time</span>
                    <p className="text-sm text-gray-600 mt-1">Save $15 on retail price</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      24 bottles assortment
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      4 different flavors
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free shipping
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Perfect for gatherings
                    </li>
                  </ul>
                  
                  <button
                    className="w-full bg-brand-red text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => toast({ 
                      title: "Added to Cart",
                      description: "Family Pack has been added to your cart!"
                    })}
                  >
                    Order Now
                  </button>
                </div>
              </div>
              
              {/* Sampler Pack */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-brand-gold">
                <div className="bg-brand-gold text-gray-900 py-4 px-6">
                  <h3 className="text-xl font-bold">Sampler Pack</h3>
                  <p className="text-yellow-900">Try our best flavors</p>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">$19.99</span>
                    <span className="text-gray-500">/one-time</span>
                    <p className="text-sm text-gray-600 mt-1">Variety at a great price</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      8 different flavors
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      1 bottle per flavor
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Discover new favorites
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Gift box included
                    </li>
                  </ul>
                  
                  <button
                    className="w-full bg-brand-gold text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                    onClick={() => toast({ 
                      title: "Added to Cart",
                      description: "Sampler Pack has been added to your cart!"
                    })}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Refer a Friend */}
        <section className="py-16 bg-gradient-to-r from-brand-red to-brand-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4">Refer a Friend</h2>
                  <p className="text-gray-600 mb-6">
                    Refer a friend to FizzDrinks and you'll both receive a $10 credit toward your next purchase!
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-brand-blue rounded-full h-8 w-8 flex items-center justify-center text-white font-bold mr-3">1</div>
                      <div>
                        <h3 className="font-semibold mb-1">Share Your Code</h3>
                        <p className="text-gray-600 text-sm">Share your unique referral code with friends and family.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-brand-blue rounded-full h-8 w-8 flex items-center justify-center text-white font-bold mr-3">2</div>
                      <div>
                        <h3 className="font-semibold mb-1">Friend Orders</h3>
                        <p className="text-gray-600 text-sm">Your friend makes their first purchase using your code.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-brand-blue rounded-full h-8 w-8 flex items-center justify-center text-white font-bold mr-3">3</div>
                      <div>
                        <h3 className="font-semibold mb-1">Both Get Rewarded</h3>
                        <p className="text-gray-600 text-sm">You both receive $10 credit to use on your next orders!</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">Your Referral Code:</h3>
                    <div className="flex">
                      <input
                        type="text"
                        value="FIZZFRIEND10"
                        readOnly
                        className="bg-gray-100 border border-gray-300 rounded-l-lg px-4 py-2 w-full"
                      />
                      <button
                        className="bg-brand-blue text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText("FIZZFRIEND10");
                          toast({
                            title: "Copied!",
                            description: "Referral code copied to clipboard.",
                          });
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621873495884-845a939892d4?q=80&w=1528&auto=format&fit=crop')" }}></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Discount Coupon */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg relative">
              <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596803244897-c11dafe0f13b?q=80&w=2071&auto=format&fit=crop')" }}></div>
              
              <div className="relative p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">First-Time Customer?</h2>
                <p className="text-gray-600 mb-6">
                  Sign up for our newsletter and get 15% off your first order!
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 border border-gray-300 rounded-lg flex-grow"
                  />
                  <button
                    className="bg-brand-red text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => toast({
                      title: "Welcome Aboard!",
                      description: "Check your email for your 15% discount code!",
                    })}
                  >
                    Get My 15% Off
                  </button>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  By signing up, you agree to receive marketing emails from FizzDrinks.
                  No spam, we promise! You can unsubscribe at any time.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">
                  Offer valid for new customers only. Cannot be combined with other promotions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;
