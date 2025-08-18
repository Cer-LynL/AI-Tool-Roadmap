import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-green-800/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">AINavigator</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-green-400 transition-colors duration-200">How it Works</a>
            <a href="#tools" className="text-gray-300 hover:text-green-400 transition-colors duration-200">Popular Tools</a>
            <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors duration-200">About</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-green-800/20">
            <a href="#features" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">How it Works</a>
            <a href="#tools" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">Popular Tools</a>
            <a href="#about" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">About</a>
            <div className="pt-4 border-t border-green-800/20">
              <button className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left mt-2">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}