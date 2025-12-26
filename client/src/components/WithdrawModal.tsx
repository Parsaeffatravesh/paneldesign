import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, AlertCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  balance: number;
  loading?: boolean;
}

export function WithdrawModal({ isOpen, onClose, onSubmit, balance, loading }: Props) {
  const { t } = useI18n();
  const [amount, setAmount] = useState("");
  const [agree2fa, setAgree2fa] = useState(false);

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (num > 0 && num <= balance && agree2fa) {
      onSubmit(num);
      setAmount("");
      setAgree2fa(false);
    }
  };

  const isValid = parseFloat(amount) > 0 && parseFloat(amount) <= balance && agree2fa;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t("wallet.withdrawFlow")}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium">{t("wallet.amount")}</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("wallet.enterWithdrawAmount")}
              min="0"
              max={balance}
              step="0.01"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {t("wallet.balance")}: ${balance.toFixed(2)}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">{t("wallet.verificationRequired")}</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agree2fa"
              checked={agree2fa}
              onChange={(e) => setAgree2fa(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="agree2fa" className="text-sm">
              {t("wallet.verificationRequired")} (2FA)
            </label>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!isValid || loading}
            >
              {loading ? t("common.loading") : t("wallet.withdrawFlow")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
