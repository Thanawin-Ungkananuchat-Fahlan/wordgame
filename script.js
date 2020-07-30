var score = 0;
var times = 0;
var dict;
var rand;
var vocab;
var msg;
var word; var words;
var sound; var sounds;
var ans = false; var wer = false;
function init() {
    word = document.getElementById('word');
    words = document.getElementById('words');
    sound = document.getElementById('sound');
    sounds = document.getElementById('sounds');
    wordfreq();
}

function wordfreq() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(xhttp.readyState);
        if (this.readyState == 4 && this.status == 200) {
            dict = JSON.parse(this.responseText);
            console.log(dict);
            document.getElementById('start').style.display = "inline-block";
        }
    };
    xhttp.open("GET", "output.txt", true);
    xhttp.send();   
}

function GameStart() {
    document.getElementById('start').style.display = "none";
    document.getElementById('quiz').style.display = "block";
    score = 0;
    times = 0;
    document.getElementById('score').innerHTML = times + 1;
    question();
}
function question() {
    var num = dict.length;
    rand = Math.floor(Math.random() * num);
    vocab = dict[rand];
    document.getElementById('ans').innerHTML = vocab[0]; 
    hearsound();
}


function hearsound() {
    msg = new SpeechSynthesisUtterance(vocab[0]);
    window.speechSynthesis.speak(msg);
}

function matchword() {
    word = document.getElementById('word');
    words = document.getElementById('words');
    word.value = word.value.toLowerCase();
    if (word.value == vocab[0]) {
        ans = true;
        words.style = 'color: lime';
        words.innerHTML = '&#x2714';

    } else {
        ans = false;
        words.style = 'color: red';
        words.innerHTML = '&#x2716';
    }
}

function matchsound() {
    sound = document.getElementById('sound');
    sounds = document.getElementById('sounds');
    sound.value = sound.value.toUpperCase();
    for (let index = 1; index < vocab.length; index++) {
        if (sound.value == vocab[index]) {
            wer = true;
            break;
        } else {
            wer = false;
        }
    }
    if (wer == true) {
        sounds.style = 'color: lime';
        sounds.innerHTML = '&#x2714';
    } else {
        wer = false;
        sounds.style = 'color: red';
        sounds.innerHTML = '&#x2716';
    }
}

function next() {
    if (ans && wer) {
        score++;
    } else if (ans || wer) {
        score = score + 0.5;
    } else {
        score = score
    }
    giveup();
}

function giveup() {
    word.value = '';
    sound.value = '';
    words.innerHTML = '';
    sounds.innerHTML = '';
    ans = false; wer = false;
    times++;
    document.getElementById('score').innerHTML = times + 1;
    if (times >= 10) {
        end();
    } else {
        question();
    }
}

function end() {
    document.getElementById('score').innerHTML = score + '/10';
    document.getElementById('ans').innerHTML = ''; 
    document.getElementById('quiz').style.display = "none";
    document.getElementById('start').style.display = "inline-block";
}
