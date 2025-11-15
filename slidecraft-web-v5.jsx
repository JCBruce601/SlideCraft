import React, { useState } from 'react';
import { FileDown, Palette, Building2, FileText, Sparkles, ChevronRight, Menu, X, Church, Users } from 'lucide-react';

export default function SlideCraftBuilder() {
  const [activeTab, setActiveTab] = useState('quick');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('software_professional');
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

Use the v4 Pro presentation generator with the selected theme. Include:
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

Use the v4 Pro presentation generator with template_library. Populate the template with the provided data and apply the ${selectedTheme} theme.`;
      }

      // Call Claude API
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.content[0].text;

      setResult({
        success: true,
        message: responseText,
        mode: activeTab,
        theme: themes.find(t => t.id === selectedTheme)?.name,
        template: activeTab === 'template' ? templates[Object.keys(templates).find(cat => 
          templates[cat].some(t => t.id === selectedTemplate)
        )]?.find(t => t.id === selectedTemplate)?.name : null
      });

    } catch (error) {
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedTemplateObj = selectedTemplate ? 
    Object.values(templates).flat().find(t => t.id === selectedTemplate) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            <span className="text-xs sm:text-sm font-semibold text-indigo-600">v4 Pro</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            Presentation Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Professional PowerPoint in minutes
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            10 themes • 9 templates • Free
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('quick')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all ${
                activeTab === 'quick'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
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
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
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
                  <label htmlFor="topic-input" className="block text-sm font-semibold text-gray-700 mb-2">
                    What's your presentation about?
                  </label>
                  <input
                    id="topic-input"
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    placeholder="e.g., Q4 Business Results, Product Launch"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    aria-required="true"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="slides-input" className="block text-sm font-semibold text-gray-700 mb-2">
                      Slides
                    </label>
                    <input
                      id="slides-input"
                      type="number"
                      value={formData.slides}
                      onChange={(e) => setFormData({...formData, slides: e.target.value})}
                      min="3"
                      max="20"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg"
                      aria-label="Number of slides"
                    />
                  </div>
                  <div>
                    <label htmlFor="company-input" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="company-input"
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                      placeholder="Your company"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="presenter-input" className="block text-sm font-semibold text-gray-700 mb-2">
                      Presenter <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="presenter-input"
                      type="text"
                      value={formData.presenter}
                      onChange={(e) => setFormData({...formData, presenter: e.target.value})}
                      placeholder="Your name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Additional Context - Collapsible */}
                <div className="border-t pt-4">
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2"
                    aria-expanded={showContext}
                  >
                    <span>
                      💬 Additional Context <span className="text-gray-400 font-normal">(optional but helpful)</span>
                    </span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${showContext ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showContext && (
                    <div className="mt-3">
                      <label htmlFor="context-input" className="block text-sm text-gray-600 mb-2">
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
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                      />
                      <p className="mt-2 text-xs text-gray-500">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Choose a Template
                  </label>
                  
                  {/* Tyler Templates Notice */}
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                    <p className="text-blue-800 font-semibold mb-1">💼 Tyler Custom Templates</p>
                    <p className="text-blue-700">
                      Upload your Tyler .pptx templates to the project to use them here. 
                      They'll appear in the "Tyler" category with your brand colors and layouts.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(templates).map(([category, temps]) => (
                      <div key={category}>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {temps.map(template => (
                            <button
                              key={template.id}
                              onClick={() => setSelectedTemplate(template.id)}
                              className={`p-3 sm:p-4 text-left rounded-lg border-2 transition-all ${
                                selectedTemplate === template.id
                                  ? 'border-indigo-600 bg-indigo-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              aria-pressed={selectedTemplate === template.id}
                            >
                              <div className="font-semibold text-sm sm:text-base text-gray-900">{template.name}</div>
                              <div className="text-xs sm:text-sm text-gray-600">{template.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Template Fields */}
                {selectedTemplateObj && (
                  <div className="border-t pt-4 sm:pt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Fill in the details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {selectedTemplateObj.fields.map(field => (
                        <div key={field}>
                          <label htmlFor={`field-${field}`} className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                            {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </label>
                          <input
                            id={`field-${field}`}
                            type="text"
                            value={templateData[field] || ''}
                            onChange={(e) => setTemplateData({...templateData, [field]: e.target.value})}
                            placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Selection */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
              <button
                onClick={() => setShowThemes(!showThemes)}
                className="flex items-center justify-between w-full sm:w-auto text-sm font-semibold text-gray-700 mb-3"
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
                        ? 'border-indigo-600 ring-2 ring-indigo-200'
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
                    <div className="text-xs font-semibold text-gray-900 truncate">{theme.name}</div>
                    <div className="text-xs text-gray-500 truncate hidden sm:block">{theme.desc}</div>
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
          <div className={`mt-6 p-6 rounded-xl ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {result.success ? (
              <div>
                <div className="flex items-center gap-2 text-green-800 font-semibold mb-3">
                  <FileDown className="w-5 h-5" />
                  Presentation Created!
                </div>
                <div className="text-sm text-green-700 mb-4">
                  <strong>Theme:</strong> {result.theme}
                  {result.template && <> • <strong>Template:</strong> {result.template}</>}
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200 text-sm text-gray-700 whitespace-pre-wrap">
                  {result.message}
                </div>
                <div className="mt-4 text-xs text-green-600">
                  💡 Tip: Claude will provide you with the presentation file or code to generate it. 
                  Check the response above for download links or instructions.
                </div>
              </div>
            ) : (
              <div>
                <div className="text-red-800 font-semibold mb-2">Error</div>
                <div className="text-sm text-red-700">{result.error}</div>
              </div>
            )}
          </div>
        )}

        {/* Features Footer */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
            <div className="text-sm sm:text-base font-semibold text-gray-900">10 Themes</div>
            <div className="text-xs sm:text-sm text-gray-600">Professional designs</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
            <div className="text-sm sm:text-base font-semibold text-gray-900">9 Templates</div>
            <div className="text-xs sm:text-sm text-gray-600">Quick start options</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
            <div className="text-sm sm:text-base font-semibold text-gray-900">Brand Kits</div>
            <div className="text-xs sm:text-sm text-gray-600">Auto-apply your brand</div>
          </div>
        </div>
      </div>
    </div>
  );
}
