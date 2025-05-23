import { TAMX, PROB_SMALL_METEOR } from "./config.js"
import { space } from "./space.js"
import { speedMultiplier } from "./game.js"

class SmallMeteor {
	constructor(baseSpeed, speedVariation) {
		this.speed = baseSpeed + Math.random() * speedVariation
		this.element = document.createElement("img")
		this.element.className = "small-meteor"
		this.element.src = "assets/png/meteorSmall.png"
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

export const smallMeteors = []

export const createRandomSmallMeteor = () => {
	if (Math.random() < PROB_SMALL_METEOR) {
		const baseSpeed = 1
		const speedVariation = 2
		const smallMeteor = new SmallMeteor(baseSpeed * speedMultiplier, speedVariation * speedMultiplier)
		smallMeteors.push(smallMeteor)
	}
}

export const moveSmallMeteors = () => {
	for (let i = smallMeteors.length - 1; i >= 0; i--) {
		const small_meteor = smallMeteors[i]
		const out_of_screen = small_meteor.move()
		if (out_of_screen) {
			small_meteor.element.remove()
			smallMeteors.splice(i, 1)
		}
	}
}