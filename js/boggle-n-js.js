
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


// FUNCTION: START GAME
function boggle_n(n){
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
	document.write('<p>');
	
	document.write('<table class="centered" style="border:2px solid #000;padding:20px;">');
	//document.write('<h1>Timer: <span id="time1">02:30</span> </h1>');
	//document.write('<button onclick="startTimer(150, document.querySelector('#time1'))">Start Timer</button>');
	
	// Print each die value by row [i] and element in row [j]
	for (let i=0; i < n; i++) {
		document.write('<tr>');
		for (let j=0; j < n; j++) {
			document.write('<td style="width:100px;height:100px;font-size:40px;border:2px solid #000;">'+dice_grid[n*i+j]+'</td>');
		}
		document.write('</tr>');
	}
	
	if (n==4) {
		document.write('<tr><td colspan="'+n+'"><a href="../pages/boggle.html">ROLL THE DICE AGAIN</a></td></tr>');
	} else if (n==5) {
		document.write('<tr><td colspan="'+n+'"><a href="../pages/boggle-big.html">ROLL THE DICE AGAIN</a></td></tr>');
	}
	document.write('</table>');
	return true;
}



function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

    };
    timer();
    setInterval(timer, 1000);
}
