
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Star, Quote, Users, Briefcase, HelpCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'Software Development', href: '/services/software' },
      { name: 'Branding', href: '/services/branding' },
      { name: 'SEO', href: '/services/seo' },
      { name: 'Paid Ads', href: '/services/ads' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Testimonials', href: '/testimonials', icon: Quote },
      { name: 'FAQ', href: '/faq', icon: HelpCircle },
      { name: 'Career', href: '/career', icon: Briefcase },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Github', icon: Github, href: '#' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'eversour01@gmail.com', href: 'mailto:eversour01@gmail.com' },
    { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, text: 'Muzaffarnagar, India', href: '#' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_79px,_rgba(147,_51,_234,_0.3)_80px,_rgba(147,_51,_234,_0.3)_81px,_transparent_82px),_linear-gradient(0deg,_transparent_79px,_rgba(147,_51,_234,_0.3)_80px,_rgba(147,_51,_234,_0.3)_81px,_transparent_82px)] bg-[size:80px_80px]"></div>
        </div>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-purple-400/20">
          <div className="container mx-auto px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Stay ahead of the digital curve
                </h3>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Get the latest insights, tips, and trends delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-purple-400/30 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="flex items-center space-x-3 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-2xl">E</span>
                  </div>
                  <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Eversour</span>
                </Link>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  We build robust, scalable, and future-proof technology solutions that drive business growth and digital transformation.
                </p>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
                      >
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span>{item.text}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
                <ul className="space-y-4">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6 text-white">Company</h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources with Special Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6 text-white">Resources</h4>
                <ul className="space-y-4">
                  {footerLinks.resources.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 group"
                        >
                          {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />}
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-400/20">
          <div className="container mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.p
                className="text-gray-300 text-center md:text-left mb-4 md:mb-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                © {currentYear} Eversour. All rights reserved.
              </motion.p>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 hover:from-purple-500/40 hover:to-blue-500/40 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 border border-purple-400/20 hover:border-purple-400/40"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
