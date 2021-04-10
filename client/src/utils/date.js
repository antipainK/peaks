export function formatDate(isoDateTime) {
  const date = new Date(isoDateTime);
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
