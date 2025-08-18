import React from 'react';
import { Bot, Map, Youtube, Search, TrendingUp, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-green-400" />,
      title: "Smart AI Tool Discovery",
      description: "Advanced algorithms analyze your needs and recommend the perfect AI tools from our database of 500+ platforms."
    },
    {
      icon: <Map className="w-8 h-8 text-blue-400" />,
      title: "Custom Roadmaps",
      description: "Get step-by-step guidance tailored to your specific goals, complete with tool recommendations and best practices."
    },
    {
      icon: <Youtube className="w-8 h-8 text-red-400" />,
      title: "Curated Learning Content",
      description: "Access trending YouTube videos, tutorials, and resources - all filtered for recency and relevance."
    },
    {
      icon: <Search className="w-8 h-8 text-purple-400" />,
      title: "Deep Research Integration",
      description: "We scour Reddit, forums, and expert reviews to give you unbiased, comprehensive tool analysis."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
      title: "Real-time Updates",
      description: "Our database is constantly updated with new tools, pricing changes, and feature updates."
    },
    {
      icon: <Users className="w-8 h-8 text-pink-400" />,
      title: "Community Insights",
      description: "Benefit from real user experiences, ratings, and reviews from our growing community."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Navigate AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform combines intelligent recommendations with comprehensive research to help you make informed decisions about AI tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 hover:border-green-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}