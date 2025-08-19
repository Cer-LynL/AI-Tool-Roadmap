import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-md border-b border-white/5 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="ml-4 text-2xl font-bold text-white tracking-tight">AIFinder</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-12">
            <a href="#features" className="text-white/70 hover:text-white transition-colors duration-300 font-medium">Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors duration-300 font-medium">How it Works</a>
            <a href="#tools" className="text-white/70 hover:text-white transition-colors duration-300 font-medium">Popular Tools</a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors duration-300 font-medium">About</a>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-white/70 hover:text-white px-6 py-3 rounded-xl transition-colors duration-300 font-medium">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md border-t border-white/10">
            <a href="#features" className="text-white/70 hover:text-white block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm">Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm">How it Works</a>
            <a href="#tools" className="text-white/70 hover:text-white block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm">Popular Tools</a>
            <a href="#about" className="text-white/70 hover:text-white block px-3 py-2 rounded-md text-base font-medium backdrop-blur-sm">About</a>
            <div className="pt-4 border-t border-white/10">
              <button className="text-white/70 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left backdrop-blur-sm">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-teal-500 to-emerald-400 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left mt-2">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}