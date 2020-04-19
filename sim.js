window.$ = (query,el=document)=>{
	return el.querySelector(query);
};
window.$all = (query,el=document)=>{
	return [...el.querySelectorAll(query)];
};

/////////////////////////////////////
// PARAMETERS ///////////////////////
/////////////////////////////////////

let S,I,R;

let params = {};

$all('.sim_input').forEach((slider)=>{
	let id = slider.id;
	let label = $('#label_'+id);
	let onChange = ()=>{
		let val = parseFloat(slider.value);
		label.innerHTML = val;
		params[id] = val;
	};
	slider.oninput = onChange;
	onChange();
});

/////////////////////////////////////
// UPDATE ///////////////////////////
/////////////////////////////////////

let updateModel = (days)=>{

	let transmissionRate = 1/params.p_transmission,
		recoveryRate = 1/params.p_recovery,
		immunityLossRate = 1/(params.p_waning*365);

	let newlyInfected = S*I*transmissionRate*days;
	S -= newlyInfected;
	I += newlyInfected;

	let newlyRecovered = I*recoveryRate*days;
	I -= newlyRecovered;
	R += newlyRecovered;

	let newlySusceptible = R*immunityLossRate*days;
	R -= newlySusceptible;
	S += newlySusceptible;

}

/////////////////////////////////////
// DRAW /////////////////////////////
/////////////////////////////////////

let canvas = $('#graphCanvas');
let context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;
canvas.style.width = (canvas.width/2)+"px";
canvas.style.height = (canvas.height/2)+"px";

let daysCurrent, daysDrawn, daysTotal, daysPerFrame;

let draw = ()=>{

	// Redraw
	requestAnimationFrame(draw);

	// At the end? No!
	if(daysCurrent > daysTotal) return;

	// For each new day, draw a new pixel
	daysPerFrame = (daysTotal / params.p_speed) / 60; // (days/second) / (frames/second) = (days/frame)
	daysCurrent += daysPerFrame;
	while(daysDrawn < daysCurrent && daysDrawn<=daysTotal){

		updateModel(1); // one day
		
		// DRAWING TIME
		let ctx = context;
		let y=0, h;
		let pixelsPerDay = canvas.width/daysTotal;
		let w = Math.ceil(pixelsPerDay);
		ctx.translate(Math.floor(daysDrawn * pixelsPerDay),0);

		// S
		h = S * canvas.height;
		ctx.fillStyle = "#eeeeee";
		ctx.fillRect(0,y,w,h);

		// R
		y += h;
		h = R * canvas.height;
		ctx.fillStyle = "#cccccc";
		ctx.fillRect(0,y,w,h);

		// I
		y += h;
		h = I * canvas.height;
		ctx.fillStyle = "#ff4040";
		ctx.fillRect(0,y,w,h);

		// ICU bed capacity
		y = (1-0.02)*canvas.height;
		h = 2;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,y,w,h);

		// RESET
		ctx.setTransform(1,0,0,1,0,0);
		daysDrawn += 1;

	}

};
requestAnimationFrame(draw);


/////////////////////////////////////
// RESTART //////////////////////////
/////////////////////////////////////

let restart = ()=>{
	
	S = 0.999;
	I = 0.001;
	R = 0.000;

	daysCurrent = 0;
	daysDrawn = 0;
	daysTotal = params.p_years*365;
	daysPerFrame = 0; // calc it on the fly

	let ctx = context;
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width,canvas.height);

};
restart();
$('#restart').onclick = restart;

