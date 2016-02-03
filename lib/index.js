'use strict';

// MODULES //

var getWord = require( 'math-float32-to-word' );


// VARIABLES //

// Significand mask: 0 00000000 11111111111111111111111
var MASK = 0x007fffff;


// SIGNIFICAND //

/**
* FUNCTION: significand( x )
*	Returns an integer corresponding to the significand of a single-precision floating-point number.
*
* @param {Number} x - single-precision floating-point number
* @returns {Number} significand
*/
function significand( x ) {
	// Convert `x` to an unsigned 32-bit integer corresponding to the IEEE 754 binary representation:
	var w = getWord( x );

	// Apply a mask to isolate only the significand bits:
	return w & MASK;
} // end FUNCTION significand()


// EXPORTS //

module.exports = significand;
