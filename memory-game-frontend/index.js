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
                    containerDiv.dataset.id = card.card_set_id
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
        popUp.innerHTML = `<h2><strong>Game Over! <br>
            Your score was ${numScore}. </h2><br>
            
      <form class="score" style="">
        <h3>Enter your name:</h3>
        <input id="username" type="text" name="username" value="" class="input-text">
        <br>
        <input id="submit" type="submit" name="submit" value="Submit" class="submit">
        </form>`

        const form = document.getElementsByClassName("score")[0]
        form.addEventListener("submit", function (e) {
            e.preventDefault()
            let name = e.target.username.value
            let score = parseInt(e.target.parentElement.parentElement.children[0].innerText.split(' ')[4])
            cardSetId = parseInt(e.target.parentElement.parentElement.parentElement.children[4].dataset.id)
                fetch("http://localhost:3000/api/v1/games", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        "username": name,
                        "score": score,
                        "card_set_id": cardSetId
                    })
                }).then(() => leaderBoard())
                
        })
    }

        let leaderboardPopUp = document.getElementById('leaderboard')
        const leaderDiv = document.createElement('div');
    function leaderBoard () {
        fetch("http://localhost:3000/api/v1/games")
            .then(resp => resp.json())
            .then(games => {
                leaderboardPopUp.style.display = 'block';
                
                const hideButton = document.createElement('button');
                hideButton.setAttribute("id", "hide")
                hideButton.innerText = "X"
                leaderDiv.appendChild(hideButton)
                const h3 = document.createElement("h3");
                h3.innerText = "TOP SCORES"
                leaderDiv.appendChild(h3);
                const ol = document.createElement('ol');

                hideButton.addEventListener("click", function(e){
                    leaderboardPopUp.style.display = 'none'
                })


                games.forEach(game => {
                    const li = document.createElement('li');
                    li.innerText = `Name: ${game.username},     Score: (${game.score})`
                    const deleteButton = document.createElement('button');
                    deleteButton.setAttribute("id", "delete")
                    deleteButton.innerText = "Delete"
                    deleteButton.dataset.id = game.id

                    deleteButton.addEventListener("click", function(e){
                        deleteButton.parentNode.remove() 
                        fetch(`http://localhost:3000/api/v1/games/${deleteButton.dataset.id}`, {
                            method: "DELETE"
                        }).then(() => {
                            leaderDiv.innerHTML = ""
                            leaderBoard()

                        })
                        // .then(resp=>resp.json())
                        // .then(data => console.log(data))


                    })
                    li.appendChild(deleteButton)
                    ol.appendChild(li)
                })
                leaderDiv.appendChild(ol)
                leaderboardPopUp.appendChild(leaderDiv)
            })
    }



    topScores = document.querySelector("a")

    topScores.addEventListener("click", function(e){
        leaderDiv.innerHTML = ""
        leaderBoard()
    })



})

        // function restart() {
        //     popUp.style.display = "none"
        //     counter.innerText = 22
        //     timer = setInterval(decrementCounter, 1000)
        //     startGame()
        // }



        // const topScores = document.getElementById('leaderboard')



    // document.addEventListener('keydown', function (event) {
    //     if (event.target.key = "r") {
    //         if (parseInt(counter.innerText) < 1) {
    //             restart() 
    //         }
    //     }
    // })



    // function addScores(username, score) {
    //     // addButton.addEventListener("click", function (event) {
    //     fetch('http://localhost:3000/api/v1/games', {
    //         method: 'POST',
    //         headers:
    //         {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             "username": username,
    //             "score": score,
    //             "card_set_id": cardSetId
    //         })
    //     })
    // }

    // Would you like to play again? <br>
    // Press "R" to restart.</strong>

            // .then(function (response) {
            //     return response.json();
            // }).then(function (game) {
            //     const ul = addButton.parentNode.querySelector("ul")
            //     if (ul.children.length < 6) { 
            //         const li = document.createElement('li');
            //         li.innerText = `${pokemon.nickname} (${pokemon.species})`
            //         const releaseButton = document.createElement('button');
            //         releaseButton.setAttribute('class', 'release');
            //         releaseButton.innerText = "Release";
            //         releaseButton.dataset.id = pokemon.id;
            //         releasePokemon(releaseButton)
            //         li.appendChild(releaseButton)
            //         ul.appendChild(li)
            //     } else {alert(pokemon.error) }
            // });
