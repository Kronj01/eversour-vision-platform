
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Map, Rocket } from 'lucide-react';

const ApproachSection = () => {
  const steps = [
    {
      icon: Target,
      title: "Understanding Your Goals",
      subtitle: "Your Goal, Our Focus",
      description: "We begin by understanding your unique business objectives and target audience. We gain insights into your industry, challenges, and aspirations through in-depth consultation."
    },
    {
      icon: Map,
      title: "Strategic Planning",
      subtitle: "Crafting Your Digital Blueprint",
      description: "Based on your goals, we develop a clear roadmap for your digital journey tailored to your specific needs. Our strategic planning process includes market research, competitor analysis, and goal setting."
    },
    {
      icon: Rocket,
      title: "Execution and Optimization",
      subtitle: "Bringing Your Vision to Life",
      description: "Our team of experts brings your digital vision to life through meticulous execution and ongoing optimization. We track key performance indicators (KPIs) to measure success and make data-driven adjustments."
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            How We Work
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven approach to delivering exceptional digital solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-card text-center group"
            >
              <div className="relative mb-8">
                <div className="icon-container mx-auto">
                  <step.icon className="w-8 h-8 text-brand-purple" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">
                {step.title}
              </h3>
              
              <h4 className="text-lg font-semibold text-brand-purple mb-4">
                {step.subtitle}
              </h4>
              
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
