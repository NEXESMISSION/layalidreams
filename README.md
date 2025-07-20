# Layali Dreams Admin Dashboard

A comprehensive admin dashboard for managing personalized storybooks, orders, and categories for Layali Dreams.

## Features

- 🔐 Secure authentication with Supabase
- 📚 Story management (CRUD operations)
- 📦 Order management and tracking
- 🏷️ Category management
- 📊 Analytics dashboard
- 🖼️ Image upload and management
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Heroicons, Lucide React
- **UI Components**: Headless UI

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment on Vercel

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it as a Create React App
3. Add your environment variables in the Vercel dashboard:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel --prod
```

### Environment Variables Setup

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `REACT_APP_SUPABASE_URL`: Your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Build Configuration

The project includes:
- `vercel.json`: Vercel deployment configuration
- Optimized build settings for production
- Proper routing for SPA (Single Page Application)

## Database Setup

Ensure your Supabase database has the following tables:
- `stories` - Story management
- `orders` - Order tracking
- `categories` - Category management
- `order_items` - Order details

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for admin access
- Secure API endpoints

## Support

For deployment issues or questions, contact the development team.

---

**Developed by**: DIGIPLUS X TFP 
- **Secure Authentication** - Admin login with Supabase Auth
- **Story Management** - CRUD operations for stories with image uploads
- **Order Management** - View and manage customer orders
- **Dashboard Analytics** - Overview statistics and recent activity
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Live data from Supabase database

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🗄️ Database Setup

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Note down your project URL and anon key

### 2. Run SQL Commands
Execute these SQL commands in your Supabase SQL editor:

```sql
-- Stories Table
CREATE TABLE stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    paragraph TEXT,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    category TEXT NOT NULL CHECK (category IN ('boys', 'girls', 'lovers')),
    image_url TEXT,
    story_link TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    story_id UUID REFERENCES stories(id),
    story_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    order_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admin full access" ON stories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public read active stories" ON stories FOR SELECT USING (is_active = true);
```

### 3. Set up Storage
```sql
-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true);

-- Storage policies
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'story-images');
CREATE POLICY "Admin upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');
```

## 👤 Admin User Setup

1. **Create admin user in Supabase Auth**
   - Go to Authentication > Users in your Supabase dashboard
   - Add a new user with admin email and password

2. **Test login**
   - Use the admin credentials to log into the dashboard

## 📱 Usage

### Dashboard Overview
- View total stories, orders, revenue, and pending orders
- See recent orders with status indicators
- Quick navigation to stories and orders management

### Stories Management
- **View all stories** with status indicators
- **Add new stories** with image uploads
- **Edit existing stories** including prices and descriptions
- **Delete stories** with confirmation
- **Toggle story status** (active/inactive)

### Orders Management
- **View all orders** with customer details
- **Update order status** (pending → processing → shipped → delivered)
- **Filter orders** by status
- **View order details** including customer information

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── Auth/
│   │   └── Login.jsx
│   ├── Dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── DashboardHome.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── Stories/
│   │   ├── StoriesList.jsx
│   │   ├── StoryForm.jsx
│   │   └── StoryCard.jsx
│   ├── Orders/
│   │   ├── OrdersList.jsx
│   │   ├── OrderDetail.jsx
│   │   └── OrderStatus.jsx
│   └── Common/
│       ├── Loading.jsx
│       ├── Error.jsx
│       └── Modal.jsx
├── services/
│   ├── supabase.js
│   ├── auth.js
│   ├── stories.js
│   └── orders.js
├── hooks/
│   ├── useAuth.js
│   ├── useStories.js
│   └── useOrders.js
└── App.jsx
```

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

## 🔒 Security

- Row Level Security (RLS) policies protect data
- Admin-only access to sensitive operations
- Secure file uploads with proper validation
- Protected routes in React application

## 📊 Analytics

The dashboard provides:
- Total stories count
- Active stories count
- Total orders and revenue
- Pending orders count
- Recent orders list
- Order status tracking

## 🛠️ Troubleshooting

### Common Issues

1. **Authentication errors**
   - Check Supabase URL and anon key
   - Verify admin user exists in Supabase Auth

2. **Database connection issues**
   - Verify RLS policies are set up correctly
   - Check table permissions

3. **Image upload failures**
   - Verify storage bucket exists
   - Check storage policies

### Support

For issues or questions:
1. Check the documentation
2. Review Supabase logs
3. Check browser console for errors

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for Layali Dreams 