const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const notificationRoutes = require('./routes/notifications');
const websocket = require('./websocket');

const app = express();
const server = http.createServer(app);

websocket.init(server);

app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.send('Campus Notifications API Running');
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
