# Layali Dreams Admin - Project Structure

## 📁 Root Directory

```
admin-app/
├── 📄 DATABASE_SETUP.md          # Complete database setup guide
├── 📄 DEPLOYMENT.md              # Vercel deployment instructions
├── 📄 README.md                  # Main project documentation
├── 📄 PROJECT_STRUCTURE.md       # This file
├── 📄 package.json               # Dependencies and scripts
├── 📄 vercel.json                # Vercel deployment config
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
├── 📁 public/                    # Static assets
└── 📁 src/                       # Source code
```

## 📁 Source Code Structure

```
src/
├── 📄 index.js                   # React app entry point
├── 📄 index.css                  # Global styles
├── 📄 App.jsx                    # Main app component
├── 📁 services/                  # API services
│   ├── 📄 supabase.js           # Supabase client
│   ├── 📄 auth.js               # Authentication service
│   ├── 📄 stories.js            # Stories API service
│   ├── 📄 orders.js             # Orders API service
│   └── 📄 categories.js         # Categories API service
└── 📁 components/                # React components
    ├── 📁 Auth/                  # Authentication components
    │   └── 📄 Login.jsx         # Login form
    ├── 📁 Dashboard/             # Dashboard components
    │   ├── 📄 Dashboard.jsx     # Main dashboard layout
    │   ├── 📄 DashboardHome.jsx # Dashboard home page
    │   ├── 📄 Header.jsx        # Dashboard header
    │   └── 📄 Sidebar.jsx       # Dashboard sidebar
    ├── 📁 Stories/               # Story management
    │   ├── 📄 StoriesList.jsx   # Stories list view
    │   └── 📄 StoryForm.jsx     # Story add/edit form
    ├── 📁 Orders/                # Order management
    │   ├── 📄 OrdersList.jsx    # Orders list view
    │   └── 📄 OrdersRemoval.jsx # Order removal tool
    ├── 📁 Categories/            # Category management
    │   └── 📄 CategoriesList.jsx # Categories CRUD
    ├── 📁 Website/               # Public website components
    │   ├── 📄 Header.jsx        # Website header
    │   ├── 📄 Footer.jsx        # Website footer
    │   ├── 📄 HomePage.jsx      # Home page
    │   ├── 📄 BooksPage.jsx     # Books/stories page
    │   ├── 📄 AboutPage.jsx     # About page
    │   ├── 📄 ContactPage.jsx   # Contact page
    │   └── 📄 OrderForm.jsx     # Order form
    └── 📁 Common/                # Shared components
        └── 📄 Loading.jsx       # Loading spinner
```

## 📁 Public Assets

```
public/
├── 📄 index.html                 # HTML template
├── 📄 manifest.json              # Web app manifest
├── 📄 robots.txt                 # SEO robots file
└── 📄 favicon.ico               # Site favicon
```

## 🔧 Key Features

### Authentication
- Secure login with Supabase Auth
- Protected admin routes
- Session management

### Dashboard
- Analytics overview
- Recent activity tracking
- Quick navigation

### Story Management
- CRUD operations for stories
- Image upload and management
- Category assignment
- Status management (active/inactive)

### Order Management
- View all customer orders
- Update order status
- Order details and tracking
- Bulk order removal tool

### Category Management
- Create, edit, delete categories
- Default category protection
- Story count tracking
- Automatic story reassignment

### Website Components
- Responsive design
- Story browsing and filtering
- Order placement system
- Contact and about pages

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Heroicons, Lucide React
- **UI Components**: Headless UI
- **Deployment**: Vercel

## 📊 Database Schema

### Tables
- `categories` - Story categories
- `stories` - Story content and metadata
- `orders` - Customer orders
- `order_items` - Order line items

### Security
- Row Level Security (RLS) enabled
- Admin-only access for sensitive operations
- Public read access for active content

## 🚀 Deployment

### Environment Variables Required
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

### Build Process
- `npm install` - Install dependencies
- `npm run build` - Build for production
- Automatic deployment via Vercel

## 📝 Code Quality

- Clean component structure
- Proper error handling
- Responsive design
- Accessibility considerations
- Performance optimized

## 🔒 Security Features

- Authentication required for admin access
- RLS policies on all database tables
- Secure file uploads
- Protected API endpoints

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Developed by**: DIGIPLUS X TFP 