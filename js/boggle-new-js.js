
// GLOBAL VARIABLES
var dice_list_4 = [
'ARELSC','TABIYL','EDNSWO','BIOFXR',
 'MCDPAE','IHFYEE','KTDNUO','MOQAJB',
 'ESLUPT','INVTGE','ZNDVAE','UKGELY',
 'OCATAI','ULGWIR','SPHEIN','MSHARO'
];

var dice_list_5 = [
'AAAFRS','AAEEEE','AAFIRS','ADENNN','AEEEEM',
'AEEGMU','AEGMNN','AFIRSY','BJKQXZ','CCNSTW',
'CEIILT','CEILPT','CEIPST','DDLNOR','DHHLOR',
'DHHNOT','DHLNOR','EIIITT','EMOTTT','ENSSSU',
'FIPRSY','GORRVW','HIPRRY','NOOTUW','OOOTTU'
];

var clickable = [];
var current_track = [];
var current_word = "";
var submitted_words = new Set();

// START GAME!
start_game(5);
button_event();


// FUNCTION: START GAME
function start_game(n){
	var num_dice = n*n;
	var dice_grid = [];
	var dice_list = [];
	var die_face;
	var t1, t2;
	
	if (n==4){dice_list=dice_list_4};
	if (n==5){dice_list=dice_list_5};
	
	// SHUFFLE DICE
	for(let i=num_dice;i>0;i--){
		t1 = Math.floor(Math.random()*i);
		t2 = dice_list[i-1];
		dice_list[i-1] = dice_list[t1];
		dice_list[t1] = t2;
	}
	
	
	// PICK FACE OF EACH DIE
	for(let i=0;i<num_dice;i++){
		die_face = dice_list[i][Math.floor(Math.random()*6)];
		if(die_face==='Q'){die_face = 'Qu'};
		dice_grid.push(die_face);
	}
	
	
	// RENDER BOARD IN HTML
	for(var row=0;row<n;row++){
		for(var col=0;col<n;col++){
			die_face = dice_grid[row*n+col];
			var button = "<button type='button' class='btn dice'"+"row="+row+" col="+col+">"+ die_face + "</button>";
			var row_selector = document.getElementById("row"+row);
			row_selector.innerHTML += button;
				
		}
	}
	
}


/* FUNCTION: BUTTON_EVENT */
function button_event(){
	var row,col,die_value;
	var events = document.getElementsByClassName('dice');
	for(let event of events){
		event.onclick = function(){
			row = Number(event.getAttribute('row'));
			col = Number(event.getAttribute('col'));
			die_value = event.innerHTML;	
			// IF SELECTED DIE NOT ATICE, ADD TO WORD
			if(!event.classList.contains('active')){
				current_track.push([row,col]);
				current_word += die_value;
			// IF SELECTED DIE ACTIVE, REMOVE FROM WORD
			}else{
				current_track.pop();
				current_word = current_word.substring(0,current_word.length-1);
			}
			// DETERMINE SELECTABLE DICE
			if(current_track.length !== 0){
				var current_dice = current_track[current_track.length-1];
				ajacent(current_dice[0],current_dice[1]);
				clickable = modify_clickable(clickable,current_track);
				clickable.push([current_dice[0],current_dice[1]]);
			}
			update_clickable_dice();
			document.getElementById('current_word').innerHTML = current_word;
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
	var dice1 = [];
	var dice2 = [];
	var difference = clickable.slice(); // COPY OF CLICKABLE
	for(let i=clickable.length-1;i>=0;i--){
		for(let j=0;j<current_track.length;j++){
			var dice1 = clickable[i];
			var dice2 = current_track[j];
			if( dice1[0] === dice2[0] && dice1[1] === dice2[1] ){
					difference.splice(i,1);
			}
		}
	}
	return difference; // CLICKABLE LESS CURRENT TRACK VALUES
}


/* FUNCTION: UPDATE CLICKABLE */
function update_clickable_dice(){
	var events = document.getElementsByClassName('dice');
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
			for(let dice of clickable){
				if(dice[0] === row && dice[1] === col){
					found = true; //find the dice
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
	if(current_word.length<3){
		err_msg = "WORDS MUST BE AT LEAST 3 LETTERS LONG";
		document.getElementById('error').innerHTML = err_msg;
		current_track = [];//reset current_track
		current_word = "";
		document.getElementById('current_word').innerHTML = current_word;
	}else{
		current_track = [];
		submitted_words.add(current_word);
		current_word = "";
		document.getElementById('current_word').innerHTML = current_word;
		update_words();
	}
}


/* FUNCTION: AFTER SUBMIT WORD */
function after_submit(){
	var events = document.getElementsByClassName('dice');
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
	for(let word of submitted_words){
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
	
	
	// BEGIN HERE!!!!
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
