window.onload = function() {
    let canvas = document.getElementById('board');
    let context = canvas.getContext('2d');

    let hoverColorTextBox = document.getElementById('hoveredColor');
    let clickedColorTextBox = document.getElementById('clickedColor');

    let image = new Image();
    image.src = 'assets/images/image.jpg';

    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);
    }

    canvas.addEventListener('mousemove', function(e){
        getAndDisplayColor(e, hoverColorTextBox);
    })
    canvas.addEventListener('click', function(e){
        getAndDisplayColor(e, clickedColorTextBox);
    })

    function getAndDisplayColor(e, destination){
        let x = e.offsetX;
        let y = e.offsetY;

        let pixel = context.getImageData(x, y, 1, 1);

        let r = pixel.data[0];
        let g = pixel.data[1];
        let b = pixel.data[2];

        let color = `rgb(${r}, ${g}, ${b})`;
        destination.style.backgroundColor = color;
    }
}