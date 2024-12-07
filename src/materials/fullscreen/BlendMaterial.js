//两种纹理的混合 
import { NoBlending } from 'three';
import { MaterialBase } from '../MaterialBase.js';

export class BlendMaterial extends MaterialBase{
    constructor(parameters){
        super({
            blending: NoBlending,  // 禁用混合模式，意味着不会有默认的混合行为
            uniforms: {
                target1: { value: null },  // 第一个纹理
                target2: { value: null },  // 第二个纹理
                opacity: { value: 1.0 },   // 透明度
            },
            vertexShader:/* glsl */`
                varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`,
            fragmentShader:/*glsl */`
                uniform float opacity;
				uniform sampler2D target1;
				uniform sampler2D target2;
				varying vec2 vUv;
                void main(){
                    vec4 color1 = texture2D(target1,vUv);
                    vec4 color2 = texture2D(target2.vUv);
                    float invOpacity = 1.0 - opacity;  // 计算透明度的反转值
                    float totalAlpha = color1.a * invOpacity + color2.a * opacity;  // 混合后的总透明度
                    if (color1.a != 0.0 || color2.a != 0.0) { 
                        gl_FragColor.rgb = color1.rgb * (invOpacity * color1.a / totalAlpha) + 
                                           color2.rgb * (opacity * color2.a / totalAlpha);
                        gl_FragColor.a = totalAlpha;
                    } 
                    else {
                        gl_FragColor = vec4(0.0);
                    }    
                }
            `,
        });
        this.setValues( parameters );
    }
}