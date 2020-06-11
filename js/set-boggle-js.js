
// GLOBAL VARIABLES
nrows = 3;
ncols = 4;
num_cards = 27;
num_cards_game = 12;
var counts = [1,2,3];
var shapes = ['diamond', 'oval', 'squiggle'];
var shades = ['open', 'solid', 'striped'];
var colors = ['blue', 'green', 'red'];
var impath = '../images/pages/games/set/';

// POPULATE CARD NAME ARRAY
var card_list_all = [];
for(let i=0;i<shapes.length;i++){
	for(let j=0;j<shades.length;j++){
		for(let k=0;k<shapes.length;k++){
			card_list_all.push( shapes[i] + '_' + shades[j] + '_' + colors[k]);
		}
	}
}

var clickable = [];
var current_track = [];
var current_set = "";
var submitted_set = new Set();

// START GAME!
start_game();
button_event();


// FUNCTION: START GAME
function start_game(){
	var card_list = card_list_all;
	var card_grid = [];
	var card_numbers = [];
	var card_images = [];
	var card_face;
	var t1, t2;
	
	
	// SHUFFLE CARDS
	for(let i=num_cards;i>0;i--){
		t1 = Math.floor(Math.random()*i);
		t2 = card_list[i-1];
		card_list[i-1] = card_list[t1];
		card_list[t1] = t2;
	}
	
	// PICK 12 CARDS
	for(let i=0;i<num_cards_game;i++){
		card_grid.push(card_list[i]);
	}
	
	// PICK 12 NUMBERS
	for(let i=0;i<num_cards_game;i++){
		card_numbers.push(Math.floor(Math.random()*3)+1);
	}

	document.write(card_numbers);
	
	// RENDER BOARD IN HTML
	for(var row=0;row<nrows;row++){
		for(var col=0;col<ncols;col++){
			//card_face = "<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;'>";
			var index = row*nrows+col;
			
			if (card_numbers[index] == 1) {
			card_face = "<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;'>";
			}
			else if (card_numbers[index] == 2) {
			card_face = "<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;'>"+"<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;vertical-align:top'>";
			}
			else if (card_numbers[index] == 3) {
			card_face = "<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;'>"+"<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;vertical-align:top'>"+"<img src='../images/pages/games/set/"+card_grid[row*nrows+col]+".png' style='width:72px;height:29px;vertical-align:bottom'>";
			}
		
		
			var button = "<button type='button' class='btn card'"+"row="+row+" col="+col+">"+ card_face + "</button>";
			var row_selector = document.getElementById("row"+row);
			row_selector.innerHTML += button;
		}
	}

}


/* FUNCTION: BUTTON_EVENT */
function button_event(){
	var row,col,card_value;
	var events = document.getElementsByClassName('card');
	for(let event of events){
		event.onclick = function(){
			row = Number(event.getAttribute('row'));
			col = Number(event.getAttribute('col'));
			card_value = event.innerHTML;	
			// IF SELECTED CARD NOT ACTIVE, ADD TO SET
			if(!event.classList.contains('active')){
				current_track.push([row,col]);
				current_set += card_value;
			// IF SELECTED CARD ACTIVE, REMOVE FROM SET
			}else{
				current_track.pop();
				current_set = current_set.substring(0,current_set.length-1);
			}
			// DETERMINE SELECTABLE DICE
			if(current_track.length !== 0){
				var current_dice = current_track[current_track.length-1];
				ajacent(current_dice[0],current_dice[1]);
				ajacent(current_dice[0],current_dice[1]);
				clickable = modify_clickable(clickable,current_track);
				clickable.push([current_dice[0],current_dice[1]]);
			}
			//update_clickable_dice();
			document.getElementById('current_set').innerHTML = current_set;
			event.classList.toggle('active'); // CURRENT DIE IS NOW ACTIVE
		}
	}
	document.getElementById('submit').onclick = function(){
		submit_word();
		after_submit();
	};
}

/* FUNCTION: MODIFY CLICKABLE  */
// REMOVE ELEMENTS FROM "CLICKABLE" THAT ARE IN "CURRENT TRACK"
function modify_clickable(clickable,current_track){
	var card1 = [];
	var card2 = [];
	var difference = clickable.slice(); // COPY OF CLICKABLE
	for(let i=clickable.length-1;i>=0;i--){
		for(let j=0;j<current_track.length;j++){
			var card1 = clickable[i];
			var card2 = current_track[j];
			if( card1[0] === card2[0] && card1[1] === card2[1] ){
					difference.splice(i,1);
			}
		}
	}
	return difference; // CLICKABLE LESS CURRENT TRACK VALUES
}


