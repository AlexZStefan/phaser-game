/**
 * Spawn an image and apply tween 
 * @param {Phaser.Scene} scene 
 * @param {integer} x 
 * @param {integer} y 
 * @param {string} imageName 
 */
export function createTweenJumpStamp(scene, x, y, imageName) {
    let smoke = scene.add.image(x, y, imageName)
        .setScale(0.1)  
        .setAlpha(0.8)  
    // Tween: Scale up and fade out sprite
    scene.tweens.add({
        targets: smoke,
        scale: 0.2,  
        alpha: 0,     
        duration: 500, 
        onComplete: () => smoke.destroy() 
    });
}

export function createTweenTextScale(scene, textName, scaleX, scaleY) {
    // Tween: Scale up and revert text
    scene.tweens.add({
        targets: scene[textName],
        scaleX: scaleX,  
        scaleY: scaleY,  
        duration: 100, 
        yoyo: true,   
        ease: "Sine.easeInOut",
        repeat: 0  
    });
}