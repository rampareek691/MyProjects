score = 0;
cross = true;

music = new Audio('music.mp3')
audiover = new Audio('over.wav')
setTimeout(() => {
    music.play();
}, 1000);

document.onkeydown = function(f){
    console.log("key code is: ",f.keyCode)
    if(f.keyCode==38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if(f.keyCode==39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if(f.keyCode==37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
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

    offsetX = Math.abs(dx-ox)
    offsetY = Math.abs(dy-oy)

    if(offsetX<70 && offsetY<50){
        gameOver.innerHTML = "Game Over - Reload to play again";
        obstacle.classList.remove('animateObs')
        audiover.play();
        setTimeout(() => {
            audiover.pause();
            music.pause();
        }, 1000);
    }
    else if(offsetX < 150 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout( () => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 700);
    }

}, 10);

function updateScore(score){
    scoreCont.innerHTML = "Your Score: " + score
}