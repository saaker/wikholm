# SEO Optimization Checklist for Wikholm Ortodonti

## ✅ Already Implemented

### Technical SEO
- ✅ **Robots.txt** — Automatically generated at `/robots.txt`
- ✅ **Sitemap.xml** — Automatically generated at `/sitemap.xml`
- ✅ **Structured Data (JSON-LD)** — Organization, Services, and FAQ schemas
- ✅ **Meta Tags** — Title, description, keywords for all pages
- ✅ **Open Graph Tags** — For social media sharing (Facebook, LinkedIn)
- ✅ **Twitter Cards** — For Twitter/X sharing
- ✅ **Canonical URLs** — Set via metadataBase
- ✅ **Mobile-Responsive** — Already responsive design
- ✅ **Fast Loading** — Hosted on Vercel with optimal performance

### Content SEO
- ✅ **Keyword-Rich Titles** — "Ortodonti", "Aligners", "Invisalign", "ClearCorrect"
- ✅ **Descriptive Meta Descriptions** — Compelling descriptions for search results
- ✅ **Semantic HTML** — Proper heading hierarchy (H1, H2, H3)
- ✅ **Internal Linking** — Navigation between pages

---

## 🔄 To Do When Going Live on wikholmort.com

### 1. **Google Search Console** (Critical!)
**When:** As soon as the domain is live

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `wikholmort.com`
3. Verify ownership (DNS or HTML file method)
4. Submit sitemap: `https://wikholmort.com/sitemap.xml`
5. Request indexing for key pages

**Why:** This tells Google your site exists and helps it get indexed faster.

---

### 2. **Google Business Profile** (For Local SEO)
**When:** As soon as possible

**Steps:**
1. Go to [Google Business Profile](https://business.google.com)
2. Create profile for each clinic location
3. Add:
   - Business name: "Wikholm Ortodonti"
   - Category: "Orthodontist"
   - Address for each clinic
   - Phone number
   - Website: `https://wikholmort.com`
   - Hours
   - Photos of clinics/team
   - Services offered

**Why:** Shows up in Google Maps and local searches like "ortodontist Stockholm"

---

### 3. **Open Graph Image**
**When:** Before launch

**Action Needed:**
Create an image file at `/public/images/og-image.jpg` with:
- Dimensions: 1200 x 630 pixels
- Content: Logo + tagline or a professional image
- Format: JPG or PNG

**Why:** This is the image that shows when people share your site on social media.

---

### 4. **Google Analytics** (Optional but Recommended)
**When:** Before launch

**Steps:**
1. Create account at [Google Analytics](https://analytics.google.com)
2. Get your measurement ID (e.g., `G-XXXXXXXXXX`)
3. Add to your site (I can help with this)

**Why:** Track visitor behavior, popular pages, conversion rates

---

### 5. **Update URLs in Code**
**When:** Right before going live

**Files to check:**
- `lib/seo.ts` — Update `SITE_URL` from Vercel to `https://wikholmort.com`
- Test all links work on new domain

---

## 📝 Content Optimization Tasks

### High Priority

#### Add Alt Text to All Images
**Current status:** Need to audit

**Action:**
Check all images in:
- `/public/images/before-after/`
- `/public/images/news/`
- Any other image components

**Example:**
```tsx
<Image
  src="/path/to/image.jpg"
  alt="Patient före och efter alignerbehandling med Invisalign"
/>
```

**Why:** Helps visually impaired users and improves image search SEO

---

#### Create Blog/News Section
**Current status:** Have news, but could expand

**Action:**
- Write 3-5 informative articles about:
  - "Vad är skillnaden mellan Invisalign och ClearCorrect?"
  - "Hur lång tid tar en alignerbehandling?"
  - "Kostnad för tandreglering i Stockholm"
  - "När ska man söka ortodontist?"

**Why:** More content = more keywords = better rankings

---

### Medium Priority

#### Get Backlinks
**Action:**
- List business in relevant directories:
  - Vårdguiden
  - 1177.se
  - Bokadirekt
  - Swedish dental associations
- Ask partners (ClearCorrect, Straumann) to link to your site
- Write guest articles for dental blogs

**Why:** Backlinks from reputable sites boost your authority

---

#### Add FAQ Schema to Patient FAQ
**Current status:** Have FAQ section, but no structured data on patient page

**Action:** I can add `getFAQSchema()` to the patient FAQ section

**Why:** Can show your FAQ directly in Google search results (rich snippets)

---

#### Patient Reviews/Testimonials
**Action:**
- Collect patient reviews
- Add testimonial section to website
- Encourage Google reviews on Google Business Profile

**Why:** Reviews build trust and improve local SEO

---

## 🎯 Keyword Strategy

### Primary Keywords (Target these)
- ortodonti stockholm ✅
- aligners stockholm ✅
- invisalign stockholm ✅
- clearcorrect sverige ✅
- tandreglering vuxen ✅
- genomskinliga skenor ✅
- ortodontist stockholm ✅

### Secondary Keywords (Also good)
- tps tandläkare
- case assessment ortodonti
- alignerbehandling kostnad
- tandställning vuxen pris
- dental monitoring sverige

### Long-Tail Keywords (Less competition, high intent)
- "kostnadsfri bedömning aligners stockholm"
- "osynlig tandställning för vuxna"
- "specialist ortodonti aligners"

---

## 📊 Monitoring & Improvement

### Weekly
- Check Google Search Console for errors
- Monitor ranking for key terms (use a tool like [Ahrefs](https://ahrefs.com) or [SEMrush](https://semrush.com))

### Monthly
- Review Google Analytics data
- Update content based on popular search queries
- Add new blog posts

### Quarterly
- Audit backlinks
- Update sitemap if new pages added
- Refresh old content

---

## 🛠 Tools You'll Need

### Free Tools
1. **Google Search Console** — Track search performance
2. **Google Analytics** — Track visitor behavior
3. **Google Business Profile** — Local SEO
4. **Ubersuggest** (free tier) — Keyword research
5. **PageSpeed Insights** — Performance testing

### Paid Tools (Optional)
1. **Ahrefs** (~$99/month) — Comprehensive SEO tool
2. **SEMrush** (~$119/month) — Keyword tracking, competitor analysis
3. **Screaming Frog** (free up to 500 URLs) — Technical SEO audit

---

## 🚀 Quick Wins for Launch Day

1. **Submit sitemap to Google Search Console**
2. **Share website on social media** (Instagram, LinkedIn)
3. **Update all Google Business listings** with new URL
4. **Ask colleagues to link to your site**
5. **Create OG image** for social sharing

---

## 📞 Need Help?

This checklist covers the basics, but SEO is ongoing. After launch:
- Monitor Search Console weekly
- Add content monthly
- Get backlinks continuously

The code is already optimized — now it's about content and promotion!

---

## 🎨 Next Steps for Me (If You Want)

I can also help with:
1. Adding Google Analytics tracking code
2. Creating FAQ schema for patient page
3. Adding more structured data (LocalBusiness, MedicalProcedure)
4. Optimizing image alt tags throughout site
5. Adding breadcrumb navigation with schema

Let me know what you'd like to tackle next!
