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

export interface PromptAnalysis {
  taskType: 'unclear' | 'business' | 'technical' | 'creative' | 'research' | 'automation';
  clarityScore: number; // 1-10, how clear the original prompt is
  missingElements: string[];
  detectedIntent: string;
}

export function generateOptimizedPrompt(originalQuery: string): OptimizedPrompt {
  const analysis = analyzePrompt(originalQuery);
  const lowerQuery = originalQuery.toLowerCase().trim();

  // Generate optimized prompt based on task type and best practices
  const optimizedPrompt = createOptimizedPrompt(originalQuery, analysis);
  const clarifyingQuestions = generateClarifyingQuestions(analysis, lowerQuery);
  const taskBreakdown = generateTaskBreakdown(analysis, lowerQuery);
  const suggestedContext = generateContext(analysis, lowerQuery);
  const promptingTips = getPromptingTips(analysis.taskType);

  return {
    originalPrompt: originalQuery,
    optimizedPrompt,
    clarifyingQuestions,
    taskBreakdown,
    suggestedContext,
    promptingTips
  };
}

function analyzePrompt(query: string): PromptAnalysis {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/);
  
  // Detect task type based on keywords
  let taskType: PromptAnalysis['taskType'] = 'unclear';
  let detectedIntent = '';
  
  // Business keywords
  if (lowerQuery.match(/\b(startup|business|mvp|product|launch|revenue|customer|market)\b/)) {
    taskType = 'business';
    detectedIntent = 'Building or improving a business/product';
  }
  // Technical keywords
  else if (lowerQuery.match(/\b(build|develop|code|app|website|api|database|deploy)\b/)) {
    taskType = 'technical';
    detectedIntent = 'Creating or developing technical solutions';
  }
  // Creative keywords
  else if (lowerQuery.match(/\b(design|creative|content|video|image|logo|brand|marketing)\b/)) {
    taskType = 'creative';
    detectedIntent = 'Creating visual or content assets';
  }
  // Research keywords
  else if (lowerQuery.match(/\b(research|analyze|study|compare|evaluate|learn)\b/)) {
    taskType = 'research';
    detectedIntent = 'Gathering information or analysis';
  }
  // Automation keywords
  else if (lowerQuery.match(/\b(automate|workflow|process|integrate|optimize|streamline)\b/)) {
    taskType = 'automation';
    detectedIntent = 'Improving processes or automation';
  }

  // Calculate clarity score based on specificity
  const clarityScore = calculateClarityScore(query, words);

  // Identify missing elements
  const missingElements = identifyMissingElements(lowerQuery, taskType);

  return {
    taskType,
    clarityScore,
    missingElements,
    detectedIntent
  };
}

