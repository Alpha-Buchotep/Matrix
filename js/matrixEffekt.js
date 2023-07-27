//------------------------------------------------
// Mátrix effekt - Javascript by HaCh
//------------------------------------------------

//------------------------------------------
// Alapértelmezett beállítások
//
// Ezeket felül lehet bírálni a startMatrix
// függvény paramétereivel
//
// Ha parméter nélkül hívjuk meg a startMatrix
// függvényt, akkor az itt megadott értékek 
// lesznek használatban
//------------------------------------------

var defSzoveg = "MATRIX.PRO"; // megjelenítendő szöveg
var defBetuMeret = 12; // pixelben értendő
var defBetuTipus = "Arial"; // "Verdana", "Tahoma"
var defBetuSzin = "FF0000"; // betűszín nem kell a # !!!
var defHatterSzin = "0,0,0,0.03"; // háttérszín R-G-B-A
var defIdo = 51; // mátrix effekt sebessége

//------------------------------------------
// ha a tobbPeldany értéke igen, akkor többszörösen meg lehet 
// hívni a függvényt, amivel érdekes hatásokat válthatunk ki

var tobbPeldany = "igen";

//------------------------------------------

var leallitasSignal = 1;
var tmpAllapot;
defSzoveg = defSzoveg.split("");
var jelenlegiBetumeret;
var c = document.getElementById("vaszon");
var cxt = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
var drops = [];
var oszlopok = c.width/defBetuMeret; 
var matrixIdozito;

for(let x=0;x<oszlopok;x++){
  drops[x]=1;
}

//-------------------------------------------------
// Amennyiben nem az alapértelmezett betűmérettel
// hívjuk meg a függvényt, újraszámoljuk az értékeket
// a megfelelő megjelenés érdekében
// Ez a függvény meghívható pl. window.resize 
// esemény bekövetkezésekor, mivel újraszámolja
// a vászon méretét
// 
// A resize figyelés a jelen fájlban is be van állítva
//-------------------------------------------------

function matrixSzamolas(betumeret, atmeretezes) {

	if(betumeret == null || betumeret == undefined || betumeret == "") {
		defBetuMeret = Number(defBetuMeret);
	} else {
		defBetuMeret = Number(betumeret);
	}

	if(atmeretezes == true) {
		
		tmpAllapot = leallitasSignal;
		console.log("Átméretezés!");

		if(tmpAllapot == 0) {
			stopMatrix();
			leallitasSignal = 0;
		}

		c.width = window.innerWidth;
		c.height = window.innerHeight;
		drops = [];
		oszlopok = c.width/defBetuMeret; 

		for(let x=0;x<oszlopok;x++){
			drops[x]=1;
		}

		if(tmpAllapot == 0) {
			startMatrix();
		}

	} else {

		c.width = window.innerWidth;
		c.height = window.innerHeight;
		drops = [];
		oszlopok = c.width/defBetuMeret; 

		for(let x=0;x<oszlopok;x++){
			drops[x]=1;
		}
	}
}

//-------------------------------------------------
// A Mátrix effekt indítását / leállítását
// kezelő függvény > ez fut le, amikor a gombra
// kattintunk
// 
// Az állapottól függően (megy-e az effekt vagy sem)
// dől el, hogy melyik függvényt indítja el a gomb
//
// startMatrix vagy stopMatrix
//-------------------------------------------------

function matrixStartStop(melyik) {
	
	// Alapértelmezett effekt
	if(melyik == 1) {

		if(leallitasSignal == 0) {
			stopMatrix();
		}

		else if (leallitasSignal == 1) {
			startMatrix(51, "MATRIX.PRO", "FF0000", "0,0,0,0.03", "Arial", 12);
			document.querySelector('#matrixStartStop'+melyik).innerHTML = "MÁTRIX "+melyik+" STOP";
		}
	}

	// 2. példa
	if(melyik == 2) {

		if(leallitasSignal == 0) {
			stopMatrix();
		}

		else if (leallitasSignal == 1) {
			startMatrix(64, "MATRIX.PRO", "FF0066", "0,0,0,0.03", "Verdana", 12);
			startMatrix(51, "MATRIX.PRO", "DD9936", "0,0,0,0.04", "Verdana", 12);
			document.querySelector('#matrixStartStop'+melyik).innerHTML = "MÁTRIX "+melyik+" STOP";
		}
	}

	// 3. példa
	if(melyik == 3) {

		if(leallitasSignal == 0) {
			stopMatrix();
		}

		else if (leallitasSignal == 1) {
			startMatrix(30, "MATRIX.PRO", "CC6699", "15,15,15,0.09", "Verdana", 12);
			document.querySelector('#matrixStartStop'+melyik).innerHTML = "MÁTRIX "+melyik+" STOP";
		}
	}
		
	// 4. példa
	if(melyik == 4) {

		if(leallitasSignal == 0) {
			stopMatrix();
		}

		else if (leallitasSignal == 1) {
			startMatrix(60, "MATRIX.PRO", "00FF11", "0,0,0,0.02", "Verdana", 12);
			startMatrix(60, "MATRIX.PRO", "AA8836", "0,0,0,0.03", "Verdana", 11);
				document.querySelector('#matrixStartStop'+melyik).innerHTML = "MÁTRIX "+melyik+" STOP";
		}
	}

}

