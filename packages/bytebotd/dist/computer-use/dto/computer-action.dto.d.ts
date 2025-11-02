import { ButtonType, CoordinatesDto, PressType, ScrollDirection, ApplicationName } from './base.dto';
declare abstract class BaseActionDto {
    abstract action: string;
}
export declare class MoveMouseActionDto extends BaseActionDto {
    action: 'move_mouse';
    coordinates: CoordinatesDto;
}
export declare class TraceMouseActionDto extends BaseActionDto {
    action: 'trace_mouse';
    path: CoordinatesDto[];
    holdKeys?: string[];
}
export declare class ClickMouseActionDto extends BaseActionDto {
    action: 'click_mouse';
    coordinates?: CoordinatesDto;
    button: ButtonType;
    holdKeys?: string[];
    clickCount: number;
}
export declare class PressMouseActionDto extends BaseActionDto {
    action: 'press_mouse';
    coordinates?: CoordinatesDto;
    button: ButtonType;
    press: PressType;
}
export declare class DragMouseActionDto extends BaseActionDto {
    action: 'drag_mouse';
    path: CoordinatesDto[];
    button: ButtonType;
    holdKeys?: string[];
}
export declare class ScrollActionDto extends BaseActionDto {
    action: 'scroll';
    coordinates?: CoordinatesDto;
    direction: ScrollDirection;
    scrollCount: number;
    holdKeys?: string[];
}
export declare class TypeKeysActionDto extends BaseActionDto {
    action: 'type_keys';
    keys: string[];
    delay?: number;
}
export declare class PressKeysActionDto extends BaseActionDto {
    action: 'press_keys';
    keys: string[];
    press: PressType;
}
export declare class TypeTextActionDto extends BaseActionDto {
    action: 'type_text';
    text: string;
    delay?: number;
}
export declare class PasteTextActionDto extends BaseActionDto {
    action: 'paste_text';
    text: string;
}
export declare class WaitActionDto extends BaseActionDto {
    action: 'wait';
    duration: number;
}
export declare class ScreenshotActionDto extends BaseActionDto {
    action: 'screenshot';
}
export declare class CursorPositionActionDto extends BaseActionDto {
    action: 'cursor_position';
}
export declare class ApplicationActionDto extends BaseActionDto {
    action: 'application';
    application: ApplicationName;
}
export declare class WriteFileActionDto extends BaseActionDto {
    action: 'write_file';
    path: string;
    data: string;
}
export declare class ReadFileActionDto extends BaseActionDto {
    action: 'read_file';
    path: string;
}
export type ComputerActionDto = MoveMouseActionDto | TraceMouseActionDto | ClickMouseActionDto | PressMouseActionDto | DragMouseActionDto | ScrollActionDto | TypeKeysActionDto | PressKeysActionDto | TypeTextActionDto | PasteTextActionDto | WaitActionDto | ScreenshotActionDto | CursorPositionActionDto | ApplicationActionDto | WriteFileActionDto | ReadFileActionDto;
export {};
