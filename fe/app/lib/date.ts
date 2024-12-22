import * as DateFns from 'date-fns';

export function getDateDay(date: string) {
  return DateFns.getDate(date);
}

export function getDateMonth(date: string) {
  return DateFns.format(date, 'MMM');
}