//-------------------------------------------------
// startMatrix függvény
//-------------------------------------------------
// @paraméterek > a rajzolas függvény megadható paraméterei
//
// mxIdo = az effekt sebessége (20-60 között szép)
//
// mxText = a megjelenítendő szöveg
//
// mxBetuSzin = a betű színe Megadni így kell: FF0000 - a # nem kell!!
//
// mxHatterSzin = a háttér színe RGBA (piros, zöld, kék, alfa, 0-255 között) formátumban
// megadni így kell: 0,0,0,0.03 vagy 255,0,255,0.6 stb.
//
// mxBetuTipus = a használandó betűtípus, megadni így kell: Arial vagy Verdana vagy Tahoma stb.
//
// mxBetuMeret = a betű mérete (pixelben), megadni így kell: 10 vagy 14 stb.
//
// FIGYELEM!
//
// amennyiben paraméterek nélkül hívjuk meg a függvényt, akkor az
// alapértelmezett értékek lesznek használatban
//
// Pl.:
// startMatrix();
//
// Amennyiben csak bizonyos paramétereken akarunk változtatni az alapértelmezetthez képest,
// akkor így hívjuk meg a függvényt:
//
// Pl.: (ebben a példában csak a szöveget és és betű méretét változtatjuk meg az alapértelmezett
// beállításhoz képest
//
// startMatrix("", "HELLÓKA!", "", "", "", 16);
//
// ugyanez helyes az alábbi formátumban is
//
// startMatrix(null, "HELLÓKA!", null, null, null, 16);
//
// Az alábbi példában mindent megváltoztatunk az alapértelmezett beálításokhoz képest
//
// startMatrix(51, "HELLÓKA!", "FF3636", "0,0,0,0.03", "Arial", 24);
//
//-------------------------------------------------

function startMatrix(mxIdo, mxText, mxBetuSzin, mxHatterSzin, mxBetuTipus, mxBetuMeret) {

	leallitasSignal = 0;

	if(mxIdo == "" || mxIdo == null || mxIdo == NaN || mxIdo == undefined) {
		defIdo = defIdo;
	} else {
		defIdo = Number(mxIdo);
	}

	if(mxText == "" || mxText == null || mxText == undefined) {
		defSzoveg = defSzoveg;
	} else {
		defSzoveg = mxText;
	}

	if(mxBetuSzin == "" || mxBetuSzin == null || mxBetuSzin == undefined) {
		defBetuSzin = defBetuSzin;
	} else {
		defBetuSzin = mxBetuSzin;
	}

	if(mxHatterSzin == "" || mxHatterSzin == null || mxHatterSzin == undefined) {
		defHatterSzin = defHatterSzin;
	} else {
		defHatterSzin = mxHatterSzin;
	}
	
	if(mxBetuTipus == "" || mxBetuTipus == null || mxBetuTipus == undefined) {
		defBetuTipus = defBetuTipus;
	} else {
		defBetuTipus = mxBetuTipus;
	}

	if(mxBetuMeret == "" || mxBetuMeret == null || mxBetuMeret == undefined || mxBetuMeret == NaN) {
		defBetuMeret = defBetuMeret;
	} else {
		defBetuMeret = Number(mxBetuMeret);
	}

	//-------------------------------------------
	// Csak akkor hívjuk meg a méreteket kalkuláló
	// függvényt, ha a betűtméret változott
	// beállítjuk a jelenlegiBetumeret változót
	// az aktuális betűméretre
	
	if(jelenlegiBetumeret != defBetuMeret && jelenlegiBetumeret != undefined) {
		jelenlegiBetumeret = defBetuMeret;
		matrixSzamolas(defBetuMeret);
	} else if (jelenlegiBetumeret == undefined) {
		jelenlegiBetumeret = defBetuMeret;
	}

	if (tobbPeldany != "igen") {
		console.log("Mátrix effekt - Start (egy példány engedélyezve)");
		try {clearInterval(matrixIdozito);} catch(err) { /*hiba */ }
			matrixSzamolas(defBetuMeret);
		} else {
			console.log("Mátrix effekt - Start (több példány engedélyezve)");
		}

	console.log("defIdo: "+defIdo+"\ndefSzoveg: "+defSzoveg+"\ndefBetuSzin: "+defBetuSzin+"\ndefHatterSzin: "+defHatterSzin+"\ndefBetuTipus: "+defBetuTipus+"\ndefBetuMeret: "+defBetuMeret);
	console.log("Jelenlegi betűmeret: "+jelenlegiBetumeret);
	
	//-------------------------------------------
	// Az itt kapott paraméterekkel időzítve meghívjuk a rajzolas függvényt
	matrixIdozito = setInterval(rajzolas, defIdo, defSzoveg, defBetuSzin, defHatterSzin, defBetuTipus, defBetuMeret);

}

