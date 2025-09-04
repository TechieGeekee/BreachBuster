import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sgMail from "@sendgrid/mail";
import { z } from "zod";
import crypto from "crypto";
import { insertCopyrightClaimSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Function to hash password using SHA-1 for HaveIBeenPwned API
function hashPassword(password: string): string {
  return crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
}

// Initialize SendGrid (optional in development)
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else if (process.env.NODE_ENV === 'production') {
  throw new Error("SENDGRID_API_KEY environment variable is required in production");
} else {
  console.warn("⚠️  SENDGRID_API_KEY not set - email functionality will be disabled");
}

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100, "Company name too long").optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(1000, "Message too long"),
});

// Newsletter subscription validation schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Bug report validation schema
const bugReportSchema = z.object({
  reporter_name: z.string().min(1, "Name is required").max(100, "Name too long"),
  reporter_email: z.string().email("Invalid email address"),
  severity: z.enum(["critical", "high", "medium", "low"], {
    errorMap: () => ({ message: "Please select a severity level" })
  }),
  category: z.enum(["security", "performance", "ui", "functionality", "compatibility", "other"], {
    errorMap: () => ({ message: "Please select a category" })
  }),
  summary: z.string().min(5, "Summary must be at least 5 characters").max(200, "Summary too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description too long"),
  environment: z.string().max(500, "Environment info too long").optional(),
});

// Feedback validation schema
const feedbackSchema = z.object({
  userName: z.string().min(1, "Name is required").max(100, "Name too long"),
  userEmail: z.string().email("Invalid email address"),
  feedbackType: z.enum(["feature-request", "bug-report", "improvement", "user-experience", "security", "performance", "general"], {
    errorMap: () => ({ message: "Please select a feedback type" })
  }),
  feedbackTitle: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject too long"),
  feedbackMessage: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
  priorityLevel: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a priority level" })
  }),
  experienceRating: z.string().optional(),
  timestamp: z.string().optional(),
  userAgent: z.string().optional(),
});

// Password check validation schema
const passwordCheckSchema = z.object({
  hashPrefix: z.string().length(5, "Hash prefix must be exactly 5 characters"),
});

// Configure multer for file uploads
const uploadDir = 'uploads/copyright-claims';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, videos, and documents are allowed'));
    }
  }
});

// Maintenance configuration utilities
const MAINTENANCE_CONFIG_PATH = path.join(process.cwd(), 'maintenance.config.json');

interface MaintenanceConfig {
  maintenance: boolean;
  message: string;
  estimatedTime: string;
  lastUpdated: string;
}

