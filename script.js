const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const timezoneElement = document.getElementById("timezone");
const statusElement = document.getElementById("status");
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

const weekdayFormatter = new Intl.DateTimeFormat("zh-CN", {
  weekday: "long",
});

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const secondProgress = seconds + milliseconds / 1000;
  const minuteProgress = minutes + secondProgress / 60;
  const hourProgress = (hours % 12) + minuteProgress / 60;

  const secondRotation = secondProgress * 6;
  const minuteRotation = minuteProgress * 6;
  const hourRotation = hourProgress * 30;

  secondHand.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteRotation}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourRotation}deg)`;

  timeElement.textContent = timeFormatter.format(now);
  dateElement.textContent = `${weekdayFormatter.format(now)} - ${dateFormatter.format(now)}`;
  timezoneElement.textContent = `Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone || "Local"}`;
  statusElement.textContent = `Updated at ${pad(hours)}:${pad(minutes)}:${pad(seconds)}.`;

  requestAnimationFrame(updateClock);
}

requestAnimationFrame(updateClock);
