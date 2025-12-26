import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";

interface Props {
  onFilterChange: (filters: { type?: string; status?: string; minAmount?: number; maxAmount?: number }) => void;
}

export function TransactionFilter({ onFilterChange }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    minAmount: "",
    maxAmount: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    const payload: any = {};
    if (updated.type) payload.type = updated.type;
    if (updated.status) payload.status = updated.status;
    if (updated.minAmount) payload.minAmount = parseFloat(updated.minAmount);
    if (updated.maxAmount) payload.maxAmount = parseFloat(updated.maxAmount);

    onFilterChange(payload);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-muted transition-colors"
      >
        <Filter className="w-4 h-4" />
        فیلتر {hasActiveFilters && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">فعال</span>}
      </button>

      {showFilters && (
        <div className="border rounded-lg p-3 bg-muted/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">نوع</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full mt-1 px-2 py-1.5 text-sm border rounded"
              >
                <option value="">همه</option>
                <option value="deposit">واریز</option>
                <option value="withdraw">برداشت</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium">وضعیت</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full mt-1 px-2 py-1.5 text-sm border rounded"
              >
                <option value="">همه</option>
                <option value="completed">تکمیل شده</option>
                <option value="pending">درانتظار</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">حداقل مبلغ</label>
              <Input
                type="number"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange("minAmount", e.target.value)}
                placeholder="0"
                className="h-8 text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium">حداکثر مبلغ</label>
              <Input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
                placeholder="0"
                className="h-8 text-sm mt-1"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setFilters({ type: "", status: "", minAmount: "", maxAmount: "" });
                onFilterChange({});
              }}
              className="w-full gap-2 text-xs"
            >
              <X className="w-3 h-3" />
              پاک کردن فیلترها
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
