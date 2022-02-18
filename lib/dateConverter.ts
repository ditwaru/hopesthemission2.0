export const dateConverter = (dateNumber: number) => {
  const date = new Date(dateNumber);
  const arr = date.toString().split(' ');

  const formattedDate = `${arr[0]} ${arr[1]} ${arr[2]}, ${arr[3]}`;

  return formattedDate;
};
