document.addEventListener('DOMContentLoaded', function () {
    let cardFlip = 0
    const cardArray = []
    const containerDiv = document.getElementsByClassName("grid-container")[0]

    fetch("http://localhost:3000/api/v1/cards")
        .then(resp => resp.json())
        .then(cards => {

            const doubledCards = [...cards, ...cards]

            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            }

            shuffle(doubledCards);

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
                    if (cardFlip < 2) {
                        e.target.src = card.imageUrl
                        cardArray.push(event.target)
                    }
                    cardFlip++
                    if (cardFlip === 2) {
                        cardCheck()

                    }
                })

            })
        })

    function cardCheck() {
        if (cardArray[0].parentElement.dataset.id === cardArray[1].parentElement.dataset.id) {
            setTimeout(function () {
            cardArray[0].parentElement.innerHTML = ""
            cardArray[1].parentElement.innerHTML = ""

            cardFlip = 0
            cardArray.length = 0
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
        gameOver()
     }

     function gameOver() {
        if (parseInt(counter.innerText) < 1) {
            clearInterval(timer)
        }

     }



})


