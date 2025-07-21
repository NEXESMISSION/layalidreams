-- Migration: Add images column to stories table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='stories' AND column_name='images'
    ) THEN
        ALTER TABLE stories ADD COLUMN images TEXT[];
    END IF;
END $$; 