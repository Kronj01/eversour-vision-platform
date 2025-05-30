
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Zap, Heart, Award, TrendingUp, Globe, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Client-Centric",
      description: "We put our clients first, understanding their unique needs and delivering tailored solutions."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Staying ahead of technology trends to provide cutting-edge solutions."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear communication and honest practices in every project."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Delivering excellence through rigorous testing and attention to detail."
    }
  ];

  const stats = [
    { number: "100+", label: "Projects Completed", icon: Target },
    { number: "50+", label: "Satisfied Clients", icon: Users },
    { number: "5+", label: "Years of Experience", icon: TrendingUp },
    { number: "24/7", label: "Support Available", icon: Globe }
  ];

  const achievements = [
    "Leading digital development company in Muzaffarnagar",
    "Specialized in modern web technologies",
    "Award-winning design and development team",
    "99% client satisfaction rate",
    "ISO certified development processes",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="section-padding pt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 rounded-full px-5 py-2 mb-6"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">About Eversour</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6 tracking-tight">
              About Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Building trust through exceptional digital solutions and innovative technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Digital Development Service Provider Company in India!
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Eversour is leading the way in digital transformation with cutting-edge solutions and innovative technology. We are committed to being the trusted partner for businesses of all sizes, creating powerful online presence across industries.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our mission is to deliver exceptional results that exceed expectations through innovative digital solutions, focusing on client-centric approaches, affordable excellence, and data-driven results.
              </p>
              <Button className="btn-primary">
                Learn More About Our Journey
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card text-center"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that drive our digital solutions and redefine industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card text-center group"
              >
                <div className="icon-container mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="gradient-text">Eversour?</span>
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <h3 className="text-2xl font-bold mb-4">All-in-One Solutions</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We provide comprehensive digital solutions including web development, software development, branding, SEO, and online advertisements. Our client-centric approach ensures affordable excellence with free consultation and support.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Data-Driven Results</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Innovative Technology</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Global Reach</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-purple-600/20 to-purple-800/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the businesses that trust Eversour for their digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary px-8 py-4">
                Start Your Project
              </Button>
              <Button className="btn-secondary px-8 py-4">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
