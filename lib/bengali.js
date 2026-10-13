// Bengali number, currency, and date formatting utilities

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const bengaliDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];
const bengaliMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function toBengaliNumber(num) {
  if (num === null || num === undefined || isNaN(Number(num))) return "০";
  // Format with commas if large integer
  const parts = Math.abs(Number(num)).toLocaleString("en-IN").split(".");
  const intPart = parts[0].replace(/\d/g, (d) => bengaliDigits[Number(d)]);
  if (parts.length > 1) {
    const decPart = parts[1].replace(/\d/g, (d) => bengaliDigits[Number(d)]);
    return `${intPart}.${decPart}`;
  }
  return intPart;
}

export function formatBengaliPrice(price) {
  return `${toBengaliNumber(price)} টাকা`;
}

export function formatUnit(unit) {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pc":
      return "প্রতি পিস";
    default:
      return unit ? `প্রতি ${unit}` : "প্রতি কেজি";
  }
}

export function formatUnitShort(unit) {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "litre":
    case "liter":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
    case "pc":
      return "পিস";
    default:
      return unit || "কেজি";
  }
}

export function getBengaliDate(d = new Date()) {
  const dayName = bengaliDays[d.getDay()];
  const dateNum = toBengaliNumber(d.getDate());
  const monthName = bengaliMonths[d.getMonth()];
  const yearNum = toBengaliNumber(d.getFullYear());
  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}

export function formatPct(pct) {
  if (pct === null || pct === undefined) return "০.০%";
  const absVal = Math.abs(Number(pct)).toFixed(1);
  return `${toBengaliNumber(absVal)}%`;
}
