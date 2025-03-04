import Humanoid from "./Humanoid.js";

export default class Enemy extends Humanoid {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setCollideWorldBounds(false);
        this.scene = scene;
        this.setTint(0xff0000);

        if(scene.player)
            scene.physics.add.overlap(scene.player, this, ()=> scene.player.triggerDeath(), null, this);

        this.scene.time.delayedCall(100, () => {
            this.update()
        });
    }

    move() {
        this.setVelocityX(-160);
        this.setFlipX(true);
        this.anims.play('left', true);
    }

    triggerDeath(){
        this.destroy(true);
    }

    update() {
        if (this.x < 0 || this.x > this.scene.scale.width || this.y < 0 || this.y > this.scene.scale.height) {
            this.destroy();
        }
            this.move()
    }

    
}
