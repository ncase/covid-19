/////////////////////////////////////
// UPDATE ///////////////////////////
/////////////////////////////////////

let int = {
	non_s: 0,
	hygiene: 0,
	distancing: 0, 
	isolate: 0, 
	quarantine: 0, 
	masks: 0, 
	summer: 0, 
	vaccines: 0
};

let daysCurrent, daysDrawn, daysTotal, daysPerFrame;
let r0, re;
//let r0_dom = $('#p_r0');
let s_dom = $('#p_s');
//let re_dom = $('#p_re');

let interventionStrengths = [
	['non_s', 1.0],
	['hygiene', 0.25],
	['distancing', 0.7],
	['isolate', 0.4],
	['quarantine', 0.5],
	['masks', 0.35], 
	['summer', 0.31] // ACK
];

let updateModel = (days, fake)=>{

	let real_S=S, real_E=E, real_I=I, real_R=R;

	// Susceptible & Re
	/*if(fake && s_dom.disabled){
		s_dom.value = 1 - S;
	}*/
	if(fake && !s_dom.disabled){
		//s_dom.value = 1 - S;
		S = 1 - parseFloat(s_dom.value);
	}

	let transmissionRate = 1/params.p_transmission,
		incubationRate = 1/params.p_exposed,
		recoveryRate = 1/params.p_recovery,
		immunityLossRate = 1/(params.p_waning*(365/12));

	// R0
	r0 = transmissionRate/recoveryRate;
	/*r0_dom.value = transmissionRate/recoveryRate;
	if(r0_dom.oninput) r0_dom.oninput();*/

	// Transmission affected by interventions

	int.non_s = 1 - S;

	int.hygiene = params.p_hygiene;
	int.distancing = params.p_distancing;
	int.isolate = params.p_isolate;
	int.quarantine = params.p_quarantine;
	int.masks = params.p_masks;

	int.summer = (1 - Math.cos((daysCurrent-30)/365 * Math.TAU))/2;
	int.summer *= params.p_summer;
	
	interventionStrengths.forEach((isPair,i)=>{
		if(i==0) return; // DON'T double count S
		transmissionRate *= 1 - (int[isPair[0]] * isPair[1]);
	});

	// Vaccination...
	if(S > 1-params.p_vaccines){
		let newlyVaccinated = S - (1-params.p_vaccines);
		S -= newlyVaccinated;
		R += newlyVaccinated;
	}
	int.vaccines = params.p_vaccines;

	// S...
	if(!s_dom.disabled){
		S = 1 - parseFloat(s_dom.value);
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
	if((!fake || params.FROZEN_IN_TIME) && s_dom.disabled){
		s_dom.value = 1 - S;
	}
	re = newlyExposed/newlyRecovered;
	/*re_dom.value = newlyExposed/newlyRecovered;
	if(re_dom.oninput) re_dom.oninput();*/

	// IF FAKE, UNDO EVERYTHING
	if(fake){
		S = real_S;
		E = real_E;
		I = real_I;
		R = real_R;
	}

}

/////////////////////////////////////
// DRAW /////////////////////////////
/////////////////////////////////////

let canvas = $('#graphCanvas');
let context = canvas.getContext('2d');
let canvasScale = 2;
canvas.width = 500*canvasScale;
canvas.height = 500*canvasScale;
canvas.style.width = (canvas.width/canvasScale)+"px";
canvas.style.height = (canvas.height/canvasScale)+"px";


let interventionColors = [
	['non_s', '#bbbbbb'],
	['hygiene', '#40AEFF', 0.1],
	['distancing', '#405CFF', 0.2],
	['isolate', '#8FD68A', 0.2],
	['quarantine', '#75AD6F', 0.2],
	['masks', '#9240FF', 0.2],
	['summer', '#FF8142', 0.3],
	['vaccines', '#FFDF40', 0.6],
];

// SUPER HACK SLIDER COLORS
// I hate browsers (thx https://stackoverflow.com/a/13348618 )
let isThisFrikkinChrome = false;
{
	var isChromium = window.chrome;
	var winNav = window.navigator;
	var vendorName = winNav.vendor;
	var isOpera = typeof window.opr !== "undefined";
	var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	var isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
	   // is Google Chrome on IOS
	   isThisFrikkinChrome = true;
	} else if(
	  isChromium !== null &&
	  typeof isChromium !== "undefined" &&
	  vendorName === "Google Inc." &&
	  isOpera === false &&
	  isIEedge === false
	) {
	   // is Google Chrome
	   isThisFrikkinChrome = true;
	} else { 
	   // not Google Chrome 
	   isThisFrikkinChrome = false;
	}
}
let sliderColors = JSON.parse(JSON.stringify(interventionColors));
sliderColors.shift();
sliderColors.push([ 'hospital', '#000' ]);
let hackStyle = '';
sliderColors.forEach((icPair, i)=>{

	//if(i==0) return;

	let [name,color] = icPair;

	// Huge thanks to this person https://stackoverflow.com/a/38163892
	if(isThisFrikkinChrome){
		hackStyle += `

			@media screen and (-webkit-min-device-pixel-ratio:0) {
			  input#p_${name} {
			    overflow: hidden;
			    -webkit-appearance: none;
			    background-color: #dddddd;
			  }
			  input#p_${name}::-webkit-slider-runnable-track {
			    height: 10px;
			    -webkit-appearance: none;
			    color: ${color};
			    margin-top: -1px;
			  }
			  input#p_${name}::-webkit-slider-thumb {
			    width: 10px;
				-webkit-appearance: none;
				height: 9px;
				cursor: ew-resize;
				background: ${color};
				color: ${color};
				border:1px solid rgba(128,128,128,0.5);
				position:relative;
				top:1px;
				cursor:grab;

				box-shadow: -250px 0 0 250px;
			  }
			}
		`;
	}else{
		hackStyle += `
			input#p_${name}::-moz-range-progress {
				background-color: ${color};
			}
			input#p_${name}::-moz-range-track {
				background-color: #dddddd;
			}
			input#p_${name}::-moz-range-thumb {
				background: ${color};
				border-color: ${color};
				cursor: grab;
			}


			input#p_${name}::-ms-fill-lower {
				background-color: ${color};
			}

			input#p_${name}::-ms-fill-upper {
				background-color: #dddddd;
			}
			input#p_${name}::-ms-thumb {
				background: ${color};
				border-color: ${color};
				cursor: grab;
			}

		`;
	}


});
let hackStyleDOM = document.createElement('style');
hackStyleDOM.innerHTML = hackStyle;
document.head.appendChild(hackStyleDOM);


