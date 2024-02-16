var player = document.getElementById("player");
var playerMissileFired = false;
const speed = 7;
var score = 0;
player.health = 3;
var rightKeyDown = false;
var leftKeyDown = false;

// const maxX = (canvas.offsetWidth - player.offsetWidth) - 25;
// const maxY = (canvas.offsetHeight - player.offsetHeight)- 10;

// player position
//var playerX = maxX / 2;
var playerX = 0;

// Listener for key press
document.addEventListener("keydown", (e) => {
    if (IDanimation != 0) {

        // keys pressed
        switch (e.key) {
            case "ArrowLeft":
                leftKeyDown = true;
                break;
            case "ArrowRight":
                rightKeyDown = true;
                break;
            case " ":
                if (!playerMissileFired) {
                    makePlayerShoot();
                }
                break;
            case "p":
                toggleAnimation();
                printPauseMenu();
                break;
            case "r":
                if (isPaused) {
                    location.reload();
                }
                break;
        }
    }

});

document.addEventListener("keyup", (e) => {
    if (IDanimation != 0) {

        // keys pressed
        switch (e.key) {
            case "ArrowLeft":
                leftKeyDown = false;
                break;
            case "ArrowRight":
                rightKeyDown = false;
                break;
        }
    }

});



function movePlayer() {

    var playerlimits = player.getBoundingClientRect(player);

    if (rightKeyDown && playerlimits.right < rightBorderLimits.left) {
        playerX += speed;
    }

    if (leftKeyDown && playerlimits.left > leftBorderLimits.right) {
        playerX -= speed;
    }

    player.style.transform = "translateX(" + playerX + "px)";
}


function makePlayerShoot() {
    var playerXPos = Number((getComputedStyle(player).left).split('px')[0]);

    var playerMissile = document.createElement("div");
    playerMissile.id = "player-missile";

    playerXPos += 25;
    missilePos = playerXPos;
    playerMissile.style.left = missilePos + "px";
    playerMissile.style.transform = player.style.transform;

    playerZone.appendChild(playerMissile);
    playerMissileFired = true;
}

function movePlayerMissile() {
    let speed = 10;
    var playerMissile = document.getElementById("player-missile");
    var enemies = document.querySelectorAll(".enemy");
    var missilePos = Number((getComputedStyle(playerMissile).top).split("px")[0]);
    missilePos -= speed;

    playerMissile.style.top = missilePos + "px";

    enemies.forEach(enemy => {

        if (checkCollision(playerMissile, enemy)) {
            enemy.remove();
            playerMissile.remove();
            playerMissileFired = false;
            score += 20;
            document.getElementById("score").innerHTML = "<strong>Score: " + score + " </strong>";
        }
    });

    if (missilePos <= 0) {
        playerMissile.remove();
        playerMissileFired = false;
    }
}

function printHealth() {

    var livesElm = document.getElementById("health");
    livesElm.innerHTML = "<strong>Lives: </strong>";

    for (let i = 0; i < player.health; i++) {
        var life = document.createElement("img");
        life.classList.add("life");
        life.src = "assets/img/player.svg";
        livesElm.appendChild(life);
    }
}



