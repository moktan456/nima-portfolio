# Nima Dorji Moktan — Portfolio Website

A clean, dark-themed, data-driven portfolio site built with **Tailwind CSS** and **Decap CMS**.

---

## 📁 File Structure

```
portfolio-website/
├── index.html                  ← Main portfolio page
├── netlify.toml                ← Netlify deploy config
├── _data/
│   └── portfolio.json          ← ALL your content lives here
├── assets/
│   ├── js/
│   │   └── app.js              ← Reads portfolio.json and renders the page
│   └── images/                 ← Upload your profile photo here
├── admin/
│   ├── index.html              ← Decap CMS admin interface
│   └── config.yml              ← CMS schema (edit field definitions)
└── Nima_Moktan_..._Resume.pdf  ← Your CV (linked from the Resume button)
```

---

## 🚀 Deployment to Netlify (Step-by-Step)

### Step 1 — Push to GitHub
1. Create a new GitHub repo (e.g. `nima-portfolio`)
2. Upload all these files to it (drag & drop in the GitHub web UI, or use Git)

### Step 2 — Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up / log in
2. Click **"Add new site" → "Import an existing project"**
3. Select **GitHub** and choose your repo
4. Leave all build settings as-is (no build command needed)
5. Click **"Deploy site"**

Your site will be live in ~30 seconds at a URL like `https://amazing-name-123.netlify.app`

### Step 3 — Set up a Custom Domain (Optional)
- In Netlify: **Site Settings → Domain management → Add custom domain**

---

## 🔐 Setting Up the Admin Panel (CMS)

The admin panel lives at `yoursite.netlify.app/admin`.
It uses **Netlify Identity + Git Gateway** so changes save directly to GitHub
and auto-deploy within ~30 seconds.

### One-time Setup:
1. In Netlify: **Site Settings → Identity → Enable Identity**
2. Scroll down to **Registration preferences** → Set to **Invite only** (important!)
3. Click **Services → Git Gateway → Enable Git Gateway**
4. Go to **Identity tab → Invite users** → enter your email
5. Check your email for the invite, click the link, set your password

### Using the Admin Panel:
1. Visit `https://yoursite.netlify.app/admin`
2. Log in with your email & password
3. Click **"Portfolio"** in the left sidebar
4. Edit any field — Personal Info, Skills, Experience, or Education
5. Click **"Publish"** — your site updates in ~30 seconds! ✅

---

## ✏️ Updating Content Manually (Alternative)

If you prefer editing files directly:
1. Open `_data/portfolio.json` in any text editor
2. Edit the relevant fields (name, summary, skills, experience, etc.)
3. Save the file and push to GitHub — Netlify auto-deploys

---

## 🖼️ Adding a Profile Photo

1. Add your photo to `assets/images/profile.jpg`
2. In `index.html`, find the comment `<!-- Replace this div with an <img> tag... -->`
3. Replace the placeholder `<div>` with:
   ```html
   <img src="/assets/images/profile.jpg" alt="Nima Dorji Moktan"
        class="w-full h-full object-cover rounded-2xl" />
   ```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Tailwind CSS](https://tailwindcss.com) (CDN) | Styling |
| [Typed.js](https://mattboldt.com/demos/typed-js/) | Hero typing animation |
| [AOS](https://michalsnik.github.io/aos/) | Scroll animations |
| [Font Awesome](https://fontawesome.com) | Icons |
| [Decap CMS](https://decapcms.org) | Admin panel / content editing |
| [Netlify](https://netlify.com) | Hosting + Identity + Forms |

---

## 📬 Contact Form

The contact form uses **Netlify Forms** — no backend needed.
All submissions appear in your Netlify dashboard under **Forms**.
You can also set up email notifications: **Site Settings → Forms → Form notifications**.
