
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, Building, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      rating: 5,
      content: "Eversour transformed our digital presence completely. Their team delivered beyond our expectations with exceptional attention to detail and innovative solutions.",
      project: "E-commerce Platform",
      date: "December 2023"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Founder",
      company: "Property Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      rating: 5,
      content: "The CRM system they built for us has revolutionized our business operations. The team was professional, responsive, and delivered on time.",
      project: "Real Estate CRM",
      date: "November 2023"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Marketing Director",
      company: "Fashion House",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 5,
      content: "The branding work exceeded our expectations. Our new brand identity perfectly captures our vision and has significantly improved our market presence.",
      project: "Brand Identity",
      date: "October 2023"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Owner",
      company: "Restaurant Chain",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      rating: 5,
      content: "The restaurant management system has streamlined our operations across all locations. The integration was seamless and the support has been outstanding.",
      project: "Management System",
      date: "September 2023"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "Director",
      company: "Medical Center",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
      rating: 5,
      content: "Our new website has improved patient engagement significantly. The appointment booking system works flawlessly and patients love the user experience.",
      project: "Healthcare Website",
      date: "August 2023"
    },
    {
      id: 6,
      name: "James Wilson",
      position: "CEO",
      company: "Tech Startup",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 5,
      content: "The SEO campaign delivered incredible results. Our organic traffic increased by 300% in just 6 months. Highly recommend their expertise.",
      project: "SEO Campaign",
      date: "July 2023"
    }
  ];

  const stats = [
    { number: "50+", label: "Happy Clients" },
    { number: "100+", label: "Projects Completed" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "5★", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="section-padding pt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 rounded-full px-5 py-2 mb-6"
            >
              <Quote className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Client Testimonials</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6 tracking-tight">
              What Our Clients Say
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from the businesses we've helped transform their digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card group"
              >
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-purple-400 mb-auto" />
                  <div className="flex ml-auto">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">{testimonial.position}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {testimonial.project}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {testimonial.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="section-padding bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card text-center max-w-4xl mx-auto"
          >
            <Quote className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            
            <blockquote className="text-2xl md:text-3xl font-light text-gray-300 mb-8 italic leading-relaxed">
              "Eversour didn't just build us a website; they built us a digital foundation that has become the cornerstone of our business growth. Their expertise, dedication, and innovative approach set them apart from any other agency we've worked with."
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100"
                alt="Alex Morgan"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className="font-bold text-white text-lg">Alex Morgan</h4>
                <p className="text-purple-400">CEO, Innovation Labs</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-purple-600/20 to-purple-800/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our <span className="gradient-text">Success Stories?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create your success story together. Start your digital transformation journey with Eversour today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary px-8 py-4">
                Start Your Project
              </Button>
              <Button className="btn-secondary px-8 py-4">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
