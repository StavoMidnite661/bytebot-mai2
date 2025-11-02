"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InputTrackingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTrackingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let InputTrackingGateway = InputTrackingGateway_1 = class InputTrackingGateway {
    constructor() {
        this.logger = new common_1.Logger(InputTrackingGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    emitAction(action) {
        this.server.emit('action', action);
    }
    emitScreenshotAndAction(screenshot, action) {
        this.server.emit('screenshotAndAction', screenshot, action);
    }
};
exports.InputTrackingGateway = InputTrackingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], InputTrackingGateway.prototype, "server", void 0);
exports.InputTrackingGateway = InputTrackingGateway = InputTrackingGateway_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })
], InputTrackingGateway);
//# sourceMappingURL=input-tracking.gateway.js.map