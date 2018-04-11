const intro = document.querySelector('.js-intro');
const description = document.querySelector('.js-description');
const input = document.querySelector('.js-input');
const submit = document.querySelector('.js-submit');

submit.addEventListener('click', saveName);

function saveName() {
    let playerNameInput = input.value;
    intro.textContent = `Hi ${playerNameInput}!`;
    clearInput();
    submit.removeEventListener('click', saveName, false);
    wannaPlay();
}

function wannaPlay() {
    description.textContent = `Wanna play a game?`;
    input.placeholder = `Yes or no?`;
    submit.addEventListener('click', function() {
        yesOrNo();
        clearInput();
    });
}

function yesOrNo() {
    if (input.value.includes('yes') || input.value.includes('Yes')) {
        intro.textContent = `That's great!`
    } else if (input.value.includes('no') || input.value.includes('No')) {
        gameOver();
    }
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