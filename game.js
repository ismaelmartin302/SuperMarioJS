import { createAnimations } from "./animations.js";
/* global Phaser */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
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
    this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
    this.load.audio('jump', 'assets/sound/effects/jump.mp3')
    this.load.audio('theme', 'assets/sound/music/overworld/theme.mp3')

} // Paso 1
function create() {
    this.sound.add('theme', { volume: 0.2 }).play()
    this.sound
    this.add.image(100, 50, 'cloud1').setScale(.15).setOrigin(0, 0);
    this.mario = this.physics.add.sprite(50, 110, 'mario').setOrigin(0, 1).setCollideWorldBounds(true).setGravityY(300)
    this.floor = this.physics.add.staticGroup()

    createAnimations(this)
    this.floor
        .create(0, config.height - 16, 'floorbricks').setOrigin(0, .5).refreshBody()
    this.floor
        .create(128, config.height - 16, 'floorbricks').setOrigin(0, .5).refreshBody()
    this.physics.add.collider(this.mario, this.floor)
    this.keys = this.input.keyboard.addKeys("W,A,S,D,up,left,right,down,space");

    this.cameras.main.setBounds(0, -1756, 256, 2000)
    this.cameras.main.startFollow(this.mario)
    this.physics.world.setBounds(0, 0, 256, 2000)
} // Paso 2
function update() {
    if (this.mario.isDead) return
    if (this.keys.left.isDown || this.keys.A.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
    } else if (this.keys.right.isDown || this.keys.D.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
    } else if (this.mario.isDead != true) {
        this.mario.anims.play('mario-idle', true)
    }
    if ((this.keys.up.isDown || this.keys.space.isDown || this.keys.W.isDown) && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true)
        this.sound.add('jump', { volume: 0.05 }).play()
    } else if (!this.mario.body.touching.down) {
        this.mario.anims.play('mario-jump', true)
    }
    if (this.mario.y >= config.height) {
        this.mario.isDead = true
        this.mario.anims.play('mario-dead')
        this.mario.setVelocityY(-300)
        this.sound.add('gameover', { volume: 0.2 }).play()
        this.mario.setCollideWorldBounds(false)

        setTimeout(() => {
            this.scene.restart()
        }, 2000)
    }


} // Paso 3...Infinito