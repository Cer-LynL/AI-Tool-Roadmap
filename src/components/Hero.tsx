import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { SearchResults } from './SearchResults';

export function Hero() {
  const [query, setQuery] = useState('');
  const { searchResults, isSearching, performSearch } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
      await performSearch(query);
    }
  };

  const popularSearches = [
    "Build an MVP for my startup",
    "Create a landing page",
    "Generate content for social media",
    "Build a mobile app without coding",
    "Create AI-powered chatbot",
    "Design a logo and branding"
  ];

  if (hasSearched) {
    return <SearchResults query={query} />;
  }

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 border border-green-700/50 mb-8">
            <Sparkles className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-green-300">Navigate the AI tool landscape with confidence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find the Perfect
            <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              AI Tool
            </span>
            for Any Task
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop getting lost in the maze of AI tools. Get personalized recommendations, 
            step-by-step roadmaps, and curated resources to achieve your goals faster.
          </p>

          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-200"></div>
              <div className="relative flex bg-gray-800 border border-green-700/30 rounded-2xl p-2 focus-within:border-green-500/50 transition-colors duration-200">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe what you want to accomplish... (e.g., I'm a solo founder and want to build a landing page + MVP)"
                  className="flex-1 bg-transparent text-white placeholder-gray-400 px-6 py-4 text-lg focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSearching ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Find Tools
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-400 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    setHasSearched(true);
                    performSearch(search);
                  }}
                  className="text-sm px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-green-500/50 transition-all duration-200 group"
                >
                  {search}
                  <ArrowRight className="w-3 h-3 ml-2 inline opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}