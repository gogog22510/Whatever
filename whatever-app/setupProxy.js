const proxy = require('http-proxy-middleware');

const createApi = (pathRoute, host) => {
    return proxy({
        target: host,
        changeOrigin: true,
        pathRewrite: function (path, req) { return path.replace(pathRoute, "") }
    });
};

module.exports = function(app) {
    // java api
    app.use("/api/j", createApi("/api/j", "http://localhost:8080"));
};