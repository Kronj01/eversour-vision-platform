
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Layout, 
  Palette, 
  Type, 
  Settings, 
  Eye, 
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const ThemeCustomizer = () => {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#ffffff',
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 1.6,
      headingWeight: 700,
      bodyWeight: 400,
    },
    layout: {
      borderRadius: 8,
      spacing: 16,
      maxWidth: 1200,
      headerHeight: 80,
    },
    effects: {
      shadows: true,
      animations: true,
      glassmorphism: true,
      gradients: true,
    },
  });

  const [previewMode, setPreviewMode] = useState(false);

  const colorPresets = [
    { name: 'Purple (Default)', primary: '#8b5cf6', secondary: '#06b6d4', accent: '#f59e0b' },
    { name: 'Blue Ocean', primary: '#3b82f6', secondary: '#10b981', accent: '#f59e0b' },
    { name: 'Dark Green', primary: '#059669', secondary: '#8b5cf6', accent: '#f97316' },
    { name: 'Red Fire', primary: '#dc2626', secondary: '#7c3aed', accent: '#fbbf24' },
    { name: 'Pink Sunset', primary: '#ec4899', secondary: '#06b6d4', accent: '#84cc16' },
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Poppins',
    'Montserrat',
    'Open Sans',
    'Lato',
    'Source Sans Pro',
    'Nunito',
  ];

  const updateColor = (colorKey: string, value: string) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
  };

  const updateTypography = (key: string, value: any) => {
    setTheme(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  };

  const updateLayout = (key: string, value: any) => {
    setTheme(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        [key]: value,
      },
    }));
  };

  const updateEffects = (key: string, value: boolean) => {
    setTheme(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [key]: value,
      },
    }));
  };

  const applyColorPreset = (preset: any) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent,
      },
    }));
  };

  const resetTheme = () => {
    setTheme({
      colors: {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        accent: '#f59e0b',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#ffffff',
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 1.6,
        headingWeight: 700,
        bodyWeight: 400,
      },
      layout: {
        borderRadius: 8,
        spacing: 16,
        maxWidth: 1200,
        headerHeight: 80,
      },
      effects: {
        shadows: true,
        animations: true,
        glassmorphism: true,
        gradients: true,
      },
    });
  };

  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'theme-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Layout className="w-5 h-5 mr-2" />
                Theme Customizer
              </CardTitle>
              <CardDescription className="text-gray-400">
                Customize your website's appearance, colors, typography, and layout
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Exit Preview' : 'Preview'}
              </Button>
              <Button onClick={exportTheme} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={resetTheme} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Theme
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Theme Controls */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="colors" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
                  <TabsTrigger value="colors" className="text-white data-[state=active]:bg-purple-600">
                    <Palette className="w-4 h-4 mr-2" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="text-white data-[state=active]:bg-purple-600">
                    <Type className="w-4 h-4 mr-2" />
                    Typography
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="text-white data-[state=active]:bg-purple-600">
                    <Layout className="w-4 h-4 mr-2" />
                    Layout
                  </TabsTrigger>
                  <TabsTrigger value="effects" className="text-white data-[state=active]:bg-purple-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Effects
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-6">
                  {/* Color Presets */}
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Color Presets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {colorPresets.map((preset) => (
                        <Button
                          key={preset.name}
                          onClick={() => applyColorPreset(preset)}
                          variant="outline"
                          className="justify-start h-auto p-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-1">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: preset.primary }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: preset.secondary }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: preset.accent }}
                              />
                            </div>
                            <span className="text-white">{preset.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="glass-card">
                    <h3 className="text-lg font-semibold text-white mb-4">Custom Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(theme.colors).map(([key, value]) => (
                        <div key={key}>
                          <Label className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              type="color"
                              value={value}
                              onChange={(e) => updateColor(key, e.target.value)}
                              className="w-12 h-10 p-1 bg-gray-800 border-gray-700"
                            />
                            <Input
                              type="text"
                              value={value}
                              onChange={(e) => updateColor(key, e.target.value)}
                              className="flex-1 bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="space-y-6">
                  <div className="glass-card space-y-4">
                    <h3 className="text-lg font-semibold text-white">Typography Settings</h3>
                    
                    <div>
                      <Label className="text-white">Font Family</Label>
                      <Select 
                        value={theme.typography.fontFamily} 
                        onValueChange={(value) => updateTypography('fontFamily', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {fontOptions.map((font) => (
                            <SelectItem key={font} value={font}>{font}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white">Base Font Size: {theme.typography.fontSize}px</Label>
                      <Slider
                        value={[theme.typography.fontSize]}
                        onValueChange={([value]) => updateTypography('fontSize', value)}
                        min={12}
                        max={24}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Line Height: {theme.typography.lineHeight}</Label>
                      <Slider
                        value={[theme.typography.lineHeight]}
                        onValueChange={([value]) => updateTypography('lineHeight', value)}
                        min={1.2}
                        max={2.0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Heading Weight: {theme.typography.headingWeight}</Label>
                        <Slider
                          value={[theme.typography.headingWeight]}
                          onValueChange={([value]) => updateTypography('headingWeight', value)}
                          min={400}
                          max={900}
                          step={100}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Body Weight: {theme.typography.bodyWeight}</Label>
                        <Slider
                          value={[theme.typography.bodyWeight]}
                          onValueChange={([value]) => updateTypography('bodyWeight', value)}
                          min={300}
                          max={700}
                          step={100}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <div className="glass-card space-y-4">
                    <h3 className="text-lg font-semibold text-white">Layout Settings</h3>
                    
                    <div>
                      <Label className="text-white">Border Radius: {theme.layout.borderRadius}px</Label>
                      <Slider
                        value={[theme.layout.borderRadius]}
                        onValueChange={([value]) => updateLayout('borderRadius', value)}
                        min={0}
                        max={24}
                        step={2}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Spacing: {theme.layout.spacing}px</Label>
                      <Slider
                        value={[theme.layout.spacing]}
                        onValueChange={([value]) => updateLayout('spacing', value)}
                        min={8}
                        max={32}
                        step={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Max Width: {theme.layout.maxWidth}px</Label>
                      <Slider
                        value={[theme.layout.maxWidth]}
                        onValueChange={([value]) => updateLayout('maxWidth', value)}
                        min={800}
                        max={1600}
                        step={100}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Header Height: {theme.layout.headerHeight}px</Label>
                      <Slider
                        value={[theme.layout.headerHeight]}
                        onValueChange={([value]) => updateLayout('headerHeight', value)}
                        min={60}
                        max={120}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-6">
                  <div className="glass-card space-y-4">
                    <h3 className="text-lg font-semibold text-white">Visual Effects</h3>
                    
                    {Object.entries(theme.effects).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label className="text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </Label>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => updateEffects(key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Live Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <div 
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.primary,
                  borderRadius: `${theme.layout.borderRadius}px`,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: `${theme.typography.fontSize}px`,
                  lineHeight: theme.typography.lineHeight,
                }}
              >
                <h4 
                  className="mb-4"
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.headingWeight,
                  }}
                >
                  Preview Heading
                </h4>
                <p 
                  className="mb-4"
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.bodyWeight,
                  }}
                >
                  This is a preview of your theme. You can see how the colors, typography, and spacing work together.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 rounded"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: 'white',
                      borderRadius: `${theme.layout.borderRadius}px`,
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded"
                    style={{
                      backgroundColor: theme.colors.secondary,
                      color: 'white',
                      borderRadius: `${theme.layout.borderRadius}px`,
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>

              {/* Theme Code */}
              <div className="glass-card">
                <h4 className="text-white font-semibold mb-2">CSS Variables</h4>
                <pre className="text-xs text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto">
{`:root {
  --primary: ${theme.colors.primary};
  --secondary: ${theme.colors.secondary};
  --accent: ${theme.colors.accent};
  --background: ${theme.colors.background};
  --surface: ${theme.colors.surface};
  --text: ${theme.colors.text};
  --font-family: ${theme.typography.fontFamily};
  --font-size: ${theme.typography.fontSize}px;
  --line-height: ${theme.typography.lineHeight};
  --border-radius: ${theme.layout.borderRadius}px;
  --spacing: ${theme.layout.spacing}px;
}`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeCustomizer;
