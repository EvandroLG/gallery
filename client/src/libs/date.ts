import moment from 'moment';

export const fromUtcToLocalTime = (date: Date) => {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );
  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();
  newDate.setHours(hours - offset);

  return newDate;
};

export const formatfromNow = (date: Date) => {
  return moment(date).fromNow();
};
