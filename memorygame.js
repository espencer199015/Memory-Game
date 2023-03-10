 document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".game-card");
  let numCards = cards.length;
  let card1 = null;
  let card2 = null;
  let cardsFlipped = 0;
  let currentScore = 0;
  let lowScore = localStorage.getItem("best-score");
  let start = document.getElementById("start");
  

  if (lowScore) {
    document.getElementById("best-score").innerText = lowScore;
  }

  for (let card of cards) {
    card.addEventListener("click", handleCardClick);
  }

  let startBtn = document.getElementById("start-button");
  startBtn.addEventListener("click", startGame);

  function handleCardClick(e) {
    if (!e.target.classList.contains("front")) return;

    let currentCard = e.target.parentElement;

    if (!card1 || !card2) {
      if (!currentCard.classList.contains("flipped")) {
        setScore(currentScore + 1);
      }
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
      let gif1 = card1.children[1].children[0].src;
      let gif2 = card2.children[1].children[0].src;

      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
      } else {
        setTimeout(function() {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
        }, 1000);
      }
    }

    if (cardsFlipped === numCards) endGame();
  }

  function startGame() {
    setScore(0);
    start.classList.add("playing");
    let indices = [];

    for (let i = 1; i <= numCards / 2; i++) {
      indices.push(i.toString());
    }
    let pairs = shuffle(indices.concat(indices));
    
    let gifObj = {
  1:'baby-horse',
  2:'barrel-horse',
  3:'black-horse',
  4:'escape-horse',
  5:'grey-horse',
  6:'jump-horse',
  7:'pony-horse',
  8:'race-horse',
  9:'roll-horse',
  10:'smile-horse',
  11:'vault-horse',
  12:'water-horse'
    };

    for (let i = 0; i < cards.length; i++) {
      let path = "Horse-Gifs/" + pairs[i] + ".gif";
      cards[i].children[1].children[0].src = gifObj[pairs[i]];
      cards[i].children[1].children[0].src = path;
    }
    let src = object[i];
  }

  function shuffle(array) {
    let arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {

      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      let temp = arrayCopy[idx1];
      arrayCopy[idx1] = arrayCopy[idx2];
      arrayCopy[idx2] = temp;
    }
    return arrayCopy;
  }

  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("final-score").innerText = currentScore;
  }

  function endGame() {
    let end = document.getElementById("end");
    let scoreHeader = end.children[1];
    scoreHeader.innerText = "Your score: " + currentScore;
    let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (currentScore < lowScore) {
      scoreHeader.innerText += " - NEW BEST SCORE!!";
      localStorage.setItem("low-score", currentScore);
    }
    document.getElementById("end").classList.add("game-over");
  }
});
