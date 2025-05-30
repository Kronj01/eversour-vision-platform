
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Code, Search, Palette } from 'lucide-react';
import { Button } from '../components/ui/button';

const Blog = () => {
  const featuredArticles = [
    {
      title: 'The Ultimate Guide to Modern Web Development: Building Websites That Convert',
      excerpt: 'A comprehensive guide covering all aspects of modern web development, from responsive design to performance optimization.',
      author: 'Eversour Team',
      date: 'December 15, 2024',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      readTime: '12 min read'
    },
    {
      title: '10 Proven SEO Strategies to Dominate Search Rankings in 2025',
      excerpt: 'Discover the latest SEO techniques and strategies that will help your website climb to the top of search results.',
      author: 'Eversour Team',
      date: 'December 12, 2024',
      category: 'SEO',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop',
      readTime: '8 min read'
    },
    {
      title: 'Software Development Spotlight: How TechCorp Achieved 300% Growth with Custom Solutions',
      excerpt: 'A detailed case study showcasing how our custom software solutions helped TechCorp streamline operations and triple their revenue.',
      author: 'Eversour Team',
      date: 'December 10, 2024',
      category: 'Case Study',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      readTime: '10 min read'
    }
  ];

  const categories = [
    { name: 'Web Development', icon: Code, count: 24 },
    { name: 'Software Development', icon: BookOpen, count: 18 },
    { name: 'Branding', icon: Palette, count: 15 },
    { name: 'SEO', icon: Search, count: 21 },
    { name: 'Digital Marketing', icon: TrendingUp, count: 19 },
    { name: 'Technology Trends', icon: TrendingUp, count: 12 },
    { name: 'Business Growth', icon: TrendingUp, count: 16 }
  ];

  const recentArticles = [
    {
      title: 'AI is Changing the Game: What You Need to Know for 2025',
      date: 'December 8, 2024',
      category: 'Technology Trends'
    },
    {
      title: 'Brand Identity Mistakes That Are Costing You Customers',
      date: 'December 5, 2024',
      category: 'Branding'
    },
    {
      title: 'Mobile-First Design: Why Your Website Needs to Adapt',
      date: 'December 3, 2024',
      category: 'Web Development'
    },
    {
      title: 'Social Media Marketing Trends for E-commerce Success',
      date: 'November 30, 2024',
      category: 'Digital Marketing'
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
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Eversour Insights</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Your Guide to <span className="gradient-text">Digital Growth</span> & Innovation
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Welcome to Eversour Insights, your go-to resource for the latest news, trends, and strategies in the ever-evolving world of digital development. We're passionate about empowering businesses with the knowledge they need to grow beyond their limits and achieve lasting success online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
              Featured Articles
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card border border-white/10 rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/80 text-white text-sm rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <Button className="btn-primary w-full group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories and Recent Articles */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Categories */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-bold gradient-text mb-8">
                  Categories
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="glass-card p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-purple-400" />
                            <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {category.name}
                            </span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            {category.count} articles
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Articles */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10"
              >
                <h3 className="text-2xl font-bold gradient-text mb-6">
                  Recent Articles
                </h3>
                <div className="space-y-4">
                  {recentArticles.map((article, index) => (
                    <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-white mb-2 hover:text-purple-400 transition-colors cursor-pointer">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{article.date}</span>
                        <span className="text-purple-400">{article.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-6 border border-white/10"
              >
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-300 mb-4">
                  Get exclusive insights and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <Button className="btn-primary w-full">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
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
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Have a question or want to discuss how we can help your business grow? We're here to help!
            </p>
            
            <Button className="btn-primary px-8 py-4 text-lg">
              Get Your Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
