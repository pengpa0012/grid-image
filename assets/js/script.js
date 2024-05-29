let imgInput, img, images = [], dragging

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
    for(let i = 0; i < images.length; i++) {
      if (images[i].dragging) {
        images[i].posX = mouseX + images[i].offsetX
        images[i].posY = mouseY + images[i].offsetY
      }
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
        images[i].dragging = true
        images[i].offsetX = images[i].posX - mouseX
        images[i].offsetY = images[i].posY - mouseY
      }
    }
  }
}

function mouseReleased() {
  for(let i = 0; i < images.length; i++) {
    images[i].dragging = false
  }
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