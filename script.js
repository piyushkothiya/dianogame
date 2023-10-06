score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 100);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        // Up Arrow Key press
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 40) {
        // Down Arrow Key
        dino = document.querySelector('.dino');
        dino.classList.add('animateDinodown');
        setTimeout(() => {
            dino.classList.remove('animateDinodown')
        }, 700);
    }
    if (e.keyCode == 39) {
        // Right Arrow Key
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        console.log('Right arrow of dino:' , dinoX);
        if (dinoX < 1490){

            dino.style.left = dinoX + 112 + "px";
            console.log('Right arrow of dino:' , dino.style.left);
        }
    }
    if (e.keyCode == 37) {
        // Left Arrow Key
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        console.log('left Arrow of dino:' , dinoX);
        
        if (dinoX > 0){

            dino.style.left = dinoX - 112 + "px";
            console.log('Left arrow of dinoX:' , dino.style.left);
        }
        
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        dino.classList.add('whenDie');
        setTimeout(() => {
            audiogo.pause(); 
            
           }, 1000);
        
        //clearInterval(gameSound);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            //console.log('Old animiation duration :' , aniDur);
            newDur = (aniDur - 0.1);
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}