document.addEventListener('DOMContentLoaded', function () {
    let cardFlip = 0
    const cardArray = []
    const containerDiv = document.getElementsByClassName("grid-container")[0]
    const score = document.getElementById("score")
    
    startGame()
    
    function startGame() {
        
        fetch("http://localhost:3000/api/v1/cards")
        .then(resp => resp.json())
        .then(cards => {
            
            const doubledCards = [...cards, ...cards]
            
            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            }
            
            shuffle(doubledCards);
            let currentScore = score.innerText.split(" ")[1]
            let numScore = parseInt(currentScore)
            numScore = 0 
            score.innerText = `Score: ${numScore}`
            
            containerDiv.innerHTML = ""
            doubledCards.forEach(card => {
                const littleDiv = document.createElement('div');
                const image = document.createElement('img');
                littleDiv.setAttribute('class', 'grid-item');
                littleDiv.dataset.id = card.id;
                image.setAttribute('class', 'card-image');
                image.src = "https://image.freepik.com/free-vector/vector-creativity-concept-brain-light-bulb_106427-92.jpg"
                littleDiv.appendChild(image)
                containerDiv.appendChild(littleDiv)
                
                littleDiv.addEventListener("click", function (e) {
                    if (parseInt(counter.innerText) > 0) {
                        if (cardFlip < 2) {
                            e.target.src = card.imageUrl
                            if (cardArray[0] !== event.target) {
                                cardArray.push(event.target)
                                cardFlip++
                            }
                        }
                        if (cardFlip === 2) {
                            cardCheck()
                            
                        }
                    }
                })
                
            })
        })
    }
    
    function cardCheck() {
        if (cardArray[0].parentElement.dataset.id === cardArray[1].parentElement.dataset.id) {
            setTimeout(function () {
                cardArray[0].parentElement.innerHTML = ""
                cardArray[1].parentElement.innerHTML = ""
                
                cardFlip = 0
                cardArray.length = 0
                scoreKeeper()
            }, 1000);
        } else {
            setTimeout(function () {
                cardArray[0].src = "https://image.freepik.com/free-vector/vector-creativity-concept-brain-light-bulb_106427-92.jpg"
                cardArray[1].src = "https://image.freepik.com/free-vector/vector-creativity-concept-brain-light-bulb_106427-92.jpg"
                
                cardFlip = 0
                cardArray.length = 0
            }, 1000);
        }
    }
    
    const counter = document.getElementById("counter")
    let timer = setInterval(decrementCounter, 1000)
    
    function decrementCounter() {
        let currentSec = counter.innerText
        let numSec = parseInt(currentSec)
        numSec = numSec - 1
        counter.innerText = numSec
        
        if (parseInt(counter.innerText) < 1) {
            gameOver()
        }
    }
    
    function scoreKeeper() {
        let currentScore = score.innerText.split(" ")[1]
        let numScore = parseInt(currentScore)
        numScore += 10
        score.innerText = `Score: ${numScore}`
    }
    
    let popUp = document.getElementById('light')
    
    function gameOver() {
        clearInterval(timer)
        popUp.style.display = 'block';
        let currentScore = score.innerText.split(" ")[1]
        let numScore = parseInt(currentScore)
        popUp.innerText = `Game Over! :( Your score was ${numScore}. 
            Would you like to play again?
            Press "R" to restart.`
        }
        
        function restart() {
            popUp.style.display = "none"
            counter.innerText = 22
            timer = setInterval(decrementCounter, 1000)
            startGame()
        }
        
        
        document.addEventListener('keydown', function (event) {
            if (event.target.key = "r") {
                if (parseInt(counter.innerText) < 1) {
                    restart() 
                }
            }
        })
        
        // const topScores = document.getElementById('leaderboard')

        
    })
    
    