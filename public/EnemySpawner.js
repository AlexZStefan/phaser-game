import Enemy from "./Enemy.js";

export default class EnemySpawner {
    constructor(scene) {
        this.enemies = []
        this.scene = scene;
        this.time = 0;
    }

    CreateEnemy() {
        let y = Math.floor(Math.random() * 100);
        console.log(y);
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