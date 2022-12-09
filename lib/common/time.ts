
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we need to add 1 to get the correct month number
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${months[month - 1]} ${day}, ${year} ${hour}:${minute}:${second}`;
}