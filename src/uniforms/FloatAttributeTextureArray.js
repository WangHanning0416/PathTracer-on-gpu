import { DataArrayTexture, FloatType, RGBAFormat } from 'three';
import { FloatVertexAttributeTexture } from 'three-mesh-bvh';

function copyArrayToArray( fromArray, fromStride, toArray, toStride, offset ) {
	if ( fromStride > toStride ) {
		throw new Error();
	}

	const count = fromArray.length / fromStride;
	const bpe = fromArray.constructor.BYTES_PER_ELEMENT * 8;
	let maxValue = 1.0;

    //归一化处理
	switch ( fromArray.constructor ) {

	case Uint8Array:
	case Uint16Array:
	case Uint32Array:
		maxValue = 2 ** bpe - 1;
		break;

	case Int8Array:
	case Int16Array:
	case Int32Array:
		maxValue = 2 ** ( bpe - 1 ) - 1;
		break;
	}

	for ( let i = 0; i < count; i ++ ) {
		const i4 = 4 * i;
		const is = fromStride * i;
		for ( let j = 0; j < toStride; j ++ ) {
			toArray[ offset + i4 + j ] = fromStride >= j + 1 ? fromArray[ is + j ] / maxValue : 0;
		}
	}
}

export class FloatAttributeTextureArray extends DataArrayTexture {
    constructor() {
        super();
        this._textures = [];
        this.type = FloatType;
        this.format = RGBAFormat;
        this.internalFormat = 'RGBA32F';
    }

    updateAttribute(index, attr) {
        const tex = this._textures[index];
        tex.updateFrom(attr);
        //检查尺寸是否匹配，不是则报错
        const baseImage = tex.image;
        const image = this.image;
        if (baseImage.width !== image.width || baseImage.height !== image.height) {
            throw new Error('FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.');
        }
        
        //width 和 height 是纹理图像的尺寸。
        //data 是包含纹理数据的数组（Float32Array，其中存储了纹理的每个像素的 RGBA 值）
        const { width, height, data } = image;
        const length = width * height * 4;
        const offset = length * index;
        //对齐，法线向量为3，颜色为4，对齐便于处理
        let itemSize = attr.itemSize;
        if (itemSize === 3) {
            itemSize = 4;
        }
      
        copyArrayToArray(tex.image.data, itemSize, data, 4, offset);
      
        this.dispose();
        this.needsUpdate = true;
      }
      
    setArributes(attrs){
        const itemCount = attrs[0].count;
        const attrsLength = attrs.length;
        for (let i = 0, l = attrsLength; i < l; i++) {
            if (attrs[i].count !== itemCount) {
                throw new Error('FloatAttributeTextureArray: All attributes must have the same item count.');
            }
        }
        const textures = this._textures;
        //texture初始化，要与attrs的属性数量保持一致
        while (textures.length < attrsLength) {
            const tex = new FloatVertexAttributeTexture();
            textures.push(tex);
        }
        while (textures.length > attrsLength) {
            textures.pop();
        }
        //依次更新每一个属性
        for ( let i = 0, l = attrsLength; i < l; i ++ ) {
			textures[ i ].updateFrom( attrs[ i ] );
		}

        const baseTexture = textures[0];
        const baseImage = baseTexture.image;
        const image = this.image;
        if(baseImage.width !== image.width || baseImage.height !== image.height || baseImage.depth !== attrsLength){
            image.width = baseImage.width;
			image.height = baseImage.height;
			image.depth = attrsLength;
			image.data = new Float32Array( image.width * image.height * image.depth * 4 );
        }

        const { data, width, height } = image;
        for (let i = 0, l = attrsLength; i < l; i++) {
            const tex = textures[i];
            const length = width * height * 4;
            const offset = length * i;

            let itemSize = attrs[i].itemSize;
            if (itemSize === 3) {
                itemSize = 4;
            }
            copyArrayToArray(tex.image.data, itemSize, data, 4, offset);
        }
        this.dispose();
		this.needsUpdate = true;
    }
}