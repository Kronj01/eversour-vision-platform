
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Search, Megaphone, ArrowRight } from 'lucide-react';
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
    <section className="py-20 bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Expert Digital Solutions to <span className="gradient-text">Propel Your Business Forward</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We offer comprehensive, high-quality digital services tailored to your unique business needs, from web development to online marketing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-300 hover:border-purple-400/30 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-400/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                
                <h4 className="text-lg font-semibold text-purple-400 mb-3">
                  {service.subtitle}
                </h4>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                <Link to={service.link}>
                  <Button className="w-full bg-transparent border border-purple-400 text-purple-400 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-purple-400 hover:text-black flex items-center justify-center group text-sm">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
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
            <Button className="bg-white text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-105 text-lg">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
