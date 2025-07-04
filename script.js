
const cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = cards.length / 2;
let timeLeft = 30;
let timer;

document.getElementById("time").textContent = timeLeft;

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

function endGame(won) {
  setTimeout(() => {
    if (won) {
      alert("🎉 Congratulation JEROME ! You won !");
    } else {
      alert("⏰ Time is Over ! You lost 😥");
    }
    window.location.reload(); // Recharge la page pour recommencer
  }, 500);
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    if (!timer) startTimer(); // Démarre le chrono au premier clic

    if (lockBoard || card.classList.contains("matched") || card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    const img1 = firstCard.querySelector(".back-view img").src;
    const img2 = secondCard.querySelector(".back-view img").src;

    if (img1 === img2) {
      setTimeout(() => {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === totalPairs) {
          clearInterval(timer);
          endGame(true);
        }
        resetCards();
      }, 600);
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetCards();
      }, 1000);
    }
  });
});

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
