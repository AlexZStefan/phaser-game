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
        if(!player.dead)
        {
            if (this.cursors.left.isDown) {
                player.setVelocityX(-160);
                
                player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown) {
                player.setVelocityX(160);
                
                player.anims.play('right', true);
            }
            else {
                player.setVelocityX(0);
                
                player.anims.play('turn');
            }
            if (this.cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-330);
            }

            if(this.cursors.space.isDown){
                player.attack();
            }
        }
    }

    update() {
        this.characterMovement();
    }
}
