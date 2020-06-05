/* Initialize the Game */
var list_of_die = [
'AAAFRS','AAEEEE','AAFIRS','ADENNN','AEEEEM',
'AEEGMU','AEGMNN','AFIRSY','BJKQXZ','CCNSTW',
'CEIILT','CEILPT','CEIPST','DDLNOR','DHHLOR',
'DHHNOT','DHLNOR','EIIITT','EMOTTT','ENSSSU',
'FIPRSY','GORRVW','HIPRRY','NOOTUW','OOOTTU'
];

var list_of_die_2 = [
'ARELSC','TABIYL','EDNSWO','BIOFXR',
 'MCDPAE','IHFYEE','KTDNUO','MOQAJB',
 'ESLUPT','INVTGE','ZNDVAE','UKGELY',
 'OCATAI','ULGWIR','SPHEIN','MSHARO'
];

var board_generator = [];
var current_track = [];

// START GAME!
start_game();


function start_game() {
	board_generate();
	board();
}

function board(){
	var board = [];
	var board_temp = [];
	var dice_arr = [];
	var upside;
	var row;
	var character='';
	shuffle(board_generator);
	for(let i=0;i<board_generator.length;i++){
		dice_arr = board_generator[i];
		upside = random_face(dice_arr);
		if(upside==='Q')upside = 'Qu';
		board_temp.push(upside);
	}
	for(let i=0;i<board_temp.length;i=i+5){
		line = [];
		line.push(board_temp[i]);
		line.push(board_temp[i+1]);
		line.push(board_temp[i+2]);
		line.push(board_temp[i+3]);
		line.push(board_temp[i+4]);
		board.push(line);
	}

	//render board on HTML
	for(var row=0;row<5;row++){
		for(var col=0;col<5;col++){
			character = board[row][col];
			var button = "<button type='button' class='btn dice'"+"row="+row+" col="+col+">"+ character + "</button>";
			var row_selector = document.getElementById("row"+row);
			row_selector.innerHTML += button;
		}
	}

}

function board_generate(){
	var dice;
	for(let i=0;i<list_of_die.length;i++){
		dice = list_of_die[i].split('');
		board_generator.push(dice);
	}
}

function shuffle(arr){
	var j,temp;
	for(let i=arr.length;i>0;i--){
		j=Math.floor(Math.random()*i);
		temp = arr[i-1];
		arr[i-1] = arr[j];
		arr[j] = temp;
	}
}

function random_face(arr){
	var index = Math.floor(Math.random()*6);
	var upside_face = arr[index];
	return upside_face;
}

