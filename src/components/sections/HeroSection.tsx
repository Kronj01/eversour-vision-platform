
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Users, Award, Star } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  const stats = [
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: Award, number: "100+", label: "Projects Completed" },
    { icon: Globe, number: "Global", label: "Reach" },
    { icon: Zap, number: "24/7", label: "Support" }
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/15 to-purple-400/10 rounded-full blur-3xl"></div>
        
        {/* Cosmic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_79px,_rgba(147,_51,_234,_0.4)_80px,_rgba(147,_51,_234,_0.4)_81px,_transparent_82px),_linear-gradient(0deg,_transparent_79px,_rgba(147,_51,_234,_0.4)_80px,_rgba(147,_51,_234,_0.4)_81px,_transparent_82px)] bg-[size:80px_80px]"></div>
        </div>

        {/* Floating cosmic particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-float"
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

      <div className="container mx-auto px-6 lg:px-8 relative z-10 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Compact Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-white"
            >
              Grow Beyond Your Limits:{' '}
              <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                Digital Experts at Your Service!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-4xl mx-auto"
            >
              Located in Muzaffarnagar, India, Eversour is a leading digital development company dedicated to helping businesses establish a robust and thriving online presence. In today's competitive digital landscape, a strong online footprint is no longer optional; it's essential for sustained success. We empower businesses to not only survive but thrive online by delivering comprehensive, custom-tailored digital solutions designed to meet your unique needs and drive measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <Button className="bg-white text-black px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 flex items-center justify-center mx-auto group relative overflow-hidden">
                <span className="relative z-10">Discover Your Potential</span>
                <ArrowRight className="w-6 h-6 ml-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Optimized Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-white/10">
                  <stat.icon className="w-10 h-10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors duration-300">
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
