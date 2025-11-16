# 📦 SlideCraft - Presentation Generation Skill

**AI-Powered Presentation Generator for Claude Code Users**

Create professional PowerPoint presentations using AI (Claude Sonnet 4.5) with multiple themes, templates, and generation modes. Perfect for sermons, business presentations, educational content, and more.

---

## 🎯 What This Skill Does

SlideCraft enables Claude to generate professional PowerPoint presentations (.pptx files) with:
- **4 Generation Modes**: AI-Powered, Quick Create, Template-Based, Custom Template Upload
- **11 Professional Themes**: Church, Corporate, Startup, Healthcare, Education, Finance, etc.
- **10 Ready-Made Templates**: Sermon, Board Meeting, Sales Pitch, QBR, Policy Briefing, etc.
- **6 Slide Types**: Title, Content, Section, Two-Column, Quote, Stats
- **Dark/Light Mode UI**: Comfortable viewing in any lighting
- **Smart Features**: AI-generated speaker notes, dynamic font sizing, intelligent content parsing

---

## 📋 Quick Start for Claude Code Users

### Step 1: Clone or Download

```bash
# Clone this repository
git clone <your-repo-url> SlideCraft
cd SlideCraft
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

**Dependencies:**
- `streamlit` - Web interface
- `python-pptx` - PowerPoint generation
- `anthropic` - Claude AI integration
- `Pillow` - Image processing
- `python-dotenv` - Environment variables

### Step 3: Configure API Key

**Option A: Local Development**
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

**Option B: Streamlit Cloud Deployment**
Add to Streamlit secrets:
```toml
ANTHROPIC_API_KEY = "your_key_here"
```

### Step 4: Run the App

```bash
streamlit run app.py
```

Open http://localhost:8501 in your browser.

---

## 🎨 Usage Examples

### Example 1: AI-Powered Sermon
```
Mode: AI-Powered ✨
Topic: Walking in Faith
Type: Sermon
Content:
Scripture: Hebrews 11:1-6

Main Points:
1. Faith is substance - it's real and tangible
2. Faith pleases God - without it we can't please Him
3. Faith requires action - examples from Hall of Faith

Application:
- Trust God in one specific area this week
- Look for evidence of God's faithfulness
```
**Result**: 8-12 slides with scripture, points, application, and speaker notes

### Example 2: Quick Business Presentation
```
Mode: Quick Create
Topic: Q4 Business Review
Context:
Revenue Growth:
- Up 23% YoY
- New product launch exceeded targets
- Customer retention at 87%

Q1 Goals:
- Expand into European market
- Hire 5 senior engineers
- Launch mobile app
```
**Result**: Professional slide deck with intelligent structure

### Example 3: Template-Based
```
Mode: Template-Based
Category: Business
Template: Quarterly Review
Fill in: Quarter, Company, Revenue, Growth, Challenges, etc.
```
**Result**: Structured presentation following professional template

---

## 🎨 Available Themes

1. **Software Professional** - Tech/Enterprise (blues, teals)
2. **Church Warmth** - Ministry (warm browns, golds)
3. **Startup Vibrant** - Bold & energetic (orange, blue)
4. **Executive Minimal** - Clean C-suite (grays, blues)
5. **Creative Bold** - Design/marketing (purples, pinks)
6. **Tech Modern** - Modern SaaS (dark blue, cyan)
7. **Healthcare Trust** - Medical (blue, teal)
8. **Education Friendly** - Warm education (green, orange)
9. **Finance Corporate** - Conservative finance (navy, red)
10. **Marketing Dynamic** - Eye-catching (purples, oranges)
11. **Nonprofit Warm** - Compassionate (earth tones)

---

## 📚 File Structure

```
SlideCraft/
├── app.py                    # Main Streamlit web interface
├── slidecraft_v5.py          # Core presentation engine (6 slide types)
├── ai_generator.py           # AI content generation using Claude
├── requirements.txt          # Python dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # Full documentation
├── SKILL_PACKAGE.md         # This file (skill distribution guide)
└── templates/
    └── custom/              # User-uploaded templates
```

---

## 🚀 Deployment Options

### Local Development
```bash
streamlit run app.py
```
Access at http://localhost:8501

### Streamlit Cloud (Free)
1. Push to GitHub
2. Go to share.streamlit.io
3. Connect GitHub repo
4. Set main file: `app.py`
5. Add secrets: `ANTHROPIC_API_KEY`
6. Deploy!

### Docker (Optional)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8501
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

---

## 🔧 Customization Guide

### Add Your Own Theme

Edit `slidecraft_v5.py`, add to `ThemeGallery.THEMES`:

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

### Add Your Own Template

Edit `slidecraft_v5.py`, add to `TEMPLATE_LIBRARY`:

```python
'template_id': {
    'name': 'Template Name',
    'category': 'business|church|marketing|education|government',
    'description': 'Brief description',
    'theme': 'default_theme_id',
    'slides': [
        {'type': 'title', 'title': '{field}', 'subtitle': '{field}'},
        {'type': 'content', 'title': 'Slide Title', 'bullets': ['{field1}', '{field2}']},
        {'type': 'two_column', 'title': 'Comparison',
         'left_header': 'Left', 'right_header': 'Right',
         'left_items': ['{field}'], 'right_items': ['{field}']}
    ]
}
```

---

## 💡 Pro Tips

### For Best AI Results:
- Be specific with your topic
- Paste raw content (don't over-format)
- Use numbered lists for main points
- Include context and background
- Let Claude decide slide count (set to 0)

### For Template Mode:
- Fill all required fields
- Use concise text (slides aren't documents)
- Max 5-6 bullets per slide
- Choose appropriate theme for your audience

### For Custom Templates:
- Use .pptx format only
- Test template in PowerPoint first
- Simple layouts work best
- Avoid complex animations

---

## 🆘 Troubleshooting

**Issue**: AI generation fails
- **Fix**: Check API key, verify Anthropic credits

**Issue**: Text not visible in light mode
- **Fix**: Restart Streamlit after toggling modes

**Issue**: Slides look different than expected
- **Fix**: Fonts may vary by system; install theme fonts or adjust in code

**Issue**: Template upload not working
- **Fix**: Ensure valid .pptx file and write permissions in `templates/custom/`

---

## 📄 License

Free to use and modify for personal and commercial projects.

---

## 🤝 Contributing to This Skill

To improve this skill:
1. Fork the repository
2. Add features or fix bugs
3. Test thoroughly
4. Submit pull request
5. Share with the community!

---

## 🌟 Why Use This Skill?

### vs. Gamma.app, Beautiful.ai, Canva:
✅ **100% Free** - No monthly fees ($0 vs $8-50/mo)
✅ **Privacy** - Self-hosted, your data stays yours
✅ **Customizable** - Full code access, add any features
✅ **Offline Use** - Works without internet (except AI mode)
✅ **AI-Powered** - Claude Sonnet 4.5 integration
✅ **No Login Required** - Just run and use

---

## 📞 Support

For issues or questions:
1. Check README.md
2. Review code comments in `slidecraft_v5.py`
3. Test locally before deploying
4. Share improvements with the community!

---

**Built with:**
- Anthropic Claude Sonnet 4.5
- python-pptx
- Streamlit
- Pillow
- python-dotenv

**SlideCraft v5.0** - Presentations that inspire, in seconds ✨
