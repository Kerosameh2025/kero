
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type OfferProduct = {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  endDate: Date;
  badge: string;
};

const offers: OfferProduct[] = [
  {
    id: 1,
    name: 'Summer Variety Pack',
    originalPrice: 12.99,
    discountedPrice: 9.99,
    image: 'https://img.freepik.com/premium-photo/four-vibrant-tropical-drinks-one-coconut-are-lined-neatly-white-surface-against-plain-background-exuding-summer-vibe_1160871-29302.jpg?w=1800',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    badge: 'LIMITED TIME OFFER',
  },
  {
    id: 2,
    name: 'Energy Boost Bundle',
    originalPrice: 15.99,
    discountedPrice: 11.99,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    badge: 'FLASH SALE',
  },
  {
    id: 3,
    name: 'Fruit Fusion Collection',
    originalPrice: 14.99,
    discountedPrice: 10.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1170&auto=format&fit=crop',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    badge: 'HOT DEAL',
  },
];

const SpecialOffers = () => {
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState<{[key: number]: {days: number; hours: number; minutes: number; seconds: number}}>({});

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const newTimeRemaining = {} as {[key: number]: {days: number; hours: number; minutes: number; seconds: number}};
      
      offers.forEach(offer => {
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

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold title-underline">Special Offers</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Grab these limited-time deals before they're gone! Exclusive discounts on your favorite drinks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-0 bg-brand-red text-white text-xs font-bold py-1 px-3 rounded-r-full">
                  {offer.badge}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{offer.name}</h3>
                
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
  );
};

export default SpecialOffers;
