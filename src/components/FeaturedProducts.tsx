
import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
};

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Classic Cola',
    price: 1.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=1974&auto=format&fit=crop',
    category: 'Soda',
  },
  {
    id: 2,
    name: 'Orange Fizz',
    price: 1.79,
    rating: 4.6,
    image: 'https://img.freepik.com/free-photo/delicious-mimosa-cocktail-orange-slice_23-2149394555.jpg?t=st=1747274474~exp=1747278074~hmac=ace75b5671fada9f0016694bd6af1dda7d089664c32aedb2a129a0936286f9c6&w=1800',
    category: 'Soda',
  },
  {
    id: 3,
    name: 'Energy Blast',
    price: 2.49,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop',
    category: 'Energy Drinks',
  },
  {
    id: 4,
    name: 'Mixed Berry Juice',
    price: 2.29,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1170&auto=format&fit=crop',
    category: 'Juices',
  },
];

const FeaturedProducts = () => {
  const { toast } = useToast();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-400 fill-yellow-400' 
              : i < rating 
                ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold title-underline">
            Featured Products
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our most popular drinks that customers love. Refreshing flavors and quality ingredients in every bottle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="mb-4 relative overflow-hidden rounded-xl condensation-effect">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover product-image"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 bg-brand-red text-white flex items-center justify-center gap-2 mb-4 mx-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="px-2">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span className="text-brand-red font-bold">${product.price}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 text-gray-700">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {renderRatingStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="btn-secondary inline-flex items-center"
          >
            View All Products <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Import the ArrowRight icon that was missing
import { ArrowRight } from 'lucide-react';

export default FeaturedProducts;
