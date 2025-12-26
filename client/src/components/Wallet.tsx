import { useState, useMemo } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpLeft, Wallet as WalletIcon } from "lucide-react";
import { DepositModal } from "./DepositModal";
import { WithdrawModal } from "./WithdrawModal";
import { TransactionFilter } from "./TransactionFilter";
import { TransactionExport } from "./TransactionExport";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
  status: "completed" | "pending";
}

interface TransactionFilters {
  type?: string;
  status?: string;
  minAmount?: number;
  maxAmount?: number;
}

export function Wallet() {
  const { t } = useI18n();
  const [balance, setBalance] = useState(1250.5);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({});
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "deposit", amount: 500, date: "2 روز پیش", status: "completed" },
    { id: "2", type: "withdraw", amount: 200, date: "1 هفته پیش", status: "completed" },
    { id: "3", type: "deposit", amount: 1000, date: "2 هفته پیش", status: "completed" },
    { id: "4", type: "deposit", amount: 100, date: "3 روز پیش", status: "pending" },
    { id: "5", type: "withdraw", amount: 50, date: "1 ماه پیش", status: "completed" },
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (transactionFilters.type && tx.type !== transactionFilters.type) return false;
      if (transactionFilters.status && tx.status !== transactionFilters.status) return false;
      if (transactionFilters.minAmount && tx.amount < transactionFilters.minAmount) return false;
      if (transactionFilters.maxAmount && tx.amount > transactionFilters.maxAmount) return false;
      return true;
    });
  }, [transactions, transactionFilters]);

  const handleDeposit = (amount: number) => {
    setDepositing(true);
    setTimeout(() => {
      setBalance(b => b + amount);
      setTransactions([
        { id: String(Date.now()), type: "deposit", amount, date: "تازه", status: "completed" },
        ...transactions,
      ]);
      setShowDepositModal(false);
      setDepositing(false);
    }, 800);
  };

  const handleWithdraw = (amount: number) => {
    setWithdrawing(true);
    setTimeout(() => {
      setBalance(b => b - amount);
      setTransactions([
        { id: String(Date.now()), type: "withdraw", amount, date: "تازه", status: "pending" },
        ...transactions,
      ]);
      setShowWithdrawModal(false);
      setWithdrawing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            {t("wallet.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">{t("wallet.balance")}</p>
            <h2 className="text-4xl font-bold">${balance.toFixed(2)}</h2>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1"
              onClick={() => setShowDepositModal(true)}
            >
              {t("wallet.depositFlow")}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowWithdrawModal(true)}
            >
              {t("wallet.withdrawFlow")}
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-sm">{t("wallet.recentTransactions")}</h3>
              <TransactionExport transactions={transactions} />
            </div>

            <TransactionFilter onFilterChange={setTransactionFilters} />

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === "deposit" ? "bg-green-100" : "bg-red-100"}`}>
                      {tx.type === "deposit" ? (
                        <ArrowDownRight className="w-4 h-4 text-green-700" />
                      ) : (
                        <ArrowUpLeft className="w-4 h-4 text-red-700" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {tx.type === "deposit" ? t("wallet.depositFlow") : t("wallet.withdrawFlow")}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${tx.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                    </p>
                    <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs mt-1">
                      {t(`wallet.${tx.status}`)}
                    </Badge>
                  </div>
                </div>
              ))}

              {filteredTransactions.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No transactions found
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSubmit={handleDeposit}
        loading={depositing}
      />
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onSubmit={handleWithdraw}
        balance={balance}
        loading={withdrawing}
      />
    </div>
  );
}
