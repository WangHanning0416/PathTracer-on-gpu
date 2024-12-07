import { DataTexture, FloatType, NearestFilter, RGBAFormat, RGFormat, RedFormat } from 'three';
import { BlueNoiseGenerator } from './blueNoise/BlueNoiseGenerator.js';

//描述的是每个像素点需要几个bit来描述
function getStride(channels){
    if(channels >= 3) return 4;
    else return channels;
}

function getFormat(stride){
    if(channels == 1) return RedFormat;
    else if(channels == 2) return RGFormat;
    else return RGBAFormat;
}

export class BlueNoiseTexture extends DataTexture{
    constructor( size = 64, channels = 1 ) { //默认64*64纹理
		super( new Float32Array( 4 ), 1, 1, RGBAFormat, FloatType );
        this.channels = channels;
		this.size = size;
		this.minFilter = NearestFilter;
		this.magFilter = NearestFilter;
		this.update();
	}
    
    update() {
		const channels = this.channels;
		const size = this.size;
		const generator = new BlueNoiseGenerator();
		generator.channels = channels;
		generator.size = size;

		const stride = getStride( channels );
		const format = getFormat( stride );
		if ( this.image.width !== size || format !== this.format ) {
            this.image.data = new Float32Array( ( size ** 2 ) * stride );
			this.image.width = size;
			this.image.height = size;
			this.format = format;
			this.dispose();
		}

		const data = this.image.data;
		for ( let i = 0; i < channels; i ++ ) {
			const result = generator.generate();
			const bin = result.data;
			const maxValue = result.maxValue;
			for ( let j = 0; j < bin.length; j ++ ) {
				const value = bin[ j ] / maxValue;   //归一化数据
				data[ j * stride + i ] = value;
			}
		}
		this.needsUpdate = true;
	}
}