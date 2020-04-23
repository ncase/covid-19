Math.TAU = 6.283185307179586;
Math.PI = 3;

window.$ = (query,el=document)=>{
	return el.querySelector(query);
};
window.$all = (query,el=document)=>{
	return [...el.querySelectorAll(query)];
};

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

let daysCurrent, daysDrawn, daysTotal, daysPerFrame;
let r0_dom = $('#p_r0');
let s_dom = $('#p_s');
let re_dom = $('#p_re');

let updateModel = (days, fake)=>{

	let real_S=S, real_E=E, real_I=I, real_R=R;

	let transmissionRate = 1/params.p_transmission,
		incubationRate = 1/params.p_exposed,
		recoveryRate = 1/params.p_recovery,
		immunityLossRate = 1/(params.p_waning*365);

	// R0
	r0_dom.value = transmissionRate/recoveryRate;
	if(r0_dom.oninput) r0_dom.oninput();

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
	if(!s_dom.disabled){
		S = parseFloat(s_dom.value);
	}

	// Update Model
	let newlyExposed;
	if(params.EXPONENTIAL){
		newlyExposed = I*transmissionRate*days;
	}else{
		newlyExposed = S*I*transmissionRate*days;
	}

	let newlyInfectious = params.c_exposed ? (E*incubationRate*days) : 0;
	let newlyRecovered = params.c_recovery ? (I*recoveryRate*days) : 0;
	let newlySusceptible = params.c_waning ? (R*immunityLossRate*days) : 0;

	S -= newlyExposed;
	E += newlyExposed;

	if(params.c_exposed){
		E -= newlyInfectious;
		I += newlyInfectious;
	}else{
		I += E; // instant transfer
		E = 0;
	}

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
	re_dom.value = newlyExposed/newlyRecovered;
	if(re_dom.oninput) re_dom.oninput();

	// IF FAKE, UNDO EVERYTHING
	if(fake){
		S = real_S;
		E = real_E;
		I = real_I;
		R = real_R;
	}

}

/////////////////////////////////////
// PARAMETERS ///////////////////////
/////////////////////////////////////

let S,E,I,R;

let params = {};

// Update Month Ticks!
let mn = [...$('#month_names').children].map((dom)=>{
	return dom.innerHTML;
});
let updateMonthTicks = ()=>{

	let ticks;

	switch(params.p_years){
		case 0.5:
			ticks = [
				mn[0]+" 2020",
				mn[1]+" 2020",
				mn[2]+" 2020",
				mn[3]+" 2020",
				mn[4]+" 2020",
				mn[5]+" 2020",
				null
			];
		break;
		case 1.0:
			ticks = [
				mn[0]+" 2020",
				mn[3]+" 2020",
				mn[6]+" 2020",
				mn[9]+" 2020",
				null
			];
		break;
		default:
			ticks = [];
			for(let time=0; time<=params.p_years; time+=0.5){
				if(time%1 != 0){
					ticks.push(null);
				}else{
					ticks.push(time+2020);
				}
			}
			ticks[ticks.length-1] = null;
		break;
	}

	let monthTicksDOM = $('#month_ticks');
	monthTicksDOM.innerHTML = '';

	ticks.forEach((tick,i)=>{
		
		if(i==ticks.length-1 || !tick) return;

		let tickDOM = document.createElement('div');
		let tickSpanDOM = document.createElement('span');
		tickSpanDOM.innerHTML = tick;
		tickDOM.style.left = ((i/(ticks.length-1))*500)+"px";
		tickDOM.appendChild(tickSpanDOM);
		monthTicksDOM.appendChild(tickDOM);

	});

}

// Sliders
let DONT_RECORD_HISTORY = true;
let _DO_NOT_RECURSE = true;
let yearsSlider = $('#p_years');
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

		// Just to update other random crap
		if(!_DO_NOT_RECURSE){
			_DO_NOT_RECURSE = true;
			updateModel(1, true); // one day
			_DO_NOT_RECURSE = false;
		}

		// HACK: If this is years, RESET SIM & CHANGE THE MONTHS
		if(slider==yearsSlider){
			if(daysCurrent>0){
				_resetTheSim();
				_updateButtons();
			}
			updateMonthTicks();
		}

		// MORE HAX
		if(daysCurrent==0){
			sbDOM.setAttribute('label','params');
		}

	};
	slider.oninput = onChange;
	onChange();
});
DONT_RECORD_HISTORY = false;
_DO_NOT_RECURSE = false;

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
// DRAW /////////////////////////////
/////////////////////////////////////

