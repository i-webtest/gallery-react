export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(new Date(Date.parse(date)));
};
