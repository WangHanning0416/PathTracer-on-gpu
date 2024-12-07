//提供一些真实物理相机的参数
import { PerspectiveCamera } from 'three';

export class PhysicalCamera extends PerspectiveCamera{
    constructor( ...args ) {

		super( ...args );
		this.fStop = 1.4;            //光圈 小的 fStop（如 1.4）对应更大的光圈，景深更浅。
		this.apertureBlades = 0;     //光圈的叶片数量，决定了虚化光斑（bokeh）的形状，例如六边形、八边形等。如果为 0，则表示一个完美的圆形光斑。
		this.apertureRotation = 0;   //光圈的旋转角度，以弧度为单位。用于改变非圆形光斑的方向
		this.focusDistance = 25;     //焦距 
		this.anamorphicRatio = 1;    //变形比率，用于模拟宽银幕电影摄像机的纵横比压缩效果。1 表示没有变形，而其他值表示不同的压缩程度。

	}
    
    set bokehSize( size ) {
		this.fStop = this.getFocalLength() / size;
	}

	get bokehSize() {
		return this.getFocalLength() / this.fStop;
	}
    
    //重载父类的copy函数，以便添加新的属性
    copy( source, recursive ) {

		super.copy( source, recursive );

		this.fStop = source.fStop;
		this.apertureBlades = source.apertureBlades;
		this.apertureRotation = source.apertureRotation;
		this.focusDistance = source.focusDistance;
		this.anamorphicRatio = source.anamorphicRatio;

		return this;

	}
}