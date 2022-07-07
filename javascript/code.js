
const btnRunModel = document.querySelector("#btn_run_model");
const inputImageCar = document.querySelector("#input_car_image");
const canvasImg = document.querySelector("#canvas_img");
const classificationText = document.querySelector(".classification");

const containerMain = document.querySelector(".container")
const loadingMsg = document.querySelector(".loading_msg");

const ctx = canvasImg.getContext("2d");

var model = null;
var defaultImageData = []
var validFiles = ["image/jpeg", "image/png"];
(async ()=> {
    console.log("Cargando modelo ...")
    model = await tf.loadLayersModel("./models/model3/model.json")
    
    console.log("Modelo cargado ...")
    model.summary()

    /* var flatImageArr = getFlatRandomImageArr(150, 150);
    var buffer = new Uint8ClampedArray(flatImageArr);
    var imageData = ctx.createImageData(150,150)
    imageData.data.set(buffer)
    console.log(buffer)
    ctx.putImageData(imageData, 0, 0) */

    var imageArr = getTestImageArr(150, 150);
    var pred = makePrediction(imageArr, model)
    console.log(pred)

    containerMain.classList.remove("hidden")
    loadingMsg.classList.add("hidden")
})();

inputImageCar.addEventListener("change", async ()=> {
    let file = inputImageCar.files[0]
    if(!validFiles.includes(file.type)) return
    let dataUrl = URL.createObjectURL(file)
    let img = new Image()
    img.onload = ()=> {
        ctx.drawImage(img, 0, 0, 150, 150)
    }
    img.src = dataUrl;
    classificationText.textContent = "..."
})

btnRunModel.addEventListener("click", ()=> {
    var imageArr = getImageArr(ctx, 150, 150)

    var pred = makePrediction(imageArr, model)
    
    classificationText.textContent = pred
})