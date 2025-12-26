import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

export default function Tournaments() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
            <p className="text-muted-foreground">Browse and join upcoming challenges.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tournaments..." className="pl-9" />
            </div>
            <button className="p-2.5 border rounded-md hover:bg-muted/50 transition-colors">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto justify-start bg-transparent p-0 border-b rounded-none h-auto gap-6">
            <TabsTrigger 
              value="all" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
            >
              All Tournaments
            </TabsTrigger>
            <TabsTrigger 
              value="my" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
            >
              My Tournaments
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2"
            >
              Upcoming
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="group hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="h-24 w-full md:w-32 bg-muted rounded-md relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-200" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">Mobile App Redesign Sprint</h3>
                      <Badge variant="secondary" className="font-mono">$2,000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Create a fresh user experience for a travel booking app focusing on accessibility.</p>
                    <div className="flex gap-2 mt-2 pt-2">
                      <Badge variant="outline" className="text-[10px] font-normal">UI/UX</Badge>
                      <Badge variant="outline" className="text-[10px] font-normal">Mobile</Badge>
                      <Badge variant="outline" className="text-[10px] font-normal">Figma</Badge>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col justify-between md:items-end gap-2 text-sm text-muted-foreground">
                    <span>Ends in 2 days</span>
                    <span className="text-xs">45 Entries</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="my">
             <div className="py-12 text-center text-muted-foreground">
               <p>You haven't joined any tournaments yet.</p>
             </div>
          </TabsContent>
          <TabsContent value="upcoming">
             <div className="py-12 text-center text-muted-foreground">
               <p>No upcoming tournaments scheduled.</p>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
