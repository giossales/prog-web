import { space } from "./space.js"
import { enemyShips } from "./enemyShip.js"
import { enemyUFOs } from "./enemyUFO.js"
import { bigMeteors } from "./bigMeteor.js"
import { smallMeteors } from "./smallMeteor.js"
import { updateScore } from "./score.js"
import { isColliding, removeFromArrayByElement } from "./utils.js"

class Laser {
    constructor(x) {
        this.element = document.createElement("img")
        this.element.className = "laser"
        this.element.src = "assets/png/laserRed.png"
        this.element.style.left = `${x}px`
        this.element.style.bottom = "100px"
        space.element.appendChild(this.element)
    }

    move() {
        const new_position = parseInt(this.element.style.bottom) + 5
        this.element.style.bottom = `${new_position}px`

        return new_position > window.innerHeight
    }
}

function checkLaserCollision(laser) {
    const laser_rect = laser.element.getBoundingClientRect()

    const obstacles = document.querySelectorAll(".enemy-ship, .enemy-ufo, .big-meteor, .small-meteor")

    for (let obstacle of obstacles) {
        const obstacle_rect = obstacle.getBoundingClientRect()

        if (isColliding(laser_rect, obstacle_rect)) {
            laser.element.remove()

            const obstacle_class = obstacle.className

            obstacle.remove()
            if (obstacle_class === "enemy-ship") {
                removeFromArrayByElement(enemyShips, obstacle)
                updateScore(50)
            } else if (obstacle_class === "enemy-ufo") {
                removeFromArrayByElement(enemyUFOs, obstacle)
                updateScore(20)
            } else if (obstacle_class === "big-meteor") {
                removeFromArrayByElement(bigMeteors, obstacle)
                updateScore(10)
            } else if (obstacle_class === "small-meteor") {
                removeFromArrayByElement(smallMeteors, obstacle)
                updateScore(100)
            }

            return true
        }
    }

    return false
}

const lasers = []

export const createLaser = (x) => {
    lasers.push(new Laser(x))
}

export const moveLasers = () => {
    for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i]

        const hit = checkLaserCollision(laser)

        if (hit) {
            lasers.splice(i, 1)
            continue
        }

        const out_of_screen = laser.move()

        if (out_of_screen) {
            laser.element.remove()
            lasers.splice(i, 1)
        }
    }
}