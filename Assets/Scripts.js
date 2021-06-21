let questions = [];
let answers = [];
let currentScore = 0;
let initialTime = 120;
let hotStreak = 0;
let timeSpent = 10 ;
let highscoresArray = [];


if(localStorage.getItem('highscores')!==null) {

    highscoresArray = JSON.parse(localStorage.getItem('highscores'));
}

questionNumber = document.getElementById("questionNumber").textContent;
countdownTimer = document.getElementById("countdown");
runningTotal = document.getElementById("score");
answerPane = document.getElementById("clickEventQ");

const changeQuestion = document.getElementById("question");

const startButton = document.getElementById("start");
// Defining a function that takes the 'answers' array with 4 items in it, and shuffles them 
// so they are in a random order
shuffleAnswers = function() {
    answers = answers.sort(()=>Math.random()-0.5);
    console.log()
}

// I choose to use the fetch API, instead of creating my own questions which would, over time, lead to the
// the same questions all the time. 
// Using the API, i fetch the questions, return them in json format, and assign those questions into
// the array 'questions'. I then sort through the answers in those questions and push the answers into the
// answer array.

startQuiz = function() {
    currentNumber = parseInt(questionNumber);


    fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple").then(res => {   
        return res.json();

    })
        .then(loadedQuestions => {
            questions = loadedQuestions.results;
            console.log(questions);
            for(let i = 0;i<3;i++) {
                answers.push(questions[currentNumber-1].incorrect_answers[i])
            }
            answers.push(questions[currentNumber-1].correct_answer);
            shuffleAnswers();
            console.log(answers);
            changeQuestion.textContent = questions[currentNumber-1].question;
            while(changeQuestion.textContent.includes('&#039;')) {
                changeQuestion.textContent = changeQuestion.textContent.replace('&#039;',"'");
            }
            while(changeQuestion.textContent.includes('&quot;')) {
                changeQuestion.textContent = changeQuestion.textContent.replace('&quot;','"');
            }
            for(let i = 1;i<5;i++) {
                const a = document.getElementById("a"+i);
                a.textContent = answers[i-1];
            }

            
        })
}
window.onload = startQuiz;

nextQuestion = function() {
    if(currentNumber >10) {
        highscoresArray.push(currentScore);
        localStorage.setItem('highscores',JSON.stringify(highscoresArray));
        window.location.href = "highscores.html";
        console.log(localStorage.getItem('highscores'));
    }
    else {
        for(let i = 0;i<3;i++) {
            answers.push(questions[currentNumber-1].incorrect_answers[i])
        }
        answers.push(questions[currentNumber-1].correct_answer);
        shuffleAnswers();
        console.log(answers);
        changeQuestion.textContent = questions[currentNumber-1].question;
        while(changeQuestion.textContent.includes('&#039;')) {
            changeQuestion.textContent = changeQuestion.textContent.replace('&#039;',"'");
        }
        while(changeQuestion.textContent.includes('&quot;')) {
            changeQuestion.textContent = changeQuestion.textContent.replace('&quot;','"');
        }
        for(let i = 1;i<5;i++) {
            const a = document.getElementById("a"+i);
            a.textContent = answers[i-1];
        }
    }
}

var $clickE = $('#clickEventQ');
function answerCheck(event) {
    if (answerPane.classList[0] === 'wrong'){
        answerPane.classList.remove('wrong'); 
        console.log('hello');
    }
    var btnClicked = $(event.target); 
    if(btnClicked.text() == questions[currentNumber-1].correct_answer) {
        hotStreak += 1;
        score();
    }
    else {
        hotStreak = 0;
        initialTime -= 20;
    }
    currentNumber ++;
    answers.length = 0;
    timeSpent = 10;
    document.getElementById("questionNumber").textContent = currentNumber;
    nextQuestion();
}
$clickE.on('click','.qButtons',answerCheck);

setInterval(countdown,1000);

function countdown() {
    if (initialTime >0) {
        initialTime = initialTime-1;
        timeSpent = timeSpent -1;
        countdownTimer.textContent = initialTime;   
    }
    else {
        initialTime = 0;
        countdownTimer.textContent = initialTime;
        highscoresArray.push(currentScore);
        localStorage.setItem('highscores',JSON.stringify(highscoresArray));
        clearInterval(countdown);
        window.location.href = "highscores.html";
        console.log(localStorage.getItem('highscores'));
    }

}
var count = 0;
function score() {
    if(timeSpent >0) {
        currentScore += timeSpent*100*hotStreak;
        counting();
    }
    else {
        currentScore += 100;
        counting();

    }
    function counting() {
        var id = setInterval(countingUp,10);
        function countingUp() {
            if (count ==currentScore) {
                clearInterval(id);
            }
            else {
                count +=10;
                runningTotal.textContent=count;
            }
        }
    }

}
