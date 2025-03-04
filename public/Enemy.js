import Humanoid from "./Humanoid.js";

export default class Enemy extends Humanoid {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setCollideWorldBounds(false);
        this.scene = scene;
        this.setTint(0xff0000);

        if (scene.player)
            scene.physics.add.overlap(scene.player, this, () =>
                scene.player.triggerDeath(), null, this);
        this.scene.time.delayedCall(100, () => {
            this.update()
        });
    }

    triggerDeath() {
        let effect = createBloodSpatter(this.scene);
        effect.startFollow(this);
        this.dead = true;
        this.body.enable = false;
        this.anims.play('dead', true);
        this.scene.time.delayedCall(1000, () => {
            this.destroy(true);
        });
    }

    update() {
        if (this.x < 0 || this.x > this.scene.scale.width || this.y < 0 || this.y > this.scene.scale.height) {
            this.destroy();
        }
        this.moveLeft();
    }
}

function createBloodSpatter(scene) {
    let p = scene.add.particles(0, 0, 'star', {
        speed: { min: -200, max: 200 },
        angle: { min: 0, max: 360 },
        gravityY: 300,
        lifespan: { min: 100, max: 200 },
        scale: { start: 0.01, end: 0.5 },
        alpha: { start: 1, end: 0 },
        quantity: 4,
        blendMode: 'NORMAL'
    });

    // Destroy particles after some time to prevent memory leaks
    scene.time.delayedCall(200, () => {
        p.destroy();
    });
    return p;
}
