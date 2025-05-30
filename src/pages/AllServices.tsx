
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Palette, Search, TrendingUp, Shield, Globe, Database, Smartphone, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const AllServices = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      subtitle: 'Custom Websites That Convert',
      description: 'From WordPress sites to custom solutions, we bring your vision to reality',
      features: ['Responsive Design', 'Performance Optimization', 'SEO-Friendly', 'Scalable Architecture'],
      href: '/services/web',
      gradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: Zap,
      title: 'Software Development',
      subtitle: 'Tailored Software for Your Unique Needs',
      description: 'We build custom software solutions, web applications, and mobile apps to streamline your operations and drive efficiency.',
      features: ['Custom Applications', 'API Development', 'Cloud Integration', 'Maintenance & Support'],
      href: '/services/software',
      gradient: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: Palette,
      title: 'Branding',
      subtitle: 'Craft Your Brand Identity with Impact',
      description: 'Elevate your brand with captivating logos, visual elements, and marketing materials that resonate with your target audience.',
      features: ['Brand Strategy', 'Logo Design', 'UI/UX Design', 'Marketing Materials'],
      href: '/services/branding',
      gradient: 'from-pink-500/20 to-pink-600/20'
    },
    {
      icon: Search,
      title: 'SEO',
      subtitle: 'Dominate Search Results & Drive Organic Growth',
      description: 'Improve your online visibility with our comprehensive SEO strategies, including keyword research, content optimization, and manual link building.',
      features: ['Keyword Research', 'Technical SEO', 'Content Strategy', 'Analytics & Reporting'],
      href: '/services/seo',
      gradient: 'from-green-500/20 to-green-600/20'
    },
    {
      icon: TrendingUp,
      title: 'Online Advertisements',
      subtitle: 'Reach Your Target Audience with Precision',
      description: 'Maximize your reach and ROI with our targeted online advertising campaigns across search engines and social media platforms.',
      features: ['Google Ads', 'Social Media Ads', 'Campaign Optimization', 'Performance Tracking'],
      href: '/services/ads',
      gradient: 'from-orange-500/20 to-orange-600/20'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Understanding Your Goals',
      subtitle: 'Your Goal, Our Focus',
      description: 'We begin by understanding your unique business objectives and target audience. We gain insights into your industry, challenges, and aspirations through in-depth consultation.'
    },
    {
      step: '02',
      title: 'Strategic Planning',
      subtitle: 'Crafting Your Digital Blueprint',
      description: 'Based on your goals, we develop a clear roadmap for your digital journey tailored to your specific needs. Our strategic planning process includes market research, competitor analysis, and goal setting.'
    },
    {
      step: '03',
      title: 'Execution and Optimization',
      subtitle: 'Bringing Your Vision to Life',
      description: 'Our team of experts brings your digital vision to life through meticulous execution and ongoing optimization. We track key performance indicators (KPIs) to measure success and make data-driven adjustments.'
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
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 rounded-full px-6 py-3 mb-8"
            >
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Expert Digital Solutions</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Expert Digital Solutions to{' '}
              <span className="gradient-text">Propel Your Business Forward</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital solutions to transform your business and drive growth in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl glass-card hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center border border-purple-400/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">
                        {service.subtitle}
                      </h4>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-2 bg-purple-500/20 text-purple-400 text-sm rounded-lg border border-purple-400/30">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Link to={service.href}>
                        <Button className="btn-primary group">
                          Learn More
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* How We Work Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proven process ensures successful project delivery and exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center border border-white/10"
              >
                <div className="text-4xl font-bold text-purple-400 mb-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <h4 className="text-lg font-semibold text-purple-400 mb-4">{step.subtitle}</h4>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to deliver exceptional results.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 px-6 py-3 bg-purple-500/20 text-purple-400 rounded-full border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
              >
                <tech.icon className="w-5 h-5" />
                <span className="font-medium">{tech.name}</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Digital Journey?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss your project requirements and create solutions that drive your business forward.
            </p>
            <Link to="/contact">
              <Button className="btn-primary px-8 py-4 text-lg">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AllServices;
