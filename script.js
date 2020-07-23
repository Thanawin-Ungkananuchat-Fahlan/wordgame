var score = 0;
var times = 0;
var wording; var spell;
var cplit;
let compare; let rision;
var cword; var rword;
var compile = [];
var say = []; 
var dict = [];
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
            wording =  this.responseText.split(', ');
            let index = 0
            wording.sort();
            for (let index = wording.length-1; index >= 0; index--) {
                wording[index] = wording[index].toLowerCase()
                if (wording[index] == wording[index+1]) {
                    wording.splice(index,1);
                }
            }
            console.log(wording);
            lemmas();
        }
    };
    xhttp.open("GET", "wordfreq.txt", true);
    xhttp.send();   
}

function lemmas() {
    const yhttp = new XMLHttpRequest();
    yhttp.onreadystatechange = function() {
        console.log(yhttp.readyState);
        if (this.readyState == 4 && this.status == 200) {
            spell =  this.responseText.split('\n');
            var index = 0
            while (index < spell.length) {
                cplit = spell[index].split(",")
                say.push(cplit);
                index++;
            }
            console.log(say);

            compare = 0
            while (compare < wording.length) {
                cword = wording[compare]
                compile = [cword]
                rision = 0
                while (rision < say.length) {
                    rword = say[rision];
                    if (cword == rword[0]) {
                        compile.push(rword[1])
                    }
                    rision++;
                }
                if (compile.length > 1) {
                    dict.push(compile);
                } else {
                    console.log(compile);
                }
                compare++;
            }
            console.log(dict);
        }
    };
    yhttp.open("GET", "test.txt", true);
    yhttp.send();   
}

function GameStart() {
    document.getElementById('start').style.display = "none";
    document.getElementById('quiz').style.display = "block";
    score = 0;
    times = 0;
    document.getElementById('score').innerHTML = score;
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
    if (sound.value == vocab[1] || 
    sound.value == vocab[2] || 
    sound.value == vocab[3] ||
    sound.value == vocab[4]) {
        wer = true;
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
    document.getElementById('score').innerHTML = score;
    giveup();
}

function giveup() {
    word.value = '';
    sound.value = '';
    words.innerHTML = '';
    sounds.innerHTML = '';
    ans = false; wer = false;
    times++;
    if (times >= 10) {
        end();
    } else {
        question();
    }
}

function end() {
    document.getElementById('score').innerHTML = score + '/10';
    document.getElementById('quiz').style.display = "none";
    document.getElementById('start').style.display = "inline-block";
}
