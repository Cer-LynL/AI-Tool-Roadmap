import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { SearchResults } from './SearchResults';
import { ShaderBackground } from './ShaderBackground';

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
    <ShaderBackground>
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-12">
              <Sparkles className="w-5 h-5 text-teal-500 mr-3" />
              <span className="text-sm font-medium text-white">Navigate the AI tool landscape with confidence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Find the Perfect
              <span className="block bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
                AI Tool
              </span>
              for Any Task
            </h1>
            
            <p className="text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Stop getting lost in the maze of AI tools. Get personalized recommendations, 
              step-by-step roadmaps, and curated resources to achieve your goals faster.
            </p>

            <form onSubmit={handleSearch} className="max-w-5xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-emerald-400/30 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className={`relative flex bg-white/10 backdrop-blur-md border border-white/20 p-3 focus-within:border-teal-500/50 transition-all duration-200 ${
                  query.length > 50 ? 'rounded-3xl' : 'rounded-full'
                }`}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe what you want to accomplish... (e.g., I'm a solo founder and want to build a landing page + MVP)"
                    className="flex-1 bg-transparent text-white placeholder-white/60 px-8 py-6 text-xl focus:outline-none font-light"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className={`bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white px-10 py-6 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-2xl ${
                      query.length > 50 ? 'rounded-2xl' : 'rounded-full'
                    }`}
                  >
                    {isSearching ? (
                      <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Search className="w-6 h-6 mr-3" />
                        Find Tools
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center">
              <p className="text-white/70 mb-6 text-lg font-light">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      setHasSearched(true);
                      performSearch(search);
                    }}
                    className="text-sm px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 hover:text-white hover:border-teal-500/50 hover:bg-white/20 transition-all duration-300 group font-medium"
                  >
                    {search}
                    <ArrowRight className="w-4 h-4 ml-2 inline opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ShaderBackground>
  );
}