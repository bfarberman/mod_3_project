document.addEventListener('DOMContentLoaded', function(){
    let cardFlip = 0
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
                
            littleDiv.addEventListener("click", function(e){
                const array = [] 
                cardFlip ++
                if (cardFlip <= 2) {
                    e.target.src = card.imageUrl
                    array.push(card)
                }     
                // cardFlip = 0

                // if (cardFlip <= 2)
                // e.target.src = card.imageUrl




            })

        })
    })
    
    
    
})

// image.src = card.imageUrl

// containerDiv.addEventListener("click", function(e){
//     e.target.src = card.imageUrl
// })
// containerDiv.addEventListener("mouseleave", function(e){
//     e.target.src = 
// })