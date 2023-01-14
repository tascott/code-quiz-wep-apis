let startDiv = document.getElementById('start-screen');
let startScreenDiv = document.getElementById('startScreen');
let endScreenDiv = document.getElementById('endScreen');
let questionsDiv = document.getElementById('questions');
let time = document.getElementById('time');
let timerCount = 10;
let questionTitle = document.getElementById('question-title');
let choices = document.getElementById('choices')
//shuffle the questions in to a new array
let shuffledQuestions = questions.sort(() => Math.random() - 0.5);


start.addEventListener('click', function(){
    console.log('click event');
    startQuiz();
});

let startQuiz = function(){
    console.log('start quiz');
    // hide startDiv
    startDiv.classList.add('hide');
    //show questionsDiv
    questionsDiv.classList.remove('hide');
    renderQuestions();

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

    //call it once first so there isn't a 1s delay to the countdown appearing
    countDown()
};

let renderQuestions = function(){
    // show questions div
    questionsDiv.classList.remove('hide');

    //Get the first question
    questionTitle.innerText = shuffledQuestions[0].question;

    //loop through answers options and add them to the dom
    for(let i = 0; i < shuffledQuestions[0].options.length; i++){
        let choice = document.createElement('button');
        //append to questions div
        choices.appendChild(choice);
        choice.innerText = shuffledQuestions[0].options[i];

        //add event listener to each choice
        choice.addEventListener('click', function(){
            console.log('clickkkkkk', this.innerText)
            if(this.innerText === shuffledQuestions[0].answer){
                //correct answer
                console.log('correct!')
            } else {
                //incorrect answer
                console.log('incorrect!')
            }
        });
    }
};

let endGame = function(){
    console.log('end game');
};