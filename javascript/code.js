
const btnRunModel = document.querySelector("#btn_run_model");
const inputImageCar = document.querySelector("#input_car_image");
const canvasImg = document.querySelector("#canvas_img");
const classificationText = document.querySelector(".classification");

const ctx = canvasImg.getContext("2d");

var model = null;
var validFiles = ["image/jpeg", "image/png"];
(async ()=> {
    console.log("Cargando modelo ...")
    model = await tf.loadLayersModel("./models/model3/model.json")
    console.log("Modelo cargado ...")
    model.summary()
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

function getImageArr(ctx, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height).data
    
    let lineArr = []
    let imageArr = []
    for(let p = 0; p < imageData.length; p += 4) {
        let r= imageData[p+0] /255.0
        let g= imageData[p+1] /255.0
        let b= imageData[p+2] /255.0
        //let a= imageData[p+3] /255.0
        let rgbArr = [r, g, b]
        lineArr.push(rgbArr)
        if(lineArr.length === width) {
            imageArr.push(lineArr)
            lineArr = []
        }
    }
    return imageArr;
}

btnRunModel.addEventListener("click", ()=> {

    var imageArr = getImageArr(ctx, 150, 150)
    var imageTensor = tf.tensor4d([imageArr], [1, 150, 150, 3], "float32")
    var results = model.predict(imageTensor).dataSync()

    var mayorIndice = results.indexOf(Math.max.apply(Math, results))
    var class_names = [
        "Audi",
        "Hyundai Creta",
        "Mahindra Scorpio",
        "Rolls Royce",
        "Swift",
        "Tata safari",
        "Toyota Innova"
    ]

    classificationText.textContent = class_names[mayorIndice]
})