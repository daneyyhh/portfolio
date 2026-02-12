# Vercel Auto-Deployment Setup Guide

## GitHub + Vercel Integration

### Step 1: Connect GitHub Repository
1. Push your enhanced portfolio to GitHub
2. Connect repository to Vercel dashboard
3. Configure automatic deployment settings

### Step 2: Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "domains": ["reubg.in"],
  "github": {
    "autoDeployment": true,
    "previewDeployment": true
  }
}
```

### Step 3: Environment Variables
Set in Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL`: https://reubg.in
- `VERCEL_URL`: Auto-set by Vercel
- `NEXT_PUBLIC_ANALYTICS_ID`: For tracking

### Step 4: GitHub Workflow
```yaml
# .github/workflows/vercel.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Auto-Deployment Features
✅ **Main Branch**: Auto-deploy to production (reubg.in)  
✅ **Pull Requests**: Preview deployments for testing  
✅ **Commits**: Automatic builds and deployment  
✅ **Rollbacks**: One-click rollback to previous version  
✅ **Analytics**: Vercel Analytics + Speed Insights  

### Deployment Flow
```
Git Push → Vercel Build → Deploy to reubg.in → Notify Success
```

### Preview URLs
- Main: https://reubg.in
- Preview: https://your-portfolio-abc123.vercel.app