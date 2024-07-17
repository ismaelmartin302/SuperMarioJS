/* global Phaser */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#fff',
    parent: 'game',
    scene: {
        preload, // Se ejecuta para precargar
        create, // Se ejecuta cuando inicia el juego
        update // Se ejecuta cada frame
    }
}
new Phaser.Game(config);

function preload() { } // Paso 1
function create() { } // Paso 2
function update() { } // Paso 3...Infinito