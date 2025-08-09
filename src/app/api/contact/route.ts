import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { ContactFormData, ContactResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    const body: ContactFormData = await request.json();
    
    // Validation
    const { firstName, lastName, email, message } = body;
    
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    // Email Configuration using Gmail SMTP
    const gmailUser = process.env.SMTP_USER || 'chrisfennell@gmail.com';
    const gmailPassword = process.env.SMTP_PASS || 'dbvfxjgiacwrrbbw'; // Gmail App Password
    
    if (gmailPassword) {
      try {
        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: gmailUser,
            pass: gmailPassword,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        
        const emailContent = `
New Contact Form Submission from Chan Riiny's Portfolio

Name: ${firstName} ${lastName}
Email: ${email}
Message: ${message}

Submitted: ${new Date().toISOString()}
        `;
        
        // Send email
        await transporter.sendMail({
          from: `"CustomsByChan Portfolio" <${gmailUser}>`,
          to: process.env.SMTP_TO || 'chrisfennell@gmail.com',
          subject: 'New Contact Form Submission - Chan Riiny Portfolio',
          text: emailContent,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-left: 3px solid #000; margin: 10px 0;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  <em>Submitted: ${new Date().toLocaleString()}</em>
                </p>
              </div>
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px;">
                  This message was sent from the contact form on Chan Riiny's portfolio website.
                </p>
              </div>
            </div>
          `,
          replyTo: email, // Allow Chan to reply directly to the sender
        });
        
        console.log('Email sent successfully to:', gmailUser);
        
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Fall back to logging if email fails
        console.log('Contact form submission (email failed):', {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          message: message.trim(),
          timestamp: new Date().toISOString(),
        });
      }
    } else {
      // Fallback: log to console if Gmail is not configured
      console.log('Contact form submission (Gmail not configured):', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });
    }
    
    return NextResponse.json(
      { success: true, message: 'Thank you for your message. I\'ll get back to you soon.' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 