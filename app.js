document.addEventListener("DOMContentLoaded", () => {
  const userGrid = document.querySelector(".grid-user");
  const computerGrid = document.querySelector(".grid-computer");
  const displayGrid = document.querySelector(".grid-display");
  const ships = document.querySelectorAll(".ship");
  const destroyer = document.querySelector(".destroyer-container");
  const submarine = document.querySelector(".submarine-container");
  const cruiser = document.querySelector(".cruiser-container");
  const battleship = document.querySelector(".battleship-container");
  const carrier = document.querySelector(".carrier-container");
  const startButton = document.querySelector("#start");
  const rotateButton = document.querySelector("#rotate");
  const turnDisplay = document.querySelector("#whose-go");
  const infoDisplay = document.querySelector("#info");

  const userSquare = [];
  const computerSquare = [];
  const width = 10;
  let isHorizontal = true;

  function createBoard(grid, squares, width) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard(userGrid, userSquare, width);
  createBoard(computerGrid, computerSquare, width);

  const shipArray = [
    {
      name: "destroyer",
      directions: [
        [0, 1],
        [0, width],
      ],
    },
    {
      name: "submarine",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "crusier",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "battleship",
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: "carrier",
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ];

  function generateComputerShips(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    console.log(randomDirection);
    let current = ship.directions[randomDirection];

    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;

    let randomStart = Math.abs(
      Math.floor(
        Math.random() * computerSquare.length -
          ship.directions[0].length * direction
      )
    );

    const isTaken = current.some((index) =>
      computerSquare[randomStart + index].classList.contains("taken")
    );

    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % width === width - 1
    );

    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
      current.forEach((index) =>
        computerSquare[randomStart + index].classList.add("taken", ship.name)
      );
    } else {
      generateComputerShips(ship);
    }
  }

  generateComputerShips(shipArray[0]);
  generateComputerShips(shipArray[1]);
  generateComputerShips(shipArray[2]);
  generateComputerShips(shipArray[3]);
  generateComputerShips(shipArray[4]);

  console.log(computerSquare);

  function rotateShip() {
    if (isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = false;
    }

    if (!isHorizontal) {
      destroyer.classList.toggle(".destroyer-container-vertical");
      submarine.classList.toggle(".submarine-container-vertical");
      cruiser.classList.toggle(".cruiser-container-vertical");
      battleship.classList.toggle(".battleship-container-vertical");
      carrier.classList.toggle(".carrier-container-vertical");
      isHorizontal = true;
    }
  }

  rotateButton.addEventListener("click", rotateShip);

  let selectedShipNameWithIndex;
  let draggedShip;
  let draggedShipLength;

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", dragstart);
  });

  userSquare.forEach((square) => {
    square.addEventListener("dragstart", dragstart);
  });

  userSquare.forEach((square) => {
    square.addEventListener("dragover");
  });

  userSquare.forEach((square) => {
    square.addEventListener("dragenter");
  });

  userSquare.forEach((square) => {
    square.addEventListener("dragleave");
  });

  userSquare.forEach((square) => {
    square.addEventListener("drop");
  });

  userSquare.forEach((square) => {
    square.addEventListener("dragend");
  });

  function dragstart() {
    draggedShip = this;
    console.log("quien es ", draggedShip);
    draggedShipLength = this.childNodes.length;
    console.log(draggedShipLength);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    console.log("drag leave");
  }

  function dragDrop() {}

  function dragEnd() {
    console.log("drag end");
  }
});
