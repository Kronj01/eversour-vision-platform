
import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, BarChart, Zap, Users, DollarSign } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';

const Ads = () => {
  const services = [
    {
      icon: Target,
      title: "Google Ads",
      description: "Reach customers when they're searching for your products or services on Google."
    },
    {
      icon: Users,
      title: "Social Media Ads",
      description: "Engage your audience on Facebook, Instagram, LinkedIn, and other social platforms."
    },
    {
      icon: TrendingUp,
      title: "Campaign Optimization",
      description: "Continuously optimize your campaigns for better performance and lower costs."
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Detailed reporting and analytics to track your advertising ROI and success metrics."
    },
    {
      icon: Zap,
      title: "Retargeting Campaigns",
      description: "Re-engage visitors who have shown interest in your products or services."
    },
    {
      icon: DollarSign,
      title: "Budget Management",
      description: "Smart budget allocation and bid management to maximize your advertising spend."
    }
  ];

  const platforms = [
    "Google Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", 
    "YouTube Ads", "Twitter Ads", "Pinterest Ads", "TikTok Ads"
  ];

  const results = [
    { metric: "400%", label: "Average ROAS" },
    { metric: "65%", label: "Cost Reduction" },
    { metric: "250%", label: "Lead Increase" },
    { metric: "90%", label: "Client Satisfaction" }
  ];

  return (
    <div>
      <PageHeader
        title="Drive Results with Targeted Advertising"
        subtitle="Online Advertising"
        description="Maximize your ROI with strategic online advertising campaigns across Google, social media, and other high-converting platforms."
      />

      {/* Results Section */}
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
              Proven Results
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our data-driven approach delivers measurable results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {result.metric}
                </div>
                <div className="text-gray-400">{result.label}</div>
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
              Our Advertising Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive advertising solutions to reach your target audience and drive conversions.
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

      {/* Platforms Section */}
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
              Advertising Platforms
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We manage campaigns across all major advertising platforms.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-6 py-3 bg-brand-purple/20 text-brand-purple rounded-full border border-brand-purple/30 hover:bg-brand-purple/30 transition-colors"
              >
                {platform}
              </motion.span>
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
              Ready to Scale Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a free advertising audit and discover how we can help you reach more customers.
            </p>
            <Button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
              Get Free Ads Audit
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ads;
