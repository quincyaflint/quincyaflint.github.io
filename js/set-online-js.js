var canv1 = getelem("canvas1");
var g = canv1.getContext("2d");
var canv2 = getelem("canvas2");
var g2 = canv2.getContext("2d");
var canv3 = getelem("canvas3");
var g3 = canv3.getContext("2d");

var solvecount = 0;
var totaltime = 0;

function NewSession()
{
 solvecount = 0;
 totaltime = 0;
 showAvg(0);
}

//red
  var colors =   [ "#05f", "#f00", "#0b0" ];
  var ltcolors = [ "#adf", "#f7f", "#cfd" ];
//violet
//var colors =   [ "#05f", "#80f", "#0b0" ];
//var ltcolors = [ "#cdf", "#a8c", "#cfd" ];

function getelem(e)
{
 return document.getElementById(e);
}
var debugging = false;
//debugging = true;
function debug(s)
{
 if (debugging) 
   {
    getelem("debug").innerHTML += s + "<br>";
   }
}
function mdebug(s)
{
 getelem("mdebug").innerHTML = s;
}

var xloc = new Object();
var yloc = new Object();
function getoffset(item)
{
 var offsets = "DOTESFBRG";
 return offsets.indexOf(item) % 3;
}

var figw = 32;
var figh = 48;

function drawshape(desc)
{
 // desc = shape / shading / color
 // ...... D O T / E S F / B R G
 // Diamond Oval Triangle
 // Empty Striped Filled
 // Blue Red Green

 var color = desc.substr(0,1);
 var shade = desc.substr(1,1);
 var shape = desc.substr(2,1);
 var offset1 = getoffset(color);
 var offset2 = getoffset(shade);
 var offset3 = getoffset(shape);

 var x = offset1 * (3*figw+25);
 x += offset2 * (figw+5);
 y = offset3 * (figh+10);
 x += 15;
 y += 15;

 xloc[desc] = x;
 yloc[desc] = y;
 var divisor = 1;

 g2.save();
 g2.beginPath();
 g2.lineWidth = 3;
 if (shape == "D") // draw diamond
   {
	//var img = document.getElementById("DOB");
	//g2.drawImage(img, x, y, figw, figh);
    g2.moveTo(x+figw/2, y);
    g2.lineTo(x+figw, y+figh/2);
    g2.lineTo(x+figw/2, y+figh);
    g2.lineTo(x, y+figh/2);
    g2.lineTo(x+figw/2, y);
   }
 else if (shape == "O") // draw oval
   {
    divisor = 0.6;
    g2.scale(divisor, 1);
    g2.arc(x/divisor+figh/2, y+figh/2, figh/2, 0, Math.PI*2, false);
    g2.lineWidth = 4;
   }
 else if (shape == "T") // draw triangle
   {
    g2.moveTo(x+figw/2, y);
    g2.lineTo(x+figw, y+figh);
    g2.lineTo(x, y+figh);
    g2.lineTo(x+figw/2, y);
   }
 g2.strokeStyle = colors[offset1];
 g2.stroke();
 g2.clip();
 if (shade == "F") // filled
   {
    g2.fillStyle = colors[offset1];
    g2.fill();
   }
 else if (shade == "S") // striped
   {
    g2.fillStyle = ltcolors[offset1];
    g2.fill();
    var i;

   }
 g2.restore();
}

function drawshapes()
{
 // ...... D O T / E S F / B R G
 var s1 = "BRG";
 var s2 = "ESF";
 var s3 = "DOT";
 var i, j, k;
 for (i = 0; i < 3; i++)
   {
    var color = s1.substr(i,1);
    for (j = 0; j < 3; j++)
      {
       var shade = s2.substr(j,1);
       for (k = 0; k < 3; k++)
         {
	  var shape = s3.substr(k,1);
	  drawshape(color + shade + shape);
	 }
      }
   }
 
}
drawshapes();

var elems;
var echk;
var sets;

var cardx, cardy, cardw, cardh;
var picked = new Array();
var pickedcards = 0;
var setsfound = 0;
var found = new Array();
var startTime;
var pauseTime;
var totdifficulty;
var diffdebug;

