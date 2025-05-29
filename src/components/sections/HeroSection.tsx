
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="floating-orb floating-orb-1" />
        <div className="floating-orb floating-orb-2" />
        <div className="floating-orb floating-orb-3" />
        
        {/* Additional geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-brand-purple/20 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-brand-purple/10 to-transparent rounded-2xl rotate-45" />
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(139,92,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative container-custom text-center text-white z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-brand-purple" />
            <span className="text-brand-purple font-medium">Digital Development Company</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="gradient-text">Grow Beyond</span>
            <br />
            <span className="gradient-text">Your Limits:</span>
            <br />
            <span className="text-white">Digital Experts at</span>
            <br />
            <span className="text-white">Your Service!</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Located in <span className="text-brand-purple font-semibold">Muzaffarnagar, India</span>, Eversour is a leading digital development company dedicated to helping businesses establish a robust and thriving online presence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button className="btn-primary group px-10 py-5 text-xl font-semibold">
              <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Discover Your Potential
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <Button className="btn-secondary px-10 py-5 text-xl font-semibold group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Free Consultation
            </Button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "100+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-brand-purple/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-purple rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
