const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const {
  loginPage,
  login,
  signupPage,
  signup
} = require('./routes/login');

const {
  uploadFile
} = require('./routes/uploadFile');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'blossom_chat'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to can use public folder
app.use(fileUpload()); // configure fileupload

var onlineUsers = [];
// Initialize appication with route / (that means root of the application)

app.get('/login', loginPage);
app.post('/login', login);
app.post('/uploadFile', uploadFile);
app.get('/signup', signupPage);
app.post('/signup', signup);

// Register events on socket connection
io.on('connection', function (socket) {
  // Listen to chantMessage event sent by client and emit a chatMessage to the client
  socket.on('chatMessage', function (message) {
    io.to(message.receiver).emit('chatMessage', message);
  });
  // Listen to notifyTyping event sent by client and emit a notifyTyping to the client
  socket.on('notifyTyping', function (sender, receiver) {
    io.to(receiver.id).emit('notifyTyping', sender, receiver);
  });

  // Listen to newUser event sent by client and emit a newUser to the client with new list of online users
  socket.on('newUser', function (user) {
    var newUser = {
      id: socket.id,
      name: user
    };
    onlineUsers.push(newUser);
    // Server return a random id for new user
    io.to(socket.id).emit('newUser', newUser);
    // Server announce that a new user has connected
    io.emit('onlineUsers', onlineUsers);
  });

  // Listen to disconnect event sent by client and emit userIsDisconnected and onlineUsers (with new list of online users) to the client 
  socket.on('disconnect', function () {
    onlineUsers.forEach(function (user, index) {
      if (user.id === socket.id) {
        onlineUsers.splice(index, 1);
        io.emit('userIsDisconnected', socket.id);
        io.emit('onlineUsers', onlineUsers);
      }
    });
  });

  socket.on('newGroup', function (newGroup) {
    newGroup.members.forEach(function (member) {
      // Loop for assigning id, which each user has received from server when login
      onlineUsers.forEach(function (user) {
        if (user.name == member.name)
          member.id = user.id;
      })
    });
    newGroup.members.forEach(function (member) {
      io.to(member.id).emit('newGroup', newGroup.name);
    });
  });

  // Create a room for chat with others
  socket.on('acceptGroup', function (name) {
    socket.join(name);
  })

  // truong
  socket.on('client-send-file', function (message) {
    console.log("Server has just received file named: " + message.path);
    io.to(message.receiver).emit('server-tra-file', message);
  })

  socket.on('SaveDB', function (mess) {
    if (mess != null){
      mess.forEach(element => {
        // console.log("Sender:" + element.senderName + " Receiver:" + element.receiverName + " Content:" + element.text);
        let query = "INSERT INTO `messages` (`senderemail`, `receiveremail`, `content`) VALUES ('" + element.senderName + "\', \'" + element.receiverName + "\', \'" + element.text + "')";
        //console.log(query);
        db.query(query, (err, result) => {
          console.log("Add to messages table successfully");
        });
  
      })
    }

  });

  socket.on("loadPreviousMess", function(input){
    // SELECT * FROM `messages` WHERE (senderemail="ntduy.cs@gmail.com" AND receiveremail="npdung@gmail.com") OR (senderemail="npdung@gmail.com" AND receiveremail="ntduy.cs@gmail.com")
    let query = "select * from `messages` where (senderemail = '" + input.sender + "' AND receiveremail = '" + input.receiver + "') OR (senderemail = '" + input.receiver + "' AND receiveremail = '" + input.sender + "')";
    console.log(query);
    var previousMess = [];
    
    db.query(query, (err, result) => {
      if (result){
          result.forEach(ele => {
            var message = {};
            message.senderName = ele.senderemail;
            message.text = ele.content;
            // console.log(message);
            // console.log(message.text);
            previousMess.push(message);
          });

          //console.log("Previous mess inside"+ previousMess);
          io.to(socket.id).emit("server send previous message", previousMess);
      }
    });
    // console.log("Previous mess"+ previousMess);
    // message.senderName = 'ntduy.cs@gmail.com';
    // message.text = 'truong';
    // previousMess.push(message);
    // console.log("Message: "+ message);
    //console.log("Previous mess"+ previousMess);
  })
});
// Listen application request on port 3000
http.listen(process.env.PORT || 3000, function () {
  console.log('listening on *:3000');
});
