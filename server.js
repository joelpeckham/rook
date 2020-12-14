// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
const gs = require('./gameState');
const { v4: uuidv4 } = require('uuid');

let setup = new gs.setupState();

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use(express.static(__dirname + '/static'));
// app.use(express.static(__dirname + '/playerIcons'));

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/static/joinLobby.html'));
});
app.get('/favicon.ico', function (request, response) {
    response.sendFile(path.join(__dirname, '/favicon.ico'));
});


// Starts the server.
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
let sessions = {};

io.on('connection', function (socket) {
    socket.on('disconnect', () => {
        console.log("disconnect");
        delete sessions[socket.id];
    });
    socket.on('start-session', function (data) {
        console.log("============start-session event================")
        if (data.sessionId == null) {
            var sessionId = uuidv4(); //generating the sessions_id and then binding that socket to that sessions 
            console.log("Server null: ",sessionId);
            socket.join(sessionId); sessions[socket.id] = sessionId;
                socket.emit("set-session-acknowledgement", { sessionId: sessionId });
        }
        else {
            console.log("Server not null: ", data.sessionId);
            socket.join(data.sessionId); sessions[socket.id] = data.sessionId;
        }
    });
    setInterval(function () {
        io.to(sessions[socket.id]).emit("hello", [socket.id, sessions[socket.id]]);
    }, 1000);
    socket.on('attemptPlayerJoinLobby', function (data) {
        // console.log(socket.id,data.playerName,data.playerImageNumber);
        io.to(socket.id).emit("lobbyJoinedSuccess");
    });
    socket.on('hello', function (data) {
        // console.log(socket.id);
    });
    socket.on('movement', function (data) {
        var player = players[socket.id] || {};
        if (data.left) {
            player.x -= 5;
        }
        if (data.up) {
            player.y -= 5;
        }
        if (data.right) {
            player.x += 5;
        }
        if (data.down) {
            player.y += 5;
        }
    });
});
