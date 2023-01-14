let startDiv = document.getElementById('start-screen');
let startScreenDiv = document.getElementById('startScreen');
let endScreenDiv = document.getElementById('endScreen');
let questionsDiv = document.getElementById('questions');
let time = document.getElementById('time');
let timerCount = 10;


start.addEventListener('click', function(){
    console.log('click event');
    startQuiz();
});

let startQuiz = function(){
    console.log('start quiz');
    // hide startDiv
    startDiv.classList.add('hide');
    //show questionsDiv
    questionsDiv.classList.add('hide');

    //start timer
    startTimer();
};

let startTimer = function(){
    function countDown(){
        time.innerText = timerCount;
        timerCount--;
        if(timerCount < 0){
            clearInterval(interval)
            endGame();
        }
    }

    let interval = setInterval(countDown, 1000);

    //call it once first so there isn't a 1second delay to the countdown appearing
    countDown()
};

let renderQuestions = function(){
    console.log('render questions');
};

let endGame = function(){
    console.log('end game');
};