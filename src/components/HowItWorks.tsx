import React from 'react';
import { MessageSquare, Search, Route, Rocket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="w-12 h-12 text-teal-500" />,
      title: "Describe Your Goal",
      description: "Tell us what you want to accomplish in natural language. Whether it's building an MVP, creating content, or solving a specific problem."
    },
    {
      icon: <Search className="w-12 h-12 text-teal-500" />,
      title: "Get Smart Recommendations",
      description: "Our AI analyzes your needs and searches through hundreds of tools to find the perfect matches with detailed pros and cons."
    },
    {
      icon: <Route className="w-12 h-12 text-emerald-400" />,
      title: "Follow Your Roadmap",
      description: "Receive a step-by-step roadmap with tool sequences, tips, and resources to guide you from start to finish."
    },
    {
      icon: <Rocket className="w-12 h-12 text-emerald-400" />,
      title: "Execute & Succeed",
      description: "Implement your plan with confidence, knowing you have the right tools and knowledge to achieve your goals."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 sm:px-8 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
            From confusion to clarity in four simple steps. Let us guide you through the AI tool landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent -translate-x-1/2 z-0"></div>
              )}
              <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-teal-500/30 hover:bg-white/10 transition-all duration-300 h-80 flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="absolute -top-4 left-10 bg-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-white/70 leading-relaxed font-light">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}