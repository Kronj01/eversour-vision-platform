
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  X, 
  FileText, 
  Image, 
  Globe,
  Hash,
  ExternalLink
} from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { results, loading, search } = useSearch();
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const contentTypeIcons = {
    blog_post: FileText,
    page: Globe,
    service: Hash,
    portfolio: Image
  };

  const contentTypeColors = {
    blog_post: 'bg-blue-500/20 text-blue-400',
    page: 'bg-green-500/20 text-green-400',
    service: 'bg-purple-500/20 text-purple-400',
    portfolio: 'bg-orange-500/20 text-orange-400'
  };

  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        search(query, {
          content_type: selectedFilters.length > 0 ? selectedFilters : undefined
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [query, selectedFilters]);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-gray-900/95 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Search Header */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search across the site..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-0 bg-transparent text-white placeholder-gray-400 focus:ring-0"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-sm text-gray-400">Filter:</span>
                  {Object.keys(contentTypeIcons).map((type) => (
                    <Button
                      key={type}
                      variant={selectedFilters.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterToggle(type)}
                      className={`text-xs ${
                        selectedFilters.includes(type) 
                          ? 'bg-purple-600 text-white' 
                          : 'border-gray-700 text-gray-300'
                      }`}
                    >
                      {type.replace('_', ' ').toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              <ScrollArea className="max-h-96">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="text-gray-400 mt-2">Searching...</p>
                  </div>
                ) : results.length === 0 && query.trim() ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No results found for "{query}"</p>
                    <p className="text-gray-500 text-sm mt-1">Try different keywords or filters</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">Start typing to search</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((result) => {
                      const IconComponent = contentTypeIcons[result.content_type];
                      const colorClass = contentTypeColors[result.content_type];
                      
                      return (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors mb-2"
                          onClick={() => {
                            window.open(result.url, '_blank');
                            onClose();
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${colorClass}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-white font-medium truncate">
                                  {result.title}
                                </h3>
                                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              </div>
                              <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                                {result.content.substring(0, 150)}...
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className={`text-xs ${colorClass} border-current`}>
                                  {result.content_type.replace('_', ' ')}
                                </Badge>
                                {result.tags && result.tags.length > 0 && (
                                  <div className="flex items-center space-x-1">
                                    {result.tags.slice(0, 2).map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>

              {/* Search Footer */}
              {results.length > 0 && (
                <div className="p-3 border-t border-gray-800 text-center">
                  <p className="text-xs text-gray-500">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
