let startDiv = document.getElementById('start-screen');
let startScreenDiv = document.getElementById('startScreen');
let endScreenDiv = document.getElementById('end-screen');
let questionsDiv = document.getElementById('questions');
let timer = document.getElementsByClassName('timer')[0];
let time = document.getElementById('time');
let questionTitle = document.getElementById('question-title');
let choices = document.getElementById('choices')
let feedback = document.getElementById('feedback');
let initials = document.getElementById('initials');
let initialsSubmit = document.getElementById('submit');
let refresh = document.getElementById('refresh');
//shuffle the questions in to a new array
let shuffledQuestions = questions.sort(() => Math.random() - 0.5);
let timerCount = 60;
let interval;
let finalScore;

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
         // Stop timer going below 0
        if(timerCount < 10) {
            timer.classList.add('time-out')
        }
        if(timerCount < 0){
            clearInterval(interval);
            timer.innerHTML = "Times Up!"
            endGame();
        }
    }

    interval = setInterval(countDown, 1000);
};

let renderQuestion = function(){
    // show questions div
    questionsDiv.classList.remove('hide');
    feedback.classList.remove('hide');

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
                feedback.innerText = "Correct!"
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
                feedback.innerText = "Wrong :("
                flashTime();
                timerCount = timerCount - 10;
            }
        });
    }
};

// This is a silly animation to make it more obvious the time has decreased by 10seconds
let flashTime = function(){
    let length = 200

    timer.style.animation = `timeAnimation ${length}ms linear`;
    setTimeout(function() {
        timer.style.animation = '';
    }, length);
}

let endGame = function(){
    questionTitle.innerText = '';
    choices.innerHTML = "";
    clearInterval(interval);
    finalScore = time.innerText;

    if (Number(finalScore) > 0 ){
        // User won, proceed to initials + table
        document.getElementById('final-score').innerText = finalScore;
        feedback.innerText = `You win! Your Score is ${finalScore}`;
        endScreenDiv.classList.remove('hide');
    } else {
        // User lost, play again
        feedback.innerText = "You Lose :(";
        refresh.classList.remove('hide')
    }

    collectScores();
};

let collectScores = function(){
    initialsSubmit.addEventListener('click', function(){
        if(initials.value.length > 2) {
            initialsSubmit.setAttribute('disabled', false)
            let scores = [{initials: initials.value, score: finalScore}];

            //if we already have some scores in localstorage, grab them and add to it
            if (localStorage.getItem('highScores')) {
                let scoresFromStorage = JSON.parse(localStorage.getItem('highScores'));
                scores = scores.concat(scoresFromStorage);
                localStorage.setItem("highScores", JSON.stringify(scores));
            //Otherwise make a new localstorage item
            } else {
                localStorage.setItem("highScores", JSON.stringify(scores));
            }

            window.location.href = '../highscores.html';
        }
    });

}