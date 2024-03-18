function fillScoreForm() {
  let elapsedTimeElm = document.getElementById("timer").textContent;
  let scoreElm = document.getElementById("score").textContent;

  let elapsedTime = elapsedTimeElm.slice(7).replace(' ', '');
  let score = scoreElm.slice(7);

  document.getElementById("player-score").value = score;
  document.getElementById("time-elapsed").value = elapsedTime;

}

function recordScore() {
  let username = document.getElementById("username").value;
  
  console.log(username + " : " + score);
}
