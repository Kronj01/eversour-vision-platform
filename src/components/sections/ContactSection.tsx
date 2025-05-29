
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

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
            <Mail className="w-5 h-5 text-brand-purple" />
            <span className="text-brand-purple font-medium">Get In Touch</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text mb-8 tracking-tight">
            Have Questions? Let's Connect!
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Ready to grow beyond your limits? Get in touch with us today and let's discuss your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Send className="w-8 h-8 text-brand-purple" />
              Send us a message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">Name</label>
                  <Input 
                    type="text" 
                    placeholder="Your full name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">Phone</label>
                <Input 
                  type="tel" 
                  placeholder="Your phone number"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-14 text-lg"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3 text-lg">Service Interest</label>
                <select className="w-full h-14 px-4 bg-white/5 border border-white/20 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple">
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="software">Software Development</option>
                  <option value="branding">Branding</option>
                  <option value="seo">SEO</option>
                  <option value="ads">Online Advertisements</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple text-lg resize-none"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full btn-primary py-5 text-xl font-semibold group"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Sending...
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-6 h-6 mr-3" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Phone className="w-8 h-8 text-brand-purple" />
                Get in touch
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="icon-container !w-12 !h-12 !mb-0">
                    <Phone className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg mb-1">Phone</p>
                    <p className="text-gray-300 text-lg">+91 (XXX) XXX-XXXX</p>
                    <p className="text-gray-400 text-sm">Available 24/7 for urgent queries</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="icon-container !w-12 !h-12 !mb-0">
                    <Mail className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg mb-1">Email</p>
                    <p className="text-gray-300 text-lg">eversour01@gmail.com</p>
                    <p className="text-gray-400 text-sm">We respond within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="icon-container !w-12 !h-12 !mb-0">
                    <MapPin className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg mb-1">Address</p>
                    <p className="text-gray-300 text-lg">Muzaffarnagar, India</p>
                    <p className="text-gray-400 text-sm">Serving clients globally</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="icon-container !w-12 !h-12 !mb-0">
                    <Clock className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg mb-1">Business Hours</p>
                    <p className="text-gray-300 text-lg">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-400 text-sm">Emergency support available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="glass-card text-center">
              <Calendar className="w-16 h-16 text-brand-purple mx-auto mb-6" />
              <h4 className="text-2xl font-bold text-white mb-4">Book a Free Consultation</h4>
              <p className="text-gray-300 mb-6 text-lg">
                Schedule a 30-minute call to discuss your project requirements and get expert advice.
              </p>
              <Button className="btn-secondary w-full text-lg py-4">
                Schedule Call
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
