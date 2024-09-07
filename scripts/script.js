const GRID_WIDTH = "20";
const GRID_HEIGHT = "20";

function generateGrid(width, height) {
  let containerElement = document.getElementById("container");
  const containerWidth = width * GRID_WIDTH;
  const containerHeight = height * GRID_HEIGHT;
  if (containerElement) {
    containerElement.style.width = `${containerWidth}px`;
    containerElement.style.height = `${containerHeight}px`;
    for(let rows = 0; rows < width; rows++) {
      let rowElement = document.createElement("div");
      rowElement.classList.add("container-row");
      for(let cols = 0; cols < height; cols++) {
        const gridElement = createGrid();
        rowElement.appendChild(gridElement);
      }
      containerElement.appendChild(rowElement);
    }
  }
}

function createGrid() {
  let gridElement = document.createElement("div");
  let gridElementStyle = gridElement.style;
  gridElementStyle.width = `${GRID_WIDTH}px`;
  gridElementStyle.height = `${GRID_HEIGHT}px`;
  gridElement.classList.add("grid");
  return gridElement;
}

document.addEventListener("DOMContentLoaded", function() {
  generateGrid(16, 16);
})