function draw1card(card, picked)
{
 var c2 = canv2;
 var x = (card % 4) * (cardw + 25);
 var y = Math.floor(card / 4) * (cardh + 10);
 x += 10;
 y += 20;

 g.clearRect(x-2, y-2, cardw+4, cardh+4);
 g.fillStyle = picked ? "#fff" : "#ccc";
 g.fillRect(x, y, cardw, cardh);
 g.strokeStyle = "black";
 g.lineWidth = 2;
 g.strokeRect(x, y, cardw, cardh);

 cardx[card] = x;
 cardy[card] = y;
 var desc = elems[card];
 var n = desc.substr(0,1);
 desc = desc.substr(1);
 var figx = xloc[desc];
 var figy = yloc[desc];
 x += ((2-n) * (figw+1)) / 2;
 for (i=0; i<=n; i++)
   {
   g.drawImage(c2, figx-2, figy-2, figw+5, figh+5, x+3, y+7, figw+5, figh+5);
   x += figw + 3;
   }
}

function drawcards()
{
 cardx = new Array();
 cardy = new Array();
 cardw = figw*3 + 15;
 cardh = figh + 15;

 g.clearRect(0, 0, 550, 400);
 g3.clearRect(0, 0, 300, 400);
 var card,i,j,k,m,n;
 for (card=0; card<12; card++)
    draw1card(card);
}

function canvasTop() {return Number(canv1.offsetTop);}
function canvasLeft() {return Number(canv1.offsetLeft);}
function inRect(x, y, l, t, w, h)
{
 return (x >= l && x < l+w*1 && y >= t && y < t+h*1);
}

function mouseUp(e)
{
  var x = e.pageX - canvasLeft();
  var y = e.pageY - canvasTop();
  //mdebug(x + "," + y);
  var card;
  for (card = 0; card < 12; card++)
    {
     if (inRect(x, y, cardx[card], cardy[card], cardw, cardh))
       {
        pick(card, false);
	break;
       }
    }
}

function pick(card, forall)
{
 var x = cardx[card];
 var y = cardy[card];
 if (pickedcards > 2 && !forall)
   {
    mdebug("Only pick 3 at a time");
    return;
   }

 if (picked[card])
   {
    g.strokeStyle = "black";
    pickedcards--;
    draw1card(card, false);
   }
 else 
   {
    draw1card(card, true);
    g.strokeStyle = "#888";
    pickedcards++;
    g.lineWidth = 3;
    g.strokeRect(x, y, cardw, cardh);
   }

 picked[card] = !picked[card];
 if (pickedcards == 3 && !forall)
   {
    checkSet();
   }
}

var setword = " set";

function copyset(s)
{
 var cards = sets[s].split(",");
 var c0, c1, c2;
 c0 = cards[0];
 if (elems[cards[1]] < elems[c0]) c0 = cards[1];
 if (elems[cards[2]] < elems[c0]) c0 = cards[2];

 c2 = cards[0];
 if (elems[cards[1]] > elems[c2]) c2 = cards[1];
 if (elems[cards[2]] > elems[c2]) c2 = cards[2];

 if (cards[0] != c0 && cards[0] != c2) c1 = cards[0];
 if (cards[1] != c0 && cards[1] != c2) c1 = cards[1];
 if (cards[2] != c0 && cards[2] != c2) c1 = cards[2];

 cards = [ c0, c1, c2 ];

 var x = 5;
 var y = setsfound*(figh/2+15) + 15;
 var i;
 for (i = 0; i<cards.length; i++)
   {
    var c = cards[i];
    g3.drawImage(canv1, cardx[c], cardy[c], cardw, cardh, x, y, cardw/2, cardh/2);
    x += cardw/2 + 5;
   }
 found[s] = true;
 setsfound++;
 if (setsfound < 6) display_rw("s"+setsfound, 600);
 g3.font = "bold 16px Arial";
 var t = new Date().getTime();
 t = t - startTime;
 g3.fillText(formatTime(t), x, y + cardh/3);
 if (setsfound == 6)
   {
    totaltime += Number(t);
    t/=1000;
    mdebug( (t < 60 ? "Under one minute - Super!" :
    	     t < 120 ? "Under two minutes - Good!" :
	     "All sets found") +
	     // wasn't a good idea after all
	     //"<br>Difficulty index: " + totdifficulty +
	     // diffdebug +
	     ""
	     );
    lightall(t);
    solvecount++;
    showAvg(totaltime/solvecount);
   }
 else
    mdebug(setsfound + setword + " found");
 setword = " sets";
}

