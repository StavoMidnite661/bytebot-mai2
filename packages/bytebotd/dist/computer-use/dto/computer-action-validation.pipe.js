"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerActionValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const computer_action_dto_1 = require("./computer-action.dto");
let ComputerActionValidationPipe = class ComputerActionValidationPipe {
    async transform(value, metadata) {
        if (!value || !value.action) {
            throw new common_1.BadRequestException('Missing action field');
        }
        let dto;
        switch (value.action) {
            case 'move_mouse':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.MoveMouseActionDto, value);
                break;
            case 'trace_mouse':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.TraceMouseActionDto, value);
                break;
            case 'click_mouse':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.ClickMouseActionDto, value);
                break;
            case 'press_mouse':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.PressMouseActionDto, value);
                break;
            case 'drag_mouse':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.DragMouseActionDto, value);
                break;
            case 'scroll':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.ScrollActionDto, value);
                break;
            case 'type_keys':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.TypeKeysActionDto, value);
                break;
            case 'press_keys':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.PressKeysActionDto, value);
                break;
            case 'type_text':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.TypeTextActionDto, value);
                break;
            case 'paste_text':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.PasteTextActionDto, value);
                break;
            case 'wait':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.WaitActionDto, value);
                break;
            case 'screenshot':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.ScreenshotActionDto, value);
                break;
            case 'cursor_position':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.CursorPositionActionDto, value);
                break;
            case 'application':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.ApplicationActionDto, value);
                break;
            case 'write_file':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.WriteFileActionDto, value);
                break;
            case 'read_file':
                dto = (0, class_transformer_1.plainToClass)(computer_action_dto_1.ReadFileActionDto, value);
                break;
            default:
                throw new common_1.BadRequestException(`Unknown action: ${value.action}`);
        }
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        return dto;
    }
};
exports.ComputerActionValidationPipe = ComputerActionValidationPipe;
exports.ComputerActionValidationPipe = ComputerActionValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ComputerActionValidationPipe);
//# sourceMappingURL=computer-action-validation.pipe.js.map