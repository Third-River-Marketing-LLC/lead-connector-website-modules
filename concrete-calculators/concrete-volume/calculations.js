function calculateCubicYards_concretevolume(el, e){
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
		
		var step  = fields[key].getAttribute('step');
			dec   = 1,
			fixed = 0;

		if( step != null && step.includes('.') )
			fixed = step.replace('.','').length;
	
		dec += '0'.repeat(fixed);
		dec = Number(dec);

		// Force to fixed step
		fields[key].value = Math.round((Number(fields[key].value) + Number.EPSILON) * dec) / dec;

		// Grab values
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