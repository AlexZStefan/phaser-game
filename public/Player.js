import Inventory from "./Inventory.js";
import Humanoid from "./Humanoid.js";
import GameScene from "./Game.js";

export default class Player extends Humanoid {
    /**
     * @param {GameScene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.inventory = new Inventory(scene);
        this.scene = scene;
        this.attackSpeed = 5;
        this.canAttack = true;
        this.timeBetweenAttack = 0.5;

        this.on('animationcomplete', (animation) => {
            if (animation.key === 'attack') {
                this.isAttacking = false;
                this.anims.play('turn', true);
            }
        });
    }

    attack() {
        this.scene.cameras.main.shake(100, 0.005); 

        this.anims.play('attack', true);
        this.isAttacking = true;
        let forwardX = this.body.velocity.x;

        if (forwardX != 0 && this.canAttack) {
            this.canAttack = false;

            // Create individual projectile
            let bomb = this.scene.physics.add.sprite(this.x, this.y, "slash");
            bomb.setScale(3);
            bomb.anims.create({
                key: 'slash',
                frames: this.anims.generateFrameNumbers('slash', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: 0
            });
            bomb.anims.play('slash', true);
            bomb.body.setAllowGravity(false);
            bomb.setVelocityX(forwardX * this.attackSpeed);
            // should replace this with groups
            this.scene.enemySpawner.enemies.forEach(enemy => {
                this.scene.physics.add.overlap(bomb, enemy, () => {
                    enemy.triggerDeath();
                    this.inventory.addItem("kills", 1);
                    bomb.destroy();
                }, null, this);
            });

            // should have a pool of objects here 
            this.scene.time.delayedCall(this.timeBetweenAttack * 1000, () => {
                bomb.destroy();
                this.canAttack = true;
            });
        }
    }

    triggerDeath() {
        this.setTint(0xff0000);
        this.scene.physics.pause();
        this.dead = true;
        this.anims.play('dead', true);
        this.scene.time.delayedCall(1000, () => {
            this.scene.scene.launch("GameOver"); // Open pause menu
        });
    }


}