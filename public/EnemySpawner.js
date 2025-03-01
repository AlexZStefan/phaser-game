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
        // top
        let y = 170;
        // middle 
        if(playerPosition < 400 && playerPosition >211 ) y = 359;
        // bottom
        else if(playerPosition < 600 && playerPosition >400 ) y = 500;
        let x = this.scene.sys.game.canvas.width;
        this.enemies.push(new Enemy(this.scene, x, y, "dude"))
    }

    update(deltaTime) {
        this.time += deltaTime;
        if (this.time > 1000) {
            this.CreateEnemy();
            this.time = 0;
        }
        this.enemies.forEach(enemy => {
            enemy.Move();
        });

        // remove emeny from list if true
        this.enemies = this.enemies.filter(enemy => !enemy.update());
    }
}