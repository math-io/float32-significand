'use strict';

// MODULES //

var tape = require( 'tape' );
var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var round = require( 'math-round' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var bits = require( 'math-float32-bits' );
var significand = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof significand === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a number', function test( t ) {
	t.equal( typeof significand( toFloat32( 3.14e30 ) ), 'number', 'returns a number' );
	t.end();
});

tape( 'the function returns an integer corresponding to the significand of a single-precision floating-point number', function test( t ) {
	var expected;
	var actual;
	var sign;
	var frac;
	var exp;
	var x;
	var b;
	var i;

	for ( i = 0; i < 5e3; i++ ) {
		if ( Math.random() < 0.5 ) {
			sign = -1;
		} else {
			sign = 1;
		}
		frac = Math.random() * 10;
		exp = round( Math.random()*44 ) - 22;
		x = sign * frac * pow( 10, exp );
		x = toFloat32( x );

		b = bits( x );
		expected = parseInt( b.substring( 9 ), 2 );

		actual = significand( x );
		t.equal( actual, expected, 'returns the significand for ' + x );

	}
	t.end();
});

tape( 'the function returns the significand for `+-0`', function test( t ) {
	t.equal( significand( 0 ), 0, 'returns 0' );
	t.equal( significand( -0 ), 0, 'returns 0' );
	t.end();
});

tape( 'the function returns the significand for `+infinity`', function test( t ) {
	t.equal( significand( pinf ), 0, 'returns 0' );
	t.end();
});

tape( 'the function returns the significand for `-infinity`', function test( t ) {
	t.equal( significand( ninf ), 0, 'returns 0' );
	t.end();
});

tape( 'the function returns the significand for `NaN`', function test( t ) {
	t.equal( significand( NaN ), 4194304, 'returns int corresponding to bit sequence 10000000000000000000000' );
	t.end();
});

tape( 'the function returns the significand for subnormals', function test( t ) {
	var x = toFloat32( 3.14e-42 );
	var s = parseInt( bits( x ).substring( 9 ), 2 );
	t.equal( significand( x ), s, 'returns the significand for ' + x );
	t.end();
});
