export const inside_fog_volume_function = /* glsl */`

	#ifndef FOG_CHECK
	#define FOG_CHECK 30
	#endif

	bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

		uint i = materialIndex * uint( MATERIAL_PIXELS );
		vec4 s14 = texelFetch1D( materials, i + 14u );
		return bool( int( s14.b ) & 4 );

	}

	// 判断是否在第一次与雾体相交的地方
	bool bvhIntersectFogVolumeHit(
		vec3 rayOrigin, vec3 rayDirection,
		usampler2D materialIndexAttribute, sampler2D materials,
		inout Material material
	) {
		material.fogVolume = false;

		// 射线与雾体相交的最大检查次数
		for ( int i = 0; i < FOG_CHECK; i ++ ) {

			// 查找最近的交点
			uvec4 faceIndices = uvec4( 0u );
			vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
			vec3 barycoord = vec3( 0.0 );
			float side = 1.0;
			float dist = 0.0;
			// 计算射线与 BVH（包围体层次）加速结构的交点
			bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
			if ( hit ) {
				uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
				if ( isMaterialFogVolume( materials, materialIndex ) ) {
					material = readMaterialInfo( materials, materialIndex );
					return side == - 1.0;
				} 
				else {
					rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );
				}
			} 
			else {
				return false;
			}
		}
		return false;
	}

`;
