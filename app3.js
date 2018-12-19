/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a die as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Opdracht 3
    Add another die to the game, so that there are two dice now. The player loses his current score when one of them is 
    a 1. (Hint: you will need to position the second die, so take a look at the CSS code for the first one.)

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {          // ipv een aparte functie met naam ergens te definiëren en die dan hier te noemen (niet callen) als callbackfunctie gooien we de hele (anonieme) functie gewoon in z'n geheel hierin, aangezien we hem toch maar 1x gaan gebruiken
    if (gamePlaying) {  // al het onderstaande gebeurt nu dus alleen als het spel aan de gang is
        
        var die = Math.ceil(Math.random() * 6);         // willekeurig getal tussen 1 en 6. We gebruiken 'die' alleen hier, dus die hoeft niet in de global scope. '"die"??' het is maar één dobbelsteen... *lacht onschuldig*
        
        var diceDOM = document.querySelector('.dice')       // steeds weer zo'n ding selecteren kost moeite, dus gooien we hem in een variabele zodat we daarna die kunnen gebruiken (zie volgende regel)
        diceDOM.style.display = 'block';        // dobbelsteen zichtbaar maken
        diceDOM.src = 'dice-' + die + '.png';            // dobbelsteen met juiste hoeveelheid stippen doorgeven aan DOM, met gebruikmaking van JS type coercion
        
        if (die !== 1) {            // update roundScore, maar alleen als getal niet 1 is
            roundScore += die;       // met alleen + krijg je alleen de laatste gooi plus de huidige gooi, maar je wilt ze ook alledrie/-vier/etc, sukkel
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        
        scores[activePlayer] += roundScore;     //roundScore optellen bij vaste score
        
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];    // nieuwe score laten zien
        
        if (scores[activePlayer] >= 100) {       // controleren of currentScore al boven de 100 zit!
            gamePlaying = false;        //ik zou hier ook de knoppen Roll dice en Hold op display: none willen zetten om spelers te dwingen een nieuw spelletje te beginnen... >> opgelost met gamePlaying, dat schakelt de functionaliteit uit
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!1!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none'; // Jonas: dit moet je niet te veel doen, een class toevoegen en weghalen is beter
        } else {
            nextPlayer(); // beurt overgeven aan andere speler, zelfde als wanneer er 1 gegooid wordt
        }
    }
})

function nextPlayer() {
    // de roundScore gaat weer op nul. Nu is de beurt aan de andere speler
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';   // allebei de scores in de browser moeten op 0 staan, anders zit je als 1-gooier nog de hele beurt van de ander tegen je eigen verloren punten aan te kijken en dat zou wreed zijn... Hmmm... :-)
    document.getElementById('current-1').textContent = '0';   // 0 als string, is de bedoeling
    document.querySelector('.player-0-panel').classList.toggle('active'); // maak er nu van wat het niet is (voeg toe als het ontbreekt, verwijder als het er is)
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none';     // ik vind het eigenlijk niet logisch om het plaatje te verbergen als er 1 is gegooid - je wilt de ramp toch ZIEN?! (en waarom heb je anders dat plaatje??)

    // document.querySelector('.player-0-panel').classList.remove('active'); // selecteer het element 'player-0-panel' en verwijder de class 'active'.
    // document.querySelector('.player-1-panel').classList.add('active')     // toevoegen ipv verwijderen
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // we selecteren een element, nl een div genaamd dice (zie die CSS-selector), gaan aan de CSS morrelen (style) en wel aan property 'display', die we op 'none' zetten
    document.getElementById('score-0').textContent = '0';   // een ID-element direct als ID-element zoeken is sneller dan querySelector. 
    document.getElementById('current-0').textContent = '0'; // LET OP: bij getElementById gebruik je dus alleen de naam van het ID-element, maar bij querySelector moet er wel de # of . voor, anders no dice.
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}


//document.querySelector('#current-' + activePlayer).textContent = die;   // Je zoekt&selecteert het juiste html-element - (type coercion maakt dat je '#current-' + variabele kunt schrijven en ermee wegkomt) - en dat textContent is een methode om tekst in te voegen (maar ALLEEN tekst). Dat stel je dan gelijk aan de uitkomst van var die.  = setter
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + die + '</em>';   // tweede manier, waarmee je ook html kunt toevoegen aan je tekstelement (maar daar heb je toch CSS voor??).


// var x = document.querySelector('#score-0').textContent;  // om een score te lezen en in een variabele op te slaan. Behalve dat alles wat daar staat uiteindelijk ook hier vandaan komt, dus...         = getter
