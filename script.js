// Global Variables
let cards = [];
let flippedCards = [];
let matches = 0;
let timer;
let timeLeft = 60;

// Start the Game
document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    resetGame();
    generateCards();
    shuffle(cards);
    renderBoard();
    startTimer();
}

function resetGame() {
    matches = 0;
    flippedCards = [];
    document.getElementById('result').textContent = '';
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timer);
    timeLeft = 60;
}

function generateCards() {
    const ingredients = ['Boba', 'Milk Tea', 'Taro', 'Purple Yam', 'Honey', 'Matcha', 'Coffee', 'Lychee'];
    cards = [...ingredients, ...ingredients]; // Create pairs
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Clear the board
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard(event) {
    const cardElement = event.target;

    if (cardElement.classList.contains('flipped') || flippedCards.length >= 2) return;

    cardElement.textContent = cardElement.dataset.value;
    cardElement.classList.add('flipped');
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matches++;
        flippedCards = [];
        if (matches === cards.length / 2) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function endGame(win) {
    clearInterval(timer);
    const result = document.getElementById('result');
    if (win) {
        result.textContent = '🎉 Congratulations! You matched all pairs!';
    } else {
        result.textContent = '⏰ Time’s up! Try again.';
    }
    document.getElementById('game-board').innerHTML = ''; // Clear the board
}
