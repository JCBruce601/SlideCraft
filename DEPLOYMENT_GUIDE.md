# 🚀 SlideCraft Deployment Guide

## What You Have

5 files ready to deploy:
1. `app.py` - Streamlit web interface
2. `slidecraft_v5.py` - Presentation engine
3. `requirements.txt` - Dependencies
4. `README.md` - Full documentation
5. `.gitignore` - Clean git tracking

## Fastest Deployment (5 minutes)

### Step 1: Create GitHub Repository

1. Go to **github.com**
2. Click **"New repository"** (green button)
3. Repository name: `slidecraft`
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Upload Files

Two options:

**Option A: Drag & Drop (Easiest)**
1. On your new repo page, click **"uploading an existing file"**
2. Drag all 5 files into the browser
3. Click **"Commit changes"**

**Option B: Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/slidecraft.git
git push -u origin main
```

### Step 3: Deploy on Streamlit Cloud

1. Go to **share.streamlit.io**
2. Click **"New app"**
3. Connect GitHub (if first time)
4. Select:
   - Repository: `YOUR_USERNAME/slidecraft`
   - Branch: `main`
   - Main file: `app.py`
5. Click **"Deploy!"**

### Step 4: Wait & Share

- Deployment takes 2-3 minutes
- You'll get a URL like: `https://slidecraft-yourname.streamlit.app`
- Share this URL with anyone!

## Test Locally First (Optional)

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run app.py

# Opens in browser at http://localhost:8501
```

## Sharing Instructions

Once deployed, send this to users:

---

**Try SlideCraft!**

Create professional presentations in seconds:
🔗 [YOUR_STREAMLIT_URL]

**How to use:**
1. Pick Quick Create or Template mode
2. Choose a theme (11 options)
3. Fill in your content
4. Download your .pptx file
5. Open in PowerPoint or Google Slides

**Templates available:**
- Church: Sermon, Board Meeting, Staff Meeting
- Business: QBR, Sales Pitch, Investor Pitch
- Marketing: Campaign Review, Product Launch
- Education: Course Overview
- Government: Policy Briefing

---

## Troubleshooting

**"Module not found" error:**
- Check `requirements.txt` is in root folder
- Streamlit will auto-install on deploy

**App won't start:**
- Ensure `app.py` is in root folder
- Check all 3 Python files are uploaded
- View logs in Streamlit dashboard

**Can't find deployed app:**
- Check your Streamlit dashboard at share.streamlit.io
- Look for your app name
- URL is in app settings

## Next Steps

1. **Customize themes** - Edit colors in `slidecraft_v5.py`
2. **Add templates** - Follow template structure in code
3. **Brand it** - Add your logo/colors to themes
4. **Share widely** - The URL is public and free!

## Cost

- **GitHub**: Free for public repos
- **Streamlit Cloud**: Free tier includes:
  - Unlimited public apps
  - 1GB storage per app
  - Community support

Perfect for sharing with teams, churches, or clients!

## Need Help?

1. Read full `README.md`
2. Check Streamlit docs: docs.streamlit.io
3. Review code comments in `app.py`

---

**You're ready to deploy!** 🎉

Follow Step 1-4 above and you'll have a live app in 5 minutes.
