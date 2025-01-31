var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 }, debug: false }
    },
    scene: { preload: preload, create: create, update: update }
};

var game = new Phaser.Game(config);
var egg, score = 0, scoreText, eggTimer;

function preload() {
    this.load.image('egg', 'https://i.imgur.com/OcskZQZ.png');
}

function create() {
    egg = this.physics.add.sprite(400, 200, 'egg').setInteractive();
    egg.setScale(0.2);
    egg.on('pointerdown', collectEgg, this);
    
    scoreText = this.add.text(16, 16, 'Eggs: 0', { fontSize: '24px', fill: '#000' });

    eggTimer = this.time.addEvent({
        delay: 5000, // 5 sec per egg
        callback: addEgg,
        callbackScope: this,
        loop: true
    });

    document.getElementById("withdraw-btn").addEventListener("click", withdraw);
    document.getElementById("invite-btn").addEventListener("click", inviteFriends);
}

function update() {}

function collectEgg() {
    score++;
    scoreText.setText('Eggs: ' + score);
    saveScore(Telegram.WebApp.initDataUnsafe.user.id, score);
}

function addEgg() {
    egg.setVisible(true);
}

function withdraw() {
    alert("Withdraw Feature Coming Soon!");
}

function inviteFriends() {
    Telegram.WebApp.openTelegramLink("https://t.me/share/url?url=Join+Egg+Tycoon!");
}
