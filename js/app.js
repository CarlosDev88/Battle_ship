let model = {
  boardSize: 7,
  numShip: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
  ],

  fire: function (guess) {
    for (let i = 0; i < this.numShip; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);

      if (ship.hits[index] === "hit") {
        view.displayMessage("you have already hit this location!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battle ship");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed!");
    return false;
  },

  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },

  generateShipLocations: function () {
    let locations;

    for (let i = 0; i < this.numShip; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));

      this.ships[i].locations = locations;
    }

    console.log("ships array: ", this.ships);
  },

  generateShip: function () {
    let direction = Math.floor(Math.random() * 2);
    let row;
    let col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {
      col = Math.floor(Math.random() * this.boardSize);
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function (location) {
    for (let i = 0; i < this.numShip; i++) {
      let ship = this.ships[i];
      for (let j = 0; j < location.length; j++) {
        if (ship.locations.indexOf(location[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },
};

let view = {
  displayMessage: function (message) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = message;
  },
  displayHit: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

let controll = {
  guesses: 0,

  processGuess: function (guess) {
    let location = parseGuess(guess);

    if (location) {
      this.guesses++;
      let hit = model.fire(location);

      if (hit && model.shipsSunk === model.numShip) {
        view.displayMessage(
          "You sunk all the battle ship in " + this.guesses + " guesses!"
        );
      }
    }
  },
};

function parseGuess(guess) {
  let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("please enter a valid guess. Must be a letter and number");
  } else {
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let col = guess.charAt(1);

    if (isNaN(row) || isNaN(col)) {
      alert("Not a valid input");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      col < 0 ||
      col >= model.boardSize
    ) {
      alert("Input is not located on the board");
    } else {
      return row + col;
    }
  }
  return null;
}

function handleFireButton() {
  let guessInput = document.getElementById("guessInput");
  let guess = guessInput.value.toUpperCase();

  controll.processGuess(guess);
  guessInput.value = "";
}

function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");

  e = e || window.event;

  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  let guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

window.onload = init;