function showAvg(timetaken)
{
 getelem("session").innerHTML = 
 	timetaken > 0? 
		"Average time: " + formatTime(timetaken) + " (" + solvecount +")" :
		"&nbsp;";
}

function lightall(time)
{
 var i;
 for (i = 0; i<12; i++)
   {
    pick(i, true);
   }
 time = Number(time);
 if (time < 60) display_rw("gold", 0)
 else if (time < 120) display_rw("silver", 0)
 else
 display_rw("gotit", 0); // when all done show check mark
}

function display_rw(iname, timer)
{
 debug("display " + iname);
 var i = getelem(iname);
 var l = canvasLeft()-110; //+cardw*2;
 if (l < 0) l = 0;
 i.style.marginLeft = l;
 i.style.display = "block";
 if (timer > 0)
    setTimeout("getelem('" +iname+ "').style.display='none'", timer);
}

function finishCheck(aSet, s)
{
 var i;
 for (i = 0; i<12; i++)
   {
    if (picked[i])
      {
       pick(i, true);
      }
   }
 if (aSet == true) copyset(s);  // don't display for right
 else display_rw(aSet, 600);
}

function checkSet()
{
 //mdebug("checkSet called");
 var candidate = "";
 candidate = candidate.substr(0, candidate.length-1);
 var s;
 var msg = "Not a set";
 var aSet = "'wrong'";
 for (s = 0; s<sets.length; s++)
   {
    var i;
    var candidate = "";
    for (i = 0; i<12; i++)
      {
       if (picked[i])
	  candidate += i + ",";
      }
    candidate = candidate.substr(0, candidate.length-1);
    if (candidate == sets[s])
      {
       var cards = sets[s].split(",");
       if (found[s])
         {
	  msg = "Duplicate";
	  aSet = "'dup'";
	 }
       else
	  aSet = true;
       break;
      }
   }
 if (aSet != true) mdebug(msg);
 setTimeout("finishCheck(" + aSet + "," + s +")", 150);
}

function formatTime(timetaken)
{
 timetaken = Math.round(timetaken/1000);
 var secs = timetaken % 60;
 secs = ("0" + secs).substr(-2);
 var mins = Math.floor(timetaken / 60);
 var r = mins + ":" + secs;
 return r;
}

var paused = false;
function PauseResume()
{
 var pb = getelem("pausebut");
 if (paused)
   {
    canv1.style.visibility = "visible";
    canv3.style.visibility = "visible";
    pb.value = "Pause";
    var t = new Date().getTime();
    startTime += t - pauseTime;
    mdebug("&nbsp;");
   }
 else
   {
    canv1.style.visibility = "hidden";
    canv3.style.visibility = "hidden";
    pb.value = "Resume";
    mdebug("Paused");
    pauseTime = new Date().getTime();
   }
 paused = !paused;
}

function Hint()
{
 var hinttext = "";
 var hintsets = new Array();
 var setct = new Array();
 var s;
 for (s = 0; s<sets.length; s++)
   {
    if (!found[s])
      {
       var e = sets[s].split(",");
       var i;
       for (i=0;i<3;i++)
	  setct[i] = (Number(elems[e[i]].substr(0,1))+1);
       setct.sort();
       hintsets.push(setct.join(""));
      }
   }
 hintsets.sort();
 mdebug(hintsets.length == 0 ? "&nbsp;" : hintsets.join(" "));
}

var totdifficulty;
var level;
var levelEASY = 0;
var levelHARD = 1;
level = levelHARD;

function setLevelEasy() 
{
 level = levelEASY;
 getelem("easybut").style.backgroundColor = "white";
 getelem("hardbut").style.backgroundColor = "#ccc";
}
function setLevelHard() 
{
 level = levelHARD;
 getelem("hardbut").style.backgroundColor = "white";
 getelem("easybut").style.backgroundColor = "#ccc";
}


