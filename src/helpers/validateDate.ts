export const isValidDate = (dateStr: string) => {
  // Check format using regular expression for 'YYYY-MM-DD'
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateStr.match(datePattern);

  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  // Month check
  if (month < 1 || month > 12) return false;

  // Create a date object and compare its components
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
