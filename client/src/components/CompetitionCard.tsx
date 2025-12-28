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

  const durationMs = Math.max(0, endsMs - startsMs);
  const durationParts = diffParts(durationMs);
  const durationLabel =
    durationMs > 0
      ? `${durationParts.days ? `${durationParts.days} روز ` : ""}${pad2(
          durationParts.hours
        )}:${pad2(durationParts.minutes)}`
      : "—";

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

  return (
    <div className="w-full max-w-[520px]" data-testid="card-competition">
      <div className="rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md dark:border-white/10 dark:bg-white/5">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${badgeClass}`}>
                  {badge}
                </span>
                <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${marketPillClass}`}>
                  {marketType}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground truncate">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {isUpcoming ? "شروع‌ می‌شود در" : isLive ? "پایان‌ می‌یابد در" : "پایان‌یافته"}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">هزینه</p>
              <p className="text-base font-semibold text-foreground">
                {formatMoney(entryFee, entryFeeCurrency)}
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <TimeBox label="روز" value={pad2(countdown.days)} />
            <TimeBox label="ساعت" value={pad2(countdown.hours)} />
            <TimeBox label="دقیقه" value={pad2(countdown.minutes)} />
            <TimeBox label="ثانیه" value={pad2(countdown.seconds)} />
          </div>

          {/* Details - Minimalist Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">شروع</p>
              <p className="text-foreground/80 line-clamp-2">{formatDateTime(startsAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">پایان</p>
              <p className="text-foreground/80 line-clamp-2">{formatDateTime(endsAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">مدت</p>
              <p className="text-foreground/80 font-medium">{durationLabel}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">جایزه</p>
              <PrizeHover
                prizePool={prizePool}
                prizeCurrency={prizeCurrency}
                breakdown={prizeBreakdown}
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 py-3 border-t border-border">
            <span>{participants} شرکت‌کننده</span>
            {maxParticipants && <span>ظرفیت: {maxParticipants}</span>}
            <span>جایزه: {formatMoney(prizePool, prizeCurrency)}</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onJoin}
            disabled={joinDisabled}
            data-testid="button-join-competition"
            className={[
              "w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              joinDisabled
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:opacity-90 active:opacity-95",
            ].join(" ")}
          >
            {joinDisabled ? "مسابقه پایان‌یافته" : "شرکت در مسابقه"}
          </button>
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
