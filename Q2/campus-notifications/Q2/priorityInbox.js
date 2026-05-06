function getPriorityScore(notification) {
  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const typeWeight = weights[notification.Type] || 0;

  const now = new Date();
  const created = new Date(notification.Timestamp);
  const recencyMinutes = (now - created) / (1000 * 60);

  const recencyScore = Math.max(0, 1000 - recencyMinutes);

  return typeWeight * 1000 + recencyScore;
}

function getTopNotifications(notifications, topN = 10) {
  return notifications
    .map((n) => ({ ...n, score: getPriorityScore(n) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

module.exports = { getTopNotifications };
