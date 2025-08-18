export function mockSearchData(query: string) {
  // Mock data that would normally come from AI analysis and real APIs
  
  const isMVPQuery = query.includes('mvp') || query.includes('startup') || query.includes('build');
  const isLandingPageQuery = query.includes('landing') || query.includes('website') || query.includes('page');
  const isContentQuery = query.includes('content') || query.includes('social') || query.includes('marketing');

  if (isMVPQuery || isLandingPageQuery) {
    return {
      recommendedTools: [
        {
          name: "Lovable (formerly GPT Engineer)",
          category: "No-Code Development",
          description: "AI-powered web app builder that generates production-ready React applications from simple text descriptions.",
          rating: 4.8,
          pricing: "Free tier, $20/month Pro",
          pros: [
            "Generates complete React applications",
            "No coding experience required",
            "Rapid prototyping capabilities",
            "Export source code"
          ],
          cons: [
            "Limited customization for complex logic",
            "May require technical review",
            "Template-based outputs"
          ],
          bestFor: "Solo founders and entrepreneurs who need to quickly validate ideas with functional prototypes",
          link: "https://lovable.dev"
        },
        {
          name: "Cursor",
          category: "AI-Powered IDE",
          description: "Advanced code editor with AI pair programming capabilities, perfect for developers building custom solutions.",
          rating: 4.9,
          pricing: "Free, $20/month Pro",
          pros: [
            "Real-time AI code suggestions",
            "Natural language to code conversion",
            "Excellent for full-stack development",
            "Integrates with existing workflows"
          ],
          cons: [
            "Requires programming knowledge",
            "Can be overwhelming for beginners",
            "Subscription required for advanced features"
          ],
          bestFor: "Developers and technical founders who want to accelerate their coding process",
          link: "https://cursor.sh"
        },
        {
          name: "Framer",
          category: "Website Builder",
          description: "Design-first website builder with powerful animations and responsive design capabilities.",
          rating: 4.7,
          pricing: "Free tier, $5-$25/month",
          pros: [
            "Beautiful design templates",
            "Advanced animation capabilities",
            "Responsive by default",
            "Great for landing pages"
          ],
          cons: [
            "Learning curve for complex animations",
            "Limited e-commerce features",
            "Can be slow with heavy content"
          ],
          bestFor: "Founders who prioritize beautiful, interactive landing pages and marketing sites",
          link: "https://framer.com"
        },
        {
          name: "Supabase",
          category: "Backend-as-a-Service",
          description: "Open-source Firebase alternative with PostgreSQL database, auth, and real-time subscriptions.",
          rating: 4.6,
          pricing: "Free tier, starts at $25/month",
          pros: [
            "Full PostgreSQL database",
            "Built-in authentication",
            "Real-time capabilities",
            "Open source"
          ],
          cons: [
            "Requires some technical knowledge",
            "Smaller ecosystem than Firebase",
            "Self-hosting can be complex"
          ],
          bestFor: "Technical founders building data-driven applications with real-time features",
          link: "https://supabase.com"
        }
      ],
      youtubeVideos: [
        {
          title: "Building a Complete MVP in 2024: AI Tools Every Founder Needs",
          channel: "Startup School",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "2 weeks ago",
          views: "124K views"
        },
        {
          title: "Lovable vs Traditional Development: 30 Day Challenge",
          channel: "No Code Founders",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "1 week ago",
          views: "87K views"
        },
        {
          title: "From Idea to Launch: Complete Startup Guide 2024",
          channel: "Indie Hackers",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "5 days ago",
          views: "156K views"
        },
        {
          title: "Cursor AI: The Developer's Secret Weapon",
          channel: "Code With Antonio",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "3 days ago",
          views: "298K views"
        },
        {
          title: "Landing Page That Converts: AI-Powered Design Process",
          channel: "Design Course",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "1 week ago",
          views: "92K views"
        },
        {
          title: "Supabase Tutorial: Build a Real-Time App in 20 Minutes",
          channel: "JavaScript Mastery",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "4 days ago",
          views: "203K views"
        }
      ],
      roadmap: [
        {
          title: "Validate & Plan Your Idea",
          description: "Conduct thorough market research using AI tools to validate your startup idea. Create detailed user personas, analyze competitors, and develop a comprehensive business plan with market sizing and go-to-market strategy.",
          tools: ["ChatGPT", "Perplexity", "Notion AI"],
          timeEstimate: "3-5 days",
          keyActions: [
            "Research target market and competitors using Perplexity",
            "Create user personas and pain point analysis with ChatGPT",
            "Develop business model canvas in Notion",
            "Validate idea through surveys and interviews"
          ]
        },
        {
          title: "Design Your Landing Page",
          description: "Design and build a high-converting landing page that clearly communicates your value proposition. Include email capture, social proof elements, and A/B testing capabilities to optimize conversion rates.",
          tools: ["Framer", "Figma", "Midjourney"],
          timeEstimate: "2-3 days",
          keyActions: [
            "Create wireframes and user flow in Figma",
            "Generate hero images and graphics with Midjourney",
            "Build responsive landing page in Framer",
            "Set up analytics and conversion tracking",
            "Implement email capture and CRM integration"
          ]
        },
        {
          title: "Build Your MVP Core",
          description: "Develop the minimum viable version of your product focusing on core features that solve your users' primary pain points. Use AI-assisted development to accelerate the building process while maintaining code quality.",
          tools: ["Lovable", "Cursor", "Replit"],
          timeEstimate: "1-3 weeks",
          keyActions: [
            "Define core feature set and user stories",
            "Set up development environment with Cursor",
            "Build frontend components using Lovable for rapid prototyping",
            "Implement user authentication and basic functionality",
            "Create responsive design for mobile and desktop",
            "Set up version control and deployment pipeline"
          ]
        },
        {
          title: "Set Up Backend & Database",
          description: "Establish robust backend infrastructure with secure user authentication, scalable database design, and API endpoints. Implement real-time features and ensure data security compliance.",
          tools: ["Supabase", "Firebase", "PlanetScale"],
          timeEstimate: "1-2 weeks",
          keyActions: [
            "Design database schema and relationships",
            "Set up Supabase project with authentication",
            "Create API endpoints for core functionality",
            "Implement row-level security policies",
            "Set up real-time subscriptions for live updates",
            "Configure backup and monitoring systems"
          ]
        },
        {
          title: "Test & Iterate",
          description: "Deploy your MVP to early users, implement comprehensive analytics, and establish feedback loops. Use data-driven insights to prioritize feature development and improve user experience.",
          tools: ["Hotjar", "PostHog", "Typeform"],
          timeEstimate: "Ongoing",
          keyActions: [
            "Deploy MVP to production environment",
            "Set up user analytics and behavior tracking with PostHog",
            "Implement heatmaps and session recordings with Hotjar",
            "Create feedback collection system with Typeform",
            "Establish KPI dashboard and monitoring",
            "Plan and execute iterative improvements based on user data"
          ]
        }
      ],
      additionalResources: [
        {
          title: "The Lean Startup Methodology - Eric Ries",
          url: "https://example.com/lean-startup"
        },
        {
          title: "Y Combinator's Startup School (Free)",
          url: "https://startupschool.org"
        },
        {
          title: "Indie Hackers Community & Resources",
          url: "https://indiehackers.com"
        },
        {
          title: "Product Hunt Launch Guide",
          url: "https://blog.producthunt.com/launch-guide"
        }
      ]
    };
  }

  if (isContentQuery) {
    return {
      recommendedTools: [
        {
          name: "ChatGPT",
          category: "Content Generation",
          description: "Advanced AI language model perfect for generating marketing copy, social media content, and blog posts.",
          rating: 4.9,
          pricing: "Free tier, $20/month Plus",
          pros: [
            "Versatile content creation",
            "Multiple languages supported",
            "Conversational interface",
            "Custom GPTs available"
          ],
          cons: [
            "Can generate generic content",
            "Requires human editing",
            "Usage limits on free tier"
          ],
          bestFor: "Content creators and marketers who need versatile, high-quality text content",
          link: "https://chat.openai.com"
        },
        {
          name: "Midjourney",
          category: "Visual Content",
          description: "AI image generator that creates stunning visuals for social media, marketing materials, and branding.",
          rating: 4.8,
          pricing: "$10-$120/month",
          pros: [
            "High-quality image generation",
            "Artistic and creative outputs",
            "Regular model updates",
            "Strong community"
          ],
          cons: [
            "Discord-based interface",
            "No free tier",
            "Limited control over specific details"
          ],
          bestFor: "Content creators who need unique, high-quality visual content for social media and marketing",
          link: "https://midjourney.com"
        },
        {
          name: "Jasper AI",
          category: "Marketing Content",
          description: "AI writing assistant specifically designed for marketing teams and content creators.",
          rating: 4.6,
          pricing: "$39-$125/month",
          pros: [
            "Marketing-focused templates",
            "Brand voice customization",
            "Team collaboration features",
            "SEO optimization tools"
          ],
          cons: [
            "More expensive than alternatives",
            "Learning curve for advanced features",
            "Requires content strategy knowledge"
          ],
          bestFor: "Marketing teams and agencies that need consistent, on-brand content at scale",
          link: "https://jasper.ai"
        }
      ],
      youtubeVideos: [
        {
          title: "ChatGPT for Content Marketing: Complete 2024 Guide",
          channel: "Marketing AI",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "1 week ago",
          views: "89K views"
        },
        {
          title: "Midjourney Prompts That Actually Work",
          channel: "AI Art Master",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          publishDate: "3 days ago",
          views: "234K views"
        }
      ],
      roadmap: [
        {
          title: "Content Strategy & Planning",
          description: "Develop a comprehensive content strategy that aligns with your business goals. Research your target audience, analyze competitors, and create a detailed content calendar with consistent posting schedules across all platforms.",
          tools: ["ChatGPT", "Notion", "Airtable"],
          timeEstimate: "1-2 weeks",
          keyActions: [
            "Define content goals and KPIs using ChatGPT for brainstorming",
            "Research target audience demographics and preferences",
            "Analyze competitor content strategies and gaps",
            "Create content pillars and themes in Notion",
            "Build content calendar with posting schedule in Airtable",
            "Establish brand voice and content guidelines"
          ]
        },
        {
          title: "Create Visual Assets",
          description: "Design a comprehensive visual identity and create engaging graphics, images, and multimedia content that captures attention and drives engagement across all social media platforms.",
          tools: ["Midjourney", "Canva", "DALL-E 3"],
          timeEstimate: "1 week",
          keyActions: [
            "Generate brand-consistent images with Midjourney",
            "Create social media templates in Canva",
            "Design infographics and data visualizations",
            "Produce video thumbnails and cover images",
            "Build a visual asset library for consistent branding",
            "Create platform-specific image sizes and formats"
          ]
        },
        {
          title: "Write Compelling Copy",
          description: "Craft persuasive, engaging copy that speaks directly to your audience's pain points and desires. Develop a consistent brand voice across all content types and optimize for each platform's unique requirements.",
          tools: ["ChatGPT", "Jasper", "Copy.ai"],
          timeEstimate: "Ongoing",
          keyActions: [
            "Develop brand voice and tone guidelines with ChatGPT",
            "Create platform-specific copy templates in Jasper",
            "Write engaging captions and hashtag strategies",
            "Develop email marketing sequences and newsletters",
            "Create blog posts and long-form content",
            "A/B test different copy variations for optimization"
          ]
        }
      ],
      additionalResources: [
        {
          title: "Content Marketing Institute Resources",
          url: "https://contentmarketinginstitute.com"
        },
        {
          title: "Social Media Examiner Blog",
          url: "https://socialmediaexaminer.com"
        }
      ]
    };
  }

  // Default fallback for general queries
  return {
    recommendedTools: [
      {
        name: "ChatGPT",
        category: "General AI Assistant",
        description: "Versatile AI assistant for writing, analysis, coding, and creative tasks.",
        rating: 4.9,
        pricing: "Free tier, $20/month Plus",
        pros: [
          "Extremely versatile",
          "High-quality outputs",
          "Conversational interface",
          "Regular updates and improvements"
        ],
        cons: [
          "Can be verbose",
          "May lack specialized domain knowledge",
          "Usage limits on free tier"
        ],
        bestFor: "Anyone looking for a general-purpose AI assistant for various tasks",
        link: "https://chat.openai.com"
      }
    ],
    youtubeVideos: [
      {
        title: "AI Tools Every Professional Should Know in 2024",
        channel: "Tech Productivity",
        url: "https://youtube.com/watch?v=general1",
        thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
        publishDate: "2 days ago",
        views: "145K views"
      }
    ],
    roadmap: [
      {
        title: "Identify Your Needs",
        description: "Clearly define what you want to accomplish and what success looks like.",
        tools: ["ChatGPT", "Notion"]
      },
      {
        title: "Research & Compare Tools",
        description: "Evaluate different AI tools based on your specific requirements and budget.",
        tools: ["AINavigator", "G2", "Product Hunt"]
      },
      {
        title: "Test & Implement",
        description: "Try out the recommended tools and implement them into your workflow.",
        tools: ["Various AI Tools"]
      }
    ],
    additionalResources: [
      {
        title: "Future of Work Institute",
        url: "https://futureofinstitute.org"
      }
    ]
  };
}