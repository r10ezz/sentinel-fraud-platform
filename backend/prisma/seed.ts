import bcrypt from "bcrypt";
import {
  PrismaClient,
  Role,
  TransactionType,
  TransactionStatus,
  CaseStatus,
  Priority,
  AuditAction,
  EntityType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Sentinel Database Seeder...");

  // 1. Clean existing data in reverse order of foreign keys
  await prisma.auditLog.deleteMany();
  await prisma.case.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();

  // 2. Hash passwords
  const passwordAdmin = await bcrypt.hash("admin123", 10);
  const passwordAnalyst = await bcrypt.hash("analyst123", 10);
  const passwordViewer = await bcrypt.hash("viewer123", 10);

  // 3. Create Users
  const admin = await prisma.user.create({
    data: {
      name: "Sentinel Admin",
      email: "admin@sentinel.com",
      password: passwordAdmin,
      role: Role.ADMIN,
    },
  });

  const analyst = await prisma.user.create({
    data: {
      name: "Sarah Analyst",
      email: "analyst@sentinel.com",
      password: passwordAnalyst,
      role: Role.ANALYST,
    },
  });

  const viewer = await prisma.user.create({
    data: {
      name: "Vikram Viewer",
      email: "viewer@sentinel.com",
      password: passwordViewer,
      role: Role.VIEWER,
    },
  });

  console.log("✅ Seeded Users:");
  console.log("   - admin@sentinel.com (ADMIN)");
  console.log("   - analyst@sentinel.com (ANALYST)");
  console.log("   - viewer@sentinel.com (VIEWER)");

  // 4. Seed initial transactions
  const sampleTransactions = [
    // Safe transactions
    {
      userId: admin.id,
      amount: 1450.0,
      merchant: "Swiggy",
      city: "Bangalore",
      country: "India",
      ipAddress: "103.21.244.12",
      deviceId: "DEV-BLR-8492",
      transactionType: TransactionType.UPI,
      riskScore: 0,
      status: TransactionStatus.SAFE,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      userId: analyst.id,
      amount: 4299.0,
      merchant: "Amazon",
      city: "Mumbai",
      country: "India",
      ipAddress: "115.96.12.8",
      deviceId: "DEV-BOM-1029",
      transactionType: TransactionType.CARD,
      riskScore: 0,
      status: TransactionStatus.SAFE,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    },
    {
      userId: viewer.id,
      amount: 780.0,
      merchant: "Uber",
      city: "Delhi",
      country: "India",
      ipAddress: "122.161.45.90",
      deviceId: "DEV-DEL-5512",
      transactionType: TransactionType.UPI,
      riskScore: 0,
      status: TransactionStatus.SAFE,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      userId: admin.id,
      amount: 18500.0,
      merchant: "Flipkart",
      city: "Pune",
      country: "India",
      ipAddress: "103.50.160.2",
      deviceId: "DEV-PUN-9921",
      transactionType: TransactionType.NET_BANKING,
      riskScore: 0,
      status: TransactionStatus.SAFE,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
    },
    {
      userId: analyst.id,
      amount: 2500.0,
      merchant: "Zomato",
      city: "Hyderabad",
      country: "India",
      ipAddress: "14.139.60.100",
      deviceId: "DEV-HYD-4011",
      transactionType: TransactionType.UPI,
      riskScore: 0,
      status: TransactionStatus.SAFE,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },

    // Flagged transactions (medium risk)
    {
      userId: viewer.id,
      amount: 25000.0,
      merchant: "ApexElectronics",
      city: "Kolkata",
      country: "India",
      ipAddress: "49.36.120.45",
      deviceId: "DEV-KOL-7781",
      transactionType: TransactionType.ATM,
      riskScore: 35,
      status: TransactionStatus.FLAGGED,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
    },
    {
      userId: admin.id,
      amount: 58000.0,
      merchant: "Swiggy",
      city: "Bangalore",
      country: "India",
      ipAddress: "103.21.244.15",
      deviceId: "DEV-BLR-8492",
      transactionType: TransactionType.UPI,
      riskScore: 45,
      status: TransactionStatus.FLAGGED,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    },
    {
      userId: analyst.id,
      amount: 72000.0,
      merchant: "QuickGold Traders",
      city: "Jaipur",
      country: "India",
      ipAddress: "157.34.88.19",
      deviceId: "DEV-JAI-3302",
      transactionType: TransactionType.CARD,
      riskScore: 50,
      status: TransactionStatus.FLAGGED,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },

    // Confirmed Fraud transactions (high risk)
    {
      userId: viewer.id,
      amount: 89000.0,
      merchant: "CryptoWorld Vault",
      city: "Moscow",
      country: "Russia",
      ipAddress: "185.220.101.5",
      deviceId: "DEV-SUSP-9901",
      transactionType: TransactionType.ATM,
      riskScore: 90,
      status: TransactionStatus.CONFIRMED_FRAUD,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      userId: admin.id,
      amount: 125000.0,
      merchant: "DarkMarket Escrow",
      city: "Lagos",
      country: "Nigeria",
      ipAddress: "102.164.22.4",
      deviceId: "DEV-SUSP-1120",
      transactionType: TransactionType.ATM,
      riskScore: 95,
      status: TransactionStatus.CONFIRMED_FRAUD,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
    },
    {
      userId: analyst.id,
      amount: 95000.0,
      merchant: "OffshoreX Trading",
      city: "Beijing",
      country: "China",
      ipAddress: "220.181.38.148",
      deviceId: "DEV-SUSP-6612",
      transactionType: TransactionType.CARD,
      riskScore: 85,
      status: TransactionStatus.CONFIRMED_FRAUD,
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
    },
  ];

  const createdTransactions = [];
  for (const txData of sampleTransactions) {
    const tx = await prisma.transaction.create({ data: txData });
    createdTransactions.push(tx);
  }

  console.log(`✅ Seeded ${createdTransactions.length} Transactions`);

  // 5. Seed Cases for high-risk / flagged transactions
  const flaggedAndFraud = createdTransactions.filter(
    (t) =>
      t.status === TransactionStatus.FLAGGED ||
      t.status === TransactionStatus.CONFIRMED_FRAUD
  );

  const casesToSeed = [
    {
      tx: flaggedAndFraud[0],
      title: "ATM Withdrawal at Unusual Hours",
      description: "Large cash withdrawal at Kolkata ATM for unverified merchant ApexElectronics.",
      priority: Priority.MEDIUM,
      status: CaseStatus.RESOLVED,
      assignedToId: analyst.id,
    },
    {
      tx: flaggedAndFraud[1],
      title: "Unusually High Amount on Food App",
      description: "Transaction amount ₹58,000 exceeds single-order threshold by 400%.",
      priority: Priority.HIGH,
      status: CaseStatus.IN_REVIEW,
      assignedToId: analyst.id,
    },
    {
      tx: flaggedAndFraud[2],
      title: "High-Value Jewelry & Bullion Purchase",
      description: "Unregistered merchant QuickGold Traders processed ₹72,000.",
      priority: Priority.HIGH,
      status: CaseStatus.OPEN,
      assignedToId: null,
    },
    {
      tx: flaggedAndFraud[3],
      title: "Cross-Border Russian IP & Crypto Platform",
      description: "Atm transaction initiated from Moscow IP address to unlisted crypto merchant.",
      priority: Priority.HIGH,
      status: CaseStatus.OPEN,
      assignedToId: null,
    },
    {
      tx: flaggedAndFraud[4],
      title: "Critical Geolocation Mismatch (Lagos)",
      description: "ATM withdrawal ₹1,25,000 from high-risk offshore geography.",
      priority: Priority.HIGH,
      status: CaseStatus.IN_REVIEW,
      assignedToId: analyst.id,
    },
    {
      tx: flaggedAndFraud[5],
      title: "Offshore Shell Merchant Payment",
      description: "Card payment of ₹95,000 routed through OffshoreX Trading.",
      priority: Priority.HIGH,
      status: CaseStatus.OPEN,
      assignedToId: null,
    },
  ];

  for (const c of casesToSeed) {
    if (c.tx) {
      await prisma.case.create({
        data: {
          title: c.title,
          description: c.description,
          priority: c.priority,
          status: c.status,
          transactionId: c.tx.id,
          assignedToId: c.assignedToId,
        },
      });
    }
  }

  console.log(`✅ Seeded ${casesToSeed.length} Investigation Cases`);

  // 6. Seed Audit Logs
  const auditLogs = [
    {
      userId: admin.id,
      action: AuditAction.LOGIN,
      entityType: EntityType.USER,
      entityId: admin.id,
      description: "Admin logged into Sentinel Security Console",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      userId: admin.id,
      action: AuditAction.CREATE_TRANSACTION,
      entityType: EntityType.TRANSACTION,
      entityId: createdTransactions[0].id,
      description: "Transaction ₹1,450 to Swiggy validated safe",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 47),
    },
    {
      userId: analyst.id,
      action: AuditAction.LOGIN,
      entityType: EntityType.USER,
      entityId: analyst.id,
      description: "Analyst Sarah logged into Investigation Portal",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
    },
    {
      userId: admin.id,
      action: AuditAction.CREATE_CASE,
      entityType: EntityType.CASE,
      entityId: createdTransactions[5].id,
      description: "Fraud investigation case created automatically for high-risk transaction",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
    },
    {
      userId: analyst.id,
      action: AuditAction.ASSIGN_CASE,
      entityType: EntityType.CASE,
      entityId: createdTransactions[5].id,
      description: "Case assigned to analyst Sarah Analyst for manual review",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9),
    },
    {
      userId: analyst.id,
      action: AuditAction.RESOLVE_CASE,
      entityType: EntityType.CASE,
      entityId: createdTransactions[5].id,
      description: "Case resolved after contacting cardholder and verifying purchase authorization",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    },
    {
      userId: viewer.id,
      action: AuditAction.LOGIN,
      entityType: EntityType.USER,
      entityId: viewer.id,
      description: "Viewer Vikram logged into Monitoring Dashboard",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    },
  ];

  for (const log of auditLogs) {
    await prisma.auditLog.create({ data: log });
  }

  console.log(`✅ Seeded ${auditLogs.length} Audit Logs`);
  console.log("🚀 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
