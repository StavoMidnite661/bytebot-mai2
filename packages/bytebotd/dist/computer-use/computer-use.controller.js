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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ComputerUseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerUseController = void 0;
const common_1 = require("@nestjs/common");
const computer_use_service_1 = require("./computer-use.service");
const computer_action_validation_pipe_1 = require("./dto/computer-action-validation.pipe");
let ComputerUseController = ComputerUseController_1 = class ComputerUseController {
    constructor(computerUseService) {
        this.computerUseService = computerUseService;
        this.logger = new common_1.Logger(ComputerUseController_1.name);
    }
    async action(params) {
        try {
            const paramsCopy = { ...params };
            if (paramsCopy.action === 'write_file') {
                paramsCopy.data = 'base64 data';
            }
            this.logger.log(`Computer action request: ${JSON.stringify(paramsCopy)}`);
            return await this.computerUseService.action(params);
        }
        catch (error) {
            this.logger.error(`Error executing computer action: ${error.message}`, error.stack);
            throw new common_1.HttpException(`Failed to execute computer action: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ComputerUseController = ComputerUseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new computer_action_validation_pipe_1.ComputerActionValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseController.prototype, "action", null);
exports.ComputerUseController = ComputerUseController = ComputerUseController_1 = __decorate([
    (0, common_1.Controller)('computer-use'),
    __metadata("design:paramtypes", [computer_use_service_1.ComputerUseService])
], ComputerUseController);
//# sourceMappingURL=computer-use.controller.js.map