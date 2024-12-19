// data.js

export const platforms = [
  "PC",
  "Playstation 4",
  "Playstation 5",
  "Xbox One",
  "Xbox Series",
  "Mobile",
  "Switch",
];
export const timezones = [];
for (let i = -12; i <= 12; i++) {
  const sign = i < 0 ? "-" : "+";
  const timezone = `UTC${sign}${Math.abs(i).toString().padStart(2, "0")}:00`;
  timezones.push(timezone);
}
