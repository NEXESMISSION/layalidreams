# Layali Dreams Admin Dashboard

## Deployment Guide

### Prerequisites
- Node.js (v16 or higher)
- Vercel CLI (optional)
- Supabase Account

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Deployment Steps

#### 1. Vercel Deployment (Recommended)

##### Automatic Deployment
1. Fork the repository
2. Connect your GitHub repository to Vercel
3. Set up environment variables in Vercel dashboard
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
4. Vercel will automatically deploy on push to main branch

##### Manual Deployment with Vercel CLI
1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy to Vercel
```bash
vercel
```

4. For production deployment
```bash
vercel --prod
```

### Local Development
1. Clone the repository
```bash
git clone https://github.com/NEXESMISSION/layalidreams.git
cd layalidreams
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

### Supabase Configuration
1. Create a new Supabase project
2. Set up database tables:
   - stories
   - orders
   - categories
3. Configure Row Level Security (RLS) policies
4. Create storage buckets for images

### Troubleshooting
- Ensure all environment variables are correctly set
- Check Vercel and Supabase logs for any deployment issues
- Verify database connection and RLS policies

## Technologies
- React 18
- Supabase
- Tailwind CSS
- React Router
- Vercel Hosting

## License
MIT License
