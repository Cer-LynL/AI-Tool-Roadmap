import React from 'react';
import { MessageSquare, Search, Route, Rocket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="w-12 h-12 text-green-400" />,
      title: "Describe Your Goal",
      description: "Tell us what you want to accomplish in natural language. Whether it's building an MVP, creating content, or solving a specific problem."
    },
    {
      icon: <Search className="w-12 h-12 text-blue-400" />,
      title: "Get Smart Recommendations",
      description: "Our AI analyzes your needs and searches through hundreds of tools to find the perfect matches with detailed pros and cons."
    },
    {
      icon: <Route className="w-12 h-12 text-purple-400" />,
      title: "Follow Your Roadmap",
      description: "Receive a step-by-step roadmap with tool sequences, tips, and resources to guide you from start to finish."
    },
    {
      icon: <Rocket className="w-12 h-12 text-yellow-400" />,
      title: "Execute & Succeed",
      description: "Implement your plan with confidence, knowing you have the right tools and knowledge to achieve your goals."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From confusion to clarity in four simple steps. Let us guide you through the AI tool landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-green-600/50 to-transparent -translate-x-1/2 z-0"></div>
              )}
              <div className="relative z-10 bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 hover:border-green-500/30 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="absolute -top-4 left-8 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}