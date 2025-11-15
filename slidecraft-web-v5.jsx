import React, { useState } from 'react';
import { FileDown, Palette, Building2, FileText, Sparkles, ChevronRight, Menu, X, Church, Users, Moon, Sun } from 'lucide-react';

export default function SlideCraftBuilder() {
  const [activeTab, setActiveTab] = useState('quick');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('software_professional');
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    slides: '8',
    company_name: '',
    presenter: '',
    additionalContext: ''
  });
  const [templateData, setTemplateData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showThemes, setShowThemes] = useState(false);
  const [showContext, setShowContext] = useState(false);

  // Themes
  const themes = [
    { id: 'software_professional', name: 'Software Professional', desc: 'Tech/enterprise', color: '#1C3A56' },
    { id: 'church_warmth', name: 'Church Warmth', desc: 'Ministry', color: '#78512D' },
    { id: 'startup_vibrant', name: 'Startup Vibrant', desc: 'Bold & energetic', color: '#FF6B35' },
    { id: 'executive_minimal', name: 'Executive Minimal', desc: 'Clean C-suite', color: '#2C3E50' },
    { id: 'creative_bold', name: 'Creative Bold', desc: 'Vibrant creative', color: '#5D3A9B' },
    { id: 'tech_modern', name: 'Tech Modern', desc: 'Modern SaaS', color: '#0A192F' },
    { id: 'healthcare_trust', name: 'Healthcare Trust', desc: 'Medical', color: '#0E4C92' },
    { id: 'education_friendly', name: 'Education Friendly', desc: 'Approachable', color: '#2A7C6F' },
    { id: 'finance_corporate', name: 'Finance Corporate', desc: 'Conservative', color: '#003049' },
    { id: 'marketing_dynamic', name: 'Marketing Dynamic', desc: 'Eye-catching', color: '#D62828' },
    { id: 'nonprofit_warm', name: 'Nonprofit Warm', desc: 'Compassionate', color: '#4A5859' },
  ];

  // Templates by category
  const templates = {
    church: [
      { id: 'sermon', name: 'Sunday Sermon', desc: 'Scripture, points & application', icon: Church, fields: ['sermon_title', 'scripture_reference', 'date', 'context_1', 'point_1_title', 'application_1'] },
      { id: 'church_board', name: 'Board Meeting', desc: 'Leadership & decisions', icon: Users, fields: ['church_name', 'meeting_date', 'attendance', 'income', 'expenses', 'decision_1'] },
      { id: 'staff_meeting', name: 'Staff Meeting', desc: 'Weekly coordination', icon: FileText, fields: ['church_name', 'week_of', 'services', 'theme', 'prayer_1'] },
    ],
    custom: [
      { id: 'custom_template', name: 'Custom Template', desc: 'Use your uploaded template', fields: ['title', 'presenter', 'date', 'content'], isCustomTemplate: true, icon: Building2 },
    ],
    business: [
      { id: 'quarterly_review', name: 'Quarterly Business Review', desc: 'Executive QBR with financials', fields: ['quarter', 'company_name', 'revenue', 'growth', 'customers'], icon: Building2 },
      { id: 'sales_pitch', name: 'Sales Pitch Deck', desc: 'Product pitch for prospects', fields: ['product_name', 'tagline', 'pain_1', 'benefit_1', 'price_1'], icon: Sparkles },
      { id: 'investor_pitch', name: 'Investor Pitch', desc: 'Fundraising deck', fields: ['company_name', 'tagline', 'market_size', 'raise_amount', 'revenue'], icon: Sparkles },
    ],
    marketing: [
      { id: 'campaign_review', name: 'Campaign Review', desc: 'Marketing performance', fields: ['campaign_name', 'objective', 'budget', 'impressions', 'roi'], icon: FileText },
      { id: 'product_launch', name: 'Product Launch', desc: 'GTM strategy', fields: ['product_name', 'description', 'target', 'date', 'channel_1'], icon: Sparkles },
    ],
    education: [
      { id: 'course_overview', name: 'Course Overview', desc: 'Syllabus intro', fields: ['course_name', 'instructor_name', 'objective_1', 'topic_1', 'textbook'], icon: FileText },
      { id: 'training_module', name: 'Training Module', desc: 'Employee training', fields: ['training_topic', 'objective_1', 'section_1_title', 'takeaway_1'], icon: FileText },
    ],
    government: [
      { id: 'policy_briefing', name: 'Policy Briefing', desc: 'Policy proposal', fields: ['policy_name', 'summary_1', 'current_1', 'provision_1', 'budget_impact'], icon: Building2 },
      { id: 'public_meeting', name: 'Public Meeting', desc: 'Community hearing', fields: ['meeting_topic', 'date', 'agenda_1', 'overview_1', 'contact'], icon: Users },
    ],
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Validate inputs
      if (activeTab === 'quick' && !formData.topic) {
        throw new Error('Please enter a presentation topic');
      }

      if (activeTab === 'template' && !selectedTemplate) {
        throw new Error('Please select a template');
      }

      // Build prompt based on mode
      let prompt = '';

      if (activeTab === 'quick') {
        // Quick create mode
        prompt = `Create a professional PowerPoint presentation about "${formData.topic}".

Theme: ${selectedTheme}
Number of slides: ${formData.slides}
${formData.company_name ? `Company: ${formData.company_name}` : ''}
${formData.presenter ? `Presenter: ${formData.presenter}` : ''}

${formData.additionalContext ? `Additional Context:
${formData.additionalContext}

Please use the context above to inform the slide content. If there's an agenda or outline, structure the presentation to match it.
` : ''}

Use the v5 Pro presentation generator with the selected theme. Include:
- Title slide
- Agenda/overview${formData.additionalContext ? ' (based on context provided)' : ''}
- ${parseInt(formData.slides) - 3} content slides with relevant bullet points
- Conclusion with next steps
- Speaker notes for each slide

Make it professional and ready to present.`;
      } else {
        // Template mode
        const template = Object.values(templates).flat().find(t => t.id === selectedTemplate);
        if (!template) {
          throw new Error('Please select a template');
        }

        prompt = `Create a PowerPoint presentation using the "${template.name}" template.

Template: ${selectedTemplate}
Theme: ${selectedTheme}
Template data:
${Object.entries(templateData).map(([k, v]) => `${k}: ${v}`).join('\n')}

Use the v5 Pro presentation generator with template_library. Populate the template with the provided data and apply the ${selectedTheme} theme.`;
      }

      // NOTE: This component is designed to work with a backend API or Streamlit app
      // For production use, replace this with your backend endpoint
      // The Streamlit app (app.py) is the recommended way to use this tool

      // Check for environment variable or use local backend
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || '/api/generate';

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: activeTab,
          theme: selectedTheme,
          formData: activeTab === 'quick' ? formData : templateData,
          templateId: activeTab === 'template' ? selectedTemplate : null,
          prompt: prompt
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}. Please ensure the backend is running or use the Streamlit app (app.py) instead.`);
      }

      const data = await response.json();

      setResult({
        success: true,
        message: data.message || 'Presentation generated successfully!',
        mode: activeTab,
        theme: themes.find(t => t.id === selectedTheme)?.name,
        template: activeTab === 'template' ? templates[Object.keys(templates).find(cat =>
          templates[cat].some(t => t.id === selectedTemplate)
        )]?.find(t => t.id === selectedTemplate)?.name : null,
        filepath: data.filepath
      });

    } catch (error) {
      setResult({
        success: false,
        error: error.message || 'An error occurred while generating the presentation'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedTemplateObj = selectedTemplate ?
    Object.values(templates).flat().find(t => t.id === selectedTemplate) : null;

  return (
    <div className={`min-h-screen p-3 sm:p-6 transition-colors ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="flex-1" />
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className={`text-xs sm:text-sm font-semibold text-indigo-600`}>v5 Pro</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-4 p-2 rounded-full shadow-sm transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Presentation Generator
          </h1>
          <p className={`text-sm sm:text-base px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Professional PowerPoint in minutes
          </p>
          <p className={`text-xs sm:text-sm mt-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            11 themes • 10 templates • Free
          </p>
        </div>

        {/* Main Card */}
        <div className={`rounded-xl sm:rounded-2xl shadow-xl overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Tabs */}
          <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setActiveTab('quick')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${
                activeTab === 'quick'
                  ? darkMode
                    ? 'bg-indigo-900/50 text-indigo-400 border-b-2 border-indigo-500'
                    : 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : darkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
              role="tab"
              aria-selected={activeTab === 'quick'}
              aria-controls="quick-panel"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Quick Create</span>
              <span className="sm:hidden">Quick</span>
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${
                activeTab === 'template'
                  ? darkMode
                    ? 'bg-indigo-900/50 text-indigo-400 border-b-2 border-indigo-500'
                    : 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : darkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
              role="tab"
              aria-selected={activeTab === 'template'}
              aria-controls="template-panel"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Use Template</span>
              <span className="sm:hidden">Template</span>
            </button>
          </div>

          <div className="p-4 sm:p-8" role="tabpanel" id={activeTab === 'quick' ? 'quick-panel' : 'template-panel'}>
            {/* Quick Create Mode */}
            {activeTab === 'quick' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="topic-input" className={`block text-sm font-semibold mb-2 ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    What's your presentation about?
                  </label>
                  <input
                    id="topic-input"
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    placeholder="e.g., Q4 Business Results, Product Launch"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    aria-required="true"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="slides-input" className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Slides
                    </label>
                    <input
                      id="slides-input"
                      type="number"
                      value={formData.slides}
                      onChange={(e) => setFormData({...formData, slides: e.target.value})}
                      min="3"
                      max="20"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      aria-label="Number of slides"
                    />
                  </div>
                  <div>
                    <label htmlFor="company-input" className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Company <span className={darkMode ? 'text-gray-400' : 'text-gray-500'} style={{fontWeight: 'normal'}}>(optional)</span>
                    </label>
                    <input
                      id="company-input"
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                      placeholder="Your company"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="presenter-input" className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Presenter <span className={darkMode ? 'text-gray-400' : 'text-gray-500'} style={{fontWeight: 'normal'}}>(optional)</span>
                    </label>
                    <input
                      id="presenter-input"
                      type="text"
                      value={formData.presenter}
                      onChange={(e) => setFormData({...formData, presenter: e.target.value})}
                      placeholder="Your name"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Additional Context - Collapsible */}
                <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className={`flex items-center justify-between w-full text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                    aria-expanded={showContext}
                  >
                    <span>
                      💬 Additional Context <span className={`font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>(optional but helpful)</span>
                    </span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${showContext ? 'rotate-90' : ''}`} />
                  </button>

                  {showContext && (
                    <div className="mt-3">
                      <label htmlFor="context-input" className={`block text-sm mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Add meeting agenda, notes, or any context to help generate better slides
                      </label>
                      <textarea
                        id="context-input"
                        value={formData.additionalContext}
                        onChange={(e) => setFormData({...formData, additionalContext: e.target.value})}
                        placeholder="e.g., Meeting agenda:
1. Review Q4 results
2. Discuss new product launch
3. Team updates
4. Next quarter goals

Or paste notes, outlines, bullet points, etc."
                        rows="6"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        💡 Tip: Paste your meeting agenda, outline, or notes here. The AI will use this to create more relevant slides.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Template Mode */}
            {activeTab === 'template' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Choose a Template
                  </label>

                  {/* Tyler Templates Notice */}
                  <div className={`mb-4 p-3 border rounded-lg text-sm ${
                    darkMode
                      ? 'bg-blue-900/30 border-blue-700'
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <p className={`font-semibold mb-1 ${
                      darkMode ? 'text-blue-300' : 'text-blue-800'
                    }`}>💼 Tyler Custom Templates</p>
                    <p className={darkMode ? 'text-blue-200' : 'text-blue-700'}>
                      Upload your Tyler .pptx templates to the project to use them here.
                      They'll appear in the "Tyler" category with your brand colors and layouts.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(templates).map(([category, temps]) => (
                      <div key={category}>
                        <h3 className={`text-xs sm:text-sm font-semibold uppercase mb-2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {temps.map(template => (
                            <button
                              key={template.id}
                              onClick={() => setSelectedTemplate(template.id)}
                              className={`p-3 sm:p-4 text-left rounded-lg border-2 transition-all ${
                                selectedTemplate === template.id
                                  ? darkMode
                                    ? 'border-indigo-500 bg-indigo-900/30'
                                    : 'border-indigo-600 bg-indigo-50'
                                  : darkMode
                                    ? 'border-gray-700 hover:border-gray-600 bg-gray-700/50'
                                    : 'border-gray-200 hover:border-gray-300'
                              }`}
                              aria-pressed={selectedTemplate === template.id}
                            >
                              <div className={`font-semibold text-sm sm:text-base ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>{template.name}</div>
                              <div className={`text-xs sm:text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>{template.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Template Fields */}
                {selectedTemplateObj && (
                  <div className={`border-t pt-4 sm:pt-6 ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className={`text-sm font-semibold mb-3 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Fill in the details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {selectedTemplateObj.fields.map(field => (
                        <div key={field}>
                          <label htmlFor={`field-${field}`} className={`block text-xs sm:text-sm font-medium mb-1 ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </label>
                          <input
                            id={`field-${field}`}
                            type="text"
                            value={templateData[field] || ''}
                            onChange={(e) => setTemplateData({...templateData, [field]: e.target.value})}
                            placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Selection */}
            <div className={`mt-6 sm:mt-8 pt-4 sm:pt-6 border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setShowThemes(!showThemes)}
                className={`flex items-center justify-between w-full sm:w-auto text-sm font-semibold mb-3 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
                aria-expanded={showThemes}
                aria-controls="theme-selector"
              >
                <span>
                  <Palette className="w-4 h-4 inline mr-1" />
                  Choose Theme: <span className="text-indigo-600">{themes.find(t => t.id === selectedTheme)?.name}</span>
                </span>
                <ChevronRight className={`w-5 h-5 sm:hidden transition-transform ${showThemes ? 'rotate-90' : ''}`} />
              </button>

              <div
                id="theme-selector"
                className={`${showThemes ? 'block' : 'hidden sm:block'} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3`}
              >
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      setShowThemes(false);
                    }}
                    className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                      selectedTheme === theme.id
                        ? darkMode
                          ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                          : 'border-indigo-600 ring-2 ring-indigo-200'
                        : darkMode
                          ? 'border-gray-700 hover:border-gray-600'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-pressed={selectedTheme === theme.id}
                    aria-label={`Select ${theme.name} theme`}
                  >
                    <div
                      className="w-full h-6 sm:h-8 rounded mb-1 sm:mb-2"
                      style={{backgroundColor: theme.color}}
                      aria-hidden="true"
                    />
                    <div className={`text-xs font-semibold truncate ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{theme.name}</div>
                    <div className={`text-xs truncate hidden sm:block ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{theme.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || (activeTab === 'quick' && !formData.topic) || (activeTab === 'template' && !selectedTemplate)}
              className="mt-6 sm:mt-8 w-full bg-indigo-600 text-white py-3 sm:py-4 px-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 focus:ring-4 focus:ring-indigo-200"
              aria-label={loading ? 'Generating presentation...' : 'Generate presentation'}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span>Generate Presentation</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={`mt-6 p-6 rounded-xl border ${
            result.success
              ? darkMode
                ? 'bg-green-900/30 border-green-700'
                : 'bg-green-50 border-green-200'
              : darkMode
                ? 'bg-red-900/30 border-red-700'
                : 'bg-red-50 border-red-200'
          }`}>
            {result.success ? (
              <div>
                <div className={`flex items-center gap-2 font-semibold mb-3 ${
                  darkMode ? 'text-green-300' : 'text-green-800'
                }`}>
                  <FileDown className="w-5 h-5" />
                  Presentation Created!
                </div>
                <div className={`text-sm mb-4 ${
                  darkMode ? 'text-green-200' : 'text-green-700'
                }`}>
                  <strong>Theme:</strong> {result.theme}
                  {result.template && <> • <strong>Template:</strong> {result.template}</>}
                </div>
                <div className={`p-4 rounded-lg border text-sm whitespace-pre-wrap ${
                  darkMode
                    ? 'bg-gray-800 border-green-700 text-gray-200'
                    : 'bg-white border-green-200 text-gray-700'
                }`}>
                  {result.message}
                </div>
                <div className={`mt-4 text-xs ${
                  darkMode ? 'text-green-300' : 'text-green-600'
                }`}>
                  💡 Tip: Claude will provide you with the presentation file or code to generate it.
                  Check the response above for download links or instructions.
                </div>
              </div>
            ) : (
              <div>
                <div className={`font-semibold mb-2 ${
                  darkMode ? 'text-red-300' : 'text-red-800'
                }`}>Error</div>
                <div className={`text-sm ${
                  darkMode ? 'text-red-200' : 'text-red-700'
                }`}>{result.error}</div>
              </div>
            )}
          </div>
        )}

        {/* Features Footer */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className={`p-4 sm:p-6 rounded-xl shadow-sm ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
            <div className={`text-sm sm:text-base font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>11 Themes</div>
            <div className={`text-xs sm:text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Professional designs</div>
          </div>
          <div className={`p-4 sm:p-6 rounded-xl shadow-sm ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
            <div className={`text-sm sm:text-base font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>10 Templates</div>
            <div className={`text-xs sm:text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Quick start options</div>
          </div>
          <div className={`p-4 sm:p-6 rounded-xl shadow-sm ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
            <div className={`text-sm sm:text-base font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Brand Kits</div>
            <div className={`text-xs sm:text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Auto-apply your brand</div>
          </div>
        </div>
      </div>
    </div>
  );
}
