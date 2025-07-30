import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Copy,
  Move,
  Settings,
  Type,
  Mail,
  Phone,
  Calendar,
  CheckSquare,
  Radio,
  List,
  FileText,
  Upload,
  Star
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'rating';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  conditional?: {
    dependsOn: string;
    value: string;
  };
}

interface Form {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  settings: {
    submitButtonText: string;
    successMessage: string;
    redirectUrl?: string;
    emailNotifications: boolean;
    autoResponder: boolean;
  };
  analytics: {
    views: number;
    submissions: number;
    conversionRate: number;
  };
  status: 'draft' | 'published' | 'archived';
}

const AdvancedFormBuilder = () => {
  const [forms, setForms] = useState<Form[]>([
    {
      id: '1',
      name: 'Contact Form',
      description: 'General contact form for inquiries',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true },
        { id: '2', type: 'email', label: 'Email Address', required: true },
        { id: '3', type: 'textarea', label: 'Message', required: true }
      ],
      settings: {
        submitButtonText: 'Send Message',
        successMessage: 'Thank you for your message!',
        emailNotifications: true,
        autoResponder: false
      },
      analytics: {
        views: 1234,
        submissions: 89,
        conversionRate: 7.2
      },
      status: 'published'
    }
  ]);

  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: <Type className="h-4 w-4" /> },
    { type: 'email', label: 'Email', icon: <Mail className="h-4 w-4" /> },
    { type: 'phone', label: 'Phone', icon: <Phone className="h-4 w-4" /> },
    { type: 'textarea', label: 'Textarea', icon: <FileText className="h-4 w-4" /> },
    { type: 'select', label: 'Dropdown', icon: <List className="h-4 w-4" /> },
    { type: 'radio', label: 'Radio Buttons', icon: <Radio className="h-4 w-4" /> },
    { type: 'checkbox', label: 'Checkboxes', icon: <CheckSquare className="h-4 w-4" /> },
    { type: 'date', label: 'Date Picker', icon: <Calendar className="h-4 w-4" /> },
    { type: 'file', label: 'File Upload', icon: <Upload className="h-4 w-4" /> },
    { type: 'rating', label: 'Rating', icon: <Star className="h-4 w-4" /> }
  ];

  const handleCreateForm = () => {
    setIsCreating(true);
    setSelectedForm({
      id: Date.now().toString(),
      name: '',
      description: '',
      fields: [],
      settings: {
        submitButtonText: 'Submit',
        successMessage: 'Thank you for your submission!',
        emailNotifications: false,
        autoResponder: false
      },
      analytics: {
        views: 0,
        submissions: 0,
        conversionRate: 0
      },
      status: 'draft'
    });
  };

  const handleSaveForm = () => {
    if (selectedForm) {
      if (isCreating) {
        setForms([...forms, selectedForm]);
      } else {
        setForms(forms.map(f => 
          f.id === selectedForm.id ? selectedForm : f
        ));
      }
      setSelectedForm(null);
      setIsCreating(false);
    }
  };

  const addField = (type: FormField['type']) => {
    if (selectedForm) {
      const newField: FormField = {
        id: Date.now().toString(),
        type,
        label: `New ${type} field`,
        required: false
      };
      
      if (type === 'select' || type === 'radio' || type === 'checkbox') {
        newField.options = ['Option 1', 'Option 2'];
      }

      setSelectedForm({
        ...selectedForm,
        fields: [...selectedForm.fields, newField]
      });
    }
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (selectedForm) {
      setSelectedForm({
        ...selectedForm,
        fields: selectedForm.fields.map(field =>
          field.id === fieldId ? { ...field, ...updates } : field
        )
      });
    }
  };

  const removeField = (fieldId: string) => {
    if (selectedForm) {
      setSelectedForm({
        ...selectedForm,
        fields: selectedForm.fields.filter(field => field.id !== fieldId)
      });
    }
  };

  const renderFieldPreview = (field: FormField) => {
    const commonProps = {
      placeholder: field.placeholder,
      required: field.required
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return <Input {...commonProps} type={field.type} />;
      case 'textarea':
        return <Textarea {...commonProps} />;
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'date':
        return <Input type="date" {...commonProps} />;
      case 'file':
        return <Input type="file" {...commonProps} />;
      default:
        return <Input {...commonProps} />;
    }
  };

  if (selectedForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {isCreating ? 'Create Form' : 'Edit Form'}
          </h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" onClick={() => {
              setSelectedForm(null);
              setIsCreating(false);
              setPreviewMode(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveForm}>
              Save Form
            </Button>
          </div>
        </div>

        {previewMode ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedForm.name || 'Untitled Form'}</CardTitle>
              <CardDescription>{selectedForm.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {selectedForm.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {renderFieldPreview(field)}
                  </div>
                ))}
                <Button type="submit" className="w-full">
                  {selectedForm.settings.submitButtonText}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="builder" className="space-y-4">
            <TabsList>
              <TabsTrigger value="builder">Form Builder</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Details */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="form-name">Form Name</Label>
                        <Input
                          id="form-name"
                          value={selectedForm.name}
                          onChange={(e) => setSelectedForm({
                            ...selectedForm,
                            name: e.target.value
                          })}
                          placeholder="Enter form name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="form-description">Description</Label>
                        <Textarea
                          id="form-description"
                          value={selectedForm.description}
                          onChange={(e) => setSelectedForm({
                            ...selectedForm,
                            description: e.target.value
                          })}
                          placeholder="Form description"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Add Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {fieldTypes.map((fieldType) => (
                          <Button
                            key={fieldType.type}
                            variant="outline"
                            size="sm"
                            onClick={() => addField(fieldType.type as FormField['type'])}
                            className="flex items-center space-x-2"
                          >
                            {fieldType.icon}
                            <span className="text-xs">{fieldType.label}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Form Builder */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Fields</CardTitle>
                      <CardDescription>Drag and drop to reorder fields</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedForm.fields.map((field, index) => (
                          <div key={field.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{field.type}</Badge>
                                <span className="font-medium">{field.label}</span>
                                {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <Move className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeField(field.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Field Label</Label>
                                <Input
                                  value={field.label}
                                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Placeholder</Label>
                                <Input
                                  value={field.placeholder || ''}
                                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 mt-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={field.required}
                                  onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                                />
                                <Label>Required</Label>
                              </div>
                            </div>

                            {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                              <div className="mt-4">
                                <Label>Options</Label>
                                <div className="space-y-2">
                                  {field.options?.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center space-x-2">
                                      <Input
                                        value={option}
                                        onChange={(e) => {
                                          const newOptions = [...(field.options || [])];
                                          newOptions[optionIndex] = e.target.value;
                                          updateField(field.id, { options: newOptions });
                                        }}
                                      />
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newOptions = field.options?.filter((_, i) => i !== optionIndex);
                                          updateField(field.id, { options: newOptions });
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
                                      updateField(field.id, { options: newOptions });
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Option
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {selectedForm.fields.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            No fields added yet. Use the field types on the left to add fields.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Form Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="submit-button">Submit Button Text</Label>
                    <Input
                      id="submit-button"
                      value={selectedForm.settings.submitButtonText}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: {
                          ...selectedForm.settings,
                          submitButtonText: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="success-message">Success Message</Label>
                    <Textarea
                      id="success-message"
                      value={selectedForm.settings.successMessage}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: {
                          ...selectedForm.settings,
                          successMessage: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="redirect-url">Redirect URL (optional)</Label>
                    <Input
                      id="redirect-url"
                      value={selectedForm.settings.redirectUrl || ''}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: {
                          ...selectedForm.settings,
                          redirectUrl: e.target.value
                        }
                      })}
                      placeholder="https://example.com/thank-you"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={selectedForm.settings.emailNotifications}
                      onCheckedChange={(checked) => setSelectedForm({
                        ...selectedForm,
                        settings: {
                          ...selectedForm.settings,
                          emailNotifications: checked
                        }
                      })}
                    />
                    <Label>Send email notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={selectedForm.settings.autoResponder}
                      onCheckedChange={(checked) => setSelectedForm({
                        ...selectedForm,
                        settings: {
                          ...selectedForm.settings,
                          autoResponder: checked
                        }
                      })}
                    />
                    <Label>Enable auto-responder</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{selectedForm.analytics.views}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{selectedForm.analytics.submissions}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{selectedForm.analytics.conversionRate}%</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Advanced Form Builder</h2>
        <Button onClick={handleCreateForm}>
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{form.name}</CardTitle>
                  <CardDescription>{form.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={form.status === 'published' ? 'default' : 'secondary'}>
                    {form.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedForm(form)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {form.fields.length} fields • {form.analytics.views} views • {form.analytics.submissions} submissions
                </div>
                <div className="text-sm font-medium">
                  {form.analytics.conversionRate}% conversion rate
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancedFormBuilder;