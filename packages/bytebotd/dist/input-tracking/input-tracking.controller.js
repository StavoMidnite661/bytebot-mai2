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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTrackingController = void 0;
const common_1 = require("@nestjs/common");
const input_tracking_service_1 = require("./input-tracking.service");
let InputTrackingController = class InputTrackingController {
    constructor(inputTrackingService) {
        this.inputTrackingService = inputTrackingService;
    }
    start() {
        this.inputTrackingService.startTracking();
        return { status: 'started' };
    }
    stop() {
        this.inputTrackingService.stopTracking();
        return { status: 'stopped' };
    }
};
exports.InputTrackingController = InputTrackingController;
__decorate([
    (0, common_1.Post)('start'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InputTrackingController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('stop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InputTrackingController.prototype, "stop", null);
exports.InputTrackingController = InputTrackingController = __decorate([
    (0, common_1.Controller)('input-tracking'),
    __metadata("design:paramtypes", [input_tracking_service_1.InputTrackingService])
], InputTrackingController);
//# sourceMappingURL=input-tracking.controller.js.map