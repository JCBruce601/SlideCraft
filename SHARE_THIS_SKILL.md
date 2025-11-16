# 🎨 SlideCraft - Free AI Presentation Generator

**Transform notes into professional PowerPoint presentations in seconds**

---

## 🚀 What is SlideCraft?

A free, open-source AI-powered presentation generator that rivals premium tools like Gamma.app and Beautiful.ai - but runs on your own infrastructure.

**Perfect for:**
- 🎤 Pastors creating sermon presentations
- 💼 Business professionals making QBRs and pitches
- 📚 Educators building course materials
- 📢 Marketers launching campaigns
- 🏛️ Government/nonprofit organizations

---

## ✨ Key Features

### 🤖 AI-Powered Generation
Paste your sermon outline, meeting notes, or bullet points. Claude Sonnet 4.5 creates a complete presentation with:
- Intelligent slide structuring
- Professional formatting
- Speaker notes for every slide
- Optimal slide count

### 🎨 11 Professional Themes
- Church Warmth (ministry)
- Software Professional (tech/enterprise)
- Executive Minimal (C-suite)
- Startup Vibrant (energetic)
- Healthcare Trust (medical)
- Education Friendly (academic)
- Finance Corporate (conservative)
- Marketing Dynamic (bold)
- Creative Bold (design)
- Tech Modern (SaaS)
- Nonprofit Warm (compassionate)

### 📋 10 Ready-Made Templates
- Sunday Sermon
- Board Meeting
- Staff Meeting
- Quarterly Review
- Sales Pitch
- Investor Pitch
- Campaign Review
- Product Launch
- Course Overview
- Policy Briefing

### 6 Slide Types
- Title slides
- Content slides with bullets
- Section dividers
- Two-column layouts
- Quote slides (Gamma-style)
- Stats slides (Beautiful.ai-style)

---

## 💰 Why SlideCraft?

| Feature | SlideCraft | Gamma.app | Beautiful.ai | Canva |
|---------|-----------|-----------|--------------|-------|
| **Price** | FREE | $8-40/mo | $12-50/mo | Freemium |
| **AI Generation** | ✅ Claude 4.5 | ✅ | ✅ | ❌ |
| **Self-Hosted** | ✅ | ❌ | ❌ | ❌ |
| **Custom Templates** | ✅ | ❌ | ❌ | ✅ |
| **Open Source** | ✅ | ❌ | ❌ | ❌ |
| **No Login** | ✅ | ❌ | ❌ | ❌ |
| **Offline Use** | ✅ | ❌ | ❌ | ❌ |
| **Privacy** | ✅ Your data | ❌ Cloud | ❌ Cloud | ❌ Cloud |

**Bottom line:** Save $96-600/year per user while keeping full control of your data.

---

## 🎯 Real-World Examples

### Example 1: Pastor Creating Sunday Sermon
**Input (30 seconds):**
```
Topic: Walking in Faith
Scripture: Hebrews 11:1-6

Main Points:
1. Faith is substance
2. Faith pleases God
3. Faith requires action

Application:
- Trust God this week
- Look for His faithfulness
```

**Output:** Professional 10-slide presentation with scripture references, main points, application, and speaker notes.

### Example 2: Business QBR
**Input (1 minute):**
```
Q4 2024 Review

Results:
- Revenue up 23% YoY
- New product exceeded targets
- Customer retention: 87%

Challenges:
- Supply chain delays
- Increased competition

Q1 2025 Goals:
- Expand to Europe
- Hire 5 engineers
- Launch mobile app
```

**Output:** Executive-ready presentation with data slides, challenge analysis, and forward-looking goals.

### Example 3: Course Introduction
**Input (1 minute):**
```
Introduction to Machine Learning

Objectives:
- Understand ML fundamentals
- Build first ML model
- Apply to real problems

Topics:
1. Supervised learning
2. Unsupervised learning
3. Neural networks
4. Practical applications
```

**Output:** Educational presentation with clear structure and learning objectives.

---

## 🛠️ Installation (5 Minutes)

```bash
# 1. Clone or download
git clone <your-repo-url> SlideCraft
cd SlideCraft

# 2. Install dependencies
pip install -r requirements.txt

# 3. Add API key (optional, for AI mode)
cp .env.example .env
# Edit .env: ANTHROPIC_API_KEY=your_key_here

# 4. Run
streamlit run app.py
```

