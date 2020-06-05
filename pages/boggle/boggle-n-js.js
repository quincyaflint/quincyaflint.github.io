function boggle_n(n){
	var i = 0, j = 0, k = 0; 
	var ranvar, save;
	var num_dice = n*n;
	var num_dice_from_0 = num_dice-1;
	var g = new Array(num_dice_from_0);
	var dice = new Array(num_dice_from_0);
	var cubes_4x4 = new Array(
		'AAEEGN','ABBJOO','ACHOPS','AFFKPS',
		'AOOTTW','CIMOTU','DEILRX','DELRVY',
		'DISTTY','EEGHNW','EEINSU','EHRTVW',
		'EIOSST','ELRTTY','HIMNQU','HLNNRZ');
	var cubes_5x5 = new Array(
		'AAAFRS','AAEEEE','AAFIRS','ADENNN','AEEEEM',
		'AEEGMU','AEGMNN','AFIRSY','BJKQXZ','CCNSTW',
		'CEIILT','CEILPT','CEIPST','DDLNOR','DHHLOR',
		'DHHNOT','DHLNOR','EIIITT','EMOTTT','ENSSSU',
		'FIPRSY','GORRVW','HIPRRY','NOOTUW','OOOTTU');

	if (n==4){
		d = cubes_4x4;
	} else if (n==5) {
		d = cubes_5x5;
	}

	// g = 1:num_dice
	for (i=0; i < num_dice; i++) {
		g[i] = i;
	}
	
	document.write('<p>');
	do {
		ranvar = Math.round(Math.random()*num_dice_from_0); // random number between 0 and n*n-1
		save = g[num_dice_from_0];
		g[num_dice_from_0] =  g[ranvar];
		dice[num_dice_from_0] = g[num_dice_from_0];
		g[ranvar] = save;
		num_dice_from_0 = num_dice_from_0 - 1;
	} while ( num_dice_from_0 > 0 );

	// Get the letter from each die
	for (i=0; i < num_dice; i++) {
		save = g[i];
		ranvar = Math.round(Math.random()*5);
		g[i] = d[save].substring(ranvar,ranvar+1);
	}

	
	// Fix Q's --> Qu's
	for (i=0; i < num_dice; i++) {
			if (g[i] == 'Q') { g[i] = 'Qu' }
	}
	
	// Establish table
	document.write('<center><table class="centered" border="2" cellpadding="20" cellspacing="0">');
	//document.write('<h1>Timer: <span id="time">02:30</span> </h1>');
	
	// Print each die value by row [i] and element in row [j]
	for (i=0; i < n; i++) {
		document.write('<tr>');
		for (j=0; j < n; j++) {
			document.write('<td width=100 height=100><font size="7">'+g[n*i+j]+'</font></td>');
		}
		document.write('</tr>');
	}
	
	if (n==4) {
		document.write('<tr><td colspan="'+n+'"><a href="./boggle.html">ROLL THE DICE AGAIN</a></td></tr>');
	} else if (n==5) {
		document.write('<tr><td colspan="'+n+'"><a href="./boggle-big.html">ROLL THE DICE AGAIN</a></td></tr>');
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
