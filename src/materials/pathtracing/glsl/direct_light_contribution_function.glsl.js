//计算直接光照的贡献，包括从环境光或场景中的光源
export const direct_light_contribution_function = /*glsl*/`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// 随机选择一个光源或环境贴图
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// 从光源或环境中采样
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );
			bool isSampleBelowSurface = !surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;

			if (isSampleBelowSurface) {
				lightRec.pdf = 0.0; // 如果采样在表面背面，将其 PDF 设置为 0
			}

			// 检查光线是否能到达光源
			Ray lightRay = Ray(rayOrigin, lightRec.direction);
			vec3 attenuatedColor;
			if (lightRec.pdf > 0.0 && isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) && !attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )) {

				// 计算材质的 PDF
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				if (lightMaterialPdf > 0.0 && all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) )) {

					// 加权计算直接光照贡献
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = (lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE) ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;
				}
			}

		} 
		else if (envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0) {
			// 从环境贴图中采样
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			bool isSampleBelowSurface = !surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if (isSampleBelowSurface) {
				envPdf = 0.0; // 如果采样在表面背面，将其 PDF 设置为 0
			}

			// 检查光线是否能到达环境
			Ray envRay = Ray(rayOrigin, envDirection);
			vec3 attenuatedColor;
			if (envPdf > 0.0 && isDirectionValid( envDirection, surf.normal, surf.faceNormal ) && !attenuateHit( state, envRay, INFINITY, attenuatedColor )) {

				// 计算材质的 PDF
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				if (envMaterialPdf > 0.0 && all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) )) {

					// 加权计算直接光照贡献
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;
				}
			}

		}
		return result;
	}
`;
