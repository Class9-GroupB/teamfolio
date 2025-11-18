# 🧑‍💻 Brandon Randell – Teamfolio Profile Page

This repository/folder contains the individual webpage files for **Brandon Randell**, part of the **Team4Tech Teamfolio AWS Deployment Project**.

---

## 📂 Files Included

| File | Description |
|------|-------------|
| `index.html` | Main profile page structure |
| `style.css` | Stylesheet for layout, colors, and design |
| `script.js` | Interactive features and animations |
| `photo.jpg` | Profile image (replace with your actual photo) |
| `README.md` | Project documentation and deployment steps |

---

## 🌐 Local Preview

To preview the website locally:

1. **Download all files** to a folder on your computer
2. **Replace `photo.jpg`** with your actual profile photo (keep the same filename)
3. **Open `index.html`** in your web browser
4. The page should display with all styles and animations

**Requirements:**
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for local viewing

---

## 🚀 Deployment Options

### Option 1: Deploy to EC2 (Team App Integration)

This profile is integrated into the main Teamfolio Node.js application.

**Step 1: Add to Team Application**

```bash
# Copy files to team app
cp index.html ../app/src/views/members/brandon.ejs
cp photo.jpg ../app/src/public/images/brandon.jpg
```

**Step 2: Update Team App Routes**

In `app/src/index.js`, ensure the member route exists:

```javascript
app.get('/members/brandon', (req, res) => {
  res.render('members/brandon');
});
```

**Step 3: Update Team Members Data**

Add yourself to the team data in `app/src/index.js`:

```javascript
{
  handle: 'brandon',
  name: 'Brandon Randell',
  role: 'Cloud Engineer',
  github: 'https://github.com/brandonrandell',
  linkedin: 'https://linkedin.com/in/brandonrandell'
}
```

**Access:**
- URL: `https://teamfolio.example.com/members/brandon`

---

### Option 2: Deploy to S3 + CloudFront (Static Site)

This creates a standalone profile site hosted on AWS S3 with CloudFront CDN.

**Step 1: Create S3 Bucket (if not already created)**

```bash
# Replace YOUR_ACCOUNT_ID with your AWS account ID
aws s3 mb s3://teamfolio-profiles-YOUR_ACCOUNT_ID
```

**Step 2: Upload Files to S3**

```bash
# Upload all files to your profile folder
aws s3 cp index.html s3://teamfolio-profiles-YOUR_ACCOUNT_ID/brandon/index.html
aws s3 cp style.css s3://teamfolio-profiles-YOUR_ACCOUNT_ID/brandon/style.css
aws s3 cp script.js s3://teamfolio-profiles-YOUR_ACCOUNT_ID/brandon/script.js
aws s3 cp photo.jpg s3://teamfolio-profiles-YOUR_ACCOUNT_ID/brandon/photo.jpg

# Or upload entire folder
aws s3 sync . s3://teamfolio-profiles-YOUR_ACCOUNT_ID/brandon/ \
    --exclude "README.md" \
    --exclude ".git*" \
    --cache-control "max-age=3600"
```

**Step 3: Verify Upload**

```bash
aws s3 ls s3://teamfolio-profiles-YOUR_ACCOUNT_ID/brandon/
```

Expected output:
```
2025-11-XX XX:XX:XX     12345 index.html
2025-11-XX XX:XX:XX      8901 style.css
2025-11-XX XX:XX:XX      4567 script.js
2025-11-XX XX:XX:XX    234567 photo.jpg
```

**Step 4: CloudFront Distribution**

The CloudFront distribution should already be created by Terraform. Get the distribution domain:

```bash
aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='Teamfolio individual profiles'].DomainName" \
    --output text
```

**Step 5: Create DNS Record (Route 53)**

```bash
# Get the hosted zone ID
ZONE_ID=$(aws route53 list-hosted-zones \
    --query "HostedZones[?Name=='teamfolio.example.com.'].Id" \
    --output text | cut -d'/' -f3)

# Get CloudFront distribution details
CF_DOMAIN=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='Teamfolio individual profiles'].DomainName" \
    --output text)

CF_HOSTED_ZONE_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='Teamfolio individual profiles'].HostedZoneId" \
    --output text)

# Create A record for brandon.teamfolio.example.com
aws route53 change-resource-record-sets \
    --hosted-zone-id $ZONE_ID \
    --change-batch '{
      "Changes": [{
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "brandon.teamfolio.example.com",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "'$CF_HOSTED_ZONE_ID'",
            "DNSName": "'$CF_DOMAIN'",
            "EvaluateTargetHealth": false
          }
        }
      }]
    }'
```

**Step 6: Test Your Site**

After DNS propagation (5-10 minutes):

```bash
# Test via CloudFront directly
curl -I https://YOUR_CF_DOMAIN/brandon/index.html

# Test via custom domain
curl -I https://brandon.teamfolio.example.com
```

**Access:**
- CloudFront URL: `https://YOUR_CF_DOMAIN/brandon/`
- Custom Domain: `https://brandon.teamfolio.example.com`

---

## 📋 Customization Checklist

Before deploying, customize these sections in `index.html`:

- [ ] **Profile Photo:** Replace `photo.jpg` with your actual photo (180x180px recommended)
- [ ] **Name:** Update "Brandon Randell" with your name (multiple places)
- [ ] **Tagline:** Update your role/title in the hero section
- [ ] **About Me:** Rewrite the about section with your own background
- [ ] **Skills:** Update with your actual technical skills
- [ ] **Projects:** Replace with your own projects and descriptions
- [ ] **Experience:** Update with your actual experience and education
- [ ] **Learning Reflection:** Write your own learnings from the project
- [ ] **Contact Info:** Update email, GitHub, LinkedIn URLs
- [ ] **Meta Tags:** Update description in `<head>` section

