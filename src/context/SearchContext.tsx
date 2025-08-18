import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockSearchData } from '../data/mockSearchData';

interface AITool {
  name: string;
  category: string;
  description: string;
  rating: number;
  pricing: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  link: string;
}

interface YouTubeVideo {
  title: string;
  channel: string;
  url: string;
  thumbnail: string;
  publishDate: string;
  views: string;
}

interface RoadmapStep {
  title: string;
  description: string;
  tools: string[];
}

interface AdditionalResource {
  title: string;
  url: string;
}

interface SearchResults {
  recommendedTools: AITool[];
  youtubeVideos: YouTubeVideo[];
  roadmap: RoadmapStep[];
  additionalResources: AdditionalResource[];
}

interface SearchContextType {
  searchResults: SearchResults;
  isSearching: boolean;
  performSearch: (query: string) => Promise<void>;
  backToHome: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchResults, setSearchResults] = useState<SearchResults>({
    recommendedTools: [],
    youtubeVideos: [],
    roadmap: [],
    additionalResources: []
  });
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query: string): Promise<void> => {
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use mock data based on query keywords
    const results = mockSearchData(query.toLowerCase());
    setSearchResults(results);
    setIsSearching(false);
  };

  const backToHome = () => {
    setSearchResults({
      recommendedTools: [],
      youtubeVideos: [],
      roadmap: [],
      additionalResources: []
    });
  };

  return (
    <SearchContext.Provider value={{
      searchResults,
      isSearching,
      performSearch,
      backToHome
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}