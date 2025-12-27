export function formatNumberForLanguage(
  number: number | string,
  language: "en" | "fa"
): string {
  const numStr = String(number);

  if (language === "fa") {
    // Keep numbers in English even in Persian mode for better readability
    return numStr;
  }

  return numStr;
}

export function formatCurrency(
  amount: number,
  language: "en" | "fa",
  currency: string = "USD"
): string {
  const formatted = amount.toLocaleString(
    language === "en" ? "en-US" : "fa-IR",
    {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  );

  // For Persian, we want to keep the numbers in English
  if (language === "fa") {
    return formatted.replace(/[\u06F0-\u06F9]/g, (match) => {
      const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      const englishDigits = "0123456789";
      return englishDigits[persianDigits.indexOf(match)];
    });
  }

  return formatted;
}

export function formatPercent(
  value: number,
  language: "en" | "fa"
): string {
  return `${value}%`;
}
