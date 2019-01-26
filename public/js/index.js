var socket = io();
socket.on('connect', function () {
  console.log('connected to the server')

  socket.on('newMessage', function (message) {
    console.log('receive a new message', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
  })

  socket.emit('createMessage',
    {
      from: "me",
      text: "testing"
    }
  , function () {
    console.log('confirmed')
  })
})

socket.on('disconnect', function () {
  console.log('Disconneted from server')
})



$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: $('[name=message]').val()
  }, function () {

  })
})
