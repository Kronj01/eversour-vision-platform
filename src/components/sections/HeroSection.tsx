
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Users, Award, ThumbsUp, Star } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  const stats = [
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: Award, number: "100+", label: "Projects Completed" },
    { icon: Globe, number: "Global", label: "Reach" },
    { icon: Zap, number: "24/7", label: "Support" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
        <div className="cyber-grid absolute inset-0 opacity-10"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 rounded-full px-4 py-2 mb-8"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Digital Experts</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
            >
              Grow Beyond Your{' '}
              <span className="gradient-text">Limits:</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white font-bold mb-6"
            >
              Digital Experts at Your Service!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl"
            >
              Located in Muzaffarnagar, India, Eversour is a leading digital development company dedicated to helping businesses establish a robust and thriving online presence. In today's competitive digital landscape, a strong online footprint is no longer optional; it's essential for sustained success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button className="bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 flex items-center justify-center text-lg">
                Discover Your Potential
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button className="bg-transparent border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-purple-400 hover:text-black flex items-center justify-center text-lg">
                Explore Our Services
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - Circular Design */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-purple-400/30 rounded-full"
              >
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
              </motion.div>

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-purple-400/20 rounded-full"
              >
                <div className="absolute top-6 right-6 w-8 h-8 bg-purple-500/20 rounded-lg backdrop-blur-sm flex items-center justify-center border border-purple-400/30">
                  <ThumbsUp className="w-4 h-4 text-purple-400" />
                </div>
                <div className="absolute bottom-6 left-6 w-8 h-8 bg-blue-500/20 rounded-lg backdrop-blur-sm flex items-center justify-center border border-blue-400/30">
                  <Star className="w-4 h-4 text-blue-400" />
                </div>
              </motion.div>

              {/* Inner Circle */}
              <div className="absolute inset-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-400/30">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/50">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold gradient-text">Eversour</div>
                  <div className="text-gray-400 text-sm">Digital Excellence</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
