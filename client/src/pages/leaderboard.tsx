import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: "Sarah Chen", handle: "@schen_design", points: "12,450", badges: ["Top 1%", "Winner"], avatar: "SC" },
    { rank: 2, name: "Alex Morgan", handle: "@amorgan", points: "11,200", badges: ["Trendsetter"], avatar: "AM" },
    { rank: 3, name: "Jordan Lee", handle: "@jlee_ux", points: "10,950", badges: [], avatar: "JL" },
    { rank: 4, name: "Casey Smith", handle: "@csmith", points: "9,800", badges: [], avatar: "CS" },
    { rank: 5, name: "Taylor Swift", handle: "@tswift_ui", points: "9,200", badges: ["Rising Star"], avatar: "TS" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Global Leaderboard</h1>
          <p className="text-muted-foreground">Top performers this season.</p>
        </div>

        {/* Top 3 Podium - Only visible on desktop/large screens typically, but we'll show a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 flex flex-col items-center p-6 bg-card border rounded-lg shadow-sm relative mt-4 md:mt-0">
             <div className="absolute -top-4 bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-full text-sm">#2</div>
             <Avatar className="h-20 w-20 mb-4 ring-4 ring-gray-100">
               <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 text-xl font-bold">AM</AvatarFallback>
             </Avatar>
             <h3 className="font-bold text-lg">Alex Morgan</h3>
             <p className="text-sm text-muted-foreground mb-2">11,200 pts</p>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2 flex flex-col items-center p-8 bg-card border-2 border-primary/10 rounded-xl shadow-md relative z-10 transform md:-translate-y-4">
             <div className="absolute -top-5 bg-yellow-400 text-yellow-900 font-bold px-4 py-1.5 rounded-full shadow-sm">#1 Champion</div>
             <Avatar className="h-24 w-24 mb-4 ring-4 ring-yellow-100">
               <AvatarFallback className="bg-gradient-to-br from-yellow-200 to-amber-300 text-amber-800 text-2xl font-bold">SC</AvatarFallback>
             </Avatar>
             <h3 className="font-bold text-xl">Sarah Chen</h3>
             <p className="text-sm text-muted-foreground mb-2">12,450 pts</p>
          </div>

          {/* 3rd Place */}
          <div className="order-3 flex flex-col items-center p-6 bg-card border rounded-lg shadow-sm relative mt-4 md:mt-0">
             <div className="absolute -top-4 bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full text-sm">#3</div>
             <Avatar className="h-20 w-20 mb-4 ring-4 ring-orange-50">
               <AvatarFallback className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 text-xl font-bold">JL</AvatarFallback>
             </Avatar>
             <h3 className="font-bold text-lg">Jordan Lee</h3>
             <p className="text-sm text-muted-foreground mb-2">10,950 pts</p>
          </div>
        </div>

        {/* List */}
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[60px] text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="hidden md:table-cell">Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((leader) => (
                <TableRow key={leader.rank}>
                  <TableCell className="font-medium text-center">{leader.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-muted">{leader.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{leader.name}</span>
                        <span className="text-xs text-muted-foreground md:hidden">{leader.points} pts</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{leader.points}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-2">
                      {leader.badges.map(b => (
                        <Badge key={b} variant="outline" className="text-[10px] h-5">{b}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* More fake rows */}
              {[6, 7, 8, 9, 10].map((i) => (
                 <TableRow key={i}>
                  <TableCell className="font-medium text-center text-muted-foreground">{i}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-muted">U{i}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm text-muted-foreground">User {i}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">8,4{i}0</TableCell>
                  <TableCell className="hidden md:table-cell"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