function makepuzzle()
{
elems = new Array();
echk = new Object();
sets = new Array();

var colors = "BRG";
var shapes = "TDO";
var shades = "ESF";
if (level == levelEASY)
  {
   var which = Math.random()*3;
   var sel = Math.floor(Math.random()*3);
   if (which < 0.3333) colors = colors.substr(sel,1);
   else if (which < 0.9667) shapes = shapes.substr(sel,1);
   else shades = shades.substr(sel,1);
  }

var i;
for (i = 0; i < 12; i++)
  {
   var e;
   do
   {
   var n = Math.floor (Math.random()*3);

   var color = colors.substr (Math.floor(Math.random()*colors.length), 1);
   var shape = shapes.substr (Math.floor(Math.random()*shapes.length), 1);
   var shade = shades.substr (Math.floor(Math.random()*shades.length), 1);
   e = n + color + shade + shape;
   } while (echk[e] == 1);
   echk[e] = 1;
   elems.push(e);
  }
var i, j, k;
totdifficulty = 0;
diffdebug = "";
for(i = 0; i<10; i++)
{
 for (j = i+1; j<11; j++)
 {
  candidate:
  for (k = j+1; k<12; k++)
    {
     var set = new Array(elems[i], elems[j], elems[k]);
     var s;
     var sums = new Array(0,0,0,0);
     var quirks = new Array("", "", "", "");
     var setdifficulty = 0;
     var setdiffdebug = "";
     for (s in set)
       {
	var e = set[s];
	var n;
	for (n=0; n<4; n++)
	  {
	   var c = e.substr(n,1);
	   //debug(e + " " + n + ":" + c);
	   var v = (0 <= c && c <=2) ? Number(c) : Number(getoffset(c));
	   sums[n] += v;
	   quirks[n] += "" + v; // string form
	  }
       }
     //debug(set + " " + sums);
     var quirk;
     for (s=0; s<4; s++)
       {
        if (sums[s] % 3 != 0) continue candidate;
	quirk = quirks[s];
	//setdiffdebug += quirk + " ";
	quirk = quirk == "111" || quirk == "222" || quirk == "000" ? 0 : 1;
        setdifficulty += quirk;
	setdiffdebug += quirk;
       }
     sets.push(i + "," + j + "," + k);
     totdifficulty += setdifficulty;
     diffdebug += " (" + setdiffdebug + ")";
    }
 }
}
 return sets;
}

function newpuzzle()
{
setword = " set";
picked = new Array();
pickedcards = 0;
setsfound = 0;
found = new Array();
mdebug("&nbsp;");
if (paused) PauseResume();

var tries = 0;
var sets = null
while (tries < 500)
{
 tries++;
 sets = makepuzzle();
 if (sets.length == 6)
   {
    var sp = " &nbsp; ";
    debug (elems[0] + sp +elems[1] +sp +elems[2] +sp + elems[3]);
    debug (elems[4] + sp +elems[5] +sp +elems[6] +sp + elems[7]);
    debug (elems[8] + sp +elems[9] +sp +elems[10]+sp + elems[11]);
    debug ("");

    debug (sets.length + " sets: ");
    var s;
    var setct = new Array();
    for (s = 0; s<sets.length; s++)
      {
       debug(sets[s]);
       var e = sets[s].split(",");
       var i;
       for (i=0;i<3;i++)
         {
	  setct[i] = (Number(elems[e[i]].substr(0,1))+1);
	 }
       setct.sort();
      }
    debug("<hr>");
    break;
   }
}
if (sets.length != 6)
   mdebug("Puzzle gen timed out - try again, please.");

debug(tries + " tries");
drawcards();
getelem("gotit").style.display = "none";
getelem("silver").style.display = "none";
getelem("gold").style.display = "none";
getelem("dup").style.display = "none";
//debug(cardx.join(" ") + " " + cardw);
//debug(cardy.join(" ") + " " + cardh);
startTime = new Date().getTime();
}
canv1.addEventListener('mouseup', mouseUp, false);
setLevelHard();
newpuzzle();