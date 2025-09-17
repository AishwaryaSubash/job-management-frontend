export function timeAgo(isoDate: string) {
  const updatedAt = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - updatedAt.getTime();

  const mins = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (mins < 60) {
    return `${mins}m Ago`;
  } else if (hours < 24) {
    return `${hours}h Ago`;
  } else {
    return `${days}d Ago`;
  }
}