function calculateClarityScore(query: string, words: string[]): number {
  let score = 5; // Base score

  // Length factor (too short or too long reduces clarity)
  if (words.length < 3) score -= 2;
  else if (words.length > 30) score -= 1;
  else if (words.length >= 8 && words.length <= 20) score += 2;

  // Specificity indicators
  if (query.match(/\b(I want to|I need to|Help me|I'm trying to)\b/i)) score += 1;
  if (query.match(/\b(for my|as a|because|in order to)\b/i)) score += 1;
  if (query.match(/\b(budget|timeline|deadline|by when)\b/i)) score += 1;
  if (query.match(/\b(beginner|experienced|professional|team)\b/i)) score += 1;

  // Vagueness indicators
  if (query.match(/\b(something|anything|somehow|maybe|kinda|sorta)\b/i)) score -= 2;
  if (query.match(/\b(best|good|nice|cool|awesome)\b/i) && !query.match(/\b(best practices|best way)\b/i)) score -= 1;

  return Math.max(1, Math.min(10, score));
}

function identifyMissingElements(query: string, taskType: PromptAnalysis['taskType']): string[] {
  const missing: string[] = [];

  // Common missing elements
  if (!query.match(/\b(budget|cost|price|expensive|cheap|free)\b/i)) {
    missing.push('Budget constraints');
  }
  if (!query.match(/\b(timeline|deadline|time|when|soon|quickly|asap)\b/i)) {
    missing.push('Timeline or deadlines');
  }
  if (!query.match(/\b(experience|beginner|expert|know|familiar)\b/i)) {
    missing.push('Technical skill level');
  }

  // Task-specific missing elements
  switch (taskType) {
    case 'business':
      if (!query.match(/\b(target audience|customer|user|market)\b/i)) {
        missing.push('Target audience definition');
      }
      if (!query.match(/\b(goal|objective|outcome|success)\b/i)) {
        missing.push('Success metrics or goals');
      }
      break;
    
    case 'technical':
      if (!query.match(/\b(platform|technology|framework|language)\b/i)) {
        missing.push('Technology preferences');
      }
      if (!query.match(/\b(feature|functionality|requirement)\b/i)) {
        missing.push('Specific requirements');
      }
      break;
    
    case 'creative':
      if (!query.match(/\b(style|brand|aesthetic|look|feel)\b/i)) {
        missing.push('Visual style preferences');
      }
      if (!query.match(/\b(purpose|use|where|channel)\b/i)) {
        missing.push('Usage context');
      }
      break;
  }

  return missing;
}

function createOptimizedPrompt(originalQuery: string, analysis: PromptAnalysis): string {
  const templates = {
    business: `I'm a [role/background] looking to ${originalQuery.toLowerCase()}. 

Context:
- My target audience is: [describe your ideal customers]
- My main goal is: [specific business objective]
- My budget is: [budget range]
- Timeline: [when do you need this completed]
- Current situation: [what you have now, if anything]

Success looks like: [how will you measure success]

What specific tools and step-by-step roadmap would help me achieve this?`,

    technical: `I need to ${originalQuery.toLowerCase()}.

Project Details:
- My technical background: [beginner/intermediate/expert]
- Preferred technologies/platforms: [specific preferences or constraints]
- Key requirements: [must-have features or functionality]
- Timeline: [project deadline]
- Resources available: [team size, budget, time commitment]

Current setup: [what tools/infrastructure you already have]

What tools and development roadmap would work best for this project?`,

    creative: `I want to ${originalQuery.toLowerCase()}.

Creative Brief:
- Project purpose: [what will this be used for]
- Target audience: [who will see/use this]
- Style preferences: [visual style, tone, aesthetic]
- Brand guidelines: [existing brand elements to consider]
- Deliverables needed: [formats, sizes, variations]
- Timeline: [when do you need this]
- Budget: [budget constraints]

Inspiration: [references, examples, or mood]

What creative tools and workflow would help me create this effectively?`,

    research: `I need to ${originalQuery.toLowerCase()}.

Research Parameters:
- Research objective: [what specific question are you trying to answer]
- Scope: [how deep/broad should the research be]
- Timeline: [when do you need results]
- Intended use: [what will you do with the findings]
- Current knowledge: [what you already know about the topic]
- Preferred sources: [academic, industry reports, surveys, etc.]

Success criteria: [what would make this research valuable to you]

What research tools and methodology would be most effective?`,

    automation: `I want to ${originalQuery.toLowerCase()}.

Automation Scope:
- Current process: [describe your current manual process]
- Frequency: [how often do you do this task]
- Time spent: [how long it takes currently]
- Tools currently used: [existing software/platforms]
- Technical comfort level: [beginner/intermediate/advanced]
- Budget: [what you're willing to invest]
- Team involvement: [who else needs to use this]

Desired outcome: [what would the ideal automated process look like]

What automation tools and implementation plan would work best?`,

    unclear: `I'm looking for help with: "${originalQuery}"

To provide better recommendations, here's a more structured prompt:

Project Context:
- My role/background: [describe yourself]
- Specific goal: [what exactly are you trying to accomplish]
- Current situation: [what do you have now]
- Main challenges: [what's stopping you]
- Timeline: [when do you need this]
- Resources: [budget, time, team]
- Success metrics: [how will you know you've succeeded]

Technical requirements: [any specific needs or constraints]

What tools, resources, and step-by-step plan would help me achieve this goal?`
  };

  return templates[analysis.taskType] || templates.unclear;
}

function generateClarifyingQuestions(analysis: PromptAnalysis, query: string): string[] {
  const baseQuestions = [
    "What's your main goal or desired outcome?",
    "What's your timeline for this project?",
    "What's your budget or resource constraints?",
    "What's your experience level with similar projects?"
  ];

  const taskSpecificQuestions = {
    business: [
      "Who is your target audience or customer?",
      "What's your unique value proposition?",
      "What does success look like for your business?",
      "What's your go-to-market strategy?"
    ],
    technical: [
      "What platforms or technologies do you prefer?",
      "What are your main functional requirements?",
      "Do you need this to integrate with existing systems?",
      "What's your deployment environment?"
    ],
    creative: [
      "What style or aesthetic are you aiming for?",
      "Where will this content be used?",
      "Do you have existing brand guidelines?",
      "What format or dimensions do you need?"
    ],
    research: [
      "What specific questions are you trying to answer?",
      "What type of sources are most valuable to you?",
      "How will you use the research findings?",
      "What's the scope and depth needed?"
    ],
    automation: [
      "What's your current manual process?",
      "How often do you perform this task?",
      "Who else needs to be involved?",
      "What tools are you already using?"
    ],
    unclear: [
      "Can you describe the problem you're trying to solve?",
      "What would an ideal solution look like?",
      "What have you tried so far?",
      "What's the most important outcome?"
    ]
  };

  return [...baseQuestions, ...taskSpecificQuestions[analysis.taskType]];
}

function generateTaskBreakdown(analysis: PromptAnalysis, query: string): string[] {
  if (query.includes('mvp') || query.includes('startup')) {
    return [
      "1. Validate your idea with potential users",
      "2. Define core features and user stories",
      "3. Choose technology stack and tools",
      "4. Create wireframes and basic design",
      "5. Build minimum viable version",
      "6. Test with real users and gather feedback",
      "7. Iterate based on feedback",
      "8. Plan launch and marketing strategy"
    ];
  }

  if (query.includes('website') || query.includes('landing')) {
    return [
      "1. Define your website goals and audience",
      "2. Plan content structure and sitemap",
      "3. Create wireframes and design mockups",
      "4. Choose platform and development approach",
      "5. Develop content (copy, images, videos)",
      "6. Build and style your website",
      "7. Optimize for SEO and performance",
      "8. Test across devices and browsers",
      "9. Launch and set up analytics"
    ];
  }

  if (query.includes('content') || query.includes('marketing')) {
    return [
      "1. Define your content strategy and goals",
      "2. Research your audience and competitors",
      "3. Plan content calendar and themes",
      "4. Create content templates and guidelines",
      "5. Produce initial batch of content",
      "6. Set up distribution channels",
      "7. Schedule and publish content",
      "8. Monitor performance and engagement",
      "9. Optimize based on analytics"
    ];
  }

  // Generic task breakdown
  return [
    "1. Clarify specific requirements and goals",
    "2. Research available tools and solutions",
    "3. Evaluate options based on your criteria",
    "4. Choose the best approach for your needs",
    "5. Create implementation plan",
    "6. Execute step by step",
    "7. Test and validate results",
    "8. Iterate and improve"
  ];
}

function generateContext(analysis: PromptAnalysis, query: string): OptimizedPrompt['suggestedContext'] {
  const baseContext = {
    background: "I'm working on a project that involves...",
    constraints: "My main constraints are budget, timeline, and technical expertise...",
    goals: ["Primary goal", "Secondary objectives", "Success metrics"]
  };

  switch (analysis.taskType) {
    case 'business':
      return {
        background: "I'm a [founder/entrepreneur/business owner] with [background] looking to [specific business goal]",
        constraints: "Budget: [amount], Timeline: [deadline], Team: [size/expertise], Market: [competitive landscape]",
        goals: [
          "Launch a viable product/service",
          "Acquire first customers",
          "Validate market fit",
          "Generate revenue/funding"
        ]
      };
    
    case 'technical':
      return {
        background: "I'm a [role] with [technical experience] working on [project type]",
        constraints: "Technology preferences: [stack], Deployment: [environment], Performance: [requirements], Budget: [tools/services]",
        goals: [
          "Build functional solution",
          "Ensure scalability",
          "Maintain code quality",
          "Meet user requirements"
        ]
      };

    case 'creative':
      return {
        background: "I'm creating [content type] for [audience/purpose] as part of [larger project]",
        constraints: "Brand guidelines: [requirements], Format: [specifications], Timeline: [deadline], Tools: [available software]",
        goals: [
          "Create engaging content",
          "Maintain brand consistency",
          "Achieve specific response/action",
          "Deliver on time and budget"
        ]
      };

    default:
      return baseContext;
  }
}

function getPromptingTips(taskType: PromptAnalysis['taskType']): string[] {
  const generalTips = [
    "Be specific about your goals and success criteria",
    "Include context about your background and constraints",
    "Mention your timeline and budget if relevant",
    "Specify your experience level with similar tasks",
    "Ask for step-by-step guidance when needed"
  ];

  const specificTips = {
    business: [
      "Define your target market and customer personas",
      "Include information about competitors and market positioning",
      "Mention your business model and revenue goals",
      "Specify regulatory or compliance requirements"
    ],
    technical: [
      "Mention preferred technologies or platforms",
      "Include performance and scalability requirements",
      "Specify integration needs with existing systems",
      "Mention deployment and hosting preferences"
    ],
    creative: [
      "Include visual references or mood boards",
      "Specify brand guidelines and style preferences",
      "Mention where/how the content will be used",
      "Include technical specifications (formats, sizes)"
    ],
    research: [
      "Define the scope and depth of research needed",
      "Specify preferred types of sources",
      "Mention how you'll use the research findings",
      "Include any methodological preferences"
    ],
    automation: [
      "Describe your current manual process in detail",
      "Mention frequency and volume of tasks",
      "Specify integration requirements",
      "Include error handling and monitoring needs"
    ],
    unclear: [
      "Start by describing the problem you're trying to solve",
      "Include what you've already tried or researched",
      "Mention what would make this successful for you",
      "Be specific about your constraints and resources"
    ]
  };

  return [...generalTips, ...specificTips[taskType]];
}