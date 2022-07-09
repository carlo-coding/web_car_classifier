
const btnRunModel = document.querySelector("#btn_run_model");
const inputImageCar = document.querySelector("#input_car_image");
const canvasImg = document.querySelector("#canvas_img");
const bigCanvas = document.querySelector("#big_canvas");
const classificationText = document.querySelector(".classification");
const addNoiseBtn = document.querySelector("#add_noise_btn");

const containerMain = document.querySelector(".container")
const loadingMsg = document.querySelector(".loading_msg");

const ctx = canvasImg.getContext("2d");
const ctxBig = bigCanvas.getContext("2d");

var model = null;
var defaultImageData = [];
//var validFiles = ["image/jpeg", "image/png"];
(async ()=> {
    console.log("Cargando modelo ...")
    model = await tf.loadLayersModel("./models/model3/model.json")
    
    console.log("Modelo cargado ...")
    model.summary()

    var imageArr = getTestImageArr(canvasImg.width, canvasImg.height);
    var pred = makePrediction(imageArr, model)
    console.log(pred)

    containerMain.classList.remove("hidden")
    loadingMsg.classList.add("hidden")
})();

inputImageCar.addEventListener("change", async ()=> {
    let file = inputImageCar.files[0]
    //if(!validFiles.includes(file.type)) return
    let dataUrl = URL.createObjectURL(file)
    let img = new Image()
    img.onload = ()=> {
        ctx.drawImage(img, 0, 0, canvasImg.width, canvasImg.height)
        ctxBig.drawImage(img, 0, 0, bigCanvas.width, bigCanvas.height)
    }
    img.src = dataUrl;
    classificationText.textContent = "..."
})

btnRunModel.addEventListener("click", ()=> {
    var imageArr = getImageArr(ctx, canvasImg.width, canvasImg.height)

    var pred = makePrediction(imageArr, model)
    
    classificationText.textContent = pred
})

addNoiseBtn.addEventListener("click", ()=> {
    addNoiseToImage(ctx, canvasImg.width, canvasImg.height);
    addNoiseToImage(ctxBig, bigCanvas.width, bigCanvas.height);
})