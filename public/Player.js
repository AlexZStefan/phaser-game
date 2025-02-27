import Inventory from "./Inventory.js";
import Humanoid from "./Humanoid.js";

export default class Player extends Humanoid {
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Add an inventory system (if applicable)
        this.health = 100;
        this.inventory = new Inventory(scene);
    
        // No need for `return this;`
    }
}
