import api from "./api";

export interface TransactionQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  country?: string;
  sort?: "asc" | "desc";
}

export interface CreateTransactionDTO {
  userId: string;
  amount: number;
  merchant: string;
  city: string;
  country: string;
  ipAddress: string;
  deviceId: string;
  transactionType: string;
}

export async function getTransactions(
  params: TransactionQuery
) {
  const response = await api.get("/transactions", {
    params: {
      ...params,
      status:
        params.status === "ALL"
          ? undefined
          : params.status,

      country:
        params.country === "ALL"
          ? undefined
          : params.country,
    },
  });

  return response.data;
}

export async function createTransaction(
  data: CreateTransactionDTO
) {
  const response = await api.post(
    "/transactions",
    data
  );

  return response.data;
}