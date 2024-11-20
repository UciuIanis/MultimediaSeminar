window.onload = function () {
    let canvas = document.getElementById("canvas");
    let num = document.getElementById("numInput");
    let btn = document.getElementById("btn");
    let alert = document.getElementById("alert");
    let ctx = canvas.getContext('2d');

    btn.addEventListener('click', function () {
        let n = num.value;
        if (n < 1 || n > 10) {
            alert.style.display = "block";
        }
        else {
            alert.style.display = "none";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let colors = ['red', 'yellow', 'green', 'blue', 'purple', 'magenta'];
            width = canvas.width;
            height = canvas.height;
            for (let i = n; i > 0; i--) {
                ctx.beginPath();
                ctx.fillStyle = colors[(i - 1)%colors.length];
                let size = i*20;
                ctx.fillRect((width - size) / 2, (height - size) / 2, size, size);
            }
        }
    })
}