
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Calendar, Users, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'software', name: 'Software Development' },
    { id: 'branding', name: 'Branding' },
    { id: 'seo', name: 'SEO' }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description: "Modern e-commerce solution with advanced features, payment integration, and seamless user experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "3 months",
      teamSize: "4 developers",
      client: "Fashion Store"
    },
    {
      id: 2,
      title: "Real Estate CRM",
      category: "software",
      description: "Custom CRM system for real estate agencies with lead management and analytics dashboard.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
      technologies: ["Python", "PostgreSQL", "React", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "4 months",
      teamSize: "5 developers",
      client: "Property Solutions"
    },
    {
      id: 3,
      title: "Fashion Brand Identity",
      category: "branding",
      description: "Complete brand identity design for a luxury fashion startup including logo and website.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
      technologies: ["Figma", "Illustrator", "Photoshop"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "2 months",
      teamSize: "3 designers",
      client: "Luxury Fashion"
    },
    {
      id: 4,
      title: "Restaurant Management System",
      category: "software",
      description: "Complete restaurant management solution with POS, inventory, and customer management.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
      technologies: ["Vue.js", "Laravel", "MySQL"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "5 months",
      teamSize: "6 developers",
      client: "Restaurant Chain"
    },
    {
      id: 5,
      title: "Healthcare Website",
      category: "web",
      description: "Modern healthcare website with appointment booking and patient portal.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600",
      technologies: ["Next.js", "Tailwind", "Supabase"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "3 months",
      teamSize: "4 developers",
      client: "Medical Center"
    },
    {
      id: 6,
      title: "SEO Campaign Success",
      category: "seo",
      description: "Comprehensive SEO strategy that increased organic traffic by 300% in 6 months.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      technologies: ["SEO Tools", "Analytics", "Content Strategy"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "6 months",
      teamSize: "3 specialists",
      client: "Tech Startup"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="section-padding pt-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-400/30 rounded-full px-5 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Our Portfolio</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6 tracking-tight">
              Our Work Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Showcasing our latest projects and success stories that demonstrate our expertise across different domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-purple-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card group overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{project.rating}.0</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{project.teamSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="text-purple-400 text-xs font-semibold uppercase tracking-wide">
                    {project.client}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-md border border-purple-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a href={project.liveUrl} className="flex-1">
                    <Button className="w-full btn-primary text-sm py-2">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                  <a href={project.githubUrl}>
                    <Button className="btn-secondary px-3 py-2">
                      <Github className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
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
              Ready to Start Your <span className="gradient-text">Next Project?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Contact us to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary px-8 py-4">
                Start Your Project
              </Button>
              <Button className="btn-secondary px-8 py-4">
                View More Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
