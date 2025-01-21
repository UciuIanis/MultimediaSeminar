window.onload = function(){
    let canvas = document.getElementById('board')
    let context = canvas.getContext('2d')

    let listenButton = document.getElementById('listen')
    let guessInput = document.getElementById('guess')
    let submitButton = document.getElementById('submit')

    let number = parseInt(Math.random() *100)
    console.log(number)

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    let recognizer = new SpeechRecognition()
    recognizer.lang = 'en-US'
    recognizer.maxAlternatives = 1

    let synth = window.speechSynthesis

    submitButton.addEventListener('click', ()=>{
        let value = guessInput.value
        console.log(value)
        play(value)
    })

    listenButton.addEventListener('click', ()=>{
        recognizer.start()
    })

    recognizer.onresult = function(e){
        let value = e.results[0][0].transcript
        console.log(value)
        play(value)
    }

    function play(value){
        value = parseInt(value)
        if(value == number){
            //guessed
            context.fillStyle = 'blue'
            context.fillRect(value * canvas.width/100, 0, canvas.width/100, canvas.height)
            let utterance = new SpeechSynthesisUtterance('You won')
            synth.speak(utterance)
        }
        else{
            if(value < number){
                //color left
                context.fillStyle = 'red'
                context.fillRect(0, 0, (value+1)*canvas.width/100, canvas.height)
                let utterance = new SpeechSynthesisUtterance('higher')
                synth.speak(utterance)
            }
            else{
                //color right
                context.fillStyle = 'red'
                context.fillRect(value*canvas.width/100, 0, canvas.width-(value*canvas.width/100), canvas.height)
                let utterance = new SpeechSynthesisUtterance('lower')
                synth.speak(utterance)
            }
        }

    }
}