export const TARGET_DATE = '2024-12-29T00:00:00Z';

// Function to calculate and get time difference
export function getTimeDifference() {
  const now = new Date();
  const target = new Date(TARGET_DATE);
  return target.getTime() - now.getTime();
}

// Function to get current minutes (0-59)
export function getCurrentMinutes() {
  const diff = getTimeDifference();
  return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
}

// Function to get formatted time values
export function getTimeValues() {
  const diff = getTimeDifference();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
}

// Debug function
export function debugTimezoneInfo() {
  const now = new Date();
  console.log({
    localTime: now.toLocaleString(),
    utcTime: now.toUTCString(),
    timezoneOffset: now.getTimezoneOffset(),
    targetDate: new Date(TARGET_DATE).toUTCString()
  });
}

