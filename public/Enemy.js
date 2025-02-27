import Humanoid from "./Humanoid.js";

export default class Enemy extends Humanoid {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setCollideWorldBounds(false);
        this.scene = scene;
    }

    update() {
        if (this.x < 0 || this.x > this.scene.scale.width || this.y < 0 || this.y > this.scene.scale.height) {
            this.destroy();
            return true;
        }
        return false;
    }

}