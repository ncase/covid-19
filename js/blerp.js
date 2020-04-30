window.$ = (query,el=document)=>{
	return el.querySelector(query);
};

{

	let url = encodeURIComponent(window.location.href),
		title = encodeURIComponent($('#share_title').innerText.trim()),
		desc = encodeURIComponent($('#share_desc').innerText.trim());

	$('#shareables').innerHTML = `
	  <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank"><img alt="Share on Facebook" src="sharing/Facebook.png" /></a>
	  <a href="https://twitter.com/intent/tweet?text=${title}%0A${desc}%20${url}" target="_blank"><img alt="Tweet" src="sharingTwitter.png" /></a>
	  <a href="mailto:?subject=${title}&body=${desc}%20${url}" target="_blank"><img alt="Send email" src="sharing/Email.png" /></a>
	`;

}

$('#footnotes_container').appendChild($('.footnotes'));

$('#show_feetnotes_button').onclick = ()=>{
	$('#show_feetnotes_button').style.display = 'none';
	$('#shown_feetnotes').style.display = 'block';
	$('.footnotes').style.display = 'block';
};