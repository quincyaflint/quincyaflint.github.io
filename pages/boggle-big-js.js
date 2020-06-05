function bogglebig(){
   var i = 0, k = 0 ;
   var ranvar, last, save;
   var g = new Array(24);
   var dice = new Array(24);
   var d = new Array('AAAFRS','AAEEEE','AAFIRS','ADENNN','AEEEEM',
'AEEGMU','AEGMNN','AFIRSY','BJKQXZ','CCNSTW',
'CEIILT','CEILPT','CEIPST','DDLNOR','DHHLOR',
'DHHNOT','DHLNOR','EIIITT','EMOTTT','ENSSSU',
'FIPRSY','GORRVW','HIPRRY','NOOTUW','OOOTTU');
   for (i=0; i < 25; i++) {
	  g[i] = i;
   }
   document.write('<p>');
   last = 24;
   do {
	  ranvar = Math.round(Math.random()*last);
	  save = g[last];
	  g[last] =  g[ranvar];
	  dice[last] = g[last];
	  g[ranvar] = save;
	  last = last - 1;
   } while ( last > 0 );
// dice[0] = g[0];

// Get the letter from each dice

   for (i=0; i < 25; i++) {
	  save = g[i];
	  ranvar = Math.round(Math.random()*5);
	  g[i] = d[save].substring(ranvar,ranvar+1);
}

// Display results
   document.write('<center><table border="2" cellpadding="20" cellspacing="0">');
   
   k = -5;
   for (i=0; i < 5; i++) {
	  k = k + 5;
	  if (g[k+0] == 'Q') { g[k+0] = 'Qu' }
	  if (g[k+1] == 'Q') { g[k+1] = 'Qu' }
	  if (g[k+2] == 'Q') { g[k+2] = 'Qu' }
	  if (g[k+3] == 'Q') { g[k+3] = 'Qu' }
	  if (g[k+4] == 'Q') { g[k+4] = 'Qu' }
	  document.write('<tr align="center">');
	  
	  document.write('<td width=115 height=115><font size="7">'+g[k]+'</font></td>');
	  document.write('<td width=115 height=115><font size="7">'+g[k+1]+'</font></td>');
	  document.write('<td width=115 height=115><font size="7">'+g[k+2]+'</font></td>');
	  document.write('<td width=115 height=115><font size="7">'+g[k+3]+'</font></td>');
	  document.write('<td width=115 height=115><font size="7">'+g[k+4]+'</font></td>');
	  document.write('</tr>');
   }
   document.write('<tr><td align="center" colspan="5"><a href="./boggle.html">ROLL THE DICE AGAIN</a></td></tr>');
   document.write('</table></center>');
   return true;
}
