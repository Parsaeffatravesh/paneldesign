import React, { useEffect, useMemo, useState, memo } from "react";

type MarketType = "فارکس" | "کریپتو";

type PrizeBreakdown = {
  first: number;
  second: number;
  third: number;
  currency?: string;
};

export type CompetitionCardProps = {
  title: string;
  entryFee: number;
  entryFeeCurrency?: string;
  participants: number;
  maxParticipants?: number;
  marketType: MarketType;
  startsAt: string;
  endsAt: string;
  prizePool: number;
  prizeCurrency?: string;
  prizeBreakdown: PrizeBreakdown;
  onJoin?: () => void;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatMoney(value: number, currency?: string) {
  const parts = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return currency ? `${parts} ${currency}` : parts;
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function diffParts(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}

const CompetitionCard = memo(function CompetitionCard(props: CompetitionCardProps) {
  const {
    title,
    entryFee,
    entryFeeCurrency = "USDT",
    participants,
    maxParticipants,
    marketType,
    startsAt,
    endsAt,
    prizePool,
    prizeCurrency = "USDT",
    prizeBreakdown,
    onJoin,
  } = props;

  const startsMs = useMemo(() => new Date(startsAt).getTime(), [startsAt]);
  const endsMs = useMemo(() => new Date(endsAt).getTime(), [endsAt]);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const untilStart = startsMs - now;
  const untilEnd = endsMs - now;

  const isUpcoming = untilStart > 0;
  const isLive = untilStart <= 0 && untilEnd > 0;
  const isEnded = untilEnd <= 0;

  const countdown = isUpcoming ? diffParts(untilStart) : diffParts(untilEnd);

  const badge = isUpcoming ? "به‌زودی" : isLive ? "در حال برگزاری" : "پایان‌یافته";

  const badgeClass =
    isUpcoming
      ? "bg-white/10 text-white"
      : isLive
      ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/20"
      : "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/20";

  const marketPillClass =
    marketType === "کریپتو"
      ? "bg-fuchsia-500/15 text-fuchsia-200 ring-1 ring-fuchsia-400/20"
      : "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/20";

  const joinDisabled = isEnded;

  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);
  const startMonth = startDate.toLocaleString("fa-IR", { month: "short" }).toUpperCase();
  const startDay = String(startDate.getDate()).padStart(2, "0");
  const startTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`;
  const endMonth = endDate.toLocaleString("fa-IR", { month: "short" }).toUpperCase();
  const endDay = String(endDate.getDate()).padStart(2, "0");
  const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="w-full" data-testid="card-competition">
      <div className="rounded-lg border border-border/40 bg-card/50 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 backdrop-blur-sm">
        <div className="p-4 sm:p-5">
          {/* Title and ID Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                ID{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="inline-block px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium" style={{backgroundColor: 'rgba(0, 255, 255, 0.15)', color: '#00FFFF'}}>
                {badge}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Left: Date/Time Info */}
            <div className="col-span-1">
              <div className="space-y-3">
                {/* Start Time Box */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-1">{startMonth} | شروع</div>
                    <div className="bg-muted/40 rounded-md p-2 border border-border/40">
                      <div className="text-sm sm:text-base font-bold text-foreground">{startDay}</div>
                      <div className="text-[10px] text-muted-foreground">{startTime}</div>
                    </div>
                  </div>
                </div>
                {/* Arrow */}
                <div className="text-center">
                  <div className="text-muted-foreground text-sm">→</div>
                </div>
                {/* End Time Box */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-1">{endMonth} | پایان</div>
                    <div className="bg-muted/40 rounded-md p-2 border border-border/40">
                      <div className="text-sm sm:text-base font-bold text-foreground">{endDay}</div>
                      <div className="text-[10px] text-muted-foreground">{endTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Prize and Traders */}
            <div className="col-span-1 flex flex-col justify-between">
              <div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-2">جایزه کل</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl sm:text-3xl">🏆</div>
                  <PrizeHover
                    prizePool={prizePool}
                    prizeCurrency={prizeCurrency}
                    breakdown={prizeBreakdown}
                  />
                </div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-2">معامله‌گران</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl sm:text-3xl">👥</div>
                  <span className="text-sm sm:text-base font-bold text-foreground">{participants}</span>
                </div>
              </div>
            </div>

            {/* Right: Countdown and Button */}
            <div className="col-span-1 flex flex-col justify-between">
              {/* Countdown Timer */}
              <div className="text-right">
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-2">شروع در</div>
                <div className="space-y-1">
                  {countdown.days > 0 && (
                    <div className="text-xs sm:text-sm font-semibold text-red-400">
                      {countdown.days}d : {pad2(countdown.hours)}h
                    </div>
                  )}
                  {countdown.days === 0 && (
                    <div className="text-xs sm:text-sm font-semibold text-red-400">
                      {pad2(countdown.hours)}h : {pad2(countdown.minutes)}m : {pad2(countdown.seconds)}s
                    </div>
                  )}
                </div>
              </div>

              {/* Join Button */}
              <button
                onClick={onJoin}
                disabled={joinDisabled}
                data-testid="button-join-competition"
                className={[
                  "w-full px-3 py-2 sm:py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 mt-3",
                  joinDisabled
                    ? "cursor-not-allowed bg-muted text-muted-foreground"
                    : "bg-cyan-500 text-black hover:bg-cyan-400 active:bg-cyan-600",
                ].join(" ")}
              >
                {joinDisabled ? "پایان‌یافته" : "شرکت"}
              </button>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground gap-2">
            <span>{participants} شرکت‌کننده</span>
            <span>هزینه: {formatMoney(entryFee, entryFeeCurrency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CompetitionCard.displayName = "CompetitionCard";

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/50 p-2.5 text-center transition-all duration-200 hover:bg-muted">
      <div className="text-base font-bold text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}


function PrizeHover({
  prizePool,
  prizeCurrency,
  breakdown,
}: {
  prizePool: number;
  prizeCurrency: string;
  breakdown: PrizeBreakdown;
}) {
  const currency = breakdown.currency ?? prizeCurrency;

  return (
    <div className="relative inline-block">
      <div className="group cursor-help">
        <span className="font-medium text-foreground/80 hover:text-foreground transition-colors">
          {formatMoney(prizePool, prizeCurrency)}
        </span>

        {/* Tooltip */}
        <div
          className={[
            "pointer-events-none absolute right-0 bottom-full z-20 mb-2 w-56 translate-y-1 opacity-0",
            "rounded-lg border border-border bg-card p-3 shadow-md",
            "transition duration-200 group-hover:translate-y-0 group-hover:opacity-100",
          ].join(" ")}
        >
          <div className="text-xs text-muted-foreground mb-2">تفکیک جوایز</div>
          <div className="space-y-1 text-xs">
            <Row k="اول" v={formatMoney(breakdown.first, currency)} />
            <Row k="دوم" v={formatMoney(breakdown.second, currency)} />
            <Row k="سوم" v={formatMoney(breakdown.third, currency)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}

export { CompetitionCard };
