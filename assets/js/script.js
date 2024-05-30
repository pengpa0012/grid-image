let imgInput, img, images = [], dragging, draggingImg, draggingOffsetX, draggingOffsetY

function setup() {
  createCanvas(windowWidth, windowHeight)
  imgInput = createFileInput(onHandleImage)
  imgInput.position(width/2, height/2)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  clear()
  if(images.length > 0) {
    generateGrid(5)
    for(let i = 0; i < images.length; i++) {
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
   draggingImg = null
}

function onHandleImage(file) {
  if(file.type == "image") {
    imgInput.class("hide")
    images = []
    loadImage(file.data, e => {
      img = e
      img.width = 500
      img.height = 500
      images = sliceImages(img, 5)
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
      rect((((width / 2) - 100) + x) - 100, (((height / 2) - 100) + y) - 100, cellSize, cellSize)
    }
  }
}