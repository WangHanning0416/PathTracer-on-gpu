export const iridescence_functions = /* glsl */`

	// XYZ 到 sRGB 颜色空间的转换矩阵
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}

	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}

	float iorToFresnel0( float transmittedIor, float incidentIor ) {
		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );
	}

	// OPD 为光程差，shift 为相位偏移量
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;// 计算相位

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		// 计算光谱的 XYZ 值，包含了与相位相关的幅度变化
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		// 将 XYZ 转换为 sRGB 颜色空间
		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;
	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;

		// 通过混合外部折射率和薄膜折射率来调整 iridescenceIor
		// 通过 smoothstep 函数平滑过渡
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			// 如果发生全内反射，返回白色
			return vec3( 1.0 );
		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {
			// 如果折射率小于外部折射率，反相位
			phi12 = PI;
		}

		float phi21 = PI - phi12;

		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // 防止 Fresnel 反射率达到 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {
			phi23[ 0 ] = PI;
		}
		if ( baseIOR[1] < iridescenceIor ) {
			phi23[ 1 ] = PI;
		}
		if ( baseIOR[2] < iridescenceIor ) {
			phi23[ 2 ] = PI;
		}

		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		vec3 C0 = R12 + Rs;
		I = C0;

		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			// 递归计算每个高阶项
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}

		// 如果产生了色彩超出色域的情况，将负值修正为 0
		return max( I, vec3( 0.0 ) );
	}
`;
