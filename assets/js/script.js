let imgInput, img, images = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  imgInput = createFileInput(onHandleImage)
  imgInput.position(width/2, height/2)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  image(img, (width / 2) - (img.width / 2), (height / 2) - (img.height / 2))
}

function draw() {
  clear()
  if(images.length > 0) {
    for(let i = 0; i < images.length; i++) {
      image(images[i], i * images[i].width, height - images[i].height - 100)
    }
  }
}

function onHandleImage(file) {
  if(file.type == "image") {
    // imgInput.class("hide")
    images = []
    loadImage(file.data, e => {
      img = e
      img.width = 500
      img.height = 500
      images = sliceImages(img, 3)
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
      imgPieces.push(image)
    }
  }
  return imgPieces
}