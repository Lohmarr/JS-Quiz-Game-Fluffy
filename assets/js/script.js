// Define the quiz questions and answers
const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "What is the tallest mountain in the world?",
      choices: ["K2", "Mount Everest", "Denali", "Mount Kilimanjaro"],
      answer: "Mount Everest"
    },
    {
      question: "What is the largest country by area?",
      choices: ["United States", "Russia", "Canada", "China"],
      answer: "Russia"
    }
  ];
  
  // Define the variables we'll need
  let currentQuestionIndex = 0;
  let time = questions.length * 15;
  let timerId;
  
  // Get references to the HTML elements we'll need to update
  const startButton = document.querySelector("#start-button");
  const quizContainer = document.querySelector("#quiz-container");
  const questionElement = document.querySelector("#question");
  const choicesElement = document.querySelector("#choices");
  const timerElement = document.querySelector("#timer");
  const messageElement = document.querySelector("#message");
  const initialsInput = document.querySelector("#initials");
  const saveScoreButton = document.querySelector("#save-score");
  
  // Define a function to start the quiz
  function startQuiz() {
    // Hide the start button
    startButton.classList.add("hide");
  
    // Show the quiz container
    quizContainer.classList.remove("hide");
  
    // Start the timer
    timerId = setInterval(updateTimer, 1000);
  
    // Display the first question
    showQuestion();
  }
  
  // Define a function to display a question
  function showQuestion() {
    // Get the current question
    const question = questions[currentQuestionIndex];
  
    // Update the question text
    questionElement.textContent = question.question;
  
    // Remove any existing choices
    choicesElement.innerHTML = "";
  
    // Add the new choices
    question.choices.forEach(choice => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", handleAnswer);
      choicesElement.appendChild(choiceButton);
    });
  }
  
  // Define a function to handle a user's answer to a question
  function handleAnswer(event) {
    // Get the user's answer
    const selectedChoice = event.target.textContent;
  
    // Get the correct answer
    const question = questions[currentQuestionIndex];
    const correctAnswer = question.answer;
  
    // Check if the user's answer is correct
    if (selectedChoice === correctAnswer) {
      // Display a message indicating the answer is correct
      messageElement.textContent = "Correct!";
    } else {
      // Display a message indicating the answer is incorrect
      messageElement.textContent = "Incorrect!";
  
      // Subtract time from the clock
      time -= 10;
      if (time < 0) {
        time = 0;
      }
    }
  
    // Move to the next question
    currentQuestionIndex++;

    // Check if we've reached the end of the quiz
    if (currentQuestionIndex === questions.length) {
          endQuiz();
    } else {
          showQuestion();
    }
  }
  
  // Define a function to update the timer
  function updateTimer() {
    // Update the time remaining
    time--;
    if (time < 0) {
      time = 0;
    }
    timerElement.textContent = time;
  
    // Check if we've run out of time
    if (time === 0) {
      endQuiz();
    }
  }

  // Define a function to end the quiz
function endQuiz() {
    // Stop the timer
    clearInterval(timerId);
    
    // Hide the quiz container
    quizContainer.classList.add("hide");
    
    // Show the form to save the user's initials and score
    const scoreElement = document.querySelector("#score");
    scoreElement.textContent = time;
    const saveScoreContainer = document.querySelector("#save-score-container");
    saveScoreContainer.classList.remove("hide");
    
    // Display the high scores
    const highScoresContainer = document.querySelector("#high-scores-container");
    highScoresContainer.classList.remove("hide");
    
    // Get the existing high scores or create an empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
    // Sort the high scores by score, highest to lowest, and take the top 10
    const topScores = highScores.sort((a, b) => b.score - a.score).slice(0, 10);
    
    // Display the top scores in the high scores list
    const highScoresList = document.querySelector("#high-scores-list");
    topScores.forEach((score, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${index + 1}. <span>${score.initials}</span> - ${score.score}`;
      highScoresList.appendChild(li);
    });
  }

// Define a function to save the user's score
function saveScore(event) {
event.preventDefault();

// Get the user's initials
const initials = initialsInput.value.trim();

// Make sure the user entered their initials
if (initials === "") {
alert("Please enter your initials.");
return;
}

// Create an object to represent the score
const score = {
initials: initials,
score: time
};

// Get the existing high scores or create an empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Add the new score to the high scores array
highScores.push(score);

// Sort the high scores by score, highest to lowest
highScores.sort((a, b) => b.score - a.score);

// Store the high scores in local storage
localStorage.setItem("highScores", JSON.stringify(highScores));

// Redirect to the high scores page
window.location.href = "high-scores.html";
}

// Attach event listeners
startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);