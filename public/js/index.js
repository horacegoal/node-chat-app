var socket = io();
socket.on('connect', function () {
  console.log('connected to the server')

  socket.on('newMessage', function (Message) {
    console.log('receive a new message', Message);
  })
})

socket.on('disconnect', function () {
  console.log('Disconneted from server')
})
