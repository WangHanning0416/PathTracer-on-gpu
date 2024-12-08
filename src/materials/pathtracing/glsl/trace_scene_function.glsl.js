//计算光线与场景中的物体的交点，并且判断是否与物体（如表面或雾体）相交
export const trace_scene_function = /* glsl */`

	#define NO_HIT 0          // 没有交点
	#define SURFACE_HIT 1     // 光线与表面相交
	#define LIGHT_HIT 2       // 光线与光源相交
	#define FOG_HIT 3         // 光线与雾体相交

	int traceScene(Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit) {
		int result = NO_HIT;  // 初始设置为没有交点

		// 检查光线是否与场景中的物体有交点，使用BVH加速结构
		bool hit = bvhIntersectFirstHit(
			bvh, 
			ray.origin, 
			ray.direction, 
			surfaceHit.faceIndices, 
			surfaceHit.faceNormal, 
			surfaceHit.barycoord, 
			surfaceHit.side, 
			surfaceHit.dist
		);

		#if FEATURE_FOG  // 如果启用了雾体效果

		// 如果该材质为雾体材质
		if (fogMaterial.fogVolume) {
			// 计算光线与雾体的交点距离
			float particleDist = intersectFogVolume(fogMaterial, rand(1));

			// 如果交点在表面交点之前，且大于一个小的偏移量，认为是雾体交点
			if (particleDist + RAY_OFFSET < surfaceHit.dist) {
				surfaceHit.side = 1.0;  // 设置交点的面朝向
				surfaceHit.faceNormal = normalize(-ray.direction);  // 法线反向
				surfaceHit.dist = particleDist;  // 更新交点距离
				return FOG_HIT;  // 返回雾体交点
			}
		}

		#endif

		// 如果光线与物体有交点，更新结果为表面交点
		if (hit) {
			result = SURFACE_HIT; 
		}

		return result;
	}


`;
