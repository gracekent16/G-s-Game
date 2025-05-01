// Your puzzles and logic
const puzzles = [...]; // Insert puzzles here

let currentPuzzleIndex = 0;
let points = 3;
let attempts = 0;
let hintsUsed = 0;

function updatePuzzle() {
  const puzzle = puzzles[currentPuzzleIndex];
  document.getElementById("puzzle-number").innerText = `🤘 ROCKNONYM #${currentPuzzleIndex + 1} 🤘`;
  document.getElementById("puzzle-prompt").innerText = `🧩 ${puzzle.prompt}`;
  document.getElementById("puzzle-text").innerText = `"${puzzle.scrambled}"`;
  document.getElementById("feedback").innerText = "";
  document.getElementById("hint").innerText = "";
  document.getElementById("guess").value = "";
  attempts = 0;
  hintsUsed = 0;
}

function submitGuess() {
  const userGuess = document.getElementById("guess").value.trim().toLowerCase();
  const correctAnswer = puzzles[currentPuzzleIndex].answer.toLowerCase();
  attempts++;
  if (userGuess === correctAnswer) {
    let earned = attempts === 1 ? 3 : (attempts === 2 ? 2 : 1);
    points += earned;
    document.getElementById("feedback").innerText = `✅ Correct! +${earned} points.`;
    document.getElementById("score").innerText = `Points: ${points}`;
    launchConfetti();
    currentPuzzleIndex++;
    if (currentPuzzleIndex < puzzles.length) {
      setTimeout(updatePuzzle, 2000);
    } else {
      document.getElementById("puzzle-number").innerText = "🎉 Game Over 🎉";
      document.getElementById("puzzle-prompt").innerText = "";
      document.getElementById("puzzle-text").innerText = "";
    }
  } else {
    document.getElementById("feedback").innerText = `❌ Not quite. Try again!`;
  }
  document.getElementById("guess").value = "";
}

function requestHint() {
  const puzzle = puzzles[currentPuzzleIndex];
  const cost = [3, 2, 5][hintsUsed];
  if (hintsUsed < 3 && points >= cost) {
    points -= cost;
    document.getElementById("hint").innerHTML += `<p>${puzzle.hints[hintsUsed]}</p>`;
    document.getElementById("score").innerText = `Points: ${points}`;
    hintsUsed++;
  } else {
    document.getElementById("hint").innerHTML = `<p>❗ Not enough points or all hints used!</p>`;
  }
}

window.onload = () => {
  updatePuzzle();
};
