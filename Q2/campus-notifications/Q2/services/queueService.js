const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const pool = require('../db');
const sendEmail = require('./emailService');
const websocket = require('../websocket');

const connection = new Redis({
  maxRetriesPerRequest: null,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const notificationQueue = new Queue('notifications', { connection });

const worker = new Worker(
  'notifications',
  async (job) => {
    const { studentId, email, message, type } = job.data;

    await pool.query(
      `INSERT INTO notifications(student_id, type, message)
       VALUES($1, $2, $3)`,
      [studentId, type, message]
    );

    try {
      await sendEmail(email, 'Campus Notification', message);
    } catch (err) {
      console.error('Email failed:', err.message);
    }

    websocket.getIO().to(`student_${studentId}`).emit('notification', {
      studentId,
      message,
      type,
    });
  },
  { connection }
);

module.exports = notificationQueue;
