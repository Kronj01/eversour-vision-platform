
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, User, Building, Mail, Phone, MessageSquare, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface FormData {
  step1: {
    name: string;
    email: string;
    phone: string;
  };
  step2: {
    company: string;
    position: string;
    website: string;
  };
  step3: {
    services: string[];
    budget: string;
    timeline: string;
  };
  step4: {
    message: string;
    preferredContact: string;
  };
}

const MultiStepContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: { name: '', email: '', phone: '' },
    step2: { company: '', position: '', website: '' },
    step3: { services: [], budget: '', timeline: '' },
    step4: { message: '', preferredContact: 'email' }
  });

  const services = [
    'Web Development',
    'Software Development',
    'Branding & Design',
    'SEO Optimization',
    'Digital Marketing',
    'Consultation'
  ];

  const budgetRanges = [
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const timelines = [
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months'
  ];

  const updateFormData = (step: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const handleServiceToggle = (service: string) => {
    const currentServices = formData.step3.services;
    const updatedServices = currentServices.includes(service)
      ? currentServices.filter(s => s !== service)
      : [...currentServices, service];
    
    updateFormData('step3', 'services', updatedServices);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitForm = () => {
    console.log('Form submitted:', formData);
    // Here you would integrate with your backend
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Company Details', icon: Building },
    { number: 3, title: 'Project Scope', icon: Zap },
    { number: 4, title: 'Final Details', icon: MessageSquare }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-3xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive 
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'border-gray-400 text-gray-400'
                }`}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <div className="ml-3">
                  <p className={`font-semibold ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                    Step {step.number}
                  </p>
                  <p className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
                {step.number < 4 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Let's start with your details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <Input
                    value={formData.step1.name}
                    onChange={(e) => updateFormData('step1', 'name', e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-purple-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.step1.email}
                    onChange={(e) => updateFormData('step1', 'email', e.target.value)}
                    placeholder="Enter your email"
                    className="bg-white/10 border-purple-400/30 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.step1.phone}
                  onChange={(e) => updateFormData('step1', 'phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="bg-white/10 border-purple-400/30 text-white"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Tell us about your company</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Company Name *</label>
                  <Input
                    value={formData.step2.company}
                    onChange={(e) => updateFormData('step2', 'company', e.target.value)}
                    placeholder="Enter company name"
                    className="bg-white/10 border-purple-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Your Position</label>
                  <Input
                    value={formData.step2.position}
                    onChange={(e) => updateFormData('step2', 'position', e.target.value)}
                    placeholder="e.g., CEO, Marketing Manager"
                    className="bg-white/10 border-purple-400/30 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Company Website</label>
                <Input
                  value={formData.step2.website}
                  onChange={(e) => updateFormData('step2', 'website', e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="bg-white/10 border-purple-400/30 text-white"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">What services do you need?</h3>
              
              <div>
                <label className="block text-white font-medium mb-4">Services Required *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.step3.services.includes(service)
                          ? 'border-purple-400 bg-purple-500/20 text-purple-400'
                          : 'border-gray-600 bg-white/5 text-gray-300 hover:border-purple-400/50'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Budget Range</label>
                  <select
                    value={formData.step3.budget}
                    onChange={(e) => updateFormData('step3', 'budget', e.target.value)}
                    className="w-full p-3 bg-white/10 border border-purple-400/30 rounded-xl text-white"
                  >
                    <option value="" className="bg-black">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range} className="bg-black">{range}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Timeline</label>
                  <select
                    value={formData.step3.timeline}
                    onChange={(e) => updateFormData('step3', 'timeline', e.target.value)}
                    className="w-full p-3 bg-white/10 border border-purple-400/30 rounded-xl text-white"
                  >
                    <option value="" className="bg-black">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline} className="bg-black">{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Final details</h3>
              
              <div>
                <label className="block text-white font-medium mb-2">Project Description *</label>
                <textarea
                  value={formData.step4.message}
                  onChange={(e) => updateFormData('step4', 'message', e.target.value)}
                  rows={6}
                  placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                  className="w-full p-4 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Preferred Contact Method</label>
                <div className="flex gap-4">
                  {['email', 'phone', 'both'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateFormData('step4', 'preferredContact', method)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 capitalize ${
                        formData.step4.preferredContact === method
                          ? 'border-purple-400 bg-purple-500/20 text-purple-400'
                          : 'border-gray-600 bg-white/5 text-gray-300 hover:border-purple-400/50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white/5 rounded-xl p-6 border border-purple-400/20">
                <h4 className="text-lg font-semibold text-white mb-4">Project Summary</h4>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-purple-400">Client:</span> {formData.step1.name} from {formData.step2.company}</p>
                  <p><span className="text-purple-400">Services:</span> {formData.step3.services.join(', ')}</p>
                  <p><span className="text-purple-400">Budget:</span> {formData.step3.budget}</p>
                  <p><span className="text-purple-400">Timeline:</span> {formData.step3.timeline}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={prevStep}
          disabled={currentStep === 1}
          variant="outline"
          className="border-purple-400/50 text-purple-400 hover:bg-purple-500/20 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={submitForm}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-xl hover:shadow-green-500/25"
          >
            Submit Project
            <Check className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepContactForm;
