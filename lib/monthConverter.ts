export const monthConverter = (date: string) => {
  if (
    date === '01' ||
    date === '02' ||
    date === '03' ||
    date === '04' ||
    date === '05' ||
    date === '06' ||
    date === '07' ||
    date === '08' ||
    date === '09' ||
    date === '10' ||
    date === '11' ||
    date === '12'
  ) {
    const months = {
      '01': 'JAN',
      '02': 'FEB',
      '03': 'MAR',
      '04': 'APR',
      '05': 'MAY',
      '06': 'JUN',
      '07': 'JUL',
      '08': 'AUG',
      '09': 'SEP',
      '10': 'OCT',
      '11': 'NOV',
      '12': 'DEC',
    };

    return months[date];
  }
};
