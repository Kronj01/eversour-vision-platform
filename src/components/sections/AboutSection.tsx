
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Target, Users, Award, Lightbulb, Shield, Heart } from 'lucide-react';
import { Button } from '../ui/button';

const AboutSection = () => {
  const frustrations = [
    "High prices for digital services.",
    "Incomplete and unsatisfactory work from freelancers and agencies.",
    "Low-quality deliverables that don't meet your expectations.",
    "Unreliable and untrustworthy service providers."
  ];

  const whyChoose = [
    "All-in-One Solutions: We offer a comprehensive suite of digital services under one roof.",
    "Client-Centric Approach: Your goals are our priority.",
    "Affordable Excellence: Premium quality without breaking the bank.",
    "Free Consultation and Support: Start with confidence.",
    "Data-Driven Results: Trackable success and measurable ROI."
  ];

  const values = [
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your goals, our priority. We listen, collaborate, and deliver solutions aligned with your success."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Driving digital solutions that redefine industries. We embrace cutting-edge technologies and creative thinking."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Open communication and honest partnerships are the foundation of our relationships."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Delivering exceptional results that exceed expectations. We are committed to excellence in everything we do."
    },
    {
      icon: Heart,
      title: "Teamwork",
      description: "Collaborating with clients to achieve unexpected success. Together, we create something extraordinary."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            About <span className="gradient-text">Eversour</span>
          </h2>
          <p className="text-xl text-purple-400 font-semibold mb-4">
            The Digital Development Service Provider Company in India!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Tired of Digital Frustrations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Tired of Digital Frustrations?</h3>
            <div className="space-y-4">
              {frustrations.map((frustration, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{frustration}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              To be the trusted partner for businesses of all sizes, from startups to established organizations, in creating a powerful online presence across industries including real estate, fashion, and content creation. We empower our clients to dominate their markets through innovative digital solutions.
            </p>
            <Button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Explore Our Services
            </Button>
          </motion.div>
        </div>

        {/* Why Choose Eversour */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Eversour?</h3>
          <div className="space-y-4">
            {whyChoose.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-lg">{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Our Values</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:border-purple-400/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-400/30 mx-auto mb-6">
                  <Icon className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-purple-400 mb-4">{value.title}</h4>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
