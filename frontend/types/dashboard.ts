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

export interface Transaction {
  id: string;
  merchant: string;
  amount: string;
  currency: string;
  riskScore: number;
  status: string;
  createdAt: string;
  user: User;
}

export interface FraudCase {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
  transaction: Transaction;
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recentTransactions: Transaction[];
  recentCases: FraudCase[];
}