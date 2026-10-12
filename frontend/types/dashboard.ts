export interface DashboardStats {
  totalTransactions: number;
  safeTransactions: number;
  flaggedTransactions: number;
  confirmedFraud: number;
  openCases: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface TransactionCase {
  id: string;
  title: string;
  description?: string;

  status: string;
  priority: string;

  createdAt?: string;
  updatedAt?: string;

  transactionId?: string;
  assignedToId?: string | null;
}

export interface Transaction {
  id: string;

  amount: string;
  currency: string;

  merchant: string;

  city: string;
  country: string;

  ipAddress: string;
  deviceId: string;

  transactionType: string;

  riskScore: number;
  status: string;

  createdAt: string;

  user: User;

  case: TransactionCase | null;
}

export interface FraudCase {
  id: string;

  title: string;
  description: string;

  status: string;
  priority: string;

  createdAt: string;
  updatedAt: string;

  transactionId: string;
  assignedToId: string | null;

  transaction: Transaction;

  assignedTo: User | null;
}

export interface CasesResponse {
  success: boolean;

  cases: FraudCase[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardResponse {
  success: boolean;

  stats: DashboardStats;

  recentTransactions: Transaction[];

  recentCases: FraudCase[];
}