
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
	document.write('<p>');
	// Establish table
	
	document.write('<center><table class="centered" border="2" cellpadding="20" cellspacing="0">');
	//document.write('<h1>Timer: <span id="time1">02:30</span> </h1>');
	//document.write('<button onclick="startTimer(150, document.querySelector('#time1'))">Start Timer</button>');
	
	// Print each die value by row [i] and element in row [j]
	for (let i=0; i < n; i++) {
		document.write('<tr>');
		for (let j=0; j < n; j++) {
			document.write('<td width=100 height=100><font size="7">'+dice_grid[n*i+j]+'</font></td>');
		}
		document.write('</tr>');
	}
	
	if (n==4) {
		document.write('<tr><td colspan="'+n+'"><a href="../pages/boggle.html">ROLL THE DICE AGAIN</a></td></tr>');
	} else if (n==5) {
		document.write('<tr><td colspan="'+n+'"><a href="../pages/boggle-big.html">ROLL THE DICE AGAIN</a></td></tr>');
	}
	document.write('</table></center>');
	return true;
}



function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}
