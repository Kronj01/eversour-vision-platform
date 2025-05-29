
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Modern e-commerce solution with advanced features and seamless user experience.",
      image: "/placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Real Estate CRM",
      category: "Software Development",
      description: "Custom CRM system for real estate agencies with lead management and analytics.",
      image: "/placeholder.svg",
      technologies: ["Python", "PostgreSQL", "React"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Fashion Brand Identity",
      category: "Branding",
      description: "Complete brand identity design for a luxury fashion startup.",
      image: "/placeholder.svg",
      technologies: ["Figma", "Illustrator", "Photoshop"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Our Work Speaks for Itself
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our latest projects and success stories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <span className="text-brand-purple text-sm font-medium">
                {project.category}
              </span>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a href={project.liveUrl} className="flex-1">
                  <Button className="w-full btn-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </a>
                <a href={project.githubUrl}>
                  <Button className="btn-secondary">
                    <Github className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/portfolio">
            <Button className="btn-primary">
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
