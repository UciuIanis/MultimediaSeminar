window.onload = function() {
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    let pieceSize =20;
    let snake = [{x: 400, y: 300}, {x: 400+pieceSize, y: 300}, {x: 400+2*pieceSize, y: 300}];
    let width = canvas.width;
    let height = canvas.height;
    let pieceX = width/pieceSize;
    let pieceY = height/pieceSize;
    let food = generateFood();

    drawSnake();

    function drawSnake() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "green";
        snake.forEach(piece => {
            ctx.strokeRect(piece.x, piece.y, pieceSize, pieceSize);
            ctx.fillRect(piece.x, piece.y, pieceSize, pieceSize);
        });
    }

    

    function generateFood(){
        let xCoord = Math.floor(Math.random()*pieceX)*pieceSize;
        let yCoord = Math.floor(Math.random()*pieceY)*pieceSize;

        return {x: xCoord, y: yCoord};
    }

    function drawFood(){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, pieceSize, pieceSize);
        ctx.strokeRect(food.x, food.y, pieceSize, pieceSize);
    }

    let direction = "left";

    function generateNewPiece(){
        if(direction==="left"){
            return {x: snake[0].x-pieceSize, y: snake[0].y};
        }
        if(direction==="right"){
            return {x: snake[0].x+pieceSize, y: snake[0].y};
        }
        if(direction==="up"){
            return {x: snake[0].x, y: snake[0].y-pieceSize};
        }
        if(direction==="down"){
            return {x: snake[0].x, y: snake[0].y+pieceSize};
        }
    }

    setInterval(function(){
        //generate element, add it as first element of snake, remove last element, draw snake
        let generatedPiece = generateNewPiece();
        let lastPiece = snake[snake.length-1];
        for (let i = snake.length-1; i > 0; i--) {
            snake[i] = snake[i-1];
        }
        snake[0] = generatedPiece;

        for (let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                alert("Game Over");
                snake = [{x: 400, y: 300}, {x: 400+pieceSize, y: 300}, {x: 400+2*pieceSize, y: 300}];
                direction = "left";
                food = generateFood();
                break;
            }
        }

        if(snake[0].x === food.x && snake[0].y === food.y){
            snake.push(lastPiece);
            food = generateFood();
        }
        drawSnake();
        drawFood();
        ok = true;
    }, 150);

    let ok = true;

    document.addEventListener("keydown", function(e){
        //up = 38, down = 40, left = 37, right = 39
        if(ok){
            if(e.keyCode === 37){
                if(direction !== "right"){
                    direction = "left";
                }
            }
            if(e.keyCode === 38){
                if(direction !== "down"){
                    direction = "up";
                }
            }
            if(e.keyCode === 39){
                if(direction !== "left"){
                    direction = "right";
                }
            }
            if(e.keyCode === 40){
                if(direction !== "up"){
                    direction = "down";
                }
            }
            ok = false;
        }
    });
}