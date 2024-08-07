export function checkControls({ mario, keys, sound }) {
    if (keys.left.isDown || keys.A.isDown) {
        mario.anims.play('mario-walk', true)
        mario.x -= 2
    } else if (keys.right.isDown || keys.D.isDown) {
        mario.anims.play('mario-walk', true)
        mario.x += 2
    } else if (mario.isDead != true) {
        mario.anims.play('mario-idle', true)
    }
    if ((keys.up.isDown || keys.space.isDown || keys.W.isDown) && mario.body.touching.down) {
        mario.setVelocityY(-600)
        mario.anims.play('mario-jump', true)
        sound.add('jump', { volume: 0.05 }).play()
    } else if (!mario.body.touching.down) {
        mario.anims.play('mario-jump', true)
    }
}