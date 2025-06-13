
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Image, 
  Zap, 
  TrendingDown, 
  Settings, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageOptimizationData {
  totalImages: number;
  optimizedImages: number;
  totalSizeReduction: number;
  bandwidthSaved: number;
  loadTimeImprovement: number;
  compressionRatio: number;
}

const ImageOptimizationManager = () => {
  const [optimizationData, setOptimizationData] = useState<ImageOptimizationData>({
    totalImages: 145,
    optimizedImages: 132,
    totalSizeReduction: 67.3,
    bandwidthSaved: 2.4,
    loadTimeImprovement: 1.8,
    compressionRatio: 78
  });

  const [autoOptimization, setAutoOptimization] = useState(true);
  const [webpConversion, setWebpConversion] = useState(true);
  const [lazyLoading, setLazyLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const optimizationSettings = [
    {
      name: 'Auto-optimization',
      description: 'Automatically optimize new images on upload',
      enabled: autoOptimization,
      onChange: setAutoOptimization
    },
    {
      name: 'WebP Conversion',
      description: 'Convert images to WebP format for better compression',
      enabled: webpConversion,
      onChange: setWebpConversion
    },
    {
      name: 'Lazy Loading',
      description: 'Enable lazy loading for images',
      enabled: lazyLoading,
      onChange: setLazyLoading
    }
  ];

  const handleBulkOptimization = async () => {
    setProcessing(true);
    // Simulate bulk optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setOptimizationData(prev => ({
      ...prev,
      optimizedImages: prev.totalImages,
      totalSizeReduction: prev.totalSizeReduction + 5.2,
      bandwidthSaved: prev.bandwidthSaved + 0.3
    }));
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Image className="w-5 h-5 mr-2" />
                  Image Optimization Manager
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Automated image optimization and performance enhancement
                </CardDescription>
              </div>
              <Button 
                onClick={handleBulkOptimization}
                disabled={processing}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {processing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                Optimize All
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Optimization Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                  <Image className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{optimizationData.totalImages}</h3>
                <p className="text-sm text-gray-400">Total Images</p>
                <div className="mt-2">
                  <Progress 
                    value={(optimizationData.optimizedImages / optimizationData.totalImages) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {optimizationData.optimizedImages} optimized
                  </p>
                </div>
              </div>

              <div className="glass-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                  <TrendingDown className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-1">
                  {optimizationData.totalSizeReduction}%
                </h3>
                <p className="text-sm text-gray-400">Size Reduction</p>
                <Badge className="bg-green-500/20 text-green-400 mt-2">Excellent</Badge>
              </div>

              <div className="glass-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                  <Download className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-purple-400 mb-1">
                  {optimizationData.bandwidthSaved}GB
                </h3>
                <p className="text-sm text-gray-400">Bandwidth Saved</p>
                <p className="text-xs text-gray-400 mt-1">This month</p>
              </div>

              <div className="glass-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-orange-400 mb-1">
                  {optimizationData.loadTimeImprovement}s
                </h3>
                <p className="text-sm text-gray-400">Load Time Saved</p>
                <p className="text-xs text-gray-400 mt-1">Average per page</p>
              </div>
            </div>

            {/* Optimization Settings */}
            <div className="glass-card">
              <h3 className="text-lg font-semibold text-white mb-4">Optimization Settings</h3>
              <div className="space-y-4">
                {optimizationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <Label className="text-white font-medium">{setting.name}</Label>
                      <p className="text-sm text-gray-400">{setting.description}</p>
                    </div>
                    <Switch 
                      checked={setting.enabled}
                      onCheckedChange={setting.onChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Optimizations */}
            <div className="glass-card">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Optimizations</h3>
              <div className="space-y-3">
                {[
                  { file: 'hero-banner.jpg', reduction: '72%', size: '1.2MB → 340KB', status: 'optimized' },
                  { file: 'portfolio-image-1.png', reduction: '65%', size: '850KB → 298KB', status: 'optimized' },
                  { file: 'team-photo.jpg', reduction: '58%', size: '2.1MB → 882KB', status: 'optimized' },
                  { file: 'service-bg.webp', reduction: '45%', size: '450KB → 248KB', status: 'optimized' },
                  { file: 'testimonial-bg.jpg', reduction: '0%', size: '1.8MB', status: 'pending' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.file}</p>
                        <p className="text-sm text-gray-400">{item.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {item.status === 'optimized' ? (
                        <>
                          <Badge className="bg-green-500/20 text-green-400">
                            -{item.reduction}
                          </Badge>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </>
                      ) : (
                        <>
                          <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Impact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Page Load Speed</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">+32%</span>
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Core Web Vitals</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Improved</span>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Mobile Performance</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">+28%</span>
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">SEO Score</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">+15 points</span>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Optimization Techniques</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                    <span className="text-white">Lossless Compression</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                    <span className="text-white">Format Conversion</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                    <span className="text-white">Responsive Images</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                    <span className="text-white">Progressive Loading</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">Configuring</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ImageOptimizationManager;
