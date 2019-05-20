// var socket = io("https://blossombk.herokuapp.com/");
var socket = io();

var allChatMessages = [];
var previousMess = [];
var chatNotificationCount = [];
var myUser = {};
var myFriend = {};
var myGroups = [];

$(document).ready(function () {
  // Entry point
  loginMe();

  $('.upload-btn').on('click', function () {
    $('#upload-input').click();
  });

  $('#upload-input').on('change', function () {
    var uploadInput = $('#upload-input');

    if (uploadInput.val() != '') {
      var formData = new FormData();

      formData.append('upload', uploadInput[0].files[0]);

      $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
          uploadInput.val('');
        }
      })
      var message = {};
      message.path = uploadInput.val();
      message.sender = myUser.id;
      message.receiver = myFriend.id;
      message.senderName = myUser.name;
      message.receiverName = myFriend.name;
      filename = message.path.replace(/^.*[\\\/]/, '');
      link = 'uploads/' + filename;
      link1 = "File: " + filename + "</br><a download=" + filename + " href=" + link + ">Click here to download</a>"
      message.text = link1;
      

      $('#messages').append('<div class="chatMessageRight col-8 my-message d-flex">' + link1 + '</div>');

      if (allChatMessages[myFriend.id] != undefined) {
        allChatMessages[myFriend.id].push(message);
      } else {
        allChatMessages[myFriend.id] = new Array(message);
      }
      socket.emit("client-send-file", message);
    }
  })
});

function createGroup() {
  var newGroup = {},
    i;
  newGroup.name = prompt("Nhập tên nhóm chat của bạn", '');
  newGroup.amount = prompt("Nhập số người trong nhóm", '');
  newGroup.members = new Array();
  newGroup.members[0] = myUser;
  for (i = 1; i < Number(newGroup.amount); i++) {
    var member = {};
    member.name = prompt("Nhập user " + String(i), '');
    // Insert email of each user to newGroup object
    newGroup.members.push(member);
  }
  console.log(newGroup);
  socket.emit('newGroup', newGroup);
}

// Function to ask user to supply his/her name before entering a chatbox
function loginMe() {
  alert("Chào mừng bạn tới trang web !!!");
  var person = $('#myName').html().trim(); // take account's email => person = ntduy.cs@gmail.com
  console.log("Person: " + person);
  
  socket.emit('newUser', person);
  
}
// Function to be called when sent a message from chatbox
function submitfunction() {
  var message = {};
  text = $('#m').val();
  if (text != '') {
    message.text = text;
    message.sender = myUser.id;
    message.receiver = myFriend.id;
    message.senderName = myUser.name;
    message.receiverName = myFriend.name;

    $('#messages').append('<div class="chatMessageRight col-8 my-message d-flex">' + message.text + '</div>');

    if (allChatMessages[myFriend.id] != undefined) {
      allChatMessages[myFriend.id].push(message);
    } else {
      allChatMessages[myFriend.id] = new Array(message);
    }
    socket.emit('chatMessage', message);
  }
  $('#m').val('').focus();
  // return false;
}
// function to emit an even to notify friend that I am typing a message 
function notifyTyping() {
  socket.emit('notifyTyping', myUser, myFriend);
}
// Load all messages for the selected user
function loadChatBox(messages) {
  //  $('#messages').html('');
  
  messages.forEach(function (message) {   
    var cssClass = (message.senderName == myUser.name) ? 'chatMessageRight col-8 my-message d-flex' : 'chatMessageLeft col-8 my-friend-message d-flex flex-row-reverse ml-auto';
    $('#messages').append('<div class="' + cssClass + '">' + message.text + '</div>');
  });
  console.log($('#messages').html());
}
// Append a single chant message to the chatbox
function appendChatMessage(message) {

  if (myGroups.indexOf(message.receiver) < 0) {
    // this is for one-one chat
    if (message.receiver == myUser.id && message.sender == myFriend.id) {
      playNewMessageAudio();
  
      var cssClass = (message.sender == myUser.id) ? 'chatMessageRight col-8 my-message d-flex' : 'chatMessageLeft col-8 my-friend-message d-flex flex-row-reverse ml-auto';
      $('#messages').append('<div class="' + cssClass + '">' + message.text + '</div>');
    } else {
      playNewMessageNotificationAudio();
      updateChatNotificationCount(message.sender);
    }
    if (allChatMessages[message.sender] != undefined) {
      allChatMessages[message.sender].push(message);
    } else {
      allChatMessages[message.sender] = new Array(message);
    }
  } else {

    // this is for group chat
    if (message.sender != myUser.id) {
      message.text = message.senderName + ': ' + message.text;
      if (message.receiver == myFriend.id) {
        playNewMessageAudio();

        var cssClass = (message.sender == myUser.id) ? 'chatMessageRight col-8 my-message d-flex' : 'chatMessageLeft col-8 my-friend-message d-flex flex-row-reverse ml-auto';
        $('#messages').append('<div class="' + cssClass + '">' + message.text + '</div>');
      } else {
        playNewMessageNotificationAudio();
        updateChatNotificationCount(message.receiver);
      }
      if (allChatMessages[message.receiver] != undefined) {
        allChatMessages[message.receiver].push(message);
      } else {
        allChatMessages[message.receiver] = new Array(message);
      }
    }

  }

}
// Function to play a audio when new message arrives on selected chatbox
function playNewMessageAudio() {
  (new Audio('https://notificationsounds.com/soundfiles/8b16ebc056e613024c057be590b542eb/file-sounds-1113-unconvinced.mp3')).play();
}
// Function to play a audio when new message arrives on selected chatbox
function playNewMessageNotificationAudio() {
  (new Audio('https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3')).play();
}
// Function to update chat notifocation count
function updateChatNotificationCount(userId) {
  var count = (chatNotificationCount[userId] == undefined) ? 1 : chatNotificationCount[userId] + 1;
  chatNotificationCount[userId] = count;
  $('#' + userId + ' span.chatNotificationCount').html(count);
  $('#' + userId + ' span.chatNotificationCount').show();
}
// Function to clear chat notifocation count to 0
function clearChatNotificationCount(userId) {
  chatNotificationCount[userId] = 0;
  $('#' + userId + ' span.chatNotificationCount').hide();
}
// Function to be called when a friend is selected from the list of online users
function selectUerChatBox(element, userId, userName) {
  console.log("Duy dsadashdsd" + element);
  myFriend.id = userId;
  myFriend.name = userName;
  $('#box').show();
  $('#messages').show();
  $('#onlineUsers div').removeClass('active');

  $('#onlineGroups div').removeClass('active');

  $(element).addClass('active');
  $('#notifyTyping').text('');
  $('#m').val('').focus();
  // Reset chat message count to 0
  clearChatNotificationCount(userId);
  // load all chat message for selected user 
  $('#messages').html('');

  socket.emit("loadPreviousMess", {
    sender: myUser.name,
    receiver: myFriend.name
  })
}

