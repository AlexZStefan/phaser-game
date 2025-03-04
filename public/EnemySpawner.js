import Enemy from "./Enemy.js";

export default class EnemySpawner {
    constructor(scene) {
        this.enemies = []
        this.scene = scene;
        this.time = 0;
    }

    // create enemy based on the player y position
    CreateEnemy() {
        let playerPosition = this.scene.player.y;
        let y = 170;
        if (playerPosition < 400 && playerPosition > 211) y = 359;
        else if (playerPosition < 600 && playerPosition > 400) y = 500;
        
        let x = this.scene.sys.game.canvas.width;
    
        // Ensure new Enemy is created
        let enemy = new Enemy(this.scene, x, y, "playerIdle");
        if (enemy) {
            this.enemies.push(enemy);
        }
    }

    update(deltaTime) {
        this.time += deltaTime;
        if (this.time > 1000) {
            this.CreateEnemy();
            this.time = 0;
        }

    }
}