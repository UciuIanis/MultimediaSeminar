window.onload = function() {
    let video = document.getElementById('video');
    let copyCanvas = document.getElementById('copyCanvas');
    let copyContext = copyCanvas.getContext('2d');

    let replaceCanvas = document.getElementById('replaceCanvas');
    let replaceContext = replaceCanvas.getContext('2d');

    let sepiaCanvas = document.getElementById('sepiaCanvas');
    let sepiaContext = sepiaCanvas.getContext('2d');

    let inverseCanvas = document.getElementById('inverseCanvas');
    let inverseContext = inverseCanvas.getContext('2d');

    copyCanvas.width = video.clientWidth;
    copyCanvas.height = video.clientHeight;

    replaceCanvas.width = video.clientWidth;
    replaceCanvas.height = video.clientHeight;

    sepiaCanvas.width = video.clientWidth;
    sepiaCanvas.height = video.clientHeight;

    inverseCanvas.width = video.clientWidth;
    inverseCanvas.height = video.clientHeight;

    video.addEventListener('play', function(){
        draw();
    })

    function draw(){
        drawCopyCanvas();
        drawReplaceCanvas();
        drawSepiaCanvas();
        drawInverseCanvas();

        requestAnimationFrame(draw);
    }

    function drawCopyCanvas(){
        copyContext.drawImage(video, 0, 0, copyCanvas.width, copyCanvas.height);
        // setTimeout(function(){
        //     drawCopyCanvas();
        // }, 0);
    }

    function drawReplaceCanvas(){
        let imageData = copyContext.getImageData(0, 0, copyCanvas.width, copyCanvas.height);
        // console.log(imageData);

        for (let i = 0; i < imageData.data.length; i+=4){
            let red = imageData.data[i];
            let green = imageData.data[i+1];
            let blue = imageData.data[i+2];
            let alpha = imageData.data[i+3];

            if(between(red, 50, 118) && between(green, 150, 210) && between(blue, 25, 80)){
                imageData.data[i] = 0;
                imageData.data[i+1] = 0;
                imageData.data[i+2] = 255;
            }
        }

        replaceContext.putImageData(imageData, 0, 0);
    }

    function drawSepiaCanvas(){
        let imageData = copyContext.getImageData(0, 0, copyCanvas.width, copyCanvas.height);
        for (let i = 0; i < imageData.data.length; i+=4){
            let red = imageData.data[i];
            let green = imageData.data[i+1];
            let blue = imageData.data[i+2];
            let alpha = imageData.data[i+3];

            imageData.data[i] = Math.min(255, red * 0.393 + green * 0.769 + blue * 0.189);
            imageData.data[i+1] = Math.min(255, red * 0.349 + green * 0.686 + blue * 0.168);
            imageData.data[i+2] = Math.min(255, red * 0.272 + green * 0.534 + blue * 0.131);
        }
        sepiaContext.putImageData(imageData, 0, 0);
    }

    function drawInverseCanvas(){
        let imageData = copyContext.getImageData(0, 0, copyCanvas.width, copyCanvas.height);
        for (let i = 0; i < imageData.data.length; i+=4){
            let red = imageData.data[i];
            let green = imageData.data[i+1];
            let blue = imageData.data[i+2];
            let alpha = imageData.data[i+3];

            imageData.data[i] = 255 - red;
            imageData.data[i+1] = 255 - green;
            imageData.data[i+2] = 255 - blue;
        }
        inverseContext.putImageData(imageData, 0, 0);
    }

    function between(x, min, max) {
        return x >= min && x <= max;
    }
    
}