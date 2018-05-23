var firstGuess = '';
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
var listenButton = document.getElementById("listenButton");

const cardsArray = [{
        'name': 'Barn',
        'desc': 'The Barn owl is the most common owl in the world. They only fly at night and they eat mostly mice which they can hear moving in the dark. Barn owls can live for 17 years.',
        'img': 'img/barn.jpg',
        'sound': 'img/barn.mp3',
  },
    {
        'name': 'Barred',
        'desc': 'Barred owls live all over Canada and are active day or night. They like to drink water and bathe in lakes, they can even catch fish to eat! Barred owls can live to be 23 years old.',
        'img': 'img/barred.jpg',
        'sound': 'img/barred.mp3',
  },
    {
        'name': 'Boreal',
        'desc': 'The Boreal owl lives in northern Canada and builds its nest in old woodpecker holes. They only fly at night and roost in thick cover during the day. Boreal owls can live to be 15 years old.',
        'img': 'img/boreal.jpg',
        'sound': 'img/boreal.mp3',
  },
    {
        'name': 'Burrowing',
        'desc': 'The Burrowing owl lives in the prairies of Western Canada. They are about the size of a robin and build their nests in holes in the ground. They eat mainly mice and grasshoppers and can live to 11 years of age.',
        'img': 'img/burrowing.jpg',
        'sound': 'img/burrowing.mp3',
  },
    {
        'name': 'Great Gray',
        'desc': 'The Great Grey owl is the largest owl in Canada with a wingspan of over 4 feet. They hunt mostly at night but can be active during the day. They are very secretive and are rarely seen. The Great Grey owl is the provincial bird of Manitoba.',
        'img': 'img/greatgray.jpg',
        'sound': 'img/greatgray.mp3',
  },
    {
        'name': 'Great Horned',
        'desc': 'The Great Horned owl is found right across Canada and is one of the largest owls. Nests are made from sticks and can be in trees or on the ground. They are active during the day or night and can live up to 29 years. The Great Horned owl is the provincial bird of Alberta.',
        'img': 'img/greathorned.jpg',
        'sound': 'img/greathorned.mp3',
  },
    {
        'name': 'Hawk Owl',
        'desc': 'The Hawk owl lives in northern and central Canada and is active during the day. This owl is very tame and people can often approach one closely. They sometimes follow farmers making hay and pounce on mice that are uncovered.',
        'img': 'img/hawk.jpg',
        'sound': 'img/hawk.mp3',
  },
    {
        'name': 'Longeared',
        'desc': 'The Long-eared owl is found across southern Canada and is about the size of a crow. They live in dense forests and only fly at night. They have long black tufts which look like big ears. The Long-eared owl can live up to 27 years.',
        'img': 'img/longeared.jpg',
        'sound': 'img/longeared.mp3',
  },
    {
        'name': 'Saw Whet',
        'desc': 'The Saw Whet owl is a small owl that lives across most of Canada. They fly mostly at night and mainly eat insects. They are very tame and are not afraid of people. Saw Whet owls can live up to 17 years.',
        'img': 'img/sawwhet.jpg',
        'sound': 'img/sawwhet.mp3',
  },
    {
        'name': 'Short Eared',
        'desc': 'The Short-eared owl lives across Canada in open grassland areas. They are about the size of a crow but have very long wings. They roost on the ground and can often be seen during the daytime. They fly low over the ground looking for mice and other small animals.',
        'img': 'img/shorteared.jpg',
        'sound': 'img/shorteared.mp3',
  },
    {
        'name': 'Snowy',
        'desc': 'The Snowy owl is almost all white and is the heaviest owl in Canada.They have a wingspan of up to 52 inches. They build a shallow nest on the ground and line it with feathers. Snowy owls can fly at up to 80 kilometers per hour and can live up to 14 years. The Snowy owl is the provincial bird of Quebec.',
        'img': 'img/snowy.jpg',
        'sound': 'img/snowy.mp3',
  },
    {
        'name': 'Spotted',
        'desc': 'The Spotted owl lives in the dense forests of British Columbia and only comes out at night. Pairs of Spotted owls mate for life and their eggs are laid on the bare floor of holes in big trees. Spotted owls have large round heads with dark eyes and spots all over their back and head.',
        'img': 'img/spotted.jpg',
        'sound': 'img/spotted.mp3',
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
            img,
            sound
        } = item;

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;
        card.dataset.desc = desc;
        card.dataset.img = img;
        card.dataset.sound = sound;

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
        // get the name of the owl clicked
        var modal_name = newClick.parentNode.dataset.name;
        // get the description
        var modal_desc = newClick.parentNode.dataset.desc;
        //get the image
        var modal_img = newClick.parentNode.dataset.img;
        //get the sound
        var modal_sound = newClick.parentNode.dataset.sound;

        // clicking allowed only on matched pairs
        if (newClick.parentNode.classList.contains('match')) {
            // make the modal window visible
            modal.style.display = "flex";

            // write to the modal window
            myImage = new Image();
            myImage.src = modal_img;

            //Show the image
            test4 = document.getElementById('owl_image');
            test4.appendChild(myImage);

            //Show the description
            document.getElementById('modal2').textContent = modal_desc;

            // play the owl's sound
            const playSound = () => {
                var audio = new Audio(modal_sound);
                audio.play();
                listenButton.removeEventListener("click", playSound);
            }
            listenButton.addEventListener("click", playSound);

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
