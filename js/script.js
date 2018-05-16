let firstGuess = '';
let secondGuess = '';
let count = 0;
let matches = 0;
let tries = 0;
let delay = 1200;
let test4 = '';

let myImage = '';

var gameGrid = [];

//Some variables to hold the buttons
var playGameButton = document.getElementById("playGame-button");
var gameOverButton = document.getElementById("gameOver-button");
var playAgainButton = document.getElementById("playAgain-button");

const cardsArray = [{
        'name': 'Barn',
        'desc': '',
        'img': 'img/barn.jpg',
  },
    {
        'name': 'Barred',
        'desc': '',
        'img': 'img/barred.jpg',
  },
    {
        'name': 'boreal',
        'desc': '',
        'img': 'img/boreal.jpg',
  },
    {
        'name': 'Burrowing',
        'desc': '',
        'img': 'img/burrowing.jpg',
  },
    {
        'name': 'Great Gray',
        'desc': '',
        'img': 'img/greatgray.jpg',
  },
    {
        'name': 'Great Horned',
        'desc': '',
        'img': 'img/greathorned.jpg',
  },
    {
        'name': 'Hawk Owl',
        'desc': '',
        'img': 'img/hawk.jpg',
  },
    {
        'name': 'Longeared',
        'desc': '',
        'img': 'img/longeared.jpg',
  },
    {
        'name': 'Saw Whet',
        'desc': '',
        'img': 'img/sawwhet.jpg',
  },
    {
        'name': 'Short Eared',
        'desc': '',
        'img': 'img/shorteared.jpg',
  },
    {
        'name': 'Snowy',
        'desc': '',
        'img': 'img/snowy.jpg',
  },
                    {
        'name': 'Spotted',
        'desc': '',
        'img': 'img/spotted.jpg',
  },
   ];
//Random generator
const random = (n) => {
    return Math.floor(Math.random() * n);
}

//Get the images for this game
const getSomeImages = () => {
    var imagescopy = cardsArray.slice();
    var randomImages = [];

    // this is where we pick 6 images from the available array
    for (var i = 0; i < 6; i++) {
        var index = random(imagescopy.length);
        randomImages.push(imagescopy.splice(index, 1)[0]);
    }

    // this doubles the selected images and randomizes the display
    gameGrid = randomImages.concat(randomImages).sort(() => 0.5 - Math.random());

    return gameGrid;
}

const initialize = () => {

    getSomeImages();

    const game = document.getElementById('game');

    grid = document.createElement('section');

    grid.setAttribute('class', 'grid');
    game.appendChild(grid);

    gameGrid.forEach(item => {
        const {
            name,
            desc,
            img
        } = item;

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;
        card.dataset.desc = desc;
        card.dataset.img = img;

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${img})`;

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

    });

    // function to record a match of two cards
    const match = () => {
        const selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('match');
        });
    };

    // function to reset the cards if no match was made
    const resetGuesses = () => {
        firstGuess = '';
        secondGuess = '';
        count = 0;
        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
        });
    };

    grid.addEventListener('click', event => {
        const clicked = event.target;
        if (
            // if click was not on a card
            clicked.nodeName === 'SECTION' ||
            // don't click twice on a card
            clicked.parentNode.classList.contains('selected') ||
            // if already matched, do not click
            clicked.parentNode.classList.contains('match')
        ) {
            return;
        }
        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
                tries++;
            }
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    matches++;
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
            }
        }
        if (matches === 6) {
            setTimeout(gameOver, delay);
        }
    });

    // function for image zoom and info
    grid.addEventListener('click', event => {

        const newClick = event.target;
        // get the name of the horse clicked
        var modal_name = newClick.parentNode.dataset.name;
        // get the description
        var modal_desc = newClick.parentNode.dataset.desc;
        //get the image
        var modal_img = newClick.parentNode.dataset.img;

        // clicking allowed only on matched pairs
        if (newClick.parentNode.classList.contains('match')) {
            // make the modal window visible
            modal.style.display = "flex";

            // write to the modal window
            myImage = new Image();
            myImage.src = modal_img;

            //Show the image
            test4 = document.getElementById('horse_image');
            test4.appendChild(myImage);

            //Show the description
            document.getElementById('modal2').textContent = modal_desc;
        };
    });
};

//Code a modal window to show more detail about a matched pair
//Get the modal
var modal = document.getElementById('myModal');
//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
//When the user clicks on <span> (x), close the modal
span.onclick = function () {
    clearModal();
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        clearModal();
    }
}

const clearModal = () => {
    modal.style.display = "none";
    test4.removeChild(myImage);
}

const gameOver = () => {
    // hide the game screen
    document.getElementById("game").style.display = "none";
    // show the game over screen
    document.getElementById("gameOver-screen").style.display = "flex";
    document.getElementById('score').textContent = "Your score was " + tries + " tries!";
}

const playGame = () => {
    // hide the welcome screen
    document.getElementById("gameStart-screen").style.display = "none";
    //reset the matches counter
    matches = 0;
    count = 0;
    tries = 0;
    //show the game screen
    document.getElementById("game").style.display = "flex";
    //start the game
    initialize();
}

const playAgain = () => {
    // hide the game over screen
    document.getElementById("gameOver-screen").style.display = "none";
    //reset the counters
    matches = 0;
    count = 0;
    tries = 0;
    //clear the old grid
    grid.parentNode.removeChild(grid);
    // show the game screen
    document.getElementById("game").style.display = "flex";
    //start the game
    initialize();
}

function quitGame() {
    // hide the game over screen
    document.getElementById("gameOver-screen").style.display = "none";
    //reset the counters
    matches = 0;
    count = 0;
    tries = 0;
    //clear the old grid
    grid.parentNode.removeChild(grid);
    gameOver - screen.close();
}

playGameButton.addEventListener("click", playGame);

playAgainButton.addEventListener("click", playAgain);

//gameOverButton.addEventListener("click", quitGame);
