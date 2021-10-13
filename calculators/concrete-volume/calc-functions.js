function flexCalcMultiplier(el, e){
	var input = el.nextElementSibling;

	if( el.value == 1 ){
		input.value /= 12;
	} else {
		input.value *= 12;
	}

	input.value = input.value.toFixed(3);
}

function calculateCubicYards(el, e){
	e.preventDefault();
	
	var fields = {
		length:    el.querySelector('[name="length"]'),
		width:     el.querySelector('[name="width"]'),
		thickness: el.querySelector('[name="thickness"]'),
		answer:    el.querySelector('[name="answer"]')
	};
	
	var multipliers = {};
	var values = {};
	
	Object.keys(fields).forEach(function(key){
		if( key == 'answer' )
			return;

		values[key]      = parseFloat( fields[key].value );
		multipliers[key] = parseInt( fields[key].previousElementSibling.value );
	});
	
	var feet = (
		( values.length    / multipliers.length ) *
		( values.width     / multipliers.width ) *
		( values.thickness / multipliers.thickness )
	);
	
	fields.answer.value = (feet / 27).toFixed(6);
}