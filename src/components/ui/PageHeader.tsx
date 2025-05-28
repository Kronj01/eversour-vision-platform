
import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  children
}) => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray-dark to-brand-black">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-transparent to-brand-purple-light/20" />
        </div>
      )}
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple-light rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subtitle && (
            <motion.p
              className="text-brand-purple-light text-lg font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
          
          {children && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
