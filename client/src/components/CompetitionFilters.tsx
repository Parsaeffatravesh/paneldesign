import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface Filters {
  marketType: string[];
  minFee: number;
  maxFee: number;
  minPrize: number;
  sortBy: "newest" | "prize" | "participants";
}

interface Props {
  onFiltersChange: (filters: Filters) => void;
}

export function CompetitionFilters({ onFiltersChange }: Props) {
  const { t } = useI18n();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    marketType: [],
    minFee: 0,
    maxFee: 1000,
    minPrize: 0,
    sortBy: "newest",
  });

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
      >
        {t("common.filter")}
        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
      </button>

      {showFilters && (
        <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
          <div>
            <label className="text-sm font-medium">{t("competitions.filterFee")}</label>
            <Input
              type="number"
              min="0"
              value={filters.maxFee}
              onChange={(e) => handleFilterChange({ maxFee: Number(e.target.value) })}
              placeholder="Max fee"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">{t("competitions.filterPrize")}</label>
            <Input
              type="number"
              min="0"
              value={filters.minPrize}
              onChange={(e) => handleFilterChange({ minPrize: Number(e.target.value) })}
              placeholder="Min prize"
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">{t("competitions.sortBy")}</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
              className="w-full mt-2 px-3 py-2 border rounded-lg"
            >
              <option value="newest">Newest</option>
              <option value="prize">Highest Prize</option>
              <option value="participants">Most Participants</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Market Type</label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["فارکس", "کریپتو"].map((market) => (
                <Button
                  key={market}
                  variant={filters.marketType.includes(market) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const updated = filters.marketType.includes(market)
                      ? filters.marketType.filter((m) => m !== market)
                      : [...filters.marketType, market];
                    handleFilterChange({ marketType: updated });
                  }}
                >
                  {market}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
