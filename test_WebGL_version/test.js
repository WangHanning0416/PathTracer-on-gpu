// 创建一个canvas元素
const canvas = document.createElement('canvas');

// 获取 WebGL 2.0 上下文
const gl = canvas.getContext('webgl2');

// 检查 WebGL 2.0 是否支持
if (!gl) {
    console.log('WebGL 2.0 不支持或被禁用了');
    document.getElementById('webgl-version').innerText = 'WebGL 2.0 不支持或被禁用了';
} else {
    // 获取 WebGL 版本信息
    const version = gl.getParameter(gl.VERSION);
    console.log('当前 WebGL 版本:', version);
    document.getElementById('webgl-version').innerText = `当前 WebGL 版本: ${version}`;
}
