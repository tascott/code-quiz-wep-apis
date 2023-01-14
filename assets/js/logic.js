let startDiv = document.getElementById('start-screen');
let startScreenDiv = document.getElementById('startScreen');
let endScreenDiv = document.getElementById('endScreen');
let questionsDiv = document.getElementById('questions');
let time = document.getElementById('time');
let questionTitle = document.getElementById('question-title');
let choices = document.getElementById('choices')
let feedback = document.getElementById('feedback');
//shuffle the questions in to a new array
let shuffledQuestions = questions.sort(() => Math.random() - 0.5);
let timerCount = 60;
let interval;

start.addEventListener('click', function(){
    startQuiz();
});

let startQuiz = function(){
    // hide startDiv
    startDiv.classList.add('hide');
    //show questionsDiv
    questionsDiv.classList.remove('hide');
    renderQuestion();
    startTimer();
};

let startTimer = function(){
    //call it once so there isn't a 1s delay to the countdown
    countDown();

    function countDown(){
        time.innerText = timerCount;
        timerCount--;
        if(timerCount < 0){
            clearInterval(interval);
            endGame();
        }
    }

    interval = setInterval(countDown, 1000);
};

let renderQuestion = function(){
    // show questions div
    questionsDiv.classList.remove('hide');

    //loop through answers for the question and add them to the dom
    for(let i = 0; i < shuffledQuestions[0].options.length; i++){
         //Get the first question title
        questionTitle.innerText = shuffledQuestions[0].question;
        let choice = document.createElement('button');
        //append to questions div
        choices.appendChild(choice);
        choice.innerText = shuffledQuestions[0].options[i];

        //add event listener to each choice
        choice.addEventListener('click', function(){
            if(this.innerText === shuffledQuestions[0].answer){
                //correct answer
                shuffledQuestions.shift();
                //clear the div with choices in
                choices.innerHTML = ""
                if(shuffledQuestions.length > 0) {
                    renderQuestion();
                } else {
                    endGame();
                }
            } else {
                //incorrect answer
                flashTime();
                timerCount = timerCount - 10;
            }
        });
    }
};

// This is a silly animation to make it more obvious the time has decreased by 10seconds
let flashTime = function(){
    let timer = document.getElementsByClassName('timer')[0];
    let length = 200

    timer.style.animation = `timeAnimation ${length}ms linear`;
    setTimeout(function() {
        timer.style.animation = '';
    }, length);
}

let endGame = function(){
    questionTitle.innerText = 'Game Over';
    choices.innerHTML="";
    clearInterval(interval);
    feedback.classList.remove('hide')
    feedback.innerText = `You win! ${time.innerText} left`;
};