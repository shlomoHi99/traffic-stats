export const compareDates = (firstDate: string, secondDate: string) => {
  const [yearA, monthA, dayA] = firstDate.split("-").map(Number);
  const [yearB, monthB, dayB] = secondDate.split("-").map(Number);

  const dateA = new Date(yearA, monthA - 1, dayA);
  const dateB = new Date(yearB, monthB - 1, dayB);

  return dateA.getTime() - dateB.getTime();
};
