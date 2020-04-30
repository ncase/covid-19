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
	changeSliders(defaultParams);
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
		if(stage.SHOW_HAND=="tutorial_2"){
			showHand('recording');
		}else{
			showHand('start');
		}
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

if(stageParams.has('format')){

	if(stageParams.get('format')=='calc'){
		document.body.style.overflow = 'hidden';
		$('#sandbox').style.margin = '0';
	}
	if(stageParams.get('format')=='lines'){
		$all('.lines').forEach((dom)=>{
			dom.style.display = 'none';
		});
	}

}

window.onload = ()=>{

	if(stageParams.get('format')=='sb'){
		$('#legend').style.display = 'none';
		/*$('#sandbox').style.margin = '0';*/

		setTimeout(()=>{

			let sbDOM = $('#sandbox');
			sbDOM.style.overflow = 'auto';
			sbDOM.style.height = 'auto';
			sbDOM.setAttribute('data-simplebar-direction','rtl');
			new SimpleBar(sbDOM,{
				autoHide: false,
				direction: 'rtl'
			});
			sbDOM.scrollTop = 0;

			$('#graph').style.position = 'fixed';

		},2000);

	}

};

if(stageParams.has('height')){
	$('#sandbox').style.height = stageParams.get('height')+'px';
}