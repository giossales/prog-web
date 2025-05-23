import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship, lives } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips } from "./enemyShip.js"
import { createRandomEnemyUFO, moveEnemyUFOs } from "./enemyUFO.js"
import { createRandomBigMeteor, moveBigMeteors } from "./bigMeteor.js"
import { createRandomSmallMeteor, moveSmallMeteors } from "./smallMeteor.js"
import { moveLasers } from "./laser.js"

export let speedMultiplier = 1

function increaseSpeedMultiplier() {
	speedMultiplier *= 1.05 // velocidade média vai aumentar 5% a cada minuto
	console.log("Speed increased:", speedMultiplier)
}
setInterval(increaseSpeedMultiplier, 60000) // a cada minuto aumenta a velocidade

const gameState = {
	started: false,
	running: false,
	paused: false
}

function startGame() {
	gameState.started = true
	gameState.running = true
	gameState.paused = false
	setInterval(run, 1000 / FPS)
}

function togglePause() {
	if (gameState.running) {
		gameState.paused = !gameState.paused
	}
}

function gameOver() {
	gameState.running = false
	document.getElementById("game-over").classList.remove("hidden")
	document.getElementById("restart-button").classList.remove("hidden")

}

document.getElementById("restart-button").addEventListener("click", () => {
	window.location.reload();
});

window.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") ship.changeDirection(-1)
	if (e.key === "ArrowRight") ship.changeDirection(+1)

	if (e.key === " ") {
		if (!gameState.started)
			startGame()
		else
			ship.shootLaser()
	}

	if (e.key === "p") togglePause()
})

function run() {
	if (!gameState.running || gameState.paused) return

	space.move()
	ship.move()
	ship.checkShipCollision()

	if (lives <= 0)
		gameOver()

	createRandomEnemyShip()
	moveEnemyShips()
	createRandomEnemyUFO()
	moveEnemyUFOs()
	createRandomBigMeteor()
	moveBigMeteors()
	createRandomSmallMeteor()
	moveSmallMeteors()
	moveLasers()
}
