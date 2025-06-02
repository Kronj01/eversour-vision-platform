
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, Share2, Bookmark, BookmarkCheck } from 'lucide-react';

interface ReadingProgressProps {
  contentRef: React.RefObject<HTMLElement>;
  title: string;
  readTime: number;
  views?: number;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ 
  contentRef, 
  title, 
  readTime, 
  views = 0 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timeRead, setTimeRead] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the article has been scrolled past
      const scrolled = Math.max(0, -rect.top);
      const totalScrollable = elementHeight - windowHeight;
      
      if (totalScrollable > 0) {
        const progressPercentage = Math.min(100, (scrolled / totalScrollable) * 100);
        setProgress(progressPercentage);
        setIsVisible(progressPercentage > 5); // Show when 5% scrolled
      }
    };

    const handleScroll = () => {
      updateProgress();
    };

    window.addEventListener('scroll', handleScroll);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentRef]);

  // Track reading time
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hasFocus() && progress > 0 && progress < 95) {
        setTimeRead(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100 
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-purple-400/20"
      >
        <div className="h-1 bg-gray-800 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h4 className="text-white font-medium text-sm truncate max-w-md">
                {title}
              </h4>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min read</span>
                </div>
                {views > 0 && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{views.toLocaleString()} views</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span>Reading: {formatTime(timeRead)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-purple-400 text-sm font-medium">
                {Math.round(progress)}%
              </span>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={shareArticle}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Reading Stats */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 100 
        }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-4 space-y-4">
          {/* Circular Progress */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-700"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                className="text-purple-500 transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 text-center">
            <div className="text-gray-400 text-xs">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-3 h-3" />
                <span>{readTime}m</span>
              </div>
              <div className="text-purple-400">
                {formatTime(timeRead)} read
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-400 hover:text-purple-400'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            
            <button
              onClick={shareArticle}
              className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Reading Achievement */}
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-2xl shadow-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Article Complete!</p>
              <p className="text-sm opacity-90">Reading time: {formatTime(timeRead)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ReadingProgress;
