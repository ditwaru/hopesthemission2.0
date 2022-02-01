export const filterOldEvents = (arr) => {
  const filteredEvents = arr.filter(
    (event) =>
      Date.parse(new Date().toLocaleDateString()) <= Date.parse(event.Date)
  );
  filteredEvents.sort((a, b) => {
    return Date.parse(a.Date) - Date.parse(b.Date);
  });
  return filteredEvents;
};
