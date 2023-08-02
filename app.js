document.addEventListener('DOMContentLoaded', (event) => {
  // Get DOM elements
  const startButton = document.querySelector('.start-button');
  const resetButton = document.querySelector('.reset-button');
  const gridCells = document.querySelectorAll('.grid-cell');
  const timerElement = document.getElementById('timer');
  const highScoreElement = document.getElementById('high-score');
   // Initialize variables
  let flippedCells = [];
  let isFlippingEnabled = false;
  let timerInterval;
  let timer = 0;
  let highScore = localStorage.getItem('highScore') || 0; // Get high score from local storage
   // Function to flip a cell
  function flipCell(cell) {
    cell.classList.add('flip');
  }
   // Function to unflip a cell
  function unflipCell(cell) {
    cell.classList.remove('flip');
  }
   // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      timerElement.textContent = timer;
    }, 1000);
  }
   // Function to stop the timer and update high score
  function stopTimer() {
    clearInterval(timerInterval);
    if (timer < highScore || highScore === 0) {
      highScore = timer;
      highScoreElement.textContent = highScore;
      localStorage.setItem('highScore', highScore); // Store high score in local storage
    }
  }
   // Event listener for reset button
  resetButton.addEventListener('click', () => {
    stopTimer();
    resetGame();
  });
   // Event listener for start button
  startButton.addEventListener('click', () => {
    isFlippingEnabled = true;
    spawnCards();
    startTimer();
  });
   // Event listener for grid cells
  gridCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (isFlippingEnabled && !cell.classList.contains('flip') && flippedCells.length < 2) {
        flipCell(cell);
        flippedCells.push(cell);
        checkMatch();
      }
    });
  });
   // Function to spawn cards and assign images
  function spawnCards() {
    const images = [
      'flipped/image1.jpg',
      'flipped/image1.jpg',
      'flipped/image2.jpg',
      'flipped/image2.jpg',
      'flipped/image3.jpg',
      'flipped/image3.jpg',
      'flipped/image4.jpg',
      'flipped/image4.jpg',
      'flipped/image5.jpg',
      'flipped/image5.jpg',
      'flipped/image6.jpg',
      'flipped/image6.jpg',
      'flipped/image7.jpg',
      'flipped/image7.jpg',
      'flipped/image8.jpg',
      'flipped/image8.jpg',
    ];
    const shuffledImages = shuffle(images);
    gridCells.forEach((cell, index) => {
      const front = cell.querySelector('.front');
      const back = cell.querySelector('.back img');
      back.src = shuffledImages[index];
    });
  }
   // Function to shuffle an array
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
   // Function to reset the game
  function resetGame() {
    flippedCells = [];
    gridCells.forEach((cell) => {
      unflipCell(cell);
    });
    timer = 0;
    timerElement.textContent = timer;
  }
   // Function to check if flipped cells match
  function checkMatch() {
    if (flippedCells.length === 2) {
      const firstCell = flippedCells[0];
      const secondCell = flippedCells[1];
      const firstCellImage = firstCell.querySelector('.back img').src;
      const secondCellImage = secondCell.querySelector('.back img').src;
      if (firstCellImage === secondCellImage) {
        flippedCells = [];
        const allCellsFlipped = Array.from(gridCells).every((cell) =>
          cell.classList.contains('flip')
        );
        if (allCellsFlipped) {
          stopTimer();
          if (timer < highScore || highScore === 0) {
            highScore = timer;
            highScoreElement.textContent = highScore;
            localStorage.setItem('highScore', highScore); // Store high score in local storage
          }
        }
      } else {
        setTimeout(() => {
          unflipCell(firstCell);
          unflipCell(secondCell);
          flippedCells = [];
        }, 1200);
      }
    }
  }
});