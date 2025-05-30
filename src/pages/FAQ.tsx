
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      title: 'General Questions about Eversour',
      questions: [
        {
          question: 'What is Eversour?',
          answer: 'Eversour is a leading digital development company based in Muzaffarnagar, India, specializing in providing innovative and affordable digital solutions to businesses of all sizes. We offer a comprehensive range of services, including web development, software development, branding, SEO, and online advertising.'
        },
        {
          question: 'What makes Eversour different from other digital agencies?',
          answer: 'We are more than just a service provider; we are a strategic partner dedicated to your success. We offer a holistic approach, customized solutions, transparent communication, and a proven track record of delivering measurable results.'
        },
        {
          question: 'What industries do you serve?',
          answer: 'We work with businesses across a wide range of industries, including real estate, fashion, e-commerce, healthcare, technology, and more. Our expertise is adaptable to any industry that requires a strong online presence.'
        },
        {
          question: 'Where are you located?',
          answer: 'We are based in Muzaffarnagar, India. However, we serve clients worldwide through our remote collaboration tools and communication channels.'
        }
      ]
    },
    {
      title: 'Questions about Services',
      questions: [
        {
          question: 'What types of web development services do you offer?',
          answer: 'We offer a full range of web development services, including custom website design, e-commerce development, responsive web design, website maintenance, and more.'
        },
        {
          question: 'What types of software development services do you offer?',
          answer: 'We offer custom software development, web application development, mobile application development (iOS and Android), enterprise solutions, and integration services.'
        },
        {
          question: 'What does your branding service include?',
          answer: 'Our branding services include brand identity design (logo, color palette, typography), brand messaging, brand style guides, and marketing materials design.'
        },
        {
          question: 'What does your SEO service include?',
          answer: 'Our SEO services include website audit, keyword research, on-page optimization, off-page optimization, link building, content creation, and performance tracking.'
        },
        {
          question: 'What types of online advertising services do you offer?',
          answer: 'We offer search engine marketing (SEM), social media advertising, display advertising, retargeting, and conversion optimization.'
        }
      ]
    },
    {
      title: 'Questions about Process',
      questions: [
        {
          question: 'What is your process for starting a project?',
          answer: 'Our process typically starts with a free consultation to discuss your needs and goals. We then conduct a thorough analysis of your business, target audience, and competitive landscape. Based on our analysis, we develop a customized strategy and provide you with a detailed proposal.'
        },
        {
          question: 'How involved will I be in the project?',
          answer: 'We believe in collaboration and transparency. We\'ll keep you informed every step of the way and actively seek your feedback and input.'
        },
        {
          question: 'How long will it take to see results?',
          answer: 'The timeline for seeing results varies depending on the specific services and the complexity of the project. However, we are committed to delivering measurable results as quickly as possible.'
        },
        {
          question: 'What kind of reporting do you provide?',
          answer: 'We provide regular reports that track the performance of our services and demonstrate the ROI you\'re achieving.'
        }
      ]
    },
    {
      title: 'Questions about Pricing and Payment',
      questions: [
        {
          question: 'How much do your services cost?',
          answer: 'Our pricing varies depending on the specific services and the complexity of the project. We offer customized pricing plans to meet the unique needs of each client.'
        },
        {
          question: 'Do you offer any discounts?',
          answer: 'We occasionally offer discounts and promotions. Please contact us to learn more about current offers.'
        },
        {
          question: 'What are your payment terms?',
          answer: 'Our payment terms vary depending on the project. We typically require an initial deposit and then bill on a milestone basis or on a monthly retainer.'
        }
      ]
    },
    {
      title: 'Questions about Support',
      questions: [
        {
          question: 'What kind of support do you offer?',
          answer: 'We offer ongoing support and maintenance to ensure your website, software, and marketing campaigns are always up-to-date and performing at their best.'
        },
        {
          question: 'How can I contact you if I have a question or problem?',
          answer: 'You can contact us by various methods like phone, email, social media or through our website contact form. We\'re always happy to assist you!'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 1000 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

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
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Frequently Asked Questions</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Have Questions? <span className="gradient-text">Find the Answers</span> You Need Here
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We understand that you may have questions about our services, our process, and how we can help your business grow. Here, we've compiled a list of frequently asked questions to provide you with the information you need to make an informed decision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const index = categoryIndex * 1000 + questionIndex;
                    const isOpen = openIndex === index;
                    
                    return (
                      <div
                        key={questionIndex}
                        className="glass-card border border-white/10 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-white pr-4">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600/20 to-purple-800/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Still Have <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Don't hesitate to reach out! Our team is here to help you find the perfect solution for your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary px-8 py-4 text-lg group">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us Today for a Free Consultation!
              </Button>
              <Button className="btn-secondary px-8 py-4 text-lg group">
                <Mail className="w-5 h-5 mr-2" />
                Send Us an Email
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
