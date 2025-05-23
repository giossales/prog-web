import { TAMX, PROB_BIG_METEOR } from "./config.js"
import { space } from "./space.js"
import { speedMultiplier } from "./game.js"

class BigMeteor {
    constructor(baseSpeed, speedVariation) {
        this.speed = baseSpeed + Math.random() * speedVariation
        this.element = document.createElement("img")
        this.element.className = "big-meteor"
        this.element.src = "assets/png/meteorBig.png"
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

export const bigMeteors = []

export const createRandomBigMeteor = () => {
    if (Math.random() < PROB_BIG_METEOR) {
        const baseSpeed = 1
        const speedVariation = 2
        const bigMeteor = new BigMeteor(baseSpeed * speedMultiplier, speedVariation * speedMultiplier)
        bigMeteors.push(bigMeteor)
    }
}

export const moveBigMeteors = () => {
    for (let i = bigMeteors.length - 1; i >= 0; i--) {
        const big_meteor = bigMeteors[i]
        const out_of_screen = big_meteor.move()

        if (out_of_screen) {
            big_meteor.element.remove()
            bigMeteors.splice(i, 1)
        }
    }
}
