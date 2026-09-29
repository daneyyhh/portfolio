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
    const adminEmail = 'ftreuben1520@gmail.com';

    // Graceful fallback if RESEND_API_KEY is not yet added in Vercel environment variables
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in environment variables.');
      return res.status(200).json({
        success: true,
        delivered: false,
        message: 'Reminder registered locally. Set RESEND_API_KEY in Vercel to dispatch real inbox emails.',
      });
    }

    let subscriberDelivered = false;
    let adminDelivered = false;
    let messageId = null;

    // 1. Attempt sending confirmation dispatch directly to subscriber
    try {
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
            <div style="background-color: #0d0d10; color: #edece6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 48px 24px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.12);">
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
      if (resendResponse.ok) {
        subscriberDelivered = true;
        messageId = data.id;
      }
    } catch (err) {
      console.warn('Subscriber direct send skipped:', err);
    }

    // 2. Also send an admin registration alert to Reuben
    if (cleanEmail !== adminEmail) {
      try {
        const adminResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'REUBG MERCH LAB <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `🔔 [MERCH LAB] New Launch Subscriber: ${cleanEmail}`,
            html: `
              <div style="background-color: #0d0d10; color: #edece6; font-family: monospace, sans-serif; padding: 30px 20px; max-width: 550px; border: 1px solid #FF1E27;">
                <h2 style="color: #FF1E27; margin: 0 0 10px 0;">NEW MERCH LAB SUBSCRIBER</h2>
                <p style="color: #ffffff; font-size: 14px;">A visitor just registered for the <strong>Concept 2026</strong> drop reminder:</p>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-left: 3px solid #FF1E27; margin: 15px 0;">
                  <div><strong>Email:</strong> <span style="color: #ffffff;">${cleanEmail}</span></div>
                  <div><strong>Registered At:</strong> ${new Date().toLocaleString()}</div>
                  <div><strong>Target:</strong> Concept 2026 Drop</div>
                  <div><strong>Source:</strong> https://reubg.in/merch-lab</div>
                </div>
              </div>
            `,
          }),
        });

        const adminData = await adminResponse.json();
        if (adminResponse.ok) {
          adminDelivered = true;
          if (!messageId) messageId = adminData.id;
        }
      } catch (err) {
        console.warn('Admin alert send skipped:', err);
      }
    }

    return res.status(200).json({
      success: true,
      delivered: subscriberDelivered || adminDelivered,
      subscriberDelivered,
      adminDelivered,
      id: messageId,
      email: cleanEmail,
    });
  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
