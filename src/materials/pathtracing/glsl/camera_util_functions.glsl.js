//生成一个从相机发出的光线（可算写到你了）
//最终返回一个描述该光线起点和方向的 Ray 对象
export const camera_util_functions = /* glsl */`

    // 将NDC坐标转换为光线起点
    vec3 ndcToRayOrigin( vec2 coord ) {
        vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
        return rayOrigin4.xyz / rayOrigin4.w;
    }

    // 获取相机光线
    Ray getCameraRay() {
        vec2 ssd = vec2( 1.0 ) / resolution;

        // 使用抗锯齿（AA）对相机光线进行抖动，随机选择一个像素附近的UV坐标
        vec2 ruv = rand2( 0 );
        vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
        Ray ray;

        #if CAMERA_TYPE == 2

            // 处理等距投影（Equirectangular projection）
            vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
            vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

            // 将相机世界矩阵应用到光线方向和光线原点
            rayDirection4 = cameraWorldMatrix * rayDirection4;
            rayOrigin4 = cameraWorldMatrix * rayOrigin4;

            // 归一化光线方向
            ray.direction = normalize( rayDirection4.xyz );
            ray.origin = rayOrigin4.xyz / rayOrigin4.w;

        #else

            // 获取归一化设备坐标（NDC），范围为[-1, 1]
            vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
            ray.origin = ndcToRayOrigin( ndc );

            #if CAMERA_TYPE == 1

                // 处理正射投影（Orthographic projection）
                ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
                ray.direction = normalize( ray.direction );

            #else

                // 透视投影（Perspective projection）
                ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

            #endif

        #endif

        #if FEATURE_DOF
        {

            // 景深效果（Depth of Field）
            vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

            // 获取光圈样本
            // 如果光圈叶片数为0，假设使用圆形光圈
            vec3 shapeUVW = rand3( 1 );
            int blades = physicalCamera.apertureBlades;
            float anamorphicRatio = physicalCamera.anamorphicRatio;
            vec2 apertureSample = blades == 0 ? sampleCircle( shapeUVW.xy ) : sampleRegularPolygon( blades, shapeUVW );
            apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

            // 旋转光圈形状
            apertureSample =
                rotateVector( apertureSample, physicalCamera.apertureRotation ) *
                saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

            // 创建新的光线，光线起点稍微调整
            ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
            ray.direction = focalPoint - ray.origin;

        }
        #endif

        // 确保光线方向是单位向量
        ray.direction = normalize( ray.direction );

        return ray;

    }

`;
