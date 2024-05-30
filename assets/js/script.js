let imgInput, img, images = [], dragging, draggingImg, draggingOffsetX, draggingOffsetY, gridCells = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  imgInput = createFileInput(onHandleImage)
  imgInput.position((width/2) - (imgInput.width / 2), height/2)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  clear()
  if(gridCells.length > 0) {
    for(let i = 0; i < gridCells.length; i++) {
      rect(gridCells[i].posX, gridCells[i].posY, gridCells[i].size, gridCells[i].size)
    }
  }
  if(images.length > 0) {
    for(let i = 0; i < images.length; i++) {
      stroke(0)
      rect(images[i].posX, images[i].posY, images[i].width, images[i].height)
      image(images[i], images[i].posX, images[i].posY)
    }
  }
}


function mousePressed() {
  if(images.length > 0) {
    for(let i = 0; i < images.length; i++) {
      if (
        mouseX > images[i].posX && 
        mouseX < images[i].posX + images[i].width && 
        mouseY > images[i].posY && 
        mouseY < images[i].posY + images[i].height
      ) {
        draggingImg = images[i]
        draggingOffsetX = draggingImg.posX - mouseX
        draggingOffsetY = draggingImg.posY - mouseY

        images.splice(i, 1)
        images.push(draggingImg)
        break
      }
    }
  }
}

function mouseDragged() {
  if (draggingImg) {
    draggingImg.posX = draggingOffsetX + mouseX
    draggingImg.posY = draggingOffsetY + mouseY
  }
}

function mouseReleased() {
  if(gridCells.length > 0) {
    for(let i = 0; i < gridCells.length; i++) {
      if (
        mouseX > gridCells[i].posX && 
        mouseX < gridCells[i].posX + gridCells[i].size && 
        mouseY > gridCells[i].posY && 
        mouseY < gridCells[i].posY + gridCells[i].size
      ) {
        // change the curr dragging image to closest cell
        draggingImg.posX = gridCells[i].posX
        draggingImg.posY = gridCells[i].posY
      }
    }
  }
  draggingImg = null
}

function onHandleImage(file) {
  if(file.type == "image") {
    imgInput.class("hide")
    images = []
    loadImage(file.data, e => {
      img = e
      img.resize(500, 500)
      images = sliceImages(img, 5)
      generateGrid(5)
    })
  } else {
    imgInput.elt.value = ""
    alert("Wrong file type")
  }
}

// generate img pieces
function sliceImages(img, dimension) {
  let imgPieces = []
  const cellSize = img.width / dimension
  for(let i = 0; i < dimension; i++) {
    for(let j = 0; j < dimension; j++) {
      const x = j * cellSize
      const y = i * cellSize
      let image = img.get(x, y, cellSize, cellSize)
      const posX = random(0, width - img.width)
      const posY = random(0, height - (img.height - 100))
      imgPieces.push({...image, posX, posY})
    }
  }
  return imgPieces
}

function generateGrid(dimension) {
  const cellSize = (dimension * 100) / dimension
  for(let i = 0; i < dimension; i++) {
    for(let j = 0; j < dimension; j++) {
      const x = j * cellSize
      const y = i * cellSize
      gridCells.push({posX: (((width / 2) - 100) + x) - 100, posY: (((height / 2) - 100) + y) - 100, size: cellSize})
    }
  }
}