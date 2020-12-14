

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
    new Card("red", 1),
    new Card("blue",null,true)
]);

let testPile = new Pile([
    new Card("red", 3),
    new Card("green", 5),
    new Card("black", 5),
    new Card("red", 1),
    new Card("yellow", 10),
    new Card("green", 5),
    new Card("black", 5),
    new Card("yellow", 2)
]);
document.getElementById("gameFooter").appendChild(testHand.render());
document.getElementById("pileContainer").appendChild(testPile.render());
