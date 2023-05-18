function rectangularCollision({rectangle1, rectangle2}) {
    return ( 
        (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x) &&
        (rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width) &&
        (rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y) &&
        (rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
    )      
}

function determineWinner ({player, enemy, timerId}) {
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    let text = 'tie';
    console.log(player.health);
    console.log(enemy.health);
    if (player.health > enemy.health) {
        text = 'Player 1 Wins';
    }
    if (enemy.health > player.health) {
        text = 'Player 2 Wins';
    }
    document.querySelector('#displayText').innerText = text;
}

//Timer Implementation
let timer = 10;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerText = timer;
    }
    if (timer === 0) {
        determineWinner({player, enemy, timerId});
    }

}