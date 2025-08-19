import React from 'react';
import { Bot, Map, Youtube, Search, TrendingUp, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-teal-500" />,
      title: "Smart AI Tool Discovery",
      description: "Advanced algorithms analyze your needs and recommend the perfect AI tools from our database of 500+ platforms."
    },
    {
      icon: <Map className="w-8 h-8 text-teal-500" />,
      title: "Custom Roadmaps",
      description: "Get step-by-step guidance tailored to your specific goals, complete with tool recommendations and best practices."
    },
    {
      icon: <Youtube className="w-8 h-8 text-emerald-400" />,
      title: "Curated Learning Content",
      description: "Access trending YouTube videos, tutorials, and resources - all filtered for recency and relevance."
    },
    {
      icon: <Search className="w-8 h-8 text-teal-500" />,
      title: "Deep Research Integration",
      description: "We scour Reddit, forums, and expert reviews to give you unbiased, comprehensive tool analysis."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      title: "Real-time Updates",
      description: "Our database is constantly updated with new tools, pricing changes, and feature updates."
    },
    {
      icon: <Users className="w-8 h-8 text-teal-500" />,
      title: "Community Insights",
      description: "Benefit from real user experiences, ratings, and reviews from our growing community."
    }
  ];

  return (
    <section id="features" className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent via-black/50 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Everything You Need to Navigate AI
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
            Our platform combines intelligent recommendations with comprehensive research to help you make informed decisions about AI tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-teal-500/30 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}