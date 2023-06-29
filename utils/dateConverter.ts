export const dateConverter = (dateToConvert: number) => {
  const date = new Date(dateToConvert);
  const arr = date.toString().split(" ");

  const formattedDate = `${arr[0]} ${arr[1]} ${arr[2]}, ${arr[3]}`;

  return formattedDate;
};
