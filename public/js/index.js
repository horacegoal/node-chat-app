var socket = io();
socket.on('connect', function () {
  console.log('connected to the server')

  socket.on('newMessage', function (message) {
    console.log('receive a new message', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
  })

  socket.on('newLocationMessage', function (message) {
    console.log(message)
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.uri);

    li.append(a);
    $('#messages').append(li);
  })
})

socket.on('disconnect', function () {
  console.log('Disconneted from server')
})



$('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextBox = $('[name=message]')
  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      from: 'user',
      latitude: `${position.coords.latitude}`,
      longitude: `${position.coords.longitude}`
    })
    locationButton.removeAttr('disabled').text('send location');
  }, function () {
    locationButton.removeAttr('disabled').text('send location');
    alert('unable to fetch location')
  })

})
