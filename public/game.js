
import InputHandler from "./Input.js";
import CollectableManager from "./CollectableManager.js";
import EnemySpawner from "./EnemySpawner.js";
import Player from "./Player.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// ---------------VARIABLES---------------------
const game = new Phaser.Game(config);
let inputHandler, collectableManager;
/**
 * @type {Phaser.Physics.Arcade.StaticGroup}
 */
let platforms
/**
 * @type {Phaser.Physics.Arcade.Sprite}
 */
let player, bombs, enemies, stars;
let enemySpawner;

function preload() {
    this.load.image('sky', './Resources/Sprites/sky.png');
    this.load.image('ground', './Resources/Sprites/platform.png');
    this.load.image('star', './Resources/Sprites/star.png');
    this.load.image('bomb', './Resources/Sprites/bomb.png');
    this.load.image('gem', './Resources/Sprites/bomb.png');
    this.load.image('coin', './Resources/Sprites/bomb.png');

    this.load.spritesheet('dude',
        './Resources/Sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.json('collectables', './Resources/Data/collectables.json');
}

function create() {
    this.add.image(400, 300, 'sky');
    const particles = this.add.particles(0, 0, 'star', {
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 558, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = new Player(this, 300,200, "dude")    
 
    const logo = this.physics.add.sprite(400, 100, 'bomb');
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    this.physics.add.collider(logo, platforms);

    particles.startFollow(logo);
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    collectableManager = new CollectableManager(this, player, platforms);
    let collectableJson = collectableManager.collectablesJson;
    collectableManager.createCollectable(300,300, collectableJson.star.type, collectableJson.star.value);
    collectableManager.createCollectable(400,400, collectableJson.star.type, collectableJson.star.value);

    inputHandler = new InputHandler(this, player);
    enemySpawner = new EnemySpawner(this);
        // enemies.setTint(0xff0000);
}

function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    //gameOver = true;
}

function collectStar(player, star) {
    star.disableBody(true, true);

    player.inventory.addItem("star", 10);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
            return true;
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

function update(time, delta) {
    inputHandler.update();
    enemySpawner.update(delta);
}


