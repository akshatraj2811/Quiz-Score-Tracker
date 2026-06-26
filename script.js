var questions = [
    { q: "Which planet is known as the Red Planet?", op1: "Earth", op2: "Mars", op3: "Jupiter", op4: "Saturn", correct: 2 },
    { q: "What is the hardest natural substance on Earth?", op1: "Gold", op2: "Iron", op3: "Diamond", op4: "Platina", correct: 3 },
    { q: "Which is the largest ocean on our planet?", op1: "Pacific Ocean", op2: "Atlantic Ocean", op3: "Indian Ocean", op4: "Arctic Ocean", correct: 1 },
    { q: "How many bones do human adults normally have?", op1: "106", op2: "206", op3: "306", op4: "406", correct: 2 },
    { q: "Which gas do plants absorb from the atmosphere?", op1: "Oxygen", op2: "Nitrogen", op3: "Hydrogen", op4: "Carbon Dioxide", correct: 4 },
    { q: "What is the capital city of Japan?", op1: "Beijing", op2: "Seoul", op3: "Tokyo", op4: "Bangkok", correct: 3 },
    { q: "Which animal is known as the 'Ship of the Desert'?", op1: "Camel", op2: "Horse", op3: "Elephant", op4: "Lion", correct: 1 },
    { q: "What is the boiling point of water?", op1: "50°C", op2: "100°C", op3: "150°C", op4: "200°C", correct: 2 },
    { q: "Which country invented the Olympic Games?", op1: "Rome", op2: "Egypt", op3: "China", op4: "Greece", correct: 4 },
    { q: "How many days are in a regular year?", op1: "365", op2: "366", op3: "350", op4: "360", correct: 1 }
];

var currentIndex = 0;

var userAnswers = [null, null, null, null, null, null, null, null, null, null];

function loadQuestion() {
    console.log("--- Loading Question Index: " + currentIndex + " ---");

    var displayNum = currentIndex + 1;
    document.getElementById("progressText").innerHTML = "Question " + displayNum + " of " + questions.length;

    var currentQ = questions[currentIndex];

    document.getElementById("questionText").innerHTML = currentQ.q;
    document.getElementById("btn1").innerHTML = currentQ.op1;
    document.getElementById("btn2").innerHTML = currentQ.op2;
    document.getElementById("btn3").innerHTML = currentQ.op3;
    document.getElementById("btn4").innerHTML = currentQ.op4;

    document.getElementById("btn1").className = "option-btn";
    document.getElementById("btn2").className = "option-btn";
    document.getElementById("btn3").className = "option-btn";
    document.getElementById("btn4").className = "option-btn";

    var savedAnswer = userAnswers[currentIndex];
    console.log("Saved answer for this question slot: " + savedAnswer);

    if (savedAnswer != null) {
        document.getElementById("btn" + savedAnswer).className = "option-btn active";
    }

    if (currentIndex == 0) {
        document.getElementById("prevBtn").style.visibility = "hidden";
    } else {
        document.getElementById("prevBtn").style.visibility = "visible";
    }

    if (currentIndex == questions.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next ▶";
    }
}

function selectOption(optionNum) {
    userAnswers[currentIndex] = optionNum;

    console.log("User clicked option number: " + optionNum);
    console.log("Updated answers list history tracking array: ", userAnswers);

    loadQuestion();
}

function goForward() {
    if (userAnswers[currentIndex] == null) {
        alert("Please select an option before moving forward!");
        return;
    }

    if (currentIndex == questions.length - 1) {
        console.log("Final question reached. Moving to evaluation...");
        calculateFinalScore();
        return;
    }

    currentIndex = currentIndex + 1;
    loadQuestion();
}

function goBackward() {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
        console.log("Moving back. Current active index changed to: " + currentIndex);
        loadQuestion();
    }
}

function calculateFinalScore() {
    console.log("Evaluating answers key...");
    var finalScore = 0;

    for (var i = 0; i < questions.length; i++) {
        console.log("Question " + (i + 1) + " -> User chose: " + userAnswers[i] + " | Correct answer is: " + questions[i].correct);

        if (userAnswers[i] == questions[i].correct) {
            finalScore = finalScore + 1;
        }
    }

    console.log("Calculated total core total: " + finalScore + "/" + questions.length);

    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("result-box").style.display = "block";
    document.getElementById("progressText").innerHTML = "Finished!";
    document.getElementById("scoreText").innerHTML = "You scored " + finalScore + " out of " + questions.length;
}

function restartQuiz() {
    console.log("Quiz resetting... clearing state.");
    currentIndex = 0;
    userAnswers = [null, null, null, null, null, null, null, null, null, null];

    document.getElementById("quiz-box").style.display = "block";
    document.getElementById("result-box").style.display = "none";
    loadQuestion();
}

loadQuestion();