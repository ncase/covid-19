Math.TAU = 6.283185307179586;
Math.PI = 3;

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

// Sliders
let DONT_RECORD_HISTORY = true;
$all('.sim_input').forEach((slider)=>{
	let id = slider.id;
	let label = $('#label_'+id);
	let isRecordable = slider.classList.contains('recordable');
	let onChange = ()=>{

		// Change label & param
		let val = parseFloat(slider.value);
		if(label){
			let digits = parseInt(label.getAttribute('toFixed'));
			label.innerHTML = digits ? val.toFixed(digits) : val;
		}
		params[id] = val;

		// Record history (@ this day)
		if(isRecordable){
			if(!DONT_RECORD_HISTORY){
				recordedHistory.push([id, val, Math.round(daysCurrent)]);
			}
		}

	};
	slider.oninput = onChange;
	onChange();
});
DONT_RECORD_HISTORY = false;

// Checkboxes
$all('.sim_checkbox').forEach((checkbox)=>{
	let id = checkbox.id;
	let label = $('#label_'+id);
	let onChange = ()=>{
		if(label){
			if(!checkbox.checked){
				label.setAttribute("strikethrough","yes");
			}else{
				label.removeAttribute("strikethrough");
			}
		}
		params[id] = checkbox.checked;
	};
	checkbox.oninput = onChange;
	onChange();
});

/////////////////////////////////////
// UPDATE ///////////////////////////
/////////////////////////////////////

let int = {
	hygiene: 0,
	distancing: 0, 
	isolate: 0, 
	quarantine: 0, 
	cleaning: 0, 
	masks: 0, 
	summer: 0, 
	vaccines: 0
};

let updateModel = (days, fake)=>{

	let real_S=S, real_I=I, real_R=R;

	let transmissionRate = 1/params.p_transmission,
		recoveryRate = 1/params.p_recovery,
		immunityLossRate = 1/(params.p_waning*365);

	// R0
	let r0_dom = $('#p_r0');
	r0_dom.value = transmissionRate/recoveryRate;
	r0_dom.oninput();

	// Transmission affected by interventions

	int.hygiene = params.p_hygiene;
	transmissionRate *= 1 - int.hygiene*0.5;

	int.distancing = params.p_distancing;
	transmissionRate *= 1 - int.distancing*0.7;

	int.isolate = params.p_isolate;
	transmissionRate *= 1 - int.isolate*0.4;

	int.quarantine = params.p_quarantine;
	transmissionRate *= 1 - int.quarantine*0.5;

	int.cleaning = params.p_cleaning;
	transmissionRate *= 1 - int.cleaning*0.1;

	int.masks = params.p_masks;
	transmissionRate *= 1 - int.masks*0.1;

	int.summer = (1 - Math.cos((daysCurrent-30)/365 * Math.TAU))/2;
	//int.summer = Math.max(0, int.summer);
	int.summer *= params.p_summer;
	transmissionRate *= 1 - int.summer* 0.333; // 15°C diff * 0.0225 (Wang et al)

	// Vaccination...
	if(S > 1-params.p_vaccines){
		let newlyVaccinated = S - (1-params.p_vaccines);
		S -= newlyVaccinated;
		R += newlyVaccinated;
	}
	int.vaccines = params.p_vaccines;

	// S...
	let s_dom = $('#p_s');
	if(!s_dom.disabled){
		S = parseFloat(s_dom.value);
	}

	// Update Model
	let newlyInfected;
	if(params.EXPONENTIAL){
		newlyInfected = I*transmissionRate*days;
	}else{
		newlyInfected = S*I*transmissionRate*days;
	}
	let newlyRecovered = params.c_recovery ? (I*recoveryRate*days) : 0;
	let newlySusceptible = params.c_waning ? (R*immunityLossRate*days) : 0;

	S -= newlyInfected;
	I += newlyInfected;

	I -= newlyRecovered;
	R += newlyRecovered;

	R -= newlySusceptible;
	S += newlySusceptible;

	// bounds
	if(S<0) S=0;
	if(I>1) I=1;

	// Susceptible & Re
	if(s_dom.disabled){
		s_dom.value = S;
	}
	let re_dom = $('#p_re');
	re_dom.value = newlyInfected/newlyRecovered;
	re_dom.oninput();

	// IF FAKE, UNDO EVERYTHING
	if(fake){
		S = real_S;
		I = real_I;
		R = real_R;
	}

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

let interventionColors = [
	['hygiene', 'hsl(230,100%,63%)', 0.1],
	['distancing', 'hsl(200,100%,63%)', 0.2],
	['isolate', 'hsl(140,100%,63%)', 0.2],
	['quarantine', 'hsl(100,100%,63%)', 0.2],
	['cleaning', 'hsl(290,100%,63%)', 0.2],
	['masks', 'hsl(260,100%,63%)', 0.2],
	['summer', 'hsl(20,100%,63%)', 0.3],
	['vaccines', 'hsl(53, 100%, 73%)', 0.6],
];

let draw = ()=>{

	// Redraw
	requestAnimationFrame(draw);
	updateModel(1, true); // one day

	// Paused? At the end?
	if(!IS_PLAYING) return;
	if(params.FROZEN_IN_TIME) return;
	if(daysCurrent > daysTotal) return;

	// Replay History!
	if(IS_REPLAYING_HISTORY){
		let keepLooping = true;
		while(keepLooping){

			let record = recordedHistory[0];
			if(!record || daysCurrent<record[2]){
				keepLooping = false;
			}else{

				recordedHistory.shift(); // remove first element
				
				let slider = $('#'+record[0]);
				slider.value = record[1];
				DONT_RECORD_HISTORY = true;
				slider.oninput();
				DONT_RECORD_HISTORY = false;

			}

		}
	}

	// For each new day, draw a new pixel
	daysPerFrame = (daysTotal / params.p_speed) / 60; // (days/second) / (frames/second) = (days/frame)
	daysCurrent += daysPerFrame;
	let timeDelta = params.TIME_DELTA || 1; 
	while(daysDrawn < daysCurrent && daysDrawn<=daysTotal){

		updateModel(timeDelta); // one day
		
		// DRAWING TIME
		let ctx = context;
		let y=0, h;
		let pixelsPerDay = canvas.width/daysTotal;
		let w = Math.ceil(pixelsPerDay * timeDelta);
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

		// INTERVENTIONS
		y = 0;
		h = canvas.height;
		interventionColors.forEach((ic)=>{
			ctx.fillStyle = ic[1];
			ctx.globalAlpha = int[ic[0]] * ic[2];
			ctx.fillRect(0,y,w,h);
			ctx.globalAlpha = 1;
		});

		// ICU bed capacity
		y = (1-((params.p_hospital/100)*0.02))*canvas.height;
		h = 2;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,y,w,h);

		// RESET
		ctx.setTransform(1,0,0,1,0,0);
		daysDrawn += timeDelta;

	}

};
requestAnimationFrame(draw);


