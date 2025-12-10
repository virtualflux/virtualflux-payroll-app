export function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(/ /g, ' '); 
}
