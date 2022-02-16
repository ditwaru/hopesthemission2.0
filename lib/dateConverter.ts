export const dateConverter = (date: string) => {
  const dateArray = date.split('-');
  console.log(dateArray);
  const formattedDate = new Date(
    +dateArray[0],
    +dateArray[1] - 1,
    +dateArray[2]
  ).toDateString();

  return formattedDate;
};
