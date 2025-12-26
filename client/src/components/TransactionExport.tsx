import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
  status: "completed" | "pending";
}

interface Props {
  transactions: Transaction[];
}

export function TransactionExport({ transactions }: Props) {
  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      const csv = [
        ["ID", "Type", "Amount", "Date", "Status"],
        ...transactions.map((t) => [t.id, t.type, t.amount, t.date, t.status]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions-${Date.now()}.csv`;
      a.click();
    } else {
      const json = JSON.stringify(transactions, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions-${Date.now()}.json`;
      a.click();
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport("csv")}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        CSV
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport("json")}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        JSON
      </Button>
    </div>
  );
}
