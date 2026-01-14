import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdrikposcrvulcjeeipq.supabase.co';
const supabaseKey = 'sb_publishable_3CZ2os-NsePIHaESN_HRTg_fUt2S1fa';

export const supabase = createClient(supabaseUrl, supabaseKey);