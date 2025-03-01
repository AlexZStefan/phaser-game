export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }

    create() {
        this.add.text(300, 150, "Game Over", { fontSize: "40px", color: "#ff0000" });

        this.createButton(350, 250, "Restart", () => this.restartGame());
        this.createButton(350, 300, "Quit to Menu", () => this.quitToMainMenu());
    }

    createButton(x, y, text, callback) {
        let button = this.add.text(x, y, text, { fontSize: "24px", color: "#ff0" })
            .setInteractive()
            .on("pointerdown", callback)
            .on("pointerover", () => button.setStyle({ fill: "#ff0" }))
            .on("pointerout", () => button.setStyle({ fill: "#fff" }));
    }

    restartGame() {
        this.scene.start("GameScene"); // Restart the game
    }

    quitToMainMenu() {
        this.scene.stop("GameScene"); // Restart the game
        this.scene.start("MainMenu"); // Go back to Main Menu
    }
}
