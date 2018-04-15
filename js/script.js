const intro = document.querySelector('.js-intro');
const description = document.querySelector('.js-description');
const response = document.querySelector('.js-response');
const input = document.querySelector('.js-input');
const submit = document.querySelector('.js-submit');
const helpModal = document.querySelector('.js-modal');
const closeHelpModal = document.querySelector('.js-modal-background');
const closeButtonModal = document.querySelector('.js-modal-close');
var playerName;


// Check for enter
input.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit.click();
    }
});

// Check for any content in textarea
input.addEventListener('keypress', function() {
    submit.classList.remove('is-static');
});

// Set button to static after submit
submit.addEventListener('click', function() {
    help();
    submit.classList.add('is-static');
});

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
    }
}

function stepOne() {
    intro.textContent = `You're in a room.`
    description.textContent = `The room is dark. What will you do first?`
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
    submit.addEventListener('click', explore);
    function explore() {
        if (input.value.includes('door') || input.value.includes('Door')) {
            response.textContent = `The door is locked, you need the key to open it.`;
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
        } else {
            tryAgain();
        }
    }
    function foundKey() {
        intro.textContent = `You found a key!`;
        description.textContent = `Try to unlock something in this room.
        Remember: The room has a door and a window. Against one of the walls is a couch and on the opposite side is a locked cabinet with a tv. There's a carpet on the floor and a single light bulb on the ceiling.`
        response.textContent = ``;
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
                tvRemote();
            } else {
                tryAgain();
            }
        }
    }
    function tvRemote() {
        intro.textContent = `You found the remote control for the tv.`;
        description.textContent = `What do you want to do now?`;
        response.textContent = `Don't remember what was in the room? Type 'help' for more information.`;
    }
}

function help() {
    if (input.value.includes('help') || input.value.includes('Help')) {
        helpModal.classList.add('is-active');
    }
    closeHelpModal.addEventListener('click', function() {
        helpModal.classList.remove('is-active');
    });
    closeButtonModal.addEventListener('click', function() {
        helpModal.classList.remove('is-active');
    });
}

function clearInput() {
    input.value = ``;
    input.placeholder = ``;
}

function gameOver() {
    intro.textContent = `Too bad!`;
    description.textContent = `Why don't you come back another time?`;
    input.style.display = 'none';
    submit.style.display = 'none';
}

function disableForm() {
    input.style.display = 'none';
    submit.style.display = 'none';
}

function enableForm() {
    input.style.display = 'block';
    submit.style.display = 'inline-flex';
}

function tryAgain() {
    response.textContent = `${input.value} is not gonna work. Try something else.`;
    clearInput();
}