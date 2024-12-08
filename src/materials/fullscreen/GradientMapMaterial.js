import { Color, NoBlending } from 'three';
import { MaterialBase } from '../MaterialBase.js';

export class GradientMapMaterial extends MaterialBase {

    constructor(parameters) {

        super({
            defines: {
                FEATURE_BIN: 0, // 是否启用二值化功能
            },

            uniforms: {
                map: { value: null }, // 输入纹理
                minColor: { value: new Color(0) }, // 最小值对应的颜色
                minValue: { value: 0 }, // 映射的最小值
                maxColor: { value: new Color(0xffffff) }, // 最大值对应的颜色
                maxValue: { value: 10 }, // 映射的最大值
                field: { value: 0 }, // 选择使用的纹理通道（如 r, g, b 通道）
                power: { value: 1 }, // 渐变的平滑度
            },

            blending: NoBlending, // 禁用混合

            vertexShader: /* glsl */`
                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,

            fragmentShader: /* glsl */`
                uniform sampler2D map;
                uniform vec3 minColor;
                uniform float minValue;
                uniform vec3 maxColor;
                uniform float maxValue;
                uniform int field;
                uniform float power;
                varying vec2 vUv;

                void main() {
                    // 获取指定通道的纹理值
                    float value = texture(map, vUv)[field];

                    #if FEATURE_BIN
                    // 如果启用二值化，则将值向上取整
                    value = ceil(value);
                    #endif

                    // 通过 smoothstep 实现平滑插值
                    float t = smoothstep(minValue, maxValue, value);
                    t = pow(t, power); // 根据 power 调整渐变的曲线

                    // 计算最终的颜色
                    gl_FragColor.rgb = mix(minColor, maxColor, t);
                    gl_FragColor.a = 1.0;

                    #include <colorspace_fragment> // 应用颜色空间转换
                }
            `,
        });

        this.setValues(parameters); // 设置用户提供的参数
    }
}