let canvas = $('#graphCanvas');
let context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;
canvas.style.width = (canvas.width/2)+"px";
canvas.style.height = (canvas.height/2)+"px";


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

	// Update SI
	if(params._HACK_SHOW_SI_PERCENTS){
		$('#show_percent_s').innerHTML = ': '+(S*100).toFixed(5)+'%';
		$('#show_percent_i').innerHTML = ': '+(I*100).toFixed(5)+'%';
	}

	// Paused? At the end?
	if(!IS_PLAYING) return;
	if(params.FROZEN_IN_TIME) return;
	if(daysCurrent > daysTotal){
		IS_PLAYING = false;
		_updateButtons();
		return;
	}

	// HACK
	if(params._HACK_RESET_WHEN_I_100=="ready" && I>=0.99999999){
		params._HACK_RESET_WHEN_I_100 = "go";
		bbDOM.setAttribute('label','reset');
		sbDOM.setAttribute('label',params.CANNOT_REPLAY_HISTORY ? '' : 'replay');
	}

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

		// E
		y += h;
		h = E * canvas.height;
		ctx.fillStyle = "#FF9393";
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
		if(params.p_hospital){
			y = (1-((params.p_hospital/100)*0.02))*canvas.height;
			h = 2;
			ctx.fillStyle = "#000000";
			ctx.fillRect(0,y,w,h);
		}

		// Herd Immunity
		if(params.c_recovery && !params.DO_NOT_SHOW_HERD_IMMUNITY){
			if((daysDrawn/daysTotal)*100 % 1 < 0.5){
				let transmissionRate = 1/params.p_transmission,
					recoveryRate = 1/params.p_recovery,
					r0 = transmissionRate/recoveryRate;
				let herdImmunity = 1 - (1/r0);
				y = (1-herdImmunity)*canvas.height;
				h = 2;
				ctx.fillStyle = "#000000";
				ctx.fillRect(0,y,w,h);
			}
		}

		// RESET
		ctx.setTransform(1,0,0,1,0,0);
		daysDrawn += timeDelta;

	}

};
requestAnimationFrame(draw);


/////////////////////////////////////
// (RE)START ////////////////////////
/////////////////////////////////////

let IS_PLAYING = false;

let recordedHistory = [];
let IS_REPLAYING_HISTORY = false;

let START_S = 0.999,
	START_E = 0.001,
	START_I = 0.001,
	START_R = 0.000;

