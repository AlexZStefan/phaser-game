/**
/*  Class to handle collectables 
/* @param {Phaser.Scene} scene
/* @param {integer} value
*/
export default class Collectables extends  Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, value) {
        super(scene, x, y, type);

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.type = type;
        this.value = value;
    }

    collect(player) {
        this.disableBody(true, true);
        player.inventory.addItem(this.type, this.value);
    }
}
