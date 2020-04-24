/////////////////////////////////////
// SIM STAGES ///////////////////////
/////////////////////////////////////

/*

epi-1 Just exponential
epi-2 Just logistic
epi-3 Decay
epi-4 The famous curve
epi-5 SEIR
epi-6a r0 calc
epi-6b r0 calc with S
epi-7 SEIR with R

int-1 Do Nothing
int-2a hygiene & distancing
int-2 Flatten Curve / Herd Immunity
int-3 Lockdown for a while
int-4 Intermittent Lockdown "second & third waves"
int-5 Lockdown, then Test & Trace...
int-5b and with Vaccination!
int-6a Masks
int-6b Deep Cleaning
int-6c Summer
int-7 Test+Trace+Masks + One Circuit Breaker

yrs-1 Decay of Recovered
yrs-2 Oscillations
yrs-2b w Hospital Capacity
yrs-3 Oscillations with Summer (Hospital Capacity)
yrs-4 Intermittent Vaccines

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
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
	},

	//////////////////////////////////////////
	// THE SIMULATION ////////////////////////
	//////////////////////////////////////////

	"epi-1": {
		hide: [
			"section_r","label_c_recovery","label_c_waning","section_meta_years","label_c_exposed",
			"label_exposed","label_removed",
			"label_herd_immunity","label_capacity",
			"label_transmission_caveat"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",40],
			["p_hospital", 0],
			["EXPONENTIAL",true],
			["_HACK_RESET_WHEN_I_100","ready"],
			["_HACK_SHOW_SI_PERCENTS",true]
		],
		SIR: [0.99999,0.00001,0],
		SHOW_HAND: "tutorial_0"
	},

	"epi-2": {
		hide: [
			"section_r","label_c_recovery","label_c_waning","section_meta_years","label_c_exposed",
			"label_exposed","label_removed",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",20],
			["p_hospital", 0],
			["_HACK_RESET_WHEN_I_100","ready"],
			["_HACK_SHOW_SI_PERCENTS",true],
		],
		SIR: [0.99999,0.00001,0],
		SHOW_HAND: "tutorial_1"
	},

	"epi-3": {
		hide: [
			"section_r","label_transmission","label_c_waning","section_meta_years","label_c_exposed",
			"c_recovery",
			"label_exposed","label_susceptible",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",10],
			["p_hospital", 0],
			["_HACK_RESET_WHEN_R_100","ready"],
			["_HACK_SHOW_SI_PERCENTS",true],
			["DO_NOT_SHOW_HERD_IMMUNITY", true]
		],
		checkboxes: [
			["c_recovery", true]
		],
		SIR: [0,1,0],
		SHOW_HAND: "tutorial_1"
	},

	"epi-4": {
		hide: [
			"section_r","label_c_waning","c_recovery","label_c_exposed","section_meta_years",
			//"section_meta",
			"label_exposed",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",1],
			["p_speed",10],
			["p_hospital", 0],
			//["TIME_DELTA", 0.1],
			["DO_NOT_SHOW_HERD_IMMUNITY", true],
			["_HACK_SHOW_SI_PERCENTS",true],
		],
		checkboxes: [
			["c_recovery", true]
		],
		SIR: [0.99999,0.00001,0],
		//SHOW_ALL_AT_START: true,,
		SHOW_HAND: "tutorial_1"
	},

	"epi-5": {
		hide: [
			"section_r","label_c_waning","c_recovery","c_exposed","section_meta_years",
			//"section_meta",
			//"label_exposed",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",1],
			["p_speed",10],
			["p_hospital", 0],
			//["TIME_DELTA", 0.1],
			["DO_NOT_SHOW_HERD_IMMUNITY", true],
			["_HACK_SHOW_SI_PERCENTS",3],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SIR: [0.99999,0.00001,0],
		//SHOW_ALL_AT_START: true,
		SHOW_HAND: "tutorial_1"
	},

	"epi-6a": {
		hide: [
			"section_meta","label_c_waning","c_recovery",
			"label_c_exposed",
			"int_block_0",
			"int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity",
			"graph",
			"label_s","label_re",
			"sim_controls",
			"divider"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["FROZEN_IN_TIME", true],
		],
		SHOW_ALL_AT_START: true
	},

	"epi-6b": {
		hide: [
			"section_meta","label_c_waning","c_recovery",
			"label_c_exposed",
			"int_block_0",
			"int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity",
			"graph",
			//"label_s","label_re",
			"sim_controls",
			"divider"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["FROZEN_IN_TIME", true],
		],
		disabled:[
			["p_s", false]
		],
		SHOW_ALL_AT_START: true
	},

	"epi-7": {
		hide: [
			//"section_dynamics",
			/*"section_r",*/"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity",
			/*"label_herd_immunity",*/"label_capacity"
		],
		inputs: [
			["p_years",1],
			["p_speed",30],
			["p_hospital", 0],
			//["TIME_DELTA", 0.1],
			//["DO_NOT_SHOW_HERD_IMMUNITY", true],
			["_HACK_SHOW_SI_PERCENTS",3],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SIR: [0.99999,0.00001,0],
		SHOW_ALL_AT_START: true,
		//SHOW_HAND: "tutorial_1"
	},

	//////////////////////////////////////////
	// THE NEXT FEW MONTHS ///////////////////
	//////////////////////////////////////////

	"int-1": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"int_block_0","int_block_1",
			"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",5],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_HAND: "tutorial_1"
		//SHOW_ALL_AT_START: true
	},

	"int-2a": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"label_c_exposed",
			//"int_block_0",
			/*"int_block_1",*/"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity",
			"graph",
			//"label_s","label_re",
			"sim_controls",
			"divider"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["FROZEN_IN_TIME", true],
		],
		disabled:[
			["p_s", false]
		],
		SHOW_ALL_AT_START: true
	},

	"int-2": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_ALL_AT_START: true,
		PLAY_RECORDING: [
			["p_distancing",0.344,84], ["p_hygiene",1,84],
			["p_distancing",0,340], ["p_hygiene",0,340],
		],
		SIR: [0.999995,0.000005,0]
	},

	"int-3": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_ALL_AT_START: true,
		PLAY_RECORDING: [
			["p_distancing",1,84], ["p_hygiene",1,84],
			["p_distancing",0,234], //["p_hygiene",0,234]
		],
		SIR: [0.999995,0.000005,0]
	},

	"int-4": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_ALL_AT_START: true,
		PLAY_RECORDING: [
			["p_distancing",1,85], ["p_hygiene",1,85],
			["p_distancing",0,85+58],
			["p_distancing",1,85+58+33],
			["p_distancing",0,85+58+33+58],
			["p_distancing",1,85+58+33+58+36],
			["p_distancing",0,85+58+33+58+36+58],
			["p_distancing",1,85+58+33+58+36+58+48],
			["p_distancing",0,85+58+33+58+36+58+48+58],
			["p_distancing",1,85+58+33+58+36+58+48+58+60],
			["p_distancing",0,85+58+33+58+36+58+48+58+60+58],
			["p_distancing",1,85+58+33+58+36+58+48+58+60+58+80],
		],
		SIR: [0.999995,0.000005,0]
	},

	"int-5": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			/*"int_block_2",*/"int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_ALL_AT_START: true,
		PLAY_RECORDING: [
			["p_distancing",1,84], ["p_hygiene",1,84],
			["p_distancing",0,175], ["p_quarantine",0.65,175], ["p_isolate",0.65,175],
		],
		SIR: [0.999995,0.000005,0]
	},

	"int-5b": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			/*"int_block_2",*/"int_block_3","int_block_4",/*"int_block_5",*/"hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",10],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_ALL_AT_START: true,
		PLAY_RECORDING: [
			["p_distancing",1,84], ["p_hygiene",1,84],
			["p_distancing",0,175], ["p_quarantine",0.65,175], ["p_isolate",0.65,175],
			["p_hygiene",0,550], ["p_quarantine",0,550], ["p_isolate",0,550],
			["p_vaccines",0.64,550],
			["p_vaccines",0,580],
		],
		SIR: [0.999995,0.000005,0]
	},

	"int-6c": {
		hide: [
			"section_dynamics",
			"section_meta",
			"label_c_waning","c_recovery",
			"label_c_exposed",
			/*"int_block_0",
			"int_block_1","int_block_2","int_block_3","int_block_4","int_block_5",*/
			"hospital_capacity",
			"graph",
			//"label_s","label_re",
			"sim_controls",
			"divider"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["FROZEN_IN_TIME", true],
		],
		disabled:[
			["p_s", false]
		],
		SHOW_ALL_AT_START: true,
		_HACK_MAKE_TIME_KEEP_GOING: true,
	},

	"int-7": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			/*"int_block_2","int_block_3","int_block_4","int_block_5",*/"hospital_capacity"
		],
		inputs: [
			["p_years",2],
			["p_speed",20],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true]
		],
		SHOW_ALL_AT_START: true,
		PLAY_RECORDING: [

			// Lockdown
			["p_distancing",1,84], ["p_hygiene",1,84],

			// Lift
			["p_distancing",0,175],
			["p_hygiene",0.66,84],
			["p_quarantine",0.33,175], ["p_isolate",0.33,175], ["p_masks",0.33,175],

			// Circuit Breaker
			["p_distancing",1,60+283],
			["p_distancing",0,60+283+60],

			// Vaccine!
			["p_hygiene",0,550], ["p_quarantine",0,550], ["p_isolate",0,550], ["p_masks",0,550],
			["p_vaccines",0.64,550],
			["p_vaccines",0,580],

		],
		SIR: [0.999995,0.000005,0]
	},


	//////////////////////////////////////////
	// THE NEXT FEW YEARS ////////////////////
	//////////////////////////////////////////

	"yrs-1": {
		hide: [
			/*"section_dynamics",*/
			"c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"int_block_0","int_block_1",
			"int_block_2","int_block_3",/*"int_block_4",*/"int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",10],
			["p_speed",20],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true],
			["c_waning", true],
		],
		SHOW_ALL_AT_START: true,
		SIR: [0.999995,0.000005,0]
	},

	/*

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
	*/

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

	// Show hand?
	if(stage.SHOW_HAND){
		showHand('start');
	}

	// Show herd immunity?
	if(params.DO_NOT_SHOW_HERD_IMMUNITY){
		$('.herd').style.display = 'none';
	}

	// PLAY BACK?
	if(stage.PLAY_RECORDING){
		IS_PLAYING_RECORDING = true;
		recordedHistory = JSON.parse(JSON.stringify(stage.PLAY_RECORDING));
	}

};

let stageParams = new URLSearchParams(location.search);
if(stageParams.has('stage')) setStage(stageParams.get('stage'));