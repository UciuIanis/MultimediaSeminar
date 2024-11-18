//canvas API: drawing line charts
//CANVAS ORIGIN POINT IS TOP LEFT
window.onload = function (){
    //DOM reference
    let canvas = document.getElementById("chartCanvas")
    //get context of canvas, this is how we draw
    let context = canvas.getContext('2d')

    //styling only resizes canvas, while context remains the same
    let width = canvas.width
    let height = canvas.height

    let xIncrement = 150
    let yIncrement = 100

    let data = []

    function generateRandomNumber(){
        return parseInt(Math.random() * height)
    }
    //generate graph data
    for(let i = 0; i <=width/20; i++){
        data[i] = generateRandomNumber()
    }
    
    function drawHorizontalLines(){
        //color of lines
        context.strokeStyle = '#777'
        context.lineWidth = 1
        for(let i = yIncrement; i < height; i+=yIncrement){
            context.beginPath()
            context.moveTo(0, i)
            context.lineTo(width, i)
            context.stroke()
        }
    }

    function drawVerticalLines(){
        context.strokeStyle = '#777'
        context.lineWidth = 1
        for(let i = xIncrement; i < width; i+=xIncrement){
            context.beginPath()
            context.moveTo(i, 0)
            context.lineTo(i, height)
            context.stroke()
        }
    }

    function drawLineChart(){
        context.strokeStyle = "red"
        context.lineWidth = 2
        context.beginPath()
        //subtract from height because of the way the canvas draws
        context.moveTo(0, height-data[0])
        for(let i = 1; i < data.length; i++){
            context.lineTo(i*20, height-data[i])
        }
        context.stroke()
    }

    let drawNumbersYAxis = () =>{
        for(i = yIncrement; i <= height; i+=yIncrement){
            context.fillText(height-i, 5, i-5)
        }
    }

    let drawNumbersXAxis = () =>{
        for(let i = xIncrement; i < width; i+=xIncrement){
            context.fillText(i, i+5, height-5)
        }
    }



    function clearCanvas(){
        context.clearRect(0, 0, width, height)
    }
    
    function drawChart(){
        //draw horizontal lines
        drawHorizontalLines()
        //draw vertical lines
        drawVerticalLines()
        //horizontal numbers
        drawNumbersYAxis()
        //vertical numbers
        drawNumbersXAxis()
        //draw line chart
        drawLineChart()
    }

    setInterval(function(){
        let newNumber = generateRandomNumber()
        data.push(newNumber)
        data.shift()
        clearCanvas()
        drawChart()
    }, 1000)

    drawChart()
}