let _isItPastHerd = false;

let label_p_r0 = $('#label_p_r0');
let canvas_r0 = $('#canvas_r0');
let label_p_re = $('#label_p_re');
let canvas_re = $('#canvas_re');
canvas_r0.width = 540;
canvas_r0.height = 40;
canvas_r0.style.width = (canvas_r0.width/2)+"px";
canvas_r0.style.height = (canvas_r0.height/2)+"px";
canvas_re.width = 540;
canvas_re.height = 40;
canvas_re.style.width = (canvas_re.width/2)+"px";
canvas_re.style.height = (canvas_re.height/2)+"px";

let updateRBar = (label, canvas, number, THIS_IS_RE)=>{

	label.innerHTML = number.toFixed(2);

	let ctx = canvas.getContext('2d');
	ctx.scale(2,2);

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fillStyle = "#ff4040";
	ctx.fillRect(0, 3, 250*number/3, 14);

	if(THIS_IS_RE && re<r0-0.01){

		// interventionColors & interventionStrengths
		let diff = r0-re;

		/*
		let rReductions = [];
		let fakeR = r0;
		for(let i=0; i<interventionStrengths.length; i++){
			let isPair = interventionStrengths[i],
				name = isPair[0],
				maxStrength = isPair[1],
				myStrength = int[name] * maxStrength;
			let newFakeR = fakeR*(1 - myStrength);
			rReductions.push(fakeR - newFakeR);
			fakeR = newFakeR;
		}
		*/

		let interventionsAdded = interventionStrengths.reduce((sum, isPair)=>{
			let name = isPair[0],
				maxStrength = isPair[1],
				myStrength = int[name] * maxStrength;
			return sum+myStrength;
		},0);


		let interventionsRelative = interventionStrengths.map((isPair)=>{
			let name = isPair[0],
				maxStrength = isPair[1],
				myStrength = int[name] * maxStrength;
			return myStrength/interventionsAdded;
		});

		// Go from right to left
		ctx.translate( (250/3)*r0, 10 );
		interventionColors.forEach((icPair, i)=>{

			let name = icPair[0],
				color = icPair[1],
				myDiff = interventionsRelative[i] * diff,
				dx = -myDiff*(250/3);

			if(dx<-8){
				ctx.strokeStyle = color;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(dx+4, 0);
				ctx.lineTo(dx+4+4, -4);
				ctx.lineTo(dx+4, 0);
				ctx.lineTo(dx+4+4, 4);
				ctx.stroke();
			}

			ctx.translate(dx,0);

		});


	}

	ctx.setTransform(1,0,0,1,0,0);
	ctx.scale(2,2);

	// Herd Immunity
	ctx.fillStyle = "#000";
	ctx.fillRect(250*1/3, 0, 1, ctx.canvas.height);

	ctx.setTransform(1,0,0,1,0,0);

};

let IS_PLAYING_RECORDING = false;
let recordedHistory = [];

let show_percent_s = $('#show_percent_s'),
	show_percent_e = $('#show_percent_e'),
	show_percent_i = $('#show_percent_i'),
	show_percent_r = $('#show_percent_r'),
	herdDOM = $('.herd');

