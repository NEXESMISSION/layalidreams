# Vercel Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Set up `.env` file with your Supabase credentials
- [ ] Verify `REACT_APP_SUPABASE_URL` is correct
- [ ] Verify `REACT_APP_SUPABASE_ANON_KEY` is correct

### 2. Database Setup
- [ ] Ensure all tables exist in Supabase:
  - [ ] `stories`
  - [ ] `orders` 
  - [ ] `categories`
  - [ ] `order_items`
- [ ] Verify RLS policies are configured
- [ ] Test admin user authentication

### 3. Code Preparation
- [ ] All components are working locally
- [ ] No console errors
- [ ] Build process completes successfully (`npm run build`)

## Vercel Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect to GitHub**
   - Push your code to a GitHub repository
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Project**
   - Vercel will auto-detect it as a Create React App
   - Framework preset: Create React App
   - Build command: `npm run build`
   - Output directory: `build`

3. **Set Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add the following:
     ```
     REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
     REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Option 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to Project Settings > Environment Variables
   - Add your Supabase credentials

## Post-Deployment Verification

### 1. Test the Application
- [ ] Visit your deployed URL
- [ ] Test admin login
- [ ] Verify all features work:
  - [ ] Dashboard loads
  - [ ] Stories management
  - [ ] Orders management
  - [ ] Categories management

### 2. Check for Issues
- [ ] Open browser developer tools
- [ ] Check for console errors
- [ ] Verify environment variables are loaded
- [ ] Test image uploads (if applicable)

### 3. Performance Optimization
- [ ] Check Lighthouse scores
- [ ] Verify images are optimized
- [ ] Test on mobile devices

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Verify variable names start with `REACT_APP_`
   - Check Vercel dashboard for typos
   - Redeploy after adding variables

2. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

3. **Authentication Issues**
   - Verify Supabase URL and key are correct
   - Check Supabase Auth settings
   - Ensure admin user exists

4. **Database Connection Issues**
   - Verify RLS policies are set up
   - Check table permissions
   - Test database connection locally

### Getting Help

1. Check Vercel deployment logs
2. Review browser console for errors
3. Test locally with production environment variables
4. Contact development team if issues persist

## Custom Domain (Optional)

1. Go to Vercel dashboard > Domains
2. Add your custom domain
3. Configure DNS settings as instructed
4. Wait for DNS propagation

## Monitoring

- Set up Vercel Analytics (optional)
- Monitor error logs in Vercel dashboard
- Set up uptime monitoring

---

**Deployment URL**: Your Vercel URL will be provided after successful deployment
**Admin Access**: Use your Supabase admin credentials to log in 
 