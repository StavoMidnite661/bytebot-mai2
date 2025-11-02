"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerUseModule = void 0;
const common_1 = require("@nestjs/common");
const computer_use_service_1 = require("./computer-use.service");
const computer_use_controller_1 = require("./computer-use.controller");
const nut_module_1 = require("../nut/nut.module");
let ComputerUseModule = class ComputerUseModule {
};
exports.ComputerUseModule = ComputerUseModule;
exports.ComputerUseModule = ComputerUseModule = __decorate([
    (0, common_1.Module)({
        imports: [nut_module_1.NutModule],
        controllers: [computer_use_controller_1.ComputerUseController],
        providers: [computer_use_service_1.ComputerUseService],
        exports: [computer_use_service_1.ComputerUseService],
    })
], ComputerUseModule);
//# sourceMappingURL=computer-use.module.js.map