let draw = ()=>{

	// Redraw
	requestAnimationFrame(draw);

	// SUCH A HACK
	if(!CURRENT_STAGE) return;
	if(CURRENT_STAGE._HACK_MAKE_TIME_KEEP_GOING){
		daysTotal = Infinity;
		daysCurrent += 1;
		S = 0.999;
		E = 0;
		I = 0.001;
		R = 0;
		updateModel(1);
		updateRBar(label_p_r0, canvas_r0, r0);
		updateRBar(label_p_re, canvas_re, re, true);
	}

	// Update SI
	if((IS_PLAYING || INPUTS_WERE_CHANGED) && params._HACK_SHOW_SI_PERCENTS){
		let digits = 3; //(params._HACK_SHOW_SI_PERCENTS===true) ? 5 : params._HACK_SHOW_SI_PERCENTS;
		show_percent_s.innerHTML = ': '+(S*100).toFixed(digits)+'%';
		show_percent_e.innerHTML = ': '+(E*100).toFixed(digits)+'%';
		show_percent_i.innerHTML = ': '+(I*100).toFixed(digits)+'%';
		show_percent_r.innerHTML = ': '+(R*100).toFixed(digits)+'%';
	}

	// Update R0 & Re
	if(IS_PLAYING || INPUTS_WERE_CHANGED){

		updateRBar(label_p_r0, canvas_r0, r0);
		updateRBar(label_p_re, canvas_re, re, true);

		// Herd Immunity
		herdDOM.style.left = (1-(1/r0))*250 + 'px';

	}
	INPUTS_WERE_CHANGED = false;

	// Paused? At the end?
	if(!IS_PLAYING) return; // STOP
	if(params.FROZEN_IN_TIME) return; // STOP
	if(daysCurrent > daysTotal){
		
		IS_PLAYING = false;
		_updateButtons();

		if(params._HACK_RESET_WHEN_R_100=="ready"){
			params._HACK_RESET_WHEN_R_100 = "go";
			if(CURRENT_STAGE.SHOW_HAND=="tutorial_1" && handTutorial==1){
				if(!HAND_IS_VISIBLE){
					showHand('start');
				}
			}
		}

		return;
	}

	// HACK
	if(params._HACK_RESET_WHEN_I_100=="ready" && I>=0.999999){

		params._HACK_RESET_WHEN_I_100 = "go";
		bbDOM.setAttribute('label','reset');
		//sbDOM.setAttribute('label','');
		
		if(CURRENT_STAGE.SHOW_HAND=="tutorial_0" && handTutorial==1){
			if(!HAND_IS_VISIBLE){
				setTimeout(()=>{
					showHand('start');
				},2500);
			}
		}
		if(CURRENT_STAGE.SHOW_HAND=="tutorial_1" && handTutorial==1){
			if(!HAND_IS_VISIBLE){
				showHand('start');
			}
		}

	}


	// Replay History!
	if(IS_PLAYING_RECORDING){

		let keepFindingNewEntries = true;
		while(keepFindingNewEntries){

			let record = recordedHistory[0];
			if(!record || daysCurrent<record[2]){
				// Not its time yet
				keepFindingNewEntries = false;
			}else{

				// It is!
				recordedHistory.shift(); // remove first element
				
				// Set that slider
				let slider = $('#'+record[0]);
				slider.value = record[1];
				//DONT_RECORD_HISTORY = true;
				slider.oninput();
				//DONT_RECORD_HISTORY = false;

			}

		}

	}
	/*
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
	*/

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
		//ctx.fillStyle = "#000";
		ctx.fillRect(0,y,w,h);

		// R
		y += h;
		h = R * canvas.height;
		ctx.fillStyle = "#bbbbbb";
		//ctx.fillStyle = "#000";
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
			if(ic[0]=="non_s") return; // EXCEPT Non-Susceptibles
			ctx.fillStyle = ic[1];
			ctx.globalAlpha = int[ic[0]] * ic[2];
			// ctx.globalAlpha = int[ic[0]] * 0.2;
			ctx.fillRect(0,y,w,h);
			ctx.globalAlpha = 1;
		});

		// ICU bed capacity
		// 0.6%
		if(params.p_hospital){
			y = (1-((params.p_hospital/100)*0.006))*canvas.height;
			h = 2;
			ctx.fillStyle = "#000000";
			ctx.fillRect(0,y,w,h);
		}

		// Herd Immunity
		if(params.c_recovery && !params.DO_NOT_SHOW_HERD_IMMUNITY){
			
			let herdImmunity = 1 - (1/r0);

			// Dashed
			if((daysDrawn/daysTotal)*100 % 1 < 0.5){
				y = (1-herdImmunity)*canvas.height;
				h = 2;
				ctx.fillStyle = "#000000";
				ctx.fillRect(0,y,w,h);
			}

			// Line when it passes!
			let isItCurrentlyAboveHerd = S<(1/r0);
			if(!_isItPastHerd && isItCurrentlyAboveHerd){
				h = canvas.height;
				ctx.fillStyle = "rgba(0,0,0,0.2)";
				ctx.fillRect(0,0,w,h);
			}
			_isItPastHerd = isItCurrentlyAboveHerd;

		}

		// RESET
		ctx.setTransform(1,0,0,1,0,0);
		daysDrawn += timeDelta;

	}

};
