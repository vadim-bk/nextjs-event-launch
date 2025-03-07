// Store the random event date outside the function so it persists between calls
let eventDate: Date | null = null;

export const calculateTimeToEvent = () => {
  const now = new Date();

  // Generate a random date only once
  if (eventDate === null) {
    // Generate a random date between now and 20 days in the future
    const twentyDaysFromNow = new Date();
    twentyDaysFromNow.setDate(now.getDate() + 20);

    const randomTimestamp =
      now.getTime() +
      Math.random() * (twentyDaysFromNow.getTime() - now.getTime());
    eventDate = new Date(randomTimestamp);
  }

  const diff = eventDate.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
