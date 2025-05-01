
const puzzles = [
  {
    scrambled: "Oily Hand Nods",
    answer: "Hall & Oates",
    prompt: "Unscramble this classic rock band name:",
    hints: [
      "🎤 Artist or Band: Hall & Oates",
      "📆 Song Release Date Hint: 'Private Eyes' released on September 1, 1981",
      "🔎 Reveal the Band Name: Hall & Oates (Blue-eyed soul duo)"
    ]
  },
  {
    scrambled: "Heavenward Toy Hips",
    answer: "Stairway to Heaven",
    prompt: "Unscramble this iconic rock song title:",
    hints: [
      "🎤 Artist or Band: Led Zeppelin",
      "📆 Song Release Date Hint: Released on November 8, 1971",
      "🔎 Reveal the Song Title: Stairway to Heaven"
    ]
  },
  {
    scrambled: "Hey Jude",
    answer: "Hey Jude",
    prompt: "Unscramble this Beatles song title:",
    hints: [
      "🎤 Artist or Band: The Beatles",
      "📆 Song Release Date Hint: Released on August 26, 1968",
      "🔎 Reveal the Song Title: Hey Jude"
    ]
  },
  {
    scrambled: "Bohemian Rhapsody",
    answer: "Bohemian Rhapsody",
    prompt: "Unscramble this Queen song title:",
    hints: [
      "🎤 Artist or Band: Queen",
      "📆 Song Release Date Hint: Released on October 31, 1975",
      "🔎 Reveal the Song Title: Bohemian Rhapsody"
    ]
  },
  {
    scrambled: "Satisfaction",
    answer: "Satisfaction",
    prompt: "Unscramble this Rolling Stones song title:",
    hints: [
      "🎤 Artist or Band: The Rolling Stones",
      "📆 Song Release Date Hint: Released on June 6, 1965",
      "🔎 Reveal the Song Title: Satisfaction"
    ]
  },
  {
    scrambled: "Comfortably Numb",
    answer: "Comfortably Numb",
    prompt: "Unscramble this Pink Floyd song title:",
    hints: [
      "🎤 Artist or Band: Pink Floyd",
      "📆 Song Release Date Hint: Released on November 30, 1979",
      "🔎 Reveal the Song Title: Comfortably Numb"
    ]
  },
  {
    scrambled: "Baba O'Riley",
    answer: "Baba O'Riley",
    prompt: "Unscramble this The Who song title:",
    hints: [
      "🎤 Artist or Band: The Who",
      "📆 Song Release Date Hint: Released in October 1971",
      "🔎 Reveal the Song Title: Baba O'Riley"
    ]
  },
  {
    scrambled: "Back in Black",
    answer: "Back in Black",
    prompt: "Unscramble this AC/DC song title:",
    hints: [
      "🎤 Artist or Band: AC/DC",
      "📆 Song Release Date Hint: Released on July 25, 1980",
      "🔎 Reveal the Song Title: Back in Black"
    ]
  },
  {
    scrambled: "Hotel California",
    answer: "Hotel California",
    prompt: "Unscramble this Eagles song title:",
    hints: [
      "🎤 Artist or Band: Eagles",
      "📆 Song Release Date Hint: Released on December 8, 1976",
      "🔎 Reveal the Song Title: Hotel California"
    ]
  },
  {
    scrambled: "Go Your Own Way",
    answer: "Go Your Own Way",
    prompt: "Unscramble this Fleetwood Mac song title:",
    hints: [
      "🎤 Artist or Band: Fleetwood Mac",
      "📆 Song Release Date Hint: Released in December 1976",
      "🔎 Reveal the Song Title: Go Your Own Way"
    ]
  }
];



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
