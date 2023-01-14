let clear = document.getElementById('clear');
let highScores = document.getElementById('highscores');



clear.addEventListener('click', function(){
    localStorage.setItem("highScores", []);
})