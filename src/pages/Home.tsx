
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Search, TrendingUp, Zap, Shield, Users, Target, Award } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      subtitle: 'Custom Websites That Convert',
      description: 'From WordPress sites to custom solutions, we bring your vision to reality',
      href: '/services/web'
    },
    {
      icon: Zap,
      title: 'Software Development',
      subtitle: 'Tailored Software for Your Unique Needs',
      description: 'We build custom software solutions, web applications, and mobile apps to streamline your operations and drive efficiency.',
      href: '/services/software'
    },
    {
      icon: Palette,
      title: 'Branding',
      subtitle: 'Craft Your Brand Identity with Impact',
      description: 'Elevate your brand with captivating logos, visual elements, and marketing materials that resonate with your target audience.',
      href: '/services/branding'
    },
    {
      icon: Search,
      title: 'SEO',
      subtitle: 'Dominate Search Results & Drive Organic Growth',
      description: 'Improve your online visibility with our comprehensive SEO strategies, including keyword research, content optimization, and manual link building.',
      href: '/services/seo'
    },
    {
      icon: TrendingUp,
      title: 'Online Advertisements',
      subtitle: 'Reach Your Target Audience with Precision',
      description: 'Maximize your reach and ROI with our targeted online advertising campaigns across search engines and social media platforms.',
      href: '/services/ads'
    }
  ];

  const frustrations = [
    'High prices for digital services.',
    'Incomplete and unsatisfactory work from freelancers and agencies.',
    'Low-quality deliverables that don\'t meet your expectations.',
    'Unreliable and untrustworthy service providers.'
  ];

  const whyChooseUs = [
    'All-in-One Solutions: We offer a comprehensive suite of digital services under one roof.',
    'Client-Centric Approach: Your goals are our priority.',
    'Affordable Excellence: Premium quality without breaking the bank.',
    'Free Consultation and Support: Start with confidence.',
    'Data-Driven Results: Trackable success and measurable ROI.'
  ];

  const values = [
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your goals, our priority. We listen, collaborate, and deliver solutions aligned with your success.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Driving digital solutions that redefine industries. We embrace cutting-edge technologies and creative thinking.'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Open communication and honest partnerships are the foundation of our relationships.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Delivering exceptional results that exceed expectations. We are committed to excellence in everything we do.'
    },
    {
      icon: Target,
      title: 'Teamwork',
      description: 'Collaborating with clients to achieve unexpected success. Together, we create something extraordinary.'
    }
  ];

  const approachSteps = [
    {
      title: 'Understanding Your Goals',
      subtitle: 'Your Goal, Our Focus',
      description: 'We begin by understanding your unique business objectives and target audience. We gain insights into your industry, challenges, and aspirations through in-depth consultation.'
    },
    {
      title: 'Strategic Planning',
      subtitle: 'Crafting Your Digital Blueprint',
      description: 'Based on your goals, we develop a clear roadmap for your digital journey tailored to your specific needs. Our strategic planning process includes market research, competitor analysis, and goal setting.'
    },
    {
      title: 'Execution and Optimization',
      subtitle: 'Bringing Your Vision to Life',
      description: 'Our team of experts brings your digital vision to life through meticulous execution and ongoing optimization. We track key performance indicators (KPIs) to measure success and make data-driven adjustments.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray-dark to-brand-black">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-transparent to-brand-purple-light/20" />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple-light/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="relative z-10 container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="text-white text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Grow Beyond Your Limits:
                <br />
                <span className="gradient-text">Digital Experts at Your Service!</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-12 text-balance leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Located in Muzaffarnagar, India, Eversour is a leading digital development company dedicated to helping businesses establish a robust and thriving online presence. In today's competitive digital landscape, a strong online footprint is no longer optional; it's essential for sustained success.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Button className="btn-primary text-lg px-12 py-6">
                  Discover Your Potential
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-purple-light/20" />
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
                    alt="Digital Development Team"
                    className="rounded-2xl w-full h-64 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="section-padding bg-white dark:bg-brand-gray-dark">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Digital Development Service Provider */}
            <motion.div
              className="glass p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                The Digital Development Service Provider Company in India!
              </h3>
            </motion.div>

            {/* Tired of Digital Frustrations */}
            <motion.div
              className="glass p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-500">
                Tired of Digital Frustrations?
              </h3>
              <ul className="space-y-3">
                {frustrations.map((frustration, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{frustration}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Why Choose Eversour */}
            <motion.div
              className="glass p-8 rounded-2xl lg:col-span-2 xl:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-500">
                Why Choose Eversour?
              </h3>
              <ul className="space-y-3">
                {whyChooseUs.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Values */}
            <motion.div
              className="lg:col-span-2 xl:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              className="lg:col-span-2 xl:col-span-3 glass p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the trusted partner for businesses of all sizes, from startups to established organizations, in creating a powerful online presence across industries including real estate, fashion, and content creation. We empower our clients to dominate their markets through innovative digital solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Expert Digital Solutions to <span className="gradient-text">Propel Your Business Forward</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl glass hover:glass-strong transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-purple transition-colors duration-300">
                    {service.title}
                  </h3>
                  <h4 className="text-lg font-semibold mb-4 text-brand-purple">
                    {service.subtitle}
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to={service.href}
                    className="inline-flex items-center text-brand-purple font-semibold group-hover:gap-2 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Our Work <span className="gradient-text">Speaks for Itself</span>
            </h2>
            <Link to="/portfolio" className="btn-primary inline-flex items-center">
              View Our Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <Link to="/testimonials" className="btn-primary inline-flex items-center">
              Read All Testimonials
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
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
              How We <span className="gradient-text">Work</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachSteps.map((step, index) => (
              <motion.div
                key={index}
                className="glass p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <h4 className="text-lg font-semibold mb-4 text-brand-purple">{step.subtitle}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Have Questions? Let's Connect!
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Ready to transform your digital presence? Let's discuss how we can help you grow beyond your limits.
            </p>
            <Link to="/contact" className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center">
              Act Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
