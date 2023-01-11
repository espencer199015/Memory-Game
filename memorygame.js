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
      let gif1 = card1.children[1].children[0].alt;
      let gif2 = card2.children[1].children[0].alt;

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
   let gifObj = {
  1:'cat',
  2:'homer',
  3:'minion',
  4:'kermit',
  5:'obama',
  6:'batman',
  7:'manatee',
  8:'hamster',
  9:'girl',
  10:'singer',
  11:'mario',
  12:'dog'
};
  alt = object[i];
    for (let i = 1; i <= numCards / 2; i++) {
      indices.push(i.toString());
    }
    let pairs = shuffle(indices.concat(indices));

    for (let i = 0; i < cards.length; i++) {
      let path = "gifs/" + pairs[i] + ".gif";
      cards[i].children[1].children[0].alt = path;
    }
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
