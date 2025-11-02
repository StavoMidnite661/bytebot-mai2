"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytebotMcpModule = void 0;
const common_1 = require("@nestjs/common");
const mcp_nest_1 = require("@rekog/mcp-nest");
const computer_use_module_1 = require("../computer-use/computer-use.module");
const computer_use_tools_1 = require("./computer-use.tools");
let BytebotMcpModule = class BytebotMcpModule {
};
exports.BytebotMcpModule = BytebotMcpModule;
exports.BytebotMcpModule = BytebotMcpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            computer_use_module_1.ComputerUseModule,
            mcp_nest_1.McpModule.forRoot({
                name: 'bytebotd',
                version: '0.0.1',
                sseEndpoint: '/mcp',
            }),
        ],
        providers: [computer_use_tools_1.ComputerUseTools],
    })
], BytebotMcpModule);
//# sourceMappingURL=bytebot-mcp.module.js.map