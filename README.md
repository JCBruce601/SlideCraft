# 🎨 SlideCraft v5.0

**Presentations that inspire, in seconds**

A powerful AI-powered presentation generator with professional themes, templates, and smart content creation. Compete with Gamma.app, Beautiful.ai, and Canva - but completely free and open source!

## ✨ New in v5.0

- 🤖 **AI-Powered Generation**: Paste your notes, agenda, or sermon outline - Claude creates professional slides automatically
- 📤 **Custom Template Upload**: Upload your own .pptx templates and use them with AI or manual modes
- 🎨 **Premium Slide Types**: Quote slides, Stats slides, and more (Gamma.app quality)
- 🌙 **Dark/Light Mode**: Toggle between light and dark themes for comfortable viewing
- 📝 **Smart Speaker Notes**: AI generates comprehensive speaker notes for every slide

## Features

- ✨ **AI-Powered Mode**: Just paste your content - Claude structures everything (sermons, business, education)
- 📋 **10 Professional Templates**: Sermon, Board Meeting, Sales Pitch, QBR, and more
- 🎨 **11 Beautiful Themes**: Church, Corporate, Startup, Healthcare, Education, etc.
- 📝 **Smart Layouts**: Automatic slide design with proper spacing and formatting
- 🔤 **Large, Visible Text**: Professional font sizes for easy reading
- 📊 **6 Slide Types**: Title, Content, Section, Two-Column, Quote, Stats
- 📤 **Custom Templates**: Upload and use your own .pptx templates
- 🌙 **Dark Mode**: Comfortable viewing in any lighting condition

## Template Categories

### ⛪ Church (3 templates)
- Sunday Sermon - Scripture, points & application
- Board Meeting - Leadership & decisions
- Staff Meeting - Weekly coordination

### 💼 Business (3 templates)
- Quarterly Review - Executive QBR
- Sales Pitch - Product presentations
- Investor Pitch - Fundraising decks

### 📢 Marketing (2 templates)
- Campaign Review - Performance analysis
- Product Launch - GTM strategy

### 📚 Education (1 template)
- Course Overview - Syllabus introduction

### 🏛️ Government (1 template)
- Policy Briefing - Proposals & hearings

## Quick Start (Local)

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Set up AI (optional but recommended):**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get your API key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=your_api_key_here
```

3. **Run the app:**
```bash
streamlit run app.py
```

4. **Access in browser:**
Open http://localhost:8501

**Note:** AI-Powered mode requires an Anthropic API key. You can still use Quick Create, Template-Based, and Custom Template Upload modes without an API key.

## Deploy to Streamlit Cloud (Free)

### Option 1: Via GitHub

1. **Create a GitHub repository:**
   - Go to github.com
   - Click "New repository"
   - Name it `slidecraft`
   - Make it public

2. **Upload these files to your repo:**
   - `app.py`
   - `slidecraft_v5.py`
   - `requirements.txt`
   - `README.md`

3. **Deploy on Streamlit Cloud:**
   - Go to share.streamlit.io
   - Click "New app"
   - Connect your GitHub account
   - Select your repository
   - Set main file: `app.py`
   - Click "Deploy"

4. **Get your public URL:**
   - Format: `https://yourapp.streamlit.app`
   - Share this link with anyone!

### Option 2: Direct Upload (No GitHub)

1. **Go to Streamlit Community Cloud:**
   - Visit share.streamlit.io
   - Sign up/login

2. **Upload files:**
   - Use drag-and-drop interface
   - Upload all 4 files

3. **Deploy:**
   - Click "Deploy"
   - Get your public URL

## Usage

### AI-Powered Mode ✨ (Recommended)
1. Select a theme from the sidebar
2. Enter your presentation topic
3. Paste your content: notes, agenda, sermon outline, scripture references, bullet points - anything!
4. Choose presentation type (Sermon, Business, Education, General)
5. Optionally specify target number of slides (or let AI decide)
6. Click "Generate with AI"
7. Download your professional presentation with speaker notes!

**Example Input:**
```
Topic: Walking in Faith
Content:
Scripture: Hebrews 11:1-6

Main Points:
1. Faith is substance - it's real and tangible
2. Faith pleases God
3. Faith requires action

Application:
- Trust God in one specific area this week
- Look for evidence of God's faithfulness
```

### Quick Create Mode
1. Select a theme
2. Enter your presentation topic
3. Optionally add context (agenda, outline)
4. Click "Generate Presentation"
5. Download your .pptx file

### Template-Based Mode
1. Select a category (Church, Business, etc.)
2. Choose a template
3. Fill in the required fields
4. Click "Generate from Template"
5. Download your .pptx file

### Custom Template Upload
1. Click "Upload Template (.pptx)"
2. Select your .pptx file
3. View template analysis (slides, layouts, size)
4. Template is saved for future use
5. Coming soon: Use custom templates with AI generation

## File Structure

```
SlideCraft/
├── app.py                    # Streamlit web interface (with AI mode)
├── slidecraft_v5.py          # Core presentation engine (6 slide types)
├── ai_generator.py           # AI content generation using Claude
├── requirements.txt          # Python dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── AI_UPGRADE_PLAN.md       # Development roadmap
├── IMPROVEMENTS.md          # Changelog
└── templates/
    └── custom/              # User-uploaded templates (created on first upload)
```

## Themes

