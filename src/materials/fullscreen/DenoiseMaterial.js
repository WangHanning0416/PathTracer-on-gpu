import { NoBlending } from 'three';
import { MaterialBase } from '../MaterialBase.js';

export class DenoiseMaterial extends MaterialBase {

    constructor(parameters) {

        super({
            blending: NoBlending,
            transparent: false,
            depthWrite: false,
            depthTest: false,

            defines: {
                USE_SLIDER: 0,
            },

            uniforms: {
                sigma: { value: 5.0 },
                threshold: { value: 0.03 },
                kSigma: { value: 1.0 },
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
                uniform float sigma;
                uniform float threshold;
                uniform float kSigma;
                uniform float opacity;
                varying vec2 vUv;

                #define INV_SQRT_OF_2PI 0.3989422804014327
                #define INV_PI 0.3183098861837907

                // 智能去噪函数
                vec4 smartDeNoise(sampler2D tex, vec2 uv, float sigma, float kSigma, float threshold) {

                    // 计算模糊半径
                    float radius = round(kSigma * sigma);
                    float radQ = radius * radius;

                    // 高斯分布相关常量
                    float invSigmaQx2 = 0.5 / (sigma * sigma);
                    float invSigmaQx2PI = INV_PI * invSigmaQx2;

                    // 边缘保持参数
                    float invThresholdSqx2 = 0.5 / (threshold * threshold);
                    float invThresholdSqrt2PI = INV_SQRT_OF_2PI / threshold;

                    vec4 centralPixel = texture2D(tex, uv);  // 当前像素
                    centralPixel.rgb *= centralPixel.a;  // 使用 alpha 通道调整颜色

                    float zBuffer = 0.0;
                    vec4 accumulatedColor = vec4(0.0);
                    vec2 textureSize = vec2(textureSize(tex, 0));  // 获取纹理大小

                    // 遍历邻域像素
                    for (float dx = -radius; dx <= radius; dx++) {
                        float pt = sqrt(radQ - dx * dx);
                        for (float dy = -pt; dy <= pt; dy++) {

                            // 计算高斯权重
                            float blurFactor = exp(-(dx * dx + dy * dy) * invSigmaQx2) * invSigmaQx2PI;

                            vec4 neighborPixel = texture2D(tex, uv + vec2(dx, dy) / textureSize);
                            neighborPixel.rgb *= neighborPixel.a;

                            // 计算与当前像素的差异并加权
                            vec4 colorDifference = neighborPixel - centralPixel;
                            float deltaFactor = exp(-(colorDifference.rgba * colorDifference.rgba) * invThresholdSqx2) * invThresholdSqrt2PI * blurFactor;

                            zBuffer += deltaFactor;
                            accumulatedColor += deltaFactor * neighborPixel;
                        }
                    }

                    return accumulatedColor / zBuffer;  // 返回去噪后的颜色
                }

                void main() {
                    // 调用智能去噪函数
                    gl_FragColor = smartDeNoise(map, vUv, sigma, kSigma, threshold);

                    #include <tonemapping_fragment>
                    #include <colorspace_fragment>
                    #include <premultiplied_alpha_fragment>

                    gl_FragColor.a *= opacity;  // 应用透明度
                }
            `
        });

        this.setValues(parameters);
    }
}
