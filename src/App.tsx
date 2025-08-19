import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-black text-white font-sans">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <Footer />
      </div>
    </SearchProvider>
  );
}

export default App;