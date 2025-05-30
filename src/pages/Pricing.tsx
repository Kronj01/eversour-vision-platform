
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Target, Clock, DollarSign, FileText, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const Pricing = () => {
  const pricingSteps = [
    {
      step: '01',
      title: 'Discovery Phase',
      description: 'You reach out to us with your digital needs and goals. We schedule an initial consultation to discuss your business in detail.'
    },
    {
      step: '02',
      title: 'In-Depth Analysis',
      description: 'We conduct a thorough analysis of your business, target audience, and competitive landscape. We review your existing website, marketing materials, and any previous digital efforts.'
    },
    {
      step: '03',
      title: 'Personalized Strategy Development',
      description: 'Based on our analysis, we develop a customized digital strategy that outlines specific goals, tactics, and timelines.'
    },
    {
      step: '04',
      title: 'Expert Consultation',
      description: 'We schedule a meeting for you to meet with our experts in the relevant departments (Web Development, Software Development, Branding, SEO, Online Advertising).'
    },
    {
      step: '05',
      title: 'Transparent Pricing Proposal',
      description: 'Based on the personalized strategy and expert consultation, we provide you with a detailed pricing proposal that outlines all costs, terms, and conditions.'
    }
  ];

  const requirements = [
    {
      icon: FileText,
      title: 'Business Overview',
      description: 'A written document that provides an overview of your business, including overview, vision, mission, services (detailed), and USP (Unique Selling Points).'
    },
    {
      icon: Clock,
      title: 'Timeframe',
      description: 'Your desired timeframe for achieving your goals and project completion.'
    },
    {
      icon: Target,
      title: 'Requirements & Features',
      description: 'Specific requirements for your project and desired features for your website, software, or marketing campaigns.'
    },
    {
      icon: DollarSign,
      title: 'Budget',
      description: 'What pricing offers have you received from other service providers? What is your budget in mind?'
    }
  ];

  const commitments = [
    'Custom Solutions Tailored to Your Business',
    'Transparent and Honest Pricing',
    'Expert Guidance from Industry Professionals',
    'A Long-Term Partnership Focused on Your Success',
    'Unmet Vision and Transparency with the Cost and Plan'
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
              <DollarSign className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Tailored Solutions, Transparent Investments</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Unlocking Your Digital Potential Requires a{' '}
              <span className="gradient-text">Personalized Approach</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-purple-400 font-semibold mb-6">
              Let's Build Your Success Story Together!
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At Eversour, we believe that every business is unique, and your digital strategy should be too. We don't offer generic, one-size-fits-all pricing packages because we understand that your specific needs, goals, and budget are essential factors in creating a winning solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Our Pricing Works */}
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
              How Our Pricing Works
            </h2>
            <h3 className="text-2xl text-purple-400 font-semibold mb-4">
              A Collaborative Approach
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We take a collaborative approach to pricing, ensuring transparency and alignment every step of the way.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {pricingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="glass-card p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-purple-400/30">
                        <span className="text-purple-400 font-bold text-lg">{step.step}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                <div className="w-px h-20 bg-gradient-to-b from-purple-500/50 to-transparent hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
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
              To Provide You with an Accurate Proposal
            </h2>
            <h3 className="text-2xl text-purple-400 font-semibold mb-4">
              We Need to Understand Your Business!
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Before we can provide you with a detailed pricing proposal, we need to gather some essential information about your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {requirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{req.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{req.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
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
              What You Get
            </h2>
            <h3 className="text-2xl text-purple-400 font-semibold mb-4">
              The Eversour Commitment
            </h3>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 border border-white/10">
              <div className="space-y-6">
                {commitments.map((commitment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <span className="text-lg text-white">{commitment}</span>
                  </motion.div>
                ))}
              </div>
            </div>
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
              Ready to Discuss Your Project and Get a{' '}
              <span className="gradient-text">Personalized Quote?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's start building your success story together. Schedule your free consultation today!
            </p>
            
            <Button className="btn-primary px-8 py-4 text-lg group">
              <Zap className="w-5 h-5 mr-2" />
              Schedule Your Free Consultation Now!
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
