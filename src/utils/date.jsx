export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getNextEligibleDate(lastDonationDate) {
  return addDays(new Date(lastDonationDate), 100);
}

export function isEligible(lastDonationDate) {
  const nextDate = getNextEligibleDate(lastDonationDate);
  return nextDate <= new Date();
}

export function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function daysUntil(nextDate) {
  const now = new Date();
  const diff = new Date(nextDate) - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
