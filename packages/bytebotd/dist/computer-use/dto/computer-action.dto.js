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
exports.ReadFileActionDto = exports.WriteFileActionDto = exports.ApplicationActionDto = exports.CursorPositionActionDto = exports.ScreenshotActionDto = exports.WaitActionDto = exports.PasteTextActionDto = exports.TypeTextActionDto = exports.PressKeysActionDto = exports.TypeKeysActionDto = exports.ScrollActionDto = exports.DragMouseActionDto = exports.PressMouseActionDto = exports.ClickMouseActionDto = exports.TraceMouseActionDto = exports.MoveMouseActionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const base_dto_1 = require("./base.dto");
class BaseActionDto {
}
class MoveMouseActionDto extends BaseActionDto {
}
exports.MoveMouseActionDto = MoveMouseActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['move_mouse']),
    __metadata("design:type", String)
], MoveMouseActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_dto_1.CoordinatesDto),
    __metadata("design:type", base_dto_1.CoordinatesDto)
], MoveMouseActionDto.prototype, "coordinates", void 0);
class TraceMouseActionDto extends BaseActionDto {
}
exports.TraceMouseActionDto = TraceMouseActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['trace_mouse']),
    __metadata("design:type", String)
], TraceMouseActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => base_dto_1.CoordinatesDto),
    __metadata("design:type", Array)
], TraceMouseActionDto.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TraceMouseActionDto.prototype, "holdKeys", void 0);
class ClickMouseActionDto extends BaseActionDto {
}
exports.ClickMouseActionDto = ClickMouseActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['click_mouse']),
    __metadata("design:type", String)
], ClickMouseActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_dto_1.CoordinatesDto),
    __metadata("design:type", base_dto_1.CoordinatesDto)
], ClickMouseActionDto.prototype, "coordinates", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.ButtonType),
    __metadata("design:type", String)
], ClickMouseActionDto.prototype, "button", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ClickMouseActionDto.prototype, "holdKeys", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ClickMouseActionDto.prototype, "clickCount", void 0);
class PressMouseActionDto extends BaseActionDto {
}
exports.PressMouseActionDto = PressMouseActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['press_mouse']),
    __metadata("design:type", String)
], PressMouseActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_dto_1.CoordinatesDto),
    __metadata("design:type", base_dto_1.CoordinatesDto)
], PressMouseActionDto.prototype, "coordinates", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.ButtonType),
    __metadata("design:type", String)
], PressMouseActionDto.prototype, "button", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.PressType),
    __metadata("design:type", String)
], PressMouseActionDto.prototype, "press", void 0);
class DragMouseActionDto extends BaseActionDto {
}
exports.DragMouseActionDto = DragMouseActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['drag_mouse']),
    __metadata("design:type", String)
], DragMouseActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => base_dto_1.CoordinatesDto),
    __metadata("design:type", Array)
], DragMouseActionDto.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.ButtonType),
    __metadata("design:type", String)
], DragMouseActionDto.prototype, "button", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DragMouseActionDto.prototype, "holdKeys", void 0);
class ScrollActionDto extends BaseActionDto {
}
exports.ScrollActionDto = ScrollActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['scroll']),
    __metadata("design:type", String)
], ScrollActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_dto_1.CoordinatesDto),
    __metadata("design:type", base_dto_1.CoordinatesDto)
], ScrollActionDto.prototype, "coordinates", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.ScrollDirection),
    __metadata("design:type", String)
], ScrollActionDto.prototype, "direction", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ScrollActionDto.prototype, "scrollCount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ScrollActionDto.prototype, "holdKeys", void 0);
class TypeKeysActionDto extends BaseActionDto {
}
exports.TypeKeysActionDto = TypeKeysActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['type_keys']),
    __metadata("design:type", String)
], TypeKeysActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TypeKeysActionDto.prototype, "keys", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TypeKeysActionDto.prototype, "delay", void 0);
class PressKeysActionDto extends BaseActionDto {
}
exports.PressKeysActionDto = PressKeysActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['press_keys']),
    __metadata("design:type", String)
], PressKeysActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PressKeysActionDto.prototype, "keys", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.PressType),
    __metadata("design:type", String)
], PressKeysActionDto.prototype, "press", void 0);
class TypeTextActionDto extends BaseActionDto {
}
exports.TypeTextActionDto = TypeTextActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['type_text']),
    __metadata("design:type", String)
], TypeTextActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TypeTextActionDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TypeTextActionDto.prototype, "delay", void 0);
class PasteTextActionDto extends BaseActionDto {
}
exports.PasteTextActionDto = PasteTextActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['paste_text']),
    __metadata("design:type", String)
], PasteTextActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PasteTextActionDto.prototype, "text", void 0);
class WaitActionDto extends BaseActionDto {
}
exports.WaitActionDto = WaitActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['wait']),
    __metadata("design:type", String)
], WaitActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], WaitActionDto.prototype, "duration", void 0);
class ScreenshotActionDto extends BaseActionDto {
}
exports.ScreenshotActionDto = ScreenshotActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['screenshot']),
    __metadata("design:type", String)
], ScreenshotActionDto.prototype, "action", void 0);
class CursorPositionActionDto extends BaseActionDto {
}
exports.CursorPositionActionDto = CursorPositionActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['cursor_position']),
    __metadata("design:type", String)
], CursorPositionActionDto.prototype, "action", void 0);
class ApplicationActionDto extends BaseActionDto {
}
exports.ApplicationActionDto = ApplicationActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['application']),
    __metadata("design:type", String)
], ApplicationActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(base_dto_1.ApplicationName),
    __metadata("design:type", String)
], ApplicationActionDto.prototype, "application", void 0);
class WriteFileActionDto extends BaseActionDto {
}
exports.WriteFileActionDto = WriteFileActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['write_file']),
    __metadata("design:type", String)
], WriteFileActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WriteFileActionDto.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WriteFileActionDto.prototype, "data", void 0);
class ReadFileActionDto extends BaseActionDto {
}
exports.ReadFileActionDto = ReadFileActionDto;
__decorate([
    (0, class_validator_1.IsIn)(['read_file']),
    __metadata("design:type", String)
], ReadFileActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReadFileActionDto.prototype, "path", void 0);
//# sourceMappingURL=computer-action.dto.js.map