/**
 * Vercel Serverless Function — /api/send-reminder
 * Dispatches automated launch reminder emails via Resend (https://resend.com)
 */
export default async function handler(req, res) {
  // CORS & Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { email } = body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const apiKey = process.env.RESEND_API_KEY;

    // Graceful fallback if RESEND_API_KEY is not yet added to Vercel
    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured in environment variables.');
      return res.status(200).json({
        success: true,
        delivered: false,
        message: 'Reminder registered locally. Add RESEND_API_KEY in Vercel settings to dispatch automated inbox emails.',
      });
    }

    // 1. Send confirmation dispatch to subscriber
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'REUBG MERCH LAB <onboarding@resend.dev>',
        to: [cleanEmail],
        subject: '[CONFIRMED] REUBG MERCH LAB // Concept 2026 Drop Notification',
        html: `
          <div style="background-color: #0d0d10; color: #edece6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 48px 24px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.12);">
            <div style="border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 24px; margin-bottom: 32px;">
              <span style="color: #FF1E27; font-weight: 800; font-size: 11px; letter-spacing: 2.5px; font-family: monospace;">08 // ATELIER DISPATCH</span>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 8px 0 0 0; letter-spacing: -0.5px;">REUBG MERCH LAB</h1>
              <p style="color: #FF1E27; font-size: 13px; font-weight: 700; margin: 6px 0 0 0; letter-spacing: 1px; font-family: monospace;">LAUNCH REMINDER CONFIRMED · CONCEPT 2026</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #ffffff; margin-bottom: 24px;">
              Your email address (<strong>${cleanEmail}</strong>) is confirmed on the confidential dispatch list for the <strong>Concept 2026</strong> drop.
            </p>

            <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 20px; margin: 24px 0; font-family: monospace; font-size: 12px; line-height: 1.8;">
              <div><strong style="color: #a1a1aa;">SPEC:</strong> ML-2026-CONFIDENTIAL</div>
              <div><strong style="color: #a1a1aa;">STATUS:</strong> QUEUED IN TIER 01 DISPATCH</div>
              <div><strong style="color: #a1a1aa;">ACCESS:</strong> PRE-RELEASE NOTIFICATION</div>
              <div><strong style="color: #a1a1aa;">VENUE:</strong> <a href="https://reubg.in/merch-lab" style="color: #FF1E27; text-decoration: none;">https://reubg.in/merch-lab</a></div>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin: 24px 0;">
              “SAME MINDSET. DIFFERENT MEDIUM.”<br>
              You will receive an automated dispatch the moment production tolerances are met and the first collection is unlocked.
            </p>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 40px; font-size: 11px; color: #71717a; font-family: monospace;">
              © ${new Date().getFullYear()} REUBEN BINU GEORGE · REUBG DEV<br>
              Kerala, India · <a href="https://reubg.in" style="color: #a1a1aa; text-decoration: none;">reubg.in</a>
            </div>
          </div>
        `,
      }),
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend error:', data);
      return res.status(resendResponse.status).json({
        error: data.message || 'Error communicating with Resend',
      });
    }

    return res.status(200).json({
      success: true,
      delivered: true,
      id: data.id,
      email: cleanEmail,
    });
  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
