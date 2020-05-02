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
int-4a Calc trace
int-4b Calc vaccinate 
int-5 Lockdown, then Test & Trace.. then Vaccination!
int-6a Masks
int-6b Summer
int-7 Test+Trace+Masks + One Circuit Breaker

yrs-1 Decay of Recovered
yrs-2 Oscillations
yrs-2b w Hospital Capacity
yrs-3 Oscillations with Summer (Hospital Capacity)
yrs-4 Intermittent Vaccines

SB Full Sandbox

*/

const STAGES = {

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
			["p_distancing",0.275,84], ["p_hygiene",1,84],
			["p_distancing",0,340], ["p_hygiene",0,340],
		],
		SIR: [0.999995,0.000005,0],
		SHOW_HAND: "tutorial_2"
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
			["p_distancing",0,234], ["p_hygiene",0,234]
		],
		SIR: [0.999995,0.000005,0],
		SHOW_HAND: "tutorial_2"
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
			["p_distancing",1,90], ["p_hygiene",1,90],
			["p_distancing",0,90+68],
			["p_distancing",1,90+68+54],
			["p_distancing",0,90+68+54+73],
			["p_distancing",1,90+68+54+73+73],
			["p_distancing",0,90+68+54+73+73+73],
			["p_distancing",1,90+68+54+73+73+73+87],
			["p_distancing",0,90+68+54+73+73+73+87+58],
			["p_distancing",1,90+68+54+73+73+73+87+58+108],
		],
		SIR: [0.999995,0.000005,0],
		SHOW_HAND: "tutorial_2"
	},

	"int-4a": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"label_c_exposed",
			/*"int_block_0",
			"int_block_1","int_block_2",*/"int_block_3","int_block_4","int_block_5","hospital_capacity",
			"graph",
			//"label_s","label_re",
			"sim_controls",
			"divider"
		],
		checkboxes: [
			["c_recovery", true]
		],
		inputs: [
			["p_hygiene",1],
			["FROZEN_IN_TIME", true],
		],
		disabled:[
			["p_s", false]
		],
		SHOW_ALL_AT_START: true
	},

	"int-4b": {
		hide: [
			"section_dynamics",
			"section_meta","label_c_waning","c_recovery",
			"label_c_exposed",
			"int_block_0",
			"int_block_1","int_block_2","int_block_3","int_block_4",/*"int_block_5",*/"hospital_capacity",
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
		/*disabled:[
			["p_s", false]
		],*/
		SHOW_ALL_AT_START: true
	},

	"int-5": {
		hide: [
			"section_dynamics",
			"label_c_waning","c_recovery","c_exposed",
			"section_meta_years",
			/*"int_block_2",*/"int_block_3","int_block_4",/*"int_block_5",*/"hospital_capacity"
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

			["p_hygiene",0,550], ["p_quarantine",0,550], ["p_isolate",0,550],
			["p_vaccines",0.61,550],
			["p_vaccines",0,580],
		],
		SIR: [0.999995,0.000005,0],
		SHOW_HAND: "tutorial_2"
	},

	"int-6a": {
		hide: [
			"section_dynamics",
			"section_meta",
			"label_c_waning","c_recovery",
			"label_c_exposed",
			/*"int_block_0",
			"int_block_1","int_block_2","int_block_3",*/"int_block_4","int_block_5",
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
			["p_hygiene", 1],
			["p_isolate", 0.516],
			["p_quarantine", 0.515],
		],
		disabled:[
			["p_s", false]
		],
		SHOW_ALL_AT_START: true,
		_HACK_MAKE_TIME_KEEP_GOING: true,
	},

	"int-6b": {
		hide: [
			"section_dynamics",
			"section_meta",
			"label_c_waning","c_recovery",
			"label_c_exposed",
			"int_block_0",
			"int_block_1","int_block_2","int_block_3",/*"int_block_4",*/"int_block_5",
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
			["p_summer", 1],
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
			["p_quarantine",0.4,175],
			["p_isolate",0.4,175],
			["p_masks",0.2,175],

			// Circuit Breaker
			["p_distancing",1,365],
			["p_distancing",0,365+60],

			// Vaccine!
			["p_hygiene",0,550], ["p_quarantine",0,550], ["p_isolate",0,550], ["p_masks",0,550],
			["p_vaccines",0.6,550],
			["p_vaccines",0,580],

		],
		SIR: [0.999995,0.000005,0],
		SHOW_HAND: "tutorial_2"
	},


	//////////////////////////////////////////
	// THE NEXT FEW YEARS ////////////////////
	//////////////////////////////////////////

	"yrs-1": {
		hide: [
			/*"section_dynamics",*/
			"section_r",
			"c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"label_herd_immunity","label_capacity"
		],
		inputs: [
			["p_years",5],
			["p_speed",5],
			["p_hospital", 0],
			["DO_NOT_SHOW_HERD_IMMUNITY", true],
			["_HACK_SHOW_SI_PERCENTS",3],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true],
			["c_waning", true],
		],
		//SHOW_ALL_AT_START: true,
		SIR: [0,0,1],
		SHOW_HAND: "tutorial_1"
	},

	"yrs-2": {
		hide: [
			//"section_dynamics",
			"c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3","int_block_4","int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",10],
			["p_speed",20],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true],
			["c_waning", true]
		],
		SHOW_ALL_AT_START: true,
		//SIR: [0.09,0.01,0.9]
	},

	"yrs-3": {
		hide: [
			//"section_dynamics",
			"c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3",/*"int_block_4",*/"int_block_5","hospital_capacity"
		],
		inputs: [
			["p_years",10],
			["p_speed",20],
			["p_summer",1],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true],
			["c_waning", true]
		],
		SHOW_ALL_AT_START: true,
		//SIR: [0.09,0.01,0.9]
	},


	"yrs-4": {
		hide: [
			"section_dynamics",
			//"c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3",/*"int_block_4","int_block_5",*/"hospital_capacity"
		],
		inputs: [
			["p_years",10],
			["p_speed",20],
			["p_summer",1],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true],
			["c_waning", true]
		],
		PLAY_RECORDING: [

			// Vaccine!
			["p_vaccines",0.62,365-60],
			["p_vaccines",0.0,365],
			["p_vaccines",0.62,2*365-60],
			["p_vaccines",0.0,2*365],
			["p_vaccines",0.62,3*365-60],
			["p_vaccines",0.0,3*365],
			["p_vaccines",0.62,4*365-60],
			["p_vaccines",0.0,4*365],
			["p_vaccines",0.62,5*365-60],
			["p_vaccines",0.0,5*365],
			["p_vaccines",0.62,6*365-60],
			["p_vaccines",0.0,6*365],
			["p_vaccines",0.62,7*365-60],
			["p_vaccines",0.0,7*365],
			["p_vaccines",0.62,8*365-60],
			["p_vaccines",0.0,8*365],
			["p_vaccines",0.62,9*365-60],
			["p_vaccines",0.0,9*365],
			["p_vaccines",0.62,10*365-60],
			["p_vaccines",0.0,10*365]

		],
		SHOW_ALL_AT_START: true,
		SHOW_HAND: "tutorial_2"
		//SIR: [0.09,0.01,0.9]
	},

	"yrs-5": {
		hide: [
			"section_dynamics",
			//"c_waning","c_recovery","c_exposed",
			"section_meta_years",
			"c_waning","c_recovery",
			"int_block_0","int_block_1","int_block_2","int_block_3",/*"int_block_4",*/"int_block_5",
			//"hospital_capacity"
		],
		inputs: [
			["p_years",10],
			["p_speed",20],
			["p_summer",1],
			//["TIME_DELTA", 0.2],
		],
		checkboxes: [
			["c_recovery", true],
			["c_exposed",true],
			["c_waning", true]
		],
		SHOW_ALL_AT_START: true,
		//SIR: [0.09,0.01,0.9]
		PLAY_RECORDING: [

			// Hospital
			["p_hospital",500,365],
			["p_hospital",750,365*2],
			["p_hospital",1000,365*3]
			
		],
		SHOW_HAND: "tutorial_2"
	},

	//////////////////////////////////////////
	// SANDBOX ///////////////////////////////
	//////////////////////////////////////////
	
	"SB": {
		checkboxes: [
			["c_recovery", true],
			["c_waning", true],
			["c_exposed",true],
		],
		inputs: [
			["p_years",5],
			["p_speed",10]
		],
		SHOW_ALL_AT_START: true,
	},
	

};