
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ffdbpeipetrjdkvassls.supabase.co'
const supabaseKey = 'sb_publishable_BMFniYMJoj38pgeLs6eHQA_WxSfSYal'

export const supabase = createClient(supabaseUrl, supabaseKey)
