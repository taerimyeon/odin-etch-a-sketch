const CONTAINER_DIMENSION = 640; // In pixel
const GRID_OVERLAY_COLOR = "#00FFFF"; // Cyan
const GRID_BACKGROUND_COLOR = "#000000" // Black
let GRID_DATA = {}; // Stores the grid information (to determine if a grid is already clicked or not)

function generateGrid(numberOfGrids) {
  let gridDimension = Math.floor(CONTAINER_DIMENSION/numberOfGrids);
  let containerElement = document.getElementById("container");
  if (containerElement) {
    for(let rows = 0; rows < numberOfGrids; rows++) {
      let rowElement = document.createElement("div");
      rowElement.classList.add("container-row");
      for(let cols = 0; cols < numberOfGrids; cols++) {
        const gridElement = createGrid(gridDimension);
        gridElement.id = `${rows}-${cols}`;
        gridElement.addEventListener("mouseenter", setOverlay);
        gridElement.addEventListener("mouseleave", unsetOverlay);
        gridElement.addEventListener("click", setColor);
        rowElement.appendChild(gridElement);
      }
      containerElement.appendChild(rowElement);
    }
  }
}

function setOverlay(event) {
  event.target.style.backgroundColor = GRID_OVERLAY_COLOR;
}

function unsetOverlay(event) {
  if (GRID_DATA[event.target.id] !== undefined) {
    event.target.style.backgroundColor = GRID_DATA[event.target.id].backgroundColor;
  } else {
    event.target.style.backgroundColor = "";
  }
}

function setColor(event) {
  GRID_DATA[event.target.id] = {
    backgroundColor: GRID_BACKGROUND_COLOR
  };
  event.target.style.backgroundColor = GRID_DATA[event.target.id].backgroundColor;
}

function createGrid(gridDimension) {
  let gridElement = document.createElement("div");
  let gridElementStyle = gridElement.style;
  gridElementStyle.width = `${gridDimension}px`;
  gridElementStyle.height = `${gridDimension}px`;
  gridElement.classList.add("grid");
  return gridElement;
}

document.addEventListener("DOMContentLoaded", function() {
  generateGrid(16);
})