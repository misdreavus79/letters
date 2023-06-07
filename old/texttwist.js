//TextTwist, by Eli Moreta-Feliz

//create an object that accepts two parameters, the letterset and the words
var Game = function (letterset, words) {
	"use strict";
	this.letterset = letterset;
	this.words = words; //words the user can guess

	//variables to use throught script
	var self = this, wordTracker = [], remainingWords = words.length, seconds = 90, win = false;

	//displays the current letterset in a specified div, displayed in a random order
	this.display = function(){
		this.letterset.sort(function(){
			return Math.random() - 0.5;
		});
		$('#letterset').html(this.letterset.join(" ")); //join the letterset array into one string

	};

	//displays how much time is left
	this.countdown = function(){
		if(!win){
			if(seconds > 0){
				$('#countdown').html(seconds);
				seconds -= 1;
				setTimeout(self.countdown, 1000);
			}else{
				//if they run out of time, end the game
				$('#countdown').html("Out of Time");
				$('#word').prop("disabled", true);
				$('#reset').show(); //resets the game once it ends
				$('#shuffle').hide();
				$('#guess').hide();
				if(wordTracker.length !== words.length){
					$('#message').html('');
					if(Game.lives > 0){
						Game.lives -= 1;
						$('#lives').text(Game.lives);
					}else{
						Game.score = 0;
						$('#score').text(Game.score);
						$('#message').text("Game Over");
					}
						
				}	
			}
		}else{
			$('#word').prop("disabled", true);
			$('#reset').show(); //resets the game once it ends
			$('#shuffle').hide();
			$('#guess').hide();
		}
	};

	//matches what the user inputs
	this.match = function(){
		var i, searchText = $('#word').val().toUpperCase(); //user input
		$('#word').val('');	
		if(!/^[a-zA-Z]{3,}$/.test(searchText)){
			$('#message').html("Please type a word (3 letters minimum)");
		}else{
			for(i = 0; i < this.words.length; i += 1){
				if(searchText === this.words[i]){ //Search to see if the user input matches what's on the words array
					return self.track(searchText);
				}
				$('#message').html(searchText + " is not a match");	
			}
		}
	};

	//tracks the words that have been guessed, ends the game once all words have been guessed
	this.track = function(searchText){
		
		var j, html = '<li>' + searchText + '</li>'; //save the word to append to the list of guessed words
		
		if(wordTracker.length === 0){ //if wordTracker is empty, add the guessed word
			wordTracker.push(searchText);
			$('#wordlist').append(html);
			remainingWords -=1;
			$('#message').html(remainingWords + " words left");
		}else{
			for(j = 0; j < wordTracker.length; j += 1){
				if(wordTracker[j] === searchText){ //if the word has been submitted before, throw an error
					$('#message').html(searchText + " Already Guessed <br />" + remainingWords + " words left");
					return;
				}
			}
			wordTracker.push(searchText); //if the word has not been submitted, add it to the wordTracker array
			$('#wordlist').append(html);
			remainingWords -= 1;
			$('#message').html(remainingWords + " words left");
		}

		//once all words are guessed, end the game
		if(wordTracker.length === words.length){
			Game.score += (seconds * 100);
			if((Game.score % 50000) === 0){
				Game.lives += 1;
			}
			Game.level += 1;
			win = true;
			$('#reset').val('Next Level');
			$('#message').html("Success!");
			$('#word').prop("disabled", true);
			$('#score').text(Game.score);
		}
	};

	//starts the game
	this.start = function(){
		switch(Game.level){
			case 21:
				Game.css.setAttribute('href', 'styleNormal.css');
				break;
			case 41:
				Game.css.setAttribute('href', 'styleHard.css');
				break;
			case 61:
				Game.css.setAttribute('href', 'styleVeryHard.css');
				break;
			case 81:
				Game.css.setAttribute('href', 'styleUltimate.css');
				break;
			default:
				break;
		}
		self.display();
		$('#countdown').show();
		$('#wordlist').html('');
		self.countdown();
	};

	//resets the game after it's been played once
	this.reset = function(){
		seconds = 90;
		remainingWords = words.length;
		wordTracker = [];
		$('#word').prop("disabled", false);
		$('#message').html("");
		$('#reset').val('Play Again');
		self.start();
	};
};

