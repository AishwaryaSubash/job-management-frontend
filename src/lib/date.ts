export function formatRelativeTime(
  isoString: string,
  now: Date = new Date()
): string {
  const updatedAtDate = new Date(isoString);
  const diffMs = now.getTime() - updatedAtDate.getTime();

  const mins = Math.floor(diffMs / (1000 * 60));
  if (mins < 60) return `${mins}m Ago`;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h Ago`;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${days}d Ago`;
}

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

