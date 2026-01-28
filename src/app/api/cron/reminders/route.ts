import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { LineService } from '@/utils/line'

export const dynamic = 'force-dynamic' // Prevent caching

export async function GET(request: Request) {
    // 1. Security Check (Optional but recommended)
    // Verify that the request is coming from a trusted source using a secret token
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const supabase = createAdminClient()
    const now = new Date().toISOString()

    try {
        // 2. Fetch pending reminders
        // We need to fetch visits that:
        // - reminder_sent is false
        // - reminder_scheduled_at is in the past (or now)
        // We also need customer and profile data to send the message
        const { data: visits, error } = await supabase
            .from('visits')
            .select(`
        id,
        visit_date,
        customer_id,
        customers (
          display_name,
          line_user_id,
          profile_id,
          profiles (
            shop_name,
            line_channel_token
          )
        )
      `)
            .eq('reminder_sent', false)
            .lte('reminder_scheduled_at', now)

        if (error) {
            console.error('Error fetching reminders:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!visits || visits.length === 0) {
            return NextResponse.json({ message: 'No reminders to send' })
        }

        console.log(`Found ${visits.length} reminders to process`)

        // 3. Process each reminder
        const results = await Promise.allSettled(visits.map(async (visit) => {
            const customer = visit.customers
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: nested join types can be tricky
            const profile = customer?.profiles

            if (!customer || !profile || !customer.line_user_id || !profile.line_channel_token) {
                console.warn(`Missing data for visit ${visit.id}`)
                return { id: visit.id, status: 'skipped', reason: 'missing_data' }
            }

            const lineService = new LineService(profile.line_channel_token)

            // Send LINE message
            await lineService.sendReminder(
                customer.line_user_id,
                customer.display_name || 'お客様',
                profile.shop_name || '美容室',
                new Date(visit.visit_date).toLocaleDateString('ja-JP')
            )

            // Mark as sent
            await supabase
                .from('visits')
                .update({ reminder_sent: true })
                .eq('id', visit.id)

            return { id: visit.id, status: 'sent' }
        }))

        return NextResponse.json({
            success: true,
            processed: results.length,
            results: results
        })

    } catch (e: any) {
        console.error('Cron job error:', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
