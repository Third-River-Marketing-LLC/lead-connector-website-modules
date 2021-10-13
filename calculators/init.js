/* jshint esversion: 6 */
var head       = document.head || document.getElementsByTagName('head')[0],
	url        = 'https://cdn.jsdelivr.net/',
	debugURL   = 'https://xhynk.com/',
	path       = 'gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/calculators/';
	calculator = document.currentScript.getAttribute('calculator'),
	heading    = document.currentScript.getAttribute('heading'),
	notice     = document.currentScript.getAttribute('notice'),
	debug      = document.currentScript.getAttribute('debug');

function flexCalcMultiplier(el, e, div, mult){
	div ??= 12;
	mult ??= 12;

	var input = el.nextElementSibling,
		value = (el.value == 1) ? input.value / div : input.value * mult,
		step  = input.getAttribute('step'),
		dec   = 1,
		fixed = 0;
	
	if( step != null && step.includes('.') )
		fixed = step.replace('.','').length;
	
	dec += '0'.repeat(fixed);
	dec = Number(dec);
	
	input.value = Math.round((value + Number.EPSILON) * dec) / dec;
}

function uniqid(prefix = "", random = false) {
    var sec = Date.now() * 1000 + Math.random() * 1000;
    var id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
	
    return prefix + id + ((random) ? Math.trunc(Math.random() * 100000000) : '');
};

function resetForm(el,e){
	e.preventDefault();
	
	if( !confirm('Reset the ' + el.closest('form').querySelector('strong').innerText + '?' ) )
		return;
	
	var fields = el.closest('form').querySelectorAll('input');

	fields.forEach(function(field){
		field.value = '';
	});
}

(function(){
	if( !document.currentScript.src.includes('initialized=true') ){
		var newScript = document.createElement('script');
		newScript.src = document.currentScript.src;
		newScript.setAttribute('debug', document.currentScript.getAttribute('debug') );
		newScript.setAttribute('notice', document.currentScript.getAttribute('notice') );
		newScript.setAttribute('heading', document.currentScript.getAttribute('heading') );
		newScript.setAttribute('calculator', document.currentScript.getAttribute('calculator') );

		newScript.src += (newScript.src.includes('?')) ? '&' : '?';
		newScript.src += 'initialized=true&uniqid=' + uniqid(calculator,true);

		document.body.insertBefore(newScript, document.currentScript);
		document.currentScript.outerHTML = '';
	} else {
		var selfScript = document.currentScript;

		var baseURL = ((debug != null && debug != 'null') ? debugURL + path.replace('@latest','') : url + path );
		
		// Duplicate script issue has been handled
		var template     = baseURL + calculator +'/template.html';
		var calculations = baseURL + calculator +'/calculations.js';

		if( head.querySelector('link[href="'+ baseURL + 'style.min.css"]') == null ){
			var style  = document.createElement('link');
			style.rel  = 'stylesheet';
			style.type = 'text/css';
			style.href = baseURL + 'style.min.css';
			head.appendChild(style);
		}

		var calcFunctionsScript = document.createElement('script');
		calcFunctionsScript.src = calculations;

		fetch(template).then(function(response){
			return response.text();
		}).then(function(html){
			var calculatorElement = document.createElement('div');
			calculatorElement.id = calculator;
			calculatorElement.dataUniqueId = uniqid(calculator,true);
			calculatorElement.classList.add(calculator);
			calculatorElement.innerHTML = html;

			if( heading != null && heading != 'null' ){
				var headingElement = calculatorElement.querySelector('header h3 strong');
				if( headingElement != null )
					headingElement.innerText = heading;
			}

			if( notice != null && notice != 'null' ){
				var noticeElement = calculatorElement.querySelector('header h3 em');
				if( noticeElement != null )
					noticeElement.innerText = notice;
			}

			selfScript.outerHTML = calculatorElement.outerHTML;
		}).then(function(){
			document.body.appendChild(calcFunctionsScript);
			console.log( calculator +' Loaded' );
		});
	}
})();