
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import { ArrowRight, Code, Zap, Palette, Search, TrendingUp, Shield, Smartphone, Globe, Database } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with the latest technologies and best practices.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO-Friendly', 'Scalable Architecture'],
      href: '/services/web',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Software Development',
      description: 'Enterprise-grade software solutions tailored to your specific business requirements.',
      features: ['Custom Applications', 'API Development', 'Cloud Integration', 'Maintenance & Support'],
      href: '/services/software',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Palette,
      title: 'Branding & Design',
      description: 'Comprehensive brand identity and design services that make your business memorable.',
      features: ['Brand Strategy', 'Logo Design', 'UI/UX Design', 'Marketing Materials'],
      href: '/services/branding',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Data-driven SEO strategies to improve your search rankings and online visibility.',
      features: ['Keyword Research', 'Technical SEO', 'Content Strategy', 'Analytics & Reporting'],
      href: '/services/seo',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Paid Advertising',
      description: 'Strategic paid advertising campaigns that maximize ROI and drive conversions.',
      features: ['Google Ads', 'Social Media Ads', 'Campaign Optimization', 'Performance Tracking'],
      href: '/services/ads',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Security Solutions',
      description: 'Comprehensive security audits and implementations to protect your digital assets.',
      features: ['Security Audits', 'Penetration Testing', 'SSL Implementation', 'Monitoring & Alerts'],
      href: '/services/security',
      gradient: 'from-red-500 to-red-600'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start by understanding your business, goals, and challenges through comprehensive consultation.'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'We develop a tailored strategy and roadmap that aligns with your objectives and timeline.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our expert team brings your vision to life using cutting-edge technologies and best practices.'
    },
    {
      step: '04',
      title: 'Launch',
      description: 'We ensure a smooth launch with thorough testing, optimization, and ongoing support.'
    }
  ];

  const technologies = [
    { name: 'React', icon: Globe },
    { name: 'Node.js', icon: Database },
    { name: 'Python', icon: Code },
    { name: 'TypeScript', icon: Zap },
    { name: 'AWS', icon: Shield },
    { name: 'MongoDB', icon: Database },
    { name: 'Next.js', icon: Globe },
    { name: 'Flutter', icon: Smartphone }
  ];

  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="What We Do"
        description="Comprehensive digital solutions to transform your business and drive growth in the digital landscape."
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete <span className="gradient-text">Digital Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end services to help your business thrive in the digital age.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-3xl glass hover:glass-strong transition-all duration-500 hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-purple transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-brand-purple rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
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

      {/* Process Section */}
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
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-brand-purple to-transparent" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technologies We <span className="gradient-text">Master</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We work with cutting-edge technologies to build robust, scalable, and future-proof solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 hover:scale-105 group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-12 h-12 text-brand-purple mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </motion.div>
              );
            })}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your project and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                Book a Consultation
              </button>
              <Link to="/portfolio" className="border-2 border-white text-white hover:bg-white hover:text-brand-purple px-12 py-6 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
