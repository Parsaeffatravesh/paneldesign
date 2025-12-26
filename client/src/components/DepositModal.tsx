import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  loading?: boolean;
}

const PRESETS = [20, 50, 100, 500];

export function DepositModal({ isOpen, onClose, onSubmit, loading }: Props) {
  const { t } = useI18n();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");

  const handleSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      onSubmit(parseFloat(amount));
      setAmount("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t("wallet.depositFlow")}</h2>
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
              placeholder={t("wallet.enterAmount")}
              min="0"
              step="0.01"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">{t("common.filter")}</label>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  className="text-xs"
                >
                  ${preset}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">{t("wallet.selectPaymentMethod")}</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-lg"
            >
              <option value="card">{t("wallet.creditCard")}</option>
              <option value="bank">{t("wallet.bankTransfer")}</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!amount || loading}
            >
              {loading ? t("common.loading") : t("wallet.depositFlow")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
