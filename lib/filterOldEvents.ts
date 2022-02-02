export const filterOldEvents = (today, arr) => {
  const sortedArr = arr.sort((a, b) => Date.parse(a.Date) - Date.parse(b.Date));

  const filteredEvents = sortedArr.filter(
    (event) => new Date(event.Date + ' 11:59 pm').getTime() >= today.getTime()
  );

  return filteredEvents;
};
