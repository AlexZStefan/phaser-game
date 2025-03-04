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
        this.timer = 0;
    }

    preload() {
        this.load.image('sky', './Resources/Sprites/sky.png');
        this.load.image('ground', './Resources/Sprites/platform.png');
        this.load.image('star', './Resources/Sprites/star.png');
        this.load.image('bomb', './Resources/Sprites/bomb.png');
        this.load.image('gem', './Resources/Sprites/gem.png');
        this.load.image('coin', './Resources/Sprites/bomb.png');
        this.load.image('jumpSmoke', './Resources/Sprites/jumpSmoke.png');
        this.load.image('kills', './Resources/Sprites/kills.png');

        this.load.spritesheet('dude',
            './Resources/Sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('attack',
            './Resources/Sprites/PlayerSprite/attack.png',
            { frameWidth: 43, frameHeight: 37 }
        );
        this.load.spritesheet('playerIdle',
            './Resources/Sprites/PlayerSprite/idle.png',
            { frameWidth: 24, frameHeight: 32 }
        );
        this.load.spritesheet('playerRight',
            './Resources/Sprites/PlayerSprite/right.png',
            { frameWidth: 22, frameHeight: 33 }
        );
        this.load.spritesheet('playerLeft',
            './Resources/Sprites/PlayerSprite/left.png',
            { frameWidth: 22, frameHeight: 33 }
        );
        this.load.spritesheet('dead',
            './Resources/Sprites/PlayerSprite/dead.png',
            { frameWidth: 33, frameHeight: 32 }
        );
        this.load.spritesheet('slash',
            './Resources/Sprites/PlayerSprite/slash.png',
            { frameWidth: 30, frameHeight: 30 }
        );
        this.load.json('collectables', './Resources/Data/collectables.json');
    }

    create() {
        this.events.on('shutdown', this.cleanup, this); 
        this.events.on('destroy', this.cleanup, this);  
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 558, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player(this, 300, 200, "playerIdle")

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

        this.collectableManager = new CollectableManager(this, this.player, this.platforms);
        this.inputHandler = new InputHandler(this, this.player);
        this.enemySpawner = new EnemySpawner(this);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch("PauseMenu"); 
            this.scene.pause();
        });
    }

    cleanup() {
        if (this.player) this.player.destroy();
    }

    update(time, delta) {
        this.timer += delta;
        // Spawn gems randomly 
        this.spawnGems();
        this.inputHandler.update();
        this.enemySpawner.update(delta);
    }

    spawnGems(){
        if (this.timer > 10000) {
            let positionX = Math.random()* this.scale.width;
            this.collectableManager.createCollectable(positionX, 0,
                this.collectableManager.collectablesJson.gem.type, this.collectableManager.collectablesJson.gem.value);
            this.timer = 0;
        }
        
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

    if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
            return true;
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'bomb');
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
    scene: [MaineMenu, GameScene, PauseMenu, GameOver]
};

const game = new Phaser.Game(config);