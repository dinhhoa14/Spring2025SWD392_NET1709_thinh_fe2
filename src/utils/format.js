const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};

const formatTime = (hour) => {
  const formattedHour = String(hour).padStart(2, "0");
  return `${formattedHour}:00:00`;
};

export { formatDate, formatTime };
