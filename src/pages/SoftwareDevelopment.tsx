
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Shield, Zap, Users } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';

const SoftwareDevelopment = () => {
  const features = [
    {
      icon: Code,
      title: "Custom Software Solutions",
      description: "Tailored applications built to your exact specifications and business requirements."
    },
    {
      icon: Database,
      title: "Database Design & Management",
      description: "Scalable database architecture and optimization for performance and reliability."
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless cloud deployment and integration with modern infrastructure."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security measures and best practices implementation."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "High-performance applications that scale with your business growth."
    },
    {
      icon: Users,
      title: "API Development",
      description: "Robust APIs for seamless integration with third-party services and systems."
    }
  ];

  const technologies = [
    "Python", "Node.js", "React", "Vue.js", "Angular", "Django", "Flask", "Express.js",
    "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure"
  ];

  return (
    <div>
      <PageHeader
        title="Custom Software Development"
        subtitle="Software Solutions"
        description="Build powerful, scalable software solutions tailored to your business needs with cutting-edge technology and best practices."
      />

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center group"
              >
                <div className="icon-container mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-brand-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We leverage the latest technologies and frameworks to deliver cutting-edge solutions.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-6 py-3 bg-brand-purple/20 text-brand-purple rounded-full border border-brand-purple/30 hover:bg-brand-purple/30 transition-colors"
              >
                {tech}
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
              Ready to Build Your Software Solution?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your project requirements and create a custom software solution that drives your business forward.
            </p>
            <Button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareDevelopment;
