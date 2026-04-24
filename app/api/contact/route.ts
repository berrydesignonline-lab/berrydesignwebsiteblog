import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  institution: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, phone, institution, message } = result.data

    // Send notification to Berry Design
    const { error: notifyError } = await resend.emails.send({
      from: "Berry Design Website <noreply@berrydesign.online>",
      to: "berrydesignonline@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${name}${institution ? ` — ${institution}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 32px; border-radius: 12px;">
          <div style="background: #0F1F3D; padding: 24px 32px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #E8613C; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
            <p style="color: #ffffff99; margin: 6px 0 0; font-size: 14px;">Berry Design Qatar — berrydesign.online</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #6B7280; font-size: 13px; width: 130px;">Full Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #1A1A2E; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #6B7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #1A1A2E;"><a href="mailto:${email}" style="color: #E8613C;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #6B7280; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #1A1A2E;"><a href="tel:${phone}" style="color: #E8613C;">${phone}</a></td>
            </tr>` : ""}
            ${institution ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #6B7280; font-size: 13px;">Institution</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E1DB; color: #1A1A2E;">${institution}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #6B7280; font-size: 13px; margin-bottom: 8px;">Message</p>
            <div style="background: #ffffff; border: 1px solid #E5E1DB; border-radius: 8px; padding: 16px; color: #1A1A2E; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/97431490766" style="display: inline-block; background: #25D366; color: white; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-weight: 600; font-size: 14px;">
              Reply on WhatsApp
            </a>
          </div>

          <p style="margin-top: 24px; color: #6B7280; font-size: 12px; text-align: center;">
            Submitted on ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Qatar" })} (Qatar time)
          </p>
        </div>
      `,
    })

    if (notifyError) {
      console.error("Resend notify error:", JSON.stringify(notifyError))
      return NextResponse.json({ error: notifyError.message }, { status: 500 })
    }

    // Send thank you auto-reply to the client
    await resend.emails.send({
      from: "Berry Design Qatar <sales@berrydesign.online>",
      to: email,
      replyTo: "sales@berrydesign.online",
      subject: "Thank you for contacting Berry Design Qatar",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 32px; border-radius: 12px;">
          <div style="background: #0F1F3D; padding: 24px 32px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #E8613C; margin: 0 0 6px; font-size: 24px;">Berry Design Qatar</h1>
            <p style="color: #ffffff99; margin: 0; font-size: 14px;">Design for Schools & Nurseries</p>
          </div>

          <h2 style="color: #1A1A2E; font-size: 20px; margin-bottom: 8px;">Hi ${name},</h2>
          <p style="color: #1A1A2E; line-height: 1.7; margin-bottom: 16px;">
            Thank you for reaching out to Berry Design Qatar. We've received your message and will get back to you within <strong>24 hours</strong>.
          </p>
          <p style="color: #6B7280; line-height: 1.7; margin-bottom: 24px;">
            In the meantime, feel free to chat with us directly on WhatsApp — we're usually available and happy to answer any questions right away.
          </p>

          <div style="text-align: center; margin-bottom: 32px;">
            <a href="https://wa.me/97431490766" style="display: inline-block; background: #25D366; color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 15px;">
              Chat on WhatsApp
            </a>
          </div>

          <div style="background: #ffffff; border: 1px solid #E5E1DB; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #6B7280; font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Your message</p>
            <p style="color: #1A1A2E; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 14px;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #E5E1DB; margin: 24px 0;" />

          <div style="text-align: center;">
            <p style="color: #6B7280; font-size: 13px; margin: 0 0 4px;">Berry Design Qatar</p>
            <p style="color: #6B7280; font-size: 13px; margin: 0 0 4px;">
              <a href="mailto:sales@berrydesign.online" style="color: #E8613C; text-decoration: none;">sales@berrydesign.online</a>
              &nbsp;·&nbsp;
              <a href="https://wa.me/97431490766" style="color: #E8613C; text-decoration: none;">+974 3149 0766</a>
            </p>
            <p style="color: #9CA3AF; font-size: 12px; margin: 4px 0 0;">Doha, Qatar</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
