var living = [];
const dim = 40;

function createWorld() {
	var txt = "", row = "";
	for(var i = 0; i < dim; i++) {
		row = row + "<tr id = r" + i.toString() + ">\n";
		for(var j = 0; j < dim; j++)
			row = row + "<td id = e" + (i * dim + j).toString() + " onclick = 'toggle(\"e" + (i * dim + j).toString() + "\")'></td>\n";
		txt = txt + row + "</tr>\n";
		row = "";
	}
	document.getElementById("tab").innerHTML = txt;
}

function toggle(id) {
	if(document.getElementById(id).style.backgroundColor === "black") {
		document.getElementById(id).style.backgroundColor = "white";
		var i = living.indexOf(id);
		living.splice(i, 1);
	} else {
		document.getElementById(id).style.backgroundColor = "black";
		living.push(id);
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
	document.getElementById("button").innerHTML = "Clear...";
	document.getElementById("button").onclick = clear;
	while(true) {
		await sleep(500);
		var old = living.slice();
		for(var id = 0; id < old.length; id++) {
			var l = getLivingNeighbours(old, old[id]);
			if(l < 2 || l > 3)
				toggle(old[id]);
			generateNeighbours(old, old[id]);
		}
		if(living.length === 0)
			break;
	}
	document.getElementById("button").innerHTML = "Start!";
	document.getElementById("button").onclick = start;
}

function generateNeighbours(old, id) {
	var pos = parseInt(id.substr(1, id.length));
	var r = Math.floor(pos / dim);
	var c = pos % dim;
	if(r - 1 > 0 && old.indexOf("e" + ((r - 1) * dim + c).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + ((r - 1) * dim + c).toString());
		if(l === 3)
			toggle("e" + ((r - 1) * dim + c).toString());
	}
	if(r + 1 < dim && old.indexOf("e" + ((r + 1) * dim + c).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + ((r + 1) * dim + c).toString());
		if(l === 3)
			toggle("e" + ((r + 1) * dim + c).toString());
	}
	if(c - 1 > 0 && old.indexOf("e" + (r * dim + c - 1).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + (r * dim + c - 1).toString());
		if(l === 3)
			toggle("e" + (r * dim + c - 1).toString());
	}
	if(r + 1 < dim && old.indexOf("e" + (r * dim + c + 1).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + (r * dim + c + 1).toString());
		if(l === 3)
			toggle("e" + (r * dim + c + 1).toString());
	}
	if(r - 1 > 0 && c - 1 > 0 && old.indexOf("e" + ((r - 1) * dim + c - 1).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + ((r - 1) * dim + c - 1).toString());
		if(l === 3)
			toggle("e" + ((r - 1) * dim + c - 1).toString());
	}
	if(r - 1 > 0 && c + 1 < dim && old.indexOf("e" + ((r - 1) * dim + c + 1).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + ((r - 1) * dim + c + 1).toString());
		if(l === 3)
			toggle("e" + ((r - 1) * dim + c + 1).toString());
	}
	if(r + 1 < dim && c - 1 > 0 && old.indexOf("e" + ((r + 1) * dim + c - 1).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + ((r + 1) * dim + c - 1).toString());
		if(l === 3)
			toggle("e" + ((r + 1) * dim + c - 1).toString());
	}
	if(r + 1 < dim && c + 1 < dim && old.indexOf("e" + ((r + 1) * dim + c + 1).toString()) === -1) {
		var l = getLivingNeighbours(old, "e" + ((r + 1) * dim + c + 1).toString());
		if(l === 3)
			toggle("e" + ((r + 1) * dim + c + 1).toString());
	}
}

function getLivingNeighbours(old, id) {
	var pos = parseInt(id.substr(1, id.length));
	var r = Math.floor(pos / dim);
	var c = pos % dim;
	var a = 0;
	if(r - 1 > 0 && old.indexOf("e" + ((r - 1) * dim + c).toString()) !== -1)
		a = a + 1;
	if(r + 1 < dim && old.indexOf("e" + ((r + 1) * dim + c).toString()) !== -1)
		a = a + 1;
	if(c - 1 > 0 && old.indexOf("e" + (r * dim + c - 1).toString()) !== -1)
		a = a + 1;
	if(c + 1 < dim && old.indexOf("e" + (r * dim + c + 1).toString()) !== -1)
		a = a + 1;
	if(r - 1 > 0 && c - 1 > 0 && old.indexOf("e" + ((r - 1) * dim + c - 1).toString()) !== -1)
		a = a + 1;
	if(r - 1 > 0 && c + 1 < dim && old.indexOf("e" + ((r - 1) * dim + c + 1).toString()) !== -1)
		a = a + 1;
	if(r + 1 < dim && c - 1 > 0 && old.indexOf("e" + ((r + 1) * dim + c - 1).toString()) !== -1)
		a = a + 1;
	if(r + 1 < dim && c + 1 < dim && old.indexOf("e" + ((r + 1) * dim + c + 1).toString()) !== -1)
		a = a + 1;
	return a;
}

function clear() {
	while(living.length > 0)
		for(var i = 0; i < living.length; i++)
			toggle(living[i]);
}