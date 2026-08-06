import TransactionsTable from "@/components/tables/transactions-table";
import { Transaction } from "@/types/dashboard";

interface Props {
  transactions: Transaction[];
}

export default function TransactionsSection({
  transactions,
}: Props) {
  return (
    <TransactionsTable
      transactions={transactions}
    />
  );
}