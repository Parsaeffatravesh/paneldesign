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

function diffParts(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}

function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 4h10v3a5 5 0 0 1-10 0V4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 7H5a2 2 0 0 0 2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 7h2a2 2 0 0 1-2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 21h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 15h4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 19c0-1.7-1-3.1-2.5-3.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 11.3A3 3 0 1 0 16 5.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TicketCoinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19 10.6v2.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 8l7 4-7 4V8Z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10 7l6 5-6 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimeBox({
  month,
  day,
  label,
  time,
}: {
  month: string;
  day: string;
  label: string;
  time: string;
}) {
  return (
    <div className="bg-[#1a1f3a] border border-white/10 rounded-lg px-3 py-2 text-center">
      <div className="text-[11px] text-white/40 font-medium">{month} | {label}</div>
      <div className="text-xl font-bold text-white/90 mt-0.5">{day}</div>
      <div className="text-xs text-white/40 mt-1">{time}</div>
    </div>
  );
}

function CountdownUnit({ value }: { value: string }) {
  return (
    <div className="bg-[#2a1a2f] border border-white/10 rounded px-2 py-1 text-sm font-semibold text-[#ff6478]">
      {value}
    </div>
  );
}

function Badge({
  value,
  unit,
  isCircle,
}: {
  value: string;
  unit: string;
  isCircle: boolean;
}) {
  if (isCircle) {
    const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
    return (
      <div className="relative w-12 h-12 bg-[#1a1f3a] border border-white/10 rounded-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold text-white/90 leading-none">{value}</div>
          <div className="text-xs font-semibold text-white/40 mt-0.5">{unit}</div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {ticks.map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-[5px] w-[1px] bg-white/40 rounded"
              style={{
                transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-19px)`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 bg-[#1a1f3a] border border-white/10 rounded flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg font-bold text-white/90 leading-none">{value}</div>
        <div className="text-xs font-semibold text-white/40 mt-0.5">{unit}</div>
      </div>
      <span className="absolute left-1.5 top-1.5 w-1 h-1 rounded-full bg-white/50" />
      <span className="absolute right-1.5 top-1.5 w-1 h-1 rounded-full bg-white/50" />
    </div>
  );
}

const CompetitionCard = memo(function CompetitionCard(props: CompetitionCardProps) {
  const {
    title,
    entryFee,
    entryFeeCurrency = "USDT",
    participants,
    startsAt,
    endsAt,
    prizePool,
    prizeCurrency = "USDT",
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
  const countdown = diffParts(untilStart);

  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);
  const startMonth = startDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const startDay = String(startDate.getDate()).padStart(2, "0");
  const startTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`;
  const endMonth = endDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const endDay = String(endDate.getDate()).padStart(2, "0");
  const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

  const durationMs = Math.max(0, endsMs - startsMs);
  const durationHours = Math.ceil(durationMs / (3600 * 1000));
  const isCircleBadge = durationHours < 24;
  const badgeValue = isCircleBadge ? String(durationHours) : String(Math.ceil(durationHours / 24));
  const badgeUnit = isCircleBadge ? "H" : "D";

  const isEnded = untilStart <= 0;

  return (
    <section
      className="bg-[#1a1f3a] border border-white/10 rounded-2xl px-6 py-5 max-w-4xl"
      data-testid="card-competition"
    >
      {/* Top Row: Title + Badge */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-3xl font-bold text-white/95">{title}</h3>
          <p className="text-sm text-white/35 mt-1">ID85513</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            value={badgeValue}
            unit={badgeUnit}
            isCircle={isCircleBadge}
          />
          <div className="w-10 h-10 bg-[#1a1f3a] border border-white/10 rounded flex items-center justify-center">
            <PlayIcon className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </div>

      {/* Date/Time Row */}
      <div className="flex items-center gap-3 mb-5">
        <TimeBox month={startMonth} day={startDay} label="Start" time={startTime} />
        <ArrowIcon className="w-5 h-5 text-white/20" />
        <TimeBox month={endMonth} day={endDay} label="End" time={endTime} />
      </div>

      {/* Prize Row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-[#1a1f3a] border border-white/10 rounded flex items-center justify-center">
          <TrophyIcon className="w-5 h-5 text-[#f4c44f]" />
        </div>
        <div>
          <p className="text-xs text-white/40">Total prize</p>
          <p className="text-base font-semibold text-white/90">{prizePool > 0 ? formatMoney(prizePool, prizeCurrency) : "No prize"}</p>
        </div>
      </div>

      {/* Countdown Row */}
      <div className="mb-5">
        <p className="text-sm text-white/40 mb-2">Starts in</p>
        <div className="flex items-center gap-2">
          <CountdownUnit value={`${pad2(countdown.days)}d`} />
          <span className="text-white/20 text-xs">:</span>
          <CountdownUnit value={`${pad2(countdown.hours)}h`} />
          <span className="text-white/20 text-xs">:</span>
          <CountdownUnit value={`${pad2(countdown.minutes)}m`} />
          <span className="text-white/20 text-xs">:</span>
          <CountdownUnit value={`${pad2(countdown.seconds)}s`} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-5" />

      {/* Bottom Row: Stats + Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1a1f3a] border border-white/10 rounded flex items-center justify-center">
            <UsersIcon className="w-5 h-5 text-white/40" />
          </div>
          <div>
            <p className="text-xs text-white/40">Traders</p>
            <p className="text-base font-semibold text-white/70">{participants > 0 ? participants : "-"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1a1f3a] border border-white/10 rounded flex items-center justify-center">
            <TicketCoinIcon className="w-5 h-5 text-[#7a7cff]" />
          </div>
          <div>
            <p className="text-xs text-white/40">Entry fee</p>
            <p className="text-base font-semibold text-white/90">{formatMoney(entryFee, entryFeeCurrency)}</p>
          </div>
        </div>

        <button
          onClick={onJoin}
          disabled={isEnded}
          data-testid="button-join-competition"
          className="bg-[#20d0f2] text-[#061027] font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#1dbfd9] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join
        </button>
      </div>
    </section>
  );
});

CompetitionCard.displayName = "CompetitionCard";

export { CompetitionCard };
