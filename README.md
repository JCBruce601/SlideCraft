# 🎨 SlideCraft v5.0

**Presentations that inspire, in seconds**

A powerful presentation generator with 11 professional themes and 10 ready-to-use templates.

## Features

- ✨ **Quick Create**: Describe your topic and generate presentations instantly
- 📋 **10 Professional Templates**: Sermon, Board Meeting, Sales Pitch, QBR, and more
- 🎨 **11 Beautiful Themes**: Church, Corporate, Startup, Healthcare, Education, etc.
- 📝 **Smart Layouts**: Automatic slide design with proper spacing and formatting
- 🔤 **Large, Visible Text**: Professional font sizes for easy reading
- 📊 **Multiple Slide Types**: Title, Content, Section, Two-Column layouts

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

2. **Run the app:**
```bash
streamlit run app.py
```

3. **Access in browser:**
Open http://localhost:8501

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

### Quick Create Mode
1. Select a theme
2. Enter your presentation topic
3. Optionally add context (agenda, outline)
4. Click "Generate Presentation"
5. Download your .pptx file

### Template Mode
1. Select a category (Church, Business, etc.)
2. Choose a template
3. Fill in the required fields
4. Click "Generate from Template"
5. Download your .pptx file

## File Structure

```
slidecraft/
├── app.py                 # Streamlit web interface
├── slidecraft_v5.py       # Core presentation engine
├── requirements.txt       # Python dependencies
└── README.md             # This file
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
- **Main Library**: python-pptx (PowerPoint generation)
- **Output Format**: .pptx (compatible with PowerPoint & Google Slides)
- **Slide Format**: 16:9 Widescreen

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

## Troubleshooting

**Issue**: Fonts look different
- **Solution**: Install the fonts on your system or update theme fonts in the code

**Issue**: Slides not downloading
- **Solution**: Check browser download settings and popup blockers

**Issue**: Template fields not populating
- **Solution**: Ensure all required fields are filled in before generating

## Support

For issues or questions:
1. Check this README
2. Review the code comments in `slidecraft_v5.py`
3. Test locally before deploying

## License

Free to use and modify for personal and commercial projects.

## Credits

Built with:
- python-pptx for PowerPoint generation
- Streamlit for web interface
- Pillow for image processing

---

**SlideCraft v5.0** - Presentations that inspire, in seconds ✨
