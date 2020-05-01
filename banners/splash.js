window.$ = (query,el=document)=>{
	return el.querySelector(query);
};

window.onload = ()=>{
	doStep(0);
};

let bannerDOM = $('#banner');
let doStep = (num)=>{

	bannerDOM.style.backgroundPosition = '0% '+(num*-100)+'%';
	bannerDOM.style.width = '960px';
	setTimeout(()=>{

		bannerDOM.setAttribute('retract','true');
		setTimeout(()=>{
			bannerDOM.style.width = '0px';
			
			setTimeout(()=>{

				bannerDOM.removeAttribute('retract');

				setTimeout(()=>{
					doStep(num+1);
				},100);
				

			},1000);

		},100);

	},9000);

};