---

## 🎨 Customization Guide

### Change Color Scheme

Edit `style.css` at the top:

```css
:root {
    --primary-color: #667eea;     /* Main brand color */
    --secondary-color: #764ba2;   /* Accent color */
    --accent-color: #f093fb;      /* Highlight color */
}
```

### Add New Sections

1. Add HTML in `index.html`:
```html
<section id="certificates" class="section fade-in">
    <div class="container">
        <h2 class="section-title">Certifications</h2>
        <div class="cert-grid">
            <!-- Your certificates here -->
        </div>
    </div>
</section>
```

2. Add navigation link:
```html
<li><a href="#certificates">Certifications</a></li>
```

3. Style in `style.css`:
```css
.cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}
```

### Update Profile Photo

**Recommended specs:**
- Size: 180x180 pixels (minimum)
- Format: JPG or PNG
- File size: < 500KB
- Background: Professional or neutral

**Optimization:**
```bash
# Resize and optimize using ImageMagick
convert your-photo.jpg -resize 180x180^ -gravity center -extent 180x180 photo.jpg

# Or use online tools:
# - tinypng.com
# - squoosh.app
```

---

## 🧪 Testing

### Local Testing

```bash
# Simple HTTP server (Python)
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

### Accessibility Testing

- [ ] All images have `alt` text
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

### Browser Testing

Test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### Performance Testing

```bash
# Test page speed
lighthouse https://brandon.teamfolio.example.com --view

# Or use: https://pagespeed.web.dev/
```

**Target Metrics:**
- Performance: > 90
- Accessibility: 100
- Best Practices: > 90
- SEO: > 90

---

## 🐛 Troubleshooting

### Issue: CSS/JS Not Loading

**Problem:** Styles or scripts not applying

**Solution:**
1. Check file paths in `index.html`
2. Ensure all files uploaded to S3
3. Check browser console for errors (F12)
4. Clear browser cache (Ctrl+F5)

### Issue: Photo Not Displaying

**Problem:** Broken image icon shows

**Solutions:**
- Verify `photo.jpg` exists in same folder
- Check filename is exactly `photo.jpg` (case-sensitive on Linux/Mac)
- Ensure image file isn't corrupted
- Try a different image format (.png)

### Issue: CloudFront Not Updating

**Problem:** Changes not showing on CloudFront URL

**Solution:**
```bash
# Invalidate CloudFront cache
aws cloudfront create-invalidation \
    --distribution-id YOUR_DIST_ID \
    --paths "/brandon/*"
```

### Issue: DNS Not Resolving

**Problem:** `brandon.teamfolio.example.com` not working

**Solutions:**
1. Wait 5-10 minutes for DNS propagation
2. Check Route 53 record:
```bash
aws route53 list-resource-record-sets --hosted-zone-id YOUR_ZONE_ID
```
3. Test DNS:
```bash
nslookup brandon.teamfolio.example.com
dig brandon.teamfolio.example.com
```

---

## 📊 Analytics (Optional)

### Add Google Analytics

In `index.html`, add before closing `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Custom Events

In `script.js`:

```javascript
// Track project link clicks
document.querySelectorAll('.project-links a').forEach(link => {
    link.addEventListener('click', () => {
        gtag('event', 'click', {
            'event_category': 'Project Link',
            'event_label': link.href
        });
    });
});
```

---

## 🔐 Security Considerations

### Content Security Policy

Add to `<head>` in `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';">
```

### CloudFront Security Headers

Configure in Terraform or CloudFront console:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

---

## 💰 Cost Estimates

**S3 Storage:**
- ~5KB HTML + CSS + JS
- ~200KB photo
- Total: ~205KB
- Cost: < $0.01/month

**CloudFront:**
- First 1TB: $0.085/GB
- ~100 visits/month × 205KB = 20MB
- Cost: < $0.01/month

**Route 53:**
- DNS queries: $0.40 per million queries
- ~100 queries/month
- Cost: < $0.01/month

**Total: < $0.05/month for individual profile**

---

## 📝 Submission Checklist

For Team4Tech project submission:

- [ ] All files uploaded to GitHub
- [ ] Profile accessible via EC2 route (`/members/brandon`)
- [ ] Profile accessible via S3/CloudFront
- [ ] Custom domain working (if using)
- [ ] Screenshot of live profile taken
- [ ] Reflection section completed in HTML
- [ ] Contact information updated
- [ ] Links to GitHub/LinkedIn working
- [ ] README.md documentation complete
- [ ] Confluence page updated with profile link

---

## 📚 Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [HTML/CSS Best Practices](https://developer.mozilla.org/en-US/docs/Web/Guide)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🤝 Support

For questions or issues:

1. Check Confluence documentation
2. Ask in Team4Tech Slack channel
3. Review AWS service documentation
4. Consult with Tech Lead or Infra Lead

---

## 📄 License

This profile is part of the Team4Tech educational project.  
© 2025 Brandon Randell. All rights reserved.

---

## 🎉 Acknowledgments

- Team4Tech members for collaboration
- AWS for cloud infrastructure
- Course instructor for guidance
- Open source community for tools and inspiration

---

**Last Updated:** November 2025  
**Version:** 1.0.0  
**Status:** ✅ Deployed
