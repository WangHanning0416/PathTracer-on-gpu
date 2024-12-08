import { DataTexture, RedFormat, LinearFilter, DataUtils, HalfFloatType, Source, RepeatWrapping, RGBAFormat, FloatType, ClampToEdgeWrapping } from 'three';
import { toHalfFloatArray } from '../utils/TextureUtils.js';

function binarySearchFindClosestIndexOf( array, targetValue, offset = 0, count = array.length ) {

	let lower = offset;
	let upper = offset + count - 1;

	while ( lower < upper ) {
		const mid = ( lower + upper ) >> 1;
		if ( array[ mid ] < targetValue ) {
			lower = mid + 1;
		} else {
			upper = mid;
		}

	}

	return lower - offset;

}

function colorToLuminance( r, g, b ) {

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;

}

function preprocessEnvMap( envMap, targetType = HalfFloatType ) {

	const map = envMap.clone();
	map.source = new Source( { ...map.image } );
	const { width, height, data } = map.image;

	let newData = data;
	if ( map.type !== targetType ) {

		if ( targetType === HalfFloatType ) {

			newData = new Uint16Array( data.length );

		} else {

			newData = new Float32Array( data.length );

		}

		let maxIntValue;
		if ( data instanceof Int8Array || data instanceof Int16Array || data instanceof Int32Array ) {

			maxIntValue = 2 ** ( 8 * data.BYTES_PER_ELEMENT - 1 ) - 1;

		} else {

			maxIntValue = 2 ** ( 8 * data.BYTES_PER_ELEMENT ) - 1;

		}

		for ( let i = 0, l = data.length; i < l; i ++ ) {

			let v = data[ i ];
			if ( map.type === HalfFloatType ) {

				v = DataUtils.fromHalfFloat( data[ i ] );

			}

			if ( map.type !== FloatType && map.type !== HalfFloatType ) {

				v /= maxIntValue;

			}

			if ( targetType === HalfFloatType ) {

				newData[ i ] = DataUtils.toHalfFloat( v );

			}

		}

		map.image.data = newData;
		map.type = targetType;

	}

	if ( map.flipY ) {

		const ogData = newData;
		newData = newData.slice();
		for ( let y = 0; y < height; y ++ ) {

			for ( let x = 0; x < width; x ++ ) {

				const newY = height - y - 1;
				const ogIndex = 4 * ( y * width + x );
				const newIndex = 4 * ( newY * width + x );

				newData[ newIndex + 0 ] = ogData[ ogIndex + 0 ];
				newData[ newIndex + 1 ] = ogData[ ogIndex + 1 ];
				newData[ newIndex + 2 ] = ogData[ ogIndex + 2 ];
				newData[ newIndex + 3 ] = ogData[ ogIndex + 3 ];

			}

		}

		map.flipY = false;
		map.image.data = newData;

	}

	return map;

}

export class EquirectHdrInfoUniform {

	constructor() {
		const blackTex = new DataTexture( toHalfFloatArray( new Float32Array( [ 0, 0, 0, 0 ] ) ), 1, 1 );
		blackTex.type = HalfFloatType;
		blackTex.format = RGBAFormat;
		blackTex.minFilter = LinearFilter;
		blackTex.magFilter = LinearFilter;
		blackTex.wrapS = RepeatWrapping;
		blackTex.wrapT = RepeatWrapping;
		blackTex.generateMipmaps = false;
		blackTex.needsUpdate = true;

		const marginalWeights = new DataTexture( toHalfFloatArray( new Float32Array( [ 0, 1 ] ) ), 1, 2 );
		marginalWeights.type = HalfFloatType;
		marginalWeights.format = RedFormat;
		marginalWeights.minFilter = LinearFilter;
		marginalWeights.magFilter = LinearFilter;
		marginalWeights.generateMipmaps = false;
		marginalWeights.needsUpdate = true;

		const conditionalWeights = new DataTexture( toHalfFloatArray( new Float32Array( [ 0, 0, 1, 1 ] ) ), 2, 2 );
		conditionalWeights.type = HalfFloatType;
		conditionalWeights.format = RedFormat;
		conditionalWeights.minFilter = LinearFilter;
		conditionalWeights.magFilter = LinearFilter;
		conditionalWeights.generateMipmaps = false;
		conditionalWeights.needsUpdate = true;

		this.map = blackTex;
		this.marginalWeights = marginalWeights;
		this.conditionalWeights = conditionalWeights;
		this.totalSum = 0;
	}

