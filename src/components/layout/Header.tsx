
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, User, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'All Services', href: '/services' },
        { name: 'Web Development', href: '/services/web' },
        { name: 'Software Development', href: '/services/software' },
        { name: 'Branding', href: '/services/branding' },
        { name: 'SEO', href: '/services/seo' },
        { name: 'Ads', href: '/services/ads' },
      ]
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-purple-400/30 shadow-2xl shadow-purple-500/20' 
          : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-white via-purple-300 to-purple-400 bg-clip-text text-transparent">
                eversour
              </span>
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`flex items-center space-x-2 text-lg font-semibold transition-all duration-300 hover:text-purple-400 hover:scale-105 relative group ${
                        isActive(item.href) ? 'text-purple-400' : 'text-white'
                      }`}>
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                        <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transform origin-left transition-transform duration-300 ${
                          isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}></div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-500/20 rounded-2xl">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.href}
                            className={`block px-6 py-4 text-lg transition-all duration-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl ${
                              isActive(subItem.href) ? 'text-purple-400 bg-purple-500/10' : 'text-white'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-lg font-semibold transition-all duration-300 hover:text-purple-400 hover:scale-105 relative group ${
                      isActive(item.href) ? 'text-purple-400' : 'text-white'
                    }`}
                  >
                    {item.name}
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transform origin-left transition-transform duration-300 ${
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></div>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-purple-500/10 transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                      <AvatarFallback className="bg-purple-600 text-white">
                        {profile?.full_name ? getInitials(profile.full_name) : <User className="w-5 h-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-white font-medium">{profile?.full_name || 'User'}</p>
                      <p className="text-purple-400 text-sm">{profile?.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-500/20 rounded-2xl w-56">
                  <DropdownMenuItem onClick={() => setShowUserProfile(true)} className="text-white hover:bg-purple-500/10 cursor-pointer">
                    <Settings className="w-4 h-4 mr-3" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={signOut} className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost" className="text-white hover:text-purple-400 hover:bg-purple-500/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 relative overflow-hidden group">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-purple-400 transition-colors p-2"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-purple-400/30"
          >
            <div className="container mx-auto px-6 py-8">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <Link
                          to={item.href}
                          className={`block text-xl font-semibold transition-colors hover:text-purple-400 ${
                            isActive(item.href) ? 'text-purple-400' : 'text-white'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <div className="ml-6 mt-4 space-y-4">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block text-lg transition-colors hover:text-purple-400 ${
                                isActive(subItem.href) ? 'text-purple-400' : 'text-gray-300'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block text-xl font-semibold transition-colors hover:text-purple-400 ${
                          isActive(item.href) ? 'text-purple-400' : 'text-white'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile Auth */}
                <div className="pt-6 border-t border-gray-800">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {profile?.full_name ? getInitials(profile.full_name) : <User className="w-6 h-6" />}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{profile?.full_name || 'User'}</p>
                          <p className="text-purple-400 text-sm">{profile?.role}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setShowUserProfile(true);
                          setIsOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                      <Button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        variant="destructive"
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full border-purple-400/30 text-purple-400 hover:bg-purple-400/10">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button className="bg-white text-black px-8 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 w-full">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {showUserProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowUserProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setShowUserProfile(false)}
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                {/* UserProfile component will be rendered here */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-400/20 shadow-2xl shadow-purple-500/10">
                  <h2 className="text-2xl font-bold text-white mb-8">Profile Settings</h2>
                  <p className="text-gray-400">Profile settings coming soon...</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
