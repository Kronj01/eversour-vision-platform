
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const ContactSection = () => {
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
            Have Questions? Let's Connect!
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to grow beyond your limits? Get in touch with us today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <Input 
                    type="text" 
                    placeholder="Your name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Phone</label>
                <Input 
                  type="tel" 
                  placeholder="Your phone number"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
              
              <Button className="w-full btn-primary">
                Act Now
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card">
              <h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="icon-container">
                    <Phone className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300">+91 (XXX) XXX-XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="icon-container">
                    <Mail className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">eversour01@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="icon-container">
                    <MapPin className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-300">Muzaffarnagar, India</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="icon-container">
                    <Clock className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Business Hours</p>
                    <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
