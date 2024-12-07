//提供与真实场景类似的spotlight
import { SpotLight } from 'three';

export class PhysicalSpotLight extends SpotLight{
    constructor( ...args ) {
		super( ...args );
		this.iesMap = null; //用于存储 IES 光照分布图（光强分布数据），IES 文件是一种常见的灯光数据格式，用于描述真实灯具的光线分布
		this.radius = 0;    //模拟灯光的半径，可能用于控制聚光灯的柔和边缘或其他效果
	}

	copy( source, recursive ) {
		super.copy( source, recursive );
		this.iesMap = source.iesMap;
		this.radius = source.radius;
		return this;
	}
}