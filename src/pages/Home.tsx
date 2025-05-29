
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Search, TrendingUp, Zap, Shield, Users, Target, Award, Globe, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      subtitle: 'Custom Websites That Convert',
      description: 'From WordPress sites to custom solutions, we bring your vision to reality with beautiful, functional websites that drive conversions.',
      href: '/services/web',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Software Development',
      subtitle: 'Tailored Software for Your Unique Needs',
      description: 'We build custom software solutions, web applications, and mobile apps to streamline your operations and drive efficiency.',
      href: '/services/software',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Branding',
      subtitle: 'Craft Your Brand Identity with Impact',
      description: 'Elevate your brand with captivating logos, visual elements, and marketing materials that resonate with your target audience.',
      href: '/services/branding',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Search,
      title: 'SEO',
      subtitle: 'Dominate Search Results & Drive Organic Growth',
      description: 'Improve your online visibility with our comprehensive SEO strategies, including keyword research, content optimization, and manual link building.',
      href: '/services/seo',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Online Advertisements',
      subtitle: 'Reach Your Target Audience with Precision',
      description: 'Maximize your reach and ROI with our targeted online advertising campaigns across search engines and social media platforms.',
      href: '/services/ads',
      gradient: 'from-indigo-500 to-purple-500'
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
      number: 1,
      title: 'Understanding Your Goals',
      subtitle: 'Your Goal, Our Focus',
      description: 'We begin by understanding your unique business objectives and target audience. We gain insights into your industry, challenges, and aspirations through in-depth consultation.',
      icon: Target
    },
    {
      number: 2,
      title: 'Strategic Planning',
      subtitle: 'Crafting Your Digital Blueprint',
      description: 'Based on your goals, we develop a clear roadmap for your digital journey tailored to your specific needs. Our strategic planning process includes market research, competitor analysis, and goal setting.',
      icon: Sparkles
    },
    {
      number: 3,
      title: 'Execution and Optimization',
      subtitle: 'Bringing Your Vision to Life',
      description: 'Our team of experts brings your digital vision to life through meticulous execution and ongoing optimization. We track key performance indicators (KPIs) to measure success and make data-driven adjustments.',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Orbs */}
      <div className="floating-orb-1" />
      <div className="floating-orb-2" />
      <div className="floating-orb-3" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand-purple/5 to-transparent" />
        
        <div className="relative z-10 container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full glass border border-brand-purple/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-brand-purple mr-2" />
                <span className="text-sm font-medium text-brand-purple">Digital Development Experts</span>
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="text-white">Grow Beyond Your</span>
                <br />
                <span className="text-white">Limits:</span>
                <br />
                <span className="gradient-text">Digital Experts at Your Service!</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Located in Muzaffarnagar, India, Eversour is a leading digital development company dedicated to helping businesses establish a robust and thriving online presence. In today's competitive digital landscape, a strong online footprint is no longer optional; it's essential for sustained success.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Button className="btn-primary text-lg px-8 py-4 group">
                  Discover Your Potential
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button className="btn-secondary text-lg px-8 py-4">
                  Explore Our Services
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative glass-card p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-purple-light/10" />
                
                {/* Circular Design Element */}
                <div className="relative h-96 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-brand-purple/30" />
                  <div className="absolute inset-4 rounded-full border border-brand-purple/20" />
                  <div className="absolute inset-8 rounded-full border border-brand-purple/10" />
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-full flex items-center justify-center pulse-glow">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Floating Icons */}
                  <motion.div
                    className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  >
                    <Users className="w-6 h-6 text-brand-purple" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-8 left-8 w-12 h-12 glass rounded-full flex items-center justify-center"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <Target className="w-6 h-6 text-brand-purple" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/2 right-4 w-10 h-10 glass rounded-full flex items-center justify-center"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <Sparkles className="w-5 h-5 text-brand-purple" />
                  </motion.div>
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
            <div className="w-1 h-3 bg-brand-purple rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Eversour</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The Digital Development Service Provider Company in India!
            </p>
          </motion.div>

          <div className="bento-grid">
            {/* Tired of Digital Frustrations */}
            <motion.div
              className="bento-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-red-400">
                Tired of Digital Frustrations?
              </h3>
              <ul className="space-y-4">
                {frustrations.map((frustration, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <span className="text-gray-300">{frustration}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              className="bento-item-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the trusted partner for businesses of all sizes, from startups to established organizations, in creating a powerful online presence across industries including real estate, fashion, and content creation. We empower our clients to dominate their markets through innovative digital solutions.
              </p>
              <div className="mt-8">
                <Button className="btn-secondary">
                  Explore Our Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Why Choose Eversour */}
            <motion.div
              className="bento-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-green-400">
                Why Choose Eversour?
              </h3>
              <ul className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Values */}
            <motion.div
              className="bento-item-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-center gradient-text">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="text-center group"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="icon-container mx-auto">
                        <Icon className="w-8 h-8 text-brand-purple" />
                      </div>
                      <h4 className="font-bold mb-2 text-white">{value.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Expert Digital Solutions to <span className="gradient-text">Propel Your Business Forward</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              We offer comprehensive, high-quality digital services tailored to your unique business needs. From web development to online marketing, we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="service-card group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`icon-container bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-purple transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <h4 className="text-lg font-semibold mb-4 text-brand-purple">
                    {service.subtitle}
                  </h4>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Link
                    to={service.href}
                    className="inline-flex items-center text-brand-purple font-semibold hover:gap-2 transition-all duration-300 group-hover:text-brand-purple-light"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 transition-all duration-300" />
                  </Link>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-brand-purple/50 transition-all duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-gradient-to-br from-transparent via-brand-purple/5 to-transparent">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Our Work <span className="gradient-text">Speaks for Itself</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Browse through our portfolio showcasing successful projects across various industries. Each project reflects our commitment to quality, creativity, and results.
            </p>
            <Link to="/portfolio" className="btn-primary inline-flex items-center text-lg px-8 py-4">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with Eversour.
            </p>
            <Link to="/testimonials" className="btn-primary inline-flex items-center text-lg px-8 py-4">
              Read All Testimonials
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="section-padding bg-gradient-to-br from-transparent via-brand-purple/5 to-transparent">
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              How We <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Our systematic approach ensures that every project we undertake is aligned with your business objectives and delivers measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="content-card text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-full flex items-center justify-center text-white font-bold text-lg pulse-glow">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <div className="icon-container mx-auto mb-6">
                      <Icon className="w-8 h-8 text-brand-purple" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                    <h4 className="text-lg font-semibold mb-4 text-brand-purple">{step.subtitle}</h4>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-br from-brand-purple/20 via-brand-purple-dark/20 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-purple-light/10" />
        
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Have Questions? Let's Connect!
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
              Ready to transform your digital presence? Let's discuss how we can help you grow beyond your limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-lg px-12 py-6 inline-flex items-center">
                Act Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Button className="btn-secondary text-lg px-12 py-6">
                Book a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
