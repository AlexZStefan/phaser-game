import Humanoid from "./Humanoid.js";

export default class Enemy extends Humanoid {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setCollideWorldBounds(false);
        this.scene = scene;
        this.setTint(0xff0000);

        scene.physics.add.overlap(scene.player, this, ()=> scene.player.triggerDeath(), null, this);
    }

    update() {
        if (this.x < 0 || this.x > this.scene.scale.width || this.y < 0 || this.y > this.scene.scale.height) {
            this.destroy();
            return true;
        }
        return false;
    }

    
}
