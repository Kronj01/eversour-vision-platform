
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, Target, Sparkles, Award, TrendingUp } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';

const Branding = () => {
  const services = [
    {
      icon: Palette,
      title: "Logo Design",
      description: "Memorable logos that capture your brand essence and resonate with your audience."
    },
    {
      icon: Eye,
      title: "Visual Identity",
      description: "Complete visual identity systems including colors, typography, and design elements."
    },
    {
      icon: Target,
      title: "Brand Strategy",
      description: "Strategic brand positioning and messaging that differentiates you from competitors."
    },
    {
      icon: Sparkles,
      title: "Marketing Materials",
      description: "Professional marketing collateral including brochures, business cards, and digital assets."
    },
    {
      icon: Award,
      title: "Brand Guidelines",
      description: "Comprehensive brand guidelines to ensure consistent application across all touchpoints."
    },
    {
      icon: TrendingUp,
      title: "Brand Evolution",
      description: "Ongoing brand development and evolution to keep your brand fresh and relevant."
    }
  ];

  const portfolio = [
    {
      title: "Tech Startup",
      category: "Logo & Identity",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400"
    },
    {
      title: "Fashion Brand",
      category: "Complete Branding",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
    },
    {
      title: "Restaurant Chain",
      category: "Visual Identity",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
    }
  ];

  return (
    <div>
      <PageHeader
        title="Build Your Brand Identity"
        subtitle="Branding Services"
        description="Create a powerful brand identity that resonates with your audience and drives business growth through strategic design and messaging."
      />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
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

      {/* Portfolio Preview */}
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
              Recent Branding Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how we've helped businesses create powerful brand identities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-brand-purple text-sm font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 group-hover:text-brand-purple transition-colors">
                    {project.title}
                  </h3>
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
              Ready to Transform Your Brand?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's create a brand identity that tells your story and connects with your audience.
            </p>
            <Button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
              Start Your Brand Journey
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Branding;