/* FUNCTION: UPDATE CLICKABLE */
function update_clickable_dice(){
	var events = document.getElementsByClassName('card');
	var found = false;
	if(current_track.length === 0 ){
		for(let event of events){
			event.disabled = false;
			//event.classList.remove('highlight_btn');
		}
	}else{
		for(let event of events){
			event.disabled = true;
			//event.classList.remove('highlight_btn');
			found = false;
			row = Number(event.getAttribute('row'));
			col = Number(event.getAttribute('col'));
			for(let cards of clickable){
				if(cards[0] === row && cards[1] === col){
					found = true; //find the cards
				}
			}
			if(found){
				event.disabled = false;
				//event.classList.add('highlight_btn');
			}
		}
	}

}

/* FUNCTION: SUBMIT WORD */
function submit_word(){
	current_track = [];
	submitted_set.add(current_set);
	current_set = "";
	document.getElementById('current_set').innerHTML = current_set;
	update_words();
}


/* FUNCTION: AFTER SUBMIT WORD */
function after_submit(){
	var events = document.getElementsByClassName('card');
	for(let event of events){
		event.classList.remove('active');
	}
	current_track = [];
	update_clickable_dice();
}


/* FUNCTION: UPDATE WORD BANK */
function update_words(){
	var score;
	var sum = 0;
	document.getElementById('table_words').innerHTML = "";
	for(let word of submitted_set){
		score = calculate_score(word);
		sum += score;
		document.getElementById('table_words').innerHTML += "<div><span>"+word+"</span>"+"<span>"+score+"</span></div>";
	}
	document.getElementById('total-score').innerHTML = sum;
}


/* FUNCTION: CALCULATE SCORE */
function calculate_score(word){
	if (word.length == 3) return 1;
	else if (word.length == 4) return 1;
	else if (word.length == 5) return 2;
	else if (word.length == 6) return 3;
	else if (word.length == 7) return 5;
	else if (word.length >= 8) return 11;
}



/* FUNCTION: FIND ADJACENT DIE */
var ajacent_dice = [
[-1,-1],[-1,0],[-1,1],
[0,-1],			[0,1],
[1,-1],	[1,0],	[1,1]
];
function ajacent(row,col){
	clickable = [];
	var newrow,newcol;
	for(let neighbor of ajacent_dice){
		newrow = Number(row)+neighbor[0];
		newcol = Number(col)+neighbor[1];
		if(within_range(newrow,newcol)){
			clickable.push([newrow,newcol]);
		}
	}
}
function within_range(row,col){
	return(row>=0 && row<5 && col>=0 && col<5);
}


// STILL NEEDS SOME WORK!
// FUNCTION: TIMER
var play = -1; // GLOBAL VAR
function timerFunction(action, duration, display) {
	var remaining_time; // LOCAL VAR
	
	function boggletimer() {
		// PLAY THE TIMER
		if (play == 1) {
			remaining_time = remaining_time-1;
		}
		// PAUSE THE TIMER
		else if (play == 0) {
		}
		
		// UPDATE TIMER ON SCREEN
		displayTime(formatTime(remaining_time));
		
		// RESET THE TIMER
		if (remaining_time == 0) {
			clearInterval(BT);
			play = -1;
		}
	}
	
	// FUNCTION: FORMAT TIME
	function formatTime(time_seconds) {
		time_m = (time_seconds / 60) | 0;
        time_s = (time_seconds % 60) | 0;
        time_m = time_m < 10 ? "0" + time_m : time_m;
        time_s = time_s < 10 ? "0" + time_s : time_s;
		return time_m + ":" + time_s;
	}	
	
	// FUNCTION: DISPLAY TIME
	function displayTime() {
		display.textContent = time_m + ":" + time_s;
		if (remaining_time <= 0) {clearInterval(BT);}
	}
	

	// INTITIATE THE TIMER
	if ( play == -1 ) {
		play = 1;
		remaining_time = duration;
		BT = setInterval(boggletimer, 1000);
	} 
	
	// TIMER WAS PLAYING, NOW PAUSE IT
	else if ( play == 1 ) {
		play = 0;
	}
	
	// TIMER WAS PAUSE, NOW PLAY IT
	else if ( play == 0 ) {
		play = 1;
	}
	
	// STOP BUTTON PRESSED
	if (action == 'stop'){
		play = -1;
		remaining_time = duration;
		displayTime(formatTime(remaining_time));
		clearInterval(BT);
	}	
}
