export default class Inventory {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene) {
        this.scene = scene;
        this.items = {};
        this.itemIcons = {};
        this.x = 10;
        this.y = 10;
        this.spacing = 130;
        let collectablesJson = this.scene.cache.json.get('collectables').collectables;

        Object.values(collectablesJson).forEach(element => {
            this.addItem(element.type, 0)
        });
    }

    CreateTypeIfDoesNotExist(itemType) {
        if (!this.items[itemType]) {
            this.items[itemType] = 0; // If the item doesn't exist, initialize its count
        }
        // If the icon is not created, create and add it to the scene
        if (!this.itemIcons[itemType]) {
            const icon = this.scene.add.image(this.x + this.spacing * Object.keys(this.itemIcons).length, this.y, itemType);
            this.itemIcons[itemType] = icon;
            icon.setOrigin(0.4, 0.1);
        }
    }
    
    // Add an item to the inventory (e.g., "star", "coin")
    addItem(itemType, value) {
        this.CreateTypeIfDoesNotExist(itemType);
        if (value != null)
            this.items[itemType] += value; // Increase the item count
        // Update the count text next to the icon
        this.updateItemText(itemType);
    }

    // Update the text next to the icon for a particular item
    updateItemText(itemType, value = null) {
        const textKey = `${itemType}Text`;

        // If the text already exists, update it
        if (!this.scene[textKey]) {
            // Otherwise, create the text next to the icon
            this.scene[textKey] = this.scene.add.text(
                this.itemIcons[itemType].x + 20,
                this.itemIcons[itemType].y,
                `${itemType}: ${this.items[itemType]}`,
                { fontSize: '20px' }
            );
        }
        if (value != null) this.items[itemType] = value;
        this.scene[textKey].setText(`${itemType}: ${this.items[itemType]}`);
    }

    update() {
    }
}
