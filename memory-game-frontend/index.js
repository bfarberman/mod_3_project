document.addEventListener('DOMContentLoaded', function(){

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
            image.src = card.imageUrl
            littleDiv.appendChild(image)
            containerDiv.appendChild(littleDiv)
        })
    })
    
       
    

})