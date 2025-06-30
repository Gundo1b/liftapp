// js/supabase.js

// Your Supabase credentials
const SUPABASE_URL = 'https://ounmgdlbjfpazdhdielu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bm1nZGxiamZwYXpkaGRpZWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDIxNTcsImV4cCI6MjA2NjUxODE1N30.vkYmr7CGeT4UEBFD1VUSUp4OYaXjEoxtaMRiHNgWlcQ';

// Initialize Supabase client
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