function readMaintenanceConfig(): MaintenanceConfig {
  try {
    if (fs.existsSync(MAINTENANCE_CONFIG_PATH)) {
      const data = fs.readFileSync(MAINTENANCE_CONFIG_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading maintenance config:', error);
  }
  
  // Default config
  return {
    maintenance: false,
    message: "We're enhancing our security protocols and will be back shortly!",
    estimatedTime: "30 minutes",
    lastUpdated: new Date().toISOString()
  };
}

function writeMaintenanceConfig(config: MaintenanceConfig): void {
  try {
    config.lastUpdated = new Date().toISOString();
    fs.writeFileSync(MAINTENANCE_CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error writing maintenance config:', error);
    throw error;
  }
}

export function isMaintenanceMode(): boolean {
  return readMaintenanceConfig().maintenance;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Maintenance mode endpoints
  app.get("/api/maintenance", (req, res) => {
    try {
      const config = readMaintenanceConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to read maintenance configuration" 
      });
    }
  });

  app.post("/api/maintenance", (req, res) => {
    try {
      const { maintenance, message, estimatedTime } = req.body;
      
      const config = readMaintenanceConfig();
      
      if (typeof maintenance === 'boolean') {
        config.maintenance = maintenance;
      }
      if (typeof message === 'string') {
        config.message = message;
      }
      if (typeof estimatedTime === 'string') {
        config.estimatedTime = estimatedTime;
      }
      
      writeMaintenanceConfig(config);
      
      res.json({ 
        success: true, 
        message: `Maintenance mode ${config.maintenance ? 'enabled' : 'disabled'}`,
        config 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update maintenance configuration" 
      });
    }
  });

  // Test SendGrid configuration endpoint
  app.get("/api/test-sendgrid", async (req, res) => {
    try {
      console.log("Testing SendGrid configuration...");
      console.log("SendGrid API Key exists:", !!process.env.SENDGRID_API_KEY);
      console.log("SendGrid API Key length:", process.env.SENDGRID_API_KEY?.length || 0);
      
      // Send a simple test email
      const testEmail = {
        to: "abhinavkoolath@gmail.com",
        from: "abhinavkoolath@gmail.com",
        subject: "SendGrid Test - Breach Buster",
        text: "This is a test email to verify SendGrid configuration.",
        html: "<p>This is a test email to verify SendGrid configuration.</p>"
      };
      
      console.log("Sending test email...");
      const result = await sgMail.send(testEmail);
      console.log("SendGrid test result:", result);
      
      res.json({ success: true, message: "Test email sent successfully!" });
    } catch (error: any) {
      console.error("SendGrid test error:", error);
      if (error.response && error.response.body) {
        console.error("SendGrid error details:", JSON.stringify(error.response.body, null, 2));
      }
      res.status(500).json({ 
        success: false, 
        message: "SendGrid test failed", 
        error: error.message,
        details: error.response?.body 
      });
    }
  });
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const { name, email, company, message } = contactFormSchema.parse(req.body);

      // Create email content
      const emailContent = {
        to: "abhinavkoolath@gmail.com",
        from: "abhinavkoolath@gmail.com", // Use your verified email as sender
        replyTo: email,
        subject: `🔒 DataGuard Contact: Message from ${name}`,
        html: `
          <div style="font-family: 'Courier New', monospace; background: linear-gradient(135deg, #0f172a, #1e293b); color: #e2e8f0; padding: 30px; border-radius: 12px; border: 2px solid #3b82f6;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3b82f6; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">🔒 SECURITY CONTACT ALERT</h1>
              <div style="background: rgba(59, 130, 246, 0.2); padding: 8px 16px; border-radius: 6px; display: inline-block; margin-top: 10px;">
                <span style="color: #3b82f6; font-size: 12px; font-weight: bold;">NEW MESSAGE RECEIVED</span>
              </div>
            </div>
            
            <div style="background: rgba(15, 23, 42, 0.8); padding: 25px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3); margin-bottom: 20px;">
              <h2 style="color: #10b981; margin-top: 0; font-size: 18px;">📝 Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
                  <td style="padding: 12px 0; color: #94a3b8; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 12px 0; color: #e2e8f0;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
                  <td style="padding: 12px 0; color: #94a3b8; font-weight: bold;">Email:</td>
                  <td style="padding: 12px 0; color: #3b82f6;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                </tr>
                ${company ? `
                <tr style="border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
                  <td style="padding: 12px 0; color: #94a3b8; font-weight: bold;">Company:</td>
                  <td style="padding: 12px 0; color: #e2e8f0;">${company}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; color: #94a3b8; font-weight: bold;">Timestamp:</td>
                  <td style="padding: 12px 0; color: #e2e8f0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: rgba(15, 23, 42, 0.8); padding: 25px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);">
              <h2 style="color: #10b981; margin-top: 0; font-size: 18px;">💬 Message</h2>
              <div style="background: rgba(59, 130, 246, 0.1); padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(59, 130, 246, 0.3);">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                🛡️ This message was sent through the DataGuard Security contact form<br>
                <span style="color: #10b981;">🔐 Transmission secured with AES-256 encryption</span>
              </p>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Timestamp: ${new Date().toLocaleString()}

Message:
${message}

---
This message was sent through the DataGuard Security contact form.
        `.trim()
      };

      // Send email
      await sgMail.send(emailContent);

      res.json({ 
        success: true, 
        message: "Message sent successfully! We'll get back to you soon." 
      });

    } catch (error: any) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors.map(err => err.message)
        });
      }

      // Log SendGrid specific errors for debugging
      if (error.response && error.response.body) {
        console.error("SendGrid error details:", JSON.stringify(error.response.body, null, 2));
      }

      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later."
      });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      // Validate request body
      const { email } = newsletterSchema.parse(req.body);

      // Create welcome email content - simplified version to avoid spam filters
      const welcomeEmailContent = {
        to: email,
        from: "abhinavkoolath@gmail.com", // Use your verified email as sender
        subject: "Welcome to Breach Buster - Account Activated",
        text: `
Welcome to Breach Buster!

Hi there,

Thanks for subscribing to our security newsletter. Your account has been activated successfully.

Your email: ${email}

What's included:
• Real-time breach detection and alerts
• Advanced password generation tools  
• 24/7 security monitoring
• Expert cybersecurity insights

We'll send you important security updates and tips to keep your digital life protected.

Visit our website: https://localhost:5000

Best regards,
The Breach Buster Team

---
You're receiving this because you subscribed at our website.
To unsubscribe, please contact us.
        `.trim(),
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a202c; margin: 0; font-size: 28px;">🛡️ Breach Buster</h1>
              <p style="color: #059669; margin: 10px 0 0 0; font-size: 16px; font-weight: bold;">Security Account Activated</p>
            </div>

            <div style="margin-bottom: 25px;">
              <h2 style="color: #1a202c; font-size: 20px; margin-bottom: 15px;">Welcome aboard!</h2>
              <p style="color: #4a5568; line-height: 1.6; margin-bottom: 15px;">
                Thanks for subscribing to our security newsletter. Your account has been successfully activated.
              </p>
              <p style="color: #4a5568; line-height: 1.6;">
                <strong>Your email:</strong> ${email}
              </p>
            </div>

            <div style="background-color: #f7fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <h3 style="color: #1a202c; margin-top: 0; font-size: 18px;">What's included:</h3>
              <ul style="color: #4a5568; margin: 10px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Real-time breach detection and alerts</li>
                <li style="margin-bottom: 8px;">Advanced password generation tools</li>
                <li style="margin-bottom: 8px;">24/7 security monitoring</li>
                <li style="margin-bottom: 8px;">Expert cybersecurity insights</li>
              </ul>
            </div>

            <div style="text-align: center; margin-bottom: 25px;">
              <a href="http://localhost:5000" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Visit Website</a>
            </div>

            <div style="text-align: center; color: #718096; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Best regards,<br>The Breach Buster Team</p>
              <p style="margin-top: 15px;">You're receiving this because you subscribed at our website.</p>
            </div>
          </div>
        </div>
        `.trim()
      };

      // Send welcome email
      console.log(`🔍 EMAIL DEBUG INFO:`);
      console.log(`📧 TO (recipient): ${email}`);
      console.log(`📤 FROM (sender): ${welcomeEmailContent.from}`);
      console.log(`📋 SUBJECT: ${welcomeEmailContent.subject}`);
      console.log(`🎯 Email should go TO: ${email} (NOT to sender)`);
      
      const result = await sgMail.send(welcomeEmailContent);
      console.log('✅ SendGrid response:', result);
      console.log(`📬 Welcome email sent successfully TO: ${email}`);

      res.json({ 
        success: true, 
        message: "🚀 Welcome aboard, Cyber Defender! Check your email for important security details." 
      });

    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
          errors: error.errors.map(err => err.message)
        });
      }

      // Log SendGrid specific errors for debugging
      if (error.response && error.response.body) {
        console.error("SendGrid error details:", JSON.stringify(error.response.body, null, 2));
        console.error("SendGrid status code:", error.response.statusCode);
      }
      
      // Log the full error for debugging
      console.error("Full error object:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      res.status(500).json({
        success: false,
        message: "Failed to process subscription. Please try again later.",
        error: error.message // Add error message for debugging
      });
    }
  });

  // Feedback submission endpoint
  app.post("/api/feedback", async (req, res) => {
    try {
      // Log request body for debugging
      console.log("Feedback submission request:", req.body);
      
      // Validate input
      const validatedData = feedbackSchema.parse(req.body);
      
      // Check if Discord webhook URL is configured
      if (!process.env.DISCORD_WEBHOOK_URL) {
        console.warn("⚠️  DISCORD_WEBHOOK_URL not configured - feedback cannot be sent");
        return res.status(500).json({
          success: false,
          message: "Feedback system is temporarily unavailable. Please try again later."
        });
      }

      // Create Discord embed message
      const typeColors = {
        "feature-request": 5763719,    // Green
        "bug-report": 15548997,       // Red
        "improvement": 3447003,       // Blue
        "user-experience": 10181046,  // Purple
        "security": 15105570,         // Orange
        "performance": 16776960,      // Yellow
        "general": 9807270            // Gray
      };

      const typeEmojis = {
        "feature-request": "🚀",
        "bug-report": "🐛",
        "improvement": "⚡",
        "user-experience": "🎨",
        "security": "🔒",
        "performance": "⚡",
        "general": "💬"
      };

      const priorityEmojis = {
        "low": "🟢",
        "medium": "🟡", 
        "high": "🔴"
      };

      const discordPayload = {
        embeds: [{
          title: `${typeEmojis[validatedData.feedbackType]} New ${validatedData.feedbackType.replace('-', ' ').toUpperCase()}: ${validatedData.feedbackTitle}`,
          description: validatedData.feedbackMessage,
          color: typeColors[validatedData.feedbackType],
          fields: [
            {
              name: "👤 User",
              value: `${validatedData.userName}\n${validatedData.userEmail}`,
              inline: true
            },
            {
              name: "🔍 Priority",
              value: `${priorityEmojis[validatedData.priorityLevel]} ${validatedData.priorityLevel.toUpperCase()}`,
              inline: true
            },
            {
              name: "📂 Type", 
              value: `${typeEmojis[validatedData.feedbackType]} ${validatedData.feedbackType.replace('-', ' ')}`,
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Breach Buster Community Feedback",
            icon_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png"
          }
        }]
      };

      // Add experience rating if provided
      if (validatedData.experienceRating && validatedData.experienceRating.trim()) {
        const rating = parseInt(validatedData.experienceRating);
        const stars = "⭐".repeat(rating);
        discordPayload.embeds[0].fields.push({
          name: "⭐ Experience Rating",
          value: `${stars} (${rating}/5)`,
          inline: true
        });
      }

      // Add user agent info if provided
      if (validatedData.userAgent && validatedData.userAgent.trim()) {
        // Extract browser and OS info
        const browserInfo = validatedData.userAgent.includes('Chrome') ? 'Chrome' :
                           validatedData.userAgent.includes('Firefox') ? 'Firefox' :
                           validatedData.userAgent.includes('Safari') ? 'Safari' :
                           validatedData.userAgent.includes('Edge') ? 'Edge' : 'Unknown';
        
        const osInfo = validatedData.userAgent.includes('Windows') ? 'Windows' :
                      validatedData.userAgent.includes('Mac') ? 'macOS' :
                      validatedData.userAgent.includes('Linux') ? 'Linux' :
                      validatedData.userAgent.includes('Android') ? 'Android' :
                      validatedData.userAgent.includes('iOS') ? 'iOS' : 'Unknown';

        discordPayload.embeds[0].fields.push({
          name: "💻 Environment",
          value: `${browserInfo} on ${osInfo}`,
          inline: true
        });
      }

      // Send to Discord webhook
      const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
      });

      if (!response.ok) {
        throw new Error(`Discord webhook failed with status: ${response.status}`);
      }

      console.log(`Feedback submitted successfully by ${validatedData.userName} (${validatedData.feedbackType})`);

      res.json({
        success: true,
        message: "Feedback sent successfully! Our team values your input and will review it promptly."
      });

    } catch (error: any) {
      console.error("Feedback submission error:", error);
      
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return res.status(400).json({
          success: false,
          message: `Validation failed: ${errorMessages.join(', ')}`,
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to submit feedback. Please try again later.",
        error: error.message
      });
    }
  });

  // Bug report submission endpoint
  app.post("/api/bug-report", async (req, res) => {
    try {
      // Log request body for debugging
      console.log("Bug report request body:", req.body);
      
      // Validate input
      const validatedData = bugReportSchema.parse(req.body);
      
      // Check if Discord webhook URL is configured
      if (!process.env.DISCORD_WEBHOOK_URL) {
        console.warn("⚠️  DISCORD_WEBHOOK_URL not configured - bug report cannot be sent");
        return res.status(500).json({
          success: false,
          message: "Bug reporting system is temporarily unavailable. Please try again later."
        });
      }

      // Create Discord embed message
      const severityColors = {
        critical: 15548997, // Red
        high: 15105570,    // Orange
        medium: 16776960,  // Yellow
        low: 5763719       // Green
      };

      const categoryEmojis = {
        security: "🛡️",
        performance: "⚡",
        ui: "🎨",
        functionality: "⚙️",
        compatibility: "🌐",
        other: "❓"
      };

      const discordPayload = {
        embeds: [{
          title: `🐛 New Bug Report: ${validatedData.summary}`,
          description: validatedData.description,
          color: severityColors[validatedData.severity],
          fields: [
            {
              name: "👤 Reporter",
              value: `${validatedData.reporter_name}\n${validatedData.reporter_email}`,
              inline: true
            },
            {
              name: "🔍 Severity",
              value: `${validatedData.severity.toUpperCase()}`,
              inline: true
            },
            {
              name: "📂 Category", 
              value: `${categoryEmojis[validatedData.category]} ${validatedData.category}`,
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "BreachBuster Bug Report System",
            icon_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png"
          }
        }]
      };

      // Add environment info if provided
      if (validatedData.environment && validatedData.environment.trim()) {
        discordPayload.embeds[0].fields.push({
          name: "💻 Environment",
          value: validatedData.environment,
          inline: false
        });
      }

      // Send to Discord webhook
      const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
      });

      if (!response.ok) {
        throw new Error(`Discord webhook failed with status: ${response.status}`);
      }

      console.log(`Bug report submitted successfully by ${validatedData.reporter_name} (${validatedData.severity})`);

      res.json({
        success: true,
        message: "Bug report transmitted successfully! Our team will investigate the issue."
      });

    } catch (error: any) {
      console.error("Bug report submission error:", error);
      
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return res.status(400).json({
          success: false,
          message: `Validation failed: ${errorMessages.join(', ')}`,
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to submit bug report. Please try again later.",
        error: error.message
      });
    }
  });

  // Copyright claim submission endpoint with file upload
  app.post("/api/copyright-claim", upload.single('evidenceFile'), async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Evidence file is required. Please upload an image, video, or document."
        });
      }

      // Validate input
      const validatedData = insertCopyrightClaimSchema.parse(req.body);
      
      // Store the claim with file information
      const claim = await storage.createCopyrightClaim(
        validatedData, 
        req.file.path, 
        req.file.originalname
      );
      
      // Check if Discord webhook URL is configured
      if (!process.env.DISCORD_WEBHOOK_URL) {
        console.warn("⚠️  DISCORD_WEBHOOK_URL not configured - copyright claim cannot be sent to Discord");
        // Still proceed with success since we stored the claim
        return res.json({
          success: true,
          message: "Copyright claim submitted successfully! We will review your request within 24 hours."
        });
      }

      // Create Discord embed message
      const discordPayload = {
        embeds: [{
          title: "📋 New Copyright Claim Submitted",
          description: "A new copyright infringement claim has been submitted and requires review.",
          color: 15548997, // Red color for urgent attention
          fields: [
            {
              name: "👤 Claimant",
              value: `${validatedData.claimantName}\n${validatedData.claimantEmail}`,
              inline: true
            },
            {
              name: "📄 Copyrighted Work",
              value: validatedData.copyrightedWork,
              inline: true
            },
            {
              name: "🔗 Infringing URL",
              value: validatedData.infringingUrl,
              inline: false
            },
            {
              name: "📎 Evidence File",
              value: `${req.file.originalname} (${(req.file.size / 1024 / 1024).toFixed(2)} MB)`,
              inline: true
            },
            {
              name: "📝 Description",
              value: validatedData.description.length > 1000 
                ? validatedData.description.substring(0, 1000) + "..." 
                : validatedData.description,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Copyright Claim System - Response Required within 24 hours",
            icon_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png"
          }
        }]
      };

      // Add contact details if provided
      if (validatedData.contactDetails && validatedData.contactDetails.trim()) {
        discordPayload.embeds[0].fields.push({
          name: "📞 Additional Contact Details",
          value: validatedData.contactDetails,
          inline: false
        });
      }

      // Send to Discord webhook
      const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
      });

      if (!response.ok) {
        console.error(`Discord webhook failed with status: ${response.status}`);
        // Still return success since we stored the claim
      } else {
        console.log(`Copyright claim submitted successfully by ${validatedData.claimantName} for ${validatedData.infringingUrl}`);
      }

      res.json({
        success: true,
        message: "Copyright claim submitted successfully! We will review your request within 24 hours and respond via email."
      });

    } catch (error: any) {
      console.error("Copyright claim submission error:", error);
      
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return res.status(400).json({
          success: false,
          message: `Please check your form data: ${errorMessages.join(', ')}`,
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to submit copyright claim. Please try again later."
      });
    }
  });

  // Serve bug report page (both routes for compatibility)
  app.get("/bug-report", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public/pages/bug-report.html'));
  });

  app.get("/pages/bug-report", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public/pages/bug-report.html'));
  });

  // Serve suggestions page
  app.get("/suggestions", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public/pages/suggestions.html'));
  });

  app.get("/pages/suggestions", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public/pages/suggestions.html'));
  });

  // Serve feedback page
  app.get("/feedback", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public/pages/feedback.html'));
  });

  app.get("/pages/feedback", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public/pages/feedback.html'));
  });

  // Password breach check endpoint using HaveIBeenPwned API
  app.post("/api/check-password", async (req, res) => {
    try {
      // Validate request body - expect password from frontend
      const { password } = z.object({
        password: z.string().min(1, "Password is required")
      }).parse(req.body);

      // Hash the password using SHA-1 and get the prefix
      const hashedPassword = hashPassword(password);
      const hashPrefix = hashedPassword.substring(0, 5);

      // Query HaveIBeenPwned API with the hash prefix
      const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Breach-Buster-Security-App',
        }
      });

      if (!response.ok) {
        throw new Error(`HaveIBeenPwned API responded with status: ${response.status}`);
      }

      const data = await response.text();
      
      // Get the full hash suffix to compare
      const hashSuffix = hashedPassword.substring(5).toLowerCase();
      
      // Parse the response and look for our specific hash
      const hashSuffixes = data.split('\n').map(line => {
        const [suffix, count] = line.trim().split(':');
        return { suffix: suffix.toLowerCase(), count: parseInt(count, 10) };
      }).filter(item => item.suffix && !isNaN(item.count));

      // Check if our password hash is in the breached list
      const match = hashSuffixes.find(item => item.suffix === hashSuffix);
      
      if (match) {
        // Password was found in breaches
        res.json({
          success: true,
          isBreached: true,
          count: match.count,
          message: `This password has been found in ${match.count.toLocaleString()} data breaches.`
        });
      } else {
        // Password not found in breaches
        res.json({
          success: true,
          isBreached: false,
          count: 0,
          message: "This password has not been found in any known data breaches."
        });
      }

    } catch (error: any) {
      console.error("Password check error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid request format",
          errors: error.errors.map(err => err.message)
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to check password. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
