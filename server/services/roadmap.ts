export interface RoadmapStep {
  title: string;
  description: string;
  tools: string[];
  timeEstimate?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export async function generateRoadmap(query: string): Promise<RoadmapStep[]> {
  const lowerQuery = query.toLowerCase();
  
  // Analyze query to determine the type of project
  if (lowerQuery.includes('mvp') || lowerQuery.includes('startup') || lowerQuery.includes('app')) {
    return getMVPRoadmap();
  }
  
  if (lowerQuery.includes('landing') || lowerQuery.includes('website') || lowerQuery.includes('page')) {
    return getLandingPageRoadmap();
  }
  
  if (lowerQuery.includes('content') || lowerQuery.includes('social') || lowerQuery.includes('marketing')) {
    return getContentCreationRoadmap();
  }
  
  if (lowerQuery.includes('chatbot') || lowerQuery.includes('ai bot')) {
    return getChatbotRoadmap();
  }
  
  if (lowerQuery.includes('logo') || lowerQuery.includes('brand') || lowerQuery.includes('design')) {
    return getBrandingRoadmap();
  }
  
  // Default general AI implementation roadmap
  return getGeneralAIRoadmap();
}

function getMVPRoadmap(): RoadmapStep[] {
  return [
    {
      title: "Define Your MVP Scope",
      description: "Clearly define the core problem you're solving and the minimum features needed to test your hypothesis.",
      tools: ["Notion", "Miro", "FigJam"],
      timeEstimate: "1-2 days",
      difficulty: "Beginner"
    },
    {
      title: "Create User Stories & Wireframes",
      description: "Map out user journeys and create basic wireframes for your core features.",
      tools: ["Figma", "Whimsical", "Balsamiq"],
      timeEstimate: "2-3 days",
      difficulty: "Beginner"
    },
    {
      title: "Choose Your Tech Stack",
      description: "Select the right combination of no-code/low-code tools or development frameworks based on your technical skills.",
      tools: ["Lovable", "Bubble", "Webflow", "Cursor"],
      timeEstimate: "1 day",
      difficulty: "Intermediate"
    },
    {
      title: "Build Core Features",
      description: "Develop the essential features that solve your users' primary problem. Focus on functionality over aesthetics.",
      tools: ["Lovable", "Cursor", "GitHub Copilot"],
      timeEstimate: "1-2 weeks",
      difficulty: "Intermediate"
    },
    {
      title: "Set Up Analytics & Feedback",
      description: "Implement basic analytics and user feedback collection to measure success and gather insights.",
      tools: ["Google Analytics", "Hotjar", "Typeform"],
      timeEstimate: "1-2 days",
      difficulty: "Beginner"
    },
    {
      title: "Test & Launch",
      description: "Conduct user testing, fix critical bugs, and launch to your target audience for validation.",
      tools: ["UserTesting", "BrowserStack", "Vercel"],
      timeEstimate: "3-5 days",
      difficulty: "Intermediate"
    }
  ];
}

function getLandingPageRoadmap(): RoadmapStep[] {
  return [
    {
      title: "Define Your Value Proposition",
      description: "Clearly articulate what you offer, who it's for, and why it matters. This will guide all your content.",
      tools: ["Notion", "Google Docs"],
      timeEstimate: "2-4 hours",
      difficulty: "Beginner"
    },
    {
      title: "Research & Plan Content",
      description: "Study competitor pages, identify key messages, and plan your page structure and content flow.",
      tools: ["SimilarWeb", "Ahrefs", "Miro"],
      timeEstimate: "4-6 hours",
      difficulty: "Beginner"
    },
    {
      title: "Create Design & Copy",
      description: "Design your page layout and write compelling copy that converts visitors into customers.",
      tools: ["Figma", "Canva", "ChatGPT", "Copy.ai"],
      timeEstimate: "1-2 days",
      difficulty: "Intermediate"
    },
    {
      title: "Build the Landing Page",
      description: "Use no-code tools or AI-powered builders to create your landing page quickly and efficiently.",
      tools: ["Webflow", "Framer", "Lovable", "Unbounce"],
      timeEstimate: "4-8 hours",
      difficulty: "Beginner"
    },
    {
      title: "Optimize for Conversions",
      description: "Add lead magnets, optimize forms, and ensure fast loading times for better conversion rates.",
      tools: ["Hotjar", "Google PageSpeed", "Mailchimp"],
      timeEstimate: "2-4 hours",
      difficulty: "Intermediate"
    },
    {
      title: "Launch & Test",
      description: "Deploy your page, set up analytics, and run A/B tests to optimize performance.",
      tools: ["Google Analytics", "Google Optimize", "Vercel"],
      timeEstimate: "2-3 hours",
      difficulty: "Beginner"
    }
  ];
}

function getContentCreationRoadmap(): RoadmapStep[] {
  return [
    {
      title: "Define Content Strategy",
      description: "Identify your target audience, content pillars, and posting schedule across platforms.",
      tools: ["Notion", "Airtable", "Buffer"],
      timeEstimate: "4-6 hours",
      difficulty: "Beginner"
    },
    {
      title: "Set Up Content Creation Workflow",
      description: "Choose AI tools for writing, design, and video creation to streamline your content production.",
      tools: ["ChatGPT", "Jasper", "Canva", "Loom"],
      timeEstimate: "2-3 hours",
      difficulty: "Beginner"
    },
    {
      title: "Create Content Templates",
      description: "Develop reusable templates for different content types to maintain consistency and save time.",
      tools: ["Canva", "Figma", "Notion"],
      timeEstimate: "3-4 hours",
      difficulty: "Intermediate"
    },
    {
      title: "Produce Initial Content Batch",
      description: "Create your first batch of content across different formats and platforms.",
      tools: ["ChatGPT", "DALL-E", "Canva", "CapCut"],
      timeEstimate: "1-2 days",
      difficulty: "Intermediate"
    },
    {
      title: "Schedule & Automate",
      description: "Set up social media scheduling and automation tools to maintain consistent posting.",
      tools: ["Buffer", "Hootsuite", "Later", "Zapier"],
      timeEstimate: "2-3 hours",
      difficulty: "Beginner"
    },
    {
      title: "Monitor & Optimize",
      description: "Track performance metrics and adjust your strategy based on what resonates with your audience.",
      tools: ["Google Analytics", "Sprout Social", "Brandwatch"],
      timeEstimate: "Ongoing",
      difficulty: "Intermediate"
    }
  ];
}

function getChatbotRoadmap(): RoadmapStep[] {
  return [
    {
      title: "Define Bot Purpose & Scope",
      description: "Clearly define what your chatbot should accomplish and what conversations it needs to handle.",
      tools: ["Notion", "Miro"],
      timeEstimate: "2-4 hours",
      difficulty: "Beginner"
    },
    {
      title: "Design Conversation Flows",
      description: "Map out different conversation paths and user intents your bot needs to understand.",
      tools: ["Lucidchart", "Draw.io", "Botmock"],
      timeEstimate: "4-6 hours",
      difficulty: "Intermediate"
    },
    {
      title: "Choose Platform & Tools",
      description: "Select the right chatbot platform based on your technical skills and integration needs.",
      tools: ["Dialogflow", "Chatfuel", "ManyChat", "Rasa"],
      timeEstimate: "1-2 hours",
      difficulty: "Beginner"
    },
    {
      title: "Build & Train Your Bot",
      description: "Create your chatbot, train it with sample conversations, and integrate with your systems.",
      tools: ["Dialogflow", "OpenAI API", "Zapier"],
      timeEstimate: "1-2 weeks",
      difficulty: "Advanced"
    },
    {
      title: "Test & Refine",
      description: "Thoroughly test your bot with real scenarios and refine responses based on user interactions.",
      tools: ["Botium", "Chatbot testing tools"],
      timeEstimate: "3-5 days",
      difficulty: "Intermediate"
    },
    {
      title: "Deploy & Monitor",
      description: "Launch your chatbot and continuously monitor conversations to improve its performance.",
      tools: ["Google Analytics", "Bot analytics dashboards"],
      timeEstimate: "1-2 days",
      difficulty: "Intermediate"
    }
  ];
}

function getBrandingRoadmap(): RoadmapStep[] {
  return [
    {
      title: "Brand Strategy & Research",
      description: "Define your brand personality, values, and positioning. Research competitors and target audience.",
      tools: ["Notion", "Miro", "SimilarWeb"],
      timeEstimate: "4-8 hours",
      difficulty: "Beginner"
    },
    {
      title: "Logo Design & Concepts",
      description: "Create multiple logo concepts that reflect your brand personality and values.",
      tools: ["Looka", "Canva", "LogoMaker", "DALL-E"],
      timeEstimate: "2-4 hours",
      difficulty: "Beginner"
    },
    {
      title: "Color Palette & Typography",
      description: "Develop a cohesive color scheme and select fonts that complement your brand identity.",
      tools: ["Coolors", "Adobe Color", "Google Fonts"],
      timeEstimate: "1-2 hours",
      difficulty: "Beginner"
    },
    {
      title: "Brand Guidelines Creation",
      description: "Document your brand standards including logo usage, colors, fonts, and voice guidelines.",
      tools: ["Canva", "Figma", "Notion"],
      timeEstimate: "3-4 hours",
      difficulty: "Intermediate"
    },
    {
      title: "Marketing Materials",
      description: "Create business cards, social media templates, and other branded materials.",
      tools: ["Canva", "Adobe Express", "Figma"],
      timeEstimate: "2-3 hours",
      difficulty: "Beginner"
    },
    {
      title: "Brand Implementation",
      description: "Apply your new branding across all touchpoints including website, social media, and materials.",
      tools: ["Webflow", "WordPress", "Social media platforms"],
      timeEstimate: "4-6 hours",
      difficulty: "Intermediate"
    }
  ];
}

function getGeneralAIRoadmap(): RoadmapStep[] {
  return [
    {
      title: "Assess Your Needs",
      description: "Identify specific tasks and workflows where AI can add the most value to your work or business.",
      tools: ["Notion", "Miro"],
      timeEstimate: "2-3 hours",
      difficulty: "Beginner"
    },
    {
      title: "Research AI Tools",
      description: "Explore different AI tools that match your needs and compare their features, pricing, and capabilities.",
      tools: ["AI Tool directories", "Product Hunt", "G2"],
      timeEstimate: "3-4 hours",
      difficulty: "Beginner"
    },
    {
      title: "Start with Free Trials",
      description: "Test 2-3 promising AI tools with their free trials or free tiers to evaluate effectiveness.",
      tools: ["Various AI tools"],
      timeEstimate: "1 week",
      difficulty: "Beginner"
    },
    {
      title: "Integrate into Workflow",
      description: "Gradually integrate the most effective AI tools into your daily workflow and train your team.",
      tools: ["Zapier", "IFTTT", "API integrations"],
      timeEstimate: "1-2 weeks",
      difficulty: "Intermediate"
    },
    {
      title: "Measure & Optimize",
      description: "Track productivity gains and ROI from AI tool adoption, then optimize your AI workflow.",
      tools: ["Time tracking tools", "Analytics"],
      timeEstimate: "Ongoing",
      difficulty: "Intermediate"
    }
  ];
}