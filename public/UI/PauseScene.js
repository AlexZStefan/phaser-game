export default class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: "PauseMenu" }); 
    }

    create() {
        // Dimmed background
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7); 

        // Title
        this.add.text(300, 150, "Game Paused", { fontSize: "32px", color: "#fff" });

        // Resume Button
        const resumeButton = this.add.text(350, 250, "Resume", { fontSize: "24px", color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => this.resumeGame());

        // Restart Button
        const restartButton = this.add.text(350, 300, "Restart", { fontSize: "24px", color: "#f00" })
            .setInteractive()
            .on("pointerdown", () => this.restartGame());

        // Quit Button
        const quitButton = this.add.text(350, 350, "Quit", { fontSize: "24px", color: "#ff0" })
            .setInteractive()
            .on("pointerdown", () => this.quitGame());
    }

    resumeGame() {
        this.scene.resume("GameScene"); // Resume game scene
        this.scene.stop(); // Close pause menu
    }

    restartGame() {
        this.scene.stop("GameScene"); // Stop current game scene
        this.scene.start("GameScene"); // Restart the game scene
        this.scene.stop(); // Close pause menu
    }

    quitGame() {
        this.scene.stop("GameScene"); // Stop the game
        this.scene.start("MainMenu"); // Go back to main menu (optional)
        this.scene.stop(); // Stop the pause menu
    }
}
