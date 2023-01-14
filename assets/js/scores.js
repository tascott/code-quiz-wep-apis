let clear = document.getElementById('clear');
let highScores = document.getElementById('highscores');
let scoresFromStorage = JSON.parse(localStorage.getItem('highScores'));
let scoresToShow;

// Display scores
let displayScores = function(){
    // Clear our html
    highScores.innerHTML = '';

    if (scoresFromStorage && scoresFromStorage.length > 0){
        // We want to show maximum 5 top scores
        scoresToShow =  Math.min(5, scoresFromStorage.length);
        for (let i = 0; i < scoresToShow; i++) {
            // Update dom with scores
            let li = document.createElement('li');
            li.textContent = `${scoresFromStorage[i].initials.toUpperCase()}: ${scoresFromStorage[i].score}`;
            highScores.appendChild(li);
        }
    }
}

// Get scores from storage, sort them by score from highest to lowest
if (scoresFromStorage && scoresFromStorage.length > 0) {
    scoresFromStorage = JSON.parse(localStorage.getItem('highScores')).sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    displayScores();
}

clear.addEventListener('click', function(){
    // Clear local storage
    localStorage.removeItem("highScores");
    // Clear our local variables
    scoresFromStorage = [];
    displayScores();
})