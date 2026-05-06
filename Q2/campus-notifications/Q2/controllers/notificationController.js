const pool = require('../db');
const redis = require('../services/cacheService');
const notificationQueue = require('../services/queueService');

exports.getNotifications = async (req, res) => {
  const studentId = req.user.id;
  const cacheKey = `notifications:${studentId}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query(
      `SELECT * FROM notifications
       WHERE student_id=$1
       ORDER BY created_at DESC
       LIMIT 50`,
      [studentId]
    );

    await redis.setex(cacheKey, 60, JSON.stringify(result.rows));

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE notifications SET is_read=true WHERE id=$1`,
      [id]
    );

    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.notifyAll = async (req, res) => {
  const { students, message, type } = req.body;

  try {
    for (const student of students) {
      await notificationQueue.add('sendNotification', {
        studentId: student.id,
        email: student.email,
        message,
        type,
      });
    }

    res.json({ message: 'Bulk notifications queued successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
