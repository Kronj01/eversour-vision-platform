
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  const { isDarkMode, isMobileMenuOpen, toggleDarkMode, toggleMobileMenu } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-purple-500/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-lg">E</span>
            </motion.div>
            <motion.span 
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              eversour
            </motion.span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  isActive(item.href)
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-white hover:text-purple-400 hover:bg-white/5'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute inset-0 bg-purple-500/10 rounded-lg border border-purple-400/30"
                    layoutId="activeTab"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Button className="hidden lg:flex btn-primary text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="lg:hidden w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-purple-400" />
                ) : (
                  <Menu className="w-5 h-5 text-purple-400" />
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-black/90 backdrop-blur-md border-t border-purple-500/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      onClick={toggleMobileMenu}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                        isActive(item.href)
                          ? 'text-purple-400 bg-purple-500/10'
                          : 'text-white hover:text-purple-400 hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navigation.length * 0.1, duration: 0.3 }}
                  className="pt-3"
                >
                  <Button className="w-full btn-primary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
