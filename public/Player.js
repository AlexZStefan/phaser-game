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
        this.attackSpeed = 5;
        this.canAttack = true;    
        this.timeBetweenAttack = 0.5;
        this.isAttacking = false;

        const assets= this.scene.cache.json.get('playerSprites');     
        
        this.on('animationcomplete', (animation) => {
            if (animation.key === 'attack') {
                console.log("aaa");
                this.isAttacking = false; // Reset attack flag
                this.anims.play('turn', true); // Go back to idle/turn animation
            }
        });
    }
   
    attack() {
        let forwardX = this.body.velocity.x;
        if(forwardX != 0 && this.canAttack){
            this.canAttack = false;
            let bomb = this.scene.physics.add.sprite(this.x, this.y, "bomb");
            bomb.body.setAllowGravity(false); 
            bomb.setVelocityX(forwardX * this.attackSpeed);
            // should replace this with groups
            this.scene.enemySpawner.enemies.forEach(enemy => {
                this.scene.physics.add.overlap(bomb, enemy, ()=> {
                    enemy.triggerDeath(); 
                    bomb.destroy();
                }, null, this);
            });
            // should have a pool of objects here 
            this.scene.time.delayedCall(this.timeBetweenAttack * 1000, () => {
                bomb.destroy();
                this.canAttack = true;
            });
        }
    }

    triggerDeath() {
        this.setTint(0xff0000);
        
        this.scene.physics.pause();
        this.dead = true;
        this.anims.play('dead', true);

        this.scene.time.delayedCall( 1000, () => {
            this.scene.scene.launch("GameOver"); // Open pause menu
        });
    }


}