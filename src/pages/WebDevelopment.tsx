
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Zap, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageHeader from '../components/ui/PageHeader';

const WebDevelopment = () => {
  const features = [
    "Custom Solutions, Limitless Possibilities",
    "Conversion-Driven Design", 
    "Mobile-First Approach",
    "SEO-Optimized Architecture",
    "Ongoing Support and Maintenance"
  ];

  const services = [
    {
      title: "WordPress Websites",
      description: "Quick deployment for fast go-to-market strategies with user-friendly management."
    },
    {
      title: "Custom-Built Solutions", 
      description: "Tailored designs meeting specific business needs with unique functionality."
    },
    {
      title: "Static & Dynamic Platforms",
      description: "Fast loading times and SEO-friendly structures for improved visibility."
    }
  ];

  const benefits = [
    "Ready-to-Launch Content",
    "24/7 Technical Support", 
    "Google Analytics Integration",
    "Initial Revisions",
    "Cross-Browser Compatibility",
    "Speed Optimization",
    "Security Hardening",
    "Maintenance Services"
  ];

  const technical = [
    "100% Responsive Design",
    "Free SSL Certification", 
    "SEO-Optimized Architecture",
    "3 Complimentary Error Checks"
  ];

  const design = [
    "Brand Identity Integration",
    "User Experience (UX) Focused",
    "Accessibility Compliance", 
    "Conversion-Driven Layouts"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <PageHeader
        title="Wonderful Websites That Convert"
        subtitle="Turn Your Vision into Reality!"
        description="Is your website failing to attract customers and drive sales? At Eversour, we understand that your website is more than just an online expense – it's your digital storefront, brand ambassador, and can be your primary lead-generation tool as well."
      >
        <Button className="btn-primary mr-4">
          Get a Free Web Consultation
        </Button>
        <Button className="btn-secondary">
          Learn More
        </Button>
      </PageHeader>

      {/* Why Choose Section */}
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose Eversour for Your Web Development Needs?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card group"
              >
                <div className="icon-container mb-6">
                  <CheckCircle className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-brand-purple transition-colors">
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Our Web Development Services - Tailored to Your Needs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="service-card"
              >
                <div className="icon-container mb-6">
                  <Code className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Additional Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold gradient-text mb-8">
                Additional Benefits - Beyond the Basics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Advantages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold gradient-text mb-8">
                Technical Advantages
              </h3>
              <div className="space-y-4 mb-8">
                {technical.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-brand-purple flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-3xl font-bold gradient-text mb-8">
                Design Philosophy
              </h3>
              <div className="space-y-4">
                {design.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-brand-purple flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-brand-purple/20 to-brand-purple-light/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Stop Leaving Money on the Table - Transform Your Website Today!
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Is your outdated website costing you leads and sales? Don't let your competitors steal your customers!
            </p>
            <p className="text-lg text-gray-300 mb-10">
              For a limited time, we're offering a FREE Website Audit and Personalized Online Strategy Consultation.
            </p>
            <Button className="btn-primary group">
              Get Free Consultation Now!
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;
