import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountdownTimer } from "./CountdownTimer";

interface Prize {
  place: number;
  amount: number;
}

interface CompetitionCardProps {
  id: string;
  title: string;
  entryFee: number;
  prizeBreakdown: Prize[];
  participants: number;
  startAt: string; // ISO string
  currency: string;
  status: "upcoming" | "starting-soon" | "live" | "ended" | "canceled";
}

export function CompetitionCard({
  title,
  entryFee,
  prizeBreakdown,
  participants,
  startAt,
  currency,
  status,
}: CompetitionCardProps) {
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [prizePopupFocused, setPrizePopupFocused] = useState(false);

  const prizeTotal = prizeBreakdown.reduce((sum, p) => sum + p.amount, 0);

  const statusBadgeColor = {
    "starting-soon": "bg-amber-100 text-amber-800",
    live: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    ended: "bg-gray-100 text-gray-800",
    canceled: "bg-red-100 text-red-800",
  };

  // Handle Esc key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPrizePopup(false);
        setPrizePopupFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card className="group hover:shadow-md transition-shadow cursor-pointer hover:border-primary/20">
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">شروع در <CountdownTimer startAt={startAt} /></p>
          </div>
          <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusBadgeColor[status])}>
            {status === "starting-soon" ? "شروع کنندگی" : status === "live" ? "زنده" : "آینده"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">هزینه ورود</span>
            <p className="font-semibold">${entryFee.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-muted-foreground">شرکت‌کنندگان</span>
            <p className="font-semibold">{participants}</p>
          </div>
          <div>
            <span className="text-muted-foreground">جایزه کل</span>
            <p className="font-semibold">${prizeTotal.toFixed(2)}</p>
          </div>
          <div className="relative group">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">تفکیک جوایز</span>
              <button
                onClick={() => setShowPrizePopup(!showPrizePopup)}
                onFocus={() => setPrizePopupFocused(true)}
                onBlur={() => setPrizePopupFocused(false)}
                aria-label="نمایش تفکیک جوایز"
                aria-haspopup="dialog"
                aria-expanded={showPrizePopup || prizePopupFocused}
                className="text-primary hover:bg-primary/10 p-1 rounded transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            
            {(showPrizePopup || prizePopupFocused) && (
              <div 
                role="dialog"
                aria-labelledby="prize-popup-title"
                className="absolute bottom-full right-0 mb-2 bg-background border rounded-lg shadow-lg p-3 z-10 w-48 animate-in fade-in slide-in-from-bottom-2"
              >
                <h4 id="prize-popup-title" className="font-semibold text-sm mb-2">تفکیک جوایز</h4>
                <ul className="space-y-1 text-sm">
                  {prizeBreakdown.slice(0, 3).map((prize) => (
                    <li key={prize.place} className="flex justify-between">
                      <span>رتبه {prize.place}</span>
                      <span className="font-semibold">${prize.amount.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowPrizePopup(false)}
                  className="text-xs mt-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  بستن (Esc)
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
