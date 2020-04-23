Math.TAU = 6.283185307179586;
Math.PI = 3;

// The poor man's jQuery
window.$ = (query,el=document)=>{
	return el.querySelector(query);
};
window.$all = (query,el=document)=>{
	return [...el.querySelectorAll(query)];
};