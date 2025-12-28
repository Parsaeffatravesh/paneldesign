import { useState, useMemo, memo } from "react";
import { useI18n } from "@/hooks/useI18n";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CompetitionCard, type CompetitionCardProps } from "@/components/CompetitionCard";
import { CompetitionFilters } from "@/components/CompetitionFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockCompetitions: CompetitionCardProps[] = [
  {
    title: "Forex Volatility Challenge",
    entryFee: 100,
    entryFeeCurrency: "USDT",
    participants: 124,
    maxParticipants: 500,
    marketType: "فارکس",
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    prizePool: 5000,
    prizeCurrency: "USDT",
    prizeBreakdown: {
      first: 3000,
      second: 1500,
      third: 500,
    },
  },
  {
    title: "Bitcoin Bull Run Trading",
    entryFee: 50,
    entryFeeCurrency: "USDT",
    participants: 256,
    maxParticipants: 1000,
    marketType: "کریپتو",
    startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    prizePool: 10000,
    prizeCurrency: "USDT",
    prizeBreakdown: {
      first: 6000,
      second: 3000,
      third: 1000,
    },
  },
  {
    title: "Ethereum Monthly Sprint",
    entryFee: 75,
    entryFeeCurrency: "USDT",
    participants: 89,
    marketType: "کریپتو",
    startsAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
    prizePool: 8000,
    prizeCurrency: "USDT",
    prizeBreakdown: {
      first: 4800,
      second: 2400,
      third: 800,
    },
  },
  {
    title: "Altcoin Hunter Tournament",
    entryFee: 30,
    entryFeeCurrency: "USDT",
    participants: 412,
    maxParticipants: 2000,
    marketType: "کریپتو",
    startsAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    prizePool: 15000,
    prizeCurrency: "USDT",
    prizeBreakdown: {
      first: 9000,
      second: 4500,
      third: 1500,
    },
  },
];

interface Filters {
  marketType: string[];
  minFee: number;
  maxFee: number;
  minPrize: number;
  sortBy: "newest" | "prize" | "participants";
}

const Competitions = memo(function Competitions() {
  const { t, language } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    marketType: [],
    minFee: 0,
    maxFee: 1000,
    minPrize: 0,
    sortBy: "newest",
  });

  const filteredCompetitions = useMemo(() => {
    let result = mockCompetitions.filter((comp) => {
      const matchesSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMarket = filters.marketType.length === 0 || filters.marketType.includes(comp.marketType);
      const matchesFee = comp.entryFee <= filters.maxFee;
      const matchesPrize = comp.prizePool >= filters.minPrize;

      return matchesSearch && matchesMarket && matchesFee && matchesPrize;
    });

    // Sort
    if (filters.sortBy === "prize") {
      result = result.sort((a, b) => b.prizePool - a.prizePool);
    } else if (filters.sortBy === "participants") {
      result = result.sort((a, b) => b.participants - a.participants);
    }

    return result;
  }, [searchTerm, filters]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("competitions.title")}</h1>
          <p className="text-muted-foreground">{t("competitions.subtitle")}</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("common.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <CompetitionFilters onFiltersChange={setFilters} />

        <div className="flex flex-col gap-6">
          {filteredCompetitions.map((comp, idx) => (
            <div key={idx} className="flex justify-center">
              <CompetitionCard
                {...comp}
                onJoin={() => {
                  console.log("Joined:", comp.title);
                }}
              />
            </div>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>{language === "fa" ? "هیچ مسابقه‌ای با فیلتر انتخاب‌شده پیدا نشد." : "No competitions found matching your filters."}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
});

Competitions.displayName = "Competitions";

export default Competitions;
