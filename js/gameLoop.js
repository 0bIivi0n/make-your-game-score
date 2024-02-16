var NBanimation = 0, nbFPS = 10;

function animate() {

    var enemies = document.querySelectorAll(".enemy");
    var invaded = false;
    var enemyContainer = document.getElementById("enemy-container");

    NBanimation++;

    if(isPaused === false) {
        moveEnemy();
        movePlayer();

        if (playerMissileFired) {
            movePlayerMissile();
        }
    
        if (enemyMissileFired) {
            moveEnemyMissile();
        }
    }
    
     
    // Toutes les nbFPS animations, maj du contenu div#fps
    if (NBanimation % nbFPS == 0) {
        var microtime2=window.performance.now();
        // Temps écoulé depuis le dernier appel
        var delai=microtime2-microtime1;
        // Conversion en FPS (frame par seconde)
        var fps = Math.round(1/delai*1000*nbFPS);
        document.getElementById("fps").innerHTML= "<strong>" + fps + " FPS </strong>" ;
        microtime1=microtime2;
    }

    enemies.forEach(enemy => {
        
        if(checkCollision(enemy, bottomBorder)) {
            invaded = true;
            enemy.remove();
        }

        if(checkCollision(enemy, player)) {
            player.health--;
            enemy.remove();
            printHealth();
        }

    });

    if(enemies.length === 0) {
        congratulations();
        cancelAnimationFrame(IDanimation);
        clearInterval(timer);
        clearInterval(enemyAttackID);
        enemyContainer.remove();
        marginLeft = 0;
        marginTop = 0;
        return;
    }

    if(invaded || player.health <= 0) {
        gameOver();
        cancelAnimationFrame(IDanimation);
        clearInterval(timer);
        clearInterval(enemyAttackID);
        player.remove();
        return
    }


    IDanimation = requestAnimationFrame(animate);
    
}

var microtime1 = window.performance.now();
