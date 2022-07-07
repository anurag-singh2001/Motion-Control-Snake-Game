import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'



let food = getRandomFoodPosition()
const EXPANSION_RATE = 1
let score = 0;
let hiscoreval


export function update() {
  if (onSnake(food)) {
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;

    expandSnake(EXPANSION_RATE)

    food = getRandomFoodPosition()
  }
}
let hiscore = localStorage.getItem("hiscore");
if (hiscore == null) {
  hiscore = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscore));
}
else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}
export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  //points();
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

