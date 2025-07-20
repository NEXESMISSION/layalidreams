# Database Setup Guide for Layali Dreams Admin

This guide contains all the necessary SQL commands to set up the database for the Layali Dreams admin system.

## Prerequisites

- Supabase project created
- Access to Supabase SQL editor

## Complete Database Setup

Run the following SQL commands in your Supabase SQL editor:

### 1. Create Tables

```sql
-- Categories Table
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stories Table
CREATE TABLE stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    paragraph TEXT,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image_url TEXT,
    images TEXT[],
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
    child_name TEXT,
    child_age INTEGER,
    personalization_text TEXT,
    personalization_images TEXT[],
    story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
    story_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    order_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table (for future use)
CREATE TABLE order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
```

### 3. Create RLS Policies

```sql
-- Categories policies
CREATE POLICY "Admin full access to categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public read active categories" ON categories FOR SELECT USING (is_active = true);

-- Stories policies
CREATE POLICY "Admin full access to stories" ON stories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public read active stories" ON stories FOR SELECT USING (is_active = true);

-- Orders policies
CREATE POLICY "Admin full access to orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Order items policies
CREATE POLICY "Admin full access to order_items" ON order_items FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Insert Default Category

```sql
-- Insert default category
INSERT INTO categories (name, display_name, is_default, is_active) 
VALUES ('general', 'General', true, true);
```

### 5. Create Triggers for Data Integrity

```sql
-- Function to prevent deletion of default category
CREATE OR REPLACE FUNCTION prevent_default_category_deletion()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.is_default = true THEN
        RAISE EXCEPTION 'Cannot delete default category';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to prevent deletion of default category
CREATE TRIGGER prevent_default_category_deletion_trigger
    BEFORE DELETE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION prevent_default_category_deletion();

-- Function to move stories to default category when category is deleted
CREATE OR REPLACE FUNCTION move_stories_to_default_category()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE stories 
    SET category_id = (SELECT id FROM categories WHERE is_default = true LIMIT 1)
    WHERE category_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to move stories when category is deleted
CREATE TRIGGER move_stories_to_default_category_trigger
    BEFORE DELETE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION move_stories_to_default_category();
```

### 6. Set up Storage Buckets (Optional)

```sql
-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true);

-- Storage policies for story images
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'story-images');
CREATE POLICY "Admin upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON storage.objects FOR UPDATE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON storage.objects FOR DELETE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');
```

## Verification

After running the setup, verify that:

1. All tables exist and have the correct structure
2. RLS policies are active
3. Default category exists
4. Triggers are working properly

## Sample Data (Optional)

```sql
-- Insert sample categories
INSERT INTO categories (name, display_name, is_active) VALUES 
('boys', 'Boys', true),
('girls', 'Girls', true),
('lovers', 'Lovers', true),
('family', 'Family', true);

-- Insert sample stories
INSERT INTO stories (name, description, price, category_id, image_url) VALUES 
('Adventure Boy', 'An exciting adventure story for boys', 29.99, 
 (SELECT id FROM categories WHERE name = 'boys' LIMIT 1),
 'https://example.com/boy-story.jpg'),
('Princess Tale', 'A magical princess story for girls', 29.99,
 (SELECT id FROM categories WHERE name = 'girls' LIMIT 1),
 'https://example.com/girl-story.jpg');
```

## Troubleshooting

### Common Issues

1. **Foreign key constraint errors**: Ensure categories exist before creating stories
2. **RLS blocking access**: Check that policies are correctly set up
3. **Trigger errors**: Verify trigger functions are created before triggers

### Reset Database (if needed)

```sql
-- Drop all tables (WARNING: This will delete all data)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS prevent_default_category_deletion() CASCADE;
DROP FUNCTION IF EXISTS move_stories_to_default_category() CASCADE;
```

---

**Note**: This setup provides a complete database structure for the Layali Dreams admin system. Make sure to test all functionality after setup. 