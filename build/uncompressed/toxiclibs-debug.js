// uncompressed/toxiclibs-debug r43 - http://github.com/hapticdata/toxiclibsjs
/**
	T O X I C L I B S . JS 
	http://haptic-data.com/toxiclibsjs
	a port of toxiclibs for Java / Processing written by Karsten Schmidt
		
	License			: GNU Lesser General Public version 2.1
	Developer		: Kyle Phillips: http://haptic-data.com
	Java Version		: http://toxiclibs.org
*/
/** @namespace */
var toxi = toxi || {};


//anything that is manipulating global is inside this function
(function(){
	//allow the library to assume Array.isArray has been implemented
	Array.isArray = Array.isArray || function(a){
		return a.toString() == '[object Array]';	
	};
	//anything messing with global at top:
	if(typeof window !== "undefined"){ //otherwise its not being used in a browser-context

		if( !window.Int32Array){
			window.Int32Array = Array;
			window.Float32Array = Array;
		}		
	}

	//if this is being used with node/CommonJS
	if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
		module.exports = toxi;
	}

})();

toxi.extend = function(childClass,superClass){
	childClass.prototype = new superClass();
	childClass.constructor = childClass;
	childClass.prototype.parent = superClass.prototype;
};

/**
 * @class
 * @static
 * @member toxi
 * @description math utilities
 */
toxi.MathUtils = {};
toxi.MathUtils.SQRT2 = Math.sqrt(2);
toxi.MathUtils.SQRT3 = Math.sqrt(3);
toxi.MathUtils.LOG2 = Math.log(2);
toxi.MathUtils.PI = 3.14159265358979323846;

/**
 * The reciprocal of PI: (1/PI)
 */
toxi.MathUtils.INV_PI = 1.0 / toxi.MathUtils.PI;
toxi.MathUtils.HALF_PI = toxi.MathUtils.PI / 2;
toxi.MathUtils.THIRD_PI = toxi.MathUtils.PI / 3;
toxi.MathUtils.QUARTER_PI = toxi.MathUtils.PI / 4;
toxi.MathUtils.TWO_PI = toxi.MathUtils.PI * 2;
toxi.MathUtils.THREE_HALVES_PI = toxi.MathUtils.TWO_PI - toxi.MathUtils.HALF_PI;
toxi.MathUtils.PI_SQUARED = toxi.MathUtils.PI * toxi.MathUtils.PI;

/**
 * Epsilon value
 */
toxi.MathUtils.EPS = 1.1920928955078125E-7;

/**
 * Degrees to radians conversion factor
 */
toxi.MathUtils.DEG2RAD = toxi.MathUtils.PI / 180;

/**
 * Radians to degrees conversion factor
 */
toxi.MathUtils.RAD2DEG = 180 / toxi.MathUtils.PI;
toxi.MathUtils.SHIFT23 = 1 << 23;
toxi.MathUtils.INV_SHIFT23 = 1.0 / toxi.MathUtils.SHIFT23;
toxi.MathUtils.SIN_A = -4.0 / (toxi.MathUtils.PI * toxi.MathUtils.PI);
toxi.MathUtils.SIN_B = 4.0 / toxi.MathUtils.PI;
toxi.MathUtils.SIN_P = 9.0 / 40;
toxi.MathUtils.abs = Math.abs;
/**
 * Rounds up the value to the nearest higher power^2 value.
 * 
 * @param x
 * @return power^2 value
 */
toxi.MathUtils.ceilPowerOf2 = function(x) {
    var pow2 = 1;
    while (pow2 < x) {
        pow2 <<= 1;
    }
    return pow2;
};

toxi.MathUtils.clip = function(a, _min, _max) {
    return a < _min ? _min : (a > _max ? _max : a);
};
/**
 * Clips the value to the 0.0 .. 1.0 interval.
 * 
 * @param a
 * @return clipped value
 * @since 0012
 */
toxi.MathUtils.clipNormalized = function(a) {
    if (a < 0) {
        return 0;
    } else if (a > 1) {
        return 1;
    }
    return a;
};

toxi.MathUtils.cos = Math.cos;

toxi.MathUtils.degrees = function(radians) {
    return radians * this.RAD2DEG;
};

/**
 * Fast cosine approximation.
 * 
 * @param x
 *            angle in -PI/2 .. +PI/2 interval
 * @return cosine
 */
toxi.MathUtils.fastCos = function(x) {
    return toxi.MathUtils.fastSin(x + ((x > toxi.MathUtils.HALF_PI) ? -toxi.MathUtils.THREE_HALVES_PI : toxi.MathUtils.HALF_PI));
};

/**
 * Fast sine approximation.
 * 
 * @param x
 *            angle in -PI/2 .. +PI/2 interval
 * @return sine
 */
toxi.MathUtils.fastSin = function(x) {
    x = toxi.MathUtils.SIN_B * x + toxi.MathUtils.SIN_A * x * Math.abs(x);
    return toxi.MathUtils.SIN_P * (x * Math.abs(x) - x) + x;
};

toxi.MathUtils.flipCoin = function(rnd) {
    return Math.random() < 0.5;
};

/**
 * This method is a *lot* faster than using (int)Math.floor(x).
 * 
 * @param x
 *            value to be floored
 * @return floored value as integer
 */

toxi.MathUtils.floor = function(x) {
   var y = parseInt(x,10);
   if (x < 0 && x != y) {
       y--;
   }
   return y;
};

/**
 * Rounds down the value to the nearest lower power^2 value.
 * 
 * @param x
 * @return power^2 value
 */
toxi.MathUtils.floorPowerOf2 = function(x) {
  return parseInt( Math.pow(2, parseInt((Math.log(x) / toxi.MathUtils.LOG2),10)),10);
};

toxi.MathUtils.max =  function(a, b, c) {
	if(!c) return Math.max(a,b);
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
};

toxi.MathUtils.min = function(a, b, c) {
	if(!c)return Math.min(a,b);
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
};

/**
 * Returns a random number in the interval -1 .. +1.
 * 
 * @return random float
 */
toxi.MathUtils.normalizedRandom = function() {
  return Math.random() * 2 - 1;
};

toxi.MathUtils.radians = function(degrees) {
  return degrees * toxi.MathUtils.DEG2RAD;
};

toxi.MathUtils.random = function(rand,min,max) {
  if(arguments.length == 2) {
    max = min;
    min = rand;
    rand = Math.random;
  }
	if(!min && !max)return Math.random();
	else if(!max){ //if only one is provided, then thats actually the max
		max = min;
		return rand()*max;
	}
    return rand() * (max - min) + min;
};

toxi.MathUtils.reduceAngle = function(theta) {
    theta %= toxi.MathUtils.TWO_PI;
    if (Math.abs(theta) > toxi.MathUtils.PI) {
        theta = theta - toxi.MathUtils.TWO_PI;
    }
    if (Math.abs(theta) > toxi.MathUtils.HALF_PI) {
        theta = toxi.MathUtils.PI - theta;
    }
    return theta;
};

toxi.MathUtils.sign = function(x) {
    return x < 0 ? -1 : (x > 0 ? 1 : 0);
};

toxi.MathUtils.sin = function(theta) {
   theta = toxi.MathUtils.reduceAngle(theta);
   if (Math.abs(theta) <= toxi.MathUtils.QUARTER_PI) {
       return toxi.MathUtils.fastSin(theta);
   }
   return toxi.MathUtils.fastCos(toxi.MathUtils.HALF_PI - theta);
};

/**
 * @class Bezier curve interpolation with configurable coefficients. The curve
 * parameters need to be normalized offsets relative to the start and end values
 * passed to the {@link #interpolate(float, float, float)} method, but can
 * exceed the normal 0 .. 1.0 interval. Use symmetrical offsets to create a
 * symmetrical curve, e.g. this will create a curve with 2 dips reaching the
 * minimum and maximum values at 25% and 75% of the interval...
 * @member toxi
 * 
 * @example
 * <p>
 * <code>BezierInterpolation b=new BezierInterpolation(3,-3);</code>
 * </p>
 * 
 * The curve will be a straight line with this configuration:
 * 
 * <p>
 * <code>BezierInterpolation b=new BezierInterpolation(1f/3,-1f/3);</code>
 * </p>
 */
toxi.BezierInterpolation = function(h1,h2) {
	this.c1 = h1;
	this.c2 = h2;
};

toxi.BezierInterpolation.prototype = {
	interpolate: function(a,b,t) {
		var tSquared = t * t;
	    var invT = 1.0 - t;
	    var invTSquared = invT * invT;
	    return (a * invTSquared * invT) + (3 * (this.c1 * (b - a) + a) * t * invTSquared) + (3 * (this.c2 * (b - a) + b) * tSquared * invT) + (b * tSquared * t);
	},

    setCoefficients:function(a, b) {
        this.c1 = a;
        this.c2 = b;
    }

};

/**
 * @class Implementation of the circular interpolation function.
 * 
 * i = a-(b-a) * (sqrt(1 - (1 - f) * (1 - f) ))
 * @description The interpolation slope can be flipped to have its steepest ascent
 * towards the end value, rather than at the beginning in the default
 * configuration.
 * @member toxi
 * 
 * @param isFlipped
 *            true, if slope is inverted
 */
toxi.CircularInterpolation = function(isFlipped) {
   if(isFlipped === undefined){
		this.isFlipped = false;
	}
};

toxi.CircularInterpolation.prototype = {
	interpolate: function( a, b, f) {
        if (this.isFlipped) {
            return a - (b - a) * (Math.sqrt(1 - f * f) - 1);
        } else {
            f = 1 - f;
            return a + (b - a) * ( Math.sqrt(1 - f * f));
        }
    },

    setFlipped: function(isFlipped) {
        this.isFlipped = isFlipped;
    }
};



/**
 * @class Implementation of the cosine interpolation function:
 * i = b+(a-b)*(0.5+0.5*cos(f*PI))
 * @member toxi
 */
toxi.CosineInterpolation = function(){};

toxi.CosineInterpolation.prototype = {
	interpolate: function(a, b, f) {
		return b + (a - b) * (0.5 + 0.5 * Math.cos(f * Math.PI));
	}
};



/**
 * @class Delivers a number of decimated/stepped values for a given interval. E.g. by
 * using 5 steps the interpolation factor is decimated to: 0, 20, 40, 60, 80 and
 * 100%. By default {@link LinearInterpolation} is used, however any other
 * {@link InterpolateStrategy} can be specified via the constructor.
 * @member toxi
 */
toxi.DecimatedInterpolation = function(steps,strategy) {
 if(steps === undefined){
	throw new Error("steps was not passed to constructor");
 }
 this.numSteps = steps;
 this.strategy = (strategy===undefined)? new toxi.LinearInterpolation() : strategy;
};

toxi.DecimatedInterpolation.prototype = {	
	interpolate: function(a,b,f) {
        var fd = Math.floor(f * this.numSteps) /  this.numSteps;
        return this.strategy.interpolate(a, b, fd);
	}
};

/**
 * @class Exponential curve interpolation with adjustable exponent. Use exp in the
 * following ranges to achieve these effects:
 * <ul>
 * <li>0.0 &lt; x &lt; 1.0 : ease in (steep changes towards b)</li>
 * <li>1.0 : same as {@link LinearInterpolation}</li>
 * <li>&gt; 1.0 : ease-out (steep changes from a)</li>
 * </ul>
 * @member toxi
 */
toxi.ExponentialInterpolation = function(exp) {
   this.exponent = (exp === undefined)?2 : exp;
};

toxi.ExponentialInterpolation.prototype = {
	interpolate: function(a, b, f) {
		return a + (b - a) * Math.pow(f, this.exponent);
    }
};

/**
 * @class Implementations of 2D interpolation functions (currently only bilinear).
 * @member toxi
 * @static
 */
toxi.Interpolation2D = {};
/**
 * @param {Number} x
 *            x coord of point to filter (or Vec2D p)
 * @param {Number} y
 *            y coord of point to filter (or Vec2D p1)
 * @param {Number} x1
 *            x coord of top-left corner (or Vec2D p2)
 * @param {Number} y1
 *            y coord of top-left corner
 * @param {Number} x2
 *            x coord of bottom-right corner
 * @param {Number} y2
 *            y coord of bottom-right corner
 * @param {Number} tl
 *            top-left value
 * @param {Number} tr
 *            top-right value (do not use if first 3 are Vec2D)
 * @param {Number} bl
 *            bottom-left value (do not use if first 3 are Vec2D)
 * @param {Number} br
 *            bottom-right value (do not use if first 3 are Vec2D)
 * @return {Number} interpolated value
 */
toxi.Interpolation2D.bilinear = function(_x, _y, _x1,_y1, _x2, _y2, _tl, _tr, _bl, _br) {
	var x,y,x1,y1,x2,y2,tl,tr,bl,br;
	if(_x instanceof Object) //if the first 3 params are passed in as Vec2Ds
	{
		x = _x.x;
		y = _x.y;
		
		x1 = _y.x;
		y1 = _y.y;
		
		x2 = _x1.x;
		y2 = _x1.y;
		
		tl = _y1;
		tr = _x2;
		bl = _y2;
		br = _tl;
	} else {
		x = _x;
		y = _y;
		x1 = _x1;
		y1 = _y1;
		x2 = _x2;
		y2 = _y2;
		tl = _tl;
		tr = _tr;
		bl = _bl;
		br = _br;
	}
    var denom = 1.0 / ((x2 - x1) * (y2 - y1));
    var dx1 = (x - x1) * denom;
    var dx2 = (x2 - x) * denom;
    var dy1 = y - y1;
    var dy2 = y2 - y;
    return (tl * dx2 * dy2 + tr * dx1 * dy2 + bl * dx2 * dy1 + br* dx1 * dy1);
};

/**
 * @class Implementation of the linear interpolation function
 * 
 * i = a + ( b - a ) * f
 * @member toxi
 */
toxi.LinearInterpolation = function(){};

toxi.LinearInterpolation.prototype = {
	interpolate: function(a, b, f) {
        return a + (b - a) * f;
	}
};

/**
 * @class Initializes the s-curve with default sharpness = 2
 * @member toxi
 */
toxi.SigmoidInterpolation = function(s) {
	if(s === undefined){
		s = 2.0;
	}
	this.setSharpness(s);
};

toxi.SigmoidInterpolation.prototype = {	
	getSharpness: function() {
		return this.sharpness;
	},
	
	interpolate: function(a, b, f) {
	    f = (f * 2 - 1) * this.sharpPremult;
	    f = (1.0 / (1.0 + Math.exp(-f)));
	    return a + (b - a) * f;
	},
	
	setSharpness: function(s) {
	    this.sharpness = s;
	    this.sharpPremult = 5 * s;
	}
};

/**
 * @class Defines a single step/threshold function which returns the min value for all
 * factors &lt; threshold and the max value for all others.
 * @member toxi
 */
toxi.ThresholdInterpolation = function(threshold) {
	this.threshold = threshold;
};

toxi.ThresholdInterpolation.prototype = {
	interpolate: function(a, b, f) {
		return f < this.threshold ? a : b;
	}
};
    
    
/**
 * @class This class provides an adjustable zoom lens to either bundle or dilate values
 * around a focal point within a given interval. For a example use cases, please
 * have a look at the provided ScaleMapDataViz and ZoomLens examples.
 * @member toxi
 */
toxi.ZoomLensInterpolation = function(lensPos, lensStrength) {
	this.leftImpl = new toxi.CircularInterpolation();
	this.rightImpl = new toxi.CircularInterpolation();
	this.lensPos = lensPos || 0.5;
	this.lensStrength = lensStrength || 1;
	this.absStrength = Math.abs(this.lensStrength);
	this.leftImpl.setFlipped(this.lensStrength > 0);
	this.rightImpl.setFlipped(this.lensStrength < 0);
};

toxi.ZoomLensInterpolation.prototype = {
	interpolate: function(min,max,t) {
	    var val = min + (max - min) * t;
	    if (t < this.lensPos) {
	        val += (this.leftImpl.interpolate(min, min + (max - min) * this.lensPos, t/ this.lensPos) - val)* this.absStrength;
	    } else {
	        val += (this.rightImpl.interpolate(min + (max - min) * this.lensPos, max,(t - this.lensPos) / (1 - this.lensPos)) - val) * this.absStrength;
	    }
	    return val;
	},
	
	setLensPos: function(pos, smooth) {
	    this.lensPos += (toxi.MathUtils.clipNormalized(pos) - this.lensPos) * smooth;
	},
	
	setLensStrength: function(str, smooth) {
	    this.lensStrength += (toxi.MathUtils.clip(str, -1, 1) - this.lensStrength) * smooth;
	    this.absStrength = toxi.MathUtils.abs(this.lensStrength);
	    this.leftImpl.setFlipped(this.lensStrength > 0);
	    this.rightImpl.setFlipped(this.lensStrength < 0);
	}
};
(function(){

    var _Range = function(min,max){
    	this.min = min;
    	this.max = max;
    };
    _Range.prototype.toString = function(){
    	return "{ min: "+this.min+ ", max: "+this.max+"}";
    };


    /**
     * @class This class maps values from one interval into another. By default the mapping
     * is using linear projection, but can be changed by using alternative
     * {@link toxi.math.InterpolateStrategy} implementations to achieve a
     * non-regular mapping.
     *
     * @member toxi
     *
     * @description Creates a new instance to map values between the 2 number ranges
     * specified. By default linear projection is used.
     * @param {Number} minIn
     * @param {Number} maxIn
     * @param {Number} minOut
     * @param {Number} maxOut
     */ 
    toxi.ScaleMap = function(minIn, maxIn, minOut, maxOut) {
    	if(arguments.length == 1 && arguments[0].input !== undefined && arguments[0].output !== undefined){ //opts object
    		var arg = arguments[0];
    		minOut = arg.output.min;
    		maxOut = arg.output.max;
            maxIn = arg.input.max;
            minIn = arg.input.min;
    	}
    	this.mapFunction = new toxi.LinearInterpolation();
    	this.setInputRange(minIn, maxIn);
    	this.setOutputRange(minOut, maxOut);
    };


    toxi.ScaleMap.prototype = {
    	
        /**
         * Computes mapped value in the target interval and ensures the input value
         * is clipped to source interval.
         * 
         * @param val
         * @return mapped value
         */
       getClippedValueFor: function(val) {
            var t = toxi.MathUtils.clipNormalized( ((val - this._in.min) / this._interval));
            return this.mapFunction.interpolate(0, this.mapRange, t) + this._out.min;
        },

        /**
         * @return the middle value of the input range.
         */
        getInputMedian: function() {
            return (this._in.min + this._in.max) * 0.5;
        },

        /**
         * @return the in
         */
        getInputRange: function() {
            return this._in;
        },

        /**
         * @return the mapped middle value of the output range. Depending on the
         *         mapping function used, this value might be different to the one
         *         returned by {@link #getOutputMedian()}.
         */
        getMappedMedian: function() {
            return this.getMappedValueFor(0.5);
        },

        /**
         * Computes mapped value in the target interval. Does check if input value
         * is outside the input range.
         * 
         * @param val
         * @return mapped value
         */
        getMappedValueFor: function(val) {
            var t = ((val - this._in.min) / this._interval);
            return this.mapFunction.interpolate(0,  this.mapRange, t) + this._out.min;
        },

        /**
         * @return the middle value of the output range
         */
        getOutputMedian:function() {
            return (this._out.min + this._out.max) * 0.5;
        },

        /**
         * @return the output range
         */
        getOutputRange: function() {
            return this._out;
        },

        /**
         * Sets new minimum & maximum values for the input range
         * 
         * @param min
         * @param max
         */
        setInputRange: function(min,max) {
            this._in = new _Range(min,max);
            this._interval = max - min;
        },

        /**
         * Overrides the mapping function used for the scale conversion.
         * 
         * @param func
         *            interpolate strategy implementation
         */
        setMapFunction: function(func) {
            this.mapFunction = func;
        },

        /**
         * Sets new minimum & maximum values for the output/target range
         * 
         * @param min
         *            new min output value
         * @param max
         *            new max output value
         */
        setOutputRange: function(min, max) {
            this._out = new _Range(min, max);
            this.mapRange = max - min;
        },
        
        toString: function(){
    		return "toxi.ScaleMap, inputRange: "+this._in.toString() + " outputRange: "+this._out.toString();
        }
    };
}());/**
 * @class Abstract wave oscillator type which needs to be subclassed to implement
 * different waveforms. Please note that the frequency unit is radians, but
 * conversion methods to & from Hertz ({@link #hertzToRadians(float, float)})
 * are included in this base class.
 * @member toxi
 */
toxi.AbstractWave = function(phase,freq,amp,offset){
	if(phase !== undefined || freq !== undefined || amp !== undefined || offset !== undefined){
		this.setPhase(phase);
		this.frequency = freq;
		if(amp === undefined)amp = 1;
		if(offset === undefined)offset = 1;
		this.amp = amp;
		this.offset = offset;
	}
};



toxi.AbstractWave.prototype = {
	/**
     * Ensures phase remains in the 0...TWO_PI interval.
     * @param {Number} freq
     *            normalized progress frequency
     * @return {Number} current phase
     */
	cyclePhase: function(freq){
		if(freq === undefined)freq = 0;
		this.phase = (this.phase + freq) % toxi.AbstractWave.TWO_PI;
		if(this.phase < 0){
			this.phase += toxi.AbstractWave.TWO_PI;
		}
		return this.phase;
	},
	
	getClass: function(){
		return "toxi.AbstractWave";
	},
	
	pop: function() {
        if (this.stateStack === undefined || (this.stateStack !== undefined && this.stateStack.length <= 0)) {
            //throw new Error("no wave states on stack");
			console.log(this.toString());
			console.log("no wave states on stack");
        }
		else{
			var s = this.stateStack.pop();
			this.phase = s.phase;
			this.frequency = s.frequency;
			this.amp = s.amp;
		this.offset = s.offset;
		}
    },

	push: function() {
        if (this.stateStack === undefined) {
            this.stateStack = [];
        }
        this.stateStack.push(new toxi.WaveState(this.phase, this.frequency, this.amp, this.offset));
    },
	
	reset: function() {
        this.phase = this.origPhase;
    },

	setPhase: function(phase) {
        this.phase = phase;
        this.cyclePhase();
        this.origPhase = phase;
    },

	toString: function(){
		return this.getClass()+" phase:" + this.phase+ " frequency: "+this.frequency+" amp: "+this.amp+ " offset: "+this.offset;
	},
	
	update:function(){
		console.log(this.getClass()+ " this should be overridden");
	}
	
};

toxi.AbstractWave.PI = 3.14159265358979323846;
toxi.AbstractWave.TWO_PI = 2 * toxi.AbstractWave.PI;


/**
 * Converts a frequency in Hertz into radians.
 * 
 * @param hz
 *            frequency to convert (in Hz)
 * @param sampleRate
 *            sampling rate in Hz (equals period length @ 1 Hz)
 * @return frequency in radians
 */
toxi.AbstractWave.hertzToRadians = function(hz,sampleRate) {
        return hz / sampleRate * toxi.AbstractWave.TWO_PI;
};

/**
 * Converts a frequency from radians to Hertz.
 * 
 * @param f
 *            frequency in radians
 * @param sampleRate
 *            sampling rate in Hz (equals period length @ 1 Hz)
 * @return freq in Hz
 */
toxi.AbstractWave.radiansToHertz = function(f,sampleRate) {
    return f / toxi.AbstractWave.TWO_PI * sampleRate;
};




/**
 * @class
 * @member toxi
 * @augments toxi.AbstractWave
 */
toxi.AMFMSineWave = function(a,b,c,d,e){
	if(typeof c == "number"){
		toxi.AbstractWave.apply(this,[a,b,1,c]);
		this.amod = d;
		this.fmod = e;
	} else{
		toxi.AbstractWave.apply(this,[a,b]);
		this.amod = c;
		this.fmod = d;
	}
};

toxi.extend(toxi.AMFMSineWave,toxi.AbstractWave);

toxi.AMFMSineWave.prototype.getClass = function(){
	return "AMFMSineWave";
};

toxi.AMFMSineWave.prototype.pop = function(){
	this.parent.pop.call(this);
	this.amod.pop();
	this.fmod.pop();
};

toxi.AMFMSineWave.prototype.push = function() {
    this.parent.push.call(this);
    this.amod.push();
    this.fmod.push();
};

/**
 * Resets this wave and its modulating waves as well.
 * 
 * @see toxi.math.waves.AbstractWave#reset()
 */
toxi.AMFMSineWave.prototype.reset = function(){
	this.parent.reset.call(this);
	this.fmod.reset();
	this.amod.reset();
};

/**
 * @class Progresses the wave and updates the result value. You must NEVER call the
 * update() method on the 2 modulating wave since this is handled
 * automatically by this method.
  * @augments toxi.AbstractWave
 * @member toxi
 * @see toxi.math.waves.AbstractWave#update()
 */
toxi.AMFMSineWave.prototype.update = function() {
    this.amp = this.amod.update();
    this.value = this.amp * Math.sin(this.phase) + this.offset;
    this.cyclePhase(this.frequency + this.fmod.update());
    return this.value;
};


/**
 * @class
 * member toxi
 * @augments toxi.AbstractWave
 */
toxi.ConstantWave = function(value) {
	 toxi.AbstractWave.apply(this);
	 this.value = value;
};

toxi.extend(toxi.ConstantWave,toxi.AbstractWave);

toxi.ConstantWave.prototype.getClass = function(){
	return "ConstantWave";
};

toxi.ConstantWave.prototype.update = function() {
	return this.value;
};






/**
 * @class
 * <p>
 * Frequency modulated <strong>bandwidth-limited</strong> square wave using a
 * fourier series of harmonics. Also uses a secondary wave to modulate the
 * frequency of the main wave.
 * </p>
 * 
 * <p>
 * <strong>Note:</strong> You must NEVER call the update() method on the
 * modulating wave.
 * </p>
 * @member toxi
 * @augments toxi.AbstractWave
 */
toxi.FMHarmonicSquareWave = function(a,b,c,d,e) {
	this.maxHarmonics = 3;
	if(typeof c == "number"){
		if(e === undefined){
			e = new toxi.ConstantWave(0);
		}
		toxi.AbstractWave.apply(this,[a,b,c,d]);
		this.fmod = e;
	} else{
		toxi.AbstractWave.apply(this,[a,b]);
		this.fmod = c;
	}
};

toxi.extend(toxi.FMHarmonicSquareWave,toxi.AbstractWave);

toxi.FMHarmonicSquareWave.prototype.getClass = function(){
	return "FMHarmonicSquareWave";
};

toxi.FMHarmonicSquareWave.prototype.pop = function() {
	this.parent.pop.call(this);
    this.fmod.pop();
};

toxi.FMHarmonicSquareWave.prototype.push = function() {
    this.parent.push.call(this);
    this.fmod.push();
};

toxi.FMHarmonicSquareWave.prototype.reset = function() {
    this.parent.reset.call(this);
    this.fmod.reset();
};

/**
 * @class Progresses the wave and updates the result value. You must NEVER call the
 * update() method on the modulating wave since this is handled
 * automatically by this method.
 * 
 * @see toxi.math.waves.AbstractWave#update()
 * @member toxi
 * @augments toxi.AbstractWave
 */
toxi.FMHarmonicSquareWave.prototype.update = function() {
    this.value = 0;
    for (var i = 1; i <= this.maxHarmonics; i += 2) {
        this.value += 1.0 / i *  Math.sin(i * this.phase);
    }
    this.value *= this.amp;
    this.value += this.offset;
    this.cyclePhase(this.frequency + this.fmod.update());
    return this.value;
};

/**
 * @class
 * member toxi
 * @augments toxi.AbstractWave
 */
toxi.FMSawtoothWave = function(a,b,c,d,e){
	if(typeof c == "number") {
		toxi.AbstractWave.apply(this,[a,b,c,d]);
		this.fmod = e;
	} else {
		toxi.AbstractWave.apply(this,[a,b]);
		this.fmod = c;
	}
};

toxi.extend(toxi.FMSawtoothWave,toxi.AbstractWave);

toxi.FMSawtoothWave.prototype.getClass = function(){
	return "FMSawtoothWave";
};


toxi.FMSawtoothWave.prototype.pop = function(){
	this.parent.pop.call(this);
	this.fmod.pop();
};


toxi.FMSawtoothWave.prototype.push = function(){
	this.parent.push.call(this);
	this.fmod.push();
};


toxi.FMSawtoothWave.prototype.reset = function(){
	this.parent.reset.call(this);
	this.fmod.reset();
};


toxi.FMSawtoothWave.prototype.update = function(){
	this.value = ((this.phase / toxi.AbstractWave.TWO_PI)*2 - 1) * this.amp + this.offset;
	this.cyclePhase(this.frequency + this.fmod.update());
	return this.value;
};


/**
 * @class
 * member toxi
 * @augments toxi.AbstractWave
 */
toxi.FMSineWave = function(a,b,c,d,e){
	if(typeof(c) == "number"){
		toxi.AbstractWave.apply(this,[a,b,c,d]);
		this.fmod = e;
	}else{
		toxi.AbstractWave.apply(this,[a,b]);
		this.fmod = c;
	}
};

toxi.extend(toxi.FMSineWave,toxi.AbstractWave);

toxi.FMSineWave.prototype.getClass = function(){
	return "FMSineWave";
};

toxi.FMSineWave.prototype.pop = function(){
	this.parent.pop.call(this);
	this.fmod.pop();
};

toxi.FMSineWave.prototype.push = function(){
	this.parent.push.call(this);
	this.fmod.push();
};

toxi.FMSineWave.prototype.reset = function(){
	this.parent.reset.call(this);
	this.fmod.reset();
};

toxi.FMSineWave.prototype.update = function(){
	this.value = (Math.sin(this.phase)*this.amp) + this.offset;
	this.cyclePhase(this.frequency + this.fmod.update());
	return this.value;
};


/**
 * @class
 * member toxi
 * @augments toxi.AbstractWave
 */
toxi.FMSquareWave = function(a,b,c,d,e)
{
	if(typeof c == "number"){
		if(e === undefined){
			toxi.AbstractWave.apply(this,[a,b,c,d, new toxi.ConstantWave(0)]);
		} else {
			toxi.AbstractWave.apply(this,[a,b,c,d]);
			this.fmod = e;
		}
	} else {
		toxi.AbstractWave.apply(this,[a,b]);
		this.fmod = c;
	}
};

toxi.extend(toxi.FMSquareWave,toxi.AbstractWave);

toxi.FMSquareWave.prototype.getClass = function(){
	return "FMSquareWave";
};

toxi.FMSquareWave.prototype.pop = function(){		
	this.parent.pop.call(this);
	this.fmod.pop();
};

toxi.FMSquareWave.prototype.push = function(){
	this.parent.push.call(this);
	this.fmod.push();
};

toxi.FMSquareWave.prototype.reset = function(){
	this.parent.reset.call(this);
	this.fmod.reset();
};

toxi.FMSquareWave.prototype.update = function(){
	this.value = (this.phase / toxi.AbstractWave.TWO_PI < 0.5 ? 1 : -1)*this.amp + this.offset;
	this.cyclePhase(this.frequency + this.fmod.update());
	return this.value;
};


/**
 * @class
 * member toxi
 * @augments toxi.AbstractWave
 */
toxi.FMTriangleWave = function(a,b,c,d,e){
	if(typeof c == "number"){
		if(e !== undefined){
			toxi.AbstractWave.apply(this,[a,b,c,d]);
			this.fmod = e;
		} else {
			toxi.AbstractWave.apply(this,[a,b,c,d, new toxi.ConstantWave(0)]);
		}
	} else {
		toxi.AbstractWave.apply(this,[a,b,1,0]);
	}
};

toxi.extend(toxi.FMTriangleWave,toxi.AbstractWave);

toxi.FMTriangleWave.prototype.getClass = function(){
	return "FMTriangleWave";
};

toxi.FMTriangleWave.prototype.pop = function(){
	this.parent.pop.call(this);
	this.fmod.pop();
};

toxi.FMTriangleWave.prototype.push = function(){
	this.parent.push.call(this);
	this.fmod.push();
};

toxi.FMTriangleWave.prototype.reset = function(){
	this.parent.reset.call(this);
	this.fmod.reset();
};

toxi.FMTriangleWave.prototype.update = function(){
	this.value = 2 * this.amp * (Math.abs(toxi.AbstractWave.PI - this.phase) * toxi.MathUtils.INV_PI - 0.5) + this.offset;
	this.cyclePhase(this.frequency + this.fmod.update());
	return this.value;
};

/**
 * @class
 * member toxi
 * @augments toxi.AbstractWave
 * @param {Number} [phase] phase
 * @param {Number} [freq] frequency
 * @param {Number} [amp] amplitude
 * @param {Number} [offset] offset
 */
toxi.SineWave = function(phase,freq,amp,offset) {
   toxi.AbstractWave.apply(this,[phase,freq,amp,offset]);
};

toxi.extend(toxi.SineWave,toxi.AbstractWave);

toxi.SineWave.prototype.getClass = function(){
	return "SineWave";
};

toxi.SineWave.prototype.pop = function(){		
	this.parent.pop.call(this);
};

toxi.SineWave.prototype.push = function(){
	this.parent.push.call(this);
};

toxi.SineWave.prototype.update = function() {
   this.value = (Math.sin(this.phase) * this.amp) + this.offset;
   this.cyclePhase(this.frequency);
   return this.value;
};
	

/**
 * @class
 * member toxi
 */
toxi.WaveState = function(phase,frequency,amp,offset){
	this.phase = phase;
	this.frequency = frequency;
	this.amp = amp;
	this.offset = offset;
};
/**
 * @class Lookup table for fast sine & cosine computations. Tables with varying
 * precisions can be created to which input angles will be rounded to. The
 * sin/cos methods can be used with both positive and negative input angles as
 * with the normal Math.sin()/Math.cos() versions.
 * @member toxi
 */
toxi.SinCosLUT = function(precision) {
    if(!precision){
        precision = toxi.SinCosLUT.DEFAULT_PRECISION;
    }
	this.precision = precision;
	this.period = 360/this.precision;
	this.quadrant = this.period >> 2;
	this.deg2rad = (Math.PI / 180.0) * this.precision;
	this.rad2deg = (180.0 / Math.PI) / this.precision;
	this.sinLUT = [];
	for(var i=0;i< this.period;i++){
		this.sinLUT[i] = Math.sin(i*this.deg2rad);
	}
};


toxi.SinCosLUT.prototype = {
	
	/**
     * Calculate cosine for the passed in angle in radians.
     * 
     * @param theta
     * @return cosine value for theta
     */
    cos: function(theta) {
        while (theta < 0) {
            theta += toxi.MathUtils.TWO_PI;
        }
        return this.sinLUT[((theta * this.rad2deg) + this.quadrant) % this.period];
    },

    getPeriod: function() {
        return this.period;
    },

    getPrecision: function() {
        return this.precision;
    },

    getSinLUT: function() {
        return this.sinLUT;
    },

    /**
     * Calculates sine for the passed angle in radians.
     * 
     * @param theta
     * @return sine value for theta
     */
    sin: function(theta) {
        while (theta < 0) {
            theta += toxi.MathUtils.TWO_PI;
        }
        return this.sinLUT[(theta * this.rad2deg) % this.period];
    }
};


toxi.SinCosLUT.DEFAULT_PRECISION = 0.25;
toxi.SinCosLUT.DEFAULT_INSTANCE = undefined;
toxi.SinCosLUT.getDefaultInstance = function(){
	if(toxi.SinCosLUT.DEFAULT_INSTANCE === undefined){
		toxi.SinCosLUT.DEFAULT_INSTANCE = new toxi.SinCosLUT();
	}
	return toxi.SinCosLUT.DEFAULT_INSTANCE;
};/**
 * @class
 * @member toxi
 */
toxi.UnitTranslator = {
	//Number of millimeters per inch
	INCH_MM: 25.4,
	//number of points per inch
	POINT_POSTSCRIPT: 72.0,
	/**
	* Converts millimeters into pixels.
	* @param {Number} mm millimeters
	* @param {Number} dpi DPI resolution
	* @return {Number} number of pixels
	*/
	millisToPixels: function(mm,dpi){
		return Math.floor(mm / this.INCH_MM * dpi);
	},
	/**
	* Converts millimeters into postscript points
	* @param {Number} mm millimeters
	* @return {Number} number of points
	*/
	millisToPoints: function(mm){
		return mm / this.INCH_MM * this.POINT_POSTSCRIPT;
	},
	/**
	* Converts pixels into inches
	* @param {Nuumber} pix pixels
	* @param {Number} dpi DPI resolution to use
	* @return {Number} number of inches
	*/
	pixelsToInch: function(pix,dpi){
		return pix / dpi;
	},
	/**
	* Converts pixels into millimeters.
	* @param {Number} pix pixels
	* @param {Number} dpi DPI resolution
	* @return {Number} number of millimeters
	*/
	pixelsToMillis: function(pix,dpi){
		return this.pixelsToInch(pix,dpi) * this.INCH_MM;
	},
	/**
	* Converts pixels into points.
	* @param {Number} pix pixels
	* @param {Number} dpi DPI resolution
	* @return {Number} number of points
	*/
	pixelsToPoints: function(pix,dpi){
		return this.pixelsToInch(pix,dpi) * this.POINT_POSTSCRIPT;
	},
	/**
	* Converts points into millimeters.
	* @param {Number} pt
	* @return {Number} number of millimeters
	*/
	pointsToMillis: function(pt){
		return pt / this.POINT_POSTSCRIPT * this.INCH_MM;
	},
	/**
	* Converts points into pixels.
	* 
	* @param {Number} pt points
	* @param {Number} dpi DPI resolution
	* @return {Number} number of pixels
	*/
	pointsToPixels: function(pt, dpi){
		return this.millisToPixels(this.pointsToMillis(pt), dpi);
	},
	/**
	* Converts an area measure in square inch to square millimeters.
	* @param {Number} area
	* @return {Number} square mm
	*/
	squareInchToMillis: function(area){
		return area * this.INCH_MM * this.INCH_MM;
	},
	/**
	* Converts an area measure in points to square inch.
	* @param {Number} area
	* @return {Number} square inch
	*/
	squarePointsToInch: function(area){
		return area / (this.POINT_POSTSCRIPT * this.POINTPOSCRIPT);
	},
	/**
	* Converts an area measure in points to square millimeters.
	* @param {Number} area
	* @return {Number} square mm
	*/
	squarePointsToMillis: function(area){
		return this.squareInchToMillis(this.squarePointsToInch(area));
	}	
};(function(){
	

	//Using David Bau's seedrandom.js for PerlinNoise#noiseSeed functionality

	// seedrandom.js version 2.0.
	// Author: David Bau 4/2/2011
	//
	// Defines a method Math.seedrandom() that, when called, substitutes
	// an explicitly seeded RC4-based algorithm for Math.random().  Also
	// supports automatic seeding from local or network sources of entropy.
	//
	// Usage:
	//
	//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
	//
	//   Math.seedrandom('yipee'); Sets Math.random to a function that is
	//                             initialized using the given explicit seed.
	//
	//   Math.seedrandom();        Sets Math.random to a function that is
	//                             seeded using the current time, dom state,
	//                             and other accumulated local entropy.
	//                             The generated seed string is returned.
	//
	//   Math.seedrandom('yowza', true);
	//                             Seeds using the given explicit seed mixed
	//                             together with accumulated entropy.
	//
	//   <script src="http://bit.ly/srandom-512"></script>
	//                             Seeds using physical random bits downloaded
	//                             from random.org.
	//
	//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
	//   </script>                 Seeds using urandom bits from call.jsonlib.com,
	//                             which is faster than random.org.
	//
	// Examples:
	//
	//   Math.seedrandom("hello");            // Use "hello" as the seed.
	//   document.write(Math.random());       // Always 0.5463663768140734
	//   document.write(Math.random());       // Always 0.43973793770592234
	//   var rng1 = Math.random;              // Remember the current prng.
	//
	//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
	//   document.write(Math.random());       // Pretty much unpredictable.
	//
	//   Math.random = rng1;                  // Continue "hello" prng sequence.
	//   document.write(Math.random());       // Always 0.554769432473455
	//
	//   Math.seedrandom(autoseed);           // Restart at the previous seed.
	//   document.write(Math.random());       // Repeat the 'unpredictable' value.
	//
	// Notes:
	//
	// Each time seedrandom('arg') is called, entropy from the passed seed
	// is accumulated in a pool to help generate future seeds for the
	// zero-argument form of Math.seedrandom, so entropy can be injected over
	// time by calling seedrandom with explicit data repeatedly.
	//
	// On speed - This javascript implementation of Math.random() is about
	// 3-10x slower than the built-in Math.random() because it is not native
	// code, but this is typically fast enough anyway.  Seeding is more expensive,
	// especially if you use auto-seeding.  Some details (timings on Chrome 4):
	//
	// Our Math.random()            - avg less than 0.002 milliseconds per call
	// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
	// seedrandom('explicit', true) - avg less than 2 milliseconds per call
	// seedrandom()                 - avg about 38 milliseconds per call
	//
	// LICENSE (BSD):
	//
	// Copyright 2010 David Bau, all rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions are met:
	// 
	//   1. Redistributions of source code must retain the above copyright
	//      notice, this list of conditions and the following disclaimer.
	//
	//   2. Redistributions in binary form must reproduce the above copyright
	//      notice, this list of conditions and the following disclaimer in the
	//      documentation and/or other materials provided with the distribution.
	// 
	//   3. Neither the name of this module nor the names of its contributors may
	//      be used to endorse or promote products derived from this software
	//      without specific prior written permission.
	// 
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	/**
	 * All code is in an anonymous closure to keep the global namespace clean.
	 *
	 * @param {number=} overflow 
	 * @param {number=} startdenom
	 */

	 var internalMath = {};
	 internalMath.pow = Math.pow; //used by seed generator
	 internalMath.random = Math.random; //start with the default random generator
	(function (pool, math, width, chunks, significance, overflow, startdenom) {


	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	math['seedrandom'] = function seedrandom(seed, use_entropy) {
	  var key = [];
	  var arc4;

	  // Flatten the seed string or build one from local entropy if needed.
	  seed = mixkey(flatten(
	    use_entropy ? [seed, pool] :
	    arguments.length ? seed :
	    [new Date().getTime(), pool, window], 3), key);

	  // Use the seed to initialize an ARC4 generator.
	  arc4 = new ARC4(key);

	  // Mix the randomness into accumulated entropy.
	  mixkey(arc4.S, pool);

	  // Override Math.random

	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.

	  math['random'] = function random() {  // Closure to return a random double:
	    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
	    var d = startdenom;                 //   and denominator d = 2 ^ 48.
	    var x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };

	  // Return the seed that was used
	  return seed;
	};

	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	/** @constructor */
	function ARC4(key) {
	  var t, u, me = this, keylen = key.length;
	  var i = 0, j = me.i = me.j = me.m = 0;
	  me.S = [];
	  me.c = [];

	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }

	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) { me.S[i] = i++; }
	  for (i = 0; i < width; i++) {
	    t = me.S[i];
	    j = lowbits(j + t + key[i % keylen]);
	    u = me.S[j];
	    me.S[i] = u;
	    me.S[j] = t;
	  }

	  // The "g" method returns the next (count) outputs as one number.
	  me.g = function getnext(count) {
	    var s = me.S;
	    var i = lowbits(me.i + 1); var t = s[i];
	    var j = lowbits(me.j + t); var u = s[j];
	    s[i] = u;
	    s[j] = t;
	    var r = s[lowbits(t + u)];
	    while (--count) {
	      i = lowbits(i + 1); t = s[i];
	      j = lowbits(j + t); u = s[j];
	      s[i] = u;
	      s[j] = t;
	      r = r * width + s[lowbits(t + u)];
	    }
	    me.i = i;
	    me.j = j;
	    return r;
	  };
	  // For robust unpredictability discard an initial batch of values.
	  // See http://www.rsa.com/rsalabs/node.asp?id=2009
	  me.g(width);
	}

	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	/** @param {Object=} result 
	  * @param {string=} prop
	  * @param {string=} typ 
	*/
	function flatten(obj, depth, result, prop, typ) {
	  result = [];
	  typ = typeof(obj);
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
	        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	      }
	    }
	  }
	  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
	}

	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	/** @param {number=} smear 
	  * @param {number=} j */
	function mixkey(seed, key, smear, j) {
	  seed += '';                         // Ensure the seed is a string
	  smear = 0;
	  for (j = 0; j < seed.length; j++) {
	    key[lowbits(j)] =
	      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
	  }
	  seed = '';
	  for (j in key) { seed += String.fromCharCode(key[j]); }
	  return seed;
	}

	//
	// lowbits()
	// A quick "n mod width" for width a power of 2.
	//
	function lowbits(n) { return n & (width - 1); }

	//
	// The following constants are related to IEEE 754 limits.
	//
	startdenom = math.pow(width, chunks);
	significance = math.pow(2, significance);
	overflow = significance * 2;

	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to intefere with determinstic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);

	// End anonymous scope, and pass initial values.
	})(
	  [],   // pool: entropy pool starts empty
	  internalMath, // math: package containing random, pow, and seedrandom
	  256,  // width: each RC4 output is 0 <= x < 256
	  6,    // chunks: at least six RC4 outputs for each double
	  52    // significance: there are 52 significant digits in a double
	);
	//end seed



	// ////////////////////////////////////////////////////////////
	// PERLIN NOISE taken from the
	// [toxi 040903]
	// octaves and amplitude amount per octave are now user controlled
	// via the noiseDetail() function.
	// [toxi 030902]
	// cleaned up code and now using bagel's cosine table to speed up
	// [toxi 030901]
	// implementation by the german demo group farbrausch
	// as used in their demo "art": http://www.farb-rausch.de/fr010src.zip
	var PERLIN_YWRAPB = 4,
		PERLIN_YWRAP = 1 << PERLIN_YWRAPB,
		PERLIN_ZWRAPB = 8,
		PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB,
		PERLIN_SIZE = 4095,
		PERLIN_MIN_AMPLITUDE = 0.001;
	var	_noise_fsc = function(self, i){
			var index = ((i + 0.5) * self._perlin_PI) % self._perlin_TWOPI;
			return 0.5 * (1.0 - self._perlin_cosTable[index]);
		};

	/**
	 * @class
	 * @member toxi
	 */
	var	PerlinNoise = function(){
		this._perlin_octaves = 4; // default to medium smooth
		this._perlin_amp_falloff = 0.5; // 50% reduction/octave
	};

	PerlinNoise.prototype = {
		/**
		 noise
		 @param [x=0] x is optional
		 @param [y=0] y is optional
		 @param [z=0] z is optional
		 */
		noise: function(x,y,z){
			var i = 0,
				x = x || 0,
				y = y || 0,
				z = z || 0;

			if(!this._perlin){
				this._perlin = [];
				var length = PERLIN_SIZE - 1;
				for(i = 0;i < PERLIN_SIZE + 1; i++){
					this._perlin[i] = internalMath.random();
				}
			}

			this._perlin_cosTable = toxi.SinCosLUT.getDefaultInstance().getSinLUT();
			this._perlin_TWOPI = this._perlin_PI = toxi.SinCosLUT.getDefaultInstance().getPeriod();
			this._perlin_PI >>= 1;

			if (x < 0) {
				x = -x;
			}
			if (y < 0) {
				y = -y;
			}
			if (z < 0) {
				z = -z;
			}
			
			var xi = x, 
				yi = y,
				zi = z,
				xf = (x - xi),
				yf = (y - yi),
				zf = (z - zi),
				rxf, 
				ryf,
				r = 0,
				ampl = 0.5,
				n1, 
				n2, 
				n3,
				of;
			for(i = 0; i < this._perlin_octaves; i++){
				of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
				rxf = _noise_fsc(this,xf);
				ryf = _noise_fsc(this,yf);

				n1 = this._perlin[of & PERLIN_SIZE];
				n1 += rxf * (this._perlin[(of + 1) & PERLIN_SIZE] - n1);
				n2 = this._perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
				n2 += rxf * (this._perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
				n1 += ryf * (n2 - n1);

				of += PERLIN_ZWRAP;
				n2 = this._perlin[of & PERLIN_SIZE];
				n2 += rxf * (this._perlin[(of + 1) & PERLIN_SIZE] - n2);
				n3 = this._perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
				n3 += rxf * (this._perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
				n2 += ryf * (n3 - n2);

				n1 += _noise_fsc(this,zf) * (n2 - n1);
				
				r += n1 * ampl;
				ampl *= this._perlin_amp_falloff;

				// break if amp has no more impact
				if (ampl < PERLIN_MIN_AMPLITUDE) {
					break;
				}

				xi <<= 1;
				xf *= 2;
				yi <<= 1;
				yf *= 2;
				zi <<= 1;
				zf *= 2;

				if (xf >= 1.0) {
					xi++;
					xf--;
				}
				if (yf >= 1.0) {
					yi++;
					yf--;
				}
				if (zf >= 1.0) {
					zi++;
					zf--;
				}
			}
			return r;
		},
		/**
		 @param {Number} lod
		 @param {Number} falloff
		 */
		noiseDetail: function(lod, falloff){
			if(lod > 0){
				this._perlin_octaves = lod;
			}
			if(falloff && falloff > 0){
				this._perlin_amp_falloff = falloff;
			}
		},
		/**
		 @param {Number} [what] the random seed
		 */
		noiseSeed: function(what){
			internalMath.seedrandom(what);
		}
	};

	toxi.PerlinNoise = PerlinNoise;
})();(function() {
	/**
	*Simplex Noise in 2D, 3D and 4D. Based on the example code of this paper:
	*http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
	* 
	*@author Stefan Gustavson, Linkping University, Sweden (stegu at itn dot liu
	*         dot se)
	* 
	*Slight optimizations & restructuring by
	*@author Karsten Schmidt (info at toxi dot co dot uk)
	* 
	*ported to javascript by
	*@author Kyle Phillips (kyle at haptic-data dot com)
	*/
	var numFrame = 0;

	var _SQRT3 = Math.sqrt(3.0),
		_SQRT5 = Math.sqrt(5.0);

	/**
	 * Skewing and unskewing factors for 2D, 3D and 4D, some of them
	 * pre-multiplied.
	 */
	var	_F2 = 0.5 * (_SQRT3 - 1.0),
		_G2 = (3.0 - _SQRT3) / 6.0,
		_G22 = _G2 * 2.0 - 1,

		_F3 = 1.0 / 3.0,
		_G3 = 1.0 / 6.0,

		_F4 = (_SQRT5 - 1.0) / 4.0,
		_G4 = (5.0 - _SQRT5) / 20.0,
		_G42 = _G4 * 2.0,
		_G43 = _G4 * 3.0,
		_G44 = _G4 * 4.0 - 1.0;


		/**
		 * Gradient vectors for 3D (pointing to mid points of all edges of a unit
		 * cube)
		 */
	var	_grad3 = [
			new Int32Array([1, 1, 0 ]), 
			new Int32Array([ -1, 1, 0 ]),
			new Int32Array([ 1, -1, 0 ]), 
			new Int32Array([ -1, -1, 0 ]), 
			new Int32Array([ 1, 0, 1 ]), 
			new Int32Array([ -1, 0, 1 ]),
			new Int32Array([ 1, 0, -1 ]), 
			new Int32Array([ -1, 0, -1 ]), 
			new Int32Array([0, 1, 1 ]), 
			new Int32Array([0, -1, 1 ]),
			new Int32Array([ 0, 1, -1 ]), 
			new Int32Array([ 0, -1, -1 ])
		];

		/**
		 * Gradient vectors for 4D (pointing to mid points of all edges of a unit 4D
		 * hypercube)
		 */
	var	_grad4 = [
			new Int32Array([ 0, 1, 1, 1 ]), 
			new Int32Array([ 0, 1, 1, -1 ]),
			new Int32Array([ 0, 1, -1, 1 ]), 
			new Int32Array([ 0, 1, -1, -1 ]), 
			new Int32Array([ 0, -1, 1, 1 ]),
			new Int32Array([ 0, -1, 1, -1 ]), 
			new Int32Array([ 0, -1, -1, 1 ]), 
			new Int32Array([ 0, -1, -1, -1 ]),
			new Int32Array([ 1, 0, 1, 1 ]), 
			new Int32Array([ 1, 0, 1, -1 ]), 
			new Int32Array([ 1, 0, -1, 1 ]), 
			new Int32Array([ 1, 0, -1, -1 ]),
			new Int32Array([ -1, 0, 1, 1 ]), 
			new Int32Array([ -1, 0, 1, -1 ]), 
			new Int32Array([ -1, 0, -1, 1 ]),
			new Int32Array([ -1, 0, -1, -1 ]), 
			new Int32Array([ 1, 1, 0, 1 ]), 
			new Int32Array([ 1, 1, 0, -1 ]),
			new Int32Array([ 1, -1, 0, 1 ]), 
			new Int32Array([ 1, -1, 0, -1 ]), 
			new Int32Array([ -1, 1, 0, 1 ]),
			new Int32Array([ -1, 1, 0, -1 ]), 
			new Int32Array([ -1, -1, 0, 1 ]), 
			new Int32Array([ -1, -1, 0, -1 ]),
			new Int32Array([ 1, 1, 1, 0 ]), 
			new Int32Array([ 1, 1, -1, 0 ]), 
			new Int32Array([ 1, -1, 1, 0 ]), 
			new Int32Array([ 1, -1, -1, 0 ]),
			new Int32Array([ -1, 1, 1, 0 ]), 
			new Int32Array([ -1, 1, -1, 0 ]), 
			new Int32Array([ -1, -1, 1, 0 ]),
			new Int32Array([ -1, -1, -1, 0 ]) 
		];

		/**
		 * Permutation table
		 */
	var	_p = new Int32Array([
			151, 160, 137, 91, 90, 15, 131, 13, 201,
			95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37,
			240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62,
			94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56,
			87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139,
			48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133,
			230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
			63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200,
			196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3,
			64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255,
			82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
			223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153,
			101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79,
			113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242,
			193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249,
			14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204,
			176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222,
			114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180 
		]);

		/**
		 * To remove the need for index wrapping, double the permutation table
		 * length
		 */
	var	_perm = (function(){
			var _per = new Int32Array(0x200);
			for (var i = 0; i < 0x200; i++) {
				_per[i] = _p[i & 0xff];
			}
			return _per;
		})();


		/**
		 * A lookup table to traverse the simplex around a given point in 4D.
		 * Details can be found where this table is used, in the 4D noise method.
		 */
	var	_simplex = [ 
			new Int32Array([ 0, 1, 2, 3 ]), new Int32Array([ 0, 1, 3, 2 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 2, 3, 1 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 1, 2, 3, 0 ]), new Int32Array([ 0, 2, 1, 3 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 3, 1, 2 ]), new Int32Array([ 0, 3, 2, 1 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 1, 3, 2, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 1, 2, 0, 3 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 1, 3, 0, 2 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 2, 3, 0, 1 ]), new Int32Array([ 2, 3, 1, 0 ]), new Int32Array([ 1, 0, 2, 3 ]), new Int32Array([ 1, 0, 3, 2 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 2, 0, 3, 1 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 2, 1, 3, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 2, 0, 1, 3 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 3, 0, 1, 2 ]), new Int32Array([ 3, 0, 2, 1 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 3, 1, 2, 0 ]), new Int32Array([ 2, 1, 0, 3 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 0, 0, 0, 0 ]), new Int32Array([ 3, 1, 0, 2 ]), new Int32Array([ 0, 0, 0, 0 ]),
			new Int32Array([ 3, 2, 0, 1 ]), new Int32Array([ 3, 2, 1, 0 ]) 
		];

		/**
		* Computes dot product in 2D.
		* @param g 2-vector (grid offset)
		* @param {Number} x
		* @param {Number} y
		* @param {Number} z
		* @param {Number} w
		* @return {Number} dot product
		*/
	var	_dot = function(g, x, y, z, w) {
			var n = g[0] * x + g[1] * y;
			if(z){
				n += g[2] * z;
				if(w){
					n += g[3] * w;
				}
			}
			return n;
		};

		/**
		*This method is a *lot* faster than using (int)Math.floor(x).
		* 
		*@param {Number} x value to be floored
		*@return {Number}
		*/
	var	_fastfloor = function(x) {
			return (x >= 0) ? Math.floor(x) : Math.floor(x - 1);
		};


		/**
		 * @class A static Simplex noise class
		 * @static
		 * @member toxi
		 */
	toxi.SimplexNoise = { //SimplexNoise only consists of static methods
		/**
		* Computes 4D Simplex Noise.
		* 
		* @param x coordinate
		* @param y  coordinate
		* @param z coordinate
		* @param w coordinate
		* @return noise value in range -1 ... +1
		*/
		noise: function(x, y, z, w) {
			//Noise contributions from five corners, we may use as few as 3 of them (depending on arguments)
			var numArgs = arguments.length,
				n0 = 0,
				n1 = 0,
				n2 = 0,
				n3 = 0,
				n4 = 0;
				//skew the input space to determin which simplex cell we're in
			var	s = (function(){
					switch(numArgs){
						case 2:
						return (x + y) * _F2; //Hairy factor for 2d
						case 3:
						return (x + y + z) * _F3; //Very nice and simple skew factor for 3d
						case 4:
						return (x + y + z + w) * _F4; //factor for 4d skewing
						default:
						throw new Error("Wrong arguments supplied to toxi.SimplexNoise.noise()");
					}
				})(),
				i = _fastfloor(x + s),
				j = _fastfloor(y + s),
				k = (z !== undefined) ? _fastfloor(z + s) : undefined,
				l = (w !== undefined) ? _fastfloor(w + s) : undefined;
				//unskew
			var	t = (function(){
					switch(numArgs){
						case 2:
						return (i + j) * _G2;
						case 3:
						return (i + j + k) * _G3;
						case 4: 
						return (i + j + k + l) * _G4;
					}
				})(),
				x0 = x - (i - t), //the x,y,z,w distance from the cell origin
				y0 = y - (j - t),
				z0 = (z !== undefined) ? z - (k - t) : undefined,
				w0 = (w !== undefined) ? w - (l - t) : undefined;

				//Determine which simplex we are in
				if(numArgs == 2){
					//for the 2d case, the simplex shape is an equilateral triangle.	
					return (function(){
						var i1, j1, //offsets for scond (middle) corner of simplex (i,j)
							x1, y1,
							x2, y2,
							ii,
							jj,
							t0,
							gi0,
							gi1,
							gi2,
							t2;
						if(x0 > y0){ // lower triangle, XY order
							i1 = 1;
							j1 = 0;
						} else { //upper triangle, YX order
							i1 = 0;
							j1 = 1;
						}

						// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
						// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
						// c = (3-sqrt(3))/6
						x1 = x0 - i1 + _G2; // Offsets for middle corner in (x,y) unskewed
						y1 = y0 - j1 + _G2;
						x2 = x0 + _G22; // Offsets for last corner in (x,y) unskewed
						y2 = y0 + _G22;
						// Work out the hashed gradient indices of the three simplex corners
						ii = i & 0xff;
						jj = j & 0xff;
						// Calculate the contribution from the three corners
						t0 = 0.5 - x0 * x0 - y0 * y0;

						if (t0 > 0) {
							t0 *= t0;
							gi0 = _perm[ii + _perm[jj]] % 12;
							n0 = t0 * t0 * _dot(_grad3[gi0], x0, y0); // (x,y) of grad3 used for
							// 2D gradient
						}
						t1 = 0.5 - x1 * x1 - y1 * y1;
						if (t1 > 0) {
							t1 *= t1;
							gi1 = _perm[ii + i1 + _perm[jj + j1]] % 12;
							n1 = t1 * t1 * _dot(_grad3[gi1], x1, y1);
						}
						t2 = 0.5 - x2 * x2 - y2 * y2;
						if (t2 > 0) {
							t2 *= t2;
							gi2 = _perm[ii + 1 + _perm[jj + 1]] % 12;
							n2 = t2 * t2 * _dot(_grad3[gi2], x2, y2);
						}
						// Add contributions from each corner to get the final noise value.
						// The result is scaled to return values in the interval [-1,1].
						return 70.0 * (n0 + n1 + n2);
					})();
				} else if(numArgs == 3){
					//for the 3d case, the simplex shape is a slightly irregular tetrahedron
					return (function(){
						var i1, j1, k1, // Offsets for second corner of simplex in (i,j,k)
							// coords
							i2, j2, k2, // Offsets for third corner of simplex in (i,j,k) coords
							x1,y1,z1,
							x2,y2,z2,
							x3,y3,z3,
							ii,jj,kk,
							t0,
							gi0,
							t1,
							gi1,
							t2,
							gi2,
							t3,
							gi3;
						if (x0 >= y0) {
							if (y0 >= z0) {
								i1 = 1;
								j1 = 0;
								k1 = 0;
								i2 = 1;
								j2 = 1;
								k2 = 0;
							} // X Y Z order
							else if (x0 >= z0) {
								i1 = 1;
								j1 = 0;
								k1 = 0;
								i2 = 1;
								j2 = 0;
								k2 = 1;
							} // X Z Y order
							else {
								i1 = 0;
								j1 = 0;
								k1 = 1;
								i2 = 1;
								j2 = 0;
								k2 = 1;
							} // Z X Y order
						} else { // x0<y0
							if (y0 < z0) {
								i1 = 0;
								j1 = 0;
								k1 = 1;
								i2 = 0;
								j2 = 1;
								k2 = 1;
							} // Z Y X order
							else if (x0 < z0) {
								i1 = 0;
								j1 = 1;
								k1 = 0;
								i2 = 0;
								j2 = 1;
								k2 = 1;
							} // Y Z X order
							else {
								i1 = 0;
								j1 = 1;
								k1 = 0;
								i2 = 1;
								j2 = 1;
								k2 = 0;
							} // Y X Z order
						}
						// A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
						// a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z),
						// and
						// a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z),
						// where
						// c = 1/6.
						x1 = x0 - i1 + _G3; // Offsets for second corner in (x,y,z) coords
						y1 = y0 - j1 + _G3;
						z1 = z0 - k1 + _G3;

						x2 = x0 - i2 + _F3; // Offsets for third corner in (x,y,z)
						y2 = y0 - j2 + _F3;
						z2 = z0 - k2 + _F3;

						x3 = x0 - 0.5; // Offsets for last corner in (x,y,z)
						y3 = y0 - 0.5;
						z3 = z0 - 0.5;
						// Work out the hashed gradient indices of the four simplex corners
						ii = i & 0xff;
						jj = j & 0xff;
						kk = k & 0xff;

						// Calculate the contribution from the four corners
						t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
						if (t0 > 0) {
							t0 *= t0;
							gi0 = _perm[ii + _perm[jj + _perm[kk]]] % 12;
							n0 = t0 * t0 * _dot(_grad3[gi0], x0, y0, z0);
						}
						t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
						if (t1 > 0) {
							t1 *= t1;
							gi1 = _perm[ii + i1 + _perm[jj + j1 + _perm[kk + k1]]] % 12;
							n1 = t1 * t1 * _dot(_grad3[gi1], x1, y1, z1);
						}
						t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
						if (t2 > 0) {
							t2 *= t2;
							gi2 = _perm[ii + i2 + _perm[jj + j2 + _perm[kk + k2]]] % 12;
							n2 = t2 * t2 * _dot(_grad3[gi2], x2, y2, z2);
						}
						t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
						if (t3 > 0) {
							t3 *= t3;
							gi3 = _perm[ii + 1 + _perm[jj + 1 + _perm[kk + 1]]] % 12;
							n3 = t3 * t3 * _dot(_grad3[gi3], x3, y3, z3);
						}
						// Add contributions from each corner to get the final noise value.
						// The result is scaled to stay just inside [-1,1]
						return 32.0 * (n0 + n1 + n2 + n3);
					})();
				} else {
					// For the 4D case, the simplex is a 4D shape I won't even try to
					// describe.
					// To find out which of the 24 possible simplices we're in, we need to
					// determine the magnitude ordering of x0, y0, z0 and w0.
					// The method below is a good way of finding the ordering of x,y,z,w and
					// then find the correct traversal order for the simplex were in.
					// First, six pair-wise comparisons are performed between each possible
					// pair of the four coordinates, and the results are used to add up
					// binary bits for an integer index.
					return (function(){
						var i1,j1,k1,l1, // The integer offsets for the second simplex corner
							i2,j2,k2,l2, // The integer offsets for the third simplex corner
							i3,j3,k3,l3, // The integer offsets for the fourth simplex corner
							// simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some
							// order. Many values of c will never occur, since e.g. x>y>z>w makes
							// x<z, y<w and x<w impossible. Only the 24 indices which have non-zero
							// entries make any sense. We use a thresholding to set the coordinates
							// in turn from the largest magnitude. The number 3 in the "simplex"
							// array is at the position of the largest coordinate.
							sc = _simplex[
								(function(){
									var c = 0;
									if (x0 > y0) {
										c = 0x20;
									}
									if (x0 > z0) {
										c |= 0x10;
									}
									if (y0 > z0) {
										c |= 0x08;
									}
									if (x0 > w0) {
										c |= 0x04;
									}
									if (y0 > w0) {
										c |= 0x02;
									}
									if (z0 > w0) {
										c |= 0x01;
									}
									return c;
								})()
							],
							x1, y1, z1, w1,
							x2, y2, z2, w2,
							x3, y3, z3, w3,
							x4, y4, z4, w4,
							ii, jj, kk, ll,
							t0,
							gi0,
							t1,
							gi1,
							t2,
							gi2,
							t3,
							gi3,
							t4,
							gi4;

							
							i1 = sc[0] >= 3 ? 1 : 0;
							j1 = sc[1] >= 3 ? 1 : 0;
							k1 = sc[2] >= 3 ? 1 : 0;
							l1 = sc[3] >= 3 ? 1 : 0;
							// The number 2 in the "simplex" array is at the second largest
							// coordinate.
							i2 = sc[0] >= 2 ? 1 : 0;
							j2 = sc[1] >= 2 ? 1 : 0;
							k2 = sc[2] >= 2 ? 1 : 0;
							l2 = sc[3] >= 2 ? 1 : 0;
							// The number 1 in the "simplex" array is at the second smallest
							// coordinate.
							i3 = sc[0] >= 1 ? 1 : 0;
							j3 = sc[1] >= 1 ? 1 : 0;
							k3 = sc[2] >= 1 ? 1 : 0;
							l3 = sc[3] >= 1 ? 1 : 0;

							// The fifth corner has all coordinate offsets = 1, so no need to look
							// that up.
							x1 = x0 - i1 + _G4; // Offsets for second corner in (x,y,z,w)
							y1 = y0 - j1 + _G4;
							z1 = z0 - k1 + _G4;
							w1 = w0 - l1 + _G4;

							x2 = x0 - i2 + _G42; // Offsets for third corner in (x,y,z,w)
							y2 = y0 - j2 + _G42;
							z2 = z0 - k2 + _G42;
							w2 = w0 - l2 + _G42;

							x3 = x0 - i3 + _G43; // Offsets for fourth corner in (x,y,z,w)
							y3 = y0 - j3 + _G43;
							z3 = z0 - k3 + _G43;
							w3 = w0 - l3 + _G43;

							x4 = x0 + _G44; // Offsets for last corner in (x,y,z,w)
							y4 = y0 + _G44;
							z4 = z0 + _G44;
							w4 = w0 + _G44;

							// Work out the hashed gradient indices of the five simplex corners
							ii = i & 0xff;
							jj = j & 0xff;
							kk = k & 0xff;
							ll = l & 0xff;

							// Calculate the contribution from the five corners
							t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
							if (t0 > 0) {
								t0 *= t0;
								gi0 = _perm[ii + _perm[jj + _perm[kk + _perm[ll]]]] % 32;
								n0 = t0 * t0 * _dot(_grad4[gi0], x0, y0, z0, w0);
							}
							t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
							if (t1 > 0) {
								t1 *= t1;
								gi1 = _perm[ii + i1 + _perm[jj + j1 + _perm[kk + k1 + _perm[ll + l1]]]] % 32;
								n1 = t1 * t1 * _dot(_grad4[gi1], x1, y1, z1, w1);
							}
							t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
							if (t2 > 0) {
								t2 *= t2;
								gi2 = _perm[ii + i2 + _perm[jj + j2 + _perm[kk + k2 + _perm[ll + l2]]]] % 32;
								n2 = t2 * t2 * _dot(_grad4[gi2], x2, y2, z2, w2);
							}
							t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
							if (t3 > 0) {
								t3 *= t3;
								gi3 = _perm[ii + i3 + _perm[jj + j3 + _perm[kk + k3 + _perm[ll + l3]]]] % 32;
								n3 = t3 * t3 * _dot(_grad4[gi3], x3, y3, z3, w3);
							}
							t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
							if (t4 > 0) {
								t4 *= t4;
								gi4 = _perm[ii + 1 + _perm[jj + 1 + _perm[kk + 1 + _perm[ll + 1]]]] % 32;
								n4 = t4 * t4 * _dot(_grad4[gi4], x4, y4, z4, w4);
							}

							// Sum up and scale the result to cover the range [-1,1]
							return 27.0 * (n0 + n1 + n2 + n3 + n4);
					})();
					
				}

		}
	};
})();


/**
 @member toxi
 @class a two-dimensional vector class
 */
toxi.Vec2D = function(a,b){
	if(a instanceof Object && a.x !== undefined && a.y !== undefined){
		b = a.y;
		a = a.x;
	} else {
		if(a === undefined)a = 0;
		if(b === undefined)b = 0;
	}
	this.x = a;
	this.y = b;

};

toxi.Vec2D.Axis = {
	X: {
		getVector: function(){ return toxi.Vec2D.X_AXIS; },
		toString: function(){ return "toxi.Vec2D.Axis.X"; }
	},
	Y: {
		getVector: function(){ return toxi.Vec2D.Y_AXIS; },
		toString: function(){ return "toxi.Vec2D.Axis.Y"; }
	}
};

(function(){
	//private, 
	var _getXY = function(a,b) {
		if(a instanceof Object){
			b = a.y;
			a = a.x;
		}
		else {
			if(a !== undefined && b === undefined){
				b = a;
			}
			else if(a === undefined){ a = 0; }
			else if(b === undefined){ b = 0; }
		}
		return {x: a, y: b};
	};
	//public
	toxi.Vec2D.prototype = {
	
		abs: function() {
	        this.x = Math.abs(this.x);
	        this.y = Math.abs(this.y);
	        return this;
	    },
	
	    add: function(a, b) {
			var v  = new toxi.Vec2D(a,b);
			v.x += this.x;
			v.y += this.y;
	        return v;
	    },
	    
	    /**
	     * Adds vector {a,b,c} and overrides coordinates with result.
	     * 
	     * @param a
	     *            X coordinate
	     * @param b
	     *            Y coordinate
	     * @return itself
	     */
	    addSelf: function(a,b) {
			var v = _getXY(a,b);
	        this.x += v.x;
	        this.y += v.y;
	        return this;
	    },
	
		angleBetween: function(v, faceNormalize) {
			if(faceNormalize === undefined){
				var dot = this.dot(v);
				return Math.acos(this.dot(v));
			}
	        var theta = (faceNormalize) ? this.getNormalized().dot(v.getNormalized()) : this.dot(v);
	        return Math.acos(theta);
	    },
	
		//bisect() is in Vec2D_post.js
	
	    /**
	     * Sets all vector components to 0.
	     * 
	     * @return itself
	     */
	    clear: function() {
	        this.x = this.y = 0;
	        return this;
	    },
		
		compareTo: function(vec) {
	        if (this.x == vec.x && this.y == vec.y) {
	            return 0;
	        }
	        return this.magSquared() - vec.magSquared();
	    },

		/**
	     * Forcefully fits the vector in the given rectangle.
	     * 
	     * @param a
	     *		either a Rectangle by itself or the Vec2D min
		 * @param b
		 *		Vec2D max
	     * @return itself
	     */
	    constrain: function(a,b) {
			if(a instanceof Object && b instanceof Object){
				this.x = toxi.MathUtils.clip(this.x, a.x, b.x);
		        this.y = toxi.MathUtils.clip(this.y, a.y, b.y);
			} else if(a.x !== undefined && a.y !== undefined && a.width !== undefined && a.height !== undefined){
				this.x = toxi.MathUtils.clip(this.x, a.x, a.x + a.width);
				this.y = toxi.MathUtils.clip(this.y, a.y, a.y + a.height);
			}
	        return this;
	    },
		
		copy: function() {
	        return new toxi.Vec2D(this);
	    },
	
	    cross: function(v) {
	        return (this.x * v.y) - (this.y * v.x);
	    },
	
	    distanceTo: function(v) {
	        if (v !== undefined) {
	            var dx = this.x - v.x;
	            var dy = this.y - v.y;
	            return Math.sqrt(dx * dx + dy * dy);
	        } else {
	            return NaN;
	        }
	    },
	
	    distanceToSquared: function(v) {
	        if (v !== undefined) {
	            var dx = this.x - v.x;
	            var dy = this.y - v.y;
	            return dx * dx + dy * dy;
	        } else {
	            return NaN;
	        }
	    },
	
		dot: function(v) {
	        return this.x * v.x + this.y * v.y;
	    },
	
		equals: function(obj) {
	        if (obj instanceof Object) {
	            return this.x == obj.x && this.y == obj.y;
	        }
	        return false;
	    },
	
		equalsWithTolerance: function(v, tolerance) {
	        if (toxi.MathUtils.abs(this.x - v.x) < tolerance) {
	            if (toxi.MathUtils.abs(this.y - v.y) < tolerance) {
	                return true;
	            }
	        }
	        return false;
	    },
	
		floor: function() {
	        this.x = toxi.MathUtils.floor(this.x);
	        this.y = toxi.MathUtils.floor(this.y);
	        return this;
	    },
	
		/**
	     * Replaces the vector components with the fractional part of their current
	     * values
	     * 
	     * @return itself
	     */
	    frac: function() {
	        this.x -= toxi.MathUtils.floor(this.x);
	        this.y -= toxi.MathUtils.floor(this.y);
	        return this;
	    },
	
		getAbs: function() {
	        return new toxi.Vec2D(this).abs();
	    },
	
		getComponent: function(id) {
			if(typeof id == 'number')
			{			
				id = (id === 0) ? toxi.Vec2D.Axis.X : toxi.Vec2D.Axis.Y;
			}
			if(id == toxi.Vec2D.Axis.X){
				return this.x;
			} else if(id == toxi.Vec2D.Axis.Y){
				return this.y;
			}
			return 0;
	    },
	
		getConstrained: function(r) {
	        return new toxi.Vec2D(this).constrain(r);
	    },
	
	    getFloored: function() {
	        return new toxi.Vec2D(this).floor();
	    },
	
	    getFrac: function() {
	        return new toxi.Vec2D(this).frac();
	    },
	
	    getInverted: function() {
	        return new toxi.Vec2D(-this.x, -this.y);
	    },
	
	    getLimited: function(lim) {
	        if (this.magSquared() > lim * lim) {
	            return this.getNormalizedTo(lim);
	        }
	        return new toxi.Vec2D(this);
	    },
	
	    getNormalized: function() {
	        return new toxi.Vec2D(this).normalize();
	    },
	
	    getNormalizedTo: function(len) {
	        return new toxi.Vec2D(this).normalizeTo(len);
	    },
		 getPerpendicular: function() {
	        return new toxi.Vec2D(this).perpendicular();
	    },
	
	    getReciprocal: function() {
	        return new toxi.Vec2D(this).reciprocal();
	    },
	
	    getReflected: function(normal) {
	        return new toxi.Vec2D(this).reflect(normal);
	    },
	
	    getRotated: function(theta) {
	        return new toxi.Vec2D(this).rotate(theta);
	    },
	
	    getSignum: function() {
	        return new toxi.Vec2D(this).signum();
	    },
		
		heading: function() {
	        return Math.atan2(this.y, this.x);
	    },
	    
	    interpolateTo: function(v, f, s) {
			if(s === undefined){
				return new toxi.Vec2D(this.x + (v.x -this.x) * f, this.y + (v.y - this.y) * f);
			} else
			{
				return new toxi.Vec2D(s.interpolate(this.x,v.x,f),s.interpolate(this.y,v.y,f));
			}
	    },
	
	    /**
	     * Interpolates the vector towards the given target vector, using linear
	     * interpolation
	     * 
	     * @param v
	     *            target vector
	     * @param f
	     *            interpolation factor (should be in the range 0..1)
	     * @return itself, result overrides current vector
	     */
	    interpolateToSelf: function(v, f, s) {
			if(s === undefined) {
				this.x += (v.x - this.x) * f;
				this.y += (v.y - this.y) * f;
			} else {
				this.x = s.interpolate(this.x,v.x,f);
				this.y = s.interpolate(this.y,v.y,f);
			}
	        return this;
	    },
	
		invert: function() {
	        this.x *= -1;
	        this.y *= -1;
	        return this;
	    },
	
		isInCircle: function(sO,sR) {
	        var d = this.sub(sO).magSquared();
	        return (d <= sR * sR);
	    },
	
	    isInRectangle: function(rect) {
	        if (this.x < rect.x || this.x > rect.x + rect.width) {
	            return false;
	        }
	        if (this.y < rect.y || this.y > rect.y + rect.height) {
	            return false;
	        }
	        return true;
	    },
	
	    isInTriangle: function(a,b,c) {
	        var v1 = this.sub(a).normalize();
	        var v2 = this.sub(b).normalize();
	        var v3 = this.sub(c).normalize();
	
	        var total_angles = Math.acos(v1.dot(v2));
	        total_angles += Math.acos(v2.dot(v3));
	        total_angles += Math.acos(v3.dot(v1));
	
	        return (Math.abs(total_angles - toxi.MathUtils.TWO_PI) <= 0.005);
	    },
	
		isMajorAxis: function(tol) {
	        var ax = Math.abs(this.x);
	        var ay = Math.abs(this.y);
	        var itol = 1 - tol;
	        if (ax > itol) {
	            return (ay < tol);
	        } else if (ay > itol) {
	            return (ax < tol);
	        }
	        return false;
	    },
	
	    isZeroVector: function() {
	        return Math.abs(this.x) < toxi.MathUtils.EPS && Math.abs(this.y) < toxi.MathUtils.EPS;
	    },
	
	    /**
	     * Adds random jitter to the vector in the range -j ... +j using the default
	     * {@link Random} generator of {@link MathUtils}.
	     * 
	     * @param a
	     *            maximum x jitter or  Vec2D
	     * @param b
	     *            maximum y jitter or undefined
	     * @return itself
	     */
	    jitter: function(a,b) {
			var v = _getXY(a,b);
			this.x += toxi.MathUtils.normalizedRandom() * v.x;
	        this.y += toxi.MathUtils.normalizedRandom() * v.y;
	        return this;
	    },
	
		limit: function(lim) {
	        if (this.magSquared() > lim * lim) {
	            return this.normalize().scaleSelf(lim);
	        }
	        return this;
	    },
	
	    magnitude: function() {
	        return Math.sqrt(this.x * this.x + this.y * this.y);
	    },
	
	    magSquared: function() {
	        return this.x * this.x + this.y * this.y;
	    },
	
		max: function(v) {
	        return new toxi.Vec2D(toxi.MathUtils.max(this.x, v.x), toxi.MathUtils.max(this.y, v.y));
	    },
	
		maxSelf: function(v) {
	        this.x = toxi.MathUtils.max(this.x, v.x);
	        this.y = toxi.MathUtils.max(this.y, v.y);
	        return this;
	    },
	
	    min: function(v) {
	        return new toxi.Vec2D(toxi.MathUtils.min(this.x, v.x), toxi.MathUtils.min(this.y, v.y));
	    },
	
		minSelf: function(v) {
	        this.x = toxi.MathUtils.min(this.x, v.x);
	        this.y = toxi.MathUtils.min(this.y, v.y);
	        return this;
	    },
	
	    /**
	     * Normalizes the vector so that its magnitude = 1
	     * 
	     * @return itself
	     */
	    normalize: function() {
	        var mag = this.x * this.x + this.y * this.y;
	        if (mag > 0) {
	            mag = 1.0 / Math.sqrt(mag);
	            this.x *= mag;
	            this.y *= mag;
	        }
	        return this;
	    },
	
	    /**
	     * Normalizes the vector to the given length.
	     * 
	     * @param len
	     *            desired length
	     * @return itself
	     */
	    normalizeTo: function(len) {
	        var mag = Math.sqrt(this.x * this.x + this.y * this.y);
	        if (mag > 0) {
	            mag = len / mag;
	            this.x *= mag;
	            this.y *= mag;
	        }
	        return this;
	    },
	
	    perpendicular: function() {
	        var t = this.x;
	        this.x = -this.y;
	        this.y = t;
	        return this;
	    },
	    
	    positiveHeading: function() {
			var dist = Math.sqrt(this.x * this.x + this.y * this.y);
			if (this.y >= 0){
				return Math.acos(this.x / dist);
			}
			return (Math.acos(-this.x / dist) + toxi.MathUtils.PI);
	    },
	
	    reciprocal: function() {
	        this.x = 1.0 / this.x;
	        this.y = 1.0 / this.y;
	        return this;
	    },
	
		reflect: function(normal) {
	        return this.set(normal.scale(this.dot(normal) * 2).subSelf(this));
	    },
	
	    /**
	     * Rotates the vector by the given angle around the Z axis.
	     * 
	     * @param theta
	     * @return itself
	     */
	    rotate: function(theta) {
	        var co = Math.cos(theta);
	        var si = Math.sin(theta);
	        var xx = co * this.x - si * this.y;
	        this.y = si * this.x + co * this.y;
	        this.x = xx;
	        return this;
	    },
	
		roundToAxis: function() {
	        if (Math.abs(this.x) < 0.5) {
	            this.x = 0;
	        } else {
	            this.x = this.x < 0 ? -1 : 1;
	            this.y = 0;
	        }
	        if (Math.abs(this.y) < 0.5) {
	            this.y = 0;
	        } else {
	            this.y = this.y < 0 ? -1 : 1;
	            this.x = 0;
	        }
	        return this;
	    },
	
	    scale: function(a, b) {
			var v = _getXY(a,b);
	        return new toxi.Vec2D(this.x * v.x, this.y * v.y);
	    },
	
	    scaleSelf: function(a,b) {
			var v = _getXY(a,b);
	        this.x *= v.x;
	        this.y *= v.y;
	        return this;
	    },
	
		set: function(a,b){
			var v = _getXY(a,b);
			this.x = v.x;
			this.y = v.y;
			return this;
		},
		
		setComponent: function(id, val) {
			if(typeof id == 'number')
			{			
				id = (id === 0) ? toxi.Vec2D.Axis.X : toxi.Vec2D.Axis.Y;
			}
			if(id === toxi.Vec2D.Axis.X){
				this.x = val;
			} else if(id === toxi.Vec2D.Axis.Y){
				this.y = val;
			}
			return this;
		},
		
		/**
	     * Replaces all vector components with the signum of their original values.
	     * In other words if a components value was negative its new value will be
	     * -1, if zero => 0, if positive => +1
	     * 
	     * @return itself
	     */
		signum: function() {
	        this.x = (this.x < 0 ? -1 : this.x === 0 ? 0 : 1);
	        this.y = (this.y < 0 ? -1 : this.y === 0 ? 0 : 1);
	        return this;
	    },
	
		sub: function(a,b){
			var v = _getXY(a,b);
			return new toxi.Vec2D(this.x -v.x,this.y - v.y);
		},
		
		/**
	     * Subtracts vector {a,b,c} and overrides coordinates with result.
	     * 
	     * @param a
	     *            X coordinate
	     * @param b
	     *            Y coordinate
	     * @return itself
	     */
	    subSelf: function(a,b) {
	        var v = _getXY(a,b);
			this.x -= v.x;
	        this.y -= v.y;
	        return this;
	    },
	
		tangentNormalOfEllipse: function(eO,eR) {
	        var p = this.sub(eO);
	
	        var xr2 = eR.x * eR.x;
	        var yr2 = eR.y * eR.y;
	
	        return new toxi.Vec2D(p.x / xr2, p.y / yr2).normalize();
	    },
	    
	
		//to3D** methods are in Vec2D_post.js
		
	    toArray: function() {
	        return [this.x,this.y];
	    },
	
		toCartesian: function() {
	        var xx = (this.x * Math.cos(this.y));
	        this.y = (this.x * Math.sin(this.y));
	        this.x = xx;
	        return this;
	    },
	
		toPolar: function() {
	        var r = Math.sqrt(this.x * this.x + this.y * this.y);
	        this.y = Math.atan2(this.y, this.x);
	        this.x = r;
	        return this;
	    },
	
	    toString: function() {
	        var s = "{x:"+this.x+", y:"+this.y+"}";
	        return s;
	    }
		
	};
	
	toxi.Vec2D.X_AXIS = new toxi.Vec2D(1,0); 
	toxi.Vec2D.Y_AXIS = new toxi.Vec2D(0,1); 
	toxi.Vec2D.ZERO = new toxi.Vec2D();
	toxi.Vec2D.MIN_VALUE = new toxi.Vec2D(Number.MIN_VALUE,Number.MIN_VALUE);
	toxi.Vec2D.MAX_VALUE = new toxi.Vec2D(Number.MAX_VALUE, Number.MAX_VALUE);
	toxi.Vec2D.fromTheta = function(theta){
		return new toxi.Vec2D(Math.cos(theta),Math.sin(theta));
	};
	toxi.Vec2D.max = function(a,b){
		return new toxi.Vec2D(toxi.MathUtils.max(a.x,b.x), toxi.MathUtils.max(a.y,b.y));
	};
	
	toxi.Vec2D.min = function(a, b) {
	    return new toxi.Vec2D(toxi.MathUtils.min(a.x, b.x), toxi.MathUtils.min(a.y, b.y));
	};
	
	toxi.Vec2D.randomVector = function(rnd){
		var v = new toxi.Vec2D(Math.random()*2 - 1, Math.random() * 2 - 1);
		return v.normalize();
	};
	
})();
/**
 * @member toxi
 * @class Creates a new vector with the given coordinates. Coordinates will default to zero
 * @param {Number} x the x
 * @param {Number} y the y
 * @param {Number} z the z
 */
toxi.Vec3D = function(x, y, z){
	if(typeof x == 'object' && x.x !== undefined && x.y !== undefined && x.z !== undefined){
		this.x = x.x;
		this.y = x.y;
		this.z = x.z;
	} else if(x === undefined){ //if none or all were passed
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
	} else {
		this.x = x;
		this.y = y;
		this.z = z;
	}
};
	
toxi.Vec3D.prototype = {
	
	abs: function(){
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		this.z = Math.abs(this.z);
		return this;
	},
	
	add: function(a,b,c){
		if(a instanceof Object){
			return new toxi.Vec3D(this.x+a.x,this.y+a.y,this.z+a.z);
		}
		return new toxi.Vec3D(this.x+a,this.y+b,this.z+c);
		
	},
	/**
     * Adds vector {a,b,c} and overrides coordinates with result.
     * 
     * @param a
     *            X coordinate
     * @param b
     *            Y coordinate
     * @param c
     *            Z coordinate
     * @return itself
     */
	addSelf: function(a,b,c){
		if(a !== undefined && b!== undefined && c !== undefined){
			this.x += a;
			this.y += b;
			this.z += c;
		} else {
			this.x += a.x;
			this.y += a.y;
			this.z += a.z;
		}
		return this;
	},
	
	angleBetween: function(vec, faceNormalizeBool){
		var theta;
		if(faceNormalizeBool){
			theta = this.getNormalized().dot(vec.getNormalized());
		} else {
			theta = this.dot(vec);
		}
		return Math.acos(theta);
	},
	
	
	clear: function(){
		this.x = this.y = this.z = 0;
		return this;
	},
	
	compareTo: function(vec){
		if(this.x == vec.x && this.y == vec.y && this.z == vec.z){
			return 0;
		}
		return (this.magSquared() - vec.magSqaured());
	},
	/**
     * Forcefully fits the vector in the given AABB specified by the 2 given
     * points.
     * 
     * @param box_or_min
	 *		either the AABB box by itself, or your min Vec3D with accompanying max
     * @param max
     * @return itself
     */
	constrain: function(box_or_min, max){
		if(box_or_min instanceof AABB){
			max = box_or_min.getMax();
			box_or_min = box_or_min.getMin();
		}
		this.x = Math.clip(this.x, this.min.x, this.max.x);
        this.y = toxi.MathUtils.clip(this.y, this.min.y, this.max.y);
        this.z = toxi.MathUtils.clip(this.z, this.min.z, this.max.z);
       return this;
	},
	
	copy: function(){
		return new toxi.Vec3D(this);
	},
	
	cross: function(vec){
		return new toxi.Vec3D(this.y*vec.z - vec.y * this.z, this.z * vec.x - vec.z * this.x,this.x * vec.y - vec.x * this.y);
	},
	
	crossInto: function(vec, vecResult){
		var vx = vec.x;
		var vy = vec.y;
		var vz = vec.z;
		result.x = this.y * vz - vy * this.z;
		result.y = this.z * vx-vz * this.x;
		result.z = this.x * vy - vx * this.y;
		return result;
	},
	/**
     * Calculates cross-product with vector v. The resulting vector is
     * perpendicular to both the current and supplied vector and overrides the
     * current.
     * 
     * @param v
     *            the v
     * 
     * @return itself
     */
	crossSelf: function(vec){
		var cx = this.y * vec.z - vec.y * this.z;
		var cy = this.z * vec.x - vec.z * this.x;
		this.z = vec.y - vec.x * this.y;
		this.y = cy;
		this.x = cx;
		return this;
	},
	
	distanceTo: function(vec){
		if(vec !== undefined){
			var dx = this.x - vec.x;
			var dy = this.y - vec.y;
			var dz = this.z - vec.z;
			return Math.sqrt(dx * dx + dy * dy + dz * dz);
		}
		return NaN;
	},
	
	distanceToSquared: function(vec){
		if(vec !== undefined){
			var dx = this.x - vec.x;
			var dy = this.y - vec.y;
			var dz = this.z - vec.z;
			return dx * dx + dy*dy + dz*dz;
		}
		return NaN;
	},
	
	dot: function(vec){
		return this.x * vec.x + this.y * vec.y + this.z * vec.z;
	},
	
	equals: function(vec){
		if(vec instanceof Object){
			return this.x == vec.x && this.y == vec.y && this.z == vec.z;
		}
		return false;
	},
	
	equalsWithTolerance: function(vec,tolerance){
		if(Math.abs(this.x-vec.x) < tolerance){
			if(Math.abs(this.y - vec.y) < tolerance){
				if(Math.abs(this.z - vec.z) < tolerance){
					return true;
				}
			}
		}
		return false;
	},
	
	floor: function(){
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		return this;
	},
	/**
     * Replaces the vector components with the fractional part of their current
     * values.
     * 
     * @return itself
     */
	frac: function(){
		this.x -= Math.floor(this.x);
		this.y -= Math.floor(this.y);
		this.z -= Math.floor(this.z);
		return this;
	},
	
	getAbs: function(){
		return new toxi.Vec3D(this).abs();
	},
	
	getComponent: function(id){
		if(id instanceof Number){
			if(id === toxi.Vec3D.Axis.X){
				id = 0; 
			} else if(id === toxi.Vec3D.Axis.Y){
				id = 1;
			} else {
				id = 2;
			}
		}
		switch(id){
			case 0:
			return this.x;
			case 1:
			return this.y;
			case 2:
			return this.z;
		}
	},
	
	getConstrained: function(box){
		return new toxi.Vec3D(this).constrain(box);
	},
	
	getFloored: function(){
		return new toxi.Vec3D(this).floor();
	},
	
	getFrac: function(){
		return new toxi.Vec3D(this).frac();
	},
	
	getInverted: function(){
		return new toxi.Vec3D(-this.x,-this.y,-this.z);
	},
	
	getLimited: function(limit){
		if(this.magSquared() > limit * limit){
			return this.getNormalizedTo(limit);
		}
		return new toxi.Vec3D(this);
	},
	
	getNormalized: function(){
		return new toxi.Vec3D(this).normalize();
	},
	
	getNormalizedTo: function(length){
		return new toxi.Vec3D(this).normalizeTo(length);
	},
	
	getReciprocal: function(){
		return this.copy().reciprocal();
	},
	
	getReflected: function(normal){
		return this.copy().reflect(normal);
	},
	
	getRotatedAroundAxis: function(vec_axis,theta){
		return new toxi.Vec3D(this).rotateAroundAxis(vec_axis,theta);
	},
	
	getRotatedX: function(theta){
		return new toxi.Vec3D(this).rotateX(theta);
	},
	
	getRotatedY: function(theta){
		return new toxi.Vec3D(this).rotateY(theta);
	},
	
	getRotatedZ: function(theta){
		return new toxi.Vec3D(this).rotateZ(theta);
	},
	
	getSignum: function(){
		return new toxi.Vec3D(this).signum();
	},
	
	headingXY: function(){
		return Math.atan2(this.y,this.x);
	},
	
	headingXZ: function(){
		return Math.atan2(this.z,this.x);
	},
	
	headingYZ: function(){
		return Math.atan2(this.y,this.z);
	},
	
	immutable: function(){
		return this; //cant make read-only in javascript, implementing to avoid error
	},
	
	interpolateTo: function(v,f,s) {
		if(s === undefined){
			return new toxi.Vec3D(this.x + (v.x - this.x)*f, this.y + (v.y - this.y) * f, this.z + (v.z - z)*f);
		}
		return new toxi.Vec3D(s.interpolate(this.y,v.y,f),s.interpolate(this.y,v.y,f),s.interpolate(this.z,v.z,f));
        
    },
    
    interpolateToSelf: function(v,f,s){
		if(s === undefined){
			this.x += (v.x-this.x)*f;
			this.y += (v.y-this.y)*f;
			this.z += (v.z-this.z)*f;
		} else {
			this.x = s.interpolate(this.x,v.x,f);
			this.y = s.interpolate(this.y,v.y,f);
			this.z = s.interpolate(this.z,v.z,f);
		}
		return this;
	},
	
	
	
	invert: function(){
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
		return this;
	},
	
	isInAABB: function(box_or_origin, boxExtent){
		if(boxExtent) {
			var w = boxExtent.x;
			if(this.x < box_or_origin.x - w || this.x > box_or_origin.x + w){
				return false;
			}
			w = boxExtent.y;
			if(this.y < box_or_origin.y - w || this.y > box_or_origin.y + w){
				return false;
			}
			w = boxExtent.y;
			if(this.z < box_or_origin.z - w || this.y > box_or_origin.z + w){
				return false;
			}
		}
		return true;	
	},
	
	isMajorAxis: function(tol){
		var ax = toxi.MathUtils.abs(this.x);
		var ay = toxi.MathUtils.abs(this.y);
		var az = toxi.MathUtils.abs(this.z);
		var itol = 1 - tol;
        if (ax > itol) {
			if (ay < tol) {
				return (az < tol);
			}
		} else if (ay > itol) {
           if (ax < tol) {
               return (az < tol);
           }
       } else if (az > itol) {
           if (ax < tol) {
               return (ay < tol);
           }
       }
       return false;
	},

	isZeroVector: function(){
		return Math.abs(this.x) < toxi.MathUtils.EPS && Math.abs(this.y) < toxi.MathUtils.EPS && toxi.MathUtils.abs(this.z) < toxi.MathUtils.EPS;
	},
  
	/**
     * Add random jitter to the vector in the range -j ... +j using the default
     * {@link Random} generator of {@link MathUtils}.
     * 
     * @param j
     *            the j
     * 
     * @return the vec3 d
     */
	jitter: function(a,b,c){
		if(b === undefined || c === undefined){
			b = c = a;
		}
		this.x += toxi.MathUtils.normalizedRandom()*a;
		this.y += toxi.MathUtils.normalizedRandom()*b;
		this.z += toxi.MathUtils.normalizedRandom()*c;
		return this;
	},
	
	limit: function(lim){
		if(this.magSquared() > lim * lim){
			return this.normalize().scaleSelf(lim);
		}
		return this;
	},
	
	magnitude: function(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	},
	
	magSquared: function(){
		return this.x*this.x+this.y*this.y+this.z*this.z;
	},
	
	maxSelf: function(vec){
		this.x = Math.max(this.x,vec.x);
		this.y = Math.max(this.y,vec.y);
		this.z = Math.max(this.z,vec.z);
		return this;
	},
	
	minSelf: function(vec){
		this.x = Math.min(this.x,vec.x);
		this.y = Math.min(this.y,vec.y);
		this.z = Math.min(this.z,vec.z);
		return this;
	},
	
	modSelf: function(basex,basey,basez){
		if(basey === undefined || basez === undefined){
			basey = basez = basex;
		}
		this.x %= basex;
		this.y %= basey;
		this.z %= basez;
		return this;
	},
	
	
	normalize: function(){
		var mag = Math.sqrt(this.x*this.x + this.y * this.y + this.z * this.z);
		if(mag > 0) {
			mag = 1.0 / mag;
			this.x *= mag;
			this.y *= mag;
			this.z *= mag;
		}
		return this;
	},
	
	normalizeTo: function(length){
		var mag = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
		if(mag>0){
			mag = length / mag;
			this.x *= mag;
			this.y *= mag;
			this.z *= mag;
		}
		return this;
	},
	
	reciprocal: function(){
		this.x = 1.0 / this.x;
		this.y = 1.0 / this.y;
		this.z = 1.0 / this.z;
		return this;
	},
	
	reflect: function(normal){
		return this.set(normal.scale(this.dot(normal)*2).subSelf(this));
	},
	/**
     * Rotates the vector around the giving axis.
     * 
     * @param axis
     *            rotation axis vector
     * @param theta
     *            rotation angle (in radians)
     * 
     * @return itself
     */
	rotateAroundAxis: function(vec_axis,theta){
		var ax = vec_axis.x,
			ay = vec_axis.y,
			az = vec_axis.z,
			ux = ax * this.x,
			uy = ax * this.y,
			uz = ax * this.z,
			vx = ay * this.x,
			vy = ay * this.y,
			vz = ay * this.z,
			wx = az * this.x,
			wy = az * this.y,
			wz = az * this.z;
			si = Math.sin(theta);
			co = Math.cos(theta);
        var xx = (ax * (ux + vy + wz) + (this.x * (ay * ay + az * az) - ax * (vy + wz)) * co + (-wy + vz) * si);
        var yy = (ay * (ux + vy + wz) + (this.y * (ax * ax + az * az) - ay * (ux + wz)) * co + (wx - uz) * si);
        var zz = (az * (ux + vy + wz) + (this.z * (ax * ax + ay * ay) - az * (ux + vy)) * co + (-vx + uy) * si);
        this.x = xx;
        this.y = yy;
        this.z = zz;
        return this;
	},
    /**
     * Rotates the vector by the given angle around the X axis.
     * 
     * @param theta
     *            the theta
     * 
     * @return itself
     */
	rotateX: function(theta){
		var co = Math.cos(theta);
        var si = Math.sin(theta);
        var zz = co *this.z - si * this.y;
        this.y = si * this.z + co * this.y;
        this.z = zz;
        return this;
	},
	/**
     * Rotates the vector by the given angle around the Y axis.
     * 
     * @param theta
     *            the theta
     * 
     * @return itself
     */
   rotateY:function(theta) {
        var co = Math.cos(theta);
        var si = Math.sin(theta);
        var xx = co * this.x - si * this.z;
        this.z = si * this.x + co * this.z;
        this.x = xx;
        return this;
    },

    /**
     * Rotates the vector by the given angle around the Z axis.
     * 
     * @param theta
     *            the theta
     * 
     * @return itself
     */
    rotateZ:function(theta) {
        var co = Math.cos(theta);
        var si = Math.sin(theta);
        var xx = co * this.x - si * this.y;
        this.y = si * this.x + co * this.y;
        this.x = xx;
        return this;
    },

	/**
     * Rounds the vector to the closest major axis. Assumes the vector is
     * normalized.
     * 
     * @return itself
     */
	 roundToAxis:function() {
        if (Math.abs(this.x) < 0.5) {
            this.x = 0;
        } else {
            this.x = this.x < 0 ? -1 : 1;
            this.y = this.z = 0;
        }
        if (Math.abs(this.y) < 0.5) {
            this.y = 0;
        } else {
            this.y = this.y < 0 ? -1 : 1;
            this.x = this.z = 0;
        }
        if (Math.abs(this.z) < 0.5) {
            this.z = 0;
        } else {
            this.z = this.z < 0 ? -1 : 1;
            this.x = this.y = 0;
        }
        return this;
    },

	scale:function(a,b,c) {
		if(a instanceof toxi.Vec3D) { //if it was a vec3d that was passed
			return new toxi.Vec3D(this.x * a.x, this.y * a.y, this.z * a.z);
	    }
		else if(b === undefined || c === undefined) { //if only one float was passed
			b = c = a;
		}
		return new toxi.Vec3D(this.x * a, this.y * b, this.z * c);
	},
	
	scaleSelf: function(a,b,c) {
		if(a instanceof Object){
			this.x *= a.x;
			this.y *= a.y;
			this.z *= a.z;
			return true;
		} else if(b === undefined || c === undefined) {
			b = c = a;
		}
		this.x *= a;
		this.y *= b;
		this.z *= c;
		return this;
	},
	
	set: function(a,b,c){
		if(a instanceof Object)
		{
			this.x = a.x;
			this.y = a.y;
			this.z = a.z;
			return this;
		} else if(b === undefined || c === undefined) {
			b = c = a;
		}
		this.x = a;
		this.y = b;
		this.z = c;
		return this;
	},
	
	setXY: function(v){
		this.x = v.x;
		this.y = v.y;
		return this;
	},
	
	shuffle:function(nIterations){
		var t;
		for(var i=0;i<nIterations;i++) {
			switch(Math.floor(Math.random()*3)){
				case 0:
				t = this.x;
				this.x = this.y;
				this.z = t;
				break;
				
				case 1:
				t = this.x;
				this.x = this.z;
				this.z = t;
				break;
				
				case 2:
				t = this.y;
				this.y = this.z;
				this.z = t;
				break;
			}
		}
		return this;
	},
	/**
     * Replaces all vector components with the signum of their original values.
     * In other words if a components value was negative its new value will be
     * -1, if zero => 0, if positive => +1
     * 
     * @return itself
     */
	signum: function(){
		this.x = (this.x < 0 ? -1 : this.x === 0 ? 0 : 1);
		this.y = (this.y < 0 ? -1 : this.y === 0 ? 0 : 1);
		this.z = (this.z < 0 ? -1 : this.z === 0 ? 0 : 1);
		return this;
	},
	
	sub: function(a,b,c){
		if(a instanceof Object){
			return  new toxi.Vec3D(this.x - a.x, this.y - a.y, this.z - a.z);
		} else if(b === undefined || c === undefined) {
			b = c = a;
		}
		return new toxi.Vec3D(this.x - a, this.y - b, this.z - c);
	},
	
	subSelf: function(a,b,c){
		if(a instanceof Object){
			this.x -= a.x;
			this.y -= a.y;
			this.z -= a.z;
			return this;
		}
		else if(b === undefined || c === undefined){
			b = c= a;
		}
		this.x -= a;
		this.y -= b;
		this.z -= c;
		return this;
	},
	
	to2DXY: function(){
		return new toxi.Vec2D(this.x,this.y);
	},
	
	to2DXZ: function(){
		return new toxi.Vec2D(this.x,this.z);
	},
	
	to2DYZ: function(){
		return new toxi.Vec2D(this.y,this.z);
	},
	
	toArray: function(){
		return [this.x,this.y,this.z];
	},
	
	toArray4:function(w){
		var ta = this.toArray();
		ta[3] = w;
		return ta;
	},
	
	toCartesian: function(){
		var a = (this.x * Math.cos(this.z));
        var xx = (a * Math.cos(this.y));
        var yy = (this.x * Math.sin(this.z));
        var zz = (a * Math.sin(this.y));
        this.x = xx;
        this.y = yy;
        this.z = zz;
        return this;
	},
	
	toSpherical: function(){
		var xx = Math.abs(this.x) <= toxi.MathUtils.EPS ? toxi.MathUtils.EPS : this.x;
        var zz = this.z;

        var radius = Math.sqrt((xx * xx) + (this.y * this.y) + (zz * zz));
        this.z = Math.asin(this.y / radius);
        this.y = Math.atan(zz / xx) + (xx < 0.0 ? Math.PI : 0);
        this.x = radius;
        return this;
	},
	
	toString: function(){
		return "[ x: "+this.x+ ", y: "+this.y+ ", z: "+this.z+"]";
	}
};
/**
  * Defines vector with all coords set to Float.MIN_VALUE. Useful for
  * bounding box operations.
  */
toxi.Vec3D.MIN_VALUE = new toxi.Vec3D(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE);
/**
  * Defines vector with all coords set to Float.MAX_VALUE. Useful for
  * bounding box operations.
 */
toxi.Vec3D.MAX_VALUE = new toxi.Vec3D(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE);
/**
 * Creates a new vector from the given angle in the XY plane. The Z
 * component of the vector will be zero.
 * 
 * The resulting vector for theta=0 is equal to the positive X axis.
 * 
 * @param theta
 *            the theta
 * 
 * @return new vector in the XY plane
 */
toxi.Vec3D.fromXYTheta = function(theta) {
	return new toxi.Vec3D(Math.cos(theta),Math.sin(theta),0);
};
/**
 * Creates a new vector from the given angle in the XZ plane. The Y
 * component of the vector will be zero.
 * 
 * The resulting vector for theta=0 is equal to the positive X axis.
 * 
 * @param theta
 *            the theta
 * 
 * @return new vector in the XZ plane
 */
 toxi.Vec3D.fromXZTheta = function(theta) {
        return new toxi.Vec3D(Math.cos(theta), 0, Math.sin(theta));
 };

/**
 * Creates a new vector from the given angle in the YZ plane. The X
 * component of the vector will be zero.
 * 
 * The resulting vector for theta=0 is equal to the positive Y axis.
 * 
 * @param theta
 *            the theta
 * 
 * @return new vector in the YZ plane
 */
toxi.Vec3D.fromYZTheta = function(theta) {
    return new toxi.Vec3D(0, Math.cos(theta), Math.sin(theta));
};

/**
 * Constructs a new vector consisting of the largest components of both
 * vectors.
 * 
 * @param b
 *            the b
 * @param a
 *            the a
 * 
 * @return result as new vector
 */
toxi.Vec3D.max = function(a, b) {
        return new toxi.Vec3D(Math.max(a.x(), b.x()), Math.max(a.y(),b.y()), Math.max(a.z(), b.z()));
};

/**
 * Constructs a new vector consisting of the smallest components of both
 * vectors.
 * 
 * @param b
 *            comparing vector
 * @param a
 *            the a
 * 
 * @return result as new vector
 */
toxi.Vec3D.min = function(a,b) {
    return new toxi.Vec3D(Math.min(a.x(), b.x()), Math.min(a.y(), b.y()), Math.min(a.z(), b.z()));
};


/**
 * Static factory method. Creates a new random unit vector using the Random
 * implementation set as default for the {@link MathUtils} class.
 * 
 * @return a new random normalized unit vector.
 */

toxi.Vec3D.randomVector = function() {
	var v = new toxi.Vec3D(Math.random()*2 - 1, Math.random() * 2 -1, Math.random()* 2 - 1);
	return v.normalize();
};
toxi.Vec3D.ZERO = new toxi.Vec3D(0,0,0);
toxi.Vec3D.X_AXIS = new toxi.Vec3D(1,0,0);
toxi.Vec3D.Y_AXIS = new toxi.Vec3D(0,1,0);
toxi.Vec3D.Z_AXIS = new toxi.Vec3D(0,0,1);
toxi.Vec3D.Axis = {
	X: {
		getVector: function(){ 
			return toxi.Vec3D.X_AXIS;
		},
		toString: function(){
			return "toxi.Vec3D.Axis.X";
		}
	},
	Y: {
		getVector: function(){ 
			return toxi.Vec3D.Y_AXIS;
		},
		toString: function(){
			return "toxi.Vec3D.Axis.Y";
		}
	},
	Z: {
		getVector: function(){ 
			return toxi.Vec3D.Z_AXIS;
		},
		toString: function(){
			return "toxi.Vec3D.Axis.Z";
		}
	}
};

//this file is for the Vec2D methods that require Vec3D,
//so that they can be loaded after the Vec3D definition
toxi.Vec2D.prototype.bisect = function(b) {
    var diff = this.sub(b);
    var sum = this.add(b);
    var dot = diff.dot(sum);
    return new toxi.Vec3D(diff.x, diff.y, -dot / 2);
};

toxi.Vec2D.prototype.to3DXY = function() {
    return new toxi.Vec3D(this.x, this.y, 0);
};

toxi.Vec2D.prototype.to3DXZ = function() {
    return new toxi.Vec3D(this.x, 0, this.y);
};

toxi.Vec2D.prototype.to3DYZ = function() {
    return new toxi.Vec3D(0, this.x, this.y);
};
/**
 * @class
 * @member toxi
 */
toxi.Polygon2D = function(){
	this.vertices = [];
	var i,l;
	if(arguments.length > 1){ //comma-separated Vec2D's were passed in
		for(i=0, l = arguments.length;i<l;i++){
			this.add(arguments[i].copy());
		}
	} else if(arguments.length == 1){
		var arg = arguments[0];
		if(arg instanceof Array){ // if it was an array of points
			for(i=0,l = arg.length;i<l;i++){
				this.add(arg[i].copy());
			}
		}
	} //otherwise no args were passed, and thats ok

};


toxi.Polygon2D.prototype = {

	add: function(p){
		if(this.vertices.indexOf(p) < 0){
			this.vertices.push(p);
		}
	},
	
	containsPoint: function(p){
		var num = this.vertices.length,
			i = 0,
			j = num-1,
			oddNodes = false,
			px = p.x,
			py = p.y;
		for(i=0;i<num;i++){
			var vi = this.vertices[i],
				vj = this.vertices[j];
			if (vi.y < py && vj.y >= py || vj.y < py && vi.y >= py) {
				if (vi.x + (py - vi.y) / (vj.y - vi.y) * (vj.x - vi.x) < px) {
					oddNodes = !oddNodes;
				}
			}
			j = i;
		}
		return oddNodes;
	},
	
	containsPoly: function(poly) {
        for (var i=0,num=poly.vertices.length; i<num; i++) {
            if (!this.containsPoint(poly.vertices[i])) {
                return false;
            }
        }
        return true;
    },
    
	flipVertexOrder: function(){
		this.vertices.reverse();
		return this;
	},
	
	getArea: function(){
		var area = 0,
			numPoints = this.vertices.length;
		for(var i=0;i<numPoints;i++){
			var a = this.vertices[i],
				b = this.vertices[(i+1) % numPoints];
			area += a.x * b.y;
			area -= a.y * b.x;
		}
		area *= 0.5;
		return area;
	},
	
	getCentroid: function(){
		var res = new toxi.Vec2D(),
			numPoints = this.vertices.length;
		for(var i=0;i<numPoints;i++){
			var a = this.vertices[i],
				b = this.vertices[(i+1) %numPoints],
				factor = a.x * b.y - b.x * a.y;
			res.x += (a.x + b.x) * factor;
			res.y += (a.y + b.y) * factor;
		}
		return res.scale(1 / (this.getArea() * 6));
	},
	
	getCircumference: function(){
		var circ = 0;
		for(var i=0,num=this.vertices.length;i<num;i++){
			circ += this.vertices[i].distanceTo(this.vertices[(i+1)%num]);
		}
		return circ;
	},
	
	getEdges: function() {
		var num = this.vertices.length,
			edges = [];
		for (var i = 0; i < num; i++) {
			edges[i]=new toxi.Line2D(this.vertices[i], this.vertices[(i + 1) % num]);
		}
		return edges;
	},
	
	getNumPoints: function(){
		return this.vertices.length;
	},
	
	isClockwise: function(){
		if(this.vertices.length > 2){
			return toxi.Triangle2D.isClockwise(this.vertices[0],this.vertices[1],this.vertices[2]);
		}
		return false;
	},
	
	intersectsPoly: function(poly) {
		if (!this.containsPoly(poly)) {
			var edges=this.getEdges();
			var pedges=poly.getEdges();
			for(var i=0, n=edges.length; i < n; i++) {
				for(var j=0, m = pedges.length, e = edges[i]; j < m; j++) {
					if (e.intersectLine(pedges[j]).getType() == toxi.Line2D.LineIntersection.Type.INTERSECTING) {
						return true;
					}
				}
			}
			return false;
		} else {
			return true;
		}
	},
    
    rotate: function(theta) {
		for (var i=0, num=this.vertices.length; i < num; i++) {
			this.vertices[i].rotate(theta);
		}
    },
    
    scale: function() {
		var x,y;
		if (arguments.length==1) {
			var arg = arguments[0];
			if(arg instanceof toxi.Vec2D){
				x=arg.x;
				y=arg.y;
			} else {
				// uniform scale
				x=arg;
				y=arg;
			}
		} else if (arguments.length==2) {
			x=arguments[0];
			y=arguments[1];
		} else {
			throw "Invalid argument(s) passed.";
		}
		for (var i=0, num=this.vertices.length; i < num; i++) {
			this.vertices[i].scaleSelf(x, y);
		}
		return this;
    },
    
	translate: function() {
		var x,y;
		if (arguments.length==1 && arguments[0] instanceof toxi.Vec2D){
			x=arg.x;
			y=arg.y;
		} else if (arguments.length==2) {
			x=arguments[0];
			y=arguments[1];
		} else {
			throw "Invalid argument(s) passed.";
		}
        for (var i=0, num=this.vertices.length; i < num; i++) {
            this.vertices[i].addSelf(x, y);
        }
        return this;
    },
    
	smooth: function(amount, baseWeight){
		var centroid = this.getCentroid();
		var num = this.vertices.length;
		var filtered = [];
		for(var i=0,j=num-1,k=1;i<num;i++){
			var a = this.vertices[i];
			var dir = this.vertices[j].sub(a).addSelf(this.vertices[k].sub(a))
				.addSelf(a.sub(centroid).scaleSelf(baseWeight));
			filtered.push(a.add(dir.scaleSelf(amount)));
			j++;
			if(j == num){
				j=0;
			}
			k++;
			if(k == num){
				k=0;
			}
		}
		this.vertices = filtered;
		return this;
	},
	
	toString: function(){
		var s = "";
		for(var i=0;i<this.vertices.length;i++){
			s += this.vertices[i];
			if(i<this.vertices.length-1){
				s+= ", ";
			}
		}
		return s;
	}
	
};/**
 * @class
 * Helper class for the spline3d classes in this package. Used to compute
 * subdivision points of the curve.
 * @member toxi
 * @param {Number} res number of subdivision steps between each control point of the spline3d
 */
toxi.BernsteinPolynomial = function(res) {
        this.resolution = res;
		var b0 = new Array(res),
			b1 = new Array(res),
			b2 = new Array(res),
			b3 = new Array(res);
		var t = 0;
		var dt = 1.0 / (res - 1);
		for (var i = 0; i < res; i++) {
			var t1 = 1 - t;
			var t12 = t1 * t1;
			var t2 = t * t;
			b0[i] = t1 * t12;
			b1[i] = 3 * t * t12;
			b2[i] = 3 * t2 * t1;
			b3[i] = t * t2;
			t += dt;
		}
		this.b0 = b0;
		this.b1 = b1;
		this.b2 = b2;
		this.b3 = b3;
};

/**
 * @class
 * @member toxi
 * @param {toxi.Vec2D[]} rawPoints array of toxi.Vec2D's
 * @param {toxi.BernsteinPolynomial} [bernsteinPoly]
 */
toxi.Spline2D = function(rawPoints,bernsteinPoly){
	if(arguments.length === 0){
			this.setTightness(toxi.Spline2D.DEFAULT_TIGHTNESS);
			this.pointList = [];
		}
		else if(arguments.length >= 3){
			this.pointList = rawPoints.slice(0); //copy array
			this.bernstein = bernsteinPoly;
			this.setTightness(tightness);
		}
		else if(arguments.length == 1){
		
			this.pointList = rawPoints;
	        this.numP = rawPoints.length;
	        this.coeffA = [];
	        this.delta = [];
	        this.bi = [];
	        for (var i = 0; i < this.numP; i++) {
	            this.coeffA[i] = new toxi.Vec2D();
	            this.delta[i] = new toxi.Vec2D();
	            this.bi[i] = 0;
	        }
			//this.pointList = rawPoints.slice(0);
			//this.setTightness(Spline2D.DEFAULT_TIGHTNESS);
		}
		this.numP = this.pointList.length;
		this.bi = [];
};


toxi.Spline2D.prototype = {
	add: function(p){
		this.pointList.push(p.copy());
		return this;
	},

	
	computeVertices: function(res){
		this.updateCoefficients();
        if (this.bernstein === undefined || this.bernstein.resolution != res) {
            this.bernstein = new toxi.BernsteinPolynomial(res);
        }
        var bst = this.bernstein;
        this.vertices = [];
        this.findCPoints();
        var deltaP = new toxi.Vec2D();
        var deltaQ = new toxi.Vec2D();
        for (var i = 0; i < this.numP - 1; i++) {
            var p = this.points[i];
            var q = this.points[i + 1];
            deltaP.set(this.delta[i]).addSelf(p);
            deltaQ.set(q).subSelf(this.delta[i + 1]);
            for (var k = 0; k < bst.resolution; k++) {
                var x = p.x * bst.b0[k] + deltaP.x * bst.b1[k] +
                deltaQ.x * bst.b2[k] +
                q.x * bst.b3[k];
                var y = p.y * bst.b0[k] + deltaP.y * bst.b1[k] +
                deltaQ.y * bst.b2[k] +
                q.y * bst.b3[k];
                this.vertices.push(new toxi.Vec2D(x, y));
            }
        }
        return this.vertices;
    },

	findCPoints: function(){
        this.bi[1] = -0.25;
        var i;
        this.coeffA[1].set((this.points[2].x - this.points[0].x - this.delta[0].x) * this.tightness, (this.points[2].y - this.points[0].y - this.delta[0].y) * this.tightness);
        for (i = 2; i < this.numP - 1; i++) {
            this.bi[i] = -1 / (this.invTightness + this.bi[i - 1]);
            this.coeffA[i].set(-(this.points[i + 1].x - this.points[i - 1].x - this.coeffA[i - 1].x) *
            this.bi[i], -(this.points[i + 1].y - this.points[i - 1].y - this.coeffA[i - 1].y) *
            this.bi[i]);
        }
        for (i = this.numP - 2; i > 0; i--) {
            this.delta[i].set(this.coeffA[i].x + this.delta[i + 1].x * this.bi[i], this.coeffA[i].y +
            this.delta[i + 1].y * this.bi[i]);
        }
      },
	
	getDecimatedVertices: function(step,doAddFinalVertex){
		if(doAddFinalVertex === undefined)doAddFinalVertex = true;
		if(this.vertices === undefined || this.vertices.length < 2){
			this.computeVertices(toxi.Spline2D.DEFAULT_RES);
		}
		var arcLen = this.getEstimatedArcLength();
		var uniform = [];
		var delta = step / arcLen;
		var currIdx = 0;
		for(var t =0; t<1.0; t+= delta){
			var currT = t * arcLen;
			while(currT >= this.arcLenIndex[currIdx]){
				currIdx++;
			}
			var p = this.vertices[currIdx - 1];
			var q = this.vertices[currIdx];
			var frac = ((currT - this.arcLenIndex[currIdx - 1]) / (this.arcLenIndex[currIdx] - this.arcLenIndex[currIdx - 1]));
			
			var i = p.interpolateTo(q,frac);
			this.uniform.push(i);
		}
		if(doAddFinalVertex){
			uniform.push(this.vertices[this.vertices.length-1]);
		}
		return uniform;
	},
	
	
	getEstimatedArcLength: function(){
		if(this.arcLenIndex === undefined || (this.arcLenIndex !== undefined && this.arcLenIndex.length != this.vertices.length)){
			this.arcLenIndex = [];
		}
		var arcLen = 0;
		for(var i=1;i<this.arcLenIndex.length;i++){
			var p = this.vertices[i-1];
			var q = this.vertices[i];
			arcLen += p.distanceTo(q);
			this.arcLenIndex[i] = arcLen;
		}
		return arcLen;
	},
	
	
	getNumPoints: function(){
		return this.numP;
	},
	
	getPointList: function(){
		return this.pointList;
	},
	
	getTightness: function(){
		return this.tightness;
	},
	
	setPointList: function(plist){
		this.pointList =plist.slice(0);
		return this;
	},
	
	setTightness: function(tight){
		this.tightness = tight;
		this.invTightness = 1 / this.tightness;
		return this;
	},
	
	updateCoefficients: function(){
		this.numP = this.pointList.length;
		if(this.points === undefined || (this.points !== undefined && this.points.length != this.numP)) {
			this.coeffA = [];
			this.delta = [];
			this.bi = [];
			for(var i=0;i<this.numP; i++){
				this.coeffA[i] = new toxi.Vec2D();
				this.delta[i] = new toxi.Vec2D();
			}
			this.setTightness(this.tightness);
		}
		this.points = this.pointList.slice(0);
	}

};

toxi.Spline2D.DEFAULT_TIGHTNESS = 0.25;
toxi.Spline2D.DEFAULT_RES = 16;/**
 * @class defines a 2D ellipse and provides several utility methods for it.
 * @member toxi
 * @augments toxi.Vec2D
 */

toxi.Ellipse = function(a,b,c,d) {
	this.radius = new toxi.Vec2D();
	if(arguments.length === 0){
		toxi.Vec2D.apply(this,[0,0]);
		this.setRadii(1,1);
	} else if(a instanceof toxi.Vec2D) {
		toxi.Vec2D.apply(this,[a.x,a.y]);
		if(b instanceof toxi.Vec2D){
			this.setRadii(b.x,b.y);
		} else {
			this.setRadii(b,c);
		}
	} else {
		if(d === undefined) {
			if(c === undefined) {
				toxi.Vec2D.apply(this,[0,0]);
				this.setRadii(a,b);
			} else {
				toxi.Vec2D.apply(this,[a,b]);
				this.setRadii(c,c);
			}
		} else {
			console.log("yup");
			toxi.Vec2D.apply(this,[a,b]);
			this.setRadii(c,d);
		}
	}
};

toxi.extend(toxi.Ellipse,toxi.Vec2D);

toxi.Ellipse.prototype.containsPoint = function(p) {
    var foci = this.getFoci();
    return p.distanceTo(foci[0]) + p.distanceTo(foci[1]) < 2 * toxi.MathUtils.max(this.radius.x, this.radius.y);
};

/**
 * Computes the area covered by the ellipse.
 * 
 * @return area
 */
toxi.Ellipse.prototype.getArea = function() {
    return toxi.MathUtils.PI * radius.x * radius.y;
};

/**
 * Computes the approximate circumference of the ellipse, using this
 * equation: <code>2 * PI * sqrt(1/2 * (rx*rx+ry*ry))</code>.
 * 
 * The precise value is an infinite series elliptical integral, but the
 * approximation comes sufficiently close. See Wikipedia for more details:
 * 
 * http://en.wikipedia.org/wiki/Ellipse
 * 
 * @return circumference
 */
toxi.Ellipse.prototype.getCircumference = function() {
    // wikipedia solution:
    // return (float) (MathUtils.PI * (3 * (radius.x + radius.y) - Math
    // .sqrt((3 * radius.x + radius.y) * (radius.x + 3 * radius.y))));
    return Math.sqrt(0.5 * this.radius.magSquared()) * toxi.MathUtils.TWO_PI;
};

/**
 * @return the focus
 */
toxi.Ellipse.prototype.getFoci = function() {
    var foci = [];
    if (this.radius.x > this.radius.y) {
        foci[0] = this.sub(this.focus, 0);
        foci[1] = this.add(this.focus, 0);
    } else {
        foci[0] = this.sub(0, this.focus);
        foci[1] = this.add(0, this.focus);
    }
    return foci;
};

/**
 * @return the 2 radii of the ellipse as a Vec2D
 */
toxi.Ellipse.prototype.getRadii = function() {
    return this.radius.copy();
};


/**
 * Sets the radii of the ellipse to the new values.
 * 
 * @param rx
 * @param ry
 * @return itself
 */
toxi.Ellipse.prototype.setRadii = function(rx,ry) {
	if(rx instanceof toxi.Vec2D){
		ry = rx.y;
		rx = rx.x;
	}
    this.radius.set(rx, ry);
    this.focus = this.radius.magnitude();
    return this;
};

/**
 * Creates a {@link Polygon2D} instance of the ellipse sampling it at the
 * given resolution.
 * 
 * @param res
 *            number of steps
 * @return ellipse as polygon
 */
toxi.Ellipse.prototype.toPolygon2D = function(res) {
    var poly = new toxi.Polygon2D();
    var step = toxi.MathUtils.TWO_PI / res;
    for (var i = 0; i < res; i++) {
		var v = toxi.Vec2D.fromTheta(i * step).scaleSelf(this.radius).addSelf(this);
		poly.add(v);
	}
    return poly;
};

/**
 * @class
 * @member toxi
 * @param {Number} [x]
 * @param {Number} [y]
 * @param {Number} [width]
 * @param {Number} [height]
 */
toxi.Rect = function(a,b,width,height){
	if(arguments.length == 2){ //then it should've been 2 Vec2D's
		if(!(a instanceof toxi.Vec2D)){
			throw new Error("toxi.Rect received incorrect parameters");
		} else {
			this.x = a.x;
			this.y = a.y;
			this.width = b.x - this.x;
			this.height = b.y - this.y;
		}
	} else if(arguments.length == 4){
		this.x = a;
		this.y = b;
		this.width = width;
		this.height = height;
	} else if(arguments.length == 1){ //object literal with x,y,width,height
		var o = arguments[0];
		if(o.x !== undefined && o.y !== undefined && o.width && o.height){
			this.x = o.x;
			this.y = o.y;
			this.width = o.width;
			this.height = o.height;
		}
	} else if(arguments.length > 0){
		throw new Error("toxi.Rect received incorrect parameters");
	}
};

toxi.Rect.fromCenterExtent = function(center,extent){
	return new toxi.Rect(center.sub(extent),center.add(extent));
};

toxi.Rect.prototype = {
	containsPoint: function(p){
		var px = p.x;
		var py = p.y;
		if(px < this.x || px >= this.x + this.width){
			return false;
		}
		if(py < this.y || py >= this.y + this.height){
			return false;
		}
		return true;
	},
	
	copy: function(){
		return new toxi.Rect(this.x,this.y,this.width,this.height);
	},
	
	getArea: function(){
		return this.width * this.height;
	},
	
	getAspect: function(){
		return this.width / this.height;
	},
	
	getBottom: function(){
		return this.y + this.height;
	},
	
	getBottomRight: function(){
		return new toxi.Vec2D(this.x + this.width, this.y + this.height);
	},
	
	getCentroid: function(){
		return new toxi.Vec2D(this.x + this.width * 0.5, this.y + this.height * 0.5);
	},
	
	getDimensions: function(){
		return new toxi.Vec2D(this.width,this.height);
	},
	
	getEdge: function(id){
		var edge;
		switch(id){
			case 0:
				edge = new toxi.Line2D(
					new toxi.Vec2D(this.x,this.y),
					new toxi.Vec2D(this.x + this.width, this.y)
				);
				break;
			case 1:
				edge = new toxi.Line2D(
					new toxi.Vec2D(this.x + this.width, this.y),
					new toxi.Vec2D(this.x + this.width, this.y + this.height)
				);
				break;
			case 2:
				edge = new toxi.Line2D(
					new toxi.Vec2D(this.x, this.y + this.height),
					new toxi.Vec2D(this.x + this.width, this.y + this.height)
				);
				break;
			case 3:
				edge = new toxi.Line2D(
					new toxi.Vec2D(this.x,this.y),
					new toxi.Vec2D(this.x,this.y+this.height)
				);
				break;
			default:
				throw new Error("edge ID needs to be 0...3");
		}
		return edge;	
	},
	
	getLeft: function(){
		return this.x;
	},
	
	getRight: function(){
		return this.x + this.width;
	},
	
	getTop: function(){
		return this.y;
	},
	
	getTopLeft: function(){
		return new toxi.Vec2D(this.x,this.y);
	},
	
	intersectsRay: function(ray,minDist,maxDist){ 
		//returns Vec2D of point intersection
		var invDir = ray.getDirection().reciprocal();
		var signDirX = invDir.x < 0;
		var signDirY = invDir.y < 0;
		var min = this.getTopLeft();
		var max = this.getBottomRight();
		var bbox = signDirX ? max : min;
		var tmin = (bbox.x - ray.x) * invDir.x;
		bbox = signDirX ? min : max;
		var tmax = (bbox.x - ray.x) * invDir.x;
		bbox = signDirY ? max : min;
		var tymin = (bbox.y - ray.y) * invDir.y;
		bbox = signDirY ? min : max;
		var tymax = (bbox.y - ray.y) * invDir.y;
		if((tmin > tymax) || (tymin > tmax)){
			return undefined;
		}
		if(tymin > tmin){
			tmin = tymin;
		}
		if (tymax < tmax) {
            tmax = tymax;
        }
        if ((tmin < maxDist) && (tmax > minDist)) {
            return ray.getPointAtDistance(tmin); 
        }
        return undefined;
	},
	
	intersectsRect: function(r){
		return !(this.x > r.x + r.width || this.x + this.width < r.x || this.y > r.y + r.height || this.y + this.height < r.y);
	},
	
	scale: function(s){
		var c = this.getCentroid();
		this.width *= s;
		this.height *= s;
		this.x = c.x - this.width * 0.5;
		this.y = c.y - this.height * 0.5;
		return this;
	},
	
	set: function(x,y,width,height){
		if(arguments.length == -1){
			this.y = x.y;
			this.width = x.width;
			this.height = x.height;
			this.x = x.x;
		} else if(arguments.length === 4) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		} else {
			throw new Error("toxi.Rect set() received wrong parameters");
		}
	},
	
	setDimenions: function(dim){
		this.width = dim.x;
		this.height = dim.y;
		return this;
	},
	
	setPosition: function(pos){
		this.x = pos.x;
		this.y = pos.y;
		return this;
	},
	
	toPolygon2D: function(){
		var poly = new toxi.Polygon2D();
		poly.add(new toxi.Vec2D(this.x,this.y));
		poly.add(new toxi.Vec2D(this.x+this.width,this.y));
		poly.add(new toxi.Vec2D(this.x+this.width,this.y+this.height));
		poly.add(new toxi.Vec2D(this.x,this.y+this.height));
		return poly;
	},
	
	toString: function(){
		return "rect: {x: "+this.x +", y: "+this.y+ ", width: "+this.width+ ", height: "+this.height+"}";
	},
	
	union: function(r){
		var tmp = MathUtils.max(this.x + this.width, r.x + r.width);
		this.x = MathUtils.min(this.x,r.x);
		this.width = tmp - this.x;
		tmp = MathUtils.max(this.y + this.height, r.y + r.height);
		this.y = MathUtils.min(this.y,r.y);
		this.height = tmp - this.y;
		return this;
	}
};




/**
 * @class This class overrides {@link Ellipse} to define a 2D circle and provides
 * several utility methods for it, including factory methods to construct
 * circles from points.
 * @member toxi
 * @augments toxi.Ellipse
 */
toxi.Circle = function(a,b,c) {
	if(arguments.length == 1){
		if(a instanceof toxi.Circle){
			toxi.Ellipse.apply(this,[a,a.radius.x]);
		} else {
			toxi.Ellipse.apply(this,[0,0,a]);
		}
	} else if(arguments.length == 2){
		toxi.Ellipse.apply(this,[a,b]);
	} else {
		console.log("hit");
		toxi.Ellipse.apply(this,[a,b,c,c]);
	}
};

toxi.extend(toxi.Circle,toxi.Ellipse);





/**
 * Factory method to construct a circle which has the two given points lying
 * on its perimeter. If the points are coincident, the circle will have a
 * radius of zero.
 * 
 * @param p1
 * @param p2
 * @return new circle instance
 */
toxi.Circle.from2Points = function(p1,p2) {
    var m = p1.interpolateTo(p2, 0.5);
    var distanceTo = m.distanceTo(p1);
    return new toxi.Circle(m, distanceTo);
};

/**
 * Factory method to construct a circle which has the three given points
 * lying on its perimeter. The function returns null, if the 3 points are
 * co-linear (in which case it's impossible to find a circle).
 * 
 * Based on CPP code by Paul Bourke:
 * http://local.wasp.uwa.edu.au/~pbourke/geometry/circlefrom3/
 * 
 * @param p1
 * @param p2
 * @param p3
 * @return new circle instance or null
 */
toxi.Circle.from3Points = function(p1,p2,p3) {
    var circle,
		deltaA = p2.sub(p1),
		deltaB = p3.sub(p2),
		centroid,
		radius;
	if (toxi.MathUtils.abs(deltaA.x) <= 0.0000001 && toxi.MathUtils.abs(deltaB.y) <= 0.0000001) {
		centroid = new toxi.Vec2D(p2.x + p3.x, p1.y + p2.y).scaleSelf(0.5);
		radius = centroid.distanceTo(p1);
		circle = new toxi.Circle(centroid, radius);
	} else {
		var aSlope = deltaA.y / deltaA.x;
		var bSlope = deltaB.y / deltaB.x;
		if (toxi.MathUtils.abs(aSlope - bSlope) > 0.0000001 && aSlope !== 0) {
			var x = (aSlope * bSlope * (p1.y - p3.y) + bSlope * (p1.x + p2.x) - aSlope * (p2.x + p3.x)) / (2 * (bSlope - aSlope));
			var y = -(x - (p1.x + p2.x) / 2) / aSlope + (p1.y + p2.y) / 2;
			centroid = new toxi.Vec2D(x, y);
			radius = centroid.distanceTo(p1);
			circle = new toxi.Circle(centroid, radius);
		}
	}
    return circle;
};




toxi.Circle.prototype.containsPoint = function(p) {
    return this.distanceToSquared(p) <= this.radius.x * this.radius.x;
};

toxi.Circle.prototype.getCircumference = function() {
    return toxi.MathUtils.TWO_PI * this.radius.x;
};

toxi.Circle.prototype.getRadius = function() {
    return this.radius.x;
};

toxi.Circle.prototype.getTangentPoints = function(p) {
    var m = this.interpolateTo(p, 0.5);
    return this.intersectsCircle(new toxi.Circle(m, m.distanceTo(p)));
};


toxi.Circle.prototype.intersectsCircle = function(c) {
    var res,
		delta = c.sub(this),
		d = delta.magnitude(),
		r1 = this.radius.x,
		r2 = c.radius.x;
    if (d <= r1 + r2 && d >= Math.abs(r1 - r2)) {
        var a = (r1 * r1 - r2 * r2 + d * d) / (2.0 * d);
        d = 1 / d;
        var p = this.add(delta.scale(a * d));
        var h = Math.sqrt(r1 * r1 - a * a);
        delta.perpendicular().scaleSelf(h * d);
        var i1 = p.add(delta);
        var i2 = p.sub(delta);
        res = [i1, i2 ];
    }
    return res;
};

toxi.Circle.prototype.setRadius = function(r) {
    this.setRadii(r, r);
    return this;
};

/**
 @class CircleIntersector
 @member toxi
 */
toxi.CircleIntersector = function(circle) {
    this.circle = circle;
    this.isec = undefined;
};

toxi.CircleIntersector.prototype = {

    getIntersectionData: function() {
        return this.isec;
    },

    intersectsRay: function(ray) {
        this.isec.clear();
        var q = circle.sub(ray),
        distSquared = q.magSquared(),
        v = q.dot(ray.getDirection()),
        r = circle.getRadius(),
        d = r * r - (distSquared - v * v);
        if (d >= 0.0) {
            this.isec.isIntersection = true;
            this.isec.dist = v -Math.sqrt(d);
            this.isec.pos = ray.getPointAtDistance(isec.dist);
            this.isec.normal = this.isec.pos.sub(this.circle).normalize();
        }
        return this.isec.isIntersection;
    }
};/**
 * @class A geometric definition of a cone (and cylinder as a special case) with
 * support for mesh creation/representation. The class is currently still
 * incomplete in that it doesn't provide any other features than the
 * construction of a cone shaped mesh.
 * @augments toxi.Vec3D
 * @member toxi
 * @param pos
 *            centre position
 * @param dir
 *            direction vector
 * @param rNorth
 *            radius on the side in the forward direction
 * @param rSouth
 *            radius on the side in the opposite direction
 * @param len
 *            length of the cone
 */
toxi.Cone = function(pos,dir,rNorth, rSouth,len) {
	toxi.Vec3D.apply(this,[pos]);
	this.dir = dir.getNormalized();
	this.radiusNorth = rNorth;
	this.radiusSouth = rSouth;
	this.length = len;
};

toxi.extend(toxi.Cone,toxi.Vec3D);

toxi.Cone.prototype.toMesh = function(args) {
	var opts = {
		mesh : undefined,
		steps : NaN,
		thetaOffset : 0,
		topClosed : true,
		bottomClosed : true
	};
	
		
	if ( arguments.length == 1) {
		if (typeof arguments[0] == 'object') {
			//##then it was a javascript option-object
			var optionsObject = arguments[0];
			opts.mesh = optionsObject.mesh;
			opts.steps = optionsObject.steps || optionsObject.resolution || optionsObject.res;
			opts.thetaOffset = optionsObject.thetaOffset || opts.thetaOffset;
			opts.topClosed = optionsObject.topClosed || opts.topClosed;
			opts.bottomClosed = optionsObject.bottomClosed || opts.bottomClosed;
		} else {
			opts.steps = arguments[0];
		}
	}
	else if ( arguments.length == 2 ) {
		opts.steps = arguments[0];
		opts.thetaOffset = arguments[1];
	}
	else if ( arguments.length == 5 ) {
		opts.mesh = arguments[0];
		opts.steps = arguments[1];
		opts.thetaOffset = arguments[2];
		opts.topClosed = arguments[3];
		opts.bottomClosed = arguments[4];
	}
	
	var c = this.add(0.01, 0.01, 0.01),
		n = c.cross(this.dir.getNormalized()).normalize(),
		halfAxis = this.dir.scale(this.length * 0.5),
		p = this.sub(halfAxis),
		q = this.add(halfAxis),
		south = [],
		north = [],
		phi = (Math.PI*2) / opts.steps;
	
	
	var i = 0;
	for(i=0;i<opts.steps;i++){
		var theta = i * phi + opts.thetaOffset;
		var nr = n.getRotatedAroundAxis(this.dir,theta);
			
		south[i] = nr.scale(this.radiusSouth).addSelf(p);
		north[i] = nr.scale(this.radiusNorth).addSelf(q);
	}
	
	
	var numV = opts.steps * 2 + 2,
		numF = opts.steps * 2 + (opts.topClosed ? opts.steps : 0) + (opts.bottomClosed ? opts.steps : 0),
		mesh = opts.mesh || new toxi.TriangleMesh("cone",numV,numF);

	for(i=0, j=1; i<opts.steps; i++, j++){
		if(j == opts.steps){
			j = 0;
		}
		mesh.addFace(south[i],north[i],south[j],undefined,undefined,undefined,undefined);
		mesh.addFace(south[j],north[i],north[j],undefined,undefined,undefined,undefined);
		if(opts.bottomClosed){
			mesh.addFace(p, south[i], south[j], undefined,undefined,undefined,undefined);
		}
		if(opts.topClosed){
			mesh.addFace(north[i], q, north[j], undefined,undefined,undefined,undefined);
		}
	}
	
	return mesh;
};
/**
 @class
 @member toxi
 */
toxi.Line2D = function( a, b) {
  this.a = a;
  this.b = b;
};


toxi.Line2D.prototype = {
    /**
     * Computes the closest point on this line to the point given.
     * 
     * @param p
     *            point to check against
     * @return closest point on the line
     */
    closestPointTo: function(p) {
        var v = this.b.sub(this.a);
        var t = p.sub(this.a).dot(v) / v.magSquared();
        // Check to see if t is beyond the extents of the line segment
        if (t < 0.0) {
            return this.a.copy();
        } else if (t > 1.0) {
            return this.b.copy();
        }
        // Return the point between 'a' and 'b'
        return this.a.add(v.scaleSelf(t));
    },

    copy: function() {
        return new toxi.Line2D(this.a.copy(), this.b.copy());
    },

   equals: function(obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof toxi.Line2D)) {
            return false;
        }
        var l = obj;
        return (this.a.equals(l.a) || this.a.equals(l.b)) && (this.b.equals(l.b) || this.b.equals(l.a));
    },

    getDirection: function() {
        return this.b.sub(this.a).normalize();
    },

    getLength: function() {
        return this.a.distanceTo(this.b);
    },

    getLengthSquared: function() {
        return this.a.distanceToSquared(this.b);
    },

    getMidPoint: function() {
        return this.a.add(this.b).scaleSelf(0.5);
    },

    getNormal: function() {
        return this.b.sub(this.a).perpendicular();
    },

    getTheta: function() {
        return this.a.angleBetween(this.b, true);
    },

    hasEndPoint: function(p) {
        return this.a.equals(p) || this.b.equals(p);
    },


    /**
     * Computes intersection between this and the given line. The returned value
     * is a {@link LineIntersection} instance and contains both the type of
     * intersection as well as the intersection point (if existing).
     * 
     * Based on: http://local.wasp.uwa.edu.au/~pbourke/geometry/lineline2d/
     * 
     * @param l
     *            line to intersect with
     * @return intersection result
     */
    intersectLine: function(l) {
		var isec,
			denom = (l.b.y - l.a.y) * (this.b.x - this.a.x) - (l.b.x - l.a.x) * (this.b.y - this.a.y),
			na = (l.b.x - l.a.x) * (this.a.y - l.a.y) - (l.b.y - l.a.y) * (this.a.x - l.a.x),
			nb = (this.b.x - this.a.x) * (this.a.y - l.a.y) - (this.b.y - this.a.y) * (this.a.x - l.a.x);
		if (denom !== 0) {
			var ua = na / denom,
				ub = nb / denom;
            if (ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0) {
                isec =new toxi.Line2D.LineIntersection(toxi.Line2D.LineIntersection.Type.INTERSECTING,this.a.interpolateTo(this.b, ua));
            } else {
                isec = new toxi.Line2D.LineIntersection(toxi.Line2D.LineIntersection.Type.NON_INTERSECTING, undefined);
            }
        } else {
            if (na === 0 && nb === 0) {
                isec = new toxi.Line2D.LineIntersection(toxi.Line2D.LineIntersection.Type.COINCIDENT, undefined);
            } else {
                isec = new toxi.Line2D.LineIntersection(toxi.Line2D.LineIntersection.Type.COINCIDENT, undefined);
            }
        }
        return isec;
    },

    offsetAndGrowBy: function(offset,scale, ref) {
		var m = this.getMidPoint();
		var d = this.getDirection();
		var n = d.getPerpendicular();
		if (ref !== undefined && m.sub(ref).dot(n) < 0) {
			n.invert();
		}
		n.normalizeTo(offset);
		this.a.addSelf(n);
		this.b.addSelf(n);
		d.scaleSelf(scale);
		this.a.subSelf(d);
		this.b.addSelf(d);
		return this;
    },

    scale: function(scale) {
        var delta = (1 - scale) * 0.5;
        var newA = a.interpolateTo(this.b, delta);
        this.b.interpolateToSelf(this.a, delta);
        this.a.set(newA);
        return this;
    },

    set: function(a, b) {
        this.a = a;
        this.b = b;
        return this;
    },

    splitIntoSegments: function(segments,stepLength,addFirst) {
        return toxi.Line2D.splitIntoSegments(this.a, this.b, stepLength, segments, addFirst);
    },

    toRay2D: function() {
        return new toxi.Ray2D(this.a.copy(), this.b.sub(this.a).normalize());
    }
};



/**
 * Splits the line between A and B into segments of the given length,
 * starting at point A. The tweened points are added to the given result
 * list. The last point added is B itself and hence it is likely that the
 * last segment has a shorter length than the step length requested. The
 * first point (A) can be omitted and not be added to the list if so
 * desired.
 * 
 * @param a
 *            start point
 * @param b
 *            end point (always added to results)
 * @param stepLength
 *            desired distance between points
 * @param segments
 *            existing array list for results (or a new list, if null)
 * @param addFirst
 *            false, if A is NOT to be added to results
 * @return list of result vectors
 */
toxi.Line2D.splitIntoSegments = function(a, b, stepLength, segments, addFirst) {
    if (segments === undefined) {
        segments = [];
    }
    if (addFirst) {
        segments.push(a.copy());
    }
    var dist = a.distanceTo(b);
    if (dist > stepLength) {
        var pos = a.copy();
        var step = b.sub(a).limit(stepLength);
        while (dist > stepLength) {
            pos.addSelf(step);
            segments.push(pos.copy());
            dist -= stepLength;
        }
    }
    segments.push(b.copy());
    return segments;
};


toxi.Line2D.LineIntersection = function(type, pos)
{
	this.type = type;
	this.pos = pos;
};

toxi.Line2D.LineIntersection.prototype = {
	getPos: function(){
		return this.pos.copy();
	},
	
	getType: function(){
		return this.type;
	},
	
	toString: function(){
		return "type: "+this.type+ " pos: "+this.pos;
	}	
};

toxi.Line2D.LineIntersection.Type = { COINCIDENT: 0, PARALLEL: 1, NON_INTERSECTING: 2, INTERSECTING: 3};
/**
 * @class
 * @member toxi
 * @param {toxi.Vec3D} a
 * @param {toxi.Vec3D} b
 * @param {toxi.Vec3D} c
 */
toxi.Triangle = function(a,b,c){
	if(arguments.length == 3){
		this.a = a;
		this.b = b;
		this.c = c;
	}
};

toxi.Triangle.createEquilateralFrom = function(a, b) {
    var c = a.interpolateTo(b, 0.5);
    var dir = b.sub(a);
    var n = a.cross(dir.normalize());
    c.addSelf(n.normalizeTo(dir.magnitude() * toxi.MathUtils.SQRT3 / 2));
    return new toxi.Triangle(a, b, c);
};

toxi.Triangle.isClockwiseInXY = function(a, b, c) {
	var determ = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
	return (determ < 0.0);
};

toxi.Triangle.isClockwiseInXZ = function(a, b,c) {
	var determ = (b.x - a.x) * (c.z - a.z) - (c.x - a.x) * (b.z - a.z);
	return (determ < 0.0);
};

toxi.Triangle.isClockwiseInYZ = function(a,b,c) {
    var determ = (b.y - a.y) * (c.z - a.z) - (c.y - a.y) * (b.z - a.z);
    return (determ < 0.0);
};


toxi.Triangle.prototype = {
	closestPointOnSurface: function(p) {
        var ab = this.b.sub(this.a);
        var ac = this.c.sub(this.a);
        var bc = this.c.sub(this.b);

        var pa = p.sub(this.a);
        var pb = p.sub(this.b);
        var pc = p.sub(this.c);

        var ap = a.sub(this.p);
        var bp = b.sub(this.p);
        var cp = c.sub(this.p);

        // Compute parametric position s for projection P' of P on AB,
        // P' = A + s*AB, s = snom/(snom+sdenom)
        var snom = pa.dot(ab);

        // Compute parametric position t for projection P' of P on AC,
        // P' = A + t*AC, s = tnom/(tnom+tdenom)
        var tnom = pa.dot(ac);

        if (snom <= 0.0 && tnom <= 0.0) {
            return this.a; // Vertex region early out
        }

        var sdenom = pb.dot(this.a.sub(this.b));
        var	tdenom = pc.dot(this.a.sub(this.c));

        // Compute parametric position u for projection P' of P on BC,
        // P' = B + u*BC, u = unom/(unom+udenom)
        var unom = pb.dot(bc);
        var udenom = pc.dot(this.b.sub(this.c));

        if (sdenom <= 0.0 && unom <= 0.0) {
            return this.b; // Vertex region early out
        }
        if (tdenom <= 0.0 && udenom <= 0.0) {
            return this.c; // Vertex region early out
        }

        // P is outside (or on) AB if the triple scalar product [N PA PB] <= 0
        var n = ab.cross(ac);
        var vc = n.dot(ap.crossSelf(bp));

        // If P outside AB and within feature region of AB,
        // return projection of P onto AB
        if (vc <= 0.0 && snom >= 0.0 && sdenom >= 0.0) {
            // return a + snom / (snom + sdenom) * ab;
            return this.a.add(ab.scaleSelf(snom / (snom + sdenom)));
        }

        // P is outside (or on) BC if the triple scalar product [N PB PC] <= 0
        var va = n.dot(bp.crossSelf(cp));
        // If P outside BC and within feature region of BC,
        // return projection of P onto BC
        if (va <= 0.0 && unom >= 0.0 && udenom >= 0.0) {
            // return b + unom / (unom + udenom) * bc;
            return this.b.add(bc.scaleSelf(unom / (unom + udenom)));
        }

        // P is outside (or on) CA if the triple scalar product [N PC PA] <= 0
        var vb = n.dot(cp.crossSelf(ap));
        // If P outside CA and within feature region of CA,
        // return projection of P onto CA
        if (vb <= 0.0 && tnom >= 0.0 && tdenom >= 0.0) {
            // return a + tnom / (tnom + tdenom) * ac;
            return this.a.add(ac.scaleSelf(tnom / (tnom + tdenom)));
        }

        // P must project inside face region. Compute Q using barycentric
        // coordinates
        var u = va / (va + vb + vc);
        var v = vb / (va + vb + vc);
        var w = 1.0 - u - v; // = vc / (va + vb + vc)
        // return u * a + v * b + w * c;
        return this.a.scale(u).addSelf(this.b.scale(v)).addSelf(this.c.scale(w));
    },
    
    computeCentroid: function() {
        this.centroid = this.a.add(this.b).addSelf(this.c).scaleSelf(1 / 3);
        return this.centroid;
    },
    
    computeNormal: function() {
        this.normal = this.a.sub(this.c).crossSelf(this.a.sub(this.b)).normalize();
        return this.normal;
    },
    
    containsPoint: function(p) {
        if (p.equals(this.a) || p.equals(this.b) || p.equals(this.c)) {
            return true;
        }
        var v1 = p.sub(this.a).normalize();
        var v2 = p.sub(this.b).normalize();
        var v3 = p.sub(this.c).normalize();

        var total_angles = Math.acos(v1.dot(v2));
        total_angles += Math.acos(v2.dot(v3));
        total_angles += Math.acos(v3.dot(v1));

        return (toxi.MathUtils.abs(total_angles - toxi.MathUtils.TWO_PI) <= 0.005);
    },

   flipVertexOrder: function() {
        var t = this.a;
        this.a = this.c;
        this.c = this.t;
        return this;
    },

    fromBarycentric: function(p) {
        return new toxi.Vec3D(this.a.x * p.x() + this.b.x * p.y() + this.c.x * p.z(), this.a.y * p.x() + this.b.y * p.y() + this.c.y * p.z(), this.a.z * p.x() + this.b.z * p.y() + this.c.z * p.z());
    },

    getBoundingBox: function() {
        var min = toxi.Vec3D.min(toxi.Vec3D.min(this.a, this.b), this.c);
        var max = toxi.Vec3D.max(toxi.Vec3D.max(this.a, this.b), this.c);
        return toxi.AABB.fromMinMax(min, max);
    },
    getClosestPointTo: function(p) {
        var edge = new toxi.Line3D(this.a, this.b);
        var Rab = edge.closestPointTo(p);
        var Rbc = edge.set(this.b, this.c).closestPointTo(p);
        var Rca = edge.set(this.c, this.a).closestPointTo(p);

        var dAB = p.sub(Rab).magSquared();
        var dBC = p.sub(Rbc).magSquared();
        var dCA = p.sub(Rca).magSquared();

        var min = dAB;
        var result = Rab;

        if (dBC < min) {
            min = dBC;
            result = Rbc;
        }
        if (dCA < min) {
            result = Rca;
        }

        return result;
    },

    isClockwiseInXY: function() {
        return toxi.Triangle.isClockwiseInXY(this.a, this.b, this.c);
    },

    isClockwiseInXZ: function() {
        return toxi.Triangle.isClockwiseInXY(this.a, this.b, this.c);
    },

    isClockwiseInYZ: function() {
        return toxi.Triangle.isClockwiseInXY(this.a, this.b, this.c);
    },
    
    set: function(a2, b2, c2) {
        this.a = a2;
        this.b = b2;
        this.c = c2;
    },

    toBarycentric: function(p) {
        var  e = b.sub(this.a).cross(this.c.sub(this.a));
        var  n = e.getNormalized();

        // Compute twice area of triangle ABC
        var areaABC = n.dot(e);
        // Compute lambda1
        var areaPBC = n.dot(this.b.sub(p).cross(this.c.sub(p)));
        var l1 = areaPBC / areaABC;

        // Compute lambda2
        var areaPCA = n.dot(this.c.sub(p).cross(this.a.sub(p)));
        var l2 = areaPCA / areaABC;

        // Compute lambda3
        var l3 = 1.0 - l1 - l2;

        return new toxi.Vec3D(l1, l2, l3);
    },

    toString: function() {
        return "Triangle: " + this.a + "," + this.b + "," + this.c;
    }

};/**
 * @class
 * @member toxi
 * @param {toxi.Vec2D} a
 * @param {toxi.Vec2D} b
 * @param {toxi.Vec2D} c
 */
toxi.Triangle2D = function(_a,_b,_c){
	if(arguments.length === 3){
		this.a = _a.copy();
		this.b = _b.copy();
		this.c = _c.copy();
	}
};

toxi.Triangle2D.createEquilateralFrom = function(a,b){
	var c = a.interpolateTo(b,0.5),
		dir = a.sub(b),
		n = dir.getPerpendicular();
		c.addSelf(n.normalizeTo(dir.magnitude() * toxi.MathUtils.SQRT3 / 2));
		return new toxi.Triangle2D(a,b,c);
};

toxi.Triangle2D.isClockwise = function(a,b,c){
	var determ = (b.x-a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
	return (determ < 0.0);
};


toxi.Triangle2D.prototype = {
	adjustTriangleSizeBy: function(offAB,offBC,offCA){
		if(arguments.length == 1){
			offBC = offAB;
			offCA = offAB;
		}
		this.computeCentroid();
		var ab = new toxi.Line2D(this.a.copy(),this.b.copy()).offsetAndGrowBy(offAB,100000,this.centroid);
		var bc = new toxi.Line2D(this.b.copy(),this.c.copy()).offsetAndGrowBy(offBC,100000,this.centroid);
		var ca = new toxi.Line2D(this.c.copy(),this.a.copy()).offsetAndGrowBy(offCA,100000,this.centroid);
		
		this.a = ab.intersectLine(ca).getPos();
		this.b = ab.intersectLine(bc).getPos();
		this.c = bc.intersectLine(ca).getPos();
		this.computeCentroid();
		return this;
	},
	
	computeCentroid: function(){
		this.centroid = this.a.add(this.b).addSelf(this.c).scaleSelf(1/3);
		return this.centroid;
	},
	/**
     * Checks if point vector is inside the triangle created by the points a, b
     * and c. These points will create a plane and the point checked will have
     * to be on this plane in the region between a,b,c.
     * 
     * Note: The triangle must be defined in clockwise order a,b,c
     * 
     * @return true, if point is in triangle.
     */
     containsPoint: function(_p){
		var v1 = _p.sub(this.a).normalize(),
			v2 = _p.sub(this.b).normalize(),
			v3 = _p.sub(this.c).normalize(),
			totalAngles = Math.acos(v1.dot(v2));
			totalAngles += Math.acos(v2.dot(v3));
			totalAngles += Math.acos(v3.dot(v1));
			return (toxi.MathUtils.abs(totalAngles- toxi.MathUtils.TWO_PI) <= 0.01);
     },
     
     copy: function(){
		return new toxi.Triangle2D(this.a.copy(),this.b.copy(),this.c.copy());
     },
     
     flipVertexOrder: function(){
		var t = this.a;
		this.a = this.c;
		this.c = t;
		return this;
     },
     
     getArea: function(){
		return this.b.sub(this.a).cross(this.c.sub(this.a)) * 0.5;
     },
     
     getBounds: function(){
		return new toxi.Rect(toxi.Vec2D.min(toxi.Vec2D.min(a,b),c),toxi.Vec2D.max(toxi.Vec2D.max(a,b),c));
     },
     
     getCircumCircle: function(){
		var cr = a.bisect(this.b).cross(this.b.bisect(this.c)),
			circa = new toxi.Vec2D(cr.x/cr.z, cr.y / cr.z),
			sa = this.a.distanceTo(this.b),
			sb = this.b.distanceTo(this.c),
			sc = this.c.distanceTo(this.a);
		var radius = sa * sb * sc / Math.sqrt((sa+sb+sc) * (-sa+sb+sc)*(sa-sb+sc)*(sa+sb-sc));
		return new toxi.Circle(circa,radius);
     },
     
     getCircumference: function(){
		return this.a.distanceTo(this.b) + this.b.distanceTo(this.c) + this.c.distanceTo(this.a);
     },
     
     getClosestPointTo: function(_p){
		var edge = new toxi.Line2D(this.a,this.b),
			Rab = edge.closestPointTo(_p),
			Rbc = edge.set(this.b,this.c).closestPointTo(_p),
			Rca = edge.set(this.c,this.a).closestPointTo(_p),
			dAB = _p.sub(Rab).magSquared(),
			dBC = _p.sub(Rbc).magSquared(),
			dCA = _p.sub(Rca).magSquared(),
			min = dAB,
			result = Rab;

		if(dBC < min){
			min = dBC;
			result = Rbc;
		}
		if(dCA < min){
			result = Rca;
		}
		return result;
	},
     
	intersectsTriangle: function(tri){
		if(this.containsPoint(tri.a) || this.containsPoint(tri.b) || this.containsPoint(tri.c)){
			return true;
		}
		if(tri.containsPoint(this.a) || tri.containsPoint(this.b) || tri.containsPoint(this.c)){
			return true;
		}
		var ea = [
			new toxi.Line2D(this.a,this.b),
			new toxi.Line2D(this.b,this.c),
			new toxi.Line2D(this.c,this.a)
		];
		var eb = [
			new toxi.Line2D(tri.a,tri.b),
			new toxi.Line2D(tri.b,tri.c),
			new toxi.Line2D(tri.c,tri.a)
		];
		for(var i=0,eaLen = ea.length;i<eaLen;i++){
			var la = ea[i];
			for(var j=0,ebLen = eb.length;j<ebLen;j++){
				var lb = eb[j];
				var type = la.intersectLine(lb).getType();
				if(type != toxi.Line2D.LineIntersection.Type.NON_INTERSECTING && type != toxi.Line2D.LineIntersection.Type.PARALLEL){
					return true;
				}
			}
		}
		return false;
	},
	
	isClockwise: function(){
		return toxi.Triangle2D.isClockwise(this.a,this.b,this.c);
	},
	
	set: function(a2,b2,c2){
		this.a = a2;
		this.b = b2;
		this.c = c2;
	},
	
	toPolygon2D: function(){
		var poly = new toxi.Polygon2D();
		poly.add(this.a.copy());
		poly.add(this.b.copy());
		poly.add(this.c.copy());
		return poly;
	},
	
	toString: function(){
		return "Triangle2D: "+this.a+ ","+this.b+","+this.c;
	}

};/**
 * @class
 * @member toxi
 */
toxi.IsectData2D = function(isec){
	if(isec !== undefined){
		this.isIntersection = isec.isIntersection;
		this.dist = isec.dist;
		this.pos = isec.pos.copy();
		this.dir = isec.dir.copy();
		this.normal = isec.normal.copy();
	}
	else {
		this.clear();
	}
};

toxi.IsectData2D.prototype = {
	clear: function(){
		this.isIntersection = false;
		this.dist = 0;
		this.pos = new toxi.Vec2D();
		this.dir = new toxi.Vec2D();
		this.normal = new toxi.Vec2D();
	},
	
	toString: function(){
		var s = "isec: "+this.isIntersection;
		if(this.isIntersection){
			s+= " at:"+this.pos+ " dist:"+this.dist+" normal:"+this.normal;
		}
		return s;
	}
};/**
 * @class
 * @member toxi
 */
toxi.IsectData3D = function(isec){
	if(isec !== undefined){
		this.isIntersection = isec.isIntersection;
		this.dist = isec.dist;
		this.pos = isec.pos.copy();
		this.dir = isec.dir.copy();
		this.normal = isec.normal.copy();
	}
	else {
		this.clear();
	}
};

toxi.IsectData3D.prototype = {
	clear: function(){
		this.isIntersection = false;
		this.dist = 0;
		this.pos = new toxi.Vec3D();
		this.dir = new toxi.Vec3D();
		this.normal = new toxi.Vec3D();
	},
	
	toString: function(){
		var s = "isec: "+this.isIntersection;
		if(this.isIntersection){
			s += " at:"+this.pos+ " dist:"+this.dist+" normal:"+this.normal;
		}
		return s;
	}
};(function(){
	/**
	 * @description Implements a simple row-major 4x4 matrix class, all matrix operations are
	 * applied to new instances. Use {@link #transpose()} to convert from
	 * column-major formats...
	 * @exports Matrix4x4 as toxi.Matrix4x4
	 * @constructor
	 */
	var Matrix4x4 = function(v11,v12,v13,v14,v21,v22,v23,v24,v31,v32,v33,v34,v41,v42,v43,v44){
		this.temp = [];
		this.matrix = [];
		var self = this;
		if(arguments.length === 0) { //if no variables were supplied
			this.matrix[0] = [1,0,0,0];
			this.matrix[1] = [0,1,0,0];
			this.matrix[2] = [0,0,1,0];
			this.matrix[3] = [0,0,0,1];
		} else if(v11 instanceof Number){ //if the variables were numbers
			var m1 = [v11,v12,v13,v14];
			var m2 = [v21,v22,v23,v24];
			var m3 = [v31,v32,v33,v34];
			var m4 = [v41,v42,v43,v44];
			this.matrix = [m1,m2,m3,m4];
		} else if(v11 instanceof Array) { //if it was sent in as one array
			var array = v11;
			if (array.length != 9 && array.length != 16) {
				throw new Error("Matrix4x4: Array length must == 9 or 16");
			}
			if (array.length == 16) {
				this.matrix = [];
				this.matrix[0] = array.slice(0,4);
				this.matrix[1] = array.slice(4,8);
				this.matrix[2] = array.slice(8,12);
				this.matrix[3] = array.slice(12);
			} else {
				this.matrix[0] = array.slice(0,3);
				this.matrix[0][3] = NaN;
				this.matrix[1] = array.slice(3,6);
				this.matrix[1][3] = NaN;
				this.matrix[2] = array.slice(6,9);
				this.matrix[2][3] = NaN;
				this.matrix[3] = [NaN,NaN,NaN,NaN];
			}
		} else if(v11 instanceof Matrix4x4){

		//else it should've been a Matrix4x4 that was passed in
			var m = v11,
				i = 0,
				j = 0,
				lenM,
				lenMM;

			if(m.matrix.length == 16){
				for(i=0;i<4;i++){
					this.matrix[i] = [m.matrix[i][0], m.matrix[i][1],m.matrix[i][2],m.matrix[i][3]];
				}
			} else {
				if(m.matrix.length == 4){
					lenM = m.matrix.length;
					for(i = 0; i < lenM; i++){
						lenMM = m.matrix[i].length;
						self.matrix[i] = [];
						for(j = 0; j < lenMM; j++){
							self.matrix[i][j] = m.matrix[i][j];
						}
					}
				}
				/*console.log("m.matrix.length: "+m.matrix.length);
				//should be a length of 9
				for(i=0;i<3;i++){
					this.matrix[i] = [m.matrix[i][0], m.matrix[i][1],m.matrix[i][2],NaN];
				}
				this.matrix[3] = [NaN,NaN,NaN,NaN];*/
			}
		} else {
			console.error("Matrix4x4: incorrect parameters used to construct new instance");
		}
	};
	
	Matrix4x4.prototype = {
		add: function(rhs) {
	        var result = new Matrix4x4(this);
	        return result.addSelf(rhs);
	    },
	
	    addSelf: function(m) {
	        for (var i = 0; i < 4; i++) {
	            var mi = this.matrix[i];
	            var rhsm = m.matrix[i];
	            mi[0] += rhsm[0];
	            mi[1] += rhsm[1];
	            mi[2] += rhsm[2];
	            mi[3] += rhsm[3];
	        }
	        return this;
	    },
	
	    /**
	     * Creates a copy of the given vector, transformed by this matrix.
	     * 
	     * @param v
	     * @return transformed vector
	     */
	    applyTo: function(v) {
	        return this.applyToSelf(new toxi.Vec3D(v));
	    },
	
	    applyToSelf: function(v) {
	        for (var i = 0; i < 4; i++) {
	            var m = this.matrix[i];
	            this.temp[i] = v.x * m[0] + v.y * m[1] + v.z * m[2] + m[3];
	        }
	        v.set(this.temp[0], this.temp[1], this.temp[2]).scaleSelf((1.0 / this.temp[3]));
	        return v;
	    },
	
	    copy: function() {
	        return new Matrix4x4(this);
	    },
	
	    getInverted: function() {
	        return new Matrix4x4(this).invert();
	    },
	
	    getRotatedAroundAxis: function(axis,theta) {
	        return new Matrix4x4(this).rotateAroundAxis(axis, theta);
	    },
	
	    getRotatedX: function(theta) {
	        return new Matrix4x4(this).rotateX(theta);
	    },
	
	    getRotatedY: function(theta) {
	        return new Matrix4x4(this).rotateY(theta);
	    },
	
	    getRotatedZ: function(theta) {
	        return new Matrix4x4(this).rotateZ(theta);
	    },
	
	    getTransposed: function() {
	        return new Matrix4x4(this).transpose();
	    },
	
	    identity: function() {
	        var m = this.matrix[0];
	        m[1] = m[2] = m[3] = 0;
	        m = this.matrix[1];
	        m[0] = m[2] = m[3] = 0;
	        m = this.matrix[2];
	        m[0] = m[1] = m[3] = 0;
	        m = this.matrix[3];
	        m[0] = m[1] = m[2] = 0;
	        this.matrix[0][0] = 1;
	        this.matrix[1][1] = 1;
	        this.matrix[2][2] = 1;
	        this.matrix[3][3] = 1;
	        return this;
	    },
	
	    /**
	     * Matrix Inversion using Cramer's Method Computes Adjoint matrix divided by
	     * determinant Code modified from
	     * http://www.intel.com/design/pentiumiii/sml/24504301.pdf
	     * 
	     * @return itself
	     */
		invert: function() {
	        var tmp = [], //12
				src = [], //16
				dst = [], //16
				mat = this.toArray(),
				i = 0;
	
	        for (i = 0; i < 4; i++) {
	            var i4 = i << 2;
	            src[i] = mat[i4];
	            src[i + 4] = mat[i4 + 1];
	            src[i + 8] = mat[i4 + 2];
	            src[i + 12] = mat[i4 + 3];
	        }
	
	        // calculate pairs for first 8 elements (cofactors)
	        tmp[0] = src[10] * src[15];
	        tmp[1] = src[11] * src[14];
	        tmp[2] = src[9] * src[15];
	        tmp[3] = src[11] * src[13];
	        tmp[4] = src[9] * src[14];
	        tmp[5] = src[10] * src[13];
	        tmp[6] = src[8] * src[15];
	        tmp[7] = src[11] * src[12];
	        tmp[8] = src[8] * src[14];
	        tmp[9] = src[10] * src[12];
	        tmp[10] = src[8] * src[13];
	        tmp[11] = src[9] * src[12];
	
	        // calculate first 8 elements (cofactors)
	        var src0 = src[0],
				src1 = src[1],
				src2 = src[2],
				src3 = src[3],
				src4 = src[4],
				src5 = src[5],
				src6 = src[6],
				src7 = src[7];
			dst[0] = tmp[0] * src5 + tmp[3] * src6 + tmp[4] * src7;
			dst[0] -= tmp[1] * src5 + tmp[2] * src6 + tmp[5] * src7;
			dst[1] = tmp[1] * src4 + tmp[6] * src6 + tmp[9] * src7;
			dst[1] -= tmp[0] * src4 + tmp[7] * src6 + tmp[8] * src7;
			dst[2] = tmp[2] * src4 + tmp[7] * src5 + tmp[10] * src7;
			dst[2] -= tmp[3] * src4 + tmp[6] * src5 + tmp[11] * src7;
			dst[3] = tmp[5] * src4 + tmp[8] * src5 + tmp[11] * src6;
			dst[3] -= tmp[4] * src4 + tmp[9] * src5 + tmp[10] * src6;
			dst[4] = tmp[1] * src1 + tmp[2] * src2 + tmp[5] * src3;
			dst[4] -= tmp[0] * src1 + tmp[3] * src2 + tmp[4] * src3;
			dst[5] = tmp[0] * src0 + tmp[7] * src2 + tmp[8] * src3;
			dst[5] -= tmp[1] * src0 + tmp[6] * src2 + tmp[9] * src3;
			dst[6] = tmp[3] * src0 + tmp[6] * src1 + tmp[11] * src3;
			dst[6] -= tmp[2] * src0 + tmp[7] * src1 + tmp[10] * src3;
			dst[7] = tmp[4] * src0 + tmp[9] * src1 + tmp[10] * src2;
			dst[7] -= tmp[5] * src0 + tmp[8] * src1 + tmp[11] * src2;
	
	        // calculate pairs for second 8 elements (cofactors)
			tmp[0] = src2 * src7;
			tmp[1] = src3 * src6;
			tmp[2] = src1 * src7;
			tmp[3] = src3 * src5;
			tmp[4] = src1 * src6;
			tmp[5] = src2 * src5;
			tmp[6] = src0 * src7;
			tmp[7] = src3 * src4;
			tmp[8] = src0 * src6;
			tmp[9] = src2 * src4;
			tmp[10] = src0 * src5;
			tmp[11] = src1 * src4;
	
	        // calculate second 8 elements (cofactors)
			src0 = src[8];
			src1 = src[9];
			src2 = src[10];
			src3 = src[11];
			src4 = src[12];
			src5 = src[13];
			src6 = src[14];
			src7 = src[15];
			dst[8] = tmp[0] * src5 + tmp[3] * src6 + tmp[4] * src7;
			dst[8] -= tmp[1] * src5 + tmp[2] * src6 + tmp[5] * src7;
			dst[9] = tmp[1] * src4 + tmp[6] * src6 + tmp[9] * src7;
			dst[9] -= tmp[0] * src4 + tmp[7] * src6 + tmp[8] * src7;
			dst[10] = tmp[2] * src4 + tmp[7] * src5 + tmp[10] * src7;
			dst[10] -= tmp[3] * src4 + tmp[6] * src5 + tmp[11] * src7;
			dst[11] = tmp[5] * src4 + tmp[8] * src5 + tmp[11] * src6;
			dst[11] -= tmp[4] * src4 + tmp[9] * src5 + tmp[10] * src6;
			dst[12] = tmp[2] * src2 + tmp[5] * src3 + tmp[1] * src1;
			dst[12] -= tmp[4] * src3 + tmp[0] * src1 + tmp[3] * src2;
			dst[13] = tmp[8] * src3 + tmp[0] * src0 + tmp[7] * src2;
			dst[13] -= tmp[6] * src2 + tmp[9] * src3 + tmp[1] * src0;
			dst[14] = tmp[6] * src1 + tmp[11] * src3 + tmp[3] * src0;
			dst[14] -= tmp[10] * src3 + tmp[2] * src0 + tmp[7] * src1;
			dst[15] = tmp[10] * src2 + tmp[4] * src0 + tmp[9] * src1;
			dst[15] -= tmp[8] * src1 + tmp[11] * src2 + tmp[5] * src0;
	
			var det = 1.0 / (src[0] * dst[0] + src[1] * dst[1] + src[2] * dst[2] + src[3] * dst[3]);
			for (i = 0, k = 0; i < 4; i++) {
				var m = this.matrix[i];
				for (var j = 0; j < 4; j++) {
					m[j] = dst[k++] * det;
				}
			}
			return this;
	    },
	
	    multiply: function(a) {
			if(typeof(a) == "number"){
				return new Matrix4x4(this).multiply(a);
			}
			//otherwise it should be a Matrix4x4
			return new Matrix4x4(this).multiplySelf(a);
	    },
	
	    multiplySelf: function(a) {
			var i = 0,
				m;
			if(typeof(a) == "number"){
				for (i = 0; i < 4; i++) {
					m = this.matrix[i];
					m[0] *= a;
					m[1] *= a;
					m[2] *= a;
					m[3] *= a;
				}
				return this;
			}
			//otherwise it should be a matrix4x4
			var mm0 = a.matrix[0],
				mm1 = a.matrix[1],
				mm2 = a.matrix[2],
				mm3 = a.matrix[3];
	        for (i = 0; i < 4; i++) {
	            m = this.matrix[i];
	            for (var j = 0; j < 4; j++) {
	                this.temp[j] = m[0] * mm0[j] + m[1] * mm1[j] + m[2] * mm2[j] + m[3] * mm3[j];
	            }
	            m[0] = this.temp[0];
	            m[1] = this.temp[1];
	            m[2] = this.temp[2];
	            m[3] = this.temp[3];
	        }
	        return this;
	    },
	    /**
	     * Applies rotation about arbitrary axis to matrix
	     * 
	     * @param axis
	     * @param theta
	     * @return rotation applied to this matrix
	     */
	    rotateAroundAxis: function(axis, theta) {
	        var x, y, z, s, c, t, tx, ty;
	        x = axis.x;
	        y = axis.y;
	        z = axis.z;
	        s = Math.sin(theta);
	        c = Math.cos(theta);
	        t = 1 - c;
	        tx = t * x;
	        ty = t * y;
			_TEMP.set(
				tx * x + c, tx * y + s * z, tx * z - s * y, 0, tx * y - s * z,
				ty * y + c, ty * z + s * x, 0, tx * z + s * y, ty * z - s * x,
				t * z * z + c, 0, 0, 0, 0, 1
			);
	        return this.multiplySelf(_TEMP);
	    },
	
	    /**
	     * Applies rotation about X to this matrix.
	     * 
	     * @param theta
	     *            rotation angle in radians
	     * @return itself
	     */
	    rotateX: function(theta) {
	        _TEMP.identity();
	        _TEMP.matrix[1][1] = _TEMP.matrix[2][2] = Math.cos(theta);
	        _TEMP.matrix[2][1] = Math.sin(theta);
	        _TEMP.matrix[1][2] = -_TEMP.matrix[2][1];
	        return this.multiplySelf(_TEMP);
	    },
	
	    /**
	     * Applies rotation about Y to this matrix.
	     * 
	     * @param theta
	     *            rotation angle in radians
	     * @return itself
	     */
	    rotateY: function(theta) {
	        _TEMP.identity();
	        _TEMP.matrix[0][0] = _TEMP.matrix[2][2] = Math.cos(theta);
	        _TEMP.matrix[0][2] = Math.sin(theta);
	        _TEMP.matrix[2][0] = -_TEMP.matrix[0][2];
	        return this.multiplySelf(_TEMP);
	    },
	
	    // Apply Rotation about Z to Matrix
	    rotateZ: function(theta) {
	        _TEMP.identity();
	        _TEMP.matrix[0][0] = _TEMP.matrix[1][1] = Math.cos(theta);
	        _TEMP.matrix[1][0] = Math.sin(theta);
	        _TEMP.matrix[0][1] = -_TEMP.matrix[1][0];
	        return this.multiplySelf(_TEMP);
	    },
	
	    scale: function(a,b,c) {
			return new Matrix4x4(this).scaleSelf(a,b,c);
	    },
	
	    scaleSelf: function(a,b,c) {
			if(a instanceof Object){
				b = a.y;
				c = a.z;
				a = a.x;
			} else if(b === undefined || c === undefined) {
				b = a;
				c = a;
			}
	        _TEMP.identity();
	        _TEMP.matrix[0][0] = a;
	        _TEMP.matrix[1][1] = b;
	        _TEMP.matrix[2][2] = c;
	        return this.multiplySelf(_TEMP);
	    },
	
		set: function(a,b,c, d, e,f,g, h, i, j, k, l, m, n, o, p) {
			var mat;
			if(typeof(a) == "number"){
				mat = this.matrix[0];
				mat[0] = a;
				mat[1] = b;
				mat[2] = c;
				mat[3] = d;
				mat = this.matrix[1];
				mat[0] = e;
				mat[1] = f;
				mat[2] = g;
				mat[3] = h;
				mat = this.matrix[2];
				mat[0] = i;
				mat[1] = j;
				mat[2] = k;
				mat[3] = l;
				mat = this.matrix[3];
				mat[0] = m;
				mat[1] = n;
				mat[2] = o;
				mat[3] = p;
			} else {
				//it must be a matrix4x4
				for (var it_n = 0; it_n < 4; it_n++) {
		            mat = this.matrix[it_n];
					var mat_n = mat.matrix[it_n];
					mat[0] = mat_n[0];
					mat[1] = mat_n[1];
					mat[2] = mat_n[2];
					mat[3] = mat_n[3];
				}
			}
			return this;
	    },

	    setFrustrum: function(left,right,top,bottom,near,far){
	    	var rl = (right - left),
	    		tb = (top - bottom),
	    		fn = (far - near);
	    	

	    	return this.set(
	    		(2.0 * near) / rl,
	    		0,
	    		(left + right) / rl,
	    		0,
	    		0,
	    		(2.0 * near) / tb,
	    		(top + bottom) / tb,
	    		0,
	    		0,
	    		0,
	    		-(near + far) / fn,
	    		(-2 * near * far) / fn,
	    		0,
	    		0,
	    		-1,
	    		0
	    	);	
	    },

	    setOrtho: function(left,right,top,bottom,near,far){
	    	var mat = [
	    		2.0 / (right - left),
	    		0, 
	    		0, 
	    		(left + right) / (right - left),
                0, 
                2.0 / (top - bottom), 
                0, 
                (top + bottom) / (top - bottom), 
                0,
                0,
                -2.0 / (far - near), 
                (far + near) / (far - near), 
                0, 
                0, 
                0, 
                1
	    	];

	    	return this.set.apply(this,mat);
	    },

	    setPerspective: function(fov,aspect,near,far){
	    	var y = near * Math.tan(0.5 * toxi.MathUtils.radians(fov)),
	    		x = aspect * y;
	    	return this.setFrustrum(-x,x,y,-y,near,far);	
	    },

	    setPosition: function(x,y,z){
	    	this.matrix[0][3] = x;
	    	this.matrix[1][3] = y;
	    	this.matrix[2][3] = z;
	    	return this;	
	    },

	    setScale: function(sX,sY,sZ){
	    	this.matrix[0][0] = sX;
	    	this.matrix[1][1] = sY;
	    	this.matrix[2][2] = sZ;
	    	return this;	
	    },
	
	   
	    sub: function(m) {
			return new Matrix4x4(this).subSelf(m);
	    },
	
	    subSelf: function(mat) {
	        for (var i = 0; i < 4; i++) {
	            var m = this.matrix[i];
	            var n = mat.matrix[i];
	            m[0] -= n[0];
	            m[1] -= n[1];
	            m[2] -= n[2];
	            m[3] -= n[3];
	        }
	        return this;
	    },
	
	    /**
	     * Copies all matrix elements into an linear array.
	     * 
	     * @param result
	     *            array (or null to create a new one)
	     * @return matrix as 16 element array
	     */
	    toArray: function(result) {
	        if (result === undefined) {
	            result = [];
	        }
	        for (var i = 0, k = 0; i < 4; i++) {
	            var m = this.matrix[i];
	            for (var j = 0; j < 4; j++) {
	                result[k++] = m[j];
	            }
	        }
	        return result;
	    },
	
	    toFloatArray:function(result) {
	        return new Float32Array(this.toArray(result));
	    },
	
	    /*
	     * (non-Javadoc)
	     * 
	     * @see java.lang.Object#toString()
	     */
	    toString: function() {
	        return "| " + this.matrix[0][0] + " " + this.matrix[0][1] + " " + this.matrix[0][2] + " " + this.matrix[0][3] + " |\n" + "| " + this.matrix[1][0] + " " + this.matrix[1][1] + " " + this.matrix[1][2] + " " + this.matrix[1][3] + " |\n" + "| " + this.matrix[2][0] + " " + this.matrix[2][1] + " " + this.matrix[2][2] + " " + this.matrix[2][3] + " |\n" + "| " + this.matrix[3][0] + " " + this.matrix[3][1] + " " + this.matrix[3][2] + " " + this.matrix[3][3] + " |";
	    },
	
	    toTransposedFloatArray: function(result) {
	        if (result === undefined) {
	            result = [];
	        }
	        for (var i = 0, k = 0; i < 4; i++) {
	            for (var j = 0; j < 4; j++) {
	                result[k++] = this.matrix[j][i];
	            }
	        }
	        return result;
	    },
	
	    translate: function(dx,dy,dz) {
			return new Matrix4x4(this).translateSelf(dx, dy, dz);
	    },
	
	    translateSelf: function( dx, dy, dz) {
			if(dx instanceof Object){
				dy = dx.y;
				dz = dx.z;
				dx = dx.x;
			}
			_TEMP.identity();
			_TEMP.setPosition(dx,dy,dz);
			return this.multiplySelf(_TEMP);
	    },
	
	    /**
	     * Converts the matrix (in-place) between column-major to row-major order
	     * (and vice versa).
	     * 
	     * @return itself
	     */
	    transpose: function() {
	        return this.set(
				this.matrix[0][0], this.matrix[1][0], this.matrix[2][0], this.matrix[3][0],
				this.matrix[0][1], this.matrix[1][1], this.matrix[2][1], this.matrix[3][1],
				this.matrix[0][2], this.matrix[1][2], this.matrix[2][2], this.matrix[3][2],
				this.matrix[0][3], this.matrix[1][3], this.matrix[2][3], this.matrix[3][3]
			);
		}
	};
	
	//private temp matrix
	var _TEMP = new Matrix4x4();
	toxi.Matrix4x4 = Matrix4x4;

}());
/**
 * @class
 * @member toxi
 */
toxi.Quaternion = function (qw,vx,y,z){
	if(arguments.length == 4){
		this.w = qw;
		this.x = vx;
		this.y = y;
		this.z = z;
	} else if(arguments.length == 2){
		this.x = vx.x;
		this.y = vx.y;
		this.z = vx.z;
		this.w = qw;
	} else if(arguments.length == 1) {
		this.w = q.w;
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
	}
};


toxi.Quaternion.prototype = {
	add: function(q){
		return new toxi.Quaternion(this.x + q.x, this.y + q.y, this.z + q.z, this.w + q.w);
	},
	addSelf: function(q){
		this.x += q.x;
		this.y += q.y;
		this.z += q.z;
		return this;
	},
	copy: function(){
		return new Quaternion(this.w,this.x,this.y,this.z);
	},
	dot: function(q){
		return (this.x * q.x) + (this.y * q.y) + (this.z * q.z) + (this.w * q.w);
	},
	getConjugate: function(){
		var q = new toxi.Quaternion();
		q.x = -this.x;
		q.y = -this.y;
		q.z = -this.z;
		q.w = w;
		return q;
	},
	identity: function(){
		this.w = 1.0;
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
		return this;
	},
	interpolateTo: function(target,t,is){
		return (arguments.length == 3) ? this.copy().interpolateTo(target,is.interpolate(0,1,t)) : this.copy().interpolateToSelf(target,t);
	},
	interpolateToSelf: function(target,t,is){
		if(arguments.length == 3){
			t = is.interpolate(0,1,t);
		}
		var scale,
			invscale,
			dot = toxi.MathUtils.clip(this.dot(target),-1,1);
			if((1.0-dot) >= toxi.MathUtils.EPS){
				var theta = Math.acos(dot);
				var invsintheta = 1.0 / Math.sin(theta);
				scale = (Math.sin(theta *(1.0 - t)) * invsintheta);
				invscale = (Math.sin(theta * t) * invsintheta);
			} else {
				scale = 1 - t;
				invscale = t;
			}
			if(dot < 0.0){
				this.w = scale * this.w - invscale * target.w;
				this.x = scale * this.x - invscale * target.x;
				this.y = scale * this.y - invscale * target.y;
				this.z = scale * this.z - invscale * target.z;
			} else {
				this.w = scale * w + invscale * target.w;
				this.x = scale * x + invscale * target.x;
				this.y = scale * y + invscale * target.y;
				this.z = scale * z + invscale * target.z;
			}
			return this;
	},
	magnitude: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	},
	multiply: function(q2){
		var res = new toxi.Quaternion();
		res.w = this.w * q2.w - x * q2.x - y * q2.y - z * q2.z;
		res.x = this.w * q2.x + x * q2.w + y * q2.z - z * q2.y;
		res.y = this.w * q2.y + y * q2.w + z * q2.x - x * q2.z;
		res.z = this.w * q2.z + z * q2.w + x * q2.y - y * q2.x;
		
		return res;
	},
	normalize: function(){
		var mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if(mag > toxi.MathUtils.EPS){
			mag = 1 / mag;
			this.x *= mag;
			this.y *= mag;
			this.z *= mag;
			this.w *= mag;
		}
		return this;
	},
	scale: function(t){
		return new toxi.Quaternion(this.x * t, this.y * t, this.z * t, this.w * t);
	},
	scaleSelf: function(t){
		this.x *= t;
		this.y *= t;
		this.z *= t;
		this.w *= t;
		return this;
	},
	set: function(w,x,y,z){
		if(arguments.length == 4){
			this.w = w;
			this.x = x;
			this.y = y;
			this.z = z;
		} else if(arguments.length == 2){
			this.w = w;
			this.x = v.x;
			this.y = v.y;
			this.z = v.z;
		}
		else { //must be 1
			this.w = q.w;
			this.x = q.x;
			this.y = q.y;
			this.z = q.z;
		}
		return this;
	},
	sub: function(q){
		return new toxi.Quaternion(this.x - q.x, this.y - q.y, this.z - q.z, this.w - q.w);
	},
	subSelf: function(q){
		this.x -= q.x;
		this.y -= q.y;
		this.z -= q.z;
		this.w -= q.w;
		return this;
	},
	toArray: function(){
		return [this.w,this.x,this.y,this.z];
	},
	toAxisAngle: function(){
		var res = [];
		var sa = Math.sqrt(1.0 - this.w * this.w);
		if(sa < toxi.MathUtils.EPS){
			sa = 1.0;
		} else {
			sa = 1.0 / sa;
		}
		res[0] = Math.acos(this.w) * 2.0;
		res[1] = this.x * sa;
		res[2] = this.y * sa;
		res[3] = this.z * sa;
		return res;
	},
	toMatrix4x4: function(result){
		if(result === undefined){
			result = new toxi.Matrix4x4();
		}
		var x2 = this.x + this.x;
		var y2 = this.y + this.y;
		var z2 = this.z + this.z;
		var xx = this.x * x2;
		var xy = this.x * y2;
		var xz = this.x * z2;
		var yy = this.y * y2;
		var yz = this.y * z2;
		var zz = this.z * z2;
		var wx = this.w * x2;
		var wy = this.w * y2;
		var wz = this.w * z2;
		
		var st = x2 +','+y2+','+z2+','+xx+','+xy+','+xz+','+yy+','+yz+','+zz+','+wx+','+wy+','+wz;
		return result.set(
			1 - (yy + zz), xy - wz, xz + wy, 0, xy + wz,
			1 - (xx + zz), yz - wx, 0, xz - wy, yz + wx, 1 - (xx + yy), 0,
			0, 0, 0, 1
		);
	},
	toString: function(){
		return "{axis: ["+this.x+","+this.y+","+this.z+"], w: "+this.w+"}";
	}
	
};

toxi.Quaternion.DOT_THRESHOLD = 0.9995;

toxi.Quaternion.createFromAxisAngle = function(axis,angle){
	angle *= 0.5;
	var sin = toxi.MathUtils.sin(angle),
		cos = toxi.MathUtils.cos(angle),
		q = new toxi.Quaternion(cos,axis.getNormalizedTo(sin));
	return q;
};

toxi.Quaternion.createFromEuler = function(pitch,yaw,roll){
	pitch *= 0.5;
	yaw *=0.5;
	roll *= 0.5;
	
	var sinPitch = toxi.MathUtils.sin(pitch),
		cosPitch = toxi.MathUtils.cos(pitch),
		sinYaw = toxi.MathUtils.sin(yaw),
		cosYaw = toxi.MathUtils.cos(yaw),
		sinRoll = toxi.MathUtils.sin(roll),
		cosRoll = toxi.MathUtils.cos(roll);
	
	var cosPitchCosYaw = cosPitch * cosYaw,
		sinPitchSinYaw = sinPitch * sinYaw;
		
		var q = new toxi.Quaternion();
		q.x = sinRoll * cosPitchCosYaw - cosRoll * sinPitchSinYaw;
		q.y = cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw;
		q.z = cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw;
		q.w = cosRoll * cosPitchCosYaw + sinRoll * sinPitchSinYaw;
		
		return q;
};

toxi.Quaternion.createFromMatrix = function(m){
	var s = 0.0;
	var q = [];
	var trace = m.matrix[0][0] + m.matrix[1][1] + m.matrix[2][2];
	
	if(trace > 0.0){
		s = Math.sqrt(trace + 1.0);
		q[3] = s * 0.5;
		s = 0.5 / s;
		q[0] = (m.matrix[1][2] - m.matrix[2][1] * s);
		q[1] = (m.matrix[2][0] - m.matrix[0][2] * s);
		q[2] = (m.matrix[0][1] - m.matrix[1][0] * s);
	} else {
		
		var nxt = [ 1, 2, 0 ];
        var i = 0, j = 0, k = 0;

        if (m.matrix[1][1] > m.matrix[0][0]) {
            i = 1;
        }

        if (m.matrix[2][2] > m.matrix[i][i]) {
            i = 2;
        }

        j = nxt[i];
        k = nxt[j];
        s = Math.sqrt((m.matrix[i][i] - (m.matrix[j][j] + m.matrix[k][k])) + 1.0);

        q[i] = s * 0.5;
        s = 0.5 / s;
        q[3] = (m.matrix[j][k] - m.matrix[k][j]) * s;
        q[j] = (m.matrix[i][j] + m.matrix[j][i]) * s;
        q[k] = (m.matrix[i][k] + m.matrix[k][i]) * s;
    }
    
     return new toxi.Quaternion(q[3],q[0],q[1],q[2]);
 };
 
 toxi.Quaternion.getAlignmentQuat = function(dir,forward){
		var target = dir.getNormalized(),
			axis = forward.cross(target),
			length = axis.magnitude() + 0.0001,
			angle = Math.atan2(length, forward.dot(target));
        return this.createFromAxisAngle(axis, angle);
 };/**
 * @class
 * @member toxi
 * @augments toxi.Vec3D
 */
toxi.Vertex = function(v,id) {
        toxi.Vec3D.apply(this,[v]);
        this.id = id;
        this.normal = new toxi.Vec3D();
};
toxi.extend(toxi.Vertex,toxi.Vec3D);

toxi.Vertex.prototype.addFaceNormal = function(n) {
    this.normal.addSelf(n);
};

toxi.Vertex.prototype.clearNormal = function() {
    this.normal.clear();
};

toxi.Vertex.prototype.computeNormal = function() {
    this.normal.normalize();
};

toxi.Vertex.prototype.toString = function() {
    return this.id + ": p: " + this.parent.toString.call(this) + " n:" + this.normal.toString();
};

/** 
 * @class
 * @member toxi
 */
toxi.Face = function(a,b,c,uvA,uvB,uvC) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = this.a.sub(this.c).crossSelf(this.a.sub(this.b)).normalize();
    this.a.addFaceNormal(this.normal);
    this.b.addFaceNormal(this.normal);
    this.c.addFaceNormal(this.normal);
    
    if(uvA !== undefined){
		this.uvA = uvA;
		this.uvB = uvB;
		this.uvC = uvC;
    }
};

toxi.Face.prototype = {
	computeNormal: function() {
        this.normal = this.a.sub(this.c).crossSelf(this.a.sub(this.b)).normalize();
    },

	flipVertexOrder: function() {
        var t = this.a;
        this.a = this.b;
        this.b = t;
        this.normal.invert();
    },
	
	getCentroid: function() {
        return this.a.add(this.b).addSelf(this.c).scale(1.0 / 3);
    },
    
    getClass: function(){
		return "toxi.Face";
	},

    getVertices: function(verts) {
        if (verts !== undefined) {
            verts[0] = this.a;
            verts[1] = this.b;
            verts[2] = this.c;
        } else {
            verts = [ this.a, this.b, this.c ];
        }
        return verts;
    },

    toString: function() {
        return this.getClass() + " " + this.a + ", " + this.b + ", " + this.c;
    },

    /**
     * Creates a generic {@link Triangle3D} instance using this face's vertices.
     * The new instance is made up of copies of the original vertices and
     * manipulating them will not impact the originals.
     * 
     * @return triangle copy of this mesh face
     */
    toTriangle: function() {
        return new toxi.Triangle3D(this.a.copy(), this.b.copy(), this.c.copy());
    }
};/**
 * @class
 * @member toxi
 */
toxi.TriangleMesh = function(name,numV,numF){
	if(name === undefined)name = "untitled";
	if(numV === undefined)numV = toxi.TriangleMesh.DEFAULT_NUM_VERTICES;
	if(numF === undefined)numF = toxi.TriangleMesh.DEFAULT_NUM_FACES;
	this.setName(name);
	this.matrix = new toxi.Matrix4x4();
	this.vertices = [];
	this.__verticesObject = {};
	this.faces = [];
	this.numVertices = 0;
	this.numFaces = 0;
	this.uniqueVertexID = -1;
	return this;
};


//statics
toxi.TriangleMesh.DEFAULT_NUM_VERTICES = 1000;
toxi.TriangleMesh.DEFAULT_NUM_FACES = 3000;
toxi.TriangleMesh.DEFAULT_STRIDE = 4;

toxi.TriangleMesh.prototype = {
	addFace: function(a,b,c,n,uvA,uvB,uvC){
	    if(uvC === undefined){ //then it wasnt the 7 param method
	        if(uvB === undefined){ //then it wasnt the 6 param method
	            //its either the 3 or 4 param method
	            if(uvA === undefined){
	                //3 param method
	                n = undefined;
	                uvA = undefined;
	                uvB = undefined;
	                uvC = undefined;
	            } else {
	                //4 param method
	                uvA = undefined;
	                uvB = undefined;
	                uvC = undefined;
	            }
	        } else {
	            //6 param method
	            //pass down the chain
	            uvC = uvB;
	            uvB = uvA;
	            uvA = n;
	        }
	    }
	    //7 param method
	    var va = this.__checkVertex(a);
	    var vb = this.__checkVertex(b);
	    var vc = this.__checkVertex(c);
	
	    if(va.id === vb.id || va.id === vc.id || vb.id === vc.id){
	        //console.log("ignoring invalid face: "+a + ", " +b+ ", "+c);
	    } else {
	        if(n !== undefined){
	            var nc = va.sub(vc).crossSelf(va.sub(vb));
	            if(n.dot(nc)<0){
	                var t = va;
	                va = vb;
	                vb = t;
	            }
	        }
	        var f = new toxi.Face(va,vb,vc,uvA,uvB,uvC);
	        //console.log(f.toString());
	        this.faces.push(f);
	        this.numFaces++;
	    }
	    return this;
	},
	
	addMesh: function(m){
	    var l = m.getFaces().length;
	    for(var i=0;i<l;i++){
	        var f = m.getFaces()[i];
	        this.addFace(f.a,f.b,f.c);
	    }
	    return this;
	},
	
	center: function(origin){
	    this.computeCentroid();
	    var delta = (origin !== undefined) ? origin.sub(this.centroid) : this.centroid.getInverted();
	    var l = this.vertices.length;
	    for(var i=0;i<l;i++){
	        var v = this.vertices[i];
	        v.addSelf(delta);
	    }
	    this.getBoundingBox();
	    return this.bounds;
	},
	
	__checkVertex: function(v){
		var vString = v.toString();
	    var vertex = this.__verticesObject[vString];
	    if(vertex === undefined){
	        vertex = this.createVertex(v,this.uniqueVertexID++);
	        this.__verticesObject[vString] = vertex;
	        this.vertices.push(vertex);
	        this.numVertices++;
	    } else {
	    	window.numDupes++;
	    }
	    return vertex;
	},
	
	clear: function(){
	    this.vertices = [];
	    this.faces = [];
	    this.bounds = undefined;
	    this.numVertices = 0;
	    this.numFaces = 0;
	    return this;
	},
	
	computeCentroid: function(){
	    this.centroid.clear();
	    var l = this.vertices.length;
	    for(var i=0;i<l;i++){
	        this.centroid.addSelf(this.vertices[i]);
	    }
	    return this.centroid.scaleSelf(1.0/this.numVertices).copy();
	},
	
	computeFaceNormals: function(){
	    var l = this.faces.length;
	    for(var i=0;i<l;i++){
	        this.faces[i].computeNormal();
	    }
	},
	
	computeVertexNormals: function(){
	    var l = this.vertices.length,
	        i = 0;
	    for(i=0;i<l;i++){
	        this.vertices[i].clearNormal();
	    }
	    l = this.faces.length;
	    for(i=0;i<l;i++){
	        var f = this.faces[i];
	        f.a.addFaceNormal(f);
	        f.b.addFaceNormal(f);
	        f.c.addFaceNormal(f);
	    }
	    l = this.vertices.length;
	    for(i=0;i<l;i++){
	        this.vertices[i].computeNormal();
	    }
	    return this;
	},
	
	copy: function(){
	    var m = new toxi.TriangleMesh(this.name+"-copy",this.numVertices,this.numFaces);
	    var l = this.faces.length;
	    for(var i=0;i<l;i++){
	        var f = this.faces[i];
	        m.addFace(f.a,f.b,f.c,f.normal,f.uvA,f.uvB,f.uvC);
	    }
	    return m;
	},
	
	createVertex: function(v,id){
	    return new toxi.Vertex(v,id);
	},
	
	faceOutwards: function(){
	    this.computeCentroid();
	    var l = this.faces.length;
	    for(var i=0;i<l;i++){
	        var f = this.faces[i];
	        var n = f.getCentroid().sub(this.centroid);
	        var dot = n.dot(f.normal);
	        if(dot <0) {
	            f.flipVertexOrder();
	        }
	    }
	    return this;
	},
	
	flipVertexOrder: function(){
	    var l = this.faces.length;
	    for(var i=0;i<l;i++){
	        var f = this.faces[i];
	        var t = f.a;
	        f.a = f.b;
	        f.b = t;
	        f.normal.invert();
	    }
	    return this;
	},
	
	flipYAxis: function(){
	    this.transform(new Matrix4x4().scaleSelf(1,-1,1));
	    this.flipVertexOrder();
	    return this;
	},
	
	getBoundingBox:function(){
	    var minBounds = toxi.Vec3D.MAX_VALUE.copy();
	    var maxBounds = toxi.Vec3D.MIN_VALUE.copy();
	    var l = this.vertices.length;
	    for(var i=0;i<l;i++){
	        this.minBounds.minSelf(v);
	        this.maxBounds.maxSelf(v);
	    }
	    this.bounds = toxi.AABB.fromMinMax(minBounds,maxBounds);
	    return this.bounds;
	},
	
	getBoundingSphere:function(){
	    var radius = 0;
	    this.computeCentroid();
	    var l = this.vertices.length;
	    for(var i=0;i<l;i++){
	        var v = this.vertices[i];
	        radius = toxi.MathUtils.max(radius,v.distanceToSquared(this.centroid));
	    }
	    return new toxi.Sphere(this.centroid,Math.sqrt(radius));
	},
	
	getClosestVertexToPoint: function(p){
	    var closest,
	        minDist = Number.MAX_VALUE,
	        l = this.vertices.length;
	    for(var i=0;i<l;i++){
	        var v = this.vertices[i];
	        var d = v.distanceToSquared(p);
	        if(d<minDist){
	            closest = v;
	            minDist = d;
	        }
	    }
	    return closest;
	},
	
	/**
	 * Creates an array of unravelled normal coordinates. For each vertex the
	 * normal vector of its parent face is used. This method can be used to
	 * translate the internal mesh data structure into a format suitable for
	 * OpenGL Vertex Buffer Objects (by choosing stride=4). For more detail,
	 * please see {@link #getMeshAsVertexArray(float[], int, int)}
	 * 
	 * @see #getMeshAsVertexArray(float[], int, int)
	 * 
	 * @param normals
	 *            existing float array or null to automatically create one
	 * @param offset
	 *            start index in array to place normals
	 * @param stride
	 *            stride/alignment setting for individual coordinates (min value
	 *            = 3)
	 * @return array of xyz normal coords
	 */
	getFaceNormalsAsArray: function(normals, offset, stride) {
	    if(arguments.length === 0){
	        normals = undefined;
	        offset = 0;
	        stride = toxi.TriangleMesh.DEFAULT_STRIDE;
	    } else if(arguments.length == 1 && arguments[0] instanceof Object){ //options object
	        var opts = arguments[0];
	        normals = opts.normals;
	        offset = opts.offset;
	        stride = opts.stride;
	    }
	    stride = toxi.MathUtils.max(stride, 3);
	    if (normals === undefined) {
	        normals = [];
	    }
	    var i = offset;
	    var l = this.faces.length;
	    for (var j=0;j<l;j++) {
	        var f = this.faces[j];
	        normals[i] = f.normal.x;
	        normals[i + 1] = f.normal.y;
	        normals[i + 2] = f.normal.z;
	        i += stride;
	        normals[i] = f.normal.x;
	        normals[i + 1] = f.normal.y;
	        normals[i + 2] = f.normal.z;
	        i += stride;
	        normals[i] = f.normal.x;
	        normals[i + 1] = f.normal.y;
	        normals[i + 2] = f.normal.z;
	        i += stride;
	    }
	    return normals;
	},
	
	getFaces: function() {
	    return this.faces;
	},
	
	/**
	 * Builds an array of vertex indices of all faces. Each vertex ID
	 * corresponds to its position in the {@link #vertices} HashMap. The
	 * resulting array will be 3 times the face count.
	 * 
	 * @return array of vertex indices
	 */
	getFacesAsArray: function() {
	    var faceList = [];
	    var i = 0;
	    var l = this.faces.length;
	    for (var j=0;j<l;j++) {
	        var f = this.faces[j];
	        faceList[i++] = f.a.id;
	        faceList[i++] = f.b.id;
	        faceList[i++] = f.c.id;
	    }
	    return faceList;
	},
	
	getIntersectionData: function() {
	    return this.intersector.getIntersectionData();
	},
	
	
	/**
	 * Creates an array of unravelled vertex coordinates for all faces. This
	 * method can be used to translate the internal mesh data structure into a
	 * format suitable for OpenGL Vertex Buffer Objects (by choosing stride=4).
	 * The order of the array will be as follows:
	 * 
	 * <ul>
	 * <li>Face 1:
	 * <ul>
	 * <li>Vertex #1
	 * <ul>
	 * <li>x</li>
	 * <li>y</li>
	 * <li>z</li>
	 * <li>[optional empty indices to match stride setting]</li>
	 * </ul>
	 * </li>
	 * <li>Vertex #2
	 * <ul>
	 * <li>x</li>
	 * <li>y</li>
	 * <li>z</li>
	 * <li>[optional empty indices to match stride setting]</li>
	 * </ul>
	 * </li>
	 * <li>Vertex #3
	 * <ul>
	 * <li>x</li>
	 * <li>y</li>
	 * <li>z</li>
	 * <li>[optional empty indices to match stride setting]</li>
	 * </ul>
	 * </li>
	 * </ul>
	 * <li>Face 2:
	 * <ul>
	 * <li>Vertex #1</li>
	 * <li>...etc.</li>
	 * </ul>
	 * </ul>
	 * 
	 * @param verts
	 *            an existing target array or null to automatically create one
	 * @param offset
	 *            start index in arrtay to place vertices
	 * @param stride
	 *            stride/alignment setting for individual coordinates
	 * @return array of xyz vertex coords
	 */
	getMeshAsVertexArray: function(verts, offset, stride) {
	    if(verts ===undefined){
	        verts = undefined;
	    }
	    if(offset === undefined){ 
	        offset = 0;
	    }
	    if(stride === undefined){
	        stride = toxi.TriangleMesh.DEFAULT_STRIDE;
	    }
	    stride = toxi.MathUtils.max(stride, 3);
	    if (verts === undefined) {
	        verts = [];
	    }
	    var i = 0,//offset
	        l = this.faces.length;
	    for (var j=0;j<l;++j) {
	        var f = this.faces[j];
	        verts[i] = f.a.x;
	        verts[i + 1] = f.a.y;
	        verts[i + 2] = f.a.z;
	        i += stride;
	        verts[i] = f.b.x;
	        verts[i + 1] = f.b.y;
	        verts[i + 2] = f.b.z;
	        i += stride;
	        verts[i] = f.c.x;
	        verts[i + 1] = f.c.y;
	        verts[i + 2] = f.c.z;
	        i += stride;
	    }
	    return verts;
	},
	
	getNumFaces: function() {
	    return this.numFaces;
	},
	
	getNumVertices: function() {
	    return this.numVertices;
	},
	
	getRotatedAroundAxis: function(axis,theta) {
	    return this.copy().rotateAroundAxis(axis, theta);
	},
	
	getRotatedX: function(theta) {
	    return this.copy().rotateX(theta);
	},
	
	getRotatedY: function(theta) {
	    return this.copy().rotateY(theta);
	},
	
	getRotatedZ: function(theta) {
	    return this.copy().rotateZ(theta);
	},
	
	getScaled: function(scale) {
	    return this.copy().scale(scale);
	},
	
	getTranslated: function(trans) {
	    return this.copy().translate(trans);
	},
	
	getUniqueVerticesAsArray: function() {
	    var verts = [];
	    var i = 0;
	    var l = this.vertices.length;
	    for (var j=0;i<l;j++) {
	        var v = this.vertices[j];
	        verts[i++] = v.x;
	        verts[i++] = v.y;
	        verts[i++] = v.z;
	    }
	    return verts;
	},
	
	getVertexAtPoint: function(v) {
		var index;
		for(var i=0;i<this.vertices.length;i++){
			if(this.vertices[i].equals(v)){
				index = i;
			}
		}
	    return this.vertices[index];
	},
	//my own method to help
	getVertexIndex: function(vec) {
	    var index = -1;
	    var l = this.vertices.length;
	    for(var i=0;i<l;i++)
	    {
	        var vert = this.vertices[i];
	        if(vert.equals(vec))
	        {
	            matchedVertex =i;
	        }
	    }
	    return matchedVertex;
	
	},
	
	getVertexForID: function(id) {
	    var vertex,
			l = this.vertices.length;
	    for (var i=0;i<l;i++) {
	        var v = this.vertices[i];
	        if (v.id == id) {
	            vertex = v;
	            break;
	        }
	    }
	    return vertex;
	},
	
	/**
	 * Creates an array of unravelled vertex normal coordinates for all faces.
	 * This method can be used to translate the internal mesh data structure
	 * into a format suitable for OpenGL Vertex Buffer Objects (by choosing
	 * stride=4). For more detail, please see
	 * {@link #getMeshAsVertexArray(float[], int, int)}
	 * 
	 * @see #getMeshAsVertexArray(float[], int, int)
	 * 
	 * @param normals
	 *            existing float array or null to automatically create one
	 * @param offset
	 *            start index in array to place normals
	 * @param stride
	 *            stride/alignment setting for individual coordinates (min value
	 *            = 3)
	 * @return array of xyz normal coords
	 */
	getVertexNormalsAsArray: function(normals, offset,stride) {
	    if(offset === undefined)offset = 0;
	    if(stride === undefined)stride = toxi.TriangleMesh.DEFAULT_STRIDE;
	    stride = toxi.MathUtils.max(stride, 3);
	    if (normals === undefined) {
	        normals = [];
	    }
	    var i = offset;
	    var l = this.faces.length;
	    for (var j=0;j<l;j++) {
	        var f = this.faces[j];
	        normals[i] = f.a.normal.x;
	        normals[i + 1] = f.a.normal.y;
	        normals[i + 2] = f.a.normal.z;
	        i += stride;
	        normals[i] = f.b.normal.x;
	        normals[i + 1] = f.b.normal.y;
	        normals[i + 2] = f.b.normal.z;
	        i += stride;
	        normals[i] = f.c.normal.x;
	        normals[i + 1] = f.c.normal.y;
	        normals[i + 2] = f.c.normal.z;
	        i += stride;
	    }
	    return normals;
	},
	
	getVertices: function() {
	    return this.vertices;
	},
	
	handleSaveAsSTL: function(stl,useFlippedY) {
	    /*f (useFlippedY) {
	        stl.setScale(new Vec3D(1, -1, 1));
	        for (Face f : faces) {
	            stl.face(f.a, f.b, f.c, f.normal, STLWriter.DEFAULT_RGB);
	        }
	    } else {
	        for (Face f : faces) {
	            stl.face(f.b, f.a, f.c, f.normal, STLWriter.DEFAULT_RGB);
	        }
	    }
	    stl.endSave();
	     console.log(numFaces + " faces written");
	    */
	    console.log("toxi.TriangleMesh.handleSaveAsSTL() currently not implemented");
	
	},
	
	
	intersectsRay: function(ray) {
	    var tri = this.intersector.getTriangle();
	    var l = this.faces.length;
	    for (var i =0;i<l;i++) {
	        tri.a = f.a;
	        tri.b = f.b;
	        tri.c = f.c;
	        if (this.intersector.intersectsRay(ray)) {
	            return true;
	        }
	    }
	    return false;
	},
	
	perforateFace: function(f, size) {
	    var centroid = f.getCentroid();
	    var d = 1 - size;
	    var a2 = f.a.interpolateTo(centroid, d);
	    var b2 = f.b.interpolateTo(centroid, d);
	    var c2 = f.c.interpolateTo(centroid, d);
	    this.removeFace(f);
	    this.addFace(f.a, b2, a2);
	    this.addFace(f.a, f.b, b2);
	    this.addFace(f.b, c2, b2);
	    this.addFace(f.b, f.c, c2);
	    this.addFace(f.c, a2, c2);
	    this.addFace(f.c, f.a, a2);
	    return new toxi.Triangle3D(a2, b2, c2);
	},
	
	 /**
	 * Rotates the mesh in such a way so that its "forward" axis is aligned with
	 * the given direction. This version uses the positive Z-axis as default
	 * forward direction.
	 * 
	 * @param dir
	 *            new target direction to point in
	 * @return itself
	 */
	pointTowards: function(dir) {
	    return this.transform( toxi.Quaternion.getAlignmentQuat(dir, toxi.Vec3D.Z_AXIS).toMatrix4x4(), true);
	},
	
	removeFace: function(f) {
	    var index = -1;
	    var l = this.faces.length;
	    for(var i=0;i<l;i++){
	        if(this.faces[i] == f){
	            index = i;
	            break;
	        }
	    }
	    if(index > -1){
	        this.faces.splice(index,1);
	    }
	},
	
	
	rotateAroundAxis: function(axis, theta) {
	    return this.transform(this.matrix.identity().rotateAroundAxis(axis, theta));
	},
	
	rotateX: function(theta) {
	    return this.transform(this.matrix.identity().rotateX(theta));
	},
	
	rotateY: function(theta) {
	    return this.transform(this.matrix.identity().rotateY(theta));
	},
	
	rotateZ: function(theta) {
	    return this.transform(this.matrix.identity().rotateZ(theta));
	},
	
	saveAsOBJ: function(obj) {
	    console.log("toxi.TriangleMesh.saveAsOBJ() currently not implemented");
	},
	
	saveAsSTL: function(a,b,c){
	    console.log("toxi.TriangleMesh.saveAsSTL() currently not implemented");
	},
	
	scale: function(scale) {
	    return this.transform(this.matrix.identity().scaleSelf(scale));
	},
	
	setName: function(name) {
	    this.name = name;
	    return this;
	},
	
	toString: function() {
	    return "toxi.TriangleMesh: " + this.name + " vertices: " + this.getNumVertices() + " faces: " + this.getNumFaces();
	},
	
	toWEMesh: function() {
	  /*  return new WETriangleMesh(name, vertices.size(), faces.size())
	            .addMesh(this);
	   */
	   console.log("toxi.TriangleMesh.toWEMesh() currently not implemented");
	},
	
	/** 
	* Applies the given matrix transform to all mesh vertices. If the 
	* updateNormals flag is true, all face normals are updated automatically, 
	* however vertex normals need a manual update. 
	* @param mat 
	* @param updateNormals 
	* @return itself 
	*/ 
    transform: function(mat,updateNormals) {
		if(updateNormals === undefined){
			updateNormals = true;
		}
		var l = this.vertices.length;
		for(var i=0;i<l;i++){
			var v = this.vertices[i];
			v.set(mat.applyTo(v));
		}
		if(updateNormals){
			this.computeFaceNormals();
		}
		return this;
    },
	
	updateVertex: function(orig,newPos) {
	    var vi = this.getVertexIndex(orig);
	    if (vi > -1) {
	        this.vertices.splice(v,1);
	        this.vertices[vi].set(newPos);
	        this.vertices.push(v);
	    }
	    return this;
	}
};/**
 * @class
 * @member toxi
 * @augments toxi.Vec3D
 */
toxi.Sphere = function(a,b){
	if(a === undefined){
		toxi.Vec3D.apply(this,[new toxi.Vec3D()]);
		this.radius = 1;
	}
	else if(a instanceof toxi.Vec3D){
		toxi.Vec3D.apply(this,[a]);
		if(a instanceof toxi.Sphere){
			this.radius = a.radius;
		}
		else {
			this.radius = b;
		}
	}
	else {
		toxi.Vec3D.apply(this,[new toxi.Vec3D()]);
		this.radius = a;
	}
};
toxi.extend(toxi.Sphere,toxi.Vec3D);


toxi.Sphere.prototype.containsPoint = function(p) {
	var d = this.sub(p).magSquared();
	return (d <= this.radius * this.radius);
};

/**
 * Alternative to {@link SphereIntersectorReflector}. Computes primary &
 * secondary intersection points of this sphere with the given ray. If no
 * intersection is found the method returns null. In all other cases, the
 * returned array will contain the distance to the primary intersection
 * point (i.e. the closest in the direction of the ray) as its first index
 * and the other one as its second. If any of distance values is negative,
 * the intersection point lies in the opposite ray direction (might be
 * useful to know). To get the actual intersection point coordinates, simply
 * pass the returned values to {@link Ray3D#getPointAtDistance(float)}.
 * 
 * @param ray
 * @return 2-element float array of intersection points or null if ray
 * doesn't intersect sphere at all.
 */
toxi.Sphere.prototype.intersectRay = function(ray) {
	var result,
		a,
		b,
		t,
		q = ray.sub(this),
		distSquared = q.magSquared(),
		v = -q.dot(ray.getDirection()),
		d = this.radius * this.radius - (distSquared - v * v);
	if (d >= 0.0) {
		d = Math.sqrt(d);
		a = v + d;
		b = v - d;
		if (!(a < 0 && b < 0)) {
			if (a > 0 && b > 0) {
				if (a > b) {
					t = a;
					a = b;
					b = t;
				}
			} else {
				if (b > 0) {
					t = a;
					a = b;
					b = t;
				}
			}
		}
		result = [a,b];
	}
	return result;
};

/**
 * Considers the current vector as centre of a collision sphere with radius
 * r and checks if the triangle abc intersects with this sphere. The Vec3D p
 * The point on abc closest to the sphere center is returned via the
 * supplied result vector argument.
 * 
 * @param t
 *			triangle to check for intersection
 * @param result
 *			a non-null vector for storing the result
 * @return true, if sphere intersects triangle ABC
 */
toxi.Sphere.prototype.intersectSphereTriangle = function(t,result) {
	// Find Vec3D P on triangle ABC closest to sphere center
	result.set(t.closestPointOnSurface(this));

	// Sphere and triangle intersect if the (squared) distance from sphere
	// center to Vec3D p is less than the (squared) sphere radius
	var v = result.sub(this);
	return v.magSquared() <= this.radius * this.radius;
};

/**
 * Calculates the normal vector on the sphere in the direction of the
 * current point.
 * 
 * @param q
 * @return a unit normal vector to the tangent plane of the ellipsoid in the
 * point.
 */
toxi.Sphere.prototype.tangentPlaneNormalAt = function(q) {
	return this.sub(q).normalize();
};

toxi.Sphere.prototype.toMesh = function() {
	//if one argument is passed it can either be a Number for resolution, or an options object
	//if 2 parameters are passed it must be a TriangleMesh and then a Number for resolution
	var opts = {
		mesh: undefined,
		resolution: 0
	};
	if(arguments.length === 1){
		if(arguments[0] instanceof Object){ //options object
			opts.mesh = arguments[0].mesh;
			opts.resolution = arguments[0].res || arguments[0].resolution;
		} else { //it was just the resolution Number
			opts.resolution = arguments[0];
		}
	} else {
		opts.mesh = arguments[0];
		opts.resolution = arguments[1];
	}
	var builder = new toxi.SurfaceMeshBuilder(new toxi.SphereFunction(this));
	return builder.createMesh(opts.mesh, opts.resolution, 1);
};
/**
 * @class
 * @member toxi
 */
toxi.VertexSelector = function(mesh){
	this.mesh = mesh;
	this.selection = [];
};

toxi.VertexSelector.prototype = {
	/**
     * Adds all vertices selected by the given selector to the current
     * selection. The other selector needs to be assigned to the same mesh
     * instance.
     * 
     * @param sel2 other selector
     * @return itself
     */

	addSelection: function(sel2){
		this.checkMeshIdentity(sel2.getMesh());
		this.selection.addAll(sel2.getSelection());
		return this;
	},
	
	/**
     * Utility function to check if the given mesh is the same instance as ours.
     * 
     * @param mesh2
     */
    checkMeshIdentity: function(mesh2) {
        if (mesh2 != this.mesh) {
            throw new Error("The given selector is not using the same mesh instance");
        }
    },
    
    clearSelection: function() {
        this.selection.clear();
        return this;
    },

	getMesh: function() {
        return this.mesh;
    },
    
    getSelection: function() {
        return this.selection;
    },
    /**
     * Creates a new selection of all vertices NOT currently selected.
     * 
     * @return itself
     */
    invertSelection: function() {
        var newSel = [];
        var vertices = mesh.getVertices();
        var l = vertices.length;
        for (var i=0;i<l;i++) {
			var v = vertices[i];
            if (!selection.contains(v)) {
                newSel.add(v);
            }
        }
        this.selection = newSel;
        return this;
    },

	/**
     * Selects vertices identical or closest to the ones given in the list of
     * points.
     * 
     * @param points
     * @return itself
     */
    selectSimilar: function(points) {
		var l = points.length;
        for (var i=0;i<l;i++) {
			var v = points[i];
            this.selection.add(this.mesh.getClosestVertexToPoint(v));
        }
        return this;
    },
    
     /**
     * Selects vertices using an implementation specific method. This is the
     * only method which needs to be implemented by any selector subclass.
     * 
     * @return itself
     */
   selectVertices: function(){
   return this;
   },
	
	setMesh: function(mesh) {
        this.mesh = mesh;
        this.clearSelection();
    },
    
    size: function() {
        return this.selection.size();
    },
	/**
     * Removes all vertices selected by the given selector from the current
     * selection. The other selector needs to be assigned to the same mesh
     * instance.
     * 
     * @param sel2
     *            other selector
     * @return itself
     */

	subtractSelection: function(sel2) {
        this.checkMeshIdentity(sel2.getMesh());
        this.selection.removeAll(sel2.getSelection());
        return this;
	}
};


   
  /**
 * @class
 * @member toxi
 * @augments toxi.VertexSelector
 */
toxi.BoxSelector = function(mesh,box) {
    toxi.VertexSelector.apply(this,[mesh]);
    this.box = box;
};
toxi.extend(toxi.BoxSelector,toxi.VertexSelector);

toxi.BoxSelector.prototype.selectVertices = function() {
    this.clearSelection();
    var verts = this.mesh.getVertices();
    var l = verts.length;
    for (var i=0;i<l;i++) {
		var v = verts[i];
        if (this.box.containsPoint(v)) {
            this.selection.add(v);
        }
    }
    return this;
};

/**
 * @class
 * @member toxi
 * @augments toxi.VertexSelector
 */
toxi.DefaultSelector = function(mesh){
	toxi.VertexSelector.apply(this,[mesh]);
};
toxi.extend(toxi.DefaultSelector,toxi.VertexSelector);	
toxi.DefaultSelector.prototype.selectVertices = function(){
	this.clearSelection();
	this.selection.addAll(this.mesh.getVertices());
	return this;
};


/**
 * @class
 * @member toxi
 * @augments toxi.VertexSelector
 */
toxi.PlaneSelector = function(mesh,plane,classifier, tolerance) {
    toxi.VertexSelector.apply(this,[mesh]);
    this.plane = plane;
    this.classifier = classifier;
    this.tolerances = (tolerance === undefined)? 0.0001 : tolerance;
};
toxi.extend(toxi.PlaneSelector,toxi.VertexSelector);
toxi.PlaneSelector.prototype.selectVertices = function() {
    this.clearSelection();
    var verts = this.mesh.getVertices();
    var l = verts.length;
    for (var i=0;i<l;i++) {
		var v = verts[i];
        if (this.plane.classifyPoint(v, this.tolerance) == this.classifier) {
            this.selection.add(v);
        }
    }
    return this;
};
/**
 * @class This implementation of a {@link SurfaceFunction} samples a given
 * {@link Sphere} instance when called by the {@link SurfaceMeshBuilder}.
 * @member toxi
 */
toxi.SphereFunction = function(sphere_or_radius) {
	if(sphere_or_radius === undefined){
		this.sphere = new toxi.Sphere(new toxi.Vec3D(),1);
	}
	if(sphere_or_radius instanceof toxi.Sphere){
		this.sphere = sphere_or_radius;
	}
	else{
		this.sphere = new toxi.Sphere(new toxi.Vec3D(),sphere_or_radius);
	}
	this.phiRange = toxi.MathUtils.PI;
	this.thetaRange = toxi.MathUtils.TWO_PI;
};

toxi.SphereFunction.prototype = {
	
	computeVertexFor: function(p,phi,theta) {
	    phi -= toxi.MathUtils.HALF_PI;
	    var cosPhi = toxi.MathUtils.cos(phi);
	    var cosTheta = toxi.MathUtils.cos(theta);
	    var sinPhi = toxi.MathUtils.sin(phi);
	    var sinTheta = toxi.MathUtils.sin(theta);
	    var t = toxi.MathUtils.sign(cosPhi) * toxi.MathUtils.abs(cosPhi);
	    p.x = t * toxi.MathUtils.sign(cosTheta) * toxi.MathUtils.abs(cosTheta);
	    p.y = toxi.MathUtils.sign(sinPhi) * toxi.MathUtils.abs(sinPhi);
	    p.z = t * toxi.MathUtils.sign(sinTheta) * toxi.MathUtils.abs(sinTheta);
	    return p.scaleSelf(this.sphere.radius).addSelf(this.sphere);
	},
	
	getPhiRange: function() {
	    return this.phiRange;
	},
	
	getPhiResolutionLimit: function(res) {
	    return res;
	},
	
	getThetaRange: function() {
	    return this.thetaRange;
	},
	
	getThetaResolutionLimit: function(res) {
	    return res;
	},
	
	setMaxPhi: function(max) {
	    this.phiRange = toxi.MathUtils.min(max / 2, toxi.MathUtils.PI);
	},
	
	setMaxTheta: function(max) {
	    this.thetaRange = toxi.MathUtils.min(max, toxi.MathUtils.TWO_PI);
	}
};/**
 * @class Spherical harmonics surface evaluator based on code by Paul Bourke:
 * http://local.wasp.uwa.edu.au/~pbourke/geometry/sphericalh/
 * @member toxi
 */
toxi.SphericalHarmonics = function(m) {
    this.m = m;
};

toxi.SphericalHarmonics.prototype = {

    // toxiclibs - FIXME check where flipped vertex order is coming from sometimes
    computeVertexFor: function(p,phi,theta) {
        var r = 0;
        r += Math.pow(toxi.MathUtils.sin(this.m[0] * theta), this.m[1]);
        r += Math.pow(toxi.MathUtils.cos(this.m[2] * theta), this.m[3]);
        r += Math.pow(toxi.MathUtils.sin(this.m[4] * phi), this.m[5]);
        r += Math.pow(toxi.MathUtils.cos(this.m[6] * phi), this.m[7]);

		var sinTheta = toxi.MathUtils.sin(theta);
        p.x = r * sinTheta * toxi.MathUtils.cos(phi);
        p.y = r * toxi.MathUtils.cos(theta);
        p.z = r * sinTheta * toxi.MathUtils.sin(phi);
        return p;
    },

    getPhiRange: function() {
        return toxi.MathUtils.TWO_PI;
    },

    getPhiResolutionLimit: function(res) {
        return res;
    },

    getThetaRange: function() {
        return toxi.MathUtils.PI;
    },

	getThetaResolutionLimit: function(res) {
        return res;
    }
};/**
 * @class
 * @member toxi
 */
toxi.SuperEllipsoid = function(n1,n2) {
	this.p1 = n1;
	this.p2 = n2;
};

toxi.SuperEllipsoid.prototype = {
	computeVertexFor: function(p,phi,theta) {
		phi -= toxi.MathUtils.HALF_PI;
		var cosPhi = toxi.MathUtils.cos(phi),
			cosTheta = toxi.MathUtils.cos(theta),
			sinPhi = toxi.MathUtils.sin(phi),
			sinTheta = toxi.MathUtils.sin(theta);

		var t = toxi.MathUtils.sign(cosPhi) * Math.pow(toxi.MathUtils.abs(cosPhi), this.p1);
		p.x = t * toxi.MathUtils.sign(cosTheta) * Math.pow(Math.abs(cosTheta), this.p2);
		p.y = toxi.MathUtils.sign(sinPhi) * Math.pow(Math.abs(sinPhi), this.p1);
		p.z = t * toxi.MathUtils.sign(sinTheta) * Math.pow(toxi.MathUtils.abs(sinTheta), this.p2);
		return p;
	},
 
	getPhiRange: function() {
		return toxi.MathUtils.TWO_PI;
	},

	getPhiResolutionLimit: function(res) {
		return res / 2;
	},

	getThetaRange: function() {
		return toxi.MathUtils.TWO_PI;
	},

	getThetaResolutionLimit: function(res) {
		return res;
	}
};/**
 * @class An extensible builder class for {@link TriangleMesh}es based on 3D surface
 * functions using spherical coordinates. In order to create mesh, you'll need
 * to supply a {@link SurfaceFunction} implementation to the builder.
 * @member toxi
 */
toxi.SurfaceMeshBuilder = function(func) {
	this.func = func;
};

toxi.SurfaceMeshBuilder.prototype = {
	/*
		create a mesh from a surface,
		parameter options:
			1 - Object options
			1 - Number resolution
			3 - TriangleMesh mesh, Number resolution, Number size
			4 - TriangleMesh mesh, Number resolution, Number size, boolean isClosed
	*/
	createMesh: function() {
		var opts = {
			mesh: undefined,
			resolution: 0,
			size: 1,
			isClosed: true
		};
		if(arguments.length === 1){
			if(arguments[0] instanceof Object){ //options object
				var arg = arguments[0];
				opts.mesh = arg.mesh;
				opts.resolution = arg.res || arg.resoultion;
				if(arg.size !== undefined){
					opts.size = arg.size;
				}
				if(arg.isClosed !== undefined){
					opts.isClosed = arg.isClosed;
				}
			} else { //resolution Number
				opts.resolution = arguments[0];
			}
		} else if(arguments.length > 2){
			opts.mesh = arguments[0];
			opts.resolution = arguments[1];
			opts.size = arguments[2];
			if(arguments.length == 4){
				opts.isClosed = arguments[3];
			}
		}
		var mesh = opts.mesh;
		if(mesh === undefined || mesh === null){
			mesh = new toxi.TriangleMesh(); 
		}
		
		var a = new toxi.Vec3D(),
			b = new toxi.Vec3D(),
			pa = new toxi.Vec3D(),
			pb = new toxi.Vec3D(),
			a0 = new toxi.Vec3D(),
			b0 = new toxi.Vec3D(),
			phiRes = this.func.getPhiResolutionLimit(opts.resolution),
			phiRange = this.func.getPhiRange(),
			thetaRes = this.func.getThetaResolutionLimit(opts.resolution),
			thetaRange = this.func.getThetaRange(),
			pres = 1.0 / (1 == opts.resolution % 2 ? opts.resolution - 0 : opts.resolution);
		for (var p = 0; p < phiRes; p++) {
			var phi = p * phiRange * pres;
			var phiNext = (p + 1) * phiRange * pres;
			for (var t = 0; t <= thetaRes; t++) {
				var theta = t * thetaRange / opts.resolution;
				var func = this.func;
				a =	func.computeVertexFor(a, phiNext, theta).scaleSelf(opts.size);
				b = func.computeVertexFor(b, phi, theta).scaleSelf(opts.size);
				if (b.distanceTo(a) < 0.0001) {
					b.set(a);
				}
				if (t > 0) {
					if (t == thetaRes && opts.isClosed) {
						a.set(a0);
						b.set(b0);
					}
					mesh.addFace(pa, pb, a);
					mesh.addFace(pb, b, a);
				} else {
					a0.set(a);
					b0.set(b);
				}
				pa.set(a);
				pb.set(b);
			}
		}
		return mesh;
	},
	
	
	/**
	@return the function
	*/
	getFunction: function() {
		return this.func;
	},

	setFunction: function(func) {
		this.func = func;
	}
};/** 
 @member toxi
 @class
 An Abstract (don't use this directly) Axis-aligned Cylinder class
 */
toxi.AxisAlignedCylinder = function(pos,radius,length) {
	this.pos = (pos===undefined)? undefined: pos.copy();
	this.setRadius(radius);
	this.setLength(length);
};

toxi.AxisAlignedCylinder.prototype = {
	/**
	Checks if the given point is inside the cylinder. 
	@param p
	@return true, if inside
	*/
	containsPoint: function(p){
		throw Error("AxisAlignedCylinder.containsPoint(): not implmented");
	},

	/**
	@return the length
	*/
	getLength: function() {
		return this.length;
	},

	/**
	@return the cylinder's orientation axis
	*/
	getMajorAxis: function(){
		throw Error("AxisAlignedCylinder.getMajorAxis(): not implemented");
	},

	/**
	Returns the cylinder's position (centroid).
	@return the pos
	*/
	getPosition: function() {
		return this.pos.copy();
	},

	/**
	@return the cylinder radius
	*/
	getRadius: function() {
		return this.radius;
	},

	/**
	@param length the length to set
	*/
	setLength: function(length) {
		this.length = length;
	},

	/**
	@param pos the pos to set
	*/
	setPosition: function(pos) {
		this.pos.set(pos);
	},

   setRadius: function(radius) {
		this.radius = radius;
		this.radiusSquared = radius * radius;
	},

	/**
	Builds a TriangleMesh representation of the cylinder at a default
	resolution 30 degrees. 
	@return mesh instance
	*/
	toMesh: function(a,b,c) {
		var opts = {
			mesh: undefined,
			steps: 12,
			thetaOffset: 0
		};
		if(arguments.length == 1 && typeof arguments[0] == 'object'){ //options object
			for(var prop in arguments[0]){
				opts[prop] = arguments[0][prop];
			}
		} else if(arguments.length == 2){
			opts.steps = arguments[0];
			opts.thetaOffset = arguments[1];
		}
		var cone = new toxi.Cone(this.pos,this.getMajorAxis().getVector(), this.radius, this.radius, this.length);
		return cone.toMesh(opts.mesh,opts.steps,opts.thetaOffset,true,true);
	}
};/**
 @class Axis-aligned Bounding Box
 @member toxi
 */
toxi.AABB = function(a,b){
	var vec,
		extent;
	if(a === undefined){
		toxi.Vec3D.apply(this);
		this.setExtent(new toxi.Vec3D());
	} else if(typeof(a) == "number") {
		toxi.Vec3D.apply(this,[new toxi.Vec3D()]);
		this.setExtent(a);
	} else if(a instanceof toxi.Vec3D) {
		toxi.Vec3D.apply(this,[a]);
		if(b === undefined && a instanceof toxi.AABB) {
			this.setExtent(a.getExtent());
		} else {
			if(typeof b == "number"){
				this.setExtent(new toxi.Vec3D(b,b,b));
			}else { //should be an AABB
				this.setExtent(b);
			}
		}
	}
	
	
};

toxi.extend(toxi.AABB,toxi.Vec3D);

toxi.AABB.fromMinMax = function(min,max){
	var a = toxi.Vec3D.min(min);
	var b = toxi.Vec3D.max(max);
	return new toxi.AABB(a.interpolateTo(b,0.5),b.sub(a).scaleSelf(0.5));
};

toxi.AABB.prototype.containsPoint = function(p) {
    return p.isInAABB(this);
};
	
toxi.AABB.prototype.copy = function() {
    return new toxi.AABB(this);
};
	
	/**
	 * Returns the current box size as new Vec3D instance (updating this vector
	 * will NOT update the box size! Use {@link #setExtent(ReadonlyVec3D)} for
	 * those purposes)
	 * 
	 * @return box size
	 */
toxi.AABB.prototype.getExtent = function() {
   return this.extent.copy();
};
	
toxi.AABB.prototype.getMax = function() {
   // return this.add(extent);
   return this.max.copy();
};

toxi.AABB.prototype.getMin = function() {
   return this.min.copy();
};

toxi.AABB.prototype.getNormalForPoint = function(p) {
    p = p.sub(this);
    var pabs = this.extent.sub(p.getAbs());
    var psign = p.getSignum();
    var normal = toxi.Vec3D.X_AXIS.scale(psign.x);
    var minDist = pabs.x;
    if (pabs.y < minDist) {
        minDist = pabs.y;
        normal = toxi.Vec3D.Y_AXIS.scale(psign.y);
    }
    if (pabs.z < minDist) {
        normal = toxi.Vec3D.Z_AXIS.scale(psign.z);
    }
    return normal;
};

    /**
     * Adjusts the box size and position such that it includes the given point.
     * 
     * @param p
     *            point to include
     * @return itself
     */
toxi.AABB.prototype.includePoint = function(p) {
    this.min.minSelf(p);
    this.max.maxSelf(p);
    this.set(this.min.interpolateTo(this.max, 0.5));
    this.extent.set(this.max.sub(this.min).scaleSelf(0.5));
    return this;
};

/**
* Checks if the box intersects the passed in one.
* 
* @param box
*            box to check
* @return true, if boxes overlap
*/
toxi.AABB.prototype.intersectsBox = function(box) {
    var t = box.sub(this);
    return Math.abs(t.x) <= (this.extent.x + box.extent.x) && Math.abs(t.y) <= (this.extent.y + box.extent.y) && Math.abs(t.z) <= (this.extent.z + box.extent.z);
};

/**
 * Calculates intersection with the given ray between a certain distance
 * interval.
 * 
 * Ray-box intersection is using IEEE numerical properties to ensure the
 * test is both robust and efficient, as described in:
 * 
 * Amy Williams, Steve Barrus, R. Keith Morley, and Peter Shirley: "An
 * Efficient and Robust Ray-Box Intersection Algorithm" Journal of graphics
 * tools, 10(1):49-54, 2005
 * 
 * @param ray
 *            incident ray
 * @param minDist
 * @param maxDist
 * @return intersection point on the bounding box (only the first is
 *         returned) or null if no intersection
 */

toxi.AABB.prototype.intersectsRay = function(ray, minDist, maxDist) {
    var invDir = ray.getDirection().reciprocal();
    var signDirX = invDir.x < 0;
    var signDirY = invDir.y < 0;
    var signDirZ = invDir.z < 0;
    var bbox = signDirX ? this.max : this.min;
    var tmin = (bbox.x - ray.x) * invDir.x;
    bbox = signDirX ? this.min : this.max;
    var tmax = (bbox.x - ray.x) * invDir.x;
    bbox = signDirY ? this.max : this.min;
    var tymin = (bbox.y - ray.y) * invDir.y;
    bbox = signDirY ? this.min : this.max;
    var tymax = (bbox.y - ray.y) * invDir.y;
    if ((tmin > tymax) || (tymin > tmax)) {
        return null;
    }
    if (tymin > tmin) {
        tmin = tymin;
    }
    if (tymax < tmax) {
        tmax = tymax;
    }
    bbox = signDirZ ? max : min;
    var tzmin = (bbox.z - ray.z) * invDir.z;
    bbox = signDirZ ? min : max;
    var tzmax = (bbox.z - ray.z) * invDir.z;
    if ((tmin > tzmax) || (tzmin > tmax)) {
        return null;
    }
    if (tzmin > tmin) {
        tmin = tzmin;
    }
    if (tzmax < tmax) {
        tmax = tzmax;
    }
    if ((tmin < maxDist) && (tmax > minDist)) {
        return ray.getPointAtDistance(tmin);
    }
    return undefined;
};

/**
 * @param c
 *            sphere centre
 * @param r
 *            sphere radius
 * @return true, if AABB intersects with sphere
 */

toxi.AABB.prototype.intersectsSphere = function(c, r) {
	if(arguments.length == 1){ //must've been a sphere
		r = c.radius;
	}
    var s, 
		d = 0;
    // find the square of the distance
    // from the sphere to the box
    if (c.x < this.min.x) {
        s = c.x - this.min.x;
        d = s * s;
    } else if (c.x > this.max.x) {
        s = c.x - this.max.x;
        d += s * s;
    }

    if (c.y < this.min.y) {
        s = c.y - this.min.y;
        d += s * s;
    } else if (c.y > this.max.y) {
        s = c.y - this.max.y;
        d += s * s;
    }

    if (c.z < this.min.z) {
        s = c.z - this.min.z;
        d += s * s;
    } else if (c.z > this.max.z) {
        s = c.z - this.max.z;
        d += s * s;
    }

    return d <= r * r;
};

toxi.AABB.prototype.intersectsTriangle = function(tri) {
	// use separating axis theorem to test overlap between triangle and box
	// need to test for overlap in these directions:
	//
	// 1) the {x,y,z}-directions (actually, since we use the AABB of the
	// triangle
	// we do not even need to test these)
	// 2) normal of the triangle
	// 3) crossproduct(edge from tri, {x,y,z}-directin)
	// this gives 3x3=9 more tests
	var v0, 
		v1, 
		v2,
		normal, 
		e0, 
		e1, 
		e2, 
		f;

	// move everything so that the boxcenter is in (0,0,0)
	v0 = tri.a.sub(this);
	v1 = tri.b.sub(this);
	v2 = tri.c.sub(this);

	// compute triangle edges
	e0 = v1.sub(v0);
	e1 = v2.sub(v1);
	e2 = v0.sub(v2);

	// test the 9 tests first (this was faster)
	f = e0.getAbs();
	if (this.testAxis(e0.z, -e0.y, f.z, f.y, v0.y, v0.z, v2.y, v2.z, this.extent.y, this.extent.z)) {
	    return false;
	}
	if (this.testAxis(-e0.z, e0.x, f.z, f.x, v0.x, v0.z, v2.x, v2.z, this.extent.x, this.extent.z)) {
	    return false;
	}
	if (this.testAxis(e0.y, -e0.x, f.y, f.x, v1.x, v1.y, v2.x, v2.y, this.extent.x, this.extent.y)) {
	    return false;
	}

	f = e1.getAbs();
	if (this.testAxis(e1.z, -e1.y, f.z, f.y, v0.y, v0.z, v2.y, v2.z, this.extent.y, this.extent.z)) {
	    return false;
	}
	if (this.testAxis(-e1.z, e1.x, f.z, f.x, v0.x, v0.z, v2.x, v2.z, this.extent.x, this.extent.z)) {
	    return false;
	}
	if (this.testAxis(e1.y, -e1.x, f.y, f.x, v0.x, v0.y, v1.x, v1.y, this.extent.x, this.extent.y)) {
	    return false;
	}

	f = e2.getAbs();
	if (this.testAxis(e2.z, -e2.y, f.z, f.y, v0.y, v0.z, v1.y, v1.z, this.extent.y, this.extent.z)) {
	    return false;
	}
	if (this.testAxis(-e2.z, e2.x, f.z, f.x, v0.x, v0.z, v1.x, v1.z, this.extent.x, this.extent.z)) {
	    return false;
	}
	if (this.testAxis(e2.y, -e2.x, f.y, f.x, v1.x, v1.y, v2.x, v2.y, this.extent.x, this.extent.y)) {
	    return false;
	}

	// first test overlap in the {x,y,z}-directions
	// find min, max of the triangle each direction, and test for overlap in
	// that direction -- this is equivalent to testing a minimal AABB around
	// the triangle against the AABB

	// test in X-direction
	if (toxi.MathUtils.min(v0.x, v1.x, v2.x) > this.extent.x || toxi.MathUtils.max(v0.x, v1.x, v2.x) < -this.extent.x) {
	    return false;
	}

	// test in Y-direction
	if (toxi.MathUtils.min(v0.y, v1.y, v2.y) > this.extent.y || toxi.MathUtils.max(v0.y, v1.y, v2.y) < -this.extent.y) {
	    return false;
	}

	// test in Z-direction
	if (toxi.MathUtils.min(v0.z, v1.z, v2.z) > this.extent.z || toxi.MathUtils.max(v0.z, v1.z, v2.z) < -this.extent.z) {
	    return false;
	}

	// test if the box intersects the plane of the triangle
	// compute plane equation of triangle: normal*x+d=0
	normal = e0.cross(e1);
	var d = -normal.dot(v0);
	if (!this.planeBoxOverlap(normal, d, extent)) {
	    return false;
	}
	return true;
};

toxi.AABB.prototype.planeBoxOverlap = function(normal, d, maxbox) {
    var vmin = new toxi.Vec3D();
    var vmax = new toxi.Vec3D();

    if (normal.x > 0.0) {
        vmin.x = -maxbox.x;
        vmax.x = maxbox.x;
    } else {
        vmin.x = maxbox.x;
        vmax.x = -maxbox.x;
    }

    if (normal.y > 0.0) {
        vmin.y = -maxbox.y;
        vmax.y = maxbox.y;
    } else {
        vmin.y = maxbox.y;
        vmax.y = -maxbox.y;
    }

    if (normal.z > 0.0) {
        vmin.z = -maxbox.z;
        vmax.z = maxbox.z;
    } else {
        vmin.z = maxbox.z;
        vmax.z = -maxbox.z;
    }
    if (normal.dot(vmin) + d > 0.0) {
        return false;
    }
    if (normal.dot(vmax) + d >= 0.0) {
        return true;
    }
    return false;
};
		
/**
 * Updates the position of the box in space and calls
 * {@link #updateBounds()} immediately
 * 
 * @see toxi.geom.Vec3D#set(float, float, float)
 */

toxi.AABB.prototype.set = function(a,b,c) {
		if(a  instanceof toxi.AABB) {
			this.extent.set(a.extent);
			return toxi.Vec3D.set.apply(this,[a]);
		}
		if(a instanceof toxi.Vec3D){
			b = a.y;
			c = a.z;
			a = a.a;
		}
		this.x = a;
		this.y = b;
		this.z = c;
		this.updateBounds();
		return this;
 };


toxi.AABB.prototype.setExtent = function(extent) {
        this.extent = extent.copy();
        return this.updateBounds();
};

toxi.AABB.prototype.testAxis = function(a, b, fa, fb, va, vb, wa, wb, ea, eb) {
    var p0 = a * va + b * vb;
    var p2 = a * wa + b * wb;
    var min;
	var max;
    if (p0 < p2) {
        min = p0;
        max = p2;
    } else {
        min = p2;
        max = p0;
    }
    var rad = fa * ea + fb * eb;
    return (min > rad || max < -rad);
};

toxi.AABB.prototype.toMesh = function(mesh){
	if(mesh === undefined){
		mesh = new toxi.TriangleMesh("aabb",8,12);	
	}
	var a = new toxi.Vec3D(this.min.x,this.max.y,this.max.z),
		b = new toxi.Vec3D(this.max.x,this.max.y,this.max.z),
		c = new toxi.Vec3D(this.max.x,this.min.y, this.max.z),
		d = new toxi.Vec3D(this.min.x, this.min.y, this.max.z),
		e = new toxi.Vec3D(this.min.x, this.max.y, this.min.z),
		f = new toxi.Vec3D(this.max.x, this.max.y, this.min.z),
		g = new toxi.Vec3D(this.max.x, this.min.y, this.min.z),
		h = new toxi.Vec3D(this.min.x, this.min.y, this.min.z);
		
	// front
	mesh.addFace(a, b, d, undefined, undefined, undefined, undefined);
	mesh.addFace(b, c, d, undefined, undefined, undefined, undefined);
	// back
	mesh.addFace(f, e, g, undefined, undefined, undefined, undefined);
	mesh.addFace(e, h, g, undefined, undefined, undefined, undefined);
	// top
	mesh.addFace(e, f, a, undefined, undefined, undefined, undefined);
	mesh.addFace(f, b, a, undefined, undefined, undefined, undefined);
	// bottom
	mesh.addFace(g, h, d, undefined, undefined, undefined, undefined);
	mesh.addFace(g, d, c, undefined, undefined, undefined, undefined);
	// left
	mesh.addFace(e, a, h, undefined, undefined, undefined, undefined);
	mesh.addFace(a, d, h, undefined, undefined, undefined, undefined);
	// right
	mesh.addFace(b, f, g, undefined, undefined, undefined, undefined);
	mesh.addFace(b, g, c, undefined, undefined, undefined, undefined);
	return mesh;

};


toxi.AABB.prototype.toString = function() {
   return "<aabb> pos: "+this.parent.toString()+" ext: "+this.extent.toString();
};

/**
* Updates the min/max corner points of the box. MUST be called after moving
* the box in space by manipulating the public x,y,z coordinates directly.
* 
* @return itself
*/
toxi.AABB.prototype.updateBounds = function() {
  // this is check is necessary for the constructor
  if (this.extent !== undefined) {
      this.min = this.sub(this.extent);
      this.max = this.add(this.extent);
  }
  return this;
};

/**
 * @class 4x4 bezier patch implementation with tesselation support (dynamic resolution)
 * for generating triangle mesh representations.
 * @member toxi
 */
toxi.BezierPatch = function(points){
	this.points = (points === undefined)?[] : points;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			this.points[i][j] = new toxi.Vec3D();
		}
	}
};

toxi.BezierPatch.prototype = {
	
	computePointAt: function(u,v) {
		return this.computePointAt(u, v, this.points);
	},

	set: function(x,y,p) {
		this.points[y][x].set(p);
		return this;
	},

	toMesh: function(mesh_or_res,_res) {
		var mesh,
			res;
		if(_res === undefined){
			mesh = new toxi.TriangleMesh();
			res = mesh_or_res;
		} else {
			mesh = mesh_or_res;
			res = _res;
		}
		var curr = new Array(res + 1),
			prev = new Array(res + 1);
		var r1 = 1.0 / res;
		for (var y = 0; y <= res; y++) {
			for (var x = 0; x <= res; x++) {
				var p = this.computePointAt(x * r1, y * r1, this.points);
				if (x > 0 && y > 0) {
					mesh.addFace(p, curr[x - 1], prev[x - 1]);
					mesh.addFace(p, prev[x - 1], prev[x]);
				}
				curr[x] = p;
			}
			var tmp = prev;
			prev = curr;
			curr = tmp;
		}
		return mesh;

	}
};

/**
Computes a single point on the bezier surface given by the 2d array of
control points. The desired point's coordinates have to be specified in
UV space (range 0.0 .. 1.0). The implementation does not check or enforce
the correct range of these coords and will not return valid points if the
range is exceeded.
@param u positive normalized U coordinate on the bezier surface
@param v positive normalized V coordinate on the bezier surface
@param points 4x4 array defining the patch's control points
@return point on surface
*/

toxi.BezierPatch.computePointAt = function(u,v,points){
		var u1 = 1 - u;
		var u1squared = u1 * u1 * 3 * u,
		u1cubed = u1 * u1 * u1,
		usquared = u * u,
		v1 = 1 - v,
		vsquared = v * v * 3,
		v1squared = v1 * v1 * 3,
		v1cubed = v1 * v1 * v1,
		vcubed = v * v * v,

		u1usq = u1 * usquared * 3,
		usqu = u * usquared,
		v1vsq = v1 * vsquared,
		v1sqv = v1squared * v;

		var p0 = points[0];
		var p1 = points[1];
		var p2 = points[2];
		var p3 = points[3];

		var x = u1cubed * (p0[0].x * v1cubed + p0[1].x * v1sqv + p0[2].x * v1vsq + p0[3].x * vcubed) + u1squared * (p1[0].x * v1cubed + p1[1].x * v1sqv + p1[2].x * v1vsq + p1[3].x * vcubed) + u1usq * (p2[0].x * v1cubed + p2[1].x * v1sqv + p2[2].x * v1vsq + p2[3].x * vcubed) + usqu * (p3[0].x * v1cubed + p3[1].x * v1sqv + p3[2].x * v1vsq + p3[3].x * vcubed);

		var y = u1cubed * (p0[0].y * v1cubed + p0[1].y * v1sqv + p0[2].y * v1vsq + p0[3].y * vcubed) + u1squared * (p1[0].y * v1cubed + p1[1].y * v1sqv + p1[2].y * v1vsq + p1[3].y * vcubed) + u1usq * (p2[0].y * v1cubed + p2[1].y * v1sqv + p2[2].y * v1vsq + p2[3].y * vcubed) + usqu * (p3[0].y * v1cubed + p3[1].y * v1sqv + p3[2].y * v1vsq + p3[3].y * vcubed);

		var z = u1cubed * (p0[0].z * v1cubed + p0[1].z * v1sqv + p0[2].z * v1vsq + p0[3].z * vcubed) + u1squared * (p1[0].z * v1cubed + p1[1].z * v1sqv + p1[2].z * v1vsq + p1[3].z * vcubed) + u1usq * (p2[0].z * v1cubed + p2[1].z * v1sqv + p2[2].z * v1vsq + p2[3].z * vcubed) + usqu * (p3[0].z * v1cubed + p3[1].z * v1sqv + p3[2].z * v1vsq + p3[3].z * vcubed);

		return new toxi.Vec3D(x, y, z);

};/**
 @class 
 X-axis aligned Cylinder
 @member toxi
 @author Kyle Phillips
 */
toxi.XAxisCylinder = function(pos,radius,length){
	toxi.AxisAlignedCylinder.apply(this,[pos,radius,length]);
};

toxi.extend(toxi.XAxisCylinder,toxi.AxisAlignedCylinder);

toxi.XAxisCylinder.prototype.containsPoint = function(p){
	if(toxi.MathUtils.abs(p.x - this.pos.x) < this.length * 0.5){
		var dy = p.y - this.pos.y;
		var dz = p.z - this.pos.z;
		if(Math.abs(dz * dz + dy * dy) < this.radiusSquared){
			return true;
		}
	}
	return false;
};
toxi.XAxisCylinder.prototype.getMajorAxis = function(){
	return toxi.Vec3D.Axis.X;
};
/**
 @member toxi
 @class Y-axis aligned Cylinder
 */
toxi.YAxisCylinder = function(pos,radius,length){
	toxi.AxisAlignedCylinder.apply(this,[pos,radius,length]);
};
toxi.extend(toxi.YAxisCylinder,toxi.AxisAlignedCylinder);

toxi.YAxisCylinder.prototype.containsPoint = function(p){
	if(toxi.MathUtils.abs(p.y - this.pos.y) < this.length * 0.5){
		var dx = p.x - this.pos.x;
		var dz = p.z - this.pos.z;
		if(Math.abs(dz * dz + dx * dx) < this.radiusSquared){
			return true;
		}
	}
	return false;
};
toxi.YAxisCylinder.prototype.getMajorAxis = function(){
	return toxi.Vec3D.Axis.Y;
};
/**
 @member toxi
 @class Z-axis aligned Cylinder
 */
toxi.ZAxisCylinder = function(pos,radius,length){
	toxi.AxisAlignedCylinder.apply(this,[pos,radius,length]);
};
toxi.extend(toxi.ZAxisCylinder,toxi.AxisAlignedCylinder);
toxi.ZAxisCylinder.prototype.containsPoint = function(p){
	 if (MathUtils.abs(p.z - this.pos.z) < this.length * 0.5) {
            var dx = p.x - this.pos.x;
            var dy = p.y - this.pos.y;
            if (Math.abs(dx * dx + dy * dy) < this.radiusSquared) {
                return true;
            }
	}
	return false;
};
toxi.ZAxisCylinder.prototype.getMajorAxis = function(){
	return toxi.Vec3D.Axis.Z;
};/**
 @class
 @member toxi
 */
toxi.Line3D = function(vec_a, vec_b) {
    this.a = vec_a;
    this.b = vec_b;
};

toxi.Line3D.prototype = {
	
	closestLineTo: function(l) {

       var p43 = l.a.sub(l.b);
       if (p43.isZeroVector()) {
           return new toxi.Line3D.LineIntersection(toxi.Line3D.LineIntersection.Type.NON_INTERSECTING);
       }

       var p21 = this.b.sub(this.a);
       if (p21.isZeroVector()) {
           return new toxi.Line3D.LineIntersection(toxi.Line3D.LineIntersection.Type.NON_INTERSECTING);
       }
       var p13 = this.a.sub(l.a);

       var d1343 = p13.x * p43.x + p13.y * p43.y + p13.z * p43.z;
       var d4321 = p43.x * p21.x + p43.y * p21.y + p43.z * p21.z;
       var d1321 = p13.x * p21.x + p13.y * p21.y + p13.z * p21.z;
       var d4343 = p43.x * p43.x + p43.y * p43.y + p43.z * p43.z;
       var d2121 = p21.x * p21.x + p21.y * p21.y + p21.z * p21.z;

       var denom = d2121 * d4343 - d4321 * d4321;
       if (Math.abs(denom) < toxi.MathUtils.EPS) {
           return new toxi.Line3D.LineIntersection(toxi.Line3D.LineIntersection.Type.NON_INTERSECTING);
       }
       var numer = d1343 * d4321 - d1321 * d4343;
       var mua = numer / denom;
       var mub = (d1343 + d4321 * mua) / d4343;

       var pa = this.a.add(p21.scaleSelf(mua));
       var pb = l.a.add(p43.scaleSelf(mub));
       return new toxi.Line3D.LineIntersection(toxi.Line3D.LineIntersection.Type.INTERSECTING, new toxi.Line3D(pa, pb), mua,mub);
	},

   /**
    * Computes the closest point on this line to the given one.
    * 
    * @param p
    *            point to check against
    * @return closest point on the line
    */
	closestPointTo: function(p) {
       var v = this.b.sub(this.a);
       var t = p.sub(this.a).dot(v) / v.magSquared();
       // Check to see if t is beyond the extents of the line segment
       if (t < 0.0) {
           return this.a.copy();
       } else if (t > 1.0) {
           return this.b.copy();
       }
       // Return the point between 'a' and 'b'
       return this.a.add(v.scaleSelf(t));
	},

	copy: function() {
       return new toxi.Line3D(this.a.copy(), this.b.copy());
	},

	equals: function(obj) {
       if (this == obj) {
           return true;
       }
       if ((typeof(obj) != toxi.Line3D)) {
           return false;
       }
       return (this.a.equals(obj.a) || this.a.equals(l.b)) && (this.b.equals(l.b) || this.b.equals(l.a));
	},

   getDirection: function() {
       return this.b.sub(this.a).normalize();
   },

   getLength: function() {
       return this.a.distanceTo(this.b);
   },

   getLengthSquared: function() {
       return this.a.distanceToSquared(this.b);
   },

   getMidPoint: function() {
       return this.a.add(this.b).scaleSelf(0.5);
   },

   getNormal: function() {
       return this.b.cross(this.a);
   },

   hasEndPoint: function(p) {
       return this.a.equals(p) || this.b.equals(p);
   },


	offsetAndGrowBy: function(offset,scale,ref) {
		var m = this.getMidPoint(),
			d = this.getDirection(),
			n = this.a.cross(d).normalize();
       if (ref !== undefined && m.sub(ref).dot(n) < 0) {
           n.invert();
       }
       n.normalizeTo(offset);
       this.a.addSelf(n);
       this.b.addSelf(n);
       d.scaleSelf(scale);
       this.a.subSelf(d);
       this.b.addSelf(d);
       return this;
   },

   set: function(vec_a, vec_b) {
       this.a = vec_a;
       this.b = vec_b;
       return this;
   },


   splitIntoSegments: function(segments,stepLength, addFirst) {
       return toxi.Line3D.splitIntoSegments(this.a, this.b, stepLength, segments, addFirst);
   },


  toString: function() {
       return this.a.toString() + " -> " + this.b.toString();
   }
};

/**
    * Splits the line between A and B into segments of the given length,
    * starting at point A. The tweened points are added to the given result
    * list. The last point added is B itself and hence it is likely that the
    * last segment has a shorter length than the step length requested. The
    * first point (A) can be omitted and not be added to the list if so
    * desired.
    * 
    * @param a
    *            start point
    * @param b
    *            end point (always added to results)
    * @param stepLength
    *            desired distance between points
    * @param segments
    *            existing array list for results (or a new list, if null)
    * @param addFirst
    *            false, if A is NOT to be added to results
    * @return list of result vectors
    */
toxi.Line3D.splitIntoSegments = function(vec_a, vec_b, stepLength, segments, addFirst) {
    if (segments === undefined) {
        segments = [];
    }
    if (addFirst) {
        segments.push(vec_a.copy());
    }
    var dist = vec_a.distanceTo(vec_b);
    if (dist > stepLength) {
        var pos = vec_a.copy();
        var step = vec_b.sub(vec_a).limit(stepLength);
        while (dist > stepLength) {
            pos.addSelf(step);
            segments.push(pos.copy());
            dist -= stepLength;
        }
    }
    segments.push(vec_b.copy());
    return segments;
};


toxi.Line3D.LineIntersection = function(type,line,mua,mub){
	this.type = type;
	if(mua === undefined){ mua = 0; }
	if(mub === undefined){ mub = 0; }
	this.line = line;
	this.coeff = [mua,mub];
};

toxi.Line3D.LineIntersection.prototype = {
	
	getCoefficient: function(){
		return this.coeff;
	},
	
	getLength: function(){
		if(this.line === undefined){ return undefined; }
		return this.line.getLength();
	},
	
	getLine: function(){
		if(this.line === undefined){ return undefined; }
		return this.line.copy();
	},
	
	getType: function(){
		return this.type;
	},
	
	isIntersectionInside: function(){
		return this.type == toxi.Line3D.LineIntersection.Type.INTERSECTING && this.coeff[0] >= 0 && this.coeff[0] <= 1 && this.coeff[1] >=0 && this.coeff[1] <= 1;
	},
	
	toString: function(){
		return "type: "+this.type+ " line: "+this.line;
	}
};
	
toxi.Line3D.LineIntersection.Type = {
	NON_INTERSECTING: 0,
	INTERSECTING: 1
};

/**
 * @class
 * @member toxi
 */
toxi.Ray2D = function(a,b,d){
	var o, dir;
	if(arguments.length == 3){
		toxi.Vec2D.apply(this,[a,b]);
		this.dir = d.getNormalized();
	} else if(arguments.length == 2){
		toxi.Vec2D.apply(this,[a]);
		this.dir = b.getNormalized();
	} else if(arguments.length === 0){
		toxi.Vec2D.apply(this);
		this.dir = toxi.Vec2D.Y_AXIS.copy();
	}
};
toxi.extend(toxi.Ray2D,toxi.Vec2D);

toxi.Ray2D.prototype.getDirection = function() {
      return this.dir.copy();
};
/**
 * Calculates the distance between the given point and the infinite line
 * coinciding with this ray.
 */
toxi.Ray2D.prototype.getDistanceToPoint = function(p) {
    var sp = p.sub(this);
    return sp.distanceTo(this.dir.scale(sp.dot(this.dir)));
};

toxi.Ray2D.prototype.getPointAtDistance = function(dist) {
    return this.add(this.dir.scale(dist));
};

/**
 * Uses a normalized copy of the given vector as the ray direction.
 * 
 * @param d
 *            new direction
 * @return itself
 */
toxi.Ray2D.prototype.setDirection = function(d) {
    this.dir.set(d).normalize();
    return this;
};

/**
 * Converts the ray into a 2D Line segment with its start point coinciding
 * with the ray origin and its other end point at the given distance along
 * the ray.
 * 
 * @param dist
 *            end point distance
 * @return line segment
 */
toxi.Ray2D.prototype.toLine2DWithPointAtDistance = function(dist) {
    return new toxi.Line2D(this, this.getPointAtDistance(dist));
};

toxi.Ray2D.prototype.toString = function() {
    return "origin: " + toxi.Vec2D.prototype.toString.apply(this) + " dir: " + this.dir;
};
/**
 * @class
 * @member toxi
 */
toxi.Ray3D = function(a,b,c,d){
	var o, dir;
	if(arguments.length == 4){
		o = new toxi.Vec3D(a,b,c);
		dir = d;
	}
	else if(arguments.length == 2){
		o = a;
		dir = b;
	}
	else {
		o = new toxi.Vec3D();
		dir = toxi.Vec3D.Y_AXIS.copy();
	}
	toxi.Vec3D.apply(this,[o]);
	this.dir = dir;
};

toxi.extend(toxi.Ray3D,toxi.Vec3D);

/**
	Returns a copy of the ray's direction vector.
	@return vector
*/
toxi.Ray3D.prototype.getDirection = function() {
    return this.dir.copy();
};

/**
	Calculates the distance between the given point and the infinite line
	coinciding with this ray.
	@param p
*/
toxi.Ray3D.prototype.getDistanceToPoint = function(p) {
    var sp = p.sub(this);
    return sp.distanceTo(this.dir.scale(sp.dot(this.dir)));
};

/**
	Returns the point at the given distance on the ray. The distance can be
	any real number.
	@param dist
	@return vector
*/
toxi.Ray3D.prototype.getPointAtDistance = function(dist) {
    return this.add(this.dir.scale(dist));
};

/**
  Uses a normalized copy of the given vector as the ray direction. 
  @param d new direction
  @return itself
*/
toxi.Ray3D.prototype.setDirection = function(d) {
    this.dir.set(d).normalize();
    return this;
};

/**
  Converts the ray into a 3D Line segment with its start point coinciding
  with the ray origin and its other end point at the given distance along
  the ray.
  
  @param dist end point distance
  @return line segment
*/
toxi.Ray3D.prototype.toLine3DWithPointAtDistance = function(dist) {
    return new toxi.Line3D(this, this.getPointAtDistance(dist));
};

toxi.Ray3D.prototype.toString = function() {
    return "origin: " + this.parent.toString.call(this) + " dir: " + this.dir;
};/** @namespace */
toxi.color = toxi.color || {};
(function(){

	//private
	var dec2hex = function decimalToHexString(number){
	    if (number < 0){
	        number = 0xFFFFFFFF + number + 1;
	    }

	    return number.toString(16);
	};

	/**
	 @class Creates a new TColor instance
	 @memberOf toxi.color
	 */
	toxi.color.TColor = function(tcolor){
		this.rgb = new Array(3);
		this.hsv = new Array(3);
		this.cmyk = new Array(4);
		this._alpha = 1.0;
		if(tcolor !== undefined){
			var buffer = tcolor.toCMYKAArray();
			this.cmyk = buffer.splice(0,4);
			this.hsv = tcolor.toHSVAArray().splice(0,3);
			this.rgb = tcolor.toRGBAArray().splice(0,3);
			this._alpha = tcolor._alpha;
		}
	};
	
	toxi.color.TColor.prototype = {
		
		add: function(c){
			return this.copy().addSelf(c);
		},
		
		addSelf: function(c) {
			this.rgb[0] = toxi.MathUtils.min(this.rgb[0] + c.rgb[0], 1);
		    this.rgb[1] = toxi.MathUtils.min(this.rgb[1] + c.rgb[1], 1);
		    this.rgb[2] = toxi.MathUtils.min(this.rgb[2] + c.rgb[2], 1);
		    return this.setRGB(rgb);
		},
		
		/**
		 * Changes the brightness of the color by the given amount in the direction
		 * towards either the black or white point (depending on if current
		 * brightness >= 50%)
		 * 
		 * @param {Number} amount
		 * @return itself
		 */
		adjustConstrast: function(amount) {
		    return this.hsv[2] < 0.5 ? this.darken(amount) : this.lighten(amount);
		},
		
		
		/**
		 * Adds the given HSV values as offsets to the current color. Hue will
		 * automatically wrap.
		 * 
		 * @param h
		 * @param s
		 * @param v
		 * @return itself
		 */
		adjustHSV: function(h, s, v) {
		    return this.setHSV([ this.hsv[0] + h, this.hsv[1] + s, this.hsv[2] + v ]);
		},
		
		/**
		 * Adds the given RGB values as offsets to the current color. TColor will
		 * clip at black or white.
		 * 
		 * @param r
		 * @param g
		 * @param b
		 * @return itself
		 */
		adjustRGB: function(r, g,b) {
		    return this.setRGB([this.rgb[0] + r, this.rgb[1] + g, this.rgb[2] + b]);
		},
		
		alpha:function(){
			return this._alpha;
		},
		
		/**
		 * Rotates this color by a random amount (not exceeding the one specified)
		 * and creates variations in saturation and brightness based on the 2nd
		 * parameter.
		 * 
		 * @param theta
		 *            max. rotation angle (in radians)
		 * @param delta
		 *            max. sat/bri variance
		 * @return itself
		 */
		analog: function(theta, delta) {
		    var angle = toxi.MathUtils.degrees(theta);
			this.rotateRYB(angle * toxi.MathUtils.normalizedRandom());
			this.hsv[1] += delta * toxi.MathUtils.normalizedRandom();
			this.hsv[2] += delta * toxi.MathUtils.normalizedRandom();
			return this.setHSV(this.hsv);
		},
		
		//shouldnt this be this.cmyk[3]?
		black: function(){
			return this.cmyk[3];
		},
		/**
		 * Blends the color with the given one by the stated amount
		 * 
		 * @param c
		 *            target color
		 * @param t
		 *            interpolation factor
		 * @return itself
		 */
		blend: function(c, t) {
			if(t === undefined) { t = 0.5; }
		    var crgb = c.toRGBAArray();
		    this.rgb[0] += (crgb[0] - this.rgb[0]) * t;
		    this.rgb[1] += (crgb[1] - this.rgb[1]) * t;
		    this.rgb[2] += (crgb[2] - this.rgb[2]) * t;
		    this._alpha += (c.alpha() - this._alpha) * t;
		    return this.setRGB(this.rgb);
		},
		
		blue: function() {
			return this.rgb[2];
		},
		
		brightness: function(){
			return this.hsv[2];
		},
		
		complement: function(){
			return this.rotateRYB(180);
		},
		
		copy: function(){
			return new toxi.color.TColor(this);
		},
		
		cyan : function(){
			return this.cmyk[0];
		},
		
		darken: function(step){
			this.hsv[2] = toxi.MathUtils.clip((this.hsv[2] -step), 0, 1);
			return this.setHSV(this.hsv);
		},
		/**
		Reduced the color's saturation by the given amount. 
		@param step
		@return itself
		*/
		desaturate: function(step) {
		    this.hsv[1] = toxi.MathUtils.clip((this.hsv[1] - step), 0, 1);
		    return this.setHSV(this.hsv);
		},
	
		differenceTo: function(c) {
		    return  toxi.color.TColor.newRGB(Math.abs(this.rgb[0] - c.rgb[0]),
		            Math.abs(this.rgb[1] - c.rgb[1]),
		            Math.abs(this.rgb[2] - c.rgb[2]));
		},
		
		distanceToCMYK: function(c) {
		    var ccmyk = c.toCMYKAArray();
		    var dc = this.cmyk[0] - ccmyk[0];
		    var dm = this.cmyk[1] - ccmyk[1];
		    var dy = this.cmyk[2] - ccmyk[2];
		    var dk = this.cmyk[3] - ccmyk[3];
		    return Math.sqrt(dc * dc + dm * dm + dy * dy + dk * dk);
		},
		
		distanceToHSV: function(c) {
		    var hue = this.hsv[0] * toxi.MathUtils.TWO_PI;
		    var hue2 = c.hue() * toxi.MathUtils.TWO_PI;
		    var v1 =
		            new toxi.Vec3D((Math.cos(hue) * this.hsv[1]),
		                    (Math.sin(hue) * this.hsv[1]), this.hsv[2]);
		    var v2 =
		            new toxi.Vec3D((Math.cos(hue2) * c.saturation()),
		                    (Math.sin(hue2) * c.saturation()), c.brightness());
		    return v1.distanceTo(v2);
		},
		
		distanceToRGB: function(c) {
		    var crgb = c.toRGBAArray();
		    var dr = this.rgb[0] - crgb[0];
		    var dg = this.rgb[1] - crgb[1];
		    var db = this.rgb[2] - crgb[2];
		    return Math.sqrt(dr * dr + dg * dg + db * db);
		},
		
		equals: function(o) {
		    if (o !== undefined && o instanceof toxi.color.TColor) {
		        var c =  o;
		        var dr = c.rgb[0] - this.rgb[0];
		        var dg = c.rgb[1] - this.rgb[1];
		        var db = c.rgb[2] - this.rgb[2];
		        var da = c.alpha() - this._alpha;
		        var d = Math.sqrt(dr * dr + dg * dg + db * db + da * da);
		        return d < toxi.color.TColor.EPS;
		    }
		    return false;
		},
		
		getAnalog: function(theta,delta) {
		    return new toxi.color.TColor(this).analog(theta, delta);
		},
		
		getBlended: function(c,t) {
		    return new toxi.color.TColor(this).blend(c, t);
		},
		
		/*getClosestHue: function(primaryOnly) {
		    return Hue.getClosest(hsv[0], false,primaryOnly);
		},*/
		
		getComplement: function() {
		    return new toxi.color.TColor(this).complement();
		},
		
		getComponentValue: function(criteria) {
		    return criteria.getComponentValueFor(this);
		},
		
		getDarkened: function(step) {
		    return new toxi.color.TColor(this).darken(step);
		},
		
		getDesaturated: function(step) {
		    return new toxi.color.TColor(this).desaturate(step);
		},
		
		getDifferenceTo: function(c) {
		    return this.copy().differenceTo(c);
		},
		
		getInverted: function() {
		    return new toxi.color.TColor(this).invert();
		},
		
		getLightened: function(step) {
		    return new toxi.color.TColor(this).lighten(step);
		},
		
		getRotatedRYB: function(theta) {
		    return new toxi.color.TColor(this).rotateRYB(theta);
		},
		
		getSaturated: function(step) {
		    return new toxi.color.TColor(this).saturate(step);
		},
		
		green: function() {
		    return this.rgb[1];
		},
		
		hue: function() {
		    return this.hsv[0];
		},
		
		invert: function() {
		    this.rgb[0] = 1 - this.rgb[0];
		    this.rgb[1] = 1 - this.rgb[1];
		    this.rgb[2] = 1 - this.rgb[2];
		    return this.setRGB(this.rgb);
		},
		
		isBlack: function() {
		    return (this.rgb[0] <= toxi.color.TColor.BLACK_POINT && ((this.rgb[0]==this.rgb[1]) && this.rgb[0] == this.rgb[2]));
		},
		
		isGrey:function() {
		    return this.hsv[1] < toxi.color.TColor.GREY_THRESHOLD;
		},
		/*
		isPrimary:function() {
		    return Hue.isPrimary(this.hsv[0]);
		},*/
		
		isWhite: function() {
		    return (this.rgb[0] >= toxi.color.TColor.WHITE_POINT && (this.rgb[0] == this.rgb[1]) && (this.rgb[0] == this.rgb[2]));
		},
		
		lighten: function(step) {
		    this.hsv[2] = toxi.MathUtils.clip(this.hsv[2] + step, 0, 1);
		    return this.setHSV(this.hsv);
		},
		
		luminance: function() {
		    return this.rgb[0] * 0.299 + this.rgb[1] * 0.587 + this.rgb[2] * 0.114;
		},
		
		magenta: function() {
		    return this.cmyk[1];
		},
		
		red: function() {
		    return this.rgb[0];
		},
		
		rotateRYB: function(theta) {
			var deg = parseInt(toxi.MathUtils.degrees(theta),10),
				h = this.hsv[0] * 360,
				i = 0,
				p,
				q;
			theta %= 360;
	
		    var resultHue = 0;
		    for (i = 0; i < toxi.color.TColor.RYB_WHEEL.length - 1; i++) {
		        p = toxi.color.TColor.RYB_WHEEL[i];
		        q = toxi.color.TColor.RYB_WHEEL[i + 1];
		        if (q.y < p.y) {
		            q.y += 360;
		        }
		        if (p.y <= h && h <= q.y) {
		            resultHue = p.x + (q.x - p.x) * (h - p.y) / (q.y - p.y);
		            break;
		        }
		    }
	
		    // And the user-given angle (e.g. complement).
		    resultHue = (resultHue + theta) % 360;
	
		    // For the given angle, find out what hue is
		    // located there on the artistic color wheel.
		    for (i = 0; i < toxi.color.TColor.RYB_WHEEL.length - 1; i++) {
		        p = toxi.color.TColor.RYB_WHEEL[i];
		        q = toxi.color.TColor.RYB_WHEEL[i + 1];
		        if (q.y < p.y) {
		            q.y += 360;
		        }
		        if (p.x <= resultHue && resultHue <= q.x) {
		            h = p.y + (q.y - p.y) * (resultHue - p.x) / (q.x - p.x);
		            break;
		        }
		    }
	
		    this.hsv[0] = (h % 360) / 360.0;
		    return this.setHSV(this.hsv);
		
		},
		
		saturate: function(step) {
		    this.hsv[1] = toxi.MathUtils.clip(this.hsv[1] + step, 0, 1);
		    return this.setHSV(this.hsv);
		},
		
		saturation: function() {
		    return this.hsv[1];
		},
		
		setAlpha: function(alpha) {
		    this._alpha = alpha;
		    return this;
		},
		
		setARGB: function(argb) {
		    this.setRGB(((argb >> 16) & 0xff) * toxi.TColor.INV8BIT, ((argb >> 8) & 0xff) * toxi.TColor.INV8BIT, (argb & 0xff) * toxi.TColor.INV8BIT);
		    this._alpha = (argb >>> 24) * toxi.TColor.INV8BIT;
		    return this;
		},
		
		setBlack: function(val) {
		    this.cmyk[3] = val;
		    return this.setCMYK(cmyk);
		},
		
		setBlue: function(blue) {
		    this.rgb[2] = blue;
		    return this.setRGB(this.rgb);
		},
		
		setBrightness: function(brightness) {
		    this.hsv[2] = toxi.MathUtils.clip(brightness, 0, 1);
		    return this.setHSV(this.hsv);
		},
		
		setCMYK: function(c,m,y,k) {
			//if it was passed in as an array instead of separate values
			if(c instanceof Array){
				m = c[1];
				y = c[2];
				k = c[3];
				c = c[0];
			}
		    this.cmyk[0] = c;
		    this.cmyk[1] = m;
		    this.cmyk[2] = y;
		    this.cmyk[3] = k;
			this.rgb = toxi.color.TColor.cmykToRGB(this.cmyk[0],this.cmyk[1],this.cmyk[2],this.cmyk[3]);
			this.hsv = toxi.color.TColor.rgbToHSV(this.rgb[0],this.rgb[1],this.rgb[2]);
		    return this;
		},
		
		/*setComponent(AccessCriteria criteria, float val) {
		    criteria.setComponentValueFor(this, val);
		    return this;
		}*/
		
		setCyan: function(val) {
		    this.cmyk[0] = val;
		    return this.setCMYK(this.cmyk);
		},
	
		setGreen: function(green) {
		    this.rgb[1] = green;
		    return this.setRGB(this.rgb);
		},
	
		setHSV: function(h,s,v) {
			if(h instanceof Array){
				s = h[1];
				v = h[2];
				h = h[0];
			}
			var newHSV = [h,s,v];
		    this.hsv[0] = newHSV[0] % 1;
			if (this.hsv[0] < 0) {
				this.hsv[0]++;
			}
			this.hsv[1] = toxi.MathUtils.clip(newHSV[1], 0, 1);
			this.hsv[2] = toxi.MathUtils.clip(newHSV[2], 0, 1);
			this.rgb = toxi.color.TColor.hsvToRGB(this.hsv[0], this.hsv[1], this.hsv[2]);
			this.cmyk = toxi.color.TColor.rgbToCMYK(this.rgb[0], this.rgb[1], this.rgb[2]);
			return this;
		},
		
		setHue: function(hue) {
		    hue %= 1.0;
		    if (hue < 0.0) {
		        hue++;
		    }
		    this.hsv[0] = hue;
		    this.setHSV(this.hsv);
		},
		
		setMagenta: function(val) {
		    this.cmyk[1] = val;
		    return this.setCMYK(this.cmyk);
		},
	
		setRed: function(red) {
		    this.rgb[0] = red;
		    return this.setRGB(this.rgb);
		},
	
		setRGB: function(r,g,b) {
			if(r instanceof Array)
			{
				g = r[1];
				b = r[2];
				r = r[0];
			}
		    this.rgb[0] = toxi.MathUtils.clip(r,0,1);
		    this.rgb[1] = toxi.MathUtils.clip(g,0,1);
		    this.rgb[2] = toxi.MathUtils.clip(b,0,1);
			this.cmyk = toxi.color.TColor.rgbToCMYK(this.rgb[0], this.rgb[1], this.rgb[2]);
			this.hsv = toxi.color.TColor.rgbToHSV(this.rgb[0], this.rgb[1], this.rgb[2]);
		    return this;
		},
		
		setSaturation: function(saturation) {
		    this.hsv[1] = toxi.MathUtils.clip(saturation, 0, 1);
		    return this.setHSV(this.hsv);
		},
	
		setYellow: function(val) {
		    this.cmyk[2] = val;
		    return this.setCMYK(this.cmyk);
		},
	
		sub: function(c) {
		    return this.copy().subSelf(c);
		},
		
		subSelf: function(c) {
		    this.rgb[0] = toxi.MathUtils.max(this.rgb[0] - c.rgb[0], 0);
		    this.rgb[1] = toxi.MathUtils.max(this.rgb[1] - c.rgb[1], 0);
		    this.rgb[2] = toxi.MathUtils.max(this.rgb[2] - c.rgb[2], 0);
		    return this.setRGB(this.rgb);
		},
		
		toARGB: function() {
			var r = parseInt((this.rgb[0] * 255),10),
				g = parseInt((this.rgb[1] * 255),10),
				b = parseInt((this.rgb[2] * 255),10),
				a = parseInt((this._alpha * 255),10);
		    return  r << 16 | g << 8 | b | a << 24;
		},
		
		toCMYKAArray: function(cmyka) {
		    if (cmyka === undefined) {
		        cmyka = [];
		    }
		    cmyka[0] = this.cmyk[0];
		    cmyka[1] = this.cmyk[1];
		    cmyka[2] = this.cmyk[2];
		    cmyka[3] = this.cmyk[3];
		    cmyka[4] = this._alpha;
		    return cmyka;
		},
		
		toHex: function() {
		    var hex = dec2hex(this.toARGB());
		    if (hex.length > 6) {
		        hex = hex.substring(2);
		    }
		    return hex;
		},
		
		toHSVAArray: function(hsva) {
		    if (hsva === undefined) {
		        hsva = [];
		    }
		    hsva[0] = this.hsv[0];
		    hsva[1] = this.hsv[1];
		    hsva[2] = this.hsv[2];
		    hsva[3] = this._alpha;
		    return hsva;
		},

		/**
		 * to CSS's hsla() string
		 */
		toHSLACSS: function(){
			var hsva = this.toHSVAArray();
			//hue is 0 - 360
			hsva[0] = Math.floor(hsva[0] * 360);
			//saturation & value/luminosity is 0-100 (%)
			hsva[1] = Math.floor(hsva[1] * 100);
			hsva[2] = Math.floor(hsva[2] * 100);
			//alpha stays in range 0 - 1	

			return "hsla("+hsva[0]+","+hsva[1]+"%,"+hsva[2]+"%,"+hsva[3]+")";
		},
		
		/**
		 * to an Array of RGBA values
		 * @param rgba
		 * @param offset (optional)
		 * @return rgba array
		 */
		toRGBAArray: function(rgba, offset) {
		    if (rgba === undefined) {
		        rgba = [];
		    }
		    if(offset == undefined){
		    	offset = 0;
		    }
		    rgba[offset++] = this.rgb[0];
		    rgba[offset++] = this.rgb[1];
		    rgba[offset++] = this.rgb[2];
		    rgba[offset] = this._alpha;
		    return rgba;
		},

		/**
		 * to an rgba string valid for CSS Color Module's rgba()
		 * @param asPercents if true creates string based on percents rather than 0-255
		 */
		toRGBACSS: function(asPercents){
			asPercents == asPercents || false;
			var rgba = this.toRGBAArray();
			if(asPercents) {
				rgba[0] = Math.floor(rgba[0] * 100);
				rgba[1] = Math.floor(rgba[1] * 100);
				rgba[2] = Math.floor(rgba[2] * 100);
				return "rgba("+rgba[0]+"%,"+rgba[1]+"%,"+rgba[2]+"%,"+rgba[3]+")";
			}
			//as 0 - 255
			rgba[0] = Math.floor(rgba[0] * 255);
			rgba[1] = Math.floor(rgba[1] * 255);
			rgba[2] = Math.floor(rgba[2] * 255);
			return "rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+rgba[3]+")";
		},
		
		toString: function(){
			return "toxi.color.TColor: rgb: "+this.rgb[0] + ", " +this.rgb[1] + ", "+this.rgb[2]+ 
					" hsv: "+ this.hsv[0] + ","+this.hsv[1]+","+this.hsv[2]+
					" cmyk: "+this.cmyk[0] + ", "+this.cmyk[1]+","+this.cmyk[2]+","+this.cmyk[3]+
					" alpha: "+this._alpha;
		},
		
		yellow: function() {
		    return this.cmyk[2];
		}
		
	};
	
	
	
	toxi.color.TColor.INV60DEGREES = 60.0 / 360;
	toxi.color.TColor.INV8BIT = 1.0 / 255;
	toxi.color.TColor.EPS = 0.001;
	/*
	    protected static final Vec2D[] RYB_WHEEL = new Vec2D[] { new Vec2D(0, 0),
	            new Vec2D(15, 8), new Vec2D(30, 17), new Vec2D(45, 26),
	            new Vec2D(60, 34), new Vec2D(75, 41), new Vec2D(90, 48),
	            new Vec2D(105, 54), new Vec2D(120, 60), new Vec2D(135, 81),
	            new Vec2D(150, 103), new Vec2D(165, 123), new Vec2D(180, 138),
	            new Vec2D(195, 155), new Vec2D(210, 171), new Vec2D(225, 187),
	            new Vec2D(240, 204), new Vec2D(255, 219), new Vec2D(270, 234),
	            new Vec2D(285, 251), new Vec2D(300, 267), new Vec2D(315, 282),
	            new Vec2D(330, 298), new Vec2D(345, 329), new Vec2D(360, 0) };
	*/
	
	/**
	 * Maximum rgb component value for a color to be classified as black.
	 * 
	 * @see #isBlack()
	 */
	toxi.color.TColor.BLACK_POINT = 0.08;
	
	/**
	 * Minimum rgb component value for a color to be classified as white.
	 * 
	 * @see #isWhite()
	 */
	toxi.color.TColor.WHITE_POINT = 1.0;
	
	/**
	 * Maximum saturations value for a color to be classified as grey
	 * 
	 * @see #isGrey()
	 */
	toxi.color.TColor.GREY_THRESHOLD = 0.01;
	
	
	
	/**
	 * Converts CMYK floats into an RGB array.
	 * 
	 * @param c
	 * @param m
	 * @param y
	 * @param k
	 * @param rgb optional rgb array to populate
	 * @return rgb array
	 */
	toxi.color.TColor.cmykToRGB = function(c,m,y,k,rgb) {
		if(rgb ===undefined){
			rgb = [0,0,0];
		}
		rgb[0] = 1.0 - Math.min(1.0, c + k);
		rgb[1] = 1.0 - Math.min(1.0, m + k);
		rgb[2] = 1.0 - Math.min(1.0, y + k);
		return rgb;
	};
	
	
	/**
	 * Converts hex string into a RGB array.
	 * 
	 * @param hexRGB
	 * @param rgb array optional
	 * @return rgb array
	 */
	toxi.color.TColor.hexToRGB = function(hexRGB,rgb) {
		if(rgb === undefined){ rgb = []; }
		//var rgbInt = parseInt(hexRGB,16);
		hexRGB = (hexRGB.charAt(0)=="#") ? hexRGB.substring(1,7):hexRGB;
		rgb[0] = parseInt(hexRGB.substring(0,2),16) * toxi.color.TColor.INV8BIT;//((rgbInt >> 16) & 0xff) * toxi.color.TColor.INV8BIT;
		rgb[1] = parseInt(hexRGB.substring(2,4),16) * toxi.color.TColor.INV8BIT;//((rgbInt >> 8) & 0xff) * toxi.color.TColor.INV8BIT;
		rgb[2] = parseInt(hexRGB.substring(4,6),16) * toxi.color.TColor.INV8BIT;//((rgbInt & 0xff) * toxi.color.TColor.INV8BIT);
	    return rgb;
	};
	
	
	/**
	 * Converts HSV values into RGB array.
	 * 
	 * @param h
	 * @param s
	 * @param v
	 * @param rgb array optional
	 * @return rgb array
	 */
	toxi.color.TColor.hsvToRGB = function(h, s, v,rgb) {
		if(rgb === undefined){ rgb = []; }
		if(s === 0.0){
			rgb[0] = rgb[1] = rgb[2] = v;
		} else {
			h /= toxi.color.TColor.INV60DEGREES;
			var i =  parseInt(h,10),
				f = h - i,
				p = v * (1 - s),
				q = v * (1 - s * f),
				t = v * (1 - s * (1 - f));
	
	        if (i === 0) {
	            rgb[0] = v;
	            rgb[1] = t;
	            rgb[2] = p;
	        } else if (i == 1) {
	            rgb[0] = q;
	            rgb[1] = v;
	            rgb[2] = p;
	        } else if (i == 2) {
	            rgb[0] = p;
	            rgb[1] = v;
	            rgb[2] = t;
	        } else if (i == 3) {
	            rgb[0] = p;
	            rgb[1] = q;
	            rgb[2] = v;
	        } else if (i == 4) {
	            rgb[0] = t;
	            rgb[1] = p;
	            rgb[2] = v;
	        } else {
	            rgb[0] = v;
	            rgb[1] = p;
	            rgb[2] = q;
	        }
	    }
	    return rgb;
	};
	
	/**
	 * Converts CIE Lab to RGB components.
	 * 
	 * First we have to convert to XYZ color space. Conversion involves using a
	 * white point, in this case D65 which represents daylight illumination.
	 * 
	 * Algorithm adopted from: http://www.easyrgb.com/math.php
	 * 
	 * @param l
	 * @param a
	 * @param b
	 * @param rgb
	 * @return rgb array
	 */
	toxi.color.TColor.labToRGB = function(l, a, b,rgb) {
		if(rgb === undefined){ rgb = []; }
	    var y = (l + 16) / 116.0,
			x = a / 500.0 + y,
			z = y - b / 200.0,
			i = 0;
	    rgb[0] = x;
	    rgb[1] = y;
	    rgb[2] = z;
	    for (i = 0; i < 3; i++) {
	        var p = Math.pow(rgb[i], 3);
	        if (p > 0.008856) {
	            rgb[i] = p;
	        } else {
	            rgb[i] = (rgb[i] - 16 / 116.0) / 7.787;
	        }
	    }
	
	    // Observer = 2, Illuminant = D65
	    x = rgb[0] * 0.95047;
	    y = rgb[1];
	    z = rgb[2] * 1.08883;
	
	    rgb[0] = x * 3.2406 + y * -1.5372 + z * -0.4986;
	    rgb[1] = x * -0.9689 + y * 1.8758 + z * 0.0415;
	    rgb[2] = x * 0.0557 + y * -0.2040 + z * 1.0570;
	    var tpow = 1 / 2.4;
	    for (i = 0; i < 3; i++) {
	        if (rgb[i] > 0.0031308) {
	            rgb[i] = (1.055 * Math.pow(rgb[i], tpow) - 0.055);
	        } else {
	            rgb[i] = 12.92 * rgb[i];
	        }
	    }
	    return rgb;
	};
	
	/**
	 * Factory method. Creates new color from ARGB int.
	 * 
	 * @param argb
	 * @return new color
	 */
	toxi.color.TColor.newARGB = function(argb) {
	    return toxi.color.TColor.newRGBA(((argb >> 16) & 0xff) * toxi.color.TColor.INV8BIT, ((argb >> 8) & 0xff) * toxi.color.TColor.INV8BIT, (argb & 0xff) * toxi.color.TColor.INV8BIT, (argb >>> 24) * toxi.color.TColor.INV8BIT);
	};
	
	/**
	Factory method. Creates new color from CMYK values. 
	@param c
	@param m
	@param y
	@param k
	@return new color
	*/
	toxi.color.TColor.newCMYK = function(c, m, y, k) {
	    return toxi.color.TColor.newCMYKA(c, m, y, k, 1);
	};
	
	/**
	Factory method. Creates new color from CMYK + alpha values. 
	@param c
	@param m
	@param y
	@param k
	@param a
	@return new color
	*/
	toxi.color.TColor.newCMYKA = function(c, m, y, k, a) {
	    var col = new toxi.color.TColor();
	    col.setCMYK([c, m, y, k ]);
	    col.setAlpha(toxi.MathUtils.clip(a, 0, 1));
	    return col;
	};
	
	/**
	Factory method. Creates a new shade of gray + alpha. 
	@param gray
	@return new color.
	*/
	toxi.color.TColor.newGray = function(gray) {
	    return toxi.color.TColor.newGrayAlpha(gray, 1);
	};
	
	toxi.color.TColor.newGrayAlpha = function(gray, alpha) {
	    var c = new toxi.color.TColor();
	    c.setRGB([gray, gray, gray ]);
	    c.setAlpha(alpha);
	    return c;
	};
	
	/**
	Factory method. New color from hex string. 
	@param hexRGB
	@return new color
	*/
	toxi.color.TColor.newHex = function(hexRGB) {
	    var c = new toxi.color.TColor();
	    c.setRGB(toxi.color.TColor.hexToRGB(hexRGB));
	    c.setAlpha(1);
	    return c;
	};
	
	/**
	Factory method. New color from hsv values. 
	@param h
	@param s
	@param v
	@return new color
	*/
	toxi.color.TColor.newHSV = function(h, s, v) {
	    return toxi.color.TColor.newHSVA(h, s, v, 1);
	};
	
	
	toxi.color.TColor.newHSVA = function(h, s,v,a) {
	    var c = new toxi.color.TColor();
	    c.setHSV(h, s, v);
	    c.setAlpha(toxi.MathUtils.clip(a, 0, 1));
	    return c;
	};
	
	/**
	Factory method. Creates new random color. Alpha is always 1.0. 
	@return random color
	*/
	toxi.color.TColor.newRandom = function() {
	    return toxi.color.TColor.newRGBA(Math.random(), Math.random(), Math.random(), 1);
	};
	
	/**
	Factory method. Creates new color from RGB values. Alpha is set to 1.0.
	@param r
	@param g
	@param b
	@return new color
	*/
	toxi.color.TColor.newRGB = function(r, g, b) {
	    return toxi.color.TColor.newRGBA(r, g, b, 1);
	};
	
	toxi.color.TColor.newRGBA = function( r, g, b, a) {
	    var c = new toxi.color.TColor();
	    c.setRGB([ r, g, b ]);
	    c.setAlpha(toxi.MathUtils.clip(a, 0, 1));
	    return c;
	};
	
	/**
	Converts the RGB values into a CMYK array. 
	@param r
	@param g
	@param b
	@param cmyk array optional
	@return cmyk array
	*/
	toxi.color.TColor.rgbToCMYK = function(r, g, b,cmyk) {
		if(cmyk === undefined){ cmyk = []; }
		cmyk[0] = 1 - r;
		cmyk[1] = 1 - g;
	    cmyk[2] = 1 - b;
	    cmyk[3] = toxi.MathUtils.min(cmyk[0], cmyk[1], cmyk[2]);
	    cmyk[0] = toxi.MathUtils.clip(cmyk[0] - cmyk[3], 0, 1);
	    cmyk[1] = toxi.MathUtils.clip(cmyk[1] - cmyk[3], 0, 1);
	    cmyk[2] = toxi.MathUtils.clip(cmyk[2] - cmyk[3], 0, 1);
	    cmyk[3] = toxi.MathUtils.clip(cmyk[3], 0, 1);
	    return cmyk;
	};
	
	
	/**
	Formats the RGB float values into hex integers. 
	@param r
	@param g
	@param b
	@return hex string
	*/
	toxi.color.TColor.rgbToHex = function(r, g, b) {
		var hex = dec2hex(toxi.MathUtils.clip(r, 0, 1) * 0xff) + dec2hex(toxi.MathUtils.clip(g, 0, 1) * 0xff) + dec2hex(toxi.MathUtils.clip(b, 0, 1) * 0xff);
		return hex;
	};
	
	/**
	Converts the RGB values into an HSV array. 
	@param r
	@param g
	@param b
	@param hsv optional
	@return hsv array
	*/
	toxi.color.TColor.rgbToHSV = function(r, g, b,hsv) {
		if(hsv ===undefined){ hsv = []; }
		var h = 0, 
			s = 0,
			v = toxi.MathUtils.max(r, g, b),
			d = v - toxi.MathUtils.min(r, g, b);
	
		if (v !== 0) {
			s = d / v;
		}
		if (s !== 0) {
			if (r == v) {
				h = (g - b) / d;
			} else if (g == v) {
				h = 2 + (b - r) / d;
			} else {
				h = 4 + (r - g) / d;
			}
		}
		h *= toxi.color.TColor.INV60DEGREES;
		if (h < 0) {
			h += 1.0;
		}
		hsv[0] = h;
		hsv[1] = s;
		hsv[2] = v;
		return hsv;
	};
	
	toxi.color.TColor.RED = toxi.color.TColor.newRGB(1, 0, 0);
	toxi.color.TColor.RYB_WHEEL = [ 
		new toxi.Vec2D(0, 0),
		new toxi.Vec2D(15, 8), new toxi.Vec2D(30, 17), new toxi.Vec2D(45, 26),
		new toxi.Vec2D(60, 34), new toxi.Vec2D(75, 41), new toxi.Vec2D(90, 48),
		new toxi.Vec2D(105, 54), new toxi.Vec2D(120, 60), new toxi.Vec2D(135, 81),
		new toxi.Vec2D(150, 103), new toxi.Vec2D(165, 123), new toxi.Vec2D(180, 138),
		new toxi.Vec2D(195, 155), new toxi.Vec2D(210, 171), new toxi.Vec2D(225, 187),
		new toxi.Vec2D(240, 204), new toxi.Vec2D(255, 219), new toxi.Vec2D(270, 234),
		new toxi.Vec2D(285, 251), new toxi.Vec2D(300, 267), new toxi.Vec2D(315, 282),
		new toxi.Vec2D(330, 298), new toxi.Vec2D(345, 329), new toxi.Vec2D(360, 0)
	];
	toxi.color.TColor.GREEN = toxi.color.TColor.newRGB(0, 1, 0);
	toxi.color.TColor.BLUE = toxi.color.TColor.newRGB(0, 0, 1);
	toxi.color.TColor.CYAN = toxi.color.TColor.newRGB(0, 1, 1);
	toxi.color.TColor.MAGENTA = toxi.color.TColor.newRGB(1, 0, 1);
	toxi.color.TColor.YELLOW = toxi.color.TColor.newRGB(1, 1, 0);
	toxi.color.TColor.BLACK = toxi.color.TColor.newRGB(0, 0, 0);
	toxi.color.TColor.WHITE = toxi.color.TColor.newRGB(1, 1, 1);

})();
/** @namespace */
toxi.physics2d = toxi.physics2d || {};

toxi.physics2d.removeItemFrom = function(item,array){
	var index = array.indexOf(item);
	if(index > -1){
		return array.splice(index,1);
	}
	return undefined;
};
toxi.physics2d.VerletParticle2D = function(x,y,w){
	this.force = new toxi.Vec2D();
	if(x instanceof toxi.Vec2D){
		if(x instanceof toxi.physics2d.VerletParticle2D){
			
			y = x.y;
			w = x.weight;
			x = x.x;
			this.isLocked = x.isLocked;
			
		} else if(y === undefined){
			y = x.y;
			w = 1;
			x = x.x;
		} else {
			w = y;
			y = x.y;
			x = x.x;
		}
	}
	toxi.Vec2D.apply(this,[x,y]);
	this.isLocked = false;
	this.prev = new toxi.Vec2D(this);
	this.temp = new toxi.Vec2D();
	w = w || 1;
	this.setWeight(w);
};

toxi.extend(toxi.physics2d.VerletParticle2D,toxi.Vec2D);

toxi.physics2d.VerletParticle2D.prototype.addBehavior = function(behavior,timeStep){
	if(this.behaviors === undefined){
		this.behaviors = [];
	}
	if(behavior === undefined){
		throw { name: "TypeError", message: "behavior was undefined"};
	}
	timeStep = (timeStep === undefined)? 1 : timeStep;
	behavior.configure(timeStep);
	this.behaviors.push(behavior);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.addConstraint = function(c){
	if(this.constraints === undefined){
		this.constraints = [];
	}
	this.constraints.push(c);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.addForce = function(f){
	this.force.addSelf(f);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.addVelocity = function(v){
	this.prev.subSelf(v);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.applyBehaviors = function(){
	if(this.behaviors !== undefined){
		var i = 0;
		for(i = 0;i<this.behaviors.length;i++){
			this.behaviors[i].applyBehavior(this);
		}
	}
};

toxi.physics2d.VerletParticle2D.prototype.applyConstraints = function(){
	if(this.constraints !== undefined){
		var i =0;
		for(i =0;i<this.constraints.length;i++){
			this.constraints[i].applyConstraint(this);
		}
	}
};


toxi.physics2d.VerletParticle2D.prototype.clearForce = function(){
	this.force.clear();
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.clearVelocity = function(){
	this.prev.set(this);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.getInvWeight = function(){
	return this.invWeight;
};

toxi.physics2d.VerletParticle2D.prototype.getPreviousPosition = function(){
	return this.prev;
};

toxi.physics2d.VerletParticle2D.prototype.getVelocity = function(){
	return this.sub(this.prev);
};

toxi.physics2d.VerletParticle2D.prototype.getWeight = function(){
	return this.weight;
};

toxi.physics2d.VerletParticle2D.prototype.lock = function(){
	this.isLocked = true;
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.removeAllBehaviors = function(){
	this.behaviors = [];
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.removeAllConstraints = function(){
	this.constraints = [];
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.removeBehavior = function(b){
	return toxi.physics2d.removeItemFrom(b,this.behaviors);
};

toxi.physics2d.VerletParticle2D.prototype.removeConstraint = function(c){
	return toxi.physics2d.removeItemFrom(c,this.constraints);
};

toxi.physics2d.VerletParticle2D.prototype.scaleVelocity = function(scl){
	this.prev.interpolateToSelf(this,1 - scl);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.setPreviousPosition = function(p){
	this.prev.set(p);
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.setWeight = function(w){
	this.weight = w;
	this.invWeight = (w !== 0) ? 1 / w : 0; //avoid divide by zero
};

toxi.physics2d.VerletParticle2D.prototype.unlock = function() {
	this.clearVelocity();
	this.isLocked = false;
	return this;
};

toxi.physics2d.VerletParticle2D.prototype.update = function(){
	
	if(!this.isLocked){
		var that = this;
		this.applyBehaviors();
		//applyForce protected
		(function(){
			that.temp.set(that);
			that.addSelf(that.sub(that.prev).addSelf(that.force.scale(that.weight)));
			that.prev.set(that.temp);
			that.force.clear();
		})();
		this.applyConstraints();
	}
};
toxi.physics2d.VerletSpring2D = function(a,b,len,str){
	this.a = a;
	this.b = b;
	this.restLength = len;
	this.strength = str;
};

toxi.physics2d.VerletSpring2D.EPS = 1e-6;

toxi.physics2d.VerletSpring2D.prototype = {
	getRestLength: function(){
		return this.restLength;
	},
	
	getStrength: function(){
		return this.strength;
	},
	
	lockA: function(s){
		this.isALocked = s;
		return this;
	},
	
	lockB: function(s){
		this.isALocked = s;
		return this;
	},
	
	setRestLength: function(len){
		this.restLength = len;
		this.restLengthSquared = len * len;
		return this;
	},
	
	setStrength: function(strength){
		this.strength = strength;
		return this;
	},
	
	update: function(applyConstraints){ //protected
		var delta = this.b.sub(this.a);
		//add minute offset to avoid div-by-zero errors
		var dist = delta.magnitude() + toxi.physics2d.VerletSpring2D.EPS;
		var normDistStrength = (dist - this.restLength) / (dist * (this.a.invWeight + this.b.invWeight)) * this.strength;
		if(!this.a.isLocked && !this.isALocked){
			this.a.addSelf(
				delta.scale(normDistStrength * this.a.invWeight)
			);
			if(applyConstraints){
				this.a.applyConstraints();
			}
		}
		if(!this.b.isLocked && !this.isBLocked){
			this.b.addSelf(
				delta.scale(-normDistStrength * this.b.invWeight)
			);
			if(applyConstraints){
				this.b.applyConstraints();
			}
		}
	}
};toxi.physics2d.AttractionBehavior = function(attractor,radius,strength,jitter){
	if(arguments.length < 3){
		throw { name: "IncorrectParameters", message: "Constructor received incorrect Parameters"};
	}
	this.jitter = jitter || 0;	
	this.attractor = attractor;
	this.strength = strength;
	this.setRadius(radius);
};

toxi.physics2d.AttractionBehavior.prototype = {
	applyBehavior: function(p){ //apply() is reserved, so this is now applyBehavior
		var delta = this.attractor.sub(p);
		var dist = delta.magSquared();
		if(dist < this.radiusSquared){
			var f = delta.normalizeTo((1.0 - dist / this.radiusSquared)).jitter(this.jitter).scaleSelf(this.attrStrength);
			p.addForce(f);
		}
	},
	
	configure: function(timeStep){
		this.timeStep = timeStep;
		this.setStrength(this.strength);
	},
	
	getAttractor: function(){
		return this.attractor;
	},
	
	getJitter: function(){
		return this.jitter;
	},
	
	getRadius: function(){
		return this.radius;
	},
	
	getStrength: function(){
		return this.strength;
	},
	
	setAttractor: function(attractor){
		this.attractor = attractor;
	},
	
	setJitter: function(jitter){
		this.jitter = jitter;
	},
	
	setRadius: function(r){
		this.radius = r;
		this.radiusSquared = r * r;
	},
	
	setStrength: function(strength){
		this.strength = strength;
		this.attrStrength = strength * this.timeStep;
	}
};
	
//expected to implement ParticleBehavior interface

toxi.physics2d.ConstantForceBehavior = function(force){
	this.force = force;
	this.scaleForce = new toxi.Vec2D();
	this.timeStep = 0;
};

toxi.physics2d.ConstantForceBehavior.prototype = {
	applyBehavior: function(p){ //apply() is reserved, so this is now applyBehavior
		p.addForce(this.scaledForce);
	},
	
	configure: function(timeStep){
		this.timeStep = timeStep;
		this.setForce(this.force);
	},
	
	getForce: function(){
		return this.force;
	},
	
	setForce: function(forceVec){
		this.force = forceVec;
		this.scaledForce = this.force.scale(this.timeStep);
	},
	
	toString: function(){
		return "behavior force: "+ this.force+ " scaledForce: "+this.scaledForce+ " timeStep: "+this.timeStep;
	}
};
toxi.physics2d.GravityBehavior = function(gravityVec){
	toxi.physics2d.ConstantForceBehavior.apply(this,[gravityVec]);
};

toxi.extend(toxi.physics2d.GravityBehavior,toxi.physics2d.ConstantForceBehavior);

toxi.physics2d.GravityBehavior.prototype.configure = function(timeStep){
	this.timeStep = timeStep;
    this.scaledForce = this.force.scale(timeStep * timeStep);
};//either Vec2D + angle
toxi.physics2d.AngularConstraint = function(theta_p,theta){

	if(arguments.length > 1){
		var p = theta_p;
		this.theta = theta;
		this.rootPos = new toxi.Vec2D(p);
	} else {
		this.rootPos = new toxi.Vec2D();
		this.theta = theta_p;
	}
	if(parseInt(this.theta,10) != this.theta){
		this.theta = toxi.MathUtils.radians(this.theta);
	}
};


toxi.physics2d.AngularConstraint.prototype.applyConstraint = function(p){
	var delta = p.sub(this.rootPos);
	var heading = toxi.MathUtils.floor(delta.heading() / this.theta) * this.theta;
	p.set(this.rootPos.add(toxi.Vec2D.fromTheta(heading).scaleSelf(delta.magnitude())));
};/**
 * Constrains a particle's movement by locking a given axis to a fixed value.
 */
toxi.physics2d.AxisConstraint = function(axis,constraintAmount){
	this.axis = axis;
	this.constraint = constraintAmount;
};

toxi.physics2d.AxisConstraint.prototype.applyConstraint = function(p){
	p.setComponent(this.axis,this.constraint);
};toxi.physics2d.CircularConstraint = function(a,b){
	if(arguments.length == 1){
		this.circle = a;
	} else {
		console.log("a: "+a);
		this.circle = new toxi.Circle(a,b);
	}
};

toxi.physics2d.CircularConstraint.prototype.applyConstraint = function(p){
	if(this.circle.containsPoint(p)){
		p.set(this.circle.add(p.sub(this.circle).normalizeTo(this.circle.getRadius())));
	}
};toxi.physics2d.MaxConstraint = function(axis,threshold){
	this.axis = axis;
	this.threshold = threshold;	
};

toxi.physics2d.MaxConstraint.prototype.applyConstraint = function(p){
	if(p.getComponent(this.axis) > this.threshold){
		p.setComponent(this.axis,this.threshold);
	}
};toxi.physics2d.MinConstraint = function(axis,threshold){
	this.axis = axis;
	this.threshold = threshold;
};

toxi.physics2d.MinConstraint.prototype.applyConstraint = function(p){
	if(p.getComponent(this.axis) < this.threshold){
		p.setComponent(this.axis, this.threshold);
	}
};toxi.physics2d.RectConstraint = function(a,b){
	if(arguments.length == 1){
		this.rect = a.copy();
	} else if(arguments.length > 1){
		this.rect = new toxi.Rect(a,b);
	}
	this.intersectRay = new toxi.Ray2D(this.rect.getCentroid(), new toxi.Vec2D());
};

toxi.physics2d.RectConstraint.prototype = {
	applyConstraint: function(p){
		if(this.rect.containsPoint(p)){
			p.set(this.rect.intersectsRay(this.intersectRay.setDirection(this.intersectRay.sub(p)),0,Number.MAX_VALUE));
		}
	},
	
	getBox: function(){
		return this.rect.copy();
	},
	
	setBox: function(rect){
		this.rect = rect.copy();
		this.intersectRay.set(this.rect.getCentroid());
	}	
};toxi.physics2d.ParticlePath2D = function(points){
	toxi.Spline2D.call(this,points);
	this.particles = [];
};
toxi.extend(toxi.physics2d.ParticlePath2D,toxi.Spline2D);

(function(){
	//protected
	var createSingleParticle = function(pos,mass){
		return new toxi.physics2d.VerletParticle2D(pos,mass);
	};
	
	//public
	toxi.physics2d.ParticlePath2D.prototype.createParticles = function(physics,subDiv,step,mass){
		this.particles = [];
		this.computeVertices(subDiv);
		var i = 0;
		var dv = this.getDecimatedVertices(step,true);
		for(i = 0; i < dv; i++){
			var p = this.createSingleParticle(v,mass);
			this.particles.push(p);
			physics.addParticle(p);
		}
		return this.particles;
	};


})();/**
* Utility builder/grouping/management class to connect a set of particles into
* a physical string/thread. Custom spring types can be used by subclassing this
* class and overwriting the
* {@link #createSpring(VerletParticle2D, VerletParticle2D, float, float)}
method.
*/

 /**
  Construct a ParticleString2D,
  parameter options:
  1 - options object
  3 - VerletPhysics2D physics, Array<VerletParticle2D> plist, Number strength
  6 - VerletPhysics2D physic, Vec2D pos, Vec2D step, Number num, Number mass, Number strength
  */
  
toxi.physics2d.ParticleString2D = function(){
	var opts = {
		physics: undefined,
		plist: undefined,
		pos: undefined,
		step: undefined,
		num: undefined,
		mass: undefined,
		strength: undefined
	},
	is6ParamConstructor = false;
	if(arguments.length === 0){
		throw new Error("Incorrect Parameters");
	} else if(arguments.length == 1){ //options object
		var arg = arguments[0];
		for(var prop in arg){
			opts[prop] = arg[prop];
		}
	} else {
		opts.physics = arguments[0];
		if(arguments.length == 6){
			opts.pos = arguments[1];
			opts.step = arguments[2];
			opts.num = arguments[3];
			opts.mass = arguments[4];
			opts.strength = arguments[5];
		} else {
			opts.plist = arguments[1];
			opts.strength = arguments[2];
		}
	}
	if(opts.num !== undefined && opts.pos !== undefined && opts.step !== undefined && opts.mass !== undefined){
		is6ParamConstructor = true;
	}
	if(!is6ParamConstructor && opts.plist === undefined){
		throw new Error("Incorrect Parameters, please supply plist or num, pos, step & mass");
	}
	
	
	this.physics = opts.physics;
	this.links = [];
	
	var prev,
		p,
		s,
		strength,
		i = 0;
	
	
	if(is6ParamConstructor){
		var pos = opts.pos.copy(),
			step = opts.step,
			mass = opts.mass,
			len = step.magnitude();
		this.particles = [];
		strength = opts.strength;
		
		for(i = 0; i < opts.num; i++){
			p = new toxi.physics2d.VerletParticle2D(pos.copy(),mass);
			this.particles.push(p);
			this.physics.particles.push(p);
			if(prev !== undefined){
				s = this.createSpring(prev,p,len,strength);
				this.links.push(s);
				this.physics.addSpring(s);
			}
			prev = p;
			pos.addSelf(step);
		}
	} else {
		strength = opts.strength;
		this.particles = opts.plist || [];

		
		for(i = 0; i < this.particles.length; i++){
			p = this.particles[i];
			this.physics.addParticle(p);
			if(prev !== undefined){
				s = this.createSpring(prev,p,prev.distanceTo(p),strength);
				this.links.push(s);
				this.physics.addSpring(s);	
			}
			prev = p;
		}
	}
 }; 
toxi.physics2d.ParticleString2D.prototype = {
	clear: function(){
		for(var i = 0, len = this.links.length; i < len; i++){
			this.physics.removeSpringElements(s);
		}
		this.particles.clear();
		this.links.clear();
	},
	createSpring: function(a,b,len,strength){
		return new toxi.physics2d.VerletSpring2D(a,b,len,strength);
	},
	
	getHead: function(){
		return this.particles[0];
	},
	
	getNumParticles: function(){
		return this.particles.length;
	},
	
	getTail: function(){
		return this.particles[this.particles.length-1];
	}
	
};/**
* Creates a pullback spring (default restlength=0.5) between 2 particles and
* locks the first one given at the current position. The spring is only
* enforced if the current length of the spring exceeds the rest length. This
* behaviour is the opposite to the {@link VerletMinDistanceSpring2D}.
*/
 
 toxi.physics2d.PullBackString2D = function(a,b,strength){
	toxi.physics2d.VerletSpring2D.apply(this,[a,b,0,strength]);
	a.lock();
	this.setRestLength(0.5);
 };
 toxi.extend(toxi.physics2d.PullBackString2D,toxi.physics2d.VerletSpring2D);

 toxi.physics2d.PullBackString2D.prototype.update = function(applyConstraints){
	if(this.b.distanceToSquared(this.a) > this.restLengthSquared){
		this.parent.update.call(this,applyConstraints);
	}
 };toxi.physics2d.VerletConstrainedSpring2D = function(particleA, particleB, len, str, limit){
	toxi.physics2d.VerletSpring2D.call(this,particleA,particleB,len,str);
	this.limit = (limit === undefined) ? Number.MAX_VALUE : limit;
};

toxi.extend(toxi.physics2d.VerletConstrainedSpring2D,toxi.physics2d.VerletSpring2D);


toxi.physics2d.VerletConstrainedSpring2D.update = function(applyConstraints){
	var delta = this.b.sub(this.a);
    // add minute offset to avoid div-by-zero errors
    var dist = delta.magnitude() + toxi.physics2d.VerletSpring2D.EPS;
    var normDistStrength = (dist - this.restLength) / (dist * (this.a.invWeight + this.b.invWeight))* this.strength;
    if (!this.a.isLocked && !this.isALocked) {
        this.a.addSelf(delta.scale(normDistStrength * this.a.invWeight).limit(this.limit));
        if (applyConstraints) {
            this.a.applyConstraints();
        }
    }
    if (!this.b.isLocked && !this.isBLocked) {
        this.b.subSelf(delta.scale(normDistStrength * this.b.invWeight).limit(this.limit));
        if (applyConstraints) {
            this.b.applyConstraints();
        }
    }
};toxi.physics2d.VerletMinDistanceSpring2D = function(particleA,particleB,len,str){
	toxi.physics2d.VerletSpring2D.call(this,particleA,particleB,len,str);
	this.setRestLength(len);
};


toxi.extend(toxi.physics2d.VerletMinDistanceSpring2D,toxi.physics2d.VerletSpring2D);

toxi.physics2d.VerletMinDistanceSpring2D.prototype.update = function(applyConstraints){
	if(this.b.distanceToSquared(this.a) < this.restLengthSquared){
		this.parent.update.call(this,applyConstraints);
	}
};toxi.physics2d.VerletPhysics2D = function(gravity, numIterations, drag, timeStep){
	var opts = {
			numIterations: 50,
			drag: 0,
			timeStep: 1
		},
		args;
	if(arguments.length == 1 && (arguments[0].gravity || arguments[0].numIterations || arguments[0].timeStep || arguments[0].drag)){ //options object literal
		args = arguments[0];
		if(args.gravity !== undefined){
			gravity = args.gravity;
		}
		if(args.numIterations !== undefined){
			opts.numIterations = args.gravity;
		}
		if(args.drag !== undefined){
			opts.drag = args.drag;
		}
		if(args.timeStep !== undefined){
			opts.timeStep = args.timeStep;
		}
	}
	this.behaviors = [];
	this.particles = [];
	this.springs = [];
	this.numIterations = opts.numIterations;
	this.timeStep = opts.timeStep;
	this.setDrag(opts.drag);
	
	if(gravity){
		if(gravity instanceof toxi.physics2d.GravityBehavior){
			this.addBehavior(gravity);
		} else if(gravity instanceof Object && gravity.hasOwnProperty('x') && gravity.hasOwnProperty('y')){
			this.addBehavior(
				new toxi.physics2d.GravityBehavior(
					new toxi.Vec2D(gravity)
				)
			);
		}
	}
};

toxi.physics2d.VerletPhysics2D.addConstraintToAll = function(c, list){
	for(var i=0;i<list.length;i++){
		list[i].addConstraint(c);
	}
};

toxi.physics2d.VerletPhysics2D.removeConstraintFromAll = function(c,list){
	for(var i=0;i<list.length;i++){
		list[i].removeConstraint(c);
	}
};

toxi.physics2d.VerletPhysics2D.prototype = {
	
	addBehavior: function(behavior){
		behavior.configure(this.timeStep);
		this.behaviors.push(behavior);
	},
	
	addParticle: function(p){
		this.particles.push(p);
		return this;
	},
	
	addSpring: function(s){
		if(this.getSpring(s.a,s.b) === undefined){
			this.springs.push(s);
		}
		return this;
	},
	
	clear: function(){
		this.particles = [];
		this.springs = [];
		return this;
	},
	
	constrainToBounds: function(){ //protected
		var p,
			i = 0;
		for(i=0;i<this.particles.length;i++){
			p = this.particles[i];
			if(p.bounds !== undefined){
				p.constrain(p.bounds);
			}
		}
		if(this.worldBounds !== undefined){
			for(i=0;i<this.particles.length;i++){
				p = this.particles[i];
				p.constrain(this.worldBounds);
			}
		}
	},
	
	getCurrentBounds: function(){
		var min = new toxi.Vec2D(Number.MAX_VALUE, Number.MAX_VALUE);
		var max = new toxi.Vec2D(Number.MIN_VALUE, Number.MIN_VALUE);
		var i = 0,
			p;
		for(i = 0;i<this.particles.length;i++){
			p = this.particles[i];
			min.minSelf(p);
			max.maxSelf(p);
		}
		return new toxi.Rect(min,max);
	},
	
	getDrag: function() {
		return 1 - this.drag;
	},
	
	getNumIterations: function(){
		return this.numIterations;
	},
	
	getSpring: function(a,b){
		var i = 0;
		for(i = 0;i<this.springs.length;i++){
			var s = this.springs[i];
			if((s.a === a && s.b === b) || (s.a === b && s.b === b)){
				return s;
			}
		}
		return undefined;
	},
	
	getTimeStep: function(){
		return this.timeStep;
	},
	
	getWorldBounds: function(){
		return this.worldBounds;
	},
	
	removeBehavior: function(c){
		return toxi.physics2d.removeItemFrom(c,this.behaviors);
	},
	
	removeParticle: function(p){
		return toxi.physics2d.removeItemFrom(p,this.particles);
	},
	
	removeSpring: function(s) {
		return toxi.physics2d.removeItemFrom(s,this.springs);
	},
	
	removeSpringElements: function(s){
		if(this.removeSpring(s) !== undefined){
			return (this.removeParticle(s.a) && this.removeParticle(s.b));
		}
		return false;
	},
	
	setDrag: function(drag){
		this.drag = 1 - drag;
	},
	
	setNumIterations: function(numIterations){
		this.numIterations = numIterations;
	},
	
	setTimeStep: function(timeStep){
		this.timeStep = timeStep;
		var i =0;
		for(i = 0;i<this.behaviors.length;i++){
			var b = this.behaviors[i];
			b.configure(timeStep);
		}
	},
	
	setWorldBounds: function(world){
		this.worldBounds = world;
		return this;
	},
	
	update: function(){
		this.updateParticles();
		this.updateSprings();
		this.constrainToBounds();
		return this;
	},
	
	updateParticles: function(){
		var i = 0,
			j = 0,
			b,
			p;
		for(i = 0;i<this.behaviors.length;i++){
			b = this.behaviors[i];
			for(j = 0;j<this.particles.length;j++){
				p = this.particles[j];
				b.applyBehavior(p);
			}
		}
		for(j = 0;j<this.particles.length;j++){
			p = this.particles[j];
			p.scaleVelocity(this.drag);
			p.update();
		}
	},
	
	updateSprings: function(){
		var i = 0,
			j = 0;
		for(i = this.numIterations; i > 0; i--){
			for(j = 0;j<this.springs.length;j++){
				var s = this.springs[j];
				s.update(i === 1);
			}
		}
	}

};/** @namespace */
toxi.processing = toxi.processing || {};

(function(){
	toxi.processing.ToxiclibsSupport = function(processing,optional_gfx){
		this.sketch = processing;
		this.app = processing;
		if(optional_gfx !== undefined){
			this.gfx = processing;
		} else {
			this.gfx = this.app;
		}
		this._normalMap = new toxi.Matrix4x4().translateSelf(128,128,128).scaleSelf(127);
	};



	toxi.processing.ToxiclibsSupport.prototype = {
		box: function(aabb,smooth){
			var mesh = aabb.toMesh();
			if(smooth === undefined){
				smooth = false;
			}
			if(smooth){
				mesh.computeVertexNormals();
			}
			this.mesh(mesh,smooth,0);
		},
		
		circle: function(p,radius){
			this.gfx.ellipse(p.x,p.y,radius,radius);
		},
		
		cone: function(){
			var cone = arguments[0],
				res = 6,
				thetaOffset = 0,
				topClosed = true,
				bottomClosed = true,
				smooth = false;
			if(arguments.length == 5){
				res = arguments[1];
				topClosed = arguments[2];
				bottomClosed = arguments[3];
				smooth = arguments[4];
			} else if(arguments.length == 3){
				res = arguments[1];
				smooth = arguments[2];
			}
			
			var mesh = cone.toMesh({
				mesh: new toxi.TriangleMesh(),
				steps: res,
				thetaOffset: thetaOffset,
				topClosed: topClosed,
				bottomClosed: bottomClosed
			});
			
			if(smooth){
				mesh.computeVertexNormals();
			}
			window.mesh = mesh;
			this.mesh(mesh,smooth,0);
		},
		
		cylinder: function(cyl,res,smooth){
			if(arguments.length == 1){
				this.mesh(cyl.toMesh(),false,0);
			} else {
				var mesh = cyl.toMesh(res,0);
				if(smooth === undefined){
					smooth = false;
				}
				if(smooth){
					mesh.computeVertexNormals();
				}
				this.mesh(mesh,smooth,0);
			}
		},
		
		/*
		Pjs currently doesn't provide access to PGraphics properties,
		such as ellipseMode. So I am allowing it as an optional propery
		*/
		ellipse: function(e,ellipseMode){
			var r = e.getRadii();
			if(ellipseMode === undefined){
				ellipseMode = this.app.CENTER;
			}
			if(ellipseMode === this.app.CENTER){
				this.gfx.ellipse(e.x,e.y,r.x*2,r.y*2);
			} else if(ellipseMode === this.app.RADIUS){
				this.gfx.ellipse(e.x,e.y,r.x*2,r.y*2);
			} else if(ellipseMode === this.app.CORNER || this.gfx.ellipseMode === this.app.CORNERS){
				this.gfx.ellipse(e.x-r.x,e.y-r.y,r.x*2,r.y*2);
			}
		},
		
		getGraphics: function(){
			return this.gfx;
		},
		
		line: function(){
			var a,
				b;
			if(arguments.length == 1){
				var line = arguments[0];
				a = line.a;
				b = line.b;
			} else {
				a = arguments[0],
				b = arguments[1];
			}
			if(a.z === undefined){
				this.gfx.line(a.x,a.y,b.x,b.y);
			} else {
				this.gfx.line(a.x,a.y,a.z,b.x,b.y,b.z);
			}
		},
		
		lineStrip2D: function(points){
			//var isFilled = this.fill; //TODO <-- verify how this works!
			//this.gfx.fill = false;
			this.processVertices2D(points,this.app.POLYGON,false);
			//this.gfx.fill = isFilled;
		},
		
		lineStrip3D: function(points){
			//var isFilled = this.gfx.fill;
			//this.gfx.fill = false;
			this.processVertices3D(points,this.app.POLYGON,false);
			//this.gfx.fill = isFilled;
		},
		
		mesh: function(mesh,smooth,normalLength){
			if(smooth === undefined){
				smooth = false;
			}
			if(normalLength === undefined){
				normalLength = 0;
			}
			
			this.gfx.beginShape(this.app.TRIANGLES);
			var i= 0,
				len = mesh.faces.length;
			if(smooth){
				for(i=0;i<len;i++){
					var f = mesh.faces[i];
					this.gfx.normal(f.a.normal.x,f.a.normal.y,f.a.normal.z);
					this.gfx.vertex(f.a.x,f.a.y,f.a.z);
					this.gfx.normal(f.b.normal.x,f.b.normal.y,f.b.normal.z);
					this.gfx.vertex(f.b.x,f.b.y,f.b.z);
					this.gfx.normal(f.c.normal.x,f.c.normal.y,f.c.normal.z);
					this.gfx.vertex(f.c.x,f.c.y,f.c.z);
				}
			} else {
				for(var i=0;i<len;i++){
					var f = mesh.faces[i];
					this.gfx.normal(f.normal.x,f.normal.y,f.normal.z);
					this.gfx.vertex(f.a.x,f.a.y,f.a.z);
					this.gfx.vertex(f.b.x,f.b.y,f.b.z);
					this.gfx.vertex(f.c.x,f.c.y,f.c.z);
				}
			}
			this.gfx.endShape();
			if(normalLength > 0){
				var strokeCol = 0;
				var isStroked = this.gfx.stroke;  //TODO <-- verify this works!
				if(isStroked){
					strokeCol = this.gfx.strokeColor;
				}
				len = mesh.vertices.length;
				if(smooth){
					for(i=0;i<len;i++){
						var v = mesh.vertices[i],
							w = v.add(v.normal.scale(normalLength));
							n = v.normal.scale(127);
						this.gfx.stroke(n.x + 128, n.y + 128, n.z + 128);
						this.gfx.line(v.x,v.y,v.z,w.x,w.y,w.z);
					}
				} else {
					var third = 1 / 3;
					len = mesh.faces.length;
					for(i=0;i<len;i++){
						var f = mesh.faces[i],
							c = f.a.add(f.b).addSelf(f.c).scaleSelf(third),
							d = c.add(f.normal.scale(normalLength)),
							n = f.normal.scale(127);
						this.gfx.stroke(n.x+128,n.y+128,n.z+128);
						this.gfx.line(c.x,c.y,c.z,d.x,d.y,d.z);
					}
				}
				if(isStroked){
					this.gfx.stroke(strokeCol);
				} else {
					this.gfx.noStroke();
				}
			}
		},
		
		meshNormalMapped: function(mesh,vertexNormals,normalLength){
			this.gfx.beginShape(this.app.TRIANGLES);
			var i =0,
				len = mesh.faces.length;
			if(vertexNormals){
				for(i=0;i<len;i++){
					var f = mesh.faces[i],
						n = this._normalMap.applyTo(f.a.normal);
					this.gfx.fill(n.x,n.y,n.z);
					this.gfx.normal(f.a.normal.x,f.a.normal.y,f.a.normal.z);
					this.gfx.vertex(f.a.x,f.a.y,f.a.z);
					n = this._normalMap.applyTo(f.b.normal);
					this.gfx.fill(n.x,n.y,n.z);
					this.gfx.normal(f.b.normal.x,f.b.normal.y,f.b.normal.z);
					this.gfx.vertex(f.b.x,f.b.y,f.b.z);
					n = this._normalMap.applyTo(f.c.nromal);
					this.gfx.fil(n.x,n.y,n.z);
					this.gfx.normal(f.c.normal.x,f.c.normal.y,f.c.normal.z);
					this.gfx.vertex(f.c.x,f.c.y,f.c.z);
				}
			} else {
				for(i = 0;i<len;i++){
					var f = mesh.faces[i];
					this.gfx.normal(f.normal.x,f.normal.y,f.normal.z);
					this.gfx.vertex(f.a.x,f.a.y,f.a.z);
					this.gfx.vertex(f.b.x,f.b.y,f.b.z);
					this.gfx.vertex(f.c.x,f.c.y,f.c.z);
				}
			}
			this.gfx.endShape();
			if(normalLength > 0){
				if(vertexNormals){
					len = mesh.vertices.length;
					for(i=0;i<len;i++){
						var v = mesh.vertices[i],
							w = v.add(v.normal.scale(normalLength)),
							n = v.normal.scale(127);
						this.gfx.stroke(n.x+128,n.y+128,n.z+128);
						this.gfx.line(v.x,v.y,v.z,w.x,w.y,w.z);
					}
				} else {
					len = mesh.faces.length;
					for(i=0;i<len;i++){
						var f = mesh.faces[i],
							c = f.getCentroid(),
							d = c.add(f.normal.scale(normalLength)),
							n = f.normal.scale(127);
						this.gfx.stroke(n.x+128,n.y+128,n.z+128);
						this.gfx.line(c.x,c.y,c.z,d.x,d.y,d.z);
					}
				}
			}
		},
		
		origin: function(){
			var o = undefined, len = undefined;
			if(arguments.length == 1){
				len = arguments[0];
				o = toxi.Vec3D.ZERO;
			} else {
				o = arguments[0];
				len = arguments[1];
			}
			
			this.gfx.stroke(255,0,0);
			this.gfx.line(o.x,o.y,o.z,o.x+len,o.y,o.z);
			this.gfx.stroke(0,255,0);
			this.gfx.line(o.x,o.y,o.z,o.x,o.y+len,o.z);
			this.gfx.stroke(0,0,255);
			this.gfx.line(o.x,o.y,o.z,o.x,o.y,o.z+len);
		},
		
		plane: function(plane,size){
			this.mesh(plane.toMesh(size),false,0);
		},
		
		point: function(p){
			if(p.z === undefined){
				this.gfx.point(p.x,p.y);
			} else {
				this.gfx.point(p.x,p.y,p.z);
			}
		},
		
		/**
		 * iterates and draws the provided 2D points
		 * @param {Array} or {Processing#Iterator} points to iterate
		 */
		points2D: function(points){
			this.processVertices2D(points,this.app.POINTS,false);
		},
		/**
		 * iterates and draws the provided 3D points
		 * @param {Array} or {Processing#Iterator} points to iterate
		 */
		points3D: function(points){
			this.processVertices3D(points,this.app.POINTS,false);
		},
		
		polygon2D: function(poly){
			this.processVertices2D(poly.vertices,this.app.POLYGON,false);
		},
		/**
		 * Processes the 2D vertices from a Processing.js Iterator object
		 * @params {Iterator} iterator
		 * @params {Number} shapeID
		 * @params {Boolean} closed
		 */
		processVertices2D: function(iterator, shapeID, closed){
			//if first param wasnt passed in as a pjs Iterator, make it one
			if(iterator.hasNext === undefined || iterator.next === undefined){
				iterator = new this.app.ObjectIterator( iterator );
			}
			this.gfx.beginShape(shapeID);
			for(var v  = void(0); iterator.hasNext() && ((v  = iterator.next()) || true);){
				this.gfx.vertex(v.x,v.y);
			}
			/*var i=0,
				len = points.length;
			for(i=0;i<len;i++){
				var v = points[i];
				this.gfx.vertex(v.x,v.y);
			}*/
			if(closed){
				this.gfx.endShape(this.app.CLOSE);
			} else {
				this.gfx.endShape();
			}
		},
		
		/**
		 * Processes the 3D vertices from a Processing.js Iterator object
		 * @params {Iterator} iterator
		 * @params {Number} shapeID
		 * @params {Boolean} closed
		 */
		processVertices3D: function(iterator,shapeID,closed){
			//if first param wasnt passed in as a pjs Iterator, make it one
			if(iterator.hasNext === undefined || iterator.next === undefined){
				iterator = new this.app.ObjectIterator( iterator );
			}
			this.gfx.beginShape(shapeID);
			for(var v  = void(0); iterator.hasNext() && ((v  = iterator.next()) || true);){
				this.gfx.vertex(v.x,v.y,v.z);
			}

			/*var i=0,
				len = points.length;
			for(i=0;i<len;i++){
				var v = points[i];
				this.gfx.vertex(v.x,v.y,v.z);
			}*/
			if(closed){
				this.gfx.endShape(this.app.CLOSE);
			} else {
				this.gfx.endShape();
			}
		},
		
		ray: function(ray, length){
			var e = ray.getPointAtDistance(length);
			if(ray.z === undefined){
				this.gfx.line(ray.x,ray.y,e.x,e.y);
			} else {
				this.gfx.line(ray.x,ray.y,ray.z,e.x,e.y,e.z);
			}
		},
		
		/*
		Pjs currently doesn't provide access to PGraphics properties,
		such as rectMode. So I am allowing it as an optional propery
		*/
		rect: function(r,rectMode){
			if(rectMode === undefined){
				rectMode = this.app.CORNER;
			}
			if(rectMode === this.app.CORNER){
				this.gfx.rect(r.x,r.y,r.width,r.height);
			} else if(rectMode === this.app.CORNERS){
				this.gfx.rect(r.x,r.y,r.x+r.width,r.y+r.height);
			} else if(rectMode === this.app.CENTER){
				this.gfx.rect(r.x+r.widt*0.5,r.y+r.height*0.5,r.width,r.height);
			} else if(rectMode === this.app.RADIUS){
				var rw = r.width * 0.5,
					rh = r.height *0.5;
				this.gfx.rect(r.x+rw,r.y+rh,rw,rh);
			}
		},
		
		setGraphics: function(gfx){
			this.gfx = gfx;
		},
		sphere: function(sphere, res,smooth){
			this.mesh(sphere.toMesh(res), smooth);
		},
		texturedMesh: function(mesh,tex,smooth){
			this.gfx.beginShape(this.app.TRIANGLES);
			this.gfx.texture(tex);
			var i =0,
				len = mesh.faces.length;
			if(smooth){
				for(i=0;i<len;i++){
					var f = mesh.faces[i];
					if(f.uvA !== undefined && f.uvB !== undefined && f.uvC !== undefined){
						this.gfx.normal(f.a.normal.x, f.a.normal.y, f.a.normal.z);
                    	this.gfx.vertex(f.a.x, f.a.y, f.a.z, f.uvA.x, f.uvA.y);
                    	this.gfx.normal(f.b.normal.x, f.b.normal.y, f.b.normal.z);
                    	this.gfx.vertex(f.b.x, f.b.y, f.b.z, f.uvB.x, f.uvB.y);
                    	this.gfx.normal(f.c.normal.x, f.c.normal.y, f.c.normal.z);
                    	this.gfx.vertex(f.c.x, f.c.y, f.c.z, f.uvC.x, f.uvC.y);
                	} else {
                    	this.gfx.vertex(f.a.x, f.a.y, f.a.z);
                    	this.gfx.vertex(f.b.x, f.b.y, f.b.z);
                    	this.gfx.vertex(f.c.x, f.c.y, f.c.z);
					}
				}
			} else {
				for(i=0;i<len;i++){
					var f= mesh.faces[i];
					this.gfx.normal(f.normal.x,f.normal.y,f.normal.z);
					if(f.uvA !== undefined && f.uvB !== undefined && f.uvC !== undefined){
						this.gfx.vertex(f.a.x, f.a.y, f.a.z, f.uvA.x, f.uvA.y);
                    	this.gfx.vertex(f.b.x, f.b.y, f.b.z, f.uvB.x, f.uvB.y);
                    	this.gfx.vertex(f.c.x, f.c.y, f.c.z, f.uvC.x, f.uvC.y);
                	} else {
                    	this.gfx.vertex(f.a.x, f.a.y, f.a.z);
                    	this.gfx.vertex(f.b.x, f.b.y, f.b.z);
                    	this.gfx.vertex(f.c.x, f.c.y, f.c.z);
					}
				}
			}
			this.gfx.endShape();
		},
		
		//works for toxi.Triangle or toxi.Triangle2D
		triangle: function(tri,isFullShape){
			if(isFullShape || isFullShape === undefined){
				this.gfx.beginShape(this.app.TRIANGLES);
			}
			if(tri instanceof toxi.Triangle){
				var n = tri.computeNormal();
				this.gfx.normal(n.x,n.y,n.z);
				this.gfx.vertex(tri.a.x, tri.a.y, tri.a.z);
				this.gfx.vertex(tri.b.x, tri.b.y, tri.b.z);
				this.gfx.vertex(tri.c.x, tri.c.y, tri.c.z);
			} else { //should be Triangle2D
				this.gfx.vertex(tri.a.x,tri.a.y);
				this.gfx.vertex(tri.b.x,tri.b.y);
				this.gfx.vertex(tri.c.x,tri.c.y);
			}
        	if(isFullShape || isFullShape === undefined){
        		this.gfx.endShape();
        	}
		},
		
		vertex: function(v){
			if(v.z === undefined){
				this.gfx.vertex(v.x,v.y);
			} else {
				this.gfx.vertex(v.x,v.y,v.z);
			}
		}
	};
})();