//设置模型着色器 完全不透明
import { NoBlending } from 'three';
import { MaterialBase } from '../MaterialBase.js';

export class AlphaDisplayMaterial extends MaterialBase{
    constructor(){
        super({
            uniform:{
                //用于传递一个 2D 纹理到片段着色器中
                map:{value : NULL},
            },
            //不混合颜色，只体现目标本身的颜色
            blending:NoBlending ,
            //varying 用来声明从顶点着色器到片段着色器传递的变量
            //uniform sampler map  从js文件中传入vertax和fragment
            vertexShader : /*glsl*/`
                varying vec2 vUv  
                void main(){
                    vUv = uv;
                    gl_position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `,
            fragmentShader : /* glsl */`
                varying vUv;
                uniform sampler2D map; 
                void main(){
                    gl_FragColor = vec4( texture( map, vUv ).a );
                    gl_FragColor.a = 1.0;
					#include <colorspace_fragment>
                }
            `,
        })
    }
}