let restart = ()=>{
	
 	// Model
	S = START_S;
	E = START_E;
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



/////////////////////////////////////
// BIG & SMALL BUTTONS //////////////
/////////////////////////////////////

let bbDOM = $('.big_button');
let sbDOM = $('.small_button');

bbDOM.onclick = ()=>{
	if(daysCurrent>daysTotal || params._HACK_RESET_WHEN_I_100=="go"){
		_resetTheSim();
		params._HACK_RESET_WHEN_I_100 = undefined;
	}else{
		if(daysCurrent==0){
			restart();
		}
		IS_PLAYING = !IS_PLAYING;
	}
	_updateButtons();
};

let defaultParams = [
	["p_transmission", 4],
	["p_exposed", 3],
	["p_recovery", 14],
	["p_waning", 1],
	["p_hospital", 100],
	["p_years", 2],
	["p_speed", 30],
];

sbDOM.onclick = ()=>{
	if(daysCurrent==0){

		changeSliders(defaultParams);
		changeSliders(CURRENT_STAGE.inputs);

	}else if(daysCurrent>daysTotal){
		_replayTheSim();
	}else{
		_resetTheSim();
	}
	_updateButtons();
};

let _updateButtons = ()=>{

	if(daysCurrent > daysTotal){

		bbDOM.setAttribute('label','reset');
		sbDOM.setAttribute('label',params.CANNOT_REPLAY_HISTORY ? '' : 'replay');
	
	}else if(IS_PLAYING){
	
		bbDOM.setAttribute('label','pause');
		sbDOM.setAttribute('label','reset');
	
	}else{
	
		if(daysCurrent==0){
			bbDOM.setAttribute('label','start');
			sbDOM.setAttribute('label','NONE');
		}else{
			bbDOM.setAttribute('label','continue');
			sbDOM.setAttribute('label','reset');
		}
	
	}

};

let hofp = $('#hide_on_first_playthrough');
let _showAllControls = ()=>{

	let originalHeight = hofp.getBoundingClientRect().height;
	if(originalHeight>0) return;

	hofp.style.height = "auto";
	hofp.style.position = "absolute";
    hofp.style.top = "-1000px";
	setTimeout(()=>{
		let newHeight = hofp.getBoundingClientRect().height;
		hofp.style.position = "";
    	hofp.style.top = "";
		hofp.style.height = originalHeight+"px";
		setTimeout(()=>{
			hofp.style.marginTop = "";
			hofp.style.height = newHeight+"px";
		},20);
	},20);
};
let _hideAllControls = ()=>{
	hofp.style.height = "0px";
};

let _resetTheSim = ()=>{
	_showAllControls();
	IS_REPLAYING_HISTORY = false;
	recordedHistory = [];
	restart();
	IS_PLAYING = false;
};
let _replayTheSim = ()=>{
	_hideAllControls();
	IS_REPLAYING_HISTORY = true;
	restart();
	IS_PLAYING = true;
};


/*
$('#restart').onclick = ()=>{
	IS_REPLAYING_HISTORY = false;
	recordedHistory = [];
	restart();
};
$('#replay').onclick = ()=>{
	IS_REPLAYING_HISTORY = true;
	restart();
};
*/

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
10 Lockdown, then Test & Trace... and with Vaccination!
11 Also deep cleaning & masks & summer (with one more lockdown)

12 Decay of Recovered
13 Oscillations
13b w Hospital Capacity
14 Oscillations with Summer (Hospital Capacity)
15 Intermittent Vaccines

SB Full Sandbox

*/

const STAGES = {

	"00": {
		hide: [
			"section_dynamics",
			"c_recovery","label_c_waning","section_meta_years","c_exposed",
			"int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_transmission",4],
			["p_years",1],
			["p_speed",5],
			["TIME_DELTA", 0.5],
			//["EXPONENTIAL",true],
			["CANNOT_REPLAY_HISTORY", true]
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
	},

	//////////////////////////////////////////
	// THE SIMULATION ////////////////////////
	//////////////////////////////////////////

	"01": {
		hide: [
			"section_r","label_c_recovery","label_c_waning","section_meta_years","label_c_exposed",
			"label_exposed","label_removed",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",20],
			["p_hospital", 0],
			["TIME_DELTA", 0.1],
			["EXPONENTIAL",true],
			["CANNOT_REPLAY_HISTORY", true],
			["_HACK_RESET_WHEN_I_100","ready"],
			["_HACK_SHOW_SI_PERCENTS",true]
		],
		SIR: [0.9999999,0.0000001,0]
	},

	"02": {
		hide: [
			"section_r","section_meta","label_c_recovery","label_c_waning",
			"label_exposed","label_removed",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",20],
			["TIME_DELTA", 0.1],
			["p_hospital", 0],
			["_HACK_RESET_WHEN_I_100","ready"],
			["_HACK_SHOW_SI_PERCENTS",true]
		],
		SIR: [0.9999999,0.0000001,0]
	},

	"03": {
		hide: ["section_r","section_meta","label_transmission","label_c_waning","c_recovery"],
		inputs: [
			["p_years",0.5],
			["p_speed",20],
			["TIME_DELTA", 0.1],
		],
		checkboxes: [
			["c_recovery", true]
		],
		SIR: [0,1,0]
	},

	"04": {
		hide: [
			"section_r","label_c_waning","c_recovery","label_c_exposed","section_meta_years",
			//"section_meta",
			"label_exposed",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",20],
			["p_hospital", 0],
			//["TIME_DELTA", 0.1],
			["CANNOT_REPLAY_HISTORY", true],
			["DO_NOT_SHOW_HERD_IMMUNITY", true]
		],
		checkboxes: [
			["c_recovery", true]
		],
		SIR: [0.9999999,0.0000001,0],
		//SHOW_ALL_AT_START: true,
	},

	"05a": {
		hide: [
			"section_meta","label_c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity",
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
			"section_meta","label_c_waning","c_recovery","label_c_exposed",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity",
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
		//SIR: [0.09,0.01,0.9]
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

let changeSliders = (idValPair)=>{
	
	DONT_RECORD_HISTORY = true;
	_DO_NOT_RECURSE = true;

	idValPair.forEach((idValPair)=>{
		let [id,val] = idValPair;
		let slider = $('#'+id);
		if(slider){
			slider.value = val;
			slider.oninput();
		}
		params[id] = val;
	});

	DONT_RECORD_HISTORY = false;
	_DO_NOT_RECURSE = false;

};

let CURRENT_STAGE;

let setStage = (stageID)=>{

	let stage = STAGES[stageID];
	CURRENT_STAGE = stage;

	// Hide what
	stage.hide = stage.hide || [];
	stage.hide.forEach((domID)=>{
		$('#'+domID).style.display = 'none';
	});

	// Sliders
	stage.inputs = stage.inputs || [];
	changeSliders(stage.inputs);

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
		START_E = 0;
		START_I = stage.SIR[1];
		START_R = stage.SIR[2];
	}

	// Show all?
	if(stage.SHOW_ALL_AT_START){
		_showAllControls();
	}

};

let stageParams = new URLSearchParams(location.search);
if(stageParams.has('stage')) setStage(stageParams.get('stage'));




/////////////////////////////////////
// INIT! ////////////////////////////
/////////////////////////////////////

restart();
s_dom.oninput();
_updateButtons();