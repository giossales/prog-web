let score = 0

export function updateScore(points) {
	score += points
	const scoreElement = document.getElementById("score")
	scoreElement.textContent = score.toString().padStart(6, "0")
}