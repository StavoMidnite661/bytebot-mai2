"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const express = require("express");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    });
    const wsProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: 'http://localhost:6080',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/websockify': '/' },
    });
    app.use('/websockify', express.raw({ type: '*/*' }), wsProxy);
    const server = await app.listen(9990);
    server.on('upgrade', (req, socket, head) => {
        if (req.url?.startsWith('/websockify')) {
            wsProxy.upgrade(req, socket, head);
        }
    });
}
bootstrap();
//# sourceMappingURL=main.js.map