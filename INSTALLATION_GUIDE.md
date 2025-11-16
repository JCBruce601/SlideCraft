# 🚀 SlideCraft Installation Guide

**Step-by-step guide to install and run SlideCraft**

---

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Anthropic API key (for AI-Powered mode)

---

## Installation Steps

### 1. Download or Clone

**Option A: Git Clone**
```bash
git clone https://github.com/yourusername/SlideCraft.git
cd SlideCraft
```

**Option B: Download ZIP**
1. Download the ZIP file
2. Extract to a folder
3. Open terminal in that folder

---

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

**What gets installed:**
- `streamlit>=1.28.0` - Web interface framework
- `python-pptx>=0.6.21` - PowerPoint file generation
- `Pillow>=10.0.0` - Image processing
- `anthropic>=0.18.0` - Claude AI integration
- `python-dotenv>=1.0.0` - Environment variable management

**If you encounter issues:**
```bash
# Try with pip3
pip3 install -r requirements.txt

# Or use a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

### 3. Set Up API Key

**For Local Development:**

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your favorite editor
nano .env
# or
code .env
# or
notepad .env
```

**Add your API key:**
```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
OUTPUT_DIR=./outputs
```

**Get your API key:**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to Settings → API Keys
4. Create a new key
5. Copy and paste into .env

---

### 4. Run SlideCraft

```bash
streamlit run app.py
```

**You should see:**
```
  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
  Network URL: http://192.168.x.x:8501
```

Open http://localhost:8501 in your browser!

---

## Deployment to Streamlit Cloud

### 1. Push to GitHub

```bash
# Initialize git if needed
git init
git add .
git commit -m "Initial commit of SlideCraft"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/slidecraft.git
git push -u origin main
```

### 2. Deploy on Streamlit Cloud

1. Go to https://share.streamlit.io/
2. Click **"New app"**
3. Connect your GitHub account
4. Select repository: `yourusername/slidecraft`
5. Set branch: `main`
6. Set main file: `app.py`
7. Click **"Deploy"**

### 3. Add Secrets

1. In your deployed app, click ⋮ → **Settings**
2. Click **Secrets** in left sidebar
3. Add your API key in TOML format:
```toml
ANTHROPIC_API_KEY = "sk-ant-api03-YOUR_KEY_HERE"
```
4. Click **Save**
5. App will restart automatically

**Your app is now live!** 🎉

---

## Testing the Installation

### Test 1: Quick Create (No API Key Needed)

1. Click **☀️** to toggle light mode
2. Select **"Quick Create"** mode
3. Choose a theme (try "Church Warmth")
4. Enter topic: "Test Presentation"
5. Leave context empty
6. Set slides: 5
7. Click **"🎨 Generate Presentation"**
8. Download and open in PowerPoint

**Expected result:** 5-slide presentation with title, agenda, sections, and thank you slide.

### Test 2: AI-Powered (Requires API Key)

1. Select **"AI-Powered ✨"** mode
2. Enter topic: "The Power of Gratitude"
3. Paste content:
```
Main Points:
1. Gratitude improves mental health
2. Practicing daily gratitude
3. Sharing gratitude with others

Benefits:
- Better sleep
- Reduced stress
- Stronger relationships
```
4. Type: General
5. Click **"✨ Generate with AI"**

**Expected result:** Professional presentation with AI-structured content and speaker notes.

### Test 3: Template Mode

1. Select **"Template-Based"** mode
2. Category: Church
3. Template: Sunday Sermon
4. Fill in all fields
5. Click **"🎨 Generate from Template"**

**Expected result:** Sermon presentation following template structure.

---

## Common Issues and Solutions

### Issue: "ModuleNotFoundError: No module named 'streamlit'"

**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: "Port 8501 is already in use"

**Solution:**
```bash
# Kill existing Streamlit process
pkill -f streamlit

# Or use a different port
streamlit run app.py --server.port 8502
```

### Issue: "ANTHROPIC_API_KEY not found"

**Solution:**
1. Make sure `.env` file exists in the same directory as `app.py`
2. Check that the key is on a line like: `ANTHROPIC_API_KEY=sk-ant-...`
3. Restart Streamlit after creating `.env`

### Issue: Text not visible in light mode

**Solution:**
- Restart Streamlit: Press Ctrl+C, then `streamlit run app.py`
- Toggle between dark 🌙 and light ☀️ modes

### Issue: Presentations not downloading

**Solution:**
- Check browser download settings
- Disable popup blockers for localhost
- Check `outputs/` folder for generated files

### Issue: Fonts look different

**Solution:**
- Install the fonts on your system (Arial, Calibri, Times New Roman)
- Or edit themes in `slidecraft_v5.py` to use available fonts

---

## Verifying Installation

Run this test script:

```bash
python -c "
import streamlit
import pptx
import anthropic
import PIL
from dotenv import load_dotenv
print('✅ All dependencies installed successfully!')
print(f'Streamlit version: {streamlit.__version__}')
print(f'python-pptx version: {pptx.__version__}')
"
```

**Expected output:**
```
✅ All dependencies installed successfully!
Streamlit version: 1.28.0
python-pptx version: 0.6.21
```

---

## Next Steps

1. ✅ Installation complete
2. 📖 Read `README.md` for full documentation
3. 🎨 Try different themes and templates
4. 🤖 Test AI-powered generation
5. 🎯 Customize themes and templates for your needs
6. 🌐 Deploy to Streamlit Cloud for public access

---

## Need Help?

- Check `README.md` for detailed feature documentation
- Review `SKILL_PACKAGE.md` for customization guides
- Check `troubleshooting` section in README
- Test with example inputs first

---

**Installation complete! Start creating presentations! 🎉**
