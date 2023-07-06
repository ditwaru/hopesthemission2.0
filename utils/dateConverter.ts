export const monthConverter = (date: number) => {
  const months: { [key: number]: string } = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEP",
    9: "OCT",
    10: "NOV",
    11: "DEC",
  };

  return months[date];
};

const add0ToSingleDigit = (digit: number) => {
  if (digit.toString().length === 1) {
    return `0${digit}`;
  }
  return `${digit}`;
};

export const dateConverter = (dateToConvert: number) => {
  const date = new Date(dateToConvert);
  const arr = date.toString().split(" ");

  const formattedDate = `${arr[0]} ${arr[1]} ${arr[2]}, ${arr[3]}`;

  return formattedDate;
};

export const YYYYMMDD = (dateNumber: number) => {
  const date = new Date(dateNumber);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // month is 0 indexed...
  const day = date.getDate();
  return `${year}-${add0ToSingleDigit(month)}-${add0ToSingleDigit(day)}`;
};
