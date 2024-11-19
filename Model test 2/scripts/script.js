window.onload = function () {
    let canvas = document.getElementById("canvas");
    let input = document.getElementById("numberInput");
    let btn = document.getElementById("btn");
    let ctx = canvas.getContext("2d");
    let alert = document.getElementById("alert");
    
    btn.addEventListener("click", function () {
        let n = input.value;
        if (n > 10 || n < 1) {
            alert.style.display = "block";
        }
        else {
            alert.style.display = "none";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let colors = ["red", "blue"];
            let c = 0;
            for (let i = n; i > 0; i--) {
                ctx.beginPath();
                if (i == 1) {
                    ctx.fillStyle = "yellow";
                }
                else {
                    ctx.fillStyle = colors[c];
                    c = !c+0;
                }
                ctx.arc(canvas.width / 2, canvas.height / 2, 30 * i, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    });
}