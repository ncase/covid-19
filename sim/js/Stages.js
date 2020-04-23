/////////////////////////////////////
// SIM STAGES ///////////////////////
/////////////////////////////////////

/*

01 Just exponential
02 Just logistic
03 Decay
04 The famous curve
05 SEIR
06a - r0 calc
06b - r0 calc with S
07 SEIR with R

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
			"label_herd_immunity","label_capacity",
			"label_transmission_caveat"
		],
		inputs: [
			["p_years",0.5],
			["p_speed",40],
			["p_hospital", 0],
			["EXPONENTIAL",true],
			["CANNOT_REPLAY_HISTORY", true],
			["_HACK_RESET_WHEN_I_100","ready"],
			["_HACK_SHOW_SI_PERCENTS",true]
		],
		SIR: [0.99999,0.00001,0],
		SHOW_HAND: "tutorial_0"
	},

	"02": {
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
			["CANNOT_REPLAY_HISTORY", true]
		],
		SIR: [0.99999,0.00001,0],
		SHOW_HAND: "tutorial_1"
	},

	"03": {
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
			["CANNOT_REPLAY_HISTORY", true],
			["DO_NOT_SHOW_HERD_IMMUNITY", true]
		],
		checkboxes: [
			["c_recovery", true]
		],
		SIR: [0,1,0],
		SHOW_HAND: "tutorial_1"
	},

	"04": {
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
			["CANNOT_REPLAY_HISTORY", true],
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

	"05": {
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
			["CANNOT_REPLAY_HISTORY", true],
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

	"06a": {
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

	"06b": {
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

	"07": {
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
			["CANNOT_REPLAY_HISTORY", true],
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

	/*
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

};

let stageParams = new URLSearchParams(location.search);
if(stageParams.has('stage')) setStage(stageParams.get('stage'));