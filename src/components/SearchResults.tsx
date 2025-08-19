import React from 'react';
import { ArrowLeft, Star, ExternalLink, Play, Calendar, TrendingUp, Users } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const { searchResults, backToHome } = useSearch();

  // Show error state if there's an error
  if (searchResults.error) {
    return (
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={backToHome}
              className="flex items-center text-teal-500 hover:text-teal-400 transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </button>
          </div>
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-8 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-red-400 mb-4">Search Error</h2>
              <p className="text-gray-300 mb-6">{searchResults.error}</p>
              <button
                onClick={backToHome}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={backToHome}
            className="flex items-center text-teal-500 hover:text-teal-400 transition-colors duration-200 mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              AI Tools & Roadmap for: "{query}"
            </h1>
            <p className="text-gray-400">
              Found {searchResults.recommendedTools.length} tools and {searchResults.youtubeVideos.length} learning resources
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Tools */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Star className="w-6 h-6 text-teal-500 mr-3" />
                Recommended AI Tools
              </h2>
              <div className="space-y-6">
                {searchResults.recommendedTools.map((tool, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="px-3 py-1 bg-teal-900/30 text-teal-400 rounded-full text-sm font-medium">
                            {tool.category}
                          </span>
                          <span className="text-yellow-400 flex items-center text-sm">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            {tool.rating}
                          </span>
                          <span className="text-gray-400 text-sm">{tool.pricing}</span>
                        </div>
                      </div>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                      >
                        Visit <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{tool.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-teal-500 mb-2">✓ Pros</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tool.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-400 mb-2">✗ Cons</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tool.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="font-semibold text-white mb-2">Best for:</h4>
                      <p className="text-sm text-gray-300">{tool.bestFor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* YouTube Videos */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Play className="w-6 h-6 text-red-400 mr-3" />
                Trending Learning Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {searchResults.youtubeVideos.map((video, index) => (
                  <a
                    key={index}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-red-500/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="aspect-video bg-gradient-to-br from-red-900/20 to-red-800/20 relative flex items-center justify-center border-b border-gray-700/50">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-red-400 mx-auto mb-2 opacity-80" />
                        <span className="text-xs text-gray-400">Click to watch</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {video.publishDate}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {video.views}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-2 line-clamp-2">{video.channel}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Roadmap */}
            <div className="bg-gray-800/30 border border-teal-700/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-teal-500 mr-2" />
                Recommended Roadmap
              </h3>
              <div className="space-y-4">
                {searchResults.roadmap.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                      <div className="text-xs text-teal-500 font-medium">
                        Tools: {step.tools.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Additional Resources</h3>
              <div className="space-y-3">
                {searchResults.additionalResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                  >
                    {resource.title}
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}