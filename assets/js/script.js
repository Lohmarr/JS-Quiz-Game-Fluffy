// Quiz questions and answers
const myQuestions = [
  {
    question: "Which of the following is a data type in JavaScript?",
    choices: ["[A] String", "[B] Object", "[C] Array", "[D] All of the above"],
    answer: "[D] All of the above",
  },
  {
    question:
      "Which of the following is a correct way to define a function in JavaScript?",
    choices: [
      "[A] function myFunction() { }",
      "[B] var myFunction = function() { }",
      "[C] Both A and B",
      "[D] None of the above",
    ],
    answer: "[B] var myFunction = function() { }",
  },
  {
    question:
      "Which of the following is a method to remove the last element from an array in JavaScript?",
    choices: ["[A] pop()", "[B] shift()", "[C] slice()", "[D] splice()"],
    answer: "[A] pop()",
  },
  {
    question:
      "What is the difference between == and === operators in JavaScript?",
    choices: [
      "[A] == and === are interchangeable and produce the same results",
      "[B] == compares both values and types, while === compares only values",
      "[C] == compares only values, while === compares both values and types",
      "[D] == and === are both logical operators and are not used for comparison",
    ],
    answer:
      "[C] == compares only values, while === compares both values and types",
  },
  {
    question:
      "Which of the following is used to add a comment in JavaScript code?",
    choices: ["[A] //", "[B] #", "[C] ;", "[D] /"],
    answer: "[A] //",
  },
];

// Variables we'll need
let currentQuestionIndex = 0;
let time = myQuestions.length * 15;
const timerInterval = 1000;

// HTML references
const startButton = document.querySelector("#start-button");
const quizContainer = document.querySelector("#quiz-container");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const timerEl = document.querySelector("#timer");
const messageEl = document.querySelector("#message");
const initialsInput = document.querySelector("#initials");
const saveScoreButton = document.querySelector("#save-score-submit");
const highScoresLi = document.querySelector("#high-scores-list");
const saveScoreContainer = document.querySelector("#save-score-container");
const scoreEl = document.querySelector("#score");
const highScoresContainer = document.querySelector("#high-scores-container");
const highScoresList = document.querySelector("#high-scores-list");
const playAgain = document.querySelector('#play-agn-btn')
// Start quiz
function startQuiz() {
  startButton.classList.add("hide");

  quizContainer.classList.remove("hide");

  timerId = setInterval(updateTimer, timerInterval);

  showQuestion();
}

// Update timer
function updateTimer() {
  time--;
  if (time < 0) {
    time = 0;
  }
  timerEl.textContent = time;

  if (time === 0) {
    endQuiz();
  }
}

// Display question
function showQuestion() {
  const question = myQuestions[currentQuestionIndex];

  questionEl.textContent = question.question;

  choicesEl.innerHTML = null;

  question.choices.forEach((choice) => {
    const choiceButton = document.createElement("button");

    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", handleAnswer);
    choicesEl.appendChild(choiceButton);
  });
}

// Handle answer
function handleAnswer(event) {
  const selectedChoice = event.target.textContent;

  const question = myQuestions[currentQuestionIndex];
  const correctAnswer = question.answer;

  if (selectedChoice === correctAnswer) {
    messageEl.textContent = "Correct!";
  } else {
    messageEl.textContent = "Incorrect! Time has been reduced!";

    time -= 10;
    if (time < 0) {
      time = 0;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === myQuestions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// End quiz
function endQuiz() {
  clearInterval(timerId);

  scoreEl.textContent = time

  saveScoreContainer.classList.remove("hide");
  quizContainer.classList.add("hide");
}

// Save score
function saveScore(event) {
  event.preventDefault();

  const initials = initialsInput.value.trim();
  const score = time;

  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }

  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.push({initials: initials, score: score});

  localStorage.setItem("highScores", JSON.stringify(highScores));

  showHighScores();
  refreshOption();
}

// Show High Scores
function showHighScores() {
  saveScoreContainer.classList.add("hide");

  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScoresList.innerHTML = "";

  highScores.sort((a, b) => b.score - a.score);

  highScores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = `${score.initials.toUpperCase()} - ${score.score}`;
    highScoresList.appendChild(li);
  });
}

function refreshOption() {
  playAgain.classList.remove("hide")
}


// Event listeners
startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);
playAgain.addEventListener('click', function() {
  location.reload()
})
window.addEventListener('load', showHighScores)
