import { useState, useMemo, memo, useEffect } from "react";
import { useI18n } from "@/hooks/useI18n";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CompetitionCard } from "@/components/CompetitionCard";
import { CompetitionFilters } from "@/components/CompetitionFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockCompetitions = [
  {
    id: "1",
    title: "UI Design Challenge 2025",
    entryFee: 50,
    participants: 124,
    startAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    currency: "USD",
    prizeBreakdown: [
      { place: 1, amount: 1000 },
      { place: 2, amount: 500 },
      { place: 3, amount: 250 },
    ],
    status: "starting-soon" as const,
  },
  {
    id: "2",
    title: "Web Development Sprint",
    entryFee: 75,
    participants: 89,
    startAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    currency: "USD",
    prizeBreakdown: [
      { place: 1, amount: 1500 },
      { place: 2, amount: 750 },
      { place: 3, amount: 375 },
    ],
    status: "upcoming" as const,
  },
  {
    id: "3",
    title: "Mobile App Design",
    entryFee: 100,
    participants: 156,
    startAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    currency: "USD",
    prizeBreakdown: [
      { place: 1, amount: 2000 },
      { place: 2, amount: 1000 },
      { place: 3, amount: 500 },
    ],
    status: "upcoming" as const,
  },
  {
    id: "4",
    title: "React Hackathon",
    entryFee: 25,
    participants: 234,
    startAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    currency: "USD",
    prizeBreakdown: [
      { place: 1, amount: 5000 },
      { place: 2, amount: 2500 },
      { place: 3, amount: 1250 },
    ],
    status: "live" as const,
  },
];

interface Filters {
  status: string[];
  minFee: number;
  maxFee: number;
  minPrize: number;
  sortBy: "newest" | "prize" | "participants";
}

const Competitions = memo(function Competitions() {
  const { t, language } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    status: [],
    minFee: 0,
    maxFee: 1000,
    minPrize: 0,
    sortBy: "newest",
  });

  const filteredCompetitions = useMemo(() => {
    let result = mockCompetitions.filter((comp) => {
      const matchesSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status.length === 0 || filters.status.includes(comp.status);
      const matchesFee = comp.entryFee <= filters.maxFee;
      const prizeTotal = comp.prizeBreakdown.reduce((sum, p) => sum + p.amount, 0);
      const matchesPrize = prizeTotal >= filters.minPrize;

      return matchesSearch && matchesStatus && matchesFee && matchesPrize;
    });

    // Sort
    if (filters.sortBy === "prize") {
      result = result.sort((a, b) => {
        const prizeA = a.prizeBreakdown.reduce((sum, p) => sum + p.amount, 0);
        const prizeB = b.prizeBreakdown.reduce((sum, p) => sum + p.amount, 0);
        return prizeB - prizeA;
      });
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

        <div className="grid md:grid-cols-2 gap-6">
          {filteredCompetitions.map((comp) => (
            <CompetitionCard key={comp.id} {...comp} />
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
