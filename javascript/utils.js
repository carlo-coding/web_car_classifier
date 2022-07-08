function getImageArr(ctx, width, height) {
    let imageData = ctx.getImageData(0, 0, width, height).data
    
    let lineArr = []
    let imageArr = []
    for(let p = 0; p < imageData.length; p += 4) {


        let r= imageData[p+0] /255.0
        let g= imageData[p+1] /255.0
        let b= imageData[p+2] /255.0

        let rgbArr = [r, g, b]
        lineArr.push(rgbArr)
        if(lineArr.length === width) {
            imageArr.push(lineArr)
            lineArr = []
        }
    }
    return imageArr;
}

function getTestImageArr(width, height) {
    let lineArr = []
    let imageArr = []
    for(let p = 0; p < width * height; p += 1) {
        let rgbArr = [0, 0, 0]
        lineArr.push(rgbArr)
        if(lineArr.length === width) {
            imageArr.push(lineArr)
            lineArr = []
        }
    }
    return imageArr;
}


const noiseColor = (color, ratio) => Math.floor(ratio*(color) + (1-ratio)*(Math.random()*255))

function addNoiseToImage(ctx, width, height) {
    let pixVals = ctx.getImageData(0, 0, width, height).data
    let flatArray = []

    let ratio = 0.9

    for(let p = 0; p < pixVals.length; p += 1) {
        flatArray.push(noiseColor(pixVals[p], ratio))
    }

    var imageData = ctx.createImageData(width,height)
    imageData.data.set(new Uint8ClampedArray(flatArray))
    ctx.putImageData(imageData, 0, 0)
}


function makePrediction(imageArr, model) {
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

    return class_names[mayorIndice]
}