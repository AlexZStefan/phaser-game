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
            if (this.cursors.space.isDown) {
                player.anims.play('attack', true);
                player.attack();
                player.isAttacking = true; 
            }
            if (this.cursors.left.isDown) {
                player.setVelocityX(-160);
                player.setFlipX(true);
                if (!player.isAttacking)
                    player.anims.play('left', true);
            }

            else if (this.cursors.right.isDown) {
                player.setFlipX(false);
                player.setVelocityX(160);
                if (!player.isAttacking)
                    player.anims.play('right', true);
            }
            else {
                player.setVelocityX(0);
                if (!player.isAttacking)
                    player.anims.play('turn', true);

            }
            if (this.cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-330);
            }

        }
    }

    update() {
        this.characterMovement();
    }
}
