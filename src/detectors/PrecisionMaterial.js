//根据不同的数据生成不同的精度
import { MaterialBase } from '../materials/MaterialBase.js';

const computePrecisionFunction = /* glsl */`
    precision highp float;
    precision highp int;
    
    // 用于计算精度的结构体定义
    struct FloatStruct {
        highp float value;
    };

    struct IntStruct {
        highp int value;
    };

    struct UintStruct {
        highp uint value;
    };

    // 计算精度的函数，根据不同的数据类型进行处理
    vec2 computePrecision() {
        
        #if MODE == 0 // 对于 float 类型
            float exponent = 0.0;
            float value = 1.5;
            //浮点精度的计算方法是将 2 到 1.0 的负幂逐渐相加，直到它们不起作用
            //according to https://github.com/gkjohnson/webgl-precision
            while (value != 1.0) {
                exponent++;
                //当精度足够小到计算机无法表示时，value此时就是1
                value = 1.0 + pow(2.0, -exponent) / 2.0;
            }
            
            //同样的操作要在类中元素上的精度再使用一次
            float structExponent = 0.0;
            FloatStruct str;
            str.value = 1.5;
            while (str.value > 1.0) {
                structExponent++;
                str.value = 1.0 + pow(2.0, -structExponent) / 2.0;
            }
            return vec2(exponent, structExponent); // 返回两个精度值

        #elif MODE == 1 // 对于 int 类型
            int bits = 0;
            int value = 1;
            while (value > 0) {
                //每次都左移1位，当一道符号位时会导致value变成-1从而退出
                value = value << 1;
                value = value | 1;
                bits++;
            }

            int structBits = 0;
            IntStruct str;
            str.value = 1;
            while (str.value > 0) {
                str.value = str.value << 1;
                str.value = str.value | 1;
                structBits++;
            }
            return vec2(bits, structBits); // 返回两个精度值

        #else // 对于 uint 类型
            int bits = 0;
            uint value = 1u;
            while (value > 0u) {
                value = value << 1u;
                bits++;
            }

            int structBits = 0;
            UintStruct str;
            str.value = 1u;
            while (str.value > 0u) {
                str.value = str.value << 1u;
                structBits++;
            }
            return vec2(bits, structBits); // 返回两个精度值
        #endif
    }
`;

export class PrecisionMaterial extends MaterialBase {
    
    // 定义 setter 用于设置精度模式
    set mode(v) {
        this._mode = v;

        // 根据输入模式设置 GLSL 中的 MODE 宏定义
        switch (v.toLowerCase()) {
            case 'float':
                this.setDefine('MODE', 0);
                break;
            case 'int':
                this.setDefine('MODE', 1);
                break;
            case 'uint':
                this.setDefine('MODE', 2);
                break;
        }
    }

    constructor() {
        super({
            vertexShader: /* glsl */`
                ${computePrecisionFunction} // 引入精度计算函数

                varying vec2 vPrecision;
                void main() {
                    // 标准的顶点变换操作
                    vec4 mvPosition = vec4(position, 1.0);
                    mvPosition = modelViewMatrix * mvPosition;
                    gl_Position = projectionMatrix * mvPosition;

                    // 调用计算精度的函数
                    vPrecision = computePrecision();
                }
            `,
            fragmentShader: /* glsl */`
                ${computePrecisionFunction} // 引入精度计算函数

                varying vec2 vPrecision;
                void main(void) {
                    // 计算精度并输出
                    vec2 fPrecision = computePrecision();
                    gl_FragColor = vec4(vPrecision, fPrecision) / 255.0;
                }
            `,
        });
    }
}
