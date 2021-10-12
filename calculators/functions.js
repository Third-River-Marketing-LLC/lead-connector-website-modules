/* jshint esversion: 6 */

const head       = document.head || document.getElementsByTagName('head')[0],
	  script     = document.currentScript ?? document.scripts[document.scripts.length - 1],
	  calculator = document.currentScript.getAttribute('calculator');

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

	var templateURL = 'https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/calculators/'+ calculator +'/calc-template.html';

	var style  = document.createElement('link');

	style.rel  = 'stylesheet';
	style.type = 'text/css';
	style.href = 'https://cdn.jsdelivr.net/gh/Third-River-Marketing-LLC/lead-connector-website-modules@latest/calculators/style.min.css';
	
	head.appendChild(style);

	fetch(templateURL).then(function(response){		
		return response.text();
	}).then(function(html){
		script.outerHTML = html;

		document.documentElement.dataset['loadCalculator'+calculator.replace(/-/,'')] = 'true';
	});
}

if( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', loadCalculator );
} else if( document.readyState === 'interactive' || document.readyState === 'complete' ) {
	loadCalculator();
}