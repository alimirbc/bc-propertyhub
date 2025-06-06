import {
  users,
  properties,
  tenants,
  maintenanceRequests,
  transactions,
  type User,
  type UpsertUser,
  type Property,
  type InsertProperty,
  type Tenant,
  type InsertTenant,
  type MaintenanceRequest,
  type InsertMaintenanceRequest,
  type Transaction,
  type InsertTransaction,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Property operations
  getProperties(userId: string): Promise<Property[]>;
  getProperty(id: number, userId: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty, userId: string): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>, userId: string): Promise<Property | undefined>;
  deleteProperty(id: number, userId: string): Promise<boolean>;
  
  // Tenant operations
  getTenants(propertyId: number, userId: string): Promise<Tenant[]>;
  getTenant(id: number, userId: string): Promise<Tenant | undefined>;
  createTenant(tenant: InsertTenant, userId: string): Promise<Tenant>;
  updateTenant(id: number, tenant: Partial<InsertTenant>, userId: string): Promise<Tenant | undefined>;
  deleteTenant(id: number, userId: string): Promise<boolean>;
  
  // Maintenance operations
  getMaintenanceRequests(propertyId: number, userId: string): Promise<MaintenanceRequest[]>;
  createMaintenanceRequest(request: InsertMaintenanceRequest, userId: string): Promise<MaintenanceRequest>;
  updateMaintenanceRequest(id: number, request: Partial<InsertMaintenanceRequest>, userId: string): Promise<MaintenanceRequest | undefined>;
  
  // Transaction operations
  getTransactions(propertyId: number, userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction, userId: string): Promise<Transaction>;
  
  // Dashboard stats
  getDashboardStats(userId: string): Promise<{
    totalProperties: number;
    occupiedProperties: number;
    totalMonthlyRent: number;
    pendingMaintenance: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Property operations
  async getProperties(userId: string): Promise<Property[]> {
    return await db
      .select()
      .from(properties)
      .where(eq(properties.userId, userId))
      .orderBy(desc(properties.createdAt));
  }

  async getProperty(id: number, userId: string): Promise<Property | undefined> {
    const [property] = await db
      .select()
      .from(properties)
      .where(and(eq(properties.id, id), eq(properties.userId, userId)));
    return property;
  }

  async createProperty(property: InsertProperty, userId: string): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values({ ...property, userId })
      .returning();
    return newProperty;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>, userId: string): Promise<Property | undefined> {
    const [updatedProperty] = await db
      .update(properties)
      .set({ ...property, updatedAt: new Date() })
      .where(and(eq(properties.id, id), eq(properties.userId, userId)))
      .returning();
    return updatedProperty;
  }

  async deleteProperty(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(properties)
      .where(and(eq(properties.id, id), eq(properties.userId, userId)));
    return result.rowCount > 0;
  }

  // Tenant operations
  async getTenants(propertyId: number, userId: string): Promise<Tenant[]> {
    // First verify the property belongs to the user
    const property = await this.getProperty(propertyId, userId);
    if (!property) return [];

    return await db
      .select()
      .from(tenants)
      .where(eq(tenants.propertyId, propertyId))
      .orderBy(desc(tenants.createdAt));
  }

  async getTenant(id: number, userId: string): Promise<Tenant | undefined> {
    const [tenant] = await db
      .select()
      .from(tenants)
      .innerJoin(properties, eq(tenants.propertyId, properties.id))
      .where(and(eq(tenants.id, id), eq(properties.userId, userId)));
    return tenant ? tenant.tenants : undefined;
  }

  async createTenant(tenant: InsertTenant, userId: string): Promise<Tenant> {
    // Verify the property belongs to the user
    if (tenant.propertyId) {
      const property = await this.getProperty(tenant.propertyId, userId);
      if (!property) throw new Error("Property not found");
    }

    const [newTenant] = await db
      .insert(tenants)
      .values(tenant)
      .returning();
    return newTenant;
  }

  async updateTenant(id: number, tenant: Partial<InsertTenant>, userId: string): Promise<Tenant | undefined> {
    // First verify the tenant belongs to user's property
    const existingTenant = await this.getTenant(id, userId);
    if (!existingTenant) return undefined;

    const [updatedTenant] = await db
      .update(tenants)
      .set({ ...tenant, updatedAt: new Date() })
      .where(eq(tenants.id, id))
      .returning();
    return updatedTenant;
  }

  async deleteTenant(id: number, userId: string): Promise<boolean> {
    // First verify the tenant belongs to user's property
    const existingTenant = await this.getTenant(id, userId);
    if (!existingTenant) return false;

    await db.delete(tenants).where(eq(tenants.id, id));
    return true;
  }

  // Maintenance operations
  async getMaintenanceRequests(propertyId: number, userId: string): Promise<MaintenanceRequest[]> {
    // Verify the property belongs to the user
    const property = await this.getProperty(propertyId, userId);
    if (!property) return [];

    return await db
      .select()
      .from(maintenanceRequests)
      .where(eq(maintenanceRequests.propertyId, propertyId))
      .orderBy(desc(maintenanceRequests.createdAt));
  }

  async createMaintenanceRequest(request: InsertMaintenanceRequest, userId: string): Promise<MaintenanceRequest> {
    // Verify the property belongs to the user
    const property = await this.getProperty(request.propertyId, userId);
    if (!property) throw new Error("Property not found");

    const [newRequest] = await db
      .insert(maintenanceRequests)
      .values(request)
      .returning();
    return newRequest;
  }

  async updateMaintenanceRequest(id: number, request: Partial<InsertMaintenanceRequest>, userId: string): Promise<MaintenanceRequest | undefined> {
    // First verify the request belongs to user's property
    const [existingRequest] = await db
      .select()
      .from(maintenanceRequests)
      .innerJoin(properties, eq(maintenanceRequests.propertyId, properties.id))
      .where(and(eq(maintenanceRequests.id, id), eq(properties.userId, userId)));

    if (!existingRequest) return undefined;

    const [updatedRequest] = await db
      .update(maintenanceRequests)
      .set({ ...request, updatedAt: new Date() })
      .where(eq(maintenanceRequests.id, id))
      .returning();
    return updatedRequest;
  }

  // Transaction operations
  async getTransactions(propertyId: number, userId: string): Promise<Transaction[]> {
    // Verify the property belongs to the user
    const property = await this.getProperty(propertyId, userId);
    if (!property) return [];

    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.propertyId, propertyId))
      .orderBy(desc(transactions.createdAt));
  }

  async createTransaction(transaction: InsertTransaction, userId: string): Promise<Transaction> {
    // Verify the property belongs to the user
    const property = await this.getProperty(transaction.propertyId, userId);
    if (!property) throw new Error("Property not found");

    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  // Dashboard stats
  async getDashboardStats(userId: string): Promise<{
    totalProperties: number;
    occupiedProperties: number;
    totalMonthlyRent: number;
    pendingMaintenance: number;
  }> {
    const userProperties = await this.getProperties(userId);
    
    const totalProperties = userProperties.length;
    const occupiedProperties = userProperties.filter(p => p.status === 'occupied').length;
    const totalMonthlyRent = userProperties.reduce((sum, p) => sum + Number(p.rentAmount), 0);
    
    // Count pending maintenance across all properties
    let pendingMaintenance = 0;
    for (const property of userProperties) {
      const requests = await this.getMaintenanceRequests(property.id, userId);
      pendingMaintenance += requests.filter(r => r.status === 'pending').length;
    }

    return {
      totalProperties,
      occupiedProperties,
      totalMonthlyRent,
      pendingMaintenance,
    };
  }
}

export const storage = new DatabaseStorage();
