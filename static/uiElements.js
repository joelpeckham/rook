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
      this.number = "R";
      this.points = 20;
    }
    this.htmlID = uuidv4();
  }
  render(){
    let html = 
    `
    <div class = "cardFront hasColor_${this.color}"" id="${this.htmlID}">
      <div class = "header">
        <p class = "smallNumber"> ${this.number} </p>
        <p class = "spelledNumber"> ${(!this.isRook) ? this.color : "rook"} 
        </br> <span class = "cardPoints">${this.points} points</span> </p>
      </div>
      <div class = "body">
      <p class = "largeNumber"> ${this.number} </p>
      </div>
    </div>
    `;
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }
}

class Hand {
  constructor(containerElement, cards = []) {
    this.home = containerElement;
    this.cards = cards;
    this.htmlSubContainer;
    this.htmlID = uuidv4();
    this.render();
    
  }
  removeCard(card){
    for (let div of this.htmlSubContainer.children){
      if (div.className == `cardContainer ${card.color}_${card.number}_${card.isRook}`){
        div.remove(); 
      }
    }
  }
  addCard(card){
    var cardContainer = document.createElement('div');
    cardContainer.classList = [`cardContainer ${card.color}_${card.number}_${card.isRook}`];
    card = card.render();
    card.firstElementChild.classList.add("inPlayerHand");
    cardContainer.appendChild(card)
    this.htmlSubContainer.appendChild(cardContainer);
  }
  render() {
    var container = document.createElement('div');
    container.classList = ["playerHand"];
    for (var card of this.cards) {
      var cardContainer = document.createElement('div');
      cardContainer.classList = [`cardContainer ${card.color}_${card.number}_${card.isRook}`];
      card = card.render();
      card.firstElementChild.classList.add("inPlayerHand");
      cardContainer.appendChild(card)
      container.appendChild(cardContainer);
    }
    this.htmlSubContainer = container;
    this.home.appendChild(container);
  }
}

class Pile {
  constructor(containerElement, cards = []) {
    this.home = containerElement;
    this.cards = cards;
    this.htmlSubContainer;
    this.htmlID = uuidv4();
    this.renderList();
  }
  delete(){
    this.home.innerHTML = "";
  }
  add(card){
    this.cards.push(card);
    card = card.render();
    card.firstElementChild.classList.add("inPile")
    var cardContainer = document.createElement('div');
    cardContainer.classList = ["cardContainer"];
    let spread = 15;
    cardContainer.style.transform = `rotate(${Math.random() * (spread * 2) - spread}deg)`;
    cardContainer.appendChild(card)
    this.htmlSubContainer.appendChild(cardContainer);
  }
  renderList() {
    var container = document.createElement('div');
    container.classList = ["pile"];
    for (var card of this.cards) {
      card = card.render();
      card.firstElementChild.classList.add("inPile")
      var cardContainer = document.createElement('div');
      cardContainer.classList = ["cardContainer"];
      let spread = 15;
      cardContainer.style.transform = `rotate(${Math.random() * (spread*2) - spread  }deg)`;
      cardContainer.appendChild(card)
      container.appendChild(cardContainer);
    }
    this.htmlSubContainer = container;
    this.home.appendChild(container);
  }
}

class PlayerHead {
  constructor(name, imageNumber) {
    this.name = name;
    this.imageURL = `playerIcons/playerIcon_${imageNumber}.svg`;
  }
  render() {
    let html =
    `
    <div class = "playerTag">
      <img class="playerIconSvg" src="${this.imageURL}" alt="${this.name}">
      <p class = "playerIconName">${this.name}</p>
    </div>
    `;
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }
}

class Toast{
  constructor(text, duration = 3){
    this.text = text;
    this.duration = duration;
    this.ID = uuidv4();
  }
  render(){
    let html =
    `<div class = "toast" id="${this.ID}">
      <p class = "toastText">${this.text}</p>
    </div>`;
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }
}

class ToastManager{
  constructor(containerElement){
    this.toasts = [];
    this.container = containerElement;
  }
  addToast(toast){
    this.toasts.push(toast);
    let toastElem = toast.render();
    this.container.appendChild(toastElem);
    console.log(this.container.lastChild);
    this.container.lastChild.style.animation = `fadeOut 1s ease ${toast.duration-1.5}s 1`;
    
    setTimeout(() => {
      for (let c of this.container.children) {
        if (c.id == toast.ID) c.remove(); 
        break;
      }
    }, 1000*toast.duration);
  }
}