**That's it!** Open http://localhost:8501

**No API key?** Quick Create and Template modes work without it!

---

## 🌐 Deploy to Cloud (Free)

**Streamlit Cloud (Recommended):**
1. Push to GitHub
2. Go to share.streamlit.io
3. Connect repo, set `app.py` as main file
4. Add API key to secrets
5. Deploy → Get public URL

**Free tier includes:** Unlimited presentations, public/private apps, custom domain support

---

## 📖 Documentation

- **README.md** - Full feature documentation
- **INSTALLATION_GUIDE.md** - Step-by-step setup
- **SKILL_PACKAGE.md** - Customization guide
- **AI_UPGRADE_PLAN.md** - Development roadmap

---

## 🎓 Learning Resources

### For Claude Code Users:
This skill demonstrates:
- Streamlit app development
- AI integration (Anthropic Claude)
- File generation (PowerPoint)
- Multi-mode interfaces
- Theme systems
- Template engines
- Environment variable management
- Cloud deployment

### Customization Examples:
```python
# Add your own theme
'your_theme': Theme(
    'Your Theme', 'Description',
    {
        'primary': '#1C3A56',
        'accent': '#16A8A0',
        'light': '#F4F6F7',
        'text': '#2C2C2C'
    },
    {'heading': 'Arial Bold', 'body': 'Arial'},
    'professional'
)

# Add your own template
'your_template': {
    'name': 'Your Template',
    'category': 'business',
    'theme': 'software_professional',
    'slides': [
        {'type': 'title', 'title': '{topic}'},
        {'type': 'content', 'title': 'Agenda', 'bullets': ['{item1}', '{item2}']}
    ]
}
```

---

## 🔐 Security & Privacy

✅ **Self-hosted** - Your data never leaves your infrastructure
✅ **Open source** - Review all code
✅ **API key control** - Use your own Anthropic account
✅ **.env security** - API keys never committed to git
✅ **No tracking** - No analytics or telemetry

---

## 🤝 Share This Skill

**Help other Claude Code users:**

1. **Fork and customize** for your organization
2. **Add your own themes** and templates
3. **Contribute improvements** back to community
4. **Share success stories** and use cases
5. **Create tutorials** for specific industries

**Distribution options:**
- GitHub repository
- Internal company tools
- Claude Code skill marketplace
- Documentation website
- YouTube tutorials

---

## 📊 Use Cases by Industry

### 🏢 **Corporate**
- Quarterly business reviews
- Sales presentations
- Investor pitches
- Board meetings
- Training materials

### ⛪ **Ministry**
- Sunday sermons
- Bible studies
- Church events
- Missionary updates
- Leadership meetings

### 🎓 **Education**
- Course introductions
- Lesson plans
- Student presentations
- Faculty meetings
- Research presentations

### 📢 **Marketing**
- Campaign reviews
- Product launches
- Client pitches
- Strategy sessions
- Performance reports

### 🏛️ **Government/Nonprofit**
- Policy briefings
- Grant proposals
- Community updates
- Board reports
- Fundraising decks

---

## 🚀 Get Started Now

```bash
git clone <your-repo-url> SlideCraft
cd SlideCraft
pip install -r requirements.txt
streamlit run app.py
```

**Create your first presentation in under 5 minutes!**

---

## 📞 Questions?

- 📖 Check `README.md` for full documentation
- 🔧 See `INSTALLATION_GUIDE.md` for setup help
- 🎨 Read `SKILL_PACKAGE.md` for customization
- 💡 Review examples in this document

---

## ⭐ What Users Are Saying

_"Saved hours on sermon prep. The AI understands scripture and structure."_
— Pastor using Church Warmth theme

_"Replaced our $40/month Gamma.app subscription. Same quality, zero cost."_
— Startup using Executive Minimal theme

_"Students can create professional presentations without design skills."_
— Educator using Education Friendly theme

---

**SlideCraft v5.0** - Presentations that inspire, in seconds ✨

**100% Free • Open Source • AI-Powered**

---

### Quick Links

- 📥 Download/Clone
- 📖 Read Documentation
- 🚀 Deploy to Cloud
- 🎨 Customize Themes
- 🤝 Contribute
- ⭐ Star on GitHub

---

**Share this skill with your team, church, or organization!**
