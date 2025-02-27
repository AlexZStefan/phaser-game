import Collectables from "./Collectables.js"

export default class CollectableManager {
    constructor(scene, player, staticEnvironment ) {
        this.scene = scene;
        this.collectables = [];
        this.player = player;
        this.staticEnvironment = staticEnvironment;
        this.collectablesJson = null;

        this.loadCollectables();
    }

    loadCollectables() {
        this.collectablesJson = this.scene.cache.json.get('collectables').collectables;
        Object.values(this.collectablesJson).forEach(element => {
            this.createCollectable(element.x, element.y, element.icon, element.value);
        });
    }

    createCollectable(x, y, icon, value) {
        let collectable = new Collectables(this.scene, x, y, icon, value)
        this.collectables.push(collectable);
        this.scene.physics.add.collider(this.staticEnvironment, collectable);
        this.scene.physics.add.overlap(this.player, collectable, collectable.collect.bind(collectable, this.player), null, this.scene);
    }
}
