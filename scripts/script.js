const CONTAINER_DIMENSION = 640; // In pixel
const GRID_OVERLAY_COLOR = "#00FFFF"; // Cyan
const GRID_BACKGROUND_COLOR = "#000000" // Black
const GRID_OPACITY_INCREMENT_RATE = 10; // In percentage
let GRID_DATA = {}; // Stores the grid information (to determine if a grid is already clicked or not)

function generateGrid(numberOfGrids) {
  let gridDimension = Math.floor(CONTAINER_DIMENSION/numberOfGrids);
  let containerElement = document.getElementById("container");
  if (containerElement) {
    for(let rows = 0; rows < numberOfGrids; rows++) {
      let rowElement = document.createElement("div");
      rowElement.id = `r${rows+1}`;
      rowElement.classList.add("container-row");
      for(let cols = 0; cols < numberOfGrids; cols++) {
        const gridElement = createGrid(gridDimension);
        gridElement.id = `r${rows+1}-c${cols+1}`;
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
  if (GRID_DATA[event.target.id] !== undefined && GRID_DATA[event.target.id].opacity < 100) {
    event.target.style.opacity = "100%";
  }
}

function unsetOverlay(event) {
  if (GRID_DATA[event.target.id] !== undefined) {
    event.target.style.backgroundColor = GRID_DATA[event.target.id].backgroundColor;
    event.target.style.opacity = `${GRID_DATA[event.target.id].opacity}%`;
  } else {
    event.target.style.backgroundColor = "";
  }
}

function setColor(event) {
  if (GRID_DATA[event.target.id]) {
    let targetOpacity = GRID_DATA[event.target.id].opacity;
    if (targetOpacity < 100) {
      targetOpacity += GRID_OPACITY_INCREMENT_RATE;
    }
    event.target.style.opacity = `${targetOpacity}%`;
  } else {
    event.target.style.opacity = `${GRID_OPACITY_INCREMENT_RATE}%`;
  }
  GRID_DATA[event.target.id] = {
    backgroundColor: GRID_BACKGROUND_COLOR,
    opacity: parseFloat(event.target.style.opacity)*100
  };
  event.target.style.backgroundColor = GRID_DATA[event.target.id].backgroundColor;
}

function reinitializeGrid(event) {
  event.preventDefault();
  let numberOfGrids = prompt("How many grids to generate (max 100)?", 16);
  if (numberOfGrids !== null) {
    numberOfGrids = parseInt(numberOfGrids)
    if (isNaN(numberOfGrids)) {
      alert("Please enter valid number (between 1 to 100)");
      return
    }
    if (parseInt(numberOfGrids) > 100) {
      alert(`Can't generate more than 100 grids!`);
      return
    }
    destroyExistingGrid();
    generateGrid(numberOfGrids);
  }
}

function createGrid(gridDimension) {
  let gridElement = document.createElement("div");
  let gridElementStyle = gridElement.style;
  gridElementStyle.width = `${gridDimension}px`;
  gridElementStyle.height = `${gridDimension}px`;
  gridElement.classList.add("grid");
  return gridElement;
}

function destroyExistingGrid() {
  let rowElements = document.getElementsByClassName("container-row");
  let rowElementsCount = rowElements.length;
  for (let idx = rowElementsCount-1; idx >= 0; idx--) {
    rowElements[idx].remove();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let reinitializeButtonElement = document.getElementById("button-reinitialize-grid");
  reinitializeButtonElement.addEventListener("click", reinitializeGrid);
  generateGrid(16);
})