const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/adventurelookup",
    createProxyMiddleware({
      target: "https://adventurelookup.com",
      changeOrigin: true,
      pathRewrite: {
        "^/adventurelookup": "",
      },
    })
  );
};
