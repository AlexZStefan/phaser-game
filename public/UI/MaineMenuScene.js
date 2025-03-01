export default class MaineMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    create() {
        this.add.text(300, 150, "Main Menu", { fontSize: "40px", color: "#fff" });

        this.createButton(350, 250, "Start Game", () => this.startGame());
        this.createButton(350, 300, "Settings", () => this.openSettings());
    }

    createButton(x, y, text, callback) {
        let button = this.add.text(x, y, text, { fontSize: "24px", color: "#ff0" })
            .setInteractive()
            .on("pointerdown", callback)
            .on("pointerover", () => button.setStyle({ fill: "#ff0" }))
            .on("pointerout", () => button.setStyle({ fill: "#fff" }));
    }

    startGame() {
        this.scene.start("GameScene"); // Start the game
        this.scene.stop(); // Start the game
    }

    openSettings() {
        console.log("Settings menu (not implemented)");
    }
}
