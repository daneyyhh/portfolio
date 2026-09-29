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
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>REUBG MERCH LAB // Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #08080A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
              <div style="background-color: #08080A; width: 100%; padding: 40px 16px; margin: 0 auto; box-sizing: border-box;">
                
                <!-- Outer Cinematic Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #0D0D12; border: 1px solid rgba(255, 255, 255, 0.1); border-top: 3px solid #FF1E27; border-collapse: separate; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);">
                  
                  <!-- Top Protocol Bar -->
                  <tr>
                    <td style="padding: 24px 32px 18px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background-color: #0A0A0E;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="left" style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #FF1E27; text-transform: uppercase;">
                            REUBG DEV // ATELIER DISPATCH
                          </td>
                          <td align="right" style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 10px; color: #71717A; letter-spacing: 1px; text-transform: uppercase;">
                            SYS-ID: ML-2026
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Hero Header Section -->
                  <tr>
                    <td style="padding: 36px 32px 24px 32px;">
                      <div style="display: inline-block; padding: 4px 10px; background-color: rgba(255, 30, 39, 0.12); border: 1px solid rgba(255, 30, 39, 0.3); font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; font-weight: 700; color: #FF1E27; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px;">
                        ● CONFIDENTIAL DROP STATUS: CONFIRMED
                      </div>
                      <h1 style="margin: 0; font-size: 32px; font-weight: 900; line-height: 1.1; color: #FFFFFF; letter-spacing: -0.5px; text-transform: uppercase;">
                        MERCH LAB
                      </h1>
                      <p style="margin: 8px 0 0 0; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #A1A1AA; text-transform: uppercase;">
                        CONCEPT 2026 // UNDER DEVELOPMENT
                      </p>
                    </td>
                  </tr>

                  <!-- Narrative Introduction -->
                  <tr>
                    <td style="padding: 0 32px 24px 32px; color: #E4E4E7; font-size: 15px; line-height: 1.65;">
                      Your address (<span style="color: #FFFFFF; font-family: 'SFMono-Regular', Consolas, monospace; font-weight: 600;">${cleanEmail}</span>) has been securely registered for the <strong>Concept 2026</strong> drop dispatch.
                    </td>
                  </tr>

                  <!-- Technical Specifications Blueprint Grid -->
                  <tr>
                    <td style="padding: 0 32px 28px 32px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #070709; border: 1px solid rgba(255, 255, 255, 0.08); font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; line-height: 1.6;">
                        <tr>
                          <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #71717A; width: 38%;">SPEC ARCHIVE</td>
                          <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #FFFFFF; font-weight: 600;">ML-2026-DROP-SPEC</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #71717A;">NOTIFICATION TIER</td>
                          <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #FF1E27; font-weight: 700;">TIER 01 (PRE-RELEASE ACCESS)</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #71717A;">DISPATCH CADENCE</td>
                          <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); color: #D4D4D8;">AUTOMATED SINGLE LAUNCH ALERT</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; color: #71717A;">LOCATION / ORIGIN</td>
                          <td style="padding: 12px 16px; color: #D4D4D8;">KERALA, INDIA · 9.9312° N, 76.2673° E</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Editorial Philosophy Quote Block -->
                  <tr>
                    <td style="padding: 0 32px 32px 32px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left: 2px solid #FF1E27; padding-left: 16px;">
                        <tr>
                          <td>
                            <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; color: #FFFFFF; text-transform: uppercase;">
                              “SAME MINDSET. DIFFERENT MEDIUM.”
                            </div>
                            <div style="font-size: 13px; line-height: 1.6; color: #A1A1AA; margin-top: 6px;">
                              Translating procedural craft, computational precision, and engineering discipline into tangible reality. Undergoing rigorous material tests until release criteria are met.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- CTA Button Row -->
                  <tr>
                    <td style="padding: 0 32px 36px 32px;" align="left">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="background-color: #FF1E27; border-radius: 2px;">
                            <a href="https://reubg.in/merch-lab" target="_blank" style="display: inline-block; padding: 14px 28px; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; font-weight: 800; color: #FFFFFF; text-decoration: none; letter-spacing: 2px; text-transform: uppercase;">
                              EXPLORE MERCH LAB ATELIER &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Cinematic Legal & Verification Footer -->
                  <tr>
                    <td style="padding: 24px 32px; background-color: #08080B; border-top: 1px solid rgba(255, 255, 255, 0.08); font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; line-height: 1.7; color: #52525B;">
                      <div style="color: #A1A1AA; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                        REUBEN BINU GEORGE &middot; REUBG DEV
                      </div>
                      <div>
                        Full Stack Architect &amp; Creative Developer &middot; Kerala, India
                      </div>
                      <div style="margin-top: 8px;">
                        <a href="https://reubg.in" style="color: #FF1E27; text-decoration: none;">reubg.in</a> &nbsp;&middot;&nbsp; 
                        <a href="https://github.com/daneyyhh" style="color: #71717A; text-decoration: none;">github.com/daneyyhh</a> &nbsp;&middot;&nbsp; 
                        <a href="https://linkedin.com/in/daneyyhh" style="color: #71717A; text-decoration: none;">linkedin.com/in/daneyyhh</a>
                      </div>
                      <div style="margin-top: 12px; color: #3F3F46;">
                        Strictly zero marketing spam. You received this because you registered at reubg.in/merch-lab.
                      </div>
                    </td>
                  </tr>

                </table>

              </div>
            </body>
            </html>
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
              <div style="background-color: #08080A; color: #EDECE6; font-family: -apple-system, BlinkMacSystemFont, monospace, sans-serif; padding: 32px 20px; max-width: 560px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1); border-top: 3px solid #FF1E27;">
                <div style="font-family: monospace; font-size: 11px; font-weight: 800; color: #FF1E27; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
                  🔔 REUBG DEV // ATELIER TELEMETRY
                </div>
                <h2 style="color: #FFFFFF; font-size: 22px; font-weight: 900; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: -0.5px;">
                  NEW MERCH LAB SUBSCRIBER
                </h2>
                <p style="color: #A1A1AA; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0;">
                  A new visitor has enrolled in the confidential Concept 2026 launch dispatch:
                </p>
                <table style="width: 100%; border-collapse: collapse; font-family: monospace; font-size: 11px; background: #0D0D12; border: 1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #71717A;">SUBSCRIBER</td>
                    <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #FFFFFF; font-weight: bold;">${cleanEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #71717A;">TIMESTAMP</td>
                    <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #D4D4D8;">${new Date().toISOString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #71717A;">TARGET RELEASE</td>
                    <td style="padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #FF1E27; font-weight: bold;">CONCEPT 2026 DROP</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; color: #71717A;">SOURCE ATELIER</td>
                    <td style="padding: 10px 14px; color: #D4D4D8;">https://reubg.in/merch-lab</td>
                  </tr>
                </table>
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
