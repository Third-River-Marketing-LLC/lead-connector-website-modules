/* jshint esversion: 6 */
var head       = document.head || document.getElementsByTagName('head')[0],
	script     = document.currentScript ?? document.scripts[document.scripts.length - 1],
	baseURL    = 'https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/calculators/';
	calculator = script.getAttribute('calculator'),
	heading    = script.getAttribute('heading'),
	notice     = script.getAttribute('notice');

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

function loadCalculator(){
	if( document.documentElement.dataset['loadCalculator'+calculator.replace(/-/,'')] === 'true' )
		return;

	var template     = baseURL + calculator +'/template.html';
	var calculations = baseURL + calculator +'/calculations.js';

	var style  = document.createElement('link');
	style.rel  = 'stylesheet';
	style.type = 'text/css';
	style.href = baseURL + 'style.min.css';
	head.appendChild(style);

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

		if( heading != null ){
			var headingElement = calculatorElement.querySelector('header h3 strong');
			if( headingElement != null )
				headingElement.innerText = heading;
		}

		if( notice != null ){
			var noticeElement = calculatorElement.querySelector('header h3 em');
			if( noticeElement != null )
				noticeElement.innerText = notice;
		}

		script.outerHTML = calculatorElement.outerHTML;
	}).then(function(){
		document.body.appendChild(calcFunctionsScript);

		document.documentElement.dataset['loadCalculator'+calculator.replace(/-/,'')] = 'true';
		console.log( calculator +' Loaded' );
	});
}

if( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', loadCalculator );
} else if( document.readyState === 'interactive' || document.readyState === 'complete' ) {
	loadCalculator();
}