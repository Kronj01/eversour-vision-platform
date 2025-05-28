
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Search, TrendingUp, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      href: '/services/web'
    },
    {
      icon: Zap,
      title: 'Software Development',
      description: 'Scalable software solutions tailored to your business needs.',
      href: '/services/software'
    },
    {
      icon: Palette,
      title: 'Branding',
      description: 'Distinctive brand identities that resonate with your audience.',
      href: '/services/branding'
    },
    {
      icon: Search,
      title: 'SEO',
      description: 'Data-driven SEO strategies to boost your online visibility.',
      href: '/services/seo'
    },
    {
      icon: TrendingUp,
      title: 'Paid Ads',
      description: 'High-converting ad campaigns that maximize your ROI.',
      href: '/services/ads'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Robust security solutions to protect your digital assets.',
      href: '/services/security'
    }
  ];

  const stats = [
    { number: '200+', label: 'Projects Delivered' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray-dark to-brand-black">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-transparent to-brand-purple-light/20" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple-light/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Digital Innovation
              <br />
              <span className="gradient-text">Beyond Limits</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              We build robust, scalable, and future-proof technology solutions that drive business growth and digital transformation. Your vision, our expertise.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="btn-primary text-lg px-12 py-6">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/portfolio" className="btn-secondary text-lg px-12 py-6 inline-flex items-center">
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-brand-gray-dark">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              We offer comprehensive digital solutions to transform your business and drive growth in the digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl glass hover:glass-strong transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-purple transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={service.href}
                    className="inline-flex items-center text-brand-purple font-semibold group-hover:gap-2 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-balance opacity-90">
              Let's discuss how we can help you achieve your digital goals and drive growth through innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-white text-brand-purple hover:bg-gray-100 text-lg px-12 py-6">
                Book a Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-brand-purple text-lg px-12 py-6 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
