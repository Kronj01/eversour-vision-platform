
import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, BarChart, Globe, Zap } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';

const SEO = () => {
  const services = [
    {
      icon: Search,
      title: "Keyword Research",
      description: "In-depth keyword analysis to identify high-value opportunities for your business."
    },
    {
      icon: TrendingUp,
      title: "On-Page Optimization",
      description: "Optimize your website content, meta tags, and structure for better search rankings."
    },
    {
      icon: Target,
      title: "Technical SEO",
      description: "Fix technical issues that prevent search engines from properly crawling your site."
    },
    {
      icon: BarChart,
      title: "Performance Tracking",
      description: "Comprehensive analytics and reporting to track your SEO progress and ROI."
    },
    {
      icon: Globe,
      title: "Local SEO",
      description: "Dominate local search results and attract customers in your geographic area."
    },
    {
      icon: Zap,
      title: "Link Building",
      description: "High-quality backlink acquisition to boost your domain authority and rankings."
    }
  ];

  const stats = [
    { number: "300%", label: "Average Traffic Increase" },
    { number: "85%", label: "First Page Rankings" },
    { number: "50+", label: "Happy SEO Clients" },
    { number: "24/7", label: "Monitoring & Support" }
  ];

  return (
    <div>
      <PageHeader
        title="Dominate Search Results"
        subtitle="SEO Services"
        description="Drive organic traffic and increase your online visibility with our comprehensive SEO strategies and proven optimization techniques."
      />

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Our SEO Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive SEO solutions to improve your search rankings and drive qualified traffic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center group"
              >
                <div className="icon-container mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-brand-purple transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Our SEO Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A systematic approach to improve your search engine rankings and organic visibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              "1. Audit & Analysis",
              "2. Strategy Development",
              "3. Implementation",
              "4. Monitor & Optimize"
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center"
              >
                <div className="text-2xl font-bold text-brand-purple mb-4">
                  {step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Boost Your Rankings?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free SEO audit and discover how we can improve your search engine visibility.
            </p>
            <Button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
              Get Free SEO Audit
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SEO;
