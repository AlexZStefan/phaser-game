import { createTweenTextScale } from "./Utilities.js";
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
        this.spacing = 200;
        let collectablesJson = this.scene.cache.json.get('collectables').collectables;

        Object.values(collectablesJson).forEach(element => {
            this.addItem(element.type, 0)
        });
        scene.events.on("shutdown", this.clearInventory, this);
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
        if(itemType == null) return; 
        this.CreateTypeIfDoesNotExist(itemType);
        if (value != null)
            this.items[itemType] += value; // Increase the item count
        // Update the count text next to the icon
        this.updateItemText(itemType);
    }
    
    clearInventory() {
        // Destroy all item icons
        Object.values(this.itemIcons).forEach(icon => {
            if (icon) icon.destroy();
        });
    
        // Destroy all item count texts
        Object.keys(this.items).forEach(itemType => {
            const textKey = `${itemType}Text`;
            if (this.scene[textKey]) {
                this.scene[textKey].destroy();
                delete this.scene[textKey]; // Remove reference
            }
        });
    
        // Reset inventory data
        this.items = {};
        this.itemIcons = {};
    }
    
    // Update the text next to the icon for a particular item
    updateItemText(itemType = null) {
        const textKey = `${itemType}Text`;
        if (!this.itemIcons[itemType]) {
            console.error(`Error: No icon found for item type "${itemType}"`);
            return;
        }
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
        this.scene[textKey].setText(`${itemType}: ${this.items[itemType]}`);
       
        createTweenTextScale(this.scene, textKey, 1.2, 1.2);
    }
}
