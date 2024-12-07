// 创建一个canvas元素
const canvas = document.createElement('canvas');
// 获取 WebGL 2.0 上下文
const gl = canvas.getContext('webgl2');
// 检查 WebGL 2.0 是否支持
if (!gl) {
    console.log("WebGL 2.0 \u4E0D\u652F\u6301\u6216\u88AB\u7981\u7528\u4E86");
    document.getElementById('webgl-version').innerText = "WebGL 2.0 \u4E0D\u652F\u6301\u6216\u88AB\u7981\u7528\u4E86";
} else {
    // 获取 WebGL 版本信息
    const version = gl.getParameter(gl.VERSION);
    console.log("\u5F53\u524D WebGL \u7248\u672C:", version);
    document.getElementById('webgl-version').innerText = `\u{5F53}\u{524D} WebGL \u{7248}\u{672C}: ${version}`;
}

//# sourceMappingURL=test.11cd54b5.js.map
