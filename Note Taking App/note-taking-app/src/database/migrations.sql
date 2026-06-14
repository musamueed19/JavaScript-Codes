-- Enable the UUID extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- "Notes" Table
CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- auth.user.id foreign key reference in notes.user_id
    -- and when auth.user record deleted => this notes record also deleted.
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- create idx on notes.user_id for faster query performance when fetching notes by user_id.
CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes(user_id);

-- Enable RLS - Row Level Security
-- This will allow us to define policies that restrict access to notes based on the user_id.
-- We'll create policies later to ensure that users can only access their own notes.
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to access their own notes (Select Operation)
CREATE POLICY "user can select on their notes record"
    ON notes
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create a policy to allow users can insert only their own records (Insert Operation)
CREATE POLICY "user can insert on their notes record"
    ON notes
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create a policy to allow users can update only their own records (Update Operation)
CREATE POLICY "user can update their notes record"
    ON notes
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a policy to allow users to delete their record (Delete operation)
CREATE POLICY "user can delete their notes record"
    ON notes
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_to_current_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_notes_updated_at_of_modified_row
    BEFORE UPDATE ON notes
    FOR EACH ROW
    -- use FUNCTION as PROCEDURE is deprecated in newer versions of PostgreSQL
    EXECUTE FUNCTION update_updated_at_to_current_timestamp();