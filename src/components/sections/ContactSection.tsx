
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'eversour01@gmail.com',
      link: 'mailto:eversour01@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      detail: 'Muzaffarnagar, India',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      detail: 'Mon - Fri: 9AM - 6PM IST',
      link: '#'
    }
  ];

  const services = [
    'Web Development',
    'Software Development',
    'Branding & Design',
    'SEO Optimization',
    'Paid Advertising',
    'Consultation',
    'Other'
  ];

  return (
    <section className="py-40 bg-black relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/40 rounded-full px-8 py-4 mb-12 backdrop-blur-sm"
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-semibold text-xl">Get In Touch</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 text-white">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            Ready to transform your digital presence? We're here to help you achieve your goals with cutting-edge solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-purple-400/20 rounded-3xl p-10 hover:border-purple-400/40 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-4 text-lg">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-5 bg-white/10 border border-purple-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-4 text-lg">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-5 bg-white/10 border border-purple-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="company" className="block text-white font-semibold mb-4 text-lg">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-white/10 border border-purple-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white font-semibold mb-4 text-lg">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-white/10 border border-purple-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-white font-semibold mb-4 text-lg">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-white/10 border border-purple-400/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
                  >
                    <option value="" className="bg-black">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-black">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-4 text-lg">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-5 bg-white/10 border border-purple-400/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none text-lg"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center gap-4"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-7 h-7" />
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send className="w-7 h-7" />
                      Send Message
                      <ArrowRight className="w-7 h-7" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-10">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-black text-white mb-8">
                  Ready to Start Your Digital Journey?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed mb-10">
                  Don't let your competition get ahead. Contact us today and let's discuss how we can help transform your business with our digital solutions.
                </p>
              </div>

              <div className="grid gap-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="block group"
                    >
                      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-purple-400/20 rounded-3xl p-8 group-hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl flex items-center justify-center border border-purple-400/40 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-xl group-hover:text-purple-400 transition-colors">
                              {info.title}
                            </h4>
                            <p className="text-gray-300 group-hover:text-white transition-colors text-lg">
                              {info.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-10 text-center">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h4 className="text-3xl font-black text-white mb-6">
                  Get a Free Consultation
                </h4>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Book a 30-minute strategy session to discuss your project requirements and get expert recommendations.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 mr-3" />
                  Schedule Free Call
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
