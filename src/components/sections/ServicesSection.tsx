
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Search, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      subtitle: "Custom Websites That Convert",
      description: "From WordPress sites to custom solutions, we bring your vision to reality with cutting-edge technology and modern frameworks.",
      link: "/services/web",
      gradient: "from-blue-500 to-purple-600",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading"]
    },
    {
      icon: Smartphone,
      title: "Software Development",
      subtitle: "Tailored Software for Your Unique Needs",
      description: "We build custom software solutions, web applications, and mobile apps to streamline your operations and drive efficiency.",
      link: "/services/software",
      gradient: "from-purple-500 to-pink-600",
      features: ["Custom Solutions", "Scalable Architecture", "API Integration"]
    },
    {
      icon: Palette,
      title: "Branding",
      subtitle: "Craft Your Brand Identity with Impact",
      description: "Elevate your brand with captivating logos, visual elements, and marketing materials that resonate with your target audience.",
      link: "/services/branding",
      gradient: "from-pink-500 to-red-600",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials"]
    },
    {
      icon: Search,
      title: "SEO",
      subtitle: "Dominate Search Results & Drive Organic Growth",
      description: "Improve your online visibility with our comprehensive SEO strategies, including keyword research, content optimization, and manual link building.",
      link: "/services/seo",
      gradient: "from-green-500 to-blue-600",
      features: ["Keyword Research", "On-Page SEO", "Link Building"]
    },
    {
      icon: Target,
      title: "Online Advertisements",
      subtitle: "Reach Your Target Audience with Precision",
      description: "Maximize your reach and ROI with our targeted online advertising campaigns across search engines and social media platforms.",
      link: "/services/ads",
      gradient: "from-orange-500 to-red-600",
      features: ["Google Ads", "Social Media Ads", "Performance Tracking"]
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-gray-900 via-black to-gray-950">
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
            <Sparkles className="w-5 h-5 text-brand-purple" />
            <span className="text-brand-purple font-medium">Our Services</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text mb-8 tracking-tight">
            Expert Digital Solutions to Propel Your Business Forward
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Comprehensive digital services designed to help you grow beyond your limits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="service-card group relative overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`} />
              
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${service.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-black rounded-3xl flex items-center justify-center">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                {service.title}
              </h3>
              
              <h4 className="text-xl font-semibold text-brand-purple mb-4">
                {service.subtitle}
              </h4>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                {service.description}
              </p>

              {/* Features List */}
              <div className="flex flex-wrap gap-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <span 
                    key={featureIndex}
                    className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-sm rounded-full border border-brand-purple/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <Link to={service.link}>
                <Button className="btn-secondary group w-full text-lg py-4">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
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
