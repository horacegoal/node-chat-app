const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('created message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  })

  socket.on('createLocationMessage', (message) => {
    io.emit('newLocationMessage', generateLocationMessage(message.from, message.latitude, message.longitude))
  })

  socket.on('disconnect', () => {
    console.log('Disconneted from server')
  })
})



server.listen(port, () => {
  console.log(`The server is up on port ${port}`)
})
