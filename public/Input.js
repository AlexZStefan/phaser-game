/**
 * Class to handle player input.
 */

export default class InputHandler {
    constructor(scene, player) {
        this.scene = scene;
        // Set up the cursors for input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    characterMovement() {
        let player = this.scene.player;
        // Should implement a state machine for humanoid
        if (!player.dead) {
            if (this.cursors.space.isDown && this.cursors.left.isDown || this.cursors.space.isDown && this.cursors.right.isDown) {                
                player.attack();
            }
            if (this.cursors.left.isDown) {
                player.moveLeft();
            }
            else if (this.cursors.right.isDown) {
                player.moveRight();
            }
            else {
                player.idle();
            }
            if (this.cursors.up.isDown && player.body.touching.down) {
                player.jump();
            }
        }
    }

    update() {
        this.characterMovement();
    }
}
