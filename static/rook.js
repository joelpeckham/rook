

var socket = io();
// socket.on('message', function (data) {
//     console.log(data);
// });


// socket.emit('new player');
// setInterval(function () {
//     socket.emit('movement', movement);
// }, 1000 / 60);

let testHand = new Hand([
    new Card("yellow", 3),
    new Card("green", 5),
    new Card("black", 5),
    new Card("red", 1)
]);
document.getElementById("gameFooter").appendChild(testHand.render());
