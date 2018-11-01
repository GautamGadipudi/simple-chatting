const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  io.emit('user connected', 'A new user connected');


  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('user disconnect', 'A user disconnected');
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('Listening on port: 3000');
})
