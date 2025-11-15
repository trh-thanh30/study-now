export function formatTTL(expiredAt: Date): string {
  const diffMs = expiredAt.getTime() - Date.now();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec <= 0) return 'Expired';

  const minutes = Math.floor(diffSec / 60);
  const seconds = diffSec % 60;

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
  }

  return `${seconds} second${seconds > 1 ? 's' : ''} left`;
}
