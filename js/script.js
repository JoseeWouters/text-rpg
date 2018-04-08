var playerNameInput;
var greeting = document.querySelector('.js-greeting');

function saveName() {
    playerNameInput = document.querySelector('.js-name').value;
    greeting.textContent = 'Hi ' + playerNameInput + '!';
    document.querySelector('.part-one').style.display = 'none';
    document.querySelector('.part-two').style.display = 'block';
}

var noPlay = document.querySelector('#no');
noPlay.addEventListener('click', function() {
    document.querySelector('.no-play').style.display = 'block';
    document.querySelector('.part-two').style.display = 'none';
    document.querySelector('.js-greeting').style.display = 'none';
});

var goPlay = document.querySelector('#yes');
goPlay.addEventListener('click', function() {
    document.querySelector('.go-play').style.display = 'block';
    document.querySelector('.part-two').style.display = 'none';
    document.querySelector('.js-greeting').style.display = 'none';
});

function checkAnswer() {
    var answerField = document.querySelector('.js-answer').value;
    var answerWord = 'light';
    if (answerField.indexOf(answerWord) != -1) {
        document.querySelector('.part-three').style.display = 'block';
        document.querySelector('.go-play').style.display = 'none';
    }
}