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