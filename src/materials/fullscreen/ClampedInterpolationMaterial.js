//通过自定义的 插值（interpolation） 方法来处理纹理采样
//并在纹理周围使用 "clamping"（限制）的方式进行纹理的边界插值

import { ShaderMaterial } from 'three';

export class ClampedInterpolationMaterial extends ShaderMaterial {

    // getter 和 setter 用于纹理和透明度控制
    get map() {
        return this.uniforms.map.value;
    }

    set map(value) {
        this.uniforms.map.value = value;
    }

    get opacity() {
        return this.uniforms.opacity.value;
    }

    set opacity(value) {
        if (this.uniforms) {
            this.uniforms.opacity.value = value;
        }
    }

    constructor(params) {
        super({
            uniforms: {
                map: { value: null },
                opacity: { value: 1 },
            },
            vertexShader: /* glsl */`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: /* glsl */`
                uniform sampler2D map;
                uniform float opacity;
                varying vec2 vUv;

                // 自定义的纹理采样函数
                vec4 fetchClampedTexel(sampler2D tex, ivec2 px) {
                    return texelFetch(tex, px, 0);
                }

                void main() {
                    vec2 textureSize = vec2(textureSize(map, 0));
                    vec2 uvScaled = vUv * textureSize;
                    vec2 pixelCoord = floor(uvScaled);        // 获取像素坐标
                    vec2 pixelFraction = fract(uvScaled) - 0.5;  // 计算小数部分，决定插值权重

                    // 计算相邻像素
                    vec2 offset = step(0.0, pixelFraction); // 基于小数部分来确定偏移
                    vec2 nextPixel = clamp(pixelCoord + offset, vec2(0.0), textureSize - 1.0);

                    // 计算插值
                    vec2 alpha = abs(pixelFraction);
                    vec4 p1 = mix(fetchClampedTexel(map, ivec2(pixelCoord.x, pixelCoord.y)), fetchClampedTexel(map, ivec2(nextPixel.x, pixelCoord.y)), alpha.x);
                    vec4 p2 = mix(fetchClampedTexel(map, ivec2(pixelCoord.x, nextPixel.y)), fetchClampedTexel(map, ivec2(nextPixel.x, nextPixel.y)), alpha.x);

                    // 组合最终的颜色并应用透明度
                    gl_FragColor = mix(p1, p2, alpha.y);
                    gl_FragColor.a *= opacity;
                    #include <premultiplied_alpha_fragment>
                }
            `
        });

        // 使用传入的参数进行配置
        this.setValues(params);
    }
}
