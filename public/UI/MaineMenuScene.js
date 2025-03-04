export default class MaineMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    preload(){
        this.load.image('background', './Resources/Sprites/UI/background.jpg');
        this.load.image('button', './Resources/Sprites/UI/button.png');
    }

    create() {
        this.add.image(400, 300, "background");
        let t = this.add.text(325, 150, "Main Menu", { fontSize: "40px", color: "#fff" });
        t.setTint(0xff0000);
        
        let button1 = this.add.image(425, 260, "button");
        button1.setScale(0.5, 0.2);
        button1.setTint(0xA0A0A0);
        let button2 =this.add.image(425, 310, "button");
        button2.setScale(0.5, 0.2);
        button2.setTint(0xA0A0A0);
        
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
