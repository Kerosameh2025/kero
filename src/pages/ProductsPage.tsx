
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ShoppingCart, Star, Filter, ChevronDown, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  new?: boolean;
};

// Sample products data
const productsData: Product[] = [
  {
    id: 1,
    name: 'Classic Cola',
    price: 1.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=1974&auto=format&fit=crop',
    category: 'Soda',
    description: 'Our signature cola with the perfect balance of sweetness and fizz.',
    featured: true,
  },
  {
    id: 2,
    name: 'Orange Fizz',
    price: 1.79,
    rating: 4.6,
    image: 'https://img.freepik.com/free-photo/delicious-mimosa-cocktail-orange-slice_23-2149394555.jpg?t=st=1747274474~exp=1747278074~hmac=ace75b5671fada9f0016694bd6af1dda7d089664c32aedb2a129a0936286f9c6&w=1800',
    category: 'Soda',
    description: 'Refreshing orange soda with real fruit juice and playful bubbles.',
    featured: true,
  },
  {
    id: 3,
    name: 'Energy Blast',
    price: 2.49,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop',
    category: 'Energy Drinks',
    description: 'Powerful energy boost with B vitamins and natural caffeine.',
    featured: true,
  },
  {
    id: 4,
    name: 'Mixed Berry Juice',
    price: 2.29,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1170&auto=format&fit=crop',
    category: 'Juices',
    description: 'Blend of strawberries, blueberries and raspberries with no added sugar.',
    featured: true,
  },
  {
    id: 5,
    name: 'Lemon Sparkle',
    price: 1.89,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1374&auto=format&fit=crop',
    category: 'Soda',
    description: 'Zesty lemon soda with a hint of lime for extra freshness.',
  },
  {
    id: 6,
    name: 'Cherry Cola',
    price: 1.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=1374&auto=format&fit=crop',
    category: 'Soda',
    description: 'Classic cola infused with natural cherry flavor.',
  },
  {
    id: 7,
    name: 'Grape Soda',
    price: 1.89,
    rating: 4.2,
    image: 'https://img.freepik.com/free-photo/arrangement-with-forest-fruits-smoothie_23-2148545365.jpg?t=st=1747274575~exp=1747278175~hmac=a3930d2e91cb92bd164488da287b305b6bc119e366b1f57fa6e53cdeaaa4e144&w=1800',
    category: 'Soda',
    description: 'Sweet grape flavor with a smooth fizzy finish.',
  },
  {
    id: 8,
    name: 'Apple Juice',
    price: 2.19,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?q=80&w=1374&auto=format&fit=crop',
    category: 'Juices',
    description: '100% pure apple juice from fresh-pressed apples.',
  },
  {
    id: 9,
    name: 'Tropical Punch',
    price: 2.39,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1372&auto=format&fit=crop',
    category: 'Juices',
    description: 'Exotic blend of pineapple, mango, and passion fruit.',
    new: true,
  },
  {
    id: 10,
    name: 'Power Boost',
    price: 2.69,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=1528&auto=format&fit=crop',
    category: 'Energy Drinks',
    description: 'Maximum energy with added electrolytes and B vitamins.',
    new: true,
  },
  {
    id: 11,
    name: 'Coconut Water',
    price: 2.49,
    rating: 4.4,
    image: 'https://img.freepik.com/free-photo/glass-coconut-water-put-dark-wooden-background_1150-28246.jpg?t=st=1747274696~exp=1747278296~hmac=f88d16a7974f1b6cfa3ac5c7e3a712d19e1fcdc0ccf8ba6c0fe3c64afa9c0f2a&w=1800',
    category: 'Juices',
    description: 'Refreshing natural coconut water with no additives.',
  },
  {
    id: 12,
    name: 'Green Tea Fizz',
    price: 2.29,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1364&auto=format&fit=crop',
    category: 'Energy Drinks',
    description: 'Lightly carbonated green tea with natural caffeine.',
    new: true,
  },
];

const ProductsPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(productsData);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let filteredProducts = [...productsData];
    
    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        filteredProducts.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default:
        // Default sorting - featured items first
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setProducts(filteredProducts);
  }, [selectedCategory, sortBy]);

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

  const categories = ['Soda', 'Juices', 'Energy Drinks'];

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-red-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Products</h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Explore our wide range of refreshing drinks made with the finest ingredients
            </p>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filter & Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              {/* Category Filter - Mobile */}
              {isMobile && (
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg mb-4 w-full md:w-auto"
                  onClick={toggleFilter}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </button>
              )}

              {/* Filter Popout - Mobile */}
              {isMobile && filterOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
                  <div className="bg-white w-[80%] h-full p-6 overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-lg">Filters</h3>
                      <button onClick={toggleFilter}>
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Categories</h4>
                      <div className="flex flex-col gap-2">
                        <button
                          className={`px-3 py-2 rounded-lg text-left ${
                            selectedCategory === null 
                              ? 'bg-brand-blue text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => setSelectedCategory(null)}
                        >
                          All Categories
                        </button>
                        
                        {categories.map(category => (
                          <button
                            key={category}
                            className={`px-3 py-2 rounded-lg text-left ${
                              selectedCategory === category 
                                ? 'bg-brand-blue text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Sort By</h4>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="default">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="popular">Most Popular</option>
                        <option value="new">New Arrivals</option>
                      </select>
                    </div>
                    
                    <button
                      className="w-full bg-brand-red text-white font-medium rounded-lg py-2.5 mt-4"
                      onClick={toggleFilter}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Category Filter - Desktop */}
              <div className="hidden md:flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === null
                      ? 'bg-brand-blue text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg ${
                      selectedCategory === category
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown - Desktop */}
              <div className="hidden md:block">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort by: Featured</option>
                  <option value="price-low">Sort by: Price: Low to High</option>
                  <option value="price-high">Sort by: Price: High to Low</option>
                  <option value="popular">Sort by: Most Popular</option>
                  <option value="new">Sort by: New Arrivals</option>
                </select>
              </div>

              {/* Sort Dropdown - Mobile */}
              <select 
                className="md:hidden px-4 py-2 border border-gray-300 rounded-lg w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="new">New Arrivals</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card group relative"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="mb-4 relative overflow-hidden rounded-xl condensation-effect">
                    {product.new && (
                      <span className="absolute top-2 right-2 bg-brand-gold text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                        NEW
                      </span>
                    )}
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

                    <div className="flex items-center gap-1 mb-2">
                      {renderRatingStars(product.rating)}
                      <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
