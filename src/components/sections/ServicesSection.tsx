
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Search, Megaphone, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      subtitle: "Custom Websites That Convert",
      description: "From WordPress sites to custom solutions, we bring your vision to reality",
      cta: "Learn More",
      link: "/services/web"
    },
    {
      icon: Smartphone,
      title: "Software Development",
      subtitle: "Tailored Software for Your Unique Needs",
      description: "We build custom software solutions, web applications, and mobile apps to streamline your operations and drive efficiency.",
      cta: "Learn More About Our Software Solutions",
      link: "/services/software"
    },
    {
      icon: Palette,
      title: "Branding",
      subtitle: "Craft Your Brand Identity with Impact",
      description: "Elevate your brand with captivating logos, visual elements, and marketing materials that resonate with your target audience.",
      cta: "Discover Our Branding Services",
      link: "/services/branding"
    },
    {
      icon: Search,
      title: "SEO",
      subtitle: "Dominate Search Results & Drive Organic Growth",
      description: "Improve your online visibility with our comprehensive SEO strategies, including keyword research, content optimization, and manual link building.",
      cta: "Request a Free SEO Audit",
      link: "/services/seo"
    },
    {
      icon: Megaphone,
      title: "Online Advertisements",
      subtitle: "Reach Your Target Audience with Precision",
      description: "Maximize your reach and ROI with our targeted online advertising campaigns across search engines and social media platforms.",
      cta: "Start Your Ad Campaign Today",
      link: "/services/ads"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/40 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold text-lg">Our Services</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white">
            Expert Digital Solutions to{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Propel Your Business Forward
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We offer comprehensive, high-quality digital services tailored to your unique business needs, from web development to online marketing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 h-full group-hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl flex items-center justify-center border border-purple-400/40 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-7 h-7 text-purple-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-purple-400 mb-4">
                    {service.subtitle}
                  </h4>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm line-clamp-3">
                    {service.description}
                  </p>
                  
                  <Link to={service.link}>
                    <Button className="w-full bg-transparent border border-purple-400/60 text-purple-400 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent flex items-center justify-center group/btn">
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/services">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center mx-auto">
              View All Services
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