//-------------------------------------------------
// startMatrix függvény vége
//-------------------------------------------------

//-------------------------------------------------
// Mátrix effekt leállíás függvény
//-------------------------------------------------

function stopMatrix() {
	leallitasSignal = 1;
	try {clearInterval(matrixIdozito);} catch(err) { /*hiba */ }

	// Összes időzítő törlése
	const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

	for (let i = 1; i < interval_id; i++) {
		window.clearInterval(i);
		console.log("Időzítők törölve...");
	}

	console.log("Mátrix effekt - Stop");
	document.querySelector('#matrixStartStop1').innerHTML = "MÁTRIX 1 START";
	document.querySelector('#matrixStartStop2').innerHTML = "MÁTRIX 2 START";
	document.querySelector('#matrixStartStop3').innerHTML = "MÁTRIX 3 START";
	document.querySelector('#matrixStartStop4').innerHTML = "MÁTRIX 4 START";
}

// -----------------------------------------------------------------------------------------
// FIGYELEM!
//
// Ezt a függvényt nem hívjuk meg közvetlenül, erre a célra szolgál a startMatrix függvény
//
// @paraméterek > a rajzolas függvény megadható paraméterei
//
// matrixSzoveg = a megjelenítendő szöveg
// betuszin = a betű színe, megadni így kell: FF0000 (hashmark nem kell)
// hatterszin = a háttér színe és áttetszősége, magadás rgba formátumban, pl.: 0,0,0,0.25
// betumeret = a megjelenő betűk mérete, magadás pixelben, pl.: 14
// -----------------------------------------------------------------------------------------

function rajzolas(matrixSzoveg, betuszin, hatterszin, betutipus, betumeret){
	
	// Háttérszín / áttetszőség ellenőrzés / beállítás
	if(hatterszin == "" || hatterszin == null || hatterszin == undefined) {
		cxt.fillStyle = "rgba("+defHatterSzin+")";
		cxt.fillRect(0,0,c.width,c.height);
	} else {
		cxt.fillStyle = "rgba("+hatterszin+")";
		cxt.fillRect(0,0,c.width,c.height);
	}

	// Mátrix szöveg ellenőrzés / beállítás
	if(matrixSzoveg == "" || matrixSzoveg == null || matrixSzoveg == undefined) {
		defSzoveg = defSzoveg;
	} else {
		defSzoveg = matrixSzoveg;
	}

	// Betűszín ellenőrzés / beállítás
	if(betuszin == "" || betuszin == null || betuszin == undefined) {
		cxt.fillStyle = "#"+defBetuSzin;
	} else {
		cxt.fillStyle = "#"+betuszin;
	}

	// Betűméret ellenőrzés / beállítás
	if(betutipus == "" || betutipus == null || betutipus == undefined) {
		defBetuTipus = defBetuTipus;
	} else {
		defBetuTipus = betutipus;
	}

	// Betűméret + betűtípus ellenőrzés / beállítás
	if(betumeret == "" || betumeret == null || betumeret == undefined) {
		cxt.font = defBetuMeret+"px "+defBetuTipus;
		defBetuMeret = defBetuMeret;
	} else {
		cxt.font = betumeret+"px "+defBetuTipus;
		defBetuMeret = Number(betumeret);
	}

//-------------------------------------------------

	for(let i=0;i<drops.length;i++){

		if(leallitasSignal == 1) {clearInterval(matrixIdozito); break; stopMatrix();}

		let text = defSzoveg[Math.floor(Math.random()*defSzoveg.length)];
		cxt.fillText(text,i*defBetuMeret,drops[i]*defBetuMeret);

		if(drops[i]*defBetuMeret>c.height && Math.random() >0.975)
			drops[i]=0;
			drops[i]++;

	}

//-------------------------------------------------

} //rajzolas függvény vége

//-------------------------------------------------
// Az ablak átméretezését figyelő eseménykezelő
// ha átméretezzük az ablakot, akkor meghívja a
// matrixSzamolas függvényt.
//-------------------------------------------------

function atmeretezes() {
	matrixSzamolas(defBetuMeret, true)
}

//-------------------------------------------------

// Átméretezés figyelése (listener)
window.addEventListener("resize", atmeretezes);

//-------------------------------------------------
