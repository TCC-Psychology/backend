import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
