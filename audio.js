const INIT_AUDIOS = [
    {
        key: 'gameover',
        path: 'assets/sound/music/gameover.mp3',
    },
    
    {
        key: 'goomba-stomp',
        path: 'assets/sound/effects/goomba-stomp.wav',
    },
    {
        key: 'jump',
        path: 'assets/sound/effects/jump.mp3',
    },
    {
        key: 'theme',
        path: 'assets/sound/music/overworld/theme.mp3',
    },
]
export const initAudio = ({load}) => {
    INIT_AUDIOS.forEach(({key, path}) => {
        load.audio(key, path)
    })
}


export const playAudio = (id, {sound}, {volume=1} = {}) => {
    try {
        return sound.add(id, {volume}).play()
    }
    catch(e) {
        console.error(e)
    }
}