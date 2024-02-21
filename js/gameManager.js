var timer;
var enemyAttackID;
var enemyAttackInterval = 5000;
var isPaused = false;

var minutes = 0;
var seconds = 0;

document.getElementById("next-level-button").disabled = true;
document.getElementById("try-again-button").disabled = true;

createEnemyContainer();
spawnEnemies(40);

function startGame() {

    if (playerMissileFired) {
        let playerMissile = document.getElementById("player-missile");
        playerMissileFired = false;
        playerMissile.remove();
    }

    if (enemyMissileFired) {
        let enemyMissile = document.getElementById("enemy-missile");
        enemyMissileFired = false;
        enemyMissile.remove();
    }

    startTimer();
    enemyAttackID = setInterval(makeEnemyShoot, enemyAttackInterval);
    printHealth();
    animate();
    startMenu.style.opacity = "0";
    pauseButton.style.display = "block";
    player.style.opacity = "1";
    restartButton.style.display = "block";
    startButton.disabled = true;
    startButton.style.opacity = "0";
    nextLevelButton.disabled = true;

    console.log("Enemy speed: " + enemySpeed + ", Enemy attack Interval: " + enemyAttackInterval);
    document.getElementById("username").value = "";
}

function printStartPage() {

    startPage.style.opacity = "1";
    startButton.disabled = false;
    startButton.style.opacity = "1";
    tryAgainButton.disabled = true;
    nextLevelButton.disabled = true;
    pauseMenu.style.opacity = "0";

}

function printPauseMenu() {
    pauseMenu.style.opacity = "1";
}

function gameOver() {

    fillScoreForm();
    gameOverPage.style.display = "block";
    tryAgainButton.disabled = false;
    
}

function congratulations() {
    
    gratsPage.style.opacity = "1";
    nextLevelButton.disabled = false;
}



function toggleAnimation() {
    
    startMenu.style.opacity = "1";
    if (isPaused === true) { // Animation stoppée : on la relance
        isPaused = false;
        startMenu.style.opacity = "0";
        pauseMenu.style.opacity = "0";
        document.getElementById("toggle").innerHTML="Pause";
        startTimer();
    } else {  // Arrêt de l'animation
        isPaused = true;
        document.getElementById("toggle").innerHTML="Resume";
        clearInterval(timer);
        clearInterval(enemyAttackInterval);
    }
}

function closeGratsPage() {
    gratsPage.style.opacity = "0";
}

function createEnemyContainer() {
    var container = document.createElement("div");
    container.id = "enemy-container";
    document.getElementById("enemy-wrapper").appendChild(container);
}

function startTimer() {
    
    timer = setInterval(() => {
        seconds++;
        if(seconds > 59) {
            minutes++;
            seconds = 0;
        }
        document.getElementById("timer").innerHTML="<strong>Timer: " + minutes +"m, " + seconds + "s </strong>";
    }, 1000)
}

function getRandomInt(min, max) {
    var minCeiled = Math.ceil(min);
    var maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function setNextLevel() {

    console.log("setNextLevel entered");

    createEnemyContainer(); 
    spawnEnemies(10);
    enemyAttackInterval -= 500;
    enemySpeed += 0.1;
    closeGratsPage(); 
    printStartPage();
}

function PauseGame() {
    isPaused = true;
}




