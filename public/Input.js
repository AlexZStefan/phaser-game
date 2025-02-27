/**
 * Class to handle player input.
 */
export default class InputHandler {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        // Set up the cursors for input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    /**
     * Update the input handling.
     */
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
    
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
    
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
    
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
