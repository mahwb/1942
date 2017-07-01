var score = 0;

var hero = {
    x: 500,
    y: 500
}

var enemies = [{ x: 50, y: 50, type: 1 }, { x: 250, y: 50, type: 1 }, { x: 450, y: 50, type: 1 }, { x: 550, y: 50, type: 1 }, { x: 750, y: 50, type: 1 }, { x: 850, y: 50, type: 1 }, { x: 950, y: 50, type: 1 }];
var bullets = [];
var explosions = [];
var explosionTimeout = null;

function displayHero() {
    document.getElementById("hero").style["top"] = hero.y + "px";
    document.getElementById("hero").style["left"] = hero.x + "px";
}

function displayScore() {
    document.getElementById("score").innerHTML = score;
}

function displayEnemies() {
    var output = "";
    for (i = 0; i < enemies.length; i++) {
        output += "<div class='enemy" + enemies[i].type + "' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
    }
    document.getElementById("enemies").innerHTML = output;
}

function displayBullets() {
    var output = "";
    for (i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
    }
    document.getElementById("bullets").innerHTML = output;
}

function displayExplosions() {
    var output = "";
    for (i = 0; i < explosions.length; i++) {
        output += "<div class='explosion' style='top:" + explosions[i].y + "px; left:" + explosions[i].x + "px;'></div>";
    }
    document.getElementById("explosions").innerHTML = output;
}

function moveEnemies() {
    for (i = 0; i < enemies.length; i++) {
        enemies[i].y += 5;
        if (enemies[i].y > 530) {
            newEmemy(i);
        }
    }
}
function moveBullets() {
    for (i = 0; i < bullets.length; i++) {
        bullets[i].y -= 10;
        if (bullets[i].y < 0) {
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
        }
    }
}

function detectHeroCollision() {
    for (i < 0; i < enemies.length; i++) {
        if (Math.abs(hero.x - enemies[i].x) < 20 && Math.abs(hero.y - enemies[i].y) < 20) {
            explosions.push({ x: enemies[i].x, y: enemies[i].y })
            explosionTimeout = setTimeout(function () {
                removeExplosion();
            }, 1000);
            newEmemy(i);
            beep();
            score -= 500;
            console.log("Hero collided with Enemy", i);
        }
    }
}

function detectBulletCollision() {
    for (i = 0; i < bullets.length; i++) {
        for (j = 0; j < enemies.length; j++) {
            if (Math.abs(bullets[i].x - enemies[j].x) < 20 && Math.abs(bullets[i].y - enemies[j].y) < 20) {
                explosions.push({ x: enemies[j].x, y: enemies[j].y })
                explosionTimeout = setTimeout(function () {
                    removeExplosion();
                }, 1000);
                beep();
                newEmemy(j);
                bullets[i] = bullets[bullets.length - 1];
                bullets.pop();
                if (enemies[j].type == 1) {
                    score += 10;
                }
                else if (enemies[j].type == 2) {
                    score += 20;
                }
                console.log("Bullet hit Enemy", j)
            }
        }
    }
}

function newEmemy(enemy) {
    enemies[enemy].y = 50;
    enemies[enemy].x = Math.random() * 970;
    enemies[enemy].type = Math.trunc(Math.random() * 2 + 1);
}

function removeExplosion() {
    explosions[0] = explosions[explosions.length - 1];
    explosions.pop();
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function gameLoop() {
    displayHero();
    displayEnemies();
    moveEnemies();
    displayBullets();
    moveBullets();
    displayScore();
    displayExplosions()
    detectBulletCollision();
    detectHeroCollision();
}

setInterval(gameLoop, 80);

document.onkeydown = function (e) {
    //left
    if (e.keyCode == 37) {
        hero.x -= 15;
        if (hero.x < 0) {
            hero.x = 0;
        }
    }
    //right
    else if (e.keyCode == 39) {
        hero.x += 15;
        if (hero.x > 975) {
            hero.x = 975;
        }
    }
    //down
    else if (e.keyCode == 40) {
        hero.y += 15;
        if (hero.y > 525) {
            hero.y = 525;
        }
    }
    //up
    else if (e.keyCode == 38) {
        hero.y -= 15;
        if (hero.y < 0) {
            hero.y = 0;
        }
    }
    else if (e.keyCode == 32) {
        bullets.push({ x: hero.x + 6, y: hero.y - 15 })
        displayBullets();
    }
}

gameLoop();