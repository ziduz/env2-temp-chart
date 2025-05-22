// hoyFormatter.js

/**
 * Converts a list of HOY (hour of year) numbers to formatted datetime strings.
 * Assumes a non-leap year starting on Jan 1, 00:00, not using Date object to avoid Invalid Date.
 * @param {number[]} hoyArray - Array of HOY values (0–8759)
 * @returns {string[]} formatted label strings in 'dd/MM hh A' format
 */
export function formatHOYArray(hoyArray) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const result = [];

  hoyArray.forEach(hoy => {
    const dayOfYear = Math.floor(hoy / 24);
    let hour = hoy % 24;
    let month = 0;
    let day = dayOfYear + 1;

    for (let i = 0; i < 12; i++) {
      if (day > daysInMonth[i]) {
        day -= daysInMonth[i];
        month++;
      } else {
        break;
      }
    }

    const hourLabel = (hour % 12 === 0 ? 12 : hour % 12).toString().padStart(2, '0');
    const ampm = hour < 12 ? 'AM' : 'PM';
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = (month + 1).toString().padStart(2, '0');

    result.push(`${dayStr}/${monthStr} ${hourLabel} ${ampm}`);
  });

  return result;
}