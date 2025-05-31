
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Search, Megaphone, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      subtitle: "Custom Websites That Convert",
      description: "From WordPress sites to custom solutions, we bring your vision to reality with cutting-edge technologies",
      features: ["Responsive Design", "Performance Optimization", "SEO-Friendly"],
      cta: "Learn More",
      link: "/services/web",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Smartphone,
      title: "Software Development",
      subtitle: "Tailored Software for Your Unique Needs",
      description: "We build custom software solutions, web applications, and mobile apps to streamline your operations",
      features: ["Custom Applications", "API Development", "Cloud Integration"],
      cta: "Learn More About Our Software Solutions",
      link: "/services/software",
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Palette,
      title: "Branding",
      subtitle: "Craft Your Brand Identity with Impact",
      description: "Elevate your brand with captivating logos, visual elements, and marketing materials",
      features: ["Brand Strategy", "Logo Design", "UI/UX Design"],
      cta: "Discover Our Branding Services",
      link: "/services/branding",
      gradient: "from-pink-500/20 to-pink-600/20"
    },
    {
      icon: Search,
      title: "SEO",
      subtitle: "Dominate Search Results & Drive Organic Growth",
      description: "Improve your online visibility with comprehensive SEO strategies and optimization",
      features: ["Keyword Research", "Technical SEO", "Content Strategy"],
      cta: "Request a Free SEO Audit",
      link: "/services/seo",
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Megaphone,
      title: "Online Advertisements",
      subtitle: "Reach Your Target Audience with Precision",
      description: "Maximize your reach and ROI with targeted online advertising campaigns",
      features: ["Google Ads", "Social Media Ads", "Campaign Optimization"],
      cta: "Start Your Ad Campaign Today",
      link: "/services/ads",
      gradient: "from-orange-500/20 to-orange-600/20"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-full blur-3xl"></div>
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/40 rounded-full px-8 py-4 mb-10 backdrop-blur-sm"
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold text-xl">Our Services</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 text-white">
            Expert Digital Solutions to{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Propel Your Business Forward
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            We offer comprehensive, high-quality digital services tailored to your unique business needs, from web development to online marketing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group h-full"
              >
                <div className={`bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-purple-400/20 rounded-3xl p-8 h-full group-hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl flex items-center justify-center border border-purple-400/40 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <h4 className="text-xl font-semibold text-purple-400 mb-6">
                    {service.subtitle}
                  </h4>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-400/30">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={service.link} className="mt-auto">
                    <Button className="w-full bg-transparent border-2 border-purple-400/60 text-purple-400 px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent flex items-center justify-center group/btn">
                      {service.cta}
                      <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" />
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
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-6 rounded-full font-bold text-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center mx-auto">
              <Zap className="w-7 h-7 mr-4" />
              View All Services
              <ArrowRight className="w-7 h-7 ml-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
