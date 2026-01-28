import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Note: This client uses the Service Role Key, which bypasses RLS.
// ONLY use this in server-side contexts where you need administrative privileges
// (like cron jobs or webhooks). NEVER expose this key to the client.
export function createAdminClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined')
    }

    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey
    )
}
