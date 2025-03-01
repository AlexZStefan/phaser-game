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
        // Add an inventory system (if applicable)
        this.inventory = new Inventory(scene);
        this.scene = scene;
    }

    triggerDeath(){
        this.setTint(0xff0000);
        this.anims.play('turn');
        this.scene.physics.pause();
        this.dead = true;
        this.scene.scene.launch("GameOver"); // Open pause menu
    }
}