export const ray_any_hit_function = /* glsl */`

	bool bvhIntersectAnyHit(
		vec3 rayOrigin, vec3 rayDirection,
		inout float side, inout float dist
	) {

		uvec4 faceIndices;
		vec3 faceNormal;
		vec3 barycoord;

		int ptr = 0;
		uint stack[ 60 ];
		stack[ 0 ] = 0u;

		float triangleDistance = 1e20;
		while ( ptr > - 1 && ptr < 60 ) {
			uint currNodeIndex = stack[ ptr ];
			ptr --;
			float boundsHitDistance = intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh, currNodeIndex );
			if ( boundsHitDistance == INFINITY ) {
				continue;
			}
			uvec2 boundsInfo = uTexelFetch1D( bvh.bvhContents, currNodeIndex ).xy;
			bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

			if ( isLeaf ) {
				uint count = boundsInfo.x & 0x0000ffffu;
				uint offset = boundsInfo.y;
				bool found = intersectTriangles(
					bvh, rayOrigin, rayDirection, offset, count, triangleDistance,
					faceIndices, faceNormal, barycoord, side, dist
				);
				if ( found ) {
					return true;
				}
			}
			else {
				uint leftIndex = currNodeIndex + 1u;
				uint splitAxis = boundsInfo.x & 0x0000ffffu;
				uint rightIndex = boundsInfo.y;
				ptr ++;
				stack[ ptr ] = leftIndex;
				ptr ++;
				stack[ ptr ] = rightIndex;
			}
		}
		return false;
	}
`;
