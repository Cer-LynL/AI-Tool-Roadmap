import React, { useState } from 'react';
import { OptimizedPrompt as OptimizedPromptType } from '../services/api';
import { 
  Lightbulb, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  CheckCircle, 
  Target,
  HelpCircle
} from 'lucide-react';

interface OptimizedPromptProps {
  optimizedPrompt: OptimizedPromptType;
}

export function OptimizedPrompt({ optimizedPrompt }: OptimizedPromptProps) {
  const [expandedSections, setExpandedSections] = useState({
    optimized: false,
    questions: false,
    breakdown: false,
    context: false,
    tips: false
  });
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getTaskTypeColor = () => {
    const prompt = optimizedPrompt.optimizedPrompt.toLowerCase();
    if (prompt.includes('business') || prompt.includes('startup')) return 'text-blue-400';
    if (prompt.includes('technical') || prompt.includes('develop')) return 'text-green-400';
    if (prompt.includes('creative') || prompt.includes('design')) return 'text-purple-400';
    if (prompt.includes('research') || prompt.includes('analyze')) return 'text-yellow-400';
    return 'text-teal-400';
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
      <div className="flex items-center mb-6">
        <Lightbulb className={`w-7 h-7 ${getTaskTypeColor()} mr-3`} />
        <h2 className="text-2xl font-bold text-white">Optimized Task Prompt</h2>
        <div className="ml-auto text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
          AI-Enhanced
        </div>
      </div>

      <div className="text-white/70 mb-6 font-light">
        Based on your request "<span className="text-white font-medium">{optimizedPrompt.originalPrompt}</span>", 
        here's a structured prompt that will help you get better results from AI tools and clearer guidance from experts:
      </div>

      {/* Optimized Prompt Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('optimized')}
          className="flex items-center justify-between w-full p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 mb-4"
        >
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-teal-500 mr-3" />
            <span className="text-lg font-semibold text-white">Enhanced Prompt Template</span>
          </div>
          {expandedSections.optimized ? 
            <ChevronUp className="w-5 h-5 text-white/70" /> : 
            <ChevronDown className="w-5 h-5 text-white/70" />
          }
        </button>
        
        {expandedSections.optimized && (
          <div className="bg-black/30 rounded-2xl p-6 relative">
            <button
              onClick={() => copyToClipboard(optimizedPrompt.optimizedPrompt, 'optimized')}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              title="Copy to clipboard"
            >
              {copiedSection === 'optimized' ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/70" />
              )}
            </button>
            <pre className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-light">
              {optimizedPrompt.optimizedPrompt}
            </pre>
          </div>
        )}
      </div>

      {/* Clarifying Questions */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('questions')}
          className="flex items-center justify-between w-full p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 mb-4"
        >
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 text-blue-400 mr-3" />
            <span className="text-lg font-semibold text-white">Key Questions to Consider</span>
            <span className="ml-2 text-sm text-white/60 bg-white/20 px-2 py-1 rounded-full">
              {optimizedPrompt.clarifyingQuestions.length}
            </span>
          </div>
          {expandedSections.questions ? 
            <ChevronUp className="w-5 h-5 text-white/70" /> : 
            <ChevronDown className="w-5 h-5 text-white/70" />
          }
        </button>
        
        {expandedSections.questions && (
          <div className="space-y-3">
            {optimizedPrompt.clarifyingQuestions.map((question, index) => (
              <div key={index} className="bg-black/30 rounded-xl p-4 flex items-start">
                <div className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-white/80 font-light">{question}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Breakdown */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('breakdown')}
          className="flex items-center justify-between w-full p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 mb-4"
        >
          <div className="flex items-center">
            <Target className="w-5 h-5 text-emerald-400 mr-3" />
            <span className="text-lg font-semibold text-white">Suggested Task Breakdown</span>
          </div>
          {expandedSections.breakdown ? 
            <ChevronUp className="w-5 h-5 text-white/70" /> : 
            <ChevronDown className="w-5 h-5 text-white/70" />
          }
        </button>
        
        {expandedSections.breakdown && (
          <div className="space-y-3">
            {optimizedPrompt.taskBreakdown.map((task, index) => (
              <div key={index} className="bg-black/30 rounded-xl p-4 flex items-start">
                <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-white/80 font-light">{task}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Context Suggestions */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('context')}
          className="flex items-center justify-between w-full p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 mb-4"
        >
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-purple-400 mr-3" />
            <span className="text-lg font-semibold text-white">Context Guidelines</span>
          </div>
          {expandedSections.context ? 
            <ChevronUp className="w-5 h-5 text-white/70" /> : 
            <ChevronDown className="w-5 h-5 text-white/70" />
          }
        </button>
        
        {expandedSections.context && (
          <div className="space-y-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Background Context:</h4>
              <p className="text-white/80 font-light">{optimizedPrompt.suggestedContext.background}</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Constraints to Consider:</h4>
              <p className="text-white/80 font-light">{optimizedPrompt.suggestedContext.constraints}</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Success Goals:</h4>
              <ul className="space-y-1">
                {optimizedPrompt.suggestedContext.goals.map((goal, index) => (
                  <li key={index} className="text-white/80 font-light flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Prompting Tips */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('tips')}
          className="flex items-center justify-between w-full p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 mb-4"
        >
          <div className="flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-400 mr-3" />
            <span className="text-lg font-semibold text-white">Prompting Best Practices</span>
          </div>
          {expandedSections.tips ? 
            <ChevronUp className="w-5 h-5 text-white/70" /> : 
            <ChevronDown className="w-5 h-5 text-white/70" />
          }
        </button>
        
        {expandedSections.tips && (
          <div className="space-y-3">
            {optimizedPrompt.promptingTips.map((tip, index) => (
              <div key={index} className="bg-black/30 rounded-xl p-4 flex items-start">
                <Lightbulb className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-white/80 font-light">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-500/20 to-emerald-400/20 rounded-2xl p-6 border border-teal-500/20">
        <h3 className="text-xl font-bold text-white mb-3">💡 Pro Tip</h3>
        <p className="text-white/80 font-light mb-4">
          Copy the enhanced prompt template above and use it with any AI tool (ChatGPT, Claude, Copilot, etc.) 
          or when asking for help on forums. The more context you provide, the better results you'll get!
        </p>
        <button
          onClick={() => copyToClipboard(optimizedPrompt.optimizedPrompt, 'main')}
          className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
        >
          {copiedSection === 'main' ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 mr-2" />
              Copy Enhanced Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
}