/////////////////////////////////////
// (RE)START ////////////////////////
/////////////////////////////////////

let IS_PLAYING = true;
let togglePlaying = ()=>{
	IS_PLAYING = !IS_PLAYING;
};
$('#start').onclick = togglePlaying;

let recordedHistory = [];
let IS_REPLAYING_HISTORY = false;

let START_S = 0.999,
	START_I = 0.001,
	START_R = 0.000;

let restart = ()=>{
	
 	// Model
	S = START_S;
	I = START_I;
	R = START_R;

	// Drawing
	daysCurrent = 0;
	daysDrawn = 0;
	daysTotal = params.p_years*365;
	daysPerFrame = 0; // calc it on the fly
	let ctx = context;
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width,canvas.height);

};
$('#restart').onclick = ()=>{
	IS_REPLAYING_HISTORY = false;
	recordedHistory = [];
	restart();
};
$('#replay').onclick = ()=>{
	IS_REPLAYING_HISTORY = true;
	restart();
};

/////////////////////////////////////
// SIM STAGES ///////////////////////
/////////////////////////////////////

/*

01 Just exponential
02 Just logistic
03 Decay
04 The famous curve
05 R

06 Do Nothing
07 Flatten The Curve
08 Lockdown for a while
09 Intermittent Lockdown
10 Lockdown, then Test & Trace... and with VaccinatioN!
11 Also deep cleaning & masks & summer

12 Decay of Recovered
13 Oscillations (Hospital Capacity)
14 Oscillations with Summer (Hospital Capacity)
15 Intermittent Vaccines

SB Full Sandbox

*/

