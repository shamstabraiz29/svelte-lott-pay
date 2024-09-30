export function formatTime(seconds: number) {
  if (seconds <= 0) {
    seconds = 1;
  }
  seconds = Math.ceil(seconds / 60) * 60;

  const secondsPerDay = 86400;
  const secondsPerHour = 3600;
  const secondsPerMinute = 60;

  const days = Math.floor(seconds / secondsPerDay);
  const hours = Math.floor((seconds - days * secondsPerDay) / secondsPerHour);
  const minutes = Math.floor(
    (seconds - days * secondsPerDay - hours * secondsPerHour) / secondsPerMinute
  );

  const showDay = !!days;
  const showHour = showDay || !!hours;
  const showMinute = true;

  return `${
    showDay ? `<div class="font-fractul font-normal text-xl">1</div>日` : ""
  }${
    showHour
      ? `<div class="font-fractul font-normal text-xl">${hours}</div>時間`
      : ""
  }${
    showMinute
      ? `<div class="font-fractul font-normal text-xl">${minutes}</div>分`
      : ""
  }`;
}
