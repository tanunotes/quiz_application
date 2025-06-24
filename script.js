const questions = [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Transfer Markup Logic"],
        answer: 1
      },
      {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
      },
      {
        question: "Which is not a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Cassandra"],
        answer: 3
      },
      {
        question: "Which is used for backend development?",
        options: ["PHP", "React", "CSS", "HTML"],
        answer: 0
      },
      {
        question: "What does CSS stand for?",
        options: ["Cascading Style Script","Cascading Style Sheet","Colorful Style Sheet","Computer Style Sheet"],
        answer: 1
      },
      {
        question: "Which tag is used to link JavaScript to HTML?",
        options: ["<script>","<js>", "<javascript>","<link>"],
        answer: 0
      },
      {
        question: "Which protocol is used to load web pages?",
        options: ["FTP","HTTP","SMTP",  "TCP"],
        answer: 1
      }
];

    let currentIndex = -1;
    let score = 0;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const feedbackEl = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");
    const resultEl = document.getElementById("result");
    const scoreEl = document.getElementById("score");

    function loadQuestion() {
      feedbackEl.textContent = "";
      const current = questions[currentIndex];
      questionEl.textContent = current.question;
      optionsEl.innerHTML = "";

      current.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
      });
    }

    function checkAnswer(selected) {
      const correct = questions[currentIndex].answer;
      if (selected === correct) {
        feedbackEl.textContent = "✅ Correct!";
        feedbackEl.style.color = "green";
        score++;
      } else {
        feedbackEl.textContent = "❌ Wrong!";
        feedbackEl.style.color = "red";
      }
      Array.from(optionsEl.children).forEach(btn => (btn.disabled = true));
    }

    let timer;
    let timeLeft = 60;
    const timerDisplay = document.getElementById("overall-timer");
    let timerStarted = false;
    
    nextBtn.onclick = () => {
    if (!timerStarted) {
      timerStarted = true;
      timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Total Time Left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("question-container").classList.add("hidden");
        nextBtn.classList.add("hidden");
        resultEl.classList.remove("hidden");
        scoreEl.textContent = `Time's up! Your Score: ${score}/${questions.length}`;
      }
    }, 1000);
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};


    function showResult() {
      document.getElementById("question-container").classList.add("hidden");
      nextBtn.classList.add("hidden");
      resultEl.classList.remove("hidden");
      scoreEl.textContent = `Your Score: ${score}/${questions.length}`;
      clearInterval(timer);
    }