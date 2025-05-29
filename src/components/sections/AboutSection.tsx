
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Zap, Heart, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "The Digital Development Service Provider Company in India!",
      description: "Leading the way in digital transformation with cutting-edge solutions."
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
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            About Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building trust through exceptional digital solutions and innovative technology.
          </p>
        </motion.div>

        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card group cursor-pointer ${
                feature.isNegative ? 'border-red-500/30' : ''
              }`}
            >
              <div className={`icon-container ${
                feature.isNegative ? 'bg-red-500/20 border-red-500/30' : ''
              }`}>
                <feature.icon className={`w-8 h-8 ${
                  feature.isNegative ? 'text-red-400' : 'text-brand-purple'
                }`} />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-brand-purple transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
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
