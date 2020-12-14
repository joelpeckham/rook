function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class Card{
  constructor(color, number, isRook = false){
    this.isRook = isRook;
    this.color = color;
    this.number = number;
    this.points = {1:15,2:0,3:0,4:0,5:5,6:0,7:0,8:0,9:0,10:10,11:0,12:0,13:0,14:0}[number];
    if (isRook){
      this.color = "blue";
      this.number = 15;
      this.points = 20;
    }
    this.htmlID = uuidv4();
  }
  render(){
    let html = 
    `
    <div class = "cardFront" id="${this.htmlID}">
      <div class = "header">
        <p class = "smallNumber hasColor_${this.color}"> ${this.number} </p>
        <p class = "hasColor_${this.color} spelledNumber"> ${this.color} </p>
      </div>
      <div class = "body">
      <p class = "largeNumber hasColor_${this.color}"> ${this.number} </p>
      </div>
    </div>
    `;
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }
}

class Hand {
  constructor(cards = []) {
    this.cards = cards;
    this.htmlID = uuidv4();
  }
  removeCard(card){
    const index = array.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
  render() {
    var container = document.createElement('div');
    container.classList = ["playerHand"];
    for (var card of this.cards) {
      card = card.render();
      card.firstElementChild.classList.add("inPlayerHand")
      var cardContainer = document.createElement('div');
      cardContainer.classList = ["cardContainer"];
      cardContainer.appendChild(card)
      container.appendChild(cardContainer);
    }
    return container;
  }
}

class Pile {
  constructor(cards = []) {
    this.cards = cards;
    this.htmlID = uuidv4();
  }
  removeCard(card) {
    const index = array.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
  render() {
    var container = document.createElement('div');
    container.classList = ["pile"];
    for (var card of this.cards) {
      card = card.render();
      card.firstElementChild.classList.add("inPile")
      var cardContainer = document.createElement('div');
      cardContainer.classList = ["cardContainer"];
      cardContainer.appendChild(card)
      container.appendChild(cardContainer);
    }
    return container;
  }
}