1. 💻 **Software Professional** - Tech/Enterprise
2. ⛪ **Church Warmth** - Ministry presentations
3. 🚀 **Startup Vibrant** - Bold & energetic
4. 💼 **Executive Minimal** - Clean C-suite style
5. 🎭 **Creative Bold** - Vibrant creative
6. 💻 **Tech Modern** - Modern SaaS
7. 🏥 **Healthcare Trust** - Medical presentations
8. 📚 **Education Friendly** - Approachable learning
9. 💰 **Finance Corporate** - Conservative finance
10. 📢 **Marketing Dynamic** - Eye-catching marketing
11. 🤝 **Nonprofit Warm** - Compassionate nonprofits

## Technical Details

- **Python Version**: 3.8+
- **Main Libraries**:
  - python-pptx (PowerPoint generation)
  - anthropic (Claude AI integration)
  - streamlit (web interface)
  - python-dotenv (environment variables)
- **AI Model**: Claude Sonnet 4.5 (claude-sonnet-4-20250514)
- **Output Format**: .pptx (compatible with PowerPoint & Google Slides)
- **Slide Format**: 16:9 Widescreen
- **Slide Types**: Title, Content, Section, Two-Column, Quote, Stats

## Font Sizes (Optimized for Visibility)

- **Title Slides**: 66pt (main title), 32pt (subtitle)
- **Content Headers**: 44pt
- **Bullet Points**: 26pt
- **Section Headers**: 54pt

## Customization

### Adding Your Own Theme

Edit `slidecraft_v5.py` and add to `ThemeGallery.THEMES`:

```python
'your_theme': Theme(
    'Your Theme Name', 'Description',
    {
        'primary': '#HEX_COLOR',
        'primary_light': '#HEX_COLOR',
        'secondary': '#HEX_COLOR',
        'accent': '#HEX_COLOR',
        'accent_light': '#HEX_COLOR',
        'light': '#HEX_COLOR',
        'text': '#HEX_COLOR',
        'text_light': '#HEX_COLOR'
    },
    {'heading': 'Font Name Bold', 'body': 'Font Name'},
    'style_keyword'
)
```

### Adding Your Own Template

Add to `TEMPLATE_LIBRARY` in `slidecraft_v5.py`:

```python
'template_id': {
    'name': 'Template Name',
    'category': 'category_name',
    'description': 'Brief description',
    'theme': 'default_theme',
    'slides': [
        {'type': 'title', 'title': '{field_name}', 'subtitle': '{field_name}'},
        {'type': 'content', 'title': 'Slide Title', 'bullets': [
            '{field_name}',
            '{field_name}'
        ]}
    ]
}
```

## Why SlideCraft vs. Gamma.app, Beautiful.ai, Canva?

| Feature | SlideCraft | Gamma.app | Beautiful.ai | Canva |
|---------|-----------|-----------|--------------|-------|
| AI Content Generation | ✅ Claude Sonnet 4.5 | ✅ | ✅ | ❌ |
| Custom Template Upload | ✅ | ❌ | ❌ | ✅ |
| Offline Use | ✅ | ❌ | ❌ | ❌ |
| Free & Open Source | ✅ | ❌ ($8-40/mo) | ❌ ($12-50/mo) | ❌ (Freemium) |
| Professional Themes | ✅ 11 | ✅ | ✅ | ✅ |
| Speaker Notes | ✅ AI-generated | ✅ | ❌ | ❌ |
| PowerPoint Export | ✅ Native | ✅ | ✅ | ✅ |
| Privacy | ✅ Self-hosted | ❌ Cloud | ❌ Cloud | ❌ Cloud |
| No Login Required | ✅ | ❌ | ❌ | ❌ |

**SlideCraft Advantages:**
- 100% free, unlimited presentations
- Run locally or deploy to your own server
- Your data never leaves your infrastructure (when self-hosted)
- Fully customizable code - add your own features
- No monthly subscription fees
- Upload and use your organization's official templates

## Troubleshooting

**Issue**: AI generation fails
- **Solution**: Check your API key in .env file. Verify you have credits at https://console.anthropic.com/
- **Solution**: Check error message - may need to reduce content length or adjust number of slides

**Issue**: API key not detected
- **Solution**: Make sure .env file is in the same directory as app.py
- **Solution**: Restart the Streamlit app after creating/editing .env
- **Alternative**: Enter API key directly in the UI (will need to re-enter each session)

**Issue**: Fonts look different
- **Solution**: Install the fonts on your system or update theme fonts in the code

**Issue**: Slides not downloading
- **Solution**: Check browser download settings and popup blockers

**Issue**: Template fields not populating
- **Solution**: Ensure all required fields are filled in before generating

**Issue**: Custom template upload not working
- **Solution**: Ensure the file is a valid .pptx file
- **Solution**: Check that you have write permissions in the templates/custom/ directory

## Support

For issues or questions:
1. Check this README
2. Review the code comments in `slidecraft_v5.py`
3. Test locally before deploying

## License

Free to use and modify for personal and commercial projects.

## Credits

Built with:
- **Anthropic Claude**: AI content generation (Claude Sonnet 4.5)
- **python-pptx**: PowerPoint generation
- **Streamlit**: Web interface
- **Pillow**: Image processing
- **python-dotenv**: Environment variable management

---

**SlideCraft v5.0** - Presentations that inspire, in seconds ✨
