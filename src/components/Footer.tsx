import React from 'react';
import { Search, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' }
    ],
    Resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Tool Database', href: '#database' },
      { name: 'Community', href: '#community' }
    ],
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy', href: '#privacy' }
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#twitter', label: 'Twitter' },
    { icon: <Github className="w-5 h-5" />, href: '#github', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#linkedin', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: '#email', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-800/50 border-t border-gray-700/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">AINavigator</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Navigate the AI tool landscape with confidence. Find the perfect tools, get expert recommendations, and achieve your goals faster.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AINavigator. All rights reserved. Built with ❤️ for the AI community.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#cookies" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}