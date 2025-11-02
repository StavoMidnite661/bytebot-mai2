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
var InputTrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTrackingService = void 0;
const common_1 = require("@nestjs/common");
const uiohook_napi_1 = require("uiohook-napi");
const computer_use_service_1 = require("../computer-use/computer-use.service");
const input_tracking_gateway_1 = require("./input-tracking.gateway");
const input_tracking_helpers_1 = require("./input-tracking.helpers");
let InputTrackingService = InputTrackingService_1 = class InputTrackingService {
    constructor(gateway, computerUseService) {
        this.gateway = gateway;
        this.computerUseService = computerUseService;
        this.logger = new common_1.Logger(InputTrackingService_1.name);
        this.isTracking = false;
        this.isDragging = false;
        this.dragMouseAction = null;
        this.scrollAction = null;
        this.scrollCount = 0;
        this.clickMouseActionBuffer = [];
        this.clickMouseActionTimeout = null;
        this.CLICK_DEBOUNCE_MS = 250;
        this.screenshot = null;
        this.screenshotTimeout = null;
        this.SCREENSHOT_DEBOUNCE_MS = 250;
        this.pressedKeys = new Set();
        this.typingBuffer = [];
        this.typingTimer = null;
        this.TYPING_DEBOUNCE_MS = 500;
    }
    onModuleDestroy() {
        this.stopTracking();
    }
    startTracking() {
        if (this.isTracking) {
            return;
        }
        this.logger.log('Starting input tracking');
        this.registerListeners();
        uiohook_napi_1.uIOhook.start();
        this.isTracking = true;
    }
    stopTracking() {
        if (!this.isTracking) {
            return;
        }
        this.logger.log('Stopping input tracking');
        uiohook_napi_1.uIOhook.stop();
        uiohook_napi_1.uIOhook.removeAllListeners();
        this.isTracking = false;
    }
    bufferChar(char) {
        this.typingBuffer.push(char);
        if (this.typingTimer)
            clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.flushTypingBuffer(), this.TYPING_DEBOUNCE_MS);
    }
    async flushTypingBuffer() {
        if (!this.typingBuffer.length)
            return;
        const action = {
            action: 'type_text',
            text: this.typingBuffer.join(''),
        };
        this.typingBuffer.length = 0;
        await this.logAction(action);
    }
    isModifierKey(key) {
        return key.altKey || key.ctrlKey || key.metaKey;
    }
    registerListeners() {
        uiohook_napi_1.uIOhook.on('mousemove', (e) => {
            if (this.isDragging && this.dragMouseAction) {
                this.dragMouseAction.path.push({ x: e.x, y: e.y });
            }
            else {
                if (this.screenshotTimeout) {
                    clearTimeout(this.screenshotTimeout);
                }
                this.screenshotTimeout = setTimeout(async () => {
                    this.screenshot = await this.computerUseService.screenshot();
                }, this.SCREENSHOT_DEBOUNCE_MS);
            }
        });
        uiohook_napi_1.uIOhook.on('click', (e) => {
            const action = {
                action: 'click_mouse',
                button: this.mapButton(e.button),
                coordinates: { x: e.x, y: e.y },
                clickCount: e.clicks,
                holdKeys: [
                    e.altKey ? 'alt' : undefined,
                    e.ctrlKey ? 'ctrl' : undefined,
                    e.shiftKey ? 'shift' : undefined,
                    e.metaKey ? 'meta' : undefined,
                ].filter((key) => key !== undefined),
            };
            this.clickMouseActionBuffer.push(action);
            if (this.clickMouseActionTimeout) {
                clearTimeout(this.clickMouseActionTimeout);
            }
            this.clickMouseActionTimeout = setTimeout(async () => {
                const final = this.clickMouseActionBuffer.reduce((a, b) => b.clickCount > a.clickCount ? b : a);
                await this.logAction(final);
                this.clickMouseActionTimeout = null;
                this.clickMouseActionBuffer = [];
            }, this.CLICK_DEBOUNCE_MS);
        });
        uiohook_napi_1.uIOhook.on('mousedown', (e) => {
            this.isDragging = true;
            this.dragMouseAction = {
                action: 'drag_mouse',
                button: this.mapButton(e.button),
                path: [{ x: e.x, y: e.y }],
                holdKeys: [
                    e.altKey ? 'alt' : undefined,
                    e.ctrlKey ? 'ctrl' : undefined,
                    e.shiftKey ? 'shift' : undefined,
                    e.metaKey ? 'meta' : undefined,
                ].filter((key) => key !== undefined),
            };
        });
        uiohook_napi_1.uIOhook.on('mouseup', async (e) => {
            if (this.isDragging && this.dragMouseAction) {
                this.dragMouseAction.path.push({ x: e.x, y: e.y });
                if (this.dragMouseAction.path.length > 3) {
                    await this.logAction(this.dragMouseAction);
                }
                this.dragMouseAction = null;
            }
            this.isDragging = false;
        });
        uiohook_napi_1.uIOhook.on('wheel', async (e) => {
            const direction = e.direction === uiohook_napi_1.WheelDirection.VERTICAL
                ? e.rotation > 0
                    ? 'down'
                    : 'up'
                : e.rotation > 0
                    ? 'right'
                    : 'left';
            const action = {
                action: 'scroll',
                direction: direction,
                scrollCount: 1,
                coordinates: { x: e.x, y: e.y },
            };
            if (this.scrollAction &&
                action.direction === this.scrollAction.direction) {
                this.scrollCount++;
                if (this.scrollCount >= 4) {
                    await this.logAction(this.scrollAction);
                    this.scrollAction = null;
                    this.scrollCount = 0;
                }
            }
            else {
                this.scrollAction = action;
                this.scrollCount = 1;
            }
        });
        uiohook_napi_1.uIOhook.on('keydown', async (e) => {
            if (!input_tracking_helpers_1.keyInfoMap[e.keycode]) {
                this.logger.warn(`Unknown key: ${e.keycode}`);
                return;
            }
            if (!this.isModifierKey(e) && input_tracking_helpers_1.keyInfoMap[e.keycode].isPrintable) {
                this.bufferChar(e.shiftKey
                    ? input_tracking_helpers_1.keyInfoMap[e.keycode].shiftString
                    : input_tracking_helpers_1.keyInfoMap[e.keycode].string);
                return;
            }
            await this.flushTypingBuffer();
            if (this.pressedKeys.has(e.keycode)) {
                return;
            }
            this.pressedKeys.add(e.keycode);
        });
        uiohook_napi_1.uIOhook.on('keyup', async (e) => {
            if (!input_tracking_helpers_1.keyInfoMap[e.keycode]) {
                this.logger.warn(`Unknown key: ${e.keycode}`);
                return;
            }
            if (!this.isModifierKey(e) && input_tracking_helpers_1.keyInfoMap[e.keycode].isPrintable) {
                return;
            }
            await this.flushTypingBuffer();
            if (this.pressedKeys.size === 0) {
                return;
            }
            const action = {
                action: 'type_keys',
                keys: [
                    ...Array.from(this.pressedKeys.values()).map((key) => input_tracking_helpers_1.keyInfoMap[key].name),
                ].filter((key) => key !== undefined),
            };
            this.pressedKeys.clear();
            await this.logAction(action);
        });
    }
    mapButton(btn) {
        switch (btn) {
            case 1:
                return 'left';
            case 2:
                return 'right';
            case 3:
                return 'middle';
            default:
                return 'left';
        }
    }
    async logAction(action) {
        this.logger.log(`Detected action: ${JSON.stringify(action)}`);
        if (this.screenshot &&
            (action.action === 'click_mouse' || action.action === 'drag_mouse')) {
            this.gateway.emitScreenshotAndAction(this.screenshot, action);
            return;
        }
        this.gateway.emitAction(action);
    }
};
exports.InputTrackingService = InputTrackingService;
exports.InputTrackingService = InputTrackingService = InputTrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [input_tracking_gateway_1.InputTrackingGateway,
        computer_use_service_1.ComputerUseService])
], InputTrackingService);
//# sourceMappingURL=input-tracking.service.js.map