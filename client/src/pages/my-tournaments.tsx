import { memo } from "react";
import { useI18n } from "@/hooks/useI18n";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExportTournaments } from "@/components/ExportTournaments";

const mockTournaments = {
  ongoing: [
    { id: "1", title: "UI Challenge 2025", status: "در حال برگزاری", participants: 45 },
    { id: "2", title: "Web Dev Sprint", status: "در حال برگزاری", participants: 67 },
  ],
  review: [
    { id: "3", title: "Mobile Design", status: "در حال بررسی", participants: 32 },
  ],
  finished: [
    { id: "4", title: "Past Challenge", status: "تمام شده", rank: "1st", prize: 1000 },
    { id: "5", title: "Old Competition", status: "تمام شده", rank: "3rd", prize: 250 },
  ],
  canceled: [
    { id: "6", title: "Canceled Event", status: "کنسل شده", reason: "عدم شرکت‌کنندگان کافی" },
  ],
};

const MyTournaments = memo(function MyTournaments() {
  const { t } = useI18n();
  
  const allTournaments = [
    ...mockTournaments.ongoing,
    ...mockTournaments.review,
    ...mockTournaments.finished,
    ...mockTournaments.canceled,
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("tournaments.title")}</h1>
            <p className="text-muted-foreground">{t("tournaments.subtitle")}</p>
          </div>
          <ExportTournaments tournaments={allTournaments} />
        </div>

        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent border-b rounded-none p-0 h-auto">
            <TabsTrigger value="ongoing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2">
              {t("tournaments.ongoing")}
            </TabsTrigger>
            <TabsTrigger value="review" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2">
              {t("tournaments.underReview")}
            </TabsTrigger>
            <TabsTrigger value="finished" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2">
              {t("tournaments.finished")}
            </TabsTrigger>
            <TabsTrigger value="canceled" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-2">
              {t("tournaments.canceled")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="mt-6 space-y-4">
            {mockTournaments.ongoing.map((tournament) => (
              <Card key={tournament.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{tournament.title}</h3>
                    <p className="text-sm text-muted-foreground">{tournament.participants} شرکت‌کننده</p>
                  </div>
                  <Badge variant="outline">{t("tournaments.viewLive")}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="review" className="mt-6 space-y-4">
            {mockTournaments.review.map((tournament) => (
              <Card key={tournament.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{tournament.title}</h3>
                    <p className="text-sm text-muted-foreground">{tournament.participants} {t("tournaments.upcoming")}</p>
                  </div>
                  <Badge variant="outline">{t("tournaments.viewEvidence")}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="finished" className="mt-6 space-y-4">
            {mockTournaments.finished.map((tournament) => (
              <Card key={tournament.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{tournament.title}</h3>
                    <p className="text-sm text-muted-foreground">رتبه: {(tournament as any).rank} - جایزه: ${(tournament as any).prize}</p>
                  </div>
                  <Badge>{t("tournaments.results")}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="canceled" className="mt-6 space-y-4">
            {mockTournaments.canceled.map((tournament) => (
              <Card key={tournament.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{tournament.title}</h3>
                    <p className="text-sm text-muted-foreground">{(tournament as any).reason}</p>
                  </div>
                  <Badge variant="destructive">{t("tournaments.canceled")}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
});

MyTournaments.displayName = "MyTournaments";

export default MyTournaments;
