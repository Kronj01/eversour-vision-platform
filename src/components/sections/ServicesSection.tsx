
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Search, Target, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      subtitle: "Custom Websites That Convert",
      description: "From WordPress sites to custom solutions, we bring your vision to reality",
      link: "/services/web",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "Software Development",
      subtitle: "Tailored Software for Your Unique Needs",
      description: "We build custom software solutions, web applications, and mobile apps to streamline your operations and drive efficiency.",
      link: "/services/software",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Palette,
      title: "Branding",
      subtitle: "Craft Your Brand Identity with Impact",
      description: "Elevate your brand with captivating logos, visual elements, and marketing materials that resonate with your target audience.",
      link: "/services/branding",
      gradient: "from-pink-500 to-red-600"
    },
    {
      icon: Search,
      title: "SEO",
      subtitle: "Dominate Search Results & Drive Organic Growth",
      description: "Improve your online visibility with our comprehensive SEO strategies, including keyword research, content optimization, and manual link building.",
      link: "/services/seo",
      gradient: "from-green-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Online Advertisements",
      subtitle: "Reach Your Target Audience with Precision",
      description: "Maximize your reach and ROI with our targeted online advertising campaigns across search engines and social media platforms.",
      link: "/services/ads",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Expert Digital Solutions to Propel Your Business Forward
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital services designed to help you grow beyond your limits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="service-card group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-0.5 mb-6`}>
                <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">
                {service.title}
              </h3>
              
              <h4 className="text-lg font-semibold text-brand-purple mb-4">
                {service.subtitle}
              </h4>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <Link to={service.link}>
                <Button className="btn-secondary group w-full">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
