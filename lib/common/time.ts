
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const OneSecond: number = 1000;
const OneMinuteTime: number = 60 * 1000;
const OneHourTime: number = 60 * 60 * 1000;
const OneDayTime: number = 24 * 60 * 60 * 1000;

// Output: "August 26, 2020"
export function formatTime(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we need to add 1 to get the correct month number
  const day = date.getDate();
  const year = date.getFullYear();
  // Output: "August 26, 2020"
  return months[month - 1] + " " + day + ", " + year;
}

// Output: "August 26, 2020 24:22:11" 
export function formatTimeYMDHMS(timestamp) {
  if (!timestamp) {
    return '';
  }
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we need to add 1 to get the correct month number
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${months[month - 1]} ${day}, ${year} ${hour}:${minute}:${second}`;
}


export function formatTime2Today(tTimeStamp: number): string {
  if (!tTimeStamp) return '';
  const curDate = new Date().getTime();
  const oldDate = new Date(tTimeStamp).getTime();
  const offsetTime = (curDate - oldDate);

  if (offsetTime < OneMinuteTime) {
    return 'less than a minute';
  } else if (offsetTime < OneHourTime) {
    return `${time2minute(offsetTime)} minute`;
  } else if (offsetTime < OneDayTime) {
    return `${time2hour(offsetTime)} hour`;
  } else {
    return `${time2day(offsetTime)} days`;
  }
}
export function time2minute(tTime: number): number {
  return Math.floor(tTime / OneMinuteTime);
}
export function time2hour(tTime: number): number {
  return Math.floor(tTime / OneHourTime);
}
export function time2day(tTime: number): number {
  return Math.floor(tTime / OneDayTime);
}