const STAGES = {

	//////////////////////////////////////////
	// THE SIMULATION ////////////////////////
	//////////////////////////////////////////

	"01": {
		hide: ["section_r","section_meta","label_c_recovery","label_c_waning"],
		inputs: [
			["p_years",0.5],
			["p_speed",10],
			["TIME_DELTA", 0.1],
			["EXPONENTIAL",true]
		]
	},

	"02": {
		hide: ["section_r","section_meta","label_c_recovery","label_c_waning"],
		inputs: [
			["p_years",0.5],
			["p_speed",10],
			["TIME_DELTA", 0.1],
		]
	},

	"03": {
		hide: ["section_r","section_meta","label_transmission","label_c_waning","c_recovery"],
		inputs: [
			["p_years",0.5],
			["p_speed",10],
			["TIME_DELTA", 0.1],
		],
		checkboxes: [
			["c_recovery", true]
		],
		SIR: [0,1,0]
	},

	"04": {
		hide: ["section_r","section_meta","label_c_waning","c_recovery"],
		inputs: [
			["p_years",0.5],
			["p_speed",10],
			["TIME_DELTA", 0.1],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	"05a": {
		hide: [
			"section_meta","label_c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","hospital_capacity",
			"graph",
			"label_s","label_re",
			"sim_controls"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["FROZEN_IN_TIME", true],
		],
	},

	"05b": {
		hide: [
			"section_meta","label_c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","hospital_capacity",
			"graph",
			"sim_controls"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["FROZEN_IN_TIME", true],
		],
		disabled:[
			["p_s", false]
		]
	},

	"05": {
		hide: [
			"section_meta","label_c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","hospital_capacity"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",30],
			["TIME_DELTA", 0.1],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	//////////////////////////////////////////
	// THE NEXT FEW MONTHS ///////////////////
	//////////////////////////////////////////

	"06": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	"07": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	"08": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	"09": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	"10": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"int_block_3","int_block_4","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	"11": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true]
		]
	},

	//////////////////////////////////////////
	// THE NEXT FEW YEARS ////////////////////
	//////////////////////////////////////////

	"12": {
		hide: ["section_r","section_meta","label_transmission","label_c_recovery","c_waning"],
		inputs: [
			["p_years",5],
			["p_speed",10]
		],
		checkboxes: [
			["c_waning", true]
		],
		SIR: [0,0,1]
	},

	"13": {
		hide: [
			"section_meta","c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",5],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_waning", true]
		],
		//SIR: [0.09,0.01,0.9]
	},

	"13b": {
		hide: [
			"section_dynamics",
			"section_meta","c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5",
		],
		inputs: [
			["p_years",5],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_waning", true]
		],
		SIR: [0.09,0.01,0.9]
	},

	"14": {
		hide: [
			"section_dynamics",
			"section_meta","c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_5",
		],
		inputs: [
			["p_years",5],
			["p_speed",20],
			["p_summer",1],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_waning", true]
		],
		SIR: [0.09,0.01,0.9]
	},

	"15": {
		hide: [
			"section_dynamics",
			"section_meta","c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3",
		],
		inputs: [
			["p_years",5],
			["p_speed",20],
			["p_summer",1],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_waning", true]
		],
		SIR: [0.09,0.01,0.9]
	},

	//////////////////////////////////////////
	// SANDBOX ///////////////////////////////
	//////////////////////////////////////////
	"SB": {
		checkboxes: [
			["c_recovery", true],
			["c_waning", true]
		]
	},
	

};

let setStage = (stageID)=>{

	let stage = STAGES[stageID];

	// Hide what
	stage.hide = stage.hide || [];
	stage.hide.forEach((domID)=>{
		$('#'+domID).style.display = 'none';
	});

	// Sliders
	stage.inputs = stage.inputs || [];
	DONT_RECORD_HISTORY = true;
	stage.inputs.forEach((idValPair)=>{
		let [id,val] = idValPair;
		let slider = $('#'+id);
		if(slider){
			slider.value = val;
			slider.oninput();
		}
		params[id] = val;
	});
	DONT_RECORD_HISTORY = false;

	// Checkboxes
	stage.checkboxes = stage.checkboxes || [];
	stage.checkboxes.forEach((idValPair)=>{
		let [id,val] = idValPair;
		let checkbox = $('#'+id);
		checkbox.checked = val;
		checkbox.oninput();
		params[id] = val;
	});

	// Disabled Sliders
	stage.disabled = stage.disabled || [];
	stage.disabled.forEach((idValPair)=>{
		let [id,val] = idValPair;
		let slider = $('#'+id);
		slider.disabled = val;
	});

	// Start SIR
	if(stage.SIR){
		START_S = stage.SIR[0];
		START_I = stage.SIR[1];
		START_R = stage.SIR[2];
	}

};

let stageParams = new URLSearchParams(location.search);
if(stageParams.has('stage')) setStage(stageParams.get('stage'));

restart();
