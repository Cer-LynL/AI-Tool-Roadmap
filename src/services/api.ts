const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface APIError {
  error: string;
  message?: string;
}

export interface OptimizedPrompt {
  originalPrompt: string;
  optimizedPrompt: string;
  clarifyingQuestions: string[];
  taskBreakdown: string[];
  suggestedContext: {
    background: string;
    constraints: string;
    goals: string[];
  };
  promptingTips: string[];
}

export interface SearchResponse {
  recommendedTools: any[];
  youtubeVideos: any[];
  roadmap: any[];
  additionalResources: any[];
  optimizedPrompt: OptimizedPrompt;
  query: string;
  timestamp: string;
}

class APIClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData: APIError = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`
      }));
      throw new Error(errorData.message || errorData.error);
    }

    return response.json();
  }

  async search(query: string): Promise<SearchResponse> {
    return this.request<SearchResponse>('/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async getTools(params?: { category?: string; limit?: number; offset?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());

    const endpoint = `/tools${searchParams.toString() ? `?${searchParams}` : ''}`;
    return this.request(endpoint);
  }

  async getTool(id: string) {
    return this.request(`/tools/${id}`);
  }

  async getCategories(): Promise<string[]> {
    return this.request('/tools/meta/categories');
  }

  async getSearchHistory(limit = 10) {
    return this.request(`/search/history?limit=${limit}`);
  }

  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new APIClient();