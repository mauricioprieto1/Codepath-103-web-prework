import { createClient } from '@supabase/supabase-js'
const URL = 'https://ubbiwgtuewyhvdlocwvc.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYml3Z3R1ZXd5aHZkbG9jd3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjE4MTcsImV4cCI6MjA3MTU5NzgxN30.JtpqhBipzJG49gxdmPkgItwkwxg_Gzcv-ctgdVZZ8x0'
export const supabase = createClient(URL, API_KEY)
