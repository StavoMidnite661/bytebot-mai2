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
var NutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutService = void 0;
const common_1 = require("@nestjs/common");
const nut_js_1 = require("@nut-tree-fork/nut-js");
const child_process_1 = require("child_process");
const path = require("path");
const XKeySymToNutKeyMap = {
    '1': nut_js_1.Key.Num1,
    '2': nut_js_1.Key.Num2,
    '3': nut_js_1.Key.Num3,
    '4': nut_js_1.Key.Num4,
    '5': nut_js_1.Key.Num5,
    '6': nut_js_1.Key.Num6,
    '7': nut_js_1.Key.Num7,
    '8': nut_js_1.Key.Num8,
    '9': nut_js_1.Key.Num9,
    '0': nut_js_1.Key.Num0,
    bracketleft: nut_js_1.Key.LeftBracket,
    bracketright: nut_js_1.Key.RightBracket,
    apostrophe: nut_js_1.Key.Quote,
    Shift: nut_js_1.Key.LeftShift,
    ctrl: nut_js_1.Key.LeftControl,
    Control: nut_js_1.Key.LeftControl,
    Super: nut_js_1.Key.LeftSuper,
    Alt: nut_js_1.Key.LeftAlt,
    Meta: nut_js_1.Key.LeftMeta,
    Shift_L: nut_js_1.Key.LeftShift,
    Shift_R: nut_js_1.Key.RightShift,
    Control_L: nut_js_1.Key.LeftControl,
    Control_R: nut_js_1.Key.RightControl,
    Super_L: nut_js_1.Key.LeftSuper,
    Super_R: nut_js_1.Key.RightSuper,
    Alt_L: nut_js_1.Key.LeftAlt,
    Alt_R: nut_js_1.Key.RightAlt,
    Meta_L: nut_js_1.Key.LeftMeta,
    Meta_R: nut_js_1.Key.RightMeta,
    Caps_Lock: nut_js_1.Key.CapsLock,
    Num_Lock: nut_js_1.Key.NumLock,
    Scroll_Lock: nut_js_1.Key.ScrollLock,
    Page_Up: nut_js_1.Key.PageUp,
    Page_Down: nut_js_1.Key.PageDown,
    KP_0: nut_js_1.Key.NumPad0,
    KP_1: nut_js_1.Key.NumPad1,
    KP_2: nut_js_1.Key.NumPad2,
    KP_3: nut_js_1.Key.NumPad3,
    KP_4: nut_js_1.Key.NumPad4,
    KP_5: nut_js_1.Key.NumPad5,
    KP_6: nut_js_1.Key.NumPad6,
    KP_7: nut_js_1.Key.NumPad7,
    KP_8: nut_js_1.Key.NumPad8,
    KP_9: nut_js_1.Key.NumPad9,
    KP_Add: nut_js_1.Key.Add,
    KP_Subtract: nut_js_1.Key.Subtract,
    KP_Multiply: nut_js_1.Key.Multiply,
    KP_Divide: nut_js_1.Key.Divide,
    KP_Decimal: nut_js_1.Key.Decimal,
    KP_Equal: nut_js_1.Key.NumPadEqual,
    AudioLowerVolume: nut_js_1.Key.AudioVolDown,
    AudioRaiseVolume: nut_js_1.Key.AudioVolUp,
    AudioRandomPlay: nut_js_1.Key.AudioRandom,
};
const XKeySymToNutKeyMapLowercase = Object.entries(XKeySymToNutKeyMap).reduce((map, [key, value]) => {
    map[key.toLowerCase()] = value;
    return map;
}, {});
const NutKeyMap = Object.entries(nut_js_1.Key)
    .filter(([name]) => isNaN(Number(name)))
    .reduce((map, [name, value]) => {
    map[name] = value;
    return map;
}, {});
const NutKeyMapLowercase = Object.entries(nut_js_1.Key)
    .filter(([name]) => isNaN(Number(name)))
    .reduce((map, [name, value]) => {
    map[name.toLowerCase()] = value;
    return map;
}, {});
let NutService = NutService_1 = class NutService {
    constructor() {
        this.logger = new common_1.Logger(NutService_1.name);
        nut_js_1.mouse.config.autoDelayMs = 100;
        nut_js_1.keyboard.config.autoDelayMs = 100;
        this.screenshotDir = path.join('/tmp', 'bytebot-screenshots');
        Promise.resolve().then(() => require('fs')).then((fs) => {
            fs.promises
                .mkdir(this.screenshotDir, { recursive: true })
                .catch((err) => {
                this.logger.error(`Failed to create screenshot directory: ${err.message}`);
            });
        });
    }
    async sendKeys(keys, delay = 100) {
        this.logger.log(`Sending keys: ${keys}`);
        try {
            const nutKeys = keys.map((key) => this.validateKey(key));
            await nut_js_1.keyboard.pressKey(...nutKeys);
            await this.delay(delay);
            await nut_js_1.keyboard.releaseKey(...nutKeys);
            return { success: true };
        }
        catch (error) {
            throw new Error(`Failed to send keys: ${error.message}`);
        }
    }
    async holdKeys(keys, down) {
        try {
            for (const key of keys) {
                const nutKey = this.validateKey(key);
                if (down) {
                    await nut_js_1.keyboard.pressKey(nutKey);
                }
                else {
                    await nut_js_1.keyboard.releaseKey(nutKey);
                }
            }
            return { success: true };
        }
        catch (error) {
            throw new Error(`Failed to hold keys: ${error.message}`);
        }
    }
    validateKey(key) {
        let nutKey = XKeySymToNutKeyMap[key] || NutKeyMap[key];
        if (nutKey === undefined) {
            const lowerKey = key.toLowerCase();
            nutKey =
                XKeySymToNutKeyMapLowercase[lowerKey] || NutKeyMapLowercase[lowerKey];
        }
        if (nutKey === undefined) {
            throw new Error(`Invalid key: '${key}'. Key not found in available key mappings.`);
        }
        return nutKey;
    }
    async typeText(text, delayMs = 0) {
        this.logger.log(`Typing text: ${text}`);
        try {
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const keyInfo = this.charToKeyInfo(char);
                if (keyInfo) {
                    if (keyInfo.withShift) {
                        await nut_js_1.keyboard.pressKey(nut_js_1.Key.LeftShift, keyInfo.keyCode);
                        await nut_js_1.keyboard.releaseKey(nut_js_1.Key.LeftShift, keyInfo.keyCode);
                    }
                    else {
                        await nut_js_1.keyboard.pressKey(keyInfo.keyCode);
                        await nut_js_1.keyboard.releaseKey(keyInfo.keyCode);
                    }
                    if (delayMs > 0 && i < text.length - 1) {
                        await new Promise((resolve) => setTimeout(resolve, delayMs));
                    }
                }
                else {
                    throw new Error(`No key mapping found for character: ${char}`);
                }
            }
        }
        catch (error) {
            throw new Error(`Failed to type text: ${error.message}`);
        }
    }
    async pasteText(text) {
        this.logger.log(`Pasting text: ${text}`);
        try {
            await new Promise((resolve, reject) => {
                const child = (0, child_process_1.spawn)('xclip', ['-selection', 'clipboard'], {
                    env: { ...process.env, DISPLAY: ':0.0' },
                    stdio: ['pipe', 'ignore', 'inherit'],
                });
                child.once('error', reject);
                child.once('close', (code) => {
                    code === 0
                        ? resolve()
                        : reject(new Error(`xclip exited with code ${code}`));
                });
                child.stdin.write(text);
                child.stdin.end();
            });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await nut_js_1.keyboard.pressKey(nut_js_1.Key.LeftControl, nut_js_1.Key.V);
            await nut_js_1.keyboard.releaseKey(nut_js_1.Key.LeftControl, nut_js_1.Key.V);
        }
        catch (error) {
            throw new Error(`Failed to paste text: ${error.message}`);
        }
    }
    charToKeyInfo(char) {
        if (/^[a-z]$/.test(char)) {
            return { keyCode: this.validateKey(char), withShift: false };
        }
        if (/^[A-Z]$/.test(char)) {
            return {
                keyCode: this.validateKey(char.toLowerCase()),
                withShift: true,
            };
        }
        if (/^[0-9]$/.test(char)) {
            return { keyCode: this.validateKey(char), withShift: false };
        }
        const specialCharMap = {
            ' ': { keyCode: nut_js_1.Key.Space, withShift: false },
            '.': { keyCode: nut_js_1.Key.Period, withShift: false },
            ',': { keyCode: nut_js_1.Key.Comma, withShift: false },
            ';': { keyCode: nut_js_1.Key.Semicolon, withShift: false },
            "'": { keyCode: nut_js_1.Key.Quote, withShift: false },
            '`': { keyCode: nut_js_1.Key.Grave, withShift: false },
            '-': { keyCode: nut_js_1.Key.Minus, withShift: false },
            '=': { keyCode: nut_js_1.Key.Equal, withShift: false },
            '[': { keyCode: nut_js_1.Key.LeftBracket, withShift: false },
            ']': { keyCode: nut_js_1.Key.RightBracket, withShift: false },
            '\\': { keyCode: nut_js_1.Key.Backslash, withShift: false },
            '/': { keyCode: nut_js_1.Key.Slash, withShift: false },
            '!': { keyCode: nut_js_1.Key.Num1, withShift: true },
            '@': { keyCode: nut_js_1.Key.Num2, withShift: true },
            '#': { keyCode: nut_js_1.Key.Num3, withShift: true },
            $: { keyCode: nut_js_1.Key.Num4, withShift: true },
            '%': { keyCode: nut_js_1.Key.Num5, withShift: true },
            '^': { keyCode: nut_js_1.Key.Num6, withShift: true },
            '&': { keyCode: nut_js_1.Key.Num7, withShift: true },
            '*': { keyCode: nut_js_1.Key.Num8, withShift: true },
            '(': { keyCode: nut_js_1.Key.Num9, withShift: true },
            ')': { keyCode: nut_js_1.Key.Num0, withShift: true },
            _: { keyCode: nut_js_1.Key.Minus, withShift: true },
            '+': { keyCode: nut_js_1.Key.Equal, withShift: true },
            '{': { keyCode: nut_js_1.Key.LeftBracket, withShift: true },
            '}': { keyCode: nut_js_1.Key.RightBracket, withShift: true },
            '|': { keyCode: nut_js_1.Key.Backslash, withShift: true },
            ':': { keyCode: nut_js_1.Key.Semicolon, withShift: true },
            '"': { keyCode: nut_js_1.Key.Quote, withShift: true },
            '<': { keyCode: nut_js_1.Key.Comma, withShift: true },
            '>': { keyCode: nut_js_1.Key.Period, withShift: true },
            '?': { keyCode: nut_js_1.Key.Slash, withShift: true },
            '~': { keyCode: nut_js_1.Key.Grave, withShift: true },
            '\n': { keyCode: nut_js_1.Key.Enter, withShift: false },
        };
        return specialCharMap[char] || null;
    }
    async mouseMoveEvent({ x, y }) {
        this.logger.log(`Moving mouse to coordinates: (${x}, ${y})`);
        try {
            const point = new nut_js_1.Point(x, y);
            await nut_js_1.mouse.setPosition(point);
            return { success: true };
        }
        catch (error) {
            throw new Error(`Failed to move mouse: ${error.message}`);
        }
    }
    async mouseClickEvent(button) {
        this.logger.log(`Clicking mouse button: ${button}`);
        try {
            switch (button) {
                case 'left':
                    await nut_js_1.mouse.click(nut_js_1.Button.LEFT);
                    break;
                case 'right':
                    await nut_js_1.mouse.click(nut_js_1.Button.RIGHT);
                    break;
                case 'middle':
                    await nut_js_1.mouse.click(nut_js_1.Button.MIDDLE);
                    break;
            }
            return { success: true };
        }
        catch (error) {
            throw new Error(`Failed to click mouse button: ${error.message}`);
        }
    }
    async mouseButtonEvent(button, pressed) {
        this.logger.log(`Mouse button event: ${button} ${pressed ? 'pressed' : 'released'}`);
        try {
            if (pressed) {
                switch (button) {
                    case 'left':
                        await nut_js_1.mouse.pressButton(nut_js_1.Button.LEFT);
                        break;
                    case 'right':
                        await nut_js_1.mouse.pressButton(nut_js_1.Button.RIGHT);
                        break;
                    case 'middle':
                        await nut_js_1.mouse.pressButton(nut_js_1.Button.MIDDLE);
                        break;
                }
            }
            else {
                switch (button) {
                    case 'left':
                        await nut_js_1.mouse.releaseButton(nut_js_1.Button.LEFT);
                        break;
                    case 'right':
                        await nut_js_1.mouse.releaseButton(nut_js_1.Button.RIGHT);
                        break;
                    case 'middle':
                        await nut_js_1.mouse.releaseButton(nut_js_1.Button.MIDDLE);
                        break;
                }
            }
            return { success: true };
        }
        catch (error) {
            throw new Error(`Failed to send mouse ${button} button ${pressed ? 'press' : 'release'} event: ${error.message}`);
        }
    }
    async mouseWheelEvent(direction, amount) {
        this.logger.log(`Mouse wheel event: ${direction} ${amount}`);
        try {
            switch (direction) {
                case 'up':
                    await nut_js_1.mouse.scrollUp(amount);
                    break;
                case 'down':
                    await nut_js_1.mouse.scrollDown(amount);
                    break;
                case 'left':
                    await nut_js_1.mouse.scrollLeft(amount);
                    break;
                case 'right':
                    await nut_js_1.mouse.scrollRight(amount);
                    break;
            }
            return { success: true };
        }
        catch (error) {
            throw new Error(`Failed to scroll: ${error.message}`);
        }
    }
    async screendump() {
        const filename = `screenshot-${Date.now()}.png`;
        const filepath = path.join(this.screenshotDir, filename);
        this.logger.log(`Taking screenshot to ${filepath}`);
        try {
            await nut_js_1.screen.capture(filename, nut_js_1.FileType.PNG, this.screenshotDir);
            return await Promise.resolve().then(() => require('fs')).then((fs) => fs.promises.readFile(filepath));
        }
        catch (error) {
            this.logger.error(`Error taking screenshot: ${error.message}`);
            throw error;
        }
        finally {
            try {
                await Promise.resolve().then(() => require('fs')).then((fs) => fs.promises.unlink(filepath));
            }
            catch (unlinkError) {
                this.logger.warn(`Failed to remove temporary screenshot file: ${unlinkError.message}`);
            }
        }
    }
    async getCursorPosition() {
        this.logger.log(`Getting cursor position`);
        try {
            const position = await nut_js_1.mouse.getPosition();
            return { x: position.x, y: position.y };
        }
        catch (error) {
            this.logger.error(`Error getting cursor position: ${error.message}`);
            throw error;
        }
    }
    async delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.NutService = NutService;
exports.NutService = NutService = NutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NutService);
//# sourceMappingURL=nut.service.js.map