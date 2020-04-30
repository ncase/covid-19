window.$ = (query,el=document)=>{
	return el.querySelector(query);
};
window.$all = (query,el=document)=>{
	return [...el.querySelectorAll(query)];
};

{

	let url = encodeURIComponent(window.location.href),
		title = encodeURIComponent($('#share_title').innerText.trim()),
		desc = encodeURIComponent($('#share_desc').innerText.trim());

	$all('.shareables').forEach((dom)=>{
		dom.innerHTML = `
			<a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank"><div class='sharable_icon' fb></div></a>
			<a href="https://twitter.com/intent/tweet?text=${title}%0A${desc}%20${url}" target="_blank"><div class='sharable_icon' tw></div></a>
			<a href="mailto:?subject=${title}&body=${desc}%20${url}" target="_blank"><div class='sharable_icon' em></div></a>
		`;
	});

}

$('#footnotes_container').appendChild($('.footnotes'));

$('#show_feetnotes_button').onclick = ()=>{
	$('#show_feetnotes_button').style.display = 'none';
	$('#shown_feetnotes').style.display = 'block';
	$('.footnotes').style.display = 'block';
};

$all('.footnotes a[rev="footnote"]').forEach((a)=>{
	a.setAttribute('target','_self');
});