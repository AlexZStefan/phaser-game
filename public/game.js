import Player from "./Player.js";
import InputHandler from "./Input.js";
import CollectableManager from "./CollectableManager.js";
import EnemySpawner from "./EnemySpawner.js";
import PauseMenu from "./UI/PauseScene.js";
import Collectables from "./Collectables.js";
import GameOver from "./UI/GameOverScene.js";
import MaineMenu from "./UI/MaineMenuScene.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        /**
        * @type {Player}
        */
        this.player = null;
        /**
        * @type {Phaser.Physics.Arcade.StaticGroup}
        */
        this.staticObjects = null;
         /**
        * @type {Collectables}
        */
        this.collectables = null;
         /**
        * @type {Phaser.Physics.Arcade.Sprite}
        */
        this.traps = null;
         /**
        * @type {CollectableManager}
        */
        this.collectableManager = null;
         /**
        * @type {EnemySpawner}
        */
        this.enemySpawner = null;
         /**
        * @type {InputHandler}
        */
        this.inputHandler = null;
    }
    
    preload() {
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

    create() {
        this.events.on('shutdown', this.cleanup, this); // 🔥 Register cleanup function
        this.events.on('destroy', this.cleanup, this);  // 🔥 If the scene gets destroyed

        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'star', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 558, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player(this, 300, 200, "dude")

        const logo = this.physics.add.sprite(400, 100, 'bomb');
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        this.physics.add.collider(logo,  this.platforms);

        particles.startFollow(logo);
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.physics.add.collider( this.stars,  this.platforms);
        this.physics.add.overlap(this.player,  this.stars, collectStar, null, this);

        this.bombs = this.physics.add.group();
        this.physics.add.collider( this.bombs,  this.platforms);
        this.physics.add.collider(this.player,  this.bombs, hitBomb, null, this);

        this.collectableManager = new CollectableManager(this, this.player,  this.platforms);
        let collectableJson =  this.collectableManager.collectablesJson;
         this.collectableManager.createCollectable(300, 300, collectableJson.star.type, collectableJson.star.value);
         this.collectableManager.createCollectable(400, 400, collectableJson.star.type, collectableJson.star.value);

         this.inputHandler = new InputHandler(this, this.player);
         this.enemySpawner = new EnemySpawner(this);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch("PauseMenu"); // Open pause menu
            this.scene.pause(); // Pause the game
        });
    }

    cleanup() {
        if (this.player) this.player.destroy();

    }

    update(time, delta) {
        this.inputHandler.update();
        this.enemySpawner.update(delta);
    }
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

    if ( this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
            return true;
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb =  this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

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
    scene: [ MaineMenu, GameScene, PauseMenu, GameOver]
};

const game = new Phaser.Game(config);