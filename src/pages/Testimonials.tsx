
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'CEO, TechStart Solutions',
      company: 'TechStart Solutions',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      testimonial: 'Eversour transformed our entire digital presence. Their web development team created a stunning, conversion-focused website that increased our leads by 300%. The team was professional, responsive, and delivered beyond our expectations.',
      project: 'Web Development & SEO'
    },
    {
      name: 'Michael Chen',
      position: 'Founder, GreenLiving App',
      company: 'GreenLiving',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      testimonial: 'The custom software solution Eversour built for us revolutionized our business operations. Their attention to detail and technical expertise is unmatched. We saw a 250% increase in efficiency within the first month.',
      project: 'Custom Software Development'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Marketing Director, Fashion Forward',
      company: 'Fashion Forward',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      testimonial: 'Eversour created a brand identity that perfectly captures our vision. From logo design to marketing materials, everything is cohesive and professional. Our brand recognition has increased significantly.',
      project: 'Branding & Design'
    },
    {
      name: 'David Thompson',
      position: 'Owner, Local Restaurant Group',
      company: 'Local Restaurant Group',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      testimonial: 'Their SEO services helped us dominate local search results. We went from page 3 to the top 3 results for all our target keywords. Our online orders increased by 400% in just 6 months.',
      project: 'SEO & Local Marketing'
    },
    {
      name: 'Lisa Park',
      position: 'E-commerce Manager, StyleHub',
      company: 'StyleHub',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      testimonial: 'The online advertising campaigns Eversour managed for us delivered incredible ROI. Our cost per acquisition dropped by 60% while sales volume increased by 180%. Exceptional results!',
      project: 'Online Advertising'
    },
    {
      name: 'Robert Kim',
      position: 'CEO, HealthTech Innovations',
      company: 'HealthTech Innovations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      testimonial: 'Eversour built a comprehensive healthcare management system that streamlined our entire operation. The user interface is intuitive, and the backend is robust. Outstanding work!',
      project: 'Healthcare Software'
    }
  ];

  const stats = [
    { number: '200+', label: 'Happy Clients' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '350%', label: 'Average ROI Increase' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div>
      <PageHeader
        title="What Our Clients Say"
        subtitle="Testimonials"
        description="Don't just take our word for it. Here's what our clients have to say about working with Eversour and the results we've delivered."
      />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p className="text-lg opacity-90">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass p-8 rounded-2xl hover:glass-strong transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-brand-purple font-medium">{testimonial.position}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    
                    {/* Star Rating */}
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <Quote className="w-8 h-8 text-brand-purple/30 flex-shrink-0" />
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full">
                    {testimonial.project}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Video <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear directly from our clients about their experience working with Eversour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-gradient-to-br from-brand-purple/20 to-brand-purple-light/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Video Testimonial {index + 1}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2">Client Success Story {index + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    Watch how we helped transform their business with our digital solutions.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's create your success story. Contact us today to start your digital transformation journey.
            </p>
            <button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
              Start Your Success Story
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
