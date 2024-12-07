//MaterialBase 是一个基于 three.js 中 ShaderMaterial 的扩展类，
//用于增强材质的功能，方便操作着色器的 uniform 和 define 属性，并提供对材质重新编译的控制。
import { ShaderMaterial } from "three";

export class MaterialBase extends ShaderMaterial{
    //当设置 needsUpdate 属性时，会强制触发材质的更新，同时发送一个名为 recompilation 的事件
    set needsUpdate( v ) {
		super.needsUpdate = true;
		this.dispatchEvent( {
			type: 'RECOMPILATION......',
		} );
	}
    
    //使用 MaterialBase 时，可以直接操作 uniform 属性，而不需要通过 uniforms 对象
	constructor( shader ) {
		super( shader );
		for ( const key in this.uniforms ) {
			Object.defineProperty( this, key, {
				get() {return this.uniforms[ key ].value;},
				set( v ) {this.uniforms[ key ].value = v;}
			} );
		}
	}
    
    //动态设置着色器的宏定义（define）
	setDefine( name, value = undefined ) {
		if ( value === undefined || value === null ) {
			if ( name in this.defines ) {
				delete this.defines[ name ];
				this.needsUpdate = true;
				return true;
			}
		} 
        else {
			if ( this.defines[ name ] !== value ) {
				this.defines[ name ] = value;
				this.needsUpdate = true;
				return true;
			}
		}
		return false;
	}
}