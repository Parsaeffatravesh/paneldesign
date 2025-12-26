import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpLeft, Wallet as WalletIcon } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
  status: "completed" | "pending";
}

export function Wallet() {
  const [balance, setBalance] = useState(1250.5);
  const [transactions] = useState<Transaction[]>([
    { id: "1", type: "deposit", amount: 500, date: "2 روز پیش", status: "completed" },
    { id: "2", type: "withdraw", amount: 200, date: "1 هفته پیش", status: "completed" },
    { id: "3", type: "deposit", amount: 1000, date: "2 هفته پیش", status: "completed" },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            کیف پول
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">موجودی فعلی</p>
            <h2 className="text-4xl font-bold">${balance.toFixed(2)}</h2>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1"
              onClick={() => setBalance(b => b + 50)}
            >
              واریز
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setBalance(b => Math.max(0, b - 50))}
            >
              برداشت
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">تراکنش‌های اخیر</h3>
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
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
                      {tx.type === "deposit" ? "واریز" : "برداشت"}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${tx.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </p>
                  <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs mt-1">
                    {tx.status === "completed" ? "تکمیل شده" : "درانتظار"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
