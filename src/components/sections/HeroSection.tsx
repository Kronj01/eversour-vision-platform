
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Users, Award, ThumbsUp, Star, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  const stats = [
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: Award, number: "100+", label: "Projects Completed" },
    { icon: Globe, number: "Global", label: "Reach" },
    { icon: Zap, number: "24/7", label: "Support" }
  ];

  const features = [
    "All-in-One Solutions",
    "Client-Centric Approach", 
    "Affordable Excellence",
    "Free Consultation & Support",
    "Data-Driven Results"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_79px,_rgba(147,_51,_234,_0.3)_80px,_rgba(147,_51,_234,_0.3)_81px,_transparent_82px),_linear-gradient(0deg,_transparent_79px,_rgba(147,_51,_234,_0.3)_80px,_rgba(147,_51,_234,_0.3)_81px,_transparent_82px)] bg-[size:80px_80px]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 py-32">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/40 rounded-full px-8 py-4 mb-10 backdrop-blur-sm"
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400 font-semibold text-xl">Digital Experts</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight text-white"
            >
              Grow Beyond Your{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Limits
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-10"
            >
              Delivering Excellence Digitally
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-5xl mx-auto"
            >
              Located in Muzaffarnagar, India, Eversour is a leading digital development company dedicated to helping businesses establish a robust and thriving online presence. In today's competitive digital landscape, a strong online footprint is no longer optional; it's essential for sustained success.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl px-6 py-4"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-8 justify-center mb-24"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center">
                Discover Your Potential
                <ArrowRight className="w-7 h-7 ml-4" />
              </Button>
              <Button className="bg-transparent border-2 border-purple-400 text-purple-400 px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 hover:bg-purple-400 hover:text-black hover:shadow-2xl hover:shadow-purple-400/25 flex items-center justify-center">
                Explore Our Services
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-10 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                  <stat.icon className="w-16 h-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xl font-semibold group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
