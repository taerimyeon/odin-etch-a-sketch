const GRID_WIDTH = 20; // In pixel
const GRID_HEIGHT = 20; // In pixel

function generateGrid(width, height) {
  let containerElement = document.getElementById("container");
  if (containerElement) {
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