//loadChatBox(previousMess);
socket.on("server send previous message", function (result) {
  loadChatBox(result);
  if (allChatMessages[myFriend.id] != undefined) {
    loadChatBox(allChatMessages[myFriend.id]);
  } else {
    //  $('#messages').html('');
  }
})



// ############# Event listeners and emitters ###############
// Listen to newUser even to set client with the current user information
socket.on('newUser', function (newUser) {
  myUser = newUser;
  $('#myName').html(myUser.name);
});
// Listen to notifyTyping event to notify that the friend id typying a message
socket.on('notifyTyping', function (sender, recipient) {
  if (myFriend.id == sender.id) {
    $('#notifyTyping').text(sender.name + ' is typing ...');
  }
  setTimeout(function () {
    $('#notifyTyping').text('');
  }, 5000);
});

// Listen to onlineUsers event to update the list of online users
socket.on('onlineUsers', function (onlineUsers) {
  var usersList = '';
  if (onlineUsers.length == 2) {
    onlineUsers.forEach(function (user) {
      if (myUser.id != user.id) {
        myFriend.id = user.id;
        myFriend.name = user.name;
        $('#box').show();
        $('#messages').show();
      }
    });
  }
  

  onlineUsers.forEach(function (user) {
    console.log(user.name);
    if (user.id != myUser.id) {
      var activeClass = (user.id == myFriend.id) ? 'active' : '';
      usersList += '<div id="' + user.id + '" class="' + activeClass + ' list-group-item d-flex justify-content-between align-items-center items" onclick="selectUerChatBox(this, \'' + user.id + '\', \'' + user.name + '\')">' + user.name + '<span class="chatNotificationCount badge badge-primary badge-pill"></span></div>';
    }
  });
  $('#onlineUsers').html(usersList);
});

// Listen to chantMessage event to receive a message sent by my friend 
socket.on('chatMessage', function (message) {
  appendChatMessage(message);
});

// Listen to userIsDisconnected event to remove its chat history from chatbox
socket.on('userIsDisconnected', function (userId) {
  socket.emit("SaveDB", allChatMessages[userId]);
  delete allChatMessages[userId];
  $('#box').hide();
  $('#messages').hide();
});


socket.on('newGroup', function (name) {
  socket.emit('acceptGroup', name);
  // object myGroups contains the list of group which you ha
  myGroups.push(name);
  groupsList = '';
  myGroups.forEach(function (group) {
    var activeClass = (group == myFriend.id) ? 'active' : '';
    groupsList += '<div id="' + group + '" class="' + activeClass + ' list-group-item d-flex justify-content-between align-items-center items" onclick="selectUerChatBox(this, \'' + group + '\', \'' + group + '\')">' + group + '<span class="chatNotificationCount badge badge-primary badge-pill"></span></div>';
  });
  console.log(myGroups);
  $('#onlineGroups').html(groupsList);
});

socket.on('server-tra-file', function (message) {
  console.log(message.path);
  var filename = message.path.replace(/^.*[\\\/]/, '');
  var link = '/uploads/' + filename;
  var link1 = "File: " + filename + "</br><a download=" + filename + " href=" + link + ">Click here to download</a>"
  message.text = link1;
  appendChatMessage(message);
  console.log("Have received the file " + filename);
});