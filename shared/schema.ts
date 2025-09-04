import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Copyright Claim Table
export const copyrightClaims = pgTable("copyright_claims", {
  id: serial("id").primaryKey(),
  claimantName: text("claimant_name").notNull(),
  claimantEmail: text("claimant_email").notNull(),
  copyrightedWork: text("copyrighted_work").notNull(),
  infringingUrl: text("infringing_url").notNull(),
  description: text("description").notNull(),
  contactDetails: text("contact_details"),
  evidenceFilePath: text("evidence_file_path").notNull(),
  evidenceFileName: text("evidence_file_name").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  status: text("status").default("pending").notNull(), // pending, reviewing, resolved, rejected
});

export const insertCopyrightClaimSchema = createInsertSchema(copyrightClaims).omit({
  id: true,
  submittedAt: true,
  status: true,
  evidenceFilePath: true,
  evidenceFileName: true,
}).extend({
  claimantName: z.string().min(1, "Name is required"),
  claimantEmail: z.string().email("Please enter a valid email address"),
  copyrightedWork: z.string().min(1, "Please describe your copyrighted work"),
  infringingUrl: z.string().url("Please enter a valid URL"),
  description: z.string().min(10, "Please provide a detailed description (minimum 10 characters)"),
  contactDetails: z.string().optional(),
});

export type InsertCopyrightClaim = z.infer<typeof insertCopyrightClaimSchema>;
export type CopyrightClaim = typeof copyrightClaims.$inferSelect;
