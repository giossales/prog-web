import { TAMX } from "./config.js"
import { space } from "./space.js"
import { createLaser } from "./laser.js"
import { isColliding, removeFromArrayByElement } from "./utils.js"
import { enemyShips } from "./enemyShip.js"
import { enemyUFOs } from "./enemyUFO.js"
import { bigMeteors } from "./bigMeteor.js"
import { smallMeteors } from "./smallMeteor.js"

export let lives = 3

const directions = [
	"assets/png/playerLeft.png",
	"assets/png/player.png",
	"assets/png/playerRight.png",
]

class Ship {
	constructor() {
		this.element = document.createElement("img")
		this.element.id = "ship"
		this.direction = 1
		this.element.src = directions[this.direction]
		this.element.style.bottom = "20px"
		this.element.style.left = `${TAMX / 2 - 50}px`
		this.isDamaged = false
		this.damageTimeout = null  
		space.element.appendChild(this.element)
	}

	changeDirection(giro) { // -1 +1
		if (this.direction + giro >= 0 && this.direction + giro <= 2)
			this.direction = this.direction + giro

		if (!this.isDamaged)
			this.element.src = directions[this.direction]
	}

	move() {
		const left_position = parseInt(this.element.style.left)

		if (this.direction === 0 && left_position > 0)
			this.element.style.left = `${left_position - 1}px`

		if (this.direction === 2 && left_position < TAMX - 90)
			this.element.style.left = `${left_position + 1}px`
	}

	shootLaser() {
		const laser_x = parseInt(this.element.style.left) + 45
		console.log('Shoot laser at x:', laser_x)

		createLaser(laser_x)
	}

	updateLivesHUD() {
		const life_icons = document.querySelectorAll(".life")

		life_icons.forEach((icon, index) => {
			if (index < lives) {
				icon.style.visibility = "visible"
			} else {
				icon.style.visibility = "hidden"
			}
		})
	}

	checkShipCollision() {
		const obstacles = document.querySelectorAll(".enemy-ship, .enemy-ufo, .big-meteor, .small-meteor")
		const ship_rect = this.element.getBoundingClientRect()

		for (let obstacle of obstacles) {
			const obstacle_rect = obstacle.getBoundingClientRect()

			if (isColliding(ship_rect, obstacle_rect)) {
				obstacle.remove()

				const obstacle_class = obstacle.className
				if (obstacle_class === "enemy-ship") removeFromArrayByElement(enemyShips, obstacle)
				else if (obstacle_class === "enemy-ufo") removeFromArrayByElement(enemyUFOs, obstacle)
				else if (obstacle_class === "big-meteor") removeFromArrayByElement(bigMeteors, obstacle)
				else if (obstacle_class === "small-meteor") removeFromArrayByElement(smallMeteors, obstacle)

				lives -= 1
				this.updateLivesHUD()

				this.isDamaged = true
				this.element.src = "assets/png/playerDamaged.png"

				// limpa o timeout anterior
				// necessário porque se dentro dos 5 segundos a nave bater de novo, reinicia esses 5 segundos
				if (this.damageTimeout) {
					clearTimeout(this.damageTimeout)
				}

				this.damageTimeout = setTimeout(() => {
					this.element.src = directions[this.direction]
					this.isDamaged = false
					this.damageTimeout = null
				}, 5000)

				break
			}
		}
	}
}

export const ship = new Ship()
