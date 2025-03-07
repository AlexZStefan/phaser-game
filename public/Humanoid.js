import {createTweenJumpStamp} from "./Utilities.js"
export default class Humanoid extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.health = 100;
        this.dead = false;
        this.isAttacking = false;
        // Attach the humanoid to the scene
        scene.add.existing(this);  // ✅ This makes sure the sprite is visible
        scene.physics.add.existing(this); // ✅ Enables physics on the player
        // Optional: Adjust physics properties
        this.setCollideWorldBounds(true);
        // Ensure the player collides with static objects in the scene
        scene.children.getChildren().forEach(child => {
            if (child instanceof Phaser.Physics.Arcade.Sprite && child.body?.immovable) {
                scene.physics.add.collider(this, child);
            }
        });

        this.createAnimation();
    }

    moveLeft() {
        this.setVelocityX(-160);
        this.setFlipX(true);
        if (!this.isAttacking)
            this.anims.play('left', true);
    }

    moveRight() {
        this.setFlipX(false);
        this.setVelocityX(160);
        if (!this.isAttacking)
            this.anims.play('right', true);
    }
    jump() {
        this.setVelocityY(-330);
        createTweenJumpStamp(this.scene, this.x, this.y + 10, 'jumpSmoke');
    }

    idle() {
        this.setVelocityX(0);
        if (!this.isAttacking)
            this.anims.play('turn', true);
    }

    createAnimation() {
        this.anims.create({
            key: 'slash',
            frames: this.anims.generateFrameNumbers('slash', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerRight', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerRight', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 17 }),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('dead', { start: 0, end: 14 }),
            frameRate: 20,
            repeat: 0
        });

    }
}
