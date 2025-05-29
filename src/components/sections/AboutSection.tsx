
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Zap, Heart, Award, TrendingUp, Globe } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "The Digital Development Service Provider Company in India!",
      description: "Leading the way in digital transformation with cutting-edge solutions and innovative technology.",
      isLarge: true
    },
    {
      icon: Target,
      title: "Tired of Digital Frustrations?",
      description: "High prices, incomplete work, low-quality deliverables, and unreliable service providers.",
      isNegative: true
    },
    {
      icon: Zap,
      title: "Why Choose Eversour?",
      description: "All-in-One Solutions, Client-Centric Approach, Affordable Excellence, Free Consultation and Support, Data-Driven Results."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Client-Centric, Innovation, Transparency, Quality, Teamwork - driving digital solutions that redefine industries."
    },
    {
      icon: Users,
      title: "Our Mission",
      description: "To be the trusted partner for businesses of all sizes, creating powerful online presence across industries."
    },
    {
      icon: Award,
      title: "Excellence Delivered",
      description: "Delivering exceptional results that exceed expectations through innovative digital solutions."
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Strategies designed to scale your business and maximize ROI with sustainable growth solutions."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving clients worldwide with localized expertise and international standards."
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-black via-gray-950 to-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-6 py-3 mb-8"
          >
            <Shield className="w-5 h-5 text-brand-purple" />
            <span className="text-brand-purple font-medium">About Eversour</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text mb-8 tracking-tight">
            About Us
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Building trust through exceptional digital solutions and innovative technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card group cursor-pointer ${
                feature.isLarge ? 'lg:col-span-2' : ''
              } ${
                feature.isNegative ? 'border-red-500/30 bg-red-500/5' : ''
              }`}
            >
              <div className={`icon-container ${
                feature.isNegative ? 'bg-red-500/20 border-red-500/30' : ''
              }`}>
                <feature.icon className={`w-8 h-8 ${
                  feature.isNegative ? 'text-red-400' : 'text-brand-purple'
                }`} />
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 group-hover:text-brand-purple transition-colors ${
                feature.isNegative ? 'text-red-300' : 'text-white'
              }`}>
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
