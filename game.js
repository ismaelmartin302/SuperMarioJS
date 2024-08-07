import { createAnimations } from "./animations.js";
import { initAudio, playAudio } from "./audio.js";
import { checkControls } from "./controls.js";
/* global Phaser */
const config = {
    autoFocus: false,
    type: Phaser.AUTO,
    width: 256,
    height: 444,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }
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
    this.load.spritesheet(
        'goomba',
        'assets/entities/overworld/goomba.png',
        { frameWidth: 16, frameHeight: 16 }
    )
    initAudio(this)

} // Paso 1
function create() {
    playAudio('theme', this, { volume: 0.2 })
    this.sound
    this.add.image(100, 50, 'cloud1').setScale(.15).setOrigin(0, 0);
    this.mario = this.physics.add.sprite(config.width / 2, config.height - 32, 'mario').setOrigin(0, 1).setCollideWorldBounds(true).setGravityY(300)
    this.enemy = this.physics.add.sprite(config.width - 32, config.height - 158 - 16, 'goomba').setOrigin(0, 1).setCollideWorldBounds(true).setGravityY(300).setVelocityX(-50)
    this.floor = this.physics.add.staticGroup()

    createAnimations(this)
    this.floor
        .create(0, config.height - 16, 'floorbricks').setOrigin(0, .5).refreshBody()
    this.floor
        .create(128, config.height - 16, 'floorbricks').setOrigin(0, .5).refreshBody()
    this.floor
        .create(128, config.height - 148, 'floorbricks').setOrigin(0, .5).refreshBody()
    this.floor
        .create(0, config.height - 256, 'floorbricks').setOrigin(0, .5).refreshBody()
    this.physics.add.collider(this.enemy, this.floor)
    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this)
    this.keys = this.input.keyboard.addKeys("W,A,S,D,up,left,right,down,space");

    function onHitEnemy(mario, enemy) {
        if (mario.body.touching.down && enemy.body.touching.up) {
            enemy.anims.play('goomba-dead', true)
            playAudio('goomba-stomp', this)
            enemy.setVelocityX(0)
            setTimeout(()=> {
                enemy.destroy()
            }, 500)
            mario.setVelocityY(-300)
        } else {
            // mario muere
        }
    }
    this.enemy.anims.play('goomba-walk', true)
    this.cameras.main.setBounds(0, 0, config.width, config.height + 2000)
    this.cameras.main.startFollow(this.mario)
    this.physics.world.setBounds(0, 0, config.width, config.height + 2000)
} // Paso 2
function update() {
    const { mario, sound, scene } = this
    if (mario.isDead) return
    checkControls(this)
    if (mario.y >= config.height) {
        mario.isDead = true
        mario.anims.play('mario-dead')
        mario.setVelocityY(-300)
        playAudio('gameover', this,{ volume: 0.2 })
        mario.setCollideWorldBounds(false)

        setTimeout(() => {
            scene.restart()
        }, 2000)
    }


} // Paso 3...Infinito