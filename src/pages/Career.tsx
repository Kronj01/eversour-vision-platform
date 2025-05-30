
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, DollarSign, Briefcase, Heart, Growth, Award } from 'lucide-react';
import { Button } from '../components/ui/button';

const Career = () => {
  const jobOpenings = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Development',
      location: 'Muzaffarnagar, India / Remote',
      type: 'Full-time',
      salary: '₹8-15 LPA',
      description: 'Join our development team to build cutting-edge web applications and software solutions.',
      requirements: ['3+ years experience', 'React, Node.js, TypeScript', 'Strong problem-solving skills']
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Muzaffarnagar, India / Remote',
      type: 'Full-time',
      salary: '₹5-10 LPA',
      description: 'Create beautiful and intuitive user experiences for our clients\' digital products.',
      requirements: ['2+ years experience', 'Figma, Adobe Creative Suite', 'Portfolio required']
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Muzaffarnagar, India / Remote',
      type: 'Full-time',
      salary: '₹4-8 LPA',
      description: 'Drive growth through strategic digital marketing campaigns and SEO optimization.',
      requirements: ['2+ years experience', 'SEO, SEM, Social Media', 'Analytics expertise']
    },
    {
      title: 'Business Development Executive',
      department: 'Sales',
      location: 'Muzaffarnagar, India',
      type: 'Full-time',
      salary: '₹3-6 LPA + Commission',
      description: 'Build relationships with clients and drive business growth through strategic partnerships.',
      requirements: ['1+ years experience', 'Excellent communication', 'Sales experience']
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs for you and your family.'
    },
    {
      icon: Growth,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities, skill development programs, and career advancement.'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with a diverse, talented team in an inclusive and supportive environment.'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and remote work options to maintain a healthy work-life balance.'
    },
    {
      icon: Award,
      title: 'Recognition & Rewards',
      description: 'Performance-based bonuses, recognition programs, and competitive compensation.'
    },
    {
      icon: Briefcase,
      title: 'Cutting-Edge Projects',
      description: 'Work on innovative projects using the latest technologies and industry best practices.'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We embrace creativity and stay ahead of industry trends to deliver cutting-edge solutions.'
    },
    {
      title: 'Collaboration',
      description: 'We believe in working closely with our team and clients to achieve extraordinary results.'
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest quality in our work, ensuring every project exceeds expectations.'
    },
    {
      title: 'Growth',
      description: 'We are committed to the continuous growth and development of our team members.'
    }
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
              <Briefcase className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Join Our Team</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Build Your <span className="gradient-text">Career</span> with Eversour
            </h1>
            <h2 className="text-2xl md:text-3xl text-purple-400 font-semibold mb-6">
              Where Innovation Meets Opportunity
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join a dynamic team of digital experts who are passionate about creating innovative solutions and driving business growth. At Eversour, we believe that our people are our greatest asset, and we're committed to helping you grow beyond your limits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
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
              Why Choose Eversour?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We offer more than just a job – we provide a platform for growth, innovation, and meaningful impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 border border-white/10 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-400/30 mx-auto mb-6">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10 text-center"
              >
                <h3 className="text-xl font-bold text-purple-400 mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
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
              Current Openings
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore exciting career opportunities and join our growing team of digital experts.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-400/30">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded border border-green-400/30">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:ml-8">
                    <Button className="btn-primary px-8 py-3 text-lg">
                      Apply Now
                    </Button>
                  </div>
                </div>
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
              Don't See the Right Role? <span className="gradient-text">Let's Talk!</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and excellence. Send us your resume and let's explore how you can grow with Eversour.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary px-8 py-4 text-lg">
                Send Your Resume
              </Button>
              <Button className="btn-secondary px-8 py-4 text-lg">
                Contact HR Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Career;
