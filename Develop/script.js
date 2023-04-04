// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
// a list of every answer choice, questions, and answers
var questions = [
    {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: [
        "<javascript>",
         "<script>", 
         "<scripting>", 
         "<js>"
        ],
      answer: "<script>"
    },
    {
      title: "How can you add a comment in JavaScript?",
      choices: [
        "'This is a comment'",
        "<!--This is a comment-->",
        "//This is a comment",
        "This is a comment"
      ],
      answer: "//This is a comment"
    },
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "Which operator is used to assign a value to a variable?",
      choices: [
        "=",
        "*",
        "-",
        "x"
      ],
      answer: "="
    },
    {
      title:
        "Which event occurs when the user clicks on an HTML element?",
      choices: [
        "onchange",
        "onmouseover",
        "onclick",
        "onmouseclick"
      ],
      answer: "onclick"
    },
    {
      title: "What is the data type of variables in JavaScript?",
      choices: [
        "Object data types",
        "Function data type",
        "None of the above",
        "All of the above"
      ],
      answer: "Object data types"
    },
    {
      title: "How does a FOR loop start?",
      choices: [
        "for (i = 0; i <= 5)  ",
        "for i = 1 to 5",
        "for (i <= 5; i++)",
        "for (i = 0; i <= 5; i++)  "
    ],
      answer: "for (i = 0; i <= 5; i++)  "
    },
    {
      title: "How does a WHILE loop start?",
      choices: [
        "while i = 1 to 10 ",
        "while (i <= 10; i++)",
        "while (i <= 10)"
      ],
      answer: "while (i <= 10)"
    },
    {
      title:"",
      choices: [
        "",
        "",
        "",
        ""
    ],
      answer: ""
    },
    {
      title:"",
      choices: [
        "",
        "", 
        "", 
        ""
    ],
      answer: ""
    },
    {
      title: "",
      choices: [
        "",
        "",
    ],
      answer: ""
    },
  ];
// quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 7;
var timerId;


function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // flash right/wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials == "") {
   
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

  
    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // move to highscores page
    window.location.href = "highscores.html";
  }
}

function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
  
    highscores.forEach(function(score) {
      // list each highscore and display it on the page
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      var olEl = document.getElementById("highscores");
      
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  // run function when page loads
  printHighscores();

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// save highscore button
submitBtn.onclick = saveHighscore;

// start quiz button
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;