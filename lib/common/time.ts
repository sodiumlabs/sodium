
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
    return 'a few seconds ago';
  } else if (offsetTime < OneHourTime) {
    return `${time2minute(offsetTime)} minute ago`;
  } else if (offsetTime < OneDayTime) {
    return `${time2hour(offsetTime)} hour ago`;
  } else if (offsetTime < 10 * OneDayTime) {
    return `${time2day(offsetTime)} days ago`;
  } else {
    return formatTimeYMDHMS(tTimeStamp);
  }
}

export enum HistoryTime {
  "ToDay" = "Today",
  "This Week" = "This Week",
  "Last Week" = "Last Week",
  "This Month" = "This Month",
  "This Year" = "This Year",
  "Other" = "Other",
}

export function formatHistoryTime2Today(tTimeStamp: number): string {
  if (tTimeStamp > getToDayBegin()) {
    return HistoryTime.ToDay;
  } else if (tTimeStamp >= getThisWeekBegin()) {
    return HistoryTime["This Week"];
  } else if (tTimeStamp >= getLastWeekBegin()) {
    return HistoryTime["Last Week"];
  } else if (tTimeStamp >= getThisMonthBegin()) {
    return HistoryTime["This Month"];
  } else if (tTimeStamp >= getThisYearBegin()) {
    return HistoryTime["This Year"];
  } else {
    return HistoryTime.Other;
  }
}
// window.formatHistoryTime2Today = formatHistoryTime2Today;

function getToDayBegin() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  // console.log("getToDayBegin " + date.toString());
  return date.getTime();
}
function getThisWeekBegin() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - date.getDay());
  // console.log("getThisWeekBegin " + date.toString());
  return date.getTime()
}
function getLastWeekBegin() {
  return getThisWeekBegin() - 7 * OneDayTime;
}
function getThisMonthBegin() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(1);
  // console.log("getThisMonthBegin " + date.toString());
  return date.getTime();
}

function getThisYearBegin() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(0);
  date.setMonth(1);
  // console.log("getThisYearBegin " + date.toString());
  return date.getTime();
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

