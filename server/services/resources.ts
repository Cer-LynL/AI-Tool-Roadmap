export interface AdditionalResource {
  title: string;
  url: string;
  type: 'article' | 'tool' | 'course' | 'community' | 'template' | 'guide';
  description?: string;
}

export async function findAdditionalResources(query: string): Promise<AdditionalResource[]> {
  const lowerQuery = query.toLowerCase();
  
  // Base resources that are always valuable
  const baseResources: AdditionalResource[] = [
    {
      title: "Product Hunt - Discover New AI Tools",
      url: "https://www.producthunt.com/topics/artificial-intelligence",
      type: "tool",
      description: "Daily discovery of new AI tools and products"
    },
    {
      title: "AI Tool Report - Weekly Newsletter",
      url: "https://www.aitoolreport.com/",
      type: "community",
      description: "Weekly roundup of the best AI tools and news"
    }
  ];

  // Query-specific resources
  let specificResources: AdditionalResource[] = [];

  if (lowerQuery.includes('mvp') || lowerQuery.includes('startup')) {
    specificResources = [
      {
        title: "Lean Startup Methodology Guide",
        url: "https://leanstartup.co/",
        type: "guide",
        description: "Complete guide to building lean startups and MVPs"
      },
      {
        title: "Y Combinator Startup School",
        url: "https://www.startupschool.org/",
        type: "course",
        description: "Free online course for startup founders"
      },
      {
        title: "MVP Templates and Checklists",
        url: "https://www.notion.so/templates/startup",
        type: "template",
        description: "Ready-to-use templates for MVP planning and execution"
      },
      {
        title: "Indie Hackers Community",
        url: "https://www.indiehackers.com/",
        type: "community",
        description: "Community of independent entrepreneurs and makers"
      }
    ];
  }

  else if (lowerQuery.includes('landing') || lowerQuery.includes('website')) {
    specificResources = [
      {
        title: "Landing Page Optimization Guide",
        url: "https://unbounce.com/landing-page-articles/",
        type: "guide",
        description: "Comprehensive guide to creating high-converting landing pages"
      },
      {
        title: "Really Good Emails - Design Inspiration",
        url: "https://reallygoodemails.com/",
        type: "tool",
        description: "Curated collection of email and landing page designs"
      },
      {
        title: "Conversion Rate Optimization Course",
        url: "https://cxl.com/institute/",
        type: "course",
        description: "Professional course on optimizing conversion rates"
      },
      {
        title: "Landing Page Templates",
        url: "https://www.figma.com/community/search?resource_type=mixed&sort_by=relevance&query=landing%20page",
        type: "template",
        description: "Free landing page templates and designs"
      }
    ];
  }

  else if (lowerQuery.includes('content') || lowerQuery.includes('social')) {
    specificResources = [
      {
        title: "Content Marketing Institute",
        url: "https://contentmarketinginstitute.com/",
        type: "guide",
        description: "Latest strategies and best practices for content marketing"
      },
      {
        title: "Buffer's Social Media Templates",
        url: "https://buffer.com/resources/social-media-templates/",
        type: "template",
        description: "Ready-to-use social media post templates"
      },
      {
        title: "HubSpot Content Marketing Course",
        url: "https://academy.hubspot.com/courses/content-marketing",
        type: "course",
        description: "Free comprehensive content marketing certification"
      },
      {
        title: "Content Creator Coalition",
        url: "https://www.contentcreatorcoalition.com/",
        type: "community",
        description: "Community for content creators and marketers"
      }
    ];
  }

  else if (lowerQuery.includes('chatbot') || lowerQuery.includes('ai bot')) {
    specificResources = [
      {
        title: "Chatbot Design Best Practices",
        url: "https://blog.botpress.com/chatbot-design-best-practices",
        type: "guide",
        description: "Complete guide to designing effective chatbots"
      },
      {
        title: "Botpress - Open Source Chatbot Platform",
        url: "https://botpress.com/",
        type: "tool",
        description: "Open-source platform for building chatbots"
      },
      {
        title: "Conversational AI Course",
        url: "https://www.coursera.org/learn/conversational-ai",
        type: "course",
        description: "Learn to build conversational AI systems"
      },
      {
        title: "Chatbot Community Forum",
        url: "https://www.reddit.com/r/ChatbotDevelopers/",
        type: "community",
        description: "Reddit community for chatbot developers"
      }
    ];
  }

  else if (lowerQuery.includes('logo') || lowerQuery.includes('brand')) {
    specificResources = [
      {
        title: "Brand Identity Design Guide",
        url: "https://www.canva.com/learn/brand-identity/",
        type: "guide",
        description: "Complete guide to creating strong brand identities"
      },
      {
        title: "Logo Design Templates",
        url: "https://www.canva.com/logos/templates/",
        type: "template",
        description: "Professional logo templates and design elements"
      },
      {
        title: "Brand Strategy Course",
        url: "https://www.futurelearn.com/courses/brand-strategy",
        type: "course",
        description: "Learn how to develop effective brand strategies"
      },
      {
        title: "Designer Hangout Community",
        url: "https://designerhangout.co/",
        type: "community",
        description: "Slack community for UX/UI designers and brand professionals"
      }
    ];
  }

  else {
    // General AI and productivity resources
    specificResources = [
      {
        title: "AI for Everyone Course",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        type: "course",
        description: "Non-technical introduction to AI by Andrew Ng"
      },
      {
        title: "Future Tools - AI Tool Directory",
        url: "https://www.futuretools.io/",
        type: "tool",
        description: "Curated directory of the best AI tools"
      },
      {
        title: "OpenAI Documentation",
        url: "https://platform.openai.com/docs",
        type: "guide",
        description: "Official documentation for OpenAI APIs and tools"
      },
      {
        title: "AI Productivity Templates",
        url: "https://www.notion.so/templates/ai-productivity",
        type: "template",
        description: "Templates for integrating AI into your workflow"
      }
    ];
  }

  // Combine and return resources
  return [...specificResources, ...baseResources].slice(0, 6);
}