import { TAMX, PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"
import { speedMultiplier } from "./game.js"

class EnemyShip {
	constructor(baseSpeed, speedVariation) {
		this.speed = baseSpeed + Math.random() * speedVariation
		this.element = document.createElement("img")
		this.element.className = "enemy-ship"
		this.element.src = "assets/png/enemyShip.png"
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

export const enemyShips = []

export const createRandomEnemyShip = () => {
	if (Math.random() < PROB_ENEMY_SHIP) {
		const baseSpeed = 1
		const speedVariation = 2
		const ship = new EnemyShip(baseSpeed * speedMultiplier, speedVariation * speedMultiplier)
		enemyShips.push(ship)
	}
}

export const moveEnemyShips = () => {
	for (let i = enemyShips.length - 1; i >= 0; i--) {
		const ship = enemyShips[i]
		const out_of_screen = ship.move()

		if (out_of_screen) {
			ship.element.remove()
			enemyShips.splice(i, 1)
		}
	}
}