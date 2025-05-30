
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Palette, Search, TrendingUp, Shield, Smartphone, Globe, Database } from 'lucide-react';
import { Button } from '../components/ui/button';

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-20 pb-16">
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
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Our Services</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Expert Digital Solutions to Propel Your Business Forward
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital solutions to transform your business and drive growth in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-6 rounded-2xl glass-card hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className="icon-container">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-400/30">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Link to={service.href}>
                        <Button className="btn-primary text-sm group">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              How We Work
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our proven process ensures successful project delivery and exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center"
              >
                <div className="text-2xl font-bold text-purple-400 mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Technologies We Use
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We leverage cutting-edge technologies to deliver exceptional results.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
              >
                <tech.icon className="w-4 h-4" />
                <span className="text-sm">{tech.name}</span>
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
              Let's discuss your project requirements and create solutions that drive your business forward.
            </p>
            <Button className="btn-primary px-8 py-3">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
