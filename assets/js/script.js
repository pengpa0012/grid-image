let imgInput, img

function setup() {
  createCanvas(windowWidth, windowHeight)
  imgInput = createFileInput(onHandleImage)
  imgInput.position(width/2, height/2)
}

function onHandleImage(file) {
  if(file.type == "image") {
    imgInput.class("hide")
    loadImage(file.data, e => {
      img = image(e, (width/2) - (e.width / 2), (height/2) - (e.height / 2))
    })
  } else {
    imgInput.elt.value = ""
    alert("Wrong file type")
  }
}
