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

/* function getFlatRandomImageArr(width, height) {
    let lineArr = []
    let imageArr = []
    for(let p = 0; p < width * height; p += 1) {
        let rgbArr = [
            Math.sin(Math.random()+p)*255, 
            Math.tanh(Math.random()+p)*255, 
            Math.cos(Math.random()-p)*255,
            Math.random()*255,
        ]
        lineArr.push(rgbArr)
        if(lineArr.length === width) {
            imageArr.push(lineArr)
            lineArr = []
        }
    }
    
    var flatImageArr = imageArr.flat(Infinity)
    return flatImageArr;
} */


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