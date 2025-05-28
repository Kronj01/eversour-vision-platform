
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageHeader from '../components/ui/PageHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    file: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be handled by Formspree
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXXX XXXX XX',
      href: 'tel:+91XXXXXXXXXX'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'eversour01@gmail.com',
      href: 'mailto:eversour01@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Muzaffarnagar, India',
      href: '#'
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const services = [
    'Web Development',
    'Software Development',
    'Branding',
    'SEO',
    'Online Advertising',
    'Other'
  ];

  return (
    <div>
      <PageHeader
        title="Let's Connect - Your Digital Success Starts Here"
        subtitle="Have Questions? We're Here to Help"
        description="At Eversour, we're passionate about helping businesses achieve their digital goals. Whether you have a specific project in mind or just want to learn more about our services, we're here to assist you and guide you on your digital journey."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-strong p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-8 gradient-text">
                  Get in Touch - We're Just a Click or Call Away
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                        Your Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Your Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all duration-300"
                      placeholder="Tell us about your project or how we can help you..."
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="file" className="block text-sm font-medium mb-2">
                      Upload File (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="file"
                        className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-background hover:border-brand-purple transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        {formData.file ? formData.file.name : 'Choose file to upload'}
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary text-lg py-4">
                    Send Message
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy-policy" className="text-brand-purple hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="glass p-6 rounded-2xl flex items-start gap-4 hover:glass-strong transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.label}</h3>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Media */}
              <motion.div
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 gradient-text">
                  Connect With Us on Social Media
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Consultation Info */}
              <motion.div
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Let Us Help You - Stop Waiting Start Working!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get a Personalized Consultation Session to evaluate your business systems and discover how we can help you grow beyond your limits.
                </p>
                <Button className="btn-primary w-full">
                  Book Free Consultation
                </Button>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4">Our Location</h3>
                <div className="w-full h-48 bg-gradient-to-br from-brand-purple/20 to-brand-purple-light/20 rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
