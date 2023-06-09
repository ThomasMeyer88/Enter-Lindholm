const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.7;

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height);

const background = new Sprite({
    position: {x: 0, y: 0},
    imageSrc: "./img/background.png"
});

const shop = new Sprite({
    position: {x: 615, y: 128},
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6
});

const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 10 },
    offset: {x: 150, y: 155},
    imageSrc: "./img/samuraiMack/idle.png",
    framesMax: 8,
    framesHold: 10,
    scale: 2.5,
});

const enemy = new Fighter({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
    offset: {x: -300, y: 155},
    imageSrc: "./img/samuraiMack/idle.png",
    framesMax: 8,
    framesHold: 10,
    scale: 2.5
});

player.draw();
enemy.draw();

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}



decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();

    player.update();

    enemy.update();
    
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5; 
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }

    //enemy movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5; 
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
    
    //detect for collision 
    if (rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }
    if (rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking) {
        window.addEventListener('keydown', event => {
            if (event.key === 'e') {
                player.invul = true;
            }
        });
        enemy.isAttacking = false;
        setTimeout(() => {
            if (!player.invul){
                player.health -= 20;
                document.querySelector('#playerHealth').style.width = player.health + '%';
                console.log(`Enemy Attacks`);
            } else {
                console.log(`parried`);
            }
        }, 250);
        player.invul = false;
    }

    //determine winner
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId});
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
        break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
        break;
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y -= 15;
            }
        break;
        case ' ':
            player.attack();
        break;
        //enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
        break;
        case 'ArrowUp':
            if (enemy.velocity.y === 0) {
                enemy.velocity.y -= 15;
            }
        break;
        case 'ArrowDown':
            enemy.attack();
            break;
}   
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
    }
});