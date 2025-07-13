import { TAMX, PROB_ENEMY_UFO } from "./config.js"
import { space } from "./space.js"
import { speedMultiplier } from "./game.js"

class EnemyUFO {
    constructor(baseSpeed, speedVariation) {
        this.speed = baseSpeed + Math.random() * speedVariation
        this.element = document.createElement("img")
        this.element.className = "enemy-ufo"
        this.element.src = "assets/png/enemyUFO.png"
        this.element.style.top = "-20px"
        this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
        space.element.appendChild(this.element)
    }

    move() {
        const new_position = parseFloat(this.element.style.top) + this.speed
        this.element.style.top = `${new_position}px`

        return new_position > window.innerHeight

    }
}

export const enemyUFOs = []

export const createRandomEnemyUFO = () => {
    if (Math.random() < PROB_ENEMY_UFO) {
        const baseSpeed = 1
        const speedVariation = 2
        const enemyUFO = new EnemyUFO(baseSpeed * speedMultiplier, speedVariation * speedMultiplier)
        enemyUFOs.push(enemyUFO)
    }
}

export const moveEnemyUFOs = () => {
    for (let i = enemyUFOs.length - 1; i >= 0; i--) {
        const enemy_ufo = enemyUFOs[i]
        const out_of_screen = enemy_ufo.move()

        if (out_of_screen) {
            enemy_ufo.element.remove()
            enemyUFOs.splice(i, 1)
        }
    }
}