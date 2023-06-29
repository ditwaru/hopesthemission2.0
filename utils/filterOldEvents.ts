export const filterOldEvents = (today: Date, arr: { date: string }[]) => {
  // const sortedArr = arr.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

  const filteredEvents = arr.filter(
    (event) => new Date(event.date + ' 11:59 pm').getTime() >= today.getTime()
  );

  return filteredEvents;
};
