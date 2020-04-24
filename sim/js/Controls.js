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
//let DONT_RECORD_HISTORY = true;
let _DO_NOT_RECURSE = true;
let INPUTS_WERE_CHANGED = false;
let yearsSlider = $('#p_years');
$all('.sim_input').forEach((slider)=>{
	let id = slider.id;
	let label = $('#label_'+id);
	//let isRecordable = slider.classList.contains('recordable');
	let onChange = ()=>{

		// Change label & param
		let val = parseFloat(slider.value);
		if(label){
			let digits = parseInt(label.getAttribute('toFixed'));
			label.innerHTML = digits ? val.toFixed(digits) : val;
		}
		params[id] = val;

		// Record history (@ this day)
		/*
		if(isRecordable){
			if(!DONT_RECORD_HISTORY){
				let lastRecordedEntry = recordedHistory[recordedHistory.length-1];
				if(!lastRecordedEntry || id!=lastRecordedEntry[0] || Math.round(daysCurrent)!=lastRecordedEntry[2]){ // not same thing/time
					recordedHistory.push([id, val, Math.round(daysCurrent)]);
				}
			}
		}
		*/

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

		// HAX
		INPUTS_WERE_CHANGED = true;

	};
	slider.oninput = onChange;
	onChange();
});
//DONT_RECORD_HISTORY = false;
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
// (RE)START ////////////////////////
/////////////////////////////////////

let IS_PLAYING = false;

//let recordedHistory = [];
//let IS_REPLAYING_HISTORY = false;

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

	// Force refresh DOM
	s_dom.oninput();

};


/////////////////////////////////////
// BIG & SMALL BUTTONS //////////////
/////////////////////////////////////

let bbDOM = $('.big_button');
let sbDOM = $('.small_button');

let handTutorial = 0;

bbDOM.onclick = ()=>{

	if(CURRENT_STAGE.SHOW_HAND=="tutorial_0"){
		if(handTutorial==0){
			hideHand();
			handTutorial = 1;
		}else if(handTutorial==1){
			hideHand();
		}else if(handTutorial==2){
			hideHand();
			setTimeout(()=>{
				showHand('end');
			},1);
			handTutorial = 3;
		}
	}
	if(CURRENT_STAGE.SHOW_HAND=="tutorial_1"){
		if(handTutorial==0){
			hideHand();
			handTutorial = 1;
		}else if(handTutorial==1){
			hideHand();
			handTutorial = 2;
		}
	}

	if(daysCurrent>daysTotal || params._HACK_RESET_WHEN_I_100=="go" || params._HACK_RESET_WHEN_R_100=="go"){
		
		_resetTheSim();
		params._HACK_RESET_WHEN_I_100 = undefined;
		params._HACK_RESET_WHEN_R_100 = undefined;

		if(CURRENT_STAGE.SHOW_HAND=="tutorial_0" && handTutorial<=1){
			setTimeout(()=>{
				showHand('params');
			},1000);
			handTutorial = 2;
		}

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
	["p_recovery", 11],
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
		//_replayTheSim();
	}else{
		_resetTheSim();
	}
	_updateButtons();
};

let _updateButtons = ()=>{

	if(daysCurrent > daysTotal){

		bbDOM.setAttribute('label','reset');
		sbDOM.setAttribute('label','');
	
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
	//IS_REPLAYING_HISTORY = false;
	//recordedHistory = [];
	restart();
	IS_PLAYING = false;
};
/*
let _replayTheSim = ()=>{
	_hideAllControls();
	//IS_REPLAYING_HISTORY = true;
	restart();
	IS_PLAYING = true;
};

*/

/////////////////////////////////////
// THE HAND /////////////////////////
/////////////////////////////////////

let pointerDOM = $('#pointer');
let handDOM = $('#hand_container');
let wordsDOM = $('#pointer_words');
let HAND_IS_VISIBLE = false;
let showHand = (position)=>{

	HAND_IS_VISIBLE = true;
	pointerDOM.style.display = 'block';

	$all('span',pointerDOM).forEach((span)=>{
		span.style.display = 'none';
	});

	switch(position){
		case 'start':
			handDOM.style.top = '111px';
    		handDOM.style.left = '98px';
		break;
		case 'params': case 'params2':
			handDOM.style.top = '100px';
		    handDOM.style.left = '280px';
		    handDOM.style.transform = 'rotate(270deg)';
			wordsDOM.style.top = '117px';
		    wordsDOM.style.left = '377px';
		    wordsDOM.style.textAlign = 'left';
			$('#pointer_params').style.display = 'inline';
			$('#pointer_params_2').style.display = (position=='params2') ? 'inline' : 'none';
		break;
		case 'end':
			handDOM.style.top = '445px';
		    handDOM.style.left = '101px';
		    handDOM.style.transform = 'rotate(180deg) scaleX(-1)';
			wordsDOM.style.top = '363px';
		    wordsDOM.style.left = '17px';
		    wordsDOM.style.textAlign = 'center';
			$('#pointer_scroll').style.display = 'inline';
		break;
	}


};
let hideHand = ()=>{

	HAND_IS_VISIBLE = false;
	pointerDOM.style.display = 'none';

};


