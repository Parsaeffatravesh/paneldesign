import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, Users, Zap, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's what's happening with your tournaments today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Winnings</CardTitle>
              <span className="text-muted-foreground font-sans text-xs">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,340</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <CrownIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#42</div>
              <p className="text-xs text-muted-foreground mt-1">Top 5% of players</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tourneys</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 ending soon</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">64%</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Tournaments Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Active Tournaments</h2>
            <Button variant="ghost" className="text-sm">View All</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group hover:shadow-md transition-shadow duration-200 cursor-pointer border-border/60">
                <div className="h-32 bg-muted/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-background/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-full border shadow-sm">
                      Live Now
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">UI Design Challenge 2025</h3>
                    <div className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded">
                      $5k Prize
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    Design a futuristic dashboard for a fintech application using glassmorphism principles.
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      4h remaining
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1.5" />
                      124 participants
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function CrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  )
}
