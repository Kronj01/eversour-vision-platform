
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SortAsc, SortDesc, Grid, List, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Project {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  industry: string;
  completionDate: string;
  featured: boolean;
  difficulty: 'Simple' | 'Medium' | 'Complex';
  image: string;
  description: string;
  client: string;
}

interface FilterState {
  search: string;
  categories: string[];
  technologies: string[];
  industries: string[];
  difficulty: string[];
  featured: boolean | null;
  sortBy: 'date' | 'title' | 'difficulty';
  sortOrder: 'asc' | 'desc';
}

const AdvancedPortfolioFilter = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    technologies: [],
    industries: [],
    difficulty: [],
    featured: null,
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Sample data - replace with real data
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      industry: 'Retail',
      completionDate: '2024-01-15',
      featured: true,
      difficulty: 'Complex',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      description: 'Full-featured e-commerce platform with payment integration',
      client: 'TechCorp Inc.'
    },
    {
      id: '2',
      title: 'Mobile Banking App',
      category: 'Software Development',
      technologies: ['React Native', 'Firebase', 'Biometric Auth'],
      industry: 'Finance',
      completionDate: '2024-02-20',
      featured: true,
      difficulty: 'Complex',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      description: 'Secure mobile banking application with biometric authentication',
      client: 'SecureBank'
    },
    {
      id: '3',
      title: 'Brand Identity Design',
      category: 'Branding',
      technologies: ['Figma', 'Adobe Creative Suite'],
      industry: 'Technology',
      completionDate: '2024-03-10',
      featured: false,
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      description: 'Complete brand identity package for tech startup',
      client: 'InnovateAI'
    }
  ];

  const categories = [...new Set(projects.map(p => p.category))];
  const technologies = [...new Set(projects.flatMap(p => p.technologies))];
  const industries = [...new Set(projects.map(p => p.industry))];
  const difficulties = ['Simple', 'Medium', 'Complex'];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const searchMatch = project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         project.client.toLowerCase().includes(filters.search.toLowerCase());

      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(project.category);
      const technologyMatch = filters.technologies.length === 0 || 
                             filters.technologies.some(tech => project.technologies.includes(tech));
      const industryMatch = filters.industries.length === 0 || filters.industries.includes(project.industry);
      const difficultyMatch = filters.difficulty.length === 0 || filters.difficulty.includes(project.difficulty);
      const featuredMatch = filters.featured === null || project.featured === filters.featured;

      return searchMatch && categoryMatch && technologyMatch && industryMatch && difficultyMatch && featuredMatch;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty':
          const difficultyOrder = { 'Simple': 1, 'Medium': 2, 'Complex': 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, filters]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'categories' | 'technologies' | 'industries' | 'difficulty', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      technologies: [],
      industries: [],
      difficulty: [],
      featured: null,
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== null && value !== '' && value !== 'date' && value !== 'desc'
  ).length;

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 bg-white/10 border-purple-400/30 text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Controls */}
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              updateFilter('sortBy', sortBy);
              updateFilter('sortOrder', sortOrder);
            }}
            className="px-4 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white text-sm"
          >
            <option value="date-desc" className="bg-black">Newest First</option>
            <option value="date-asc" className="bg-black">Oldest First</option>
            <option value="title-asc" className="bg-black">A-Z</option>
            <option value="title-desc" className="bg-black">Z-A</option>
            <option value="difficulty-asc" className="bg-black">Simple First</option>
            <option value="difficulty-desc" className="bg-black">Complex First</option>
          </select>

          {/* Filter Toggle */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-purple-400/50 text-purple-400 hover:bg-purple-500/20"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* View Mode */}
          <div className="flex border border-purple-400/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
              {activeFilterCount > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <label className="block text-white font-medium mb-3">Categories</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleArrayFilter('categories', category)}
                        className="mr-2 rounded border-purple-400/30"
                      />
                      <span className="text-gray-300 text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-white font-medium mb-3">Technologies</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {technologies.map(tech => (
                    <label key={tech} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.technologies.includes(tech)}
                        onChange={() => toggleArrayFilter('technologies', tech)}
                        className="mr-2 rounded border-purple-400/30"
                      />
                      <span className="text-gray-300 text-sm">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div>
                <label className="block text-white font-medium mb-3">Industries</label>
                <div className="space-y-2">
                  {industries.map(industry => (
                    <label key={industry} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.industries.includes(industry)}
                        onChange={() => toggleArrayFilter('industries', industry)}
                        className="mr-2 rounded border-purple-400/30"
                      />
                      <span className="text-gray-300 text-sm">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty & Featured */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-3">Difficulty</label>
                  <div className="space-y-2">
                    {difficulties.map(diff => (
                      <label key={diff} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(diff)}
                          onChange={() => toggleArrayFilter('difficulty', diff)}
                          className="mr-2 rounded border-purple-400/30"
                        />
                        <span className="text-gray-300 text-sm">{diff}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Featured</label>
                  <select
                    value={filters.featured === null ? 'all' : filters.featured.toString()}
                    onChange={(e) => updateFilter('featured', e.target.value === 'all' ? null : e.target.value === 'true')}
                    className="w-full px-3 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white text-sm"
                  >
                    <option value="all" className="bg-black">All Projects</option>
                    <option value="true" className="bg-black">Featured Only</option>
                    <option value="false" className="bg-black">Non-Featured</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="text-gray-400">
        Showing {filteredAndSortedProjects.length} of {projects.length} projects
      </div>

      {/* Projects Grid/List */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        <AnimatePresence>
          {filteredAndSortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group ${
                viewMode === 'grid' 
                  ? 'bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all duration-300'
                  : 'bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6 flex items-center gap-6 hover:border-purple-400/40 transition-all duration-300'
              }`}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {project.difficulty}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{project.client}</span>
                      <span>{new Date(project.completionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">Featured</span>
                        )}
                        <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">
                          {project.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">
                        {project.client} • {new Date(project.completionDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedPortfolioFilter;
