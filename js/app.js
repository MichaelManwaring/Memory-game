/*
 * Create a list that holds all of your cards
 */

const cardTypes = ['anchor', 'diamond', 'leaf', 'bomb', 'bolt', 'bicycle', 'paper-plane-o', 'cube'];
let cards = shuffle(cardTypes.concat(cardTypes));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck')
function displayCards() {
	deck.innerHTML="";
	const cardsToShow = document.createDocumentFragment();
	shuffle(cards).forEach(function(card){
		const icon = document.createElement('i')
		icon.className = `fa fa-${card}`;
		const flipper = document.createElement('li')
		flipper.className = `card`;
		flipper.appendChild(icon);
		cardsToShow.appendChild(flipper);
	});
	deck.appendChild(cardsToShow);
}

const restart = document.querySelector(".restart");
restart.addEventListener('click', function (e) {
	displayCards();
	moveCount=-1;
	incrementMove();
	stars.innerHTML='<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'
});
displayCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let pickCount = true;
let turnCount = true
deck.addEventListener('click', function (e) {
	let clickedCard = e.path[0]
	if (clickedCard.className=="card") {
		if (turnCount) {
			pickCount=!pickCount;
			e.path[0].classList.add('open');
		// e.path[0].classList.add('show');
			if (pickCount) {
				turnCount=!turnCount
				// console.log(turnCount)
				setTimeout(testPicks, 1000);
				incrementMove();
			}
		}
	}
});

let moveCount=0;
const moveNumber = document.querySelector('.moves')
const stars = document.querySelector('.stars')
function incrementMove() {
	moveCount++;
	moveNumber.innerHTML=moveCount;
	if (moveCount%2==0 && stars.children.length>0) {
		stars.removeChild(stars.firstElementChild);
	}
}

function testPicks() {
	let testCards = document.querySelectorAll('.open');
		console.log(testCards);
	if (testCards[0].children[0].className == testCards[1].children[0].className) {
		testCards[0].classList.add('match');
		testCards[1].classList.add('match');
	} else {}
	testCards[0].classList.toggle('open');
	testCards[1].classList.toggle('open');
	turnCount=!turnCount
}

