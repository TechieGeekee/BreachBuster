import { users, type User, type InsertUser, copyrightClaims, type CopyrightClaim, type InsertCopyrightClaim } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createCopyrightClaim(claim: InsertCopyrightClaim, evidenceFilePath: string, evidenceFileName: string): Promise<CopyrightClaim>;
  getCopyrightClaims(): Promise<CopyrightClaim[]>;
  getCopyrightClaim(id: number): Promise<CopyrightClaim | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private copyrightClaims: Map<number, CopyrightClaim>;
  currentUserId: number;
  currentClaimId: number;

  constructor() {
    this.users = new Map();
    this.copyrightClaims = new Map();
    this.currentUserId = 1;
    this.currentClaimId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCopyrightClaim(insertClaim: InsertCopyrightClaim, evidenceFilePath: string, evidenceFileName: string): Promise<CopyrightClaim> {
    const id = this.currentClaimId++;
    const claim: CopyrightClaim = {
      ...insertClaim,
      id,
      submittedAt: new Date(),
      status: "pending",
      contactDetails: insertClaim.contactDetails || null,
      evidenceFilePath,
      evidenceFileName
    };
    this.copyrightClaims.set(id, claim);
    return claim;
  }

  async getCopyrightClaims(): Promise<CopyrightClaim[]> {
    return Array.from(this.copyrightClaims.values());
  }

  async getCopyrightClaim(id: number): Promise<CopyrightClaim | undefined> {
    return this.copyrightClaims.get(id);
  }
}

export const storage = new MemStorage();
