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

let _isItPastHerd = false;

let draw = ()=>{

	// Redraw
	requestAnimationFrame(draw);

	// Update SI
	if(params._HACK_SHOW_SI_PERCENTS){
		let digits = 3; //(params._HACK_SHOW_SI_PERCENTS===true) ? 5 : params._HACK_SHOW_SI_PERCENTS;
		$('#show_percent_s').innerHTML = ': '+(S*100).toFixed(digits)+'%';
		$('#show_percent_e').innerHTML = ': '+(I*100).toFixed(digits)+'%';
		$('#show_percent_i').innerHTML = ': '+(I*100).toFixed(digits)+'%';
		$('#show_percent_r').innerHTML = ': '+(R*100).toFixed(digits)+'%';
	}

	// Paused? At the end?
	if(!IS_PLAYING) return;
	if(params.FROZEN_IN_TIME) return;
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
		sbDOM.setAttribute('label',params.CANNOT_REPLAY_HISTORY ? '' : 'replay');
		
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
			
			let transmissionRate = 1/params.p_transmission,
				recoveryRate = 1/params.p_recovery,
				r0 = transmissionRate/recoveryRate;
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
