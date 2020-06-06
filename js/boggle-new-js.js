
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

// START GAME!
start_game(5);


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
	for(let i=n;i>0;i--){
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

