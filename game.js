/* global Phaser */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    scene: {
        preload, // Se ejecuta para precargar
        create, // Se ejecuta cuando inicia el juego
        update // Se ejecuta cada frame
    }
}
new Phaser.Game(config);

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

} // Paso 1
function create() {
    this.add.image(0, 0, 'cloud1').setScale(.15).setOrigin(0, 0);
    this.mario = this.add.sprite(50, 210, 'mario').setOrigin(0, 1);
    this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks').setOrigin(0, 0);;
    this.keys = this.input.keyboard.createCursorKeys()

    this.anims.create({
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario',
            { start: 1, end: 3 },
        ),
        frameRate: 12,
        repeat: -1
    })
} // Paso 2
function update() {
    if (this.keys.left.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
    } else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
    } else {
        this.mario.anims.stop()
        this.mario.setFrame(0)
    }
} // Paso 3...Infinito