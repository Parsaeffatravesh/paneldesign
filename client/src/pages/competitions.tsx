import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CompetitionCard } from "@/components/CompetitionCard";
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
];

export default function Competitions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">تمام مسابقات</h1>
          <p className="text-muted-foreground">مسابقات فعال و آینده را مرور کنید</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="جستجو مسابقات..." className="pl-10" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockCompetitions.map((comp) => (
            <CompetitionCard key={comp.id} {...comp} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