	dispose() {

		this.marginalWeights.dispose();
		this.conditionalWeights.dispose();
		this.map.dispose();

	}

	updateFrom( hdr ) {
		const map = preprocessEnvMap( hdr );
		map.wrapS = RepeatWrapping;
		map.wrapT = ClampToEdgeWrapping;

		const { width, height, data } = map.image;
		const pdfConditional = new Float32Array( width * height );
		const cdfConditional = new Float32Array( width * height );

		const pdfMarginal = new Float32Array( height );
		const cdfMarginal = new Float32Array( height );

		let totalSumValue = 0.0;
		let cumulativeWeightMarginal = 0.0;
		for ( let y = 0; y < height; y ++ ) {

			let cumulativeRowWeight = 0.0;
			for ( let x = 0; x < width; x ++ ) {

				const i = y * width + x;
				const r = DataUtils.fromHalfFloat( data[ 4 * i + 0 ] );
				const g = DataUtils.fromHalfFloat( data[ 4 * i + 1 ] );
				const b = DataUtils.fromHalfFloat( data[ 4 * i + 2 ] );
				const weight = colorToLuminance( r, g, b );
				cumulativeRowWeight += weight;
				totalSumValue += weight;

				pdfConditional[ i ] = weight;
				cdfConditional[ i ] = cumulativeRowWeight;

			}

			if ( cumulativeRowWeight !== 0 ) {
				for ( let i = y * width, l = y * width + width; i < l; i ++ ) {

					pdfConditional[ i ] /= cumulativeRowWeight;
					cdfConditional[ i ] /= cumulativeRowWeight;

				}

			}

			cumulativeWeightMarginal += cumulativeRowWeight;
			pdfMarginal[ y ] = cumulativeRowWeight;
			cdfMarginal[ y ] = cumulativeWeightMarginal;

		}

		if ( cumulativeWeightMarginal !== 0 ) {
			for ( let i = 0, l = pdfMarginal.length; i < l; i ++ ) {

				pdfMarginal[ i ] /= cumulativeWeightMarginal;
				cdfMarginal[ i ] /= cumulativeWeightMarginal;

			}

		}

		const marginalDataArray = new Uint16Array( height );
		const conditionalDataArray = new Uint16Array( width * height );

		for ( let i = 0; i < height; i ++ ) {

			const dist = ( i + 1 ) / height;
			const row = binarySearchFindClosestIndexOf( cdfMarginal, dist );

			marginalDataArray[ i ] = DataUtils.toHalfFloat( ( row + 0.5 ) / height );

		}

		for ( let y = 0; y < height; y ++ ) {

			for ( let x = 0; x < width; x ++ ) {

				const i = y * width + x;
				const dist = ( x + 1 ) / width;
				const col = binarySearchFindClosestIndexOf( cdfConditional, dist, y * width, width );

				conditionalDataArray[ i ] = DataUtils.toHalfFloat( ( col + 0.5 ) / width );

			}

		}

		this.dispose();

		const { marginalWeights, conditionalWeights } = this;
		marginalWeights.image = { width: height, height: 1, data: marginalDataArray };
		marginalWeights.needsUpdate = true;

		conditionalWeights.image = { width, height, data: conditionalDataArray };
		conditionalWeights.needsUpdate = true;

		this.totalSum = totalSumValue;
		this.map = map;

	}

}
