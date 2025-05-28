
import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import { Users, Target, Lightbulb, Award, Coffee, Code2 } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering solutions that exceed expectations.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative approaches to solve complex challenges.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners to achieve shared success.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We maintain the highest standards in code quality, design, and user experience.'
    }
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader with 10+ years in digital transformation.'
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack expert specializing in scalable architectures.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Design Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Creative visionary crafting exceptional user experiences.'
    },
    {
      name: 'Emily Watson',
      role: 'Strategy Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Strategic thinker driving business growth through technology.'
    }
  ];

  const stats = [
    { icon: Coffee, number: '1000+', label: 'Cups of Coffee' },
    { icon: Code2, number: '50K+', label: 'Lines of Code' },
    { icon: Users, number: '100+', label: 'Happy Clients' },
    { icon: Award, number: '25+', label: 'Awards Won' }
  ];

  return (
    <div>
      <PageHeader
        title="About Eversour"
        subtitle="Our Story"
        description="We're a team of passionate digital innovators committed to building the future through technology."
      />

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                At Eversour, we believe technology should empower businesses to achieve their boldest ambitions. We're not just a development company – we're your strategic partner in digital transformation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded on the principle that great software can change the world, we combine technical excellence with creative innovation to deliver solutions that don't just meet requirements – they exceed possibilities.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-purple-light/20" />
                <div className="relative">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center">
                          <Icon className="w-8 h-8 text-brand-purple mx-auto mb-3" />
                          <div className="text-3xl font-bold gradient-text mb-1">
                            {stat.number}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide every decision we make and every solution we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The brilliant minds behind Eversour's innovative solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-brand-purple font-semibold mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss how our team can help bring your vision to life.
            </p>
            <button className="bg-white text-brand-purple hover:bg-gray-100 px-12 py-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
              Start Your Project
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
