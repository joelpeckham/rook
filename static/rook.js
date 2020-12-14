

var socket = io();
// socket.on('message', function (data) {
//     console.log(data);
// });


// socket.emit('new player');
// setInterval(function () {
//     socket.emit('movement', movement);
// }, 1000 / 60);

let testHand = new Hand(document.getElementById("gameFooter"),[
    new Card("yellow", 3),
    new Card("green", 5),
    new Card("black", 5),
    new Card("red", 1),
    new Card("blue",null,true)
]);

let testPile = new Pile(document.getElementById("pileContainer"),[
    new Card("red", 3),
    new Card("red", 5)
]);

let testPlayerHeads = [
    new PlayerHead("Karen", 0),
    new PlayerHead("Mike", 1)
];

for (let testPlayerHead of testPlayerHeads){
    document.getElementById("playerListContainer").appendChild(testPlayerHead.render());
}

