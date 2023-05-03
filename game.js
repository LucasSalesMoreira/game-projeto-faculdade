const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d")

canvas.width = 1600
canvas.height = 700

let jumpIntervalId = null
let velocityIntervalId = null
let gravityAvailable = false
let velocity = 4

canvas.addEventListener('click', () => {
    if (jumpIntervalId == null && !gravityAvailable) {
        gravityAvailable = false
        jumpIntervalId = setInterval(() => {
            player.y -= 2
        }, 5)
    }

    setTimeout(() => {
        clearInterval(jumpIntervalId)
        jumpIntervalId = null
        gravityAvailable = true
    }, 500)
})

const player = {
    x: 400,
    y: canvas.height - 100,
    w: 50,
    h: 100,
    isLiving: true         
}

const obstacle = {
    x: canvas.width,
    y: canvas.height - 100,
    w: 50,
    h: 100,
}

const renderPlayer = () => {
    context.fillStyle = "#940d8b"
    context.fillRect(player.x, player.y, player.w, player.h)
}

const renderObstacle = () => {
    context.fillStyle = "#000"
    context.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h)
    if (obstacle.x >= obstacle.w * (- 1)) {
        obstacle.x -= 1 * velocity
    } else {
        obstacle.x = canvas.width
    }
}

const addGravity = () => {
    if ((player.y < canvas.height - player.h) && gravityAvailable) {
        player.y += 7
    } else {
        gravityAvailable = false
    }
}

const startTimer = () => {
    velocityIntervalId = setInterval(() => {
        velocity += 1
    }, 10000)

    setTimeout(() => {
        clearInterval(velocityIntervalId)
        alert('Fim do jogo')
    }, 60000 * 10)
}

const verifyColision = () => {
    let margin = -2
    if (obstacle.x < player.x + player.w + margin
        && obstacle.x + obstacle.w + margin > player.x 
        && obstacle.y < player.y + player.h + margin 
        && obstacle.y + obstacle.h + margin > player.y) {
            player.isLiving = false
            setTimeout(() => {
                obstacle.x = canvas.width
                player.isLiving = true
            }, 1000)
    }
}

const clear = () => {
    context.fillStyle = "#5eaae0"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

const renderLoop = () => {
    if (player.isLiving) {
        clear()
        renderPlayer()
        addGravity()
        renderObstacle()
        verifyColision()
    }
    requestAnimationFrame(renderLoop)
}

startTimer()
renderLoop()