
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Modern e-commerce solution with advanced features, payment integration, and seamless user experience. Built with React and Node.js.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "3 months",
      teamSize: "4 developers"
    },
    {
      title: "Real Estate CRM",
      category: "Software Development",
      description: "Custom CRM system for real estate agencies with lead management, analytics dashboard, and automated workflows.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
      technologies: ["Python", "PostgreSQL", "React", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "4 months",
      teamSize: "5 developers"
    },
    {
      title: "Fashion Brand Identity",
      category: "Branding",
      description: "Complete brand identity design for a luxury fashion startup including logo, website, and marketing materials.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      technologies: ["Figma", "Illustrator", "Photoshop", "After Effects"],
      liveUrl: "#",
      githubUrl: "#",
      rating: 5,
      duration: "2 months",
      teamSize: "3 designers"
    }
  ];

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full px-6 py-3 mb-8"
          >
            <Star className="w-5 h-5 text-brand-purple" />
            <span className="text-brand-purple font-medium">Our Portfolio</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black gradient-text mb-8 tracking-tight">
            Our Work Speaks for Itself
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Showcasing our latest projects and success stories that demonstrate our expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Project Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{project.rating}.0</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{project.teamSize}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <span className="text-brand-purple text-sm font-semibold uppercase tracking-wide">
                {project.category}
              </span>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs rounded-full border border-brand-purple/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a href={project.liveUrl} className="flex-1">
                  <Button className="w-full btn-primary group/btn">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Live Demo
                  </Button>
                </a>
                <a href={project.githubUrl}>
                  <Button className="btn-secondary px-4">
                    <Github className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/portfolio">
            <Button className="btn-primary text-xl px-12 py-5">
              View All Projects
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
