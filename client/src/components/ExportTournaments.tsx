import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tournament {
  id: string;
  title: string;
  status: string;
  participants?: number;
  prize?: number;
  rank?: string;
}

interface Props {
  tournaments: Tournament[];
}

export function ExportTournaments({ tournaments }: Props) {
  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      const csv = [
        ["ID", "Title", "Status", "Participants", "Prize", "Rank"],
        ...tournaments.map((t) => [
          t.id,
          t.title,
          t.status,
          t.participants || "-",
          t.prize || "-",
          t.rank || "-",
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tournaments-${Date.now()}.csv`;
      a.click();
    } else {
      const json = JSON.stringify(tournaments, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tournaments-${Date.now()}.json`;
      a.click();
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport("csv")}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        CSV
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleExport("json")}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        JSON
      </Button>
    </div>
  );
}