Game.score = 0;
Game.lives = 3;
Game.level = 0;
Game.css = document.createElement('link');

//set up the link element to be ready to fire
Game.css.setAttribute('rel', 'stylesheet');
Game.css.setAttribute('media', 'screen');
Game.css.setAttribute('type', 'text/css');
document.head.appendChild(Game.css);

var games = [];

//event handlers
$(document).ready(function(){
	$('#guess').hide();
	$('#reset').hide();
	$('#word').hide();
	$('#shuffle').hide();
	var init = function(){
		$('#start').click(function(){
			$(this).hide();
			$('#word').show().focus();
			$('#shuffle').show();
			$('#guess').show();
			games[Game.level].start();
			$('#title').text("Level " + (Game.level + 1));
		});
		$('#reset').click(function(){
			if(Game.level >= games.length){
				Game.level = 0;
			}
			games[Game.level].reset();
			$('#title').text("Level " + (Game.level + 1));
			$('#word').show();
			$('#shuffle').show();
			$('#guess').show();
			$('#reset').hide();
		});
		$('#guess').click(function(){
				games[Game.level].match();
		});
		$('#word').keypress(function(e) {
			if(e.which === 13) {
				games[Game.level].match();
				e.preventDefault();
			}
		});
		$('#shuffle').click(function(){
			games[Game.level].display();
		});
	}
	$.ajax({
		url: 'http://misd.info/assets/data.php',
		success: function(e){
			for(var i = 0; i < e.length; i++){
				e[i].words.sort(function(){
					return Math.random() - 0.5;
				});
				e[i].words.length = 20;
				games[i] = new Game(e[i].letters.split(""), e[i].words);
			}
			init();
		},
		error: function(){
			games = [
					new Game(["a", "b", "c", "k", "l", "e"], ["ALE", "CAB", "ALEC", "BLEAK", "LAKE", "BAL", "BLAE", "ALB", "KEA", "CABLE", "LACK", "KALE", "BALE", "KAB", "KAE", "LAC", "ACE", "LEA", "ABLE", "LEAK"]),
					new Game(["s", "c", "r", "a", "b", "i"], ["CRABS", "BASIC", "SAC", "CABS", "SCAR", "AIR", "ABRIS", "CRIBS", "SIR", "BRAS", "CARBS", "ARC", "CARS", "BIAS", "RABI", "ARCS", "RABIS", "BARS", "BAR", "BARIC"]),
					new Game(["e", "m", "g", "y", "a", "t"], ["MEAT", "YAM", "MET", "TYE", "GAT", "GAMY", "MATE", "MEGA", "EAT", "MAT", "TEAM", "GET", "GYM", "EGMA", "TAG", "GAME", "TEA", "MAGE", "MEATY", "AGE"]),
					new Game(["a", "s", "n", "p", "i", "t"], ["PAIN", "PINTS", "SNIP", "PIAS", "STAIN", "PIANS", "PST", "PITS", "ANT", "TIN", "NIPAS", "PANS", "AIT", "AINS", "TAIN", "AITS", "SAP", "PINS", "SPAN", "PINT"]),
					new Game(["p", "r", "l", "e", "a", "t"], ["PETAL", "ATE", "PRAT", "RAT", "APTER", "PAT", "RAPT", "ALT", "ALE", "RET", "PATE", "RALE", "TRAP", "ALP", "PELT", "LAER", "TAEL", "LEAPT", "PLAT", "PARLE"]),
					new Game(["r", "p", "u", "a", "n", "s"], ["NAP", "RAPS", "PARS", "SPAN", "URSA", "RUNS", "URN", "SAP", "PUNS", "SPA", "PAN", "SNAP", "RASP", "SUN", "PUS", "SPURN", "PAS", "UPAS", "PUR", "SPUN"]),
					new Game(["c", "e", "l", "t", "a", "i"], ["TEA", "TALC", "LACET", "TAIL", "ALEC", "CAT", "LET", "LACE", "TILE", "ALE", "TIE", "EAT", "LAT", "TALE", "LICE", "CELT", "ACE", "CLEAT", "ACT", "CITE"]),
					new Game(["f", "r", "e", "a", "k", "s"], ["REF", "REAK", "FAKER", "FARSE", "SAKER", "SEA", "ARE", "FAKERS", "REFS", "FAKE", "ERA", "ASK", "FARE", "FAR", "FREAKS", "SAKE", "FEAR", "FREAK", "FEARS", "ERAS"]),
					new Game(["k", "a", "e", "l", "s", "t"], ["ASK", "LASKET", "KELTS", "TEA", "SKATE", "LEAKS", "SLATE", "STEAL", "TAKES", "KALES", "TAKE", "LAST", "SEA", "STAKE", "LEAK", "ELKS", "SET", "LATE", "SALT", "LEST"]),
					new Game(["u", "n", "t", "i", "l", "s"], ["UNITS", "NIL", "NITS", "ITS", "SUIT", "UNTIL", "SUNLIT", "SUN", "SNIT", "UNIT", "SIN", "TIN", "LIT", "SLUT", "SIT", "NUTS", "NIT", "STUN", "LINTS", "TINS"]),
					new Game(["e", "e", "r", "t", "y", "a"], ["RAY", "EAR", "YEAR", "ATE", "TEAR", "RAT", "EERY", "RYE", "TREE", "ART", "YET", "TRY", "TREY", "EATERY", "TEARY", "TRAY", "EYE", "TYE", "EATER", "ARE"]),
					new Game(["a", "a", "r", "p", "t", "e"], ["APT", "ATE", "TRAP", "TAPE", "TEA", "EAR", "REAP", "APART", "PAR", "APE", "PART", "ARE", "PAT", "TARP", "RAPE", "ART", "PER", "TAP", "PARE", "RAT"]),
					new Game(["r", "a", "m", "b", "l", "e"], ["BARE", "ERA", "BAR", "LAME", "REAM", "AMBLE", "MARBLE", "ARM", "ARE", "REAL", "ABLER", "BEAM", "LAMER", "MALE", "BLAME", "ELM", "LAB", "ABLE", "MEAL", "AMBER"]),
					new Game(["o", "r", "d", "e", "r", "s"], ["DOSE", "REDO", "ERRS", "DORSER", "ORES", "DOE", "SORE", "ORE", "DOSER", "RODES", "REDS", "ORDERS", "ORDER", "RED", "ODE", "ERR", "DOERS", "ROD", "RODS", "ODES"]),
					new Game(["s", "h", "a", "r", "p", "e"], ["HERS", "APE", "RAP", "ASH", "SHAPE", "REAP", "HASP", "PEAS", "SHEA", "HARP", "PRASE", "RHEAS", "PHASE", "SPA", "ERAS", "APRES", "RAPS", "HARE", "PAR", "SHAPER"]),
					new Game(["r", "o", "c", "k", "e", "d"], ["CORD", "REDOCK", "DORK", "DOC", "CODER", "ROD", "DOEK", "CORE", "REDO", "COD", "RED", "COKE", "CORKED", "ROCK", "CREDO", "CRED", "CORK", "CORED", "DECK", "RODE"]),
					new Game(["g", "l", "u", "t", "e", "n"], ["GUN", "NUT", "GEL", "LUNG", "GENT", "TUNE", "GLEN", "GNU", "GUT", "NET", "TUG", "GLUTEN", "ENGLUT", "UTE", "LENT", "GEN", "GLUE", "GLUT", "GET", "LUGE"]),
					new Game(["s", "p", "e", "a", "r", "i"], ["PEARS", "ASPIRE", "RASP", "SIP", "ERAS", "RAISE", "PEAR", "SEPIA", "PIER", "SPEAR", "PEAS", "PARE", "IRES", "PIERS", "PRAISE", "PRIES", "PIE", "RIPE", "PARSE", "PARIS"]),
					new Game(["d", "r", "e", "a", "d", "o"], ["DEAD", "DREAD", "AERO", "DARED", "DEAR", "ADDER", "RODE", "ORE", "ROAD", "ODDER", "DARE", "RAD", "ROD", "DAD", "ADD", "ODD", "RED", "READ", "ADORE", "ADORED"])
				]
			init();
		},
		dataType: 'json'
	});
});