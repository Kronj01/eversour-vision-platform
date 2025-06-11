import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar, MessageSquare, Globe, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useContactForm } from '../hooks/useContactForm';

const Contact = () => {
  const { submitContactForm, isSubmitting } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: '',
        message: ''
      });
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 (XXX) XXX-XXXX",
      subtitle: "Available 24/7 for urgent queries",
      color: "text-green-400"
    },
    {
      icon: Mail,
      title: "Email",
      value: "eversour01@gmail.com",
      subtitle: "We respond within 2 hours",
      color: "text-blue-400"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Muzaffarnagar, India",
      subtitle: "Serving clients globally",
      color: "text-purple-400"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM IST",
      subtitle: "Emergency support available",
      color: "text-orange-400"
    }
  ];

  const services = [
    "Web Development",
    "Software Development", 
    "Branding & Design",
    "SEO Optimization",
    "Online Advertisements",
    "Consultation"
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Web development projects typically take 2-6 weeks, while software development can take 2-6 months."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we provide 24/7 support and maintenance services for all our projects with different support packages available."
    },
    {
      question: "Can you work with international clients?",
      answer: "Absolutely! We serve clients globally and have experience working across different time zones and cultural contexts."
    },
    {
      question: "What's included in your free consultation?",
      answer: "Our free consultation includes project assessment, technology recommendations, timeline estimation, and budget planning."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-20 pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 rounded-full px-4 py-2 mb-6"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Get In Touch</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Have Questions? Let's Connect!
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ready to grow beyond your limits? Get in touch with us today and let's discuss your project requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Send className="w-6 h-6 text-purple-400" />
              Send us a message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <Input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Phone</label>
                  <Input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Company</label>
                  <Input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Service Interest</label>
                <select 
                  name="service_interest"
                  value={formData.service_interest}
                  onChange={handleInputChange}
                  className="w-full h-12 px-3 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                >
                  <option value="" className="bg-gray-900 text-white">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.toLowerCase()} className="bg-gray-900 text-white hover:bg-gray-800">
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-3 py-3 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-card">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Phone className="w-6 h-6 text-purple-400" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className={`w-10 h-10 ${method.color} bg-current/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <method.icon className={`w-5 h-5 ${method.color}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">{method.title}</p>
                      <p className="text-gray-300">{method.value}</p>
                      <p className="text-gray-400 text-sm">{method.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card text-center">
              <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Book a Free Consultation</h4>
              <p className="text-gray-300 mb-6">
                Schedule a 30-minute call to discuss your project requirements and get expert advice.
              </p>
              <Button className="btn-secondary w-full py-3">
                Schedule Call
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
              >
                <h4 className="font-bold text-white mb-3">{faq.question}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600/20 to-purple-800/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your <span className="gradient-text">Digital Journey?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses with Eversour.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>99% Satisfaction Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
