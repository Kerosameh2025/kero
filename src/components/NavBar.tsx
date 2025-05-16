
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Mock cart count
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Mock search suggestions
  const searchSuggestions = [
    'Cola Classic',
    'Orange Fizz',
    'Energy Blast',
    'Berry Fusion',
    'Lemon Sparkle',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-red">
              Fizz<span className="text-brand-blue">Drinks</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/offers" className="nav-link">
              Offers
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block relative">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden pr-2">
              <input
                type="text"
                placeholder="Search drinks..."
                className="px-4 py-1.5 outline-none w-48 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
              />
              <Search className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>

            {/* Search Suggestions */}
            {showSearchSuggestions && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                {searchSuggestions
                  .filter((suggestion) =>
                    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSearchSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="hidden md:flex items-center">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 hover:text-brand-red transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 top-full shadow-lg py-4 px-4 z-50">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
              <input
                type="text"
                placeholder="Search drinks..."
                className="px-4 py-2 outline-none w-full"
              />
              <Button variant="ghost" className="h-full">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="nav-link py-2" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className="nav-link py-2" onClick={toggleMenu}>
                Products
              </Link>
              <Link to="/offers" className="nav-link py-2" onClick={toggleMenu}>
                Offers
              </Link>
              <Link to="/about" className="nav-link py-2" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact" className="nav-link py-2" onClick={toggleMenu}>
                Contact
              </Link>
              <Link to="/cart" className="flex items-center space-x-2 py-2" onClick={toggleMenu}>
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartCount})</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
