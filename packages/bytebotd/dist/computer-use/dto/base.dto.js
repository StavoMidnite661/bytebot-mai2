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
exports.ApplicationName = exports.ScrollDirection = exports.PressType = exports.ButtonType = exports.CoordinatesDto = void 0;
const class_validator_1 = require("class-validator");
class CoordinatesDto {
}
exports.CoordinatesDto = CoordinatesDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CoordinatesDto.prototype, "x", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CoordinatesDto.prototype, "y", void 0);
var ButtonType;
(function (ButtonType) {
    ButtonType["LEFT"] = "left";
    ButtonType["RIGHT"] = "right";
    ButtonType["MIDDLE"] = "middle";
})(ButtonType || (exports.ButtonType = ButtonType = {}));
var PressType;
(function (PressType) {
    PressType["UP"] = "up";
    PressType["DOWN"] = "down";
})(PressType || (exports.PressType = PressType = {}));
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection["UP"] = "up";
    ScrollDirection["DOWN"] = "down";
    ScrollDirection["LEFT"] = "left";
    ScrollDirection["RIGHT"] = "right";
})(ScrollDirection || (exports.ScrollDirection = ScrollDirection = {}));
var ApplicationName;
(function (ApplicationName) {
    ApplicationName["FIREFOX"] = "firefox";
    ApplicationName["ONEPASSWORD"] = "1password";
    ApplicationName["THUNDERBIRD"] = "thunderbird";
    ApplicationName["VSCODE"] = "vscode";
    ApplicationName["TERMINAL"] = "terminal";
    ApplicationName["DESKTOP"] = "desktop";
    ApplicationName["DIRECTORY"] = "directory";
})(ApplicationName || (exports.ApplicationName = ApplicationName = {}));
//# sourceMappingURL=base.dto.js.map