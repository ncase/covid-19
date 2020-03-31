window.$ = (query,el=document)=>{
	return el.querySelector(query);
};
window.$all = (query,el=document)=>{
	return [...el.querySelectorAll(query)];
};

let canvas = $('#graphCanvas');
let context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;
canvas.style.width = (canvas.width/2)+"px";
canvas.style.height = (canvas.height/2)+"px";

let r_0 = $('#r_0');
let slider_susceptible = $('#slider_susceptible');
let r_susceptible = $('#r_susceptible');
let slider_distancing = $('#slider_distancing');
let r_distancing = $('#r_distancing');
let slider_cases = $('#slider_cases');
let r_cases = $('#r_cases');
let slider_contacts = $('#slider_contacts');
let r_contacts = $('#r_contacts');
let slider_vax = $('#slider_vax');
let r_vax = $('#r_vax');
let r_end = $('#r_end');
let r_now = $('#r_now');

let N = 100;
let S,I,R;
let I_FLOOR = 0.013;

//let R0 = [0.8,0.9,0.1,0.2];
let R0 = [0.8*1.25, 0.9*1.25, 0.1*1.25, 0.2*1.25];
let Rt = R0.slice();

let update = (delta)=>{

	let R_total = Rt.reduce(add);

	let newlyInfected = R_total * I * delta;
	S -= newlyInfected;
	I += newlyInfected;

	let newlyRecovered = 1 * I * delta;
	I -= newlyRecovered;
	R += newlyRecovered;

	if(I<I_FLOOR) I=I_FLOOR; // Floor

	//////////////////////////////////////////
	// DOMs //////////////////////////////////
	//////////////////////////////////////////
	
	// R0
	updateBar(r_0, R0);
	Rt = R0;

	// Susceptible
	let change = S/N;
	Rt = Rt.map(r => r * change);
	slider_susceptible.value = change;
	updateBar(r_susceptible, Rt);

	// Distancing
	change = 1 - parseFloat(slider_distancing.value);
	Rt = Rt.map(r => r * change);
	updateBar(r_distancing, Rt);

	// Cases
	change = 1 - parseFloat(slider_cases.value);
	Rt[0] = Rt[0] * change;
	updateBar(r_cases, Rt);

	// Contacts
	change = 1 - parseFloat(slider_contacts.value);
	Rt[1] = Rt[1] * change;
	Rt[2] = Rt[2] * change;
	updateBar(r_contacts, Rt);

	// Vax
	change = 1 - parseFloat(slider_vax.value);
	Rt = Rt.map(r => r * change);
	updateBar(r_vax, Rt);

	// R, current growth
	updateBar(r_end, Rt);

	// What's the current R?
	R_total = Rt.reduce(add);
	r_now.innerHTML = R_total.toFixed(2) + "<br>" + ((R_total>1) ? "uncontained" : "contained");


};

let BAR_WIDTH_R = 2.5;
let updateBar = (bar, Rt)=>{
	[...bar.children].forEach((sub_bar,i)=>{
		let r = Rt[i];
		sub_bar.style.width = (r/BAR_WIDTH_R)*150 + "px";
	});
};
$('#containment_line').style.left = 150 + (150*(1/BAR_WIDTH_R)) + 5 + "px";

const add = (a,b)=>a+b;

//let x = 0;
let SIM_TIME = 0;
let X_SPEED = 0.5;
let UPDATE_PER_PIXEL = 0.025;
const INTERVENTION_COLORS = [
	[slider_distancing, "#71c0ff", 0.5],
	[slider_cases, "#70ff70", 0.25],
	[slider_contacts, "#b8ff70", 0.25],
	[slider_vax, "#ffe770", 0.5],
];
let PHASE = 0;
let draw = ()=>{

	// Redraw
	requestAnimationFrame(draw);

	// Caps
	[slider_distancing, slider_cases, slider_contacts, slider_vax].forEach((slider)=>{
		let cap = parseFloat(slider.getAttribute("CAP"));
		if(parseFloat(slider.value) > cap){
			slider.value = cap;
		}
	});

	// SIM TIME: Phase unlock or stop
	if(SIM_TIME>canvas.width) return;
	if(SIM_TIME>canvas.width * 1/8 && PHASE<1){
		PHASE = 1;
		$all('.phase_i').forEach((control)=>{
			control.removeAttribute('locked');
		});
	}
	if(SIM_TIME>canvas.width * 2/8 && PHASE<2){
		PHASE = 2;
		$all('.phase_ii').forEach((control)=>{
			control.removeAttribute('locked');
		});
	}
	if(SIM_TIME>canvas.width * 7/8 && PHASE<3){
		PHASE = 3;
		$all('.phase_iii').forEach((control)=>{
			control.removeAttribute('locked');
		});
	}
	
	// Update!
	update(UPDATE_PER_PIXEL*X_SPEED);

	////////////////////////////////////////
	// DRAWWWWWWW //////////////////////////
	////////////////////////////////////////

	let ctx = context;
	let y=0, h;

	// S
	h = (S/N)*canvas.height;
	ctx.fillStyle = "#eeeeee";
	ctx.fillRect(0,y,1,h);

	// R
	y += h;
	h = (R/N)*canvas.height;
	ctx.fillStyle = "#cccccc";
	ctx.fillRect(0,y,1,h);

	// I
	y += h;
	h = (I/N)*canvas.height;
	ctx.fillStyle = "#ff4040";
	ctx.fillRect(0,y,1,h);

	// ICU bed capacity
	y = (1-0.02)*canvas.height;
	h = 2;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,y,1,h);

	// Interventions
	INTERVENTION_COLORS.forEach((ic)=>{
		let [slider,color,alpha] = ic;
		ctx.globalAlpha = parseFloat(slider.value) * alpha;
		ctx.fillStyle = color;
		ctx.fillRect(0,0,1,canvas.height);
		ctx.globalAlpha = 1;
	});

	// Next!
	ctx.translate(X_SPEED,0);
	SIM_TIME += X_SPEED;

};
requestAnimationFrame(draw);

// Caps
[slider_distancing, slider_cases, slider_contacts, slider_vax].forEach((slider)=>{
	let cap = parseFloat(slider.getAttribute("CAP"));
	let capDOM = document.createElement('div');
	capDOM.className = 'cap';
	capDOM.style.left = (cap*133)+"px";
	capDOM.style.width = ((1-cap)*133)+"px";
	slider.parentNode.appendChild(capDOM);
});

///////////////
// RESTART ////
///////////////

const restart = ()=>{
	
	let ctx = context;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	SIM_TIME = 0;

	PHASE = 0;
	$all('.phase').forEach((control)=>{
		control.setAttribute('locked','yup');
	});

	S = N;
	I = I_FLOOR;
	R = 0;

	Rt = R0.slice();

	slider_susceptible.value = 1;
	slider_distancing.value = 0;
	slider_cases.value = 0;
	slider_contacts.value = 0;
	slider_vax.value = 0;

};
$('#restart').onclick = restart;

restart();

