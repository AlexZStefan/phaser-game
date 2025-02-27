export default class Humanoid extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Attach the player to the scene
        scene.add.existing(this);  // ✅ This makes sure the sprite is visible
        scene.physics.add.existing(this); // ✅ Enables physics on the player
        // Optional: Adjust physics properties
        this.setCollideWorldBounds(true);
        // Add an inventory system (if applicable)
        this.health = 100;
        // Ensure the player collides with static objects in the scene
        scene.children.getChildren().forEach(child => {
            if (child instanceof Phaser.Physics.Arcade.Sprite && child.body?.immovable) {
                scene.physics.add.collider(this, child);
            }
        });

        this.CreateAnimation();

        // No need for `return this;`
    }

    Move() {
        this.setVelocityX(-160);
        this.anims.play('left', true);
    }

    CreateAnimation() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }
}
