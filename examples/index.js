'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var significand = require( './../lib' );

var frac;
var exp;
var x;
var s;
var i;

// Generate random numbers and extract their significands...
for ( i = 0; i < 100; i++ ) {
	frac = Math.random() * 10;
	exp = round( Math.random()*44 ) - 22;
	x = frac * pow( 10, exp );
	x = toFloat32( x );
	s = significand( x );
	console.log( 'x: %d. significand: %d.', x, s );
}