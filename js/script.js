const intro = document.querySelector('.js-intro');
const description = document.querySelector('.js-description');
const response = document.querySelector('.js-response');
const input = document.querySelector('.js-input');
const submit = document.querySelector('.js-submit');
const helpModal = document.querySelector('.js-modal');
const closeHelpModal = document.querySelector('.js-modal-background');
const closeButtonModal = document.querySelector('.js-modal-close');
const roomInfo = document.querySelector('.js-room');
const infoButton = document.querySelector('.js-info');
var playerName;

// Disable roomInfo at the start
roomInfo.style.display = 'none';

// Check for enter
input.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit.click();
    }
});
// Set button to static after submit
submit.addEventListener('click', function() {
    submit.classList.add('is-static');
});

// Check for any content in textarea
input.addEventListener('input', function() {
    submit.classList.remove('is-static');
});



// Initalize the first function
submit.addEventListener('click', saveName);

function saveName() {
    playerName = input.value;
    intro.textContent = `Hi ${playerName}!`;
    clearInput();
    response.textContent = ``;
    submit.removeEventListener('click', saveName, false);
    wannaPlay();
}

function wannaPlay() {
    description.textContent = `Wanna play a game?`;
    input.placeholder = `Yes or no?`;
    submit.addEventListener('click', yesOrNo);
}

function yesOrNo() {
    if (input.value.includes('yes') || input.value.includes('Yes')) {
        intro.textContent = `That's great!`
        description.textContent = `Ready, ${playerName}?`
        clearInput();
        disableForm();
        setTimeout(() => { stepOne(); }, 2500);
    } else if (input.value.includes('no') || input.value.includes('No')) {
        gameOver();
    } else {
        tryAgain();
    }
}

function stepOne() {
    intro.textContent = `You're in a room.`
    description.textContent = `The room is dark. What will you do first?`
    response.textContent = ``;
    setTimeout(() => { enableForm(); }, 2000);
    submit.removeEventListener('click', yesOrNo);
    submit.addEventListener('click', light);
    function light() {
        if (input.value.includes('light') || input.value.includes('Light')) {
            stepTwo();
            clearInput();
            submit.removeEventListener('click', light);
        } else {
            tryAgain();
        }
    }
}

function stepTwo() {
    intro.textContent = `You turned on the light`;
    description.textContent = `The room has a door and a window. Against one of the walls is a couch and on the opposite side is a locked cabinet with a tv. There's a carpet on the floor and a single light bulb on the ceiling.
    Try to explore the room.`;
    response.textContent = ``;
    roomInfo.style.display = 'block';
    submit.addEventListener('click', explore);
    function explore() {
        if (input.value.includes('door') || input.value.includes('Door')) {
            response.textContent = `The door is locked with an electronic system.`;
            clearInput();
        } else if (input.value.includes('window') || input.value.includes('Window')) {
            response.textContent =`You can't open this window.`;
            clearInput();
        } else if (input.value.includes('cabinet') || input.value.includes('Cabinet')) {
            response.textContent = `The cabinet is locked, you need the key to open it.`;
            clearInput();
        } else if (input.value.includes('carpet') || input.value.includes('Carpet')) {
            clearInput();
            foundKey();
        } else if (input.value.includes('tv') || input.value.includes('Tv')) {
            response.textContent = `There's no remote to turn on the tv.`
        } else if (input.value.includes('cushion') && input.value.includes('couch') 
                || input.value.includes('search') && input.value.includes('couch') 
                || input.value.includes('Search') && input.value.includes('couch'))  {
                    clearInput();
                    pieceOfPaperOne();
        } else if (input.value.includes('couch') || input.value.includes('Couch')) {
            response.textContent = `What do you want to do with the couch?`;
            clearInput();
        } else {
            tryAgain();
        }
    }
    function foundKey() {
        intro.textContent = `You found a key!`;
        description.textContent = `Try to unlock something in this room.`;
        response.textContent = `Don't remember what was in the room? Check the 'i' for more information.`;
        submit.removeEventListener('click', explore);
        submit.addEventListener('click', unlock);
        function unlock() {
            if (input.value.includes('door') || input.value.includes('Door')) {
                response.textContent = `This is not the right key to unlock the door.`;
                clearInput();
            } else if (input.value.includes('window') || input.value.includes('Window')) {
                response.textContent =`You can't open this window.`;
                clearInput();
            } else if (input.value.includes('cabinet') || input.value.includes('Cabinet')) {
                clearInput();
                tvRemote();
            } else {
                tryAgain();
            }
        }
    }
    function tvRemote() {
        intro.textContent = `You found the remote control for the tv and a ripped piece of paper.`;
        description.textContent = `What do you want to do now?`;
        response.textContent = ``;
        submit.addEventListener('click', turnOnTv);
        function turnOnTv() {
            if (input.value.includes('tv') || input.value.includes('Tv')) {
                intro.textContent = `The tv turns on, but shows nothing more than a couch.`;
            } else if (input.value.includes('paper') || input.value.includes('Paper')) {
                clearInput();
                pieceOfPaperTwo();
            } else {
                tryAgain();
            }
        }
    }
    function pieceOfPaperOne() {
        intro.textContent = `You found a piece of paper.`;
        description.textContent = `What do you want to do with it?`;
        response.textContent = ``;
        submit.removeEventListener('click', explore);
        submit.addEventListener('click', readPaperOne);
        function readPaperOne() {
            if (input.value.includes('read') || input.value.includes('Read') 
            || input.value.includes('look') || input.value.includes('Look')
            || input.value.includes('open') || input.value.includes('Open')) {
                intro.textContent = `You can read the numbers 3 and 7 on this piece of paper.`;
            }
        }
    }
}

function help() {
    helpModal.classList.add('is-active');
    closeHelpModal.addEventListener('click', function() {
        helpModal.classList.remove('is-active');
    });
    closeButtonModal.addEventListener('click', function() {
        helpModal.classList.remove('is-active');
    });
}

// clear textarea
function clearInput() {
    input.value = ``;
    input.placeholder = ``;
}

// If the player doesn't want to play
function gameOver() {
    intro.textContent = `Too bad!`;
    description.textContent = `Why don't you come back another time?`;
    response.textContent = ``;
    input.style.display = 'none';
    submit.style.display = 'none';
}

function disableForm() {
    input.style.display = 'none';
    submit.style.display = 'none';
    infoButton.style.display = 'none';
}

function enableForm() {
    input.style.display = 'block';
    submit.style.display = 'inline-flex';
    infoButton.style.display = 'block';
    input.focus();
}

// If the input cannot be recognized
function tryAgain() {
    response.textContent = `${input.value} is not gonna work. Try something else.`;
    clearInput();
}