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
exports.ComputerUseTools = void 0;
const common_1 = require("@nestjs/common");
const mcp_nest_1 = require("@rekog/mcp-nest");
const zod_1 = require("zod");
const computer_use_service_1 = require("../computer-use/computer-use.service");
const compressor_1 = require("./compressor");
let ComputerUseTools = class ComputerUseTools {
    constructor(computerUse) {
        this.computerUse = computerUse;
    }
    async moveMouse({ coordinates }) {
        try {
            await this.computerUse.action({ action: 'move_mouse', coordinates });
            return { content: [{ type: 'text', text: 'mouse moved' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error moving mouse: ${err.message}`,
                    },
                ],
            };
        }
    }
    async traceMouse({ path, holdKeys, }) {
        try {
            await this.computerUse.action({ action: 'trace_mouse', path, holdKeys });
            return {
                content: [{ type: 'text', text: 'mouse traced' }],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error tracing mouse: ${err.message}`,
                    },
                ],
            };
        }
    }
    async clickMouse({ coordinates, button, holdKeys, clickCount, }) {
        try {
            await this.computerUse.action({
                action: 'click_mouse',
                coordinates,
                button,
                holdKeys,
                clickCount,
            });
            return {
                content: [{ type: 'text', text: 'mouse clicked' }],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error clicking mouse: ${err.message}`,
                    },
                ],
            };
        }
    }
    async pressMouse({ coordinates, button, press, }) {
        try {
            await this.computerUse.action({
                action: 'press_mouse',
                coordinates,
                button,
                press,
            });
            return {
                content: [{ type: 'text', text: 'mouse pressed' }],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error pressing mouse: ${err.message}`,
                    },
                ],
            };
        }
    }
    async dragMouse({ path, button, holdKeys, }) {
        try {
            await this.computerUse.action({
                action: 'drag_mouse',
                path,
                button,
                holdKeys,
            });
            return {
                content: [{ type: 'text', text: 'mouse dragged' }],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error dragging mouse: ${err.message}`,
                    },
                ],
            };
        }
    }
    async scroll({ coordinates, direction, scrollCount, holdKeys, }) {
        try {
            await this.computerUse.action({
                action: 'scroll',
                coordinates,
                direction,
                scrollCount,
                holdKeys,
            });
            return { content: [{ type: 'text', text: 'scrolled' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error scrolling: ${err.message}`,
                    },
                ],
            };
        }
    }
    async typeKeys({ keys, delay }) {
        try {
            await this.computerUse.action({ action: 'type_keys', keys, delay });
            return { content: [{ type: 'text', text: 'keys typed' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error typing keys: ${err.message}`,
                    },
                ],
            };
        }
    }
    async pressKeys({ keys, press }) {
        try {
            await this.computerUse.action({ action: 'press_keys', keys, press });
            return { content: [{ type: 'text', text: 'keys pressed' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error pressing keys: ${err.message}`,
                    },
                ],
            };
        }
    }
    async typeText({ text, delay }) {
        try {
            await this.computerUse.action({ action: 'type_text', text, delay });
            return { content: [{ type: 'text', text: 'text typed' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error typing text: ${err.message}`,
                    },
                ],
            };
        }
    }
    async pasteText({ text }) {
        try {
            await this.computerUse.action({ action: 'paste_text', text });
            return { content: [{ type: 'text', text: 'text pasted' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error pasting text: ${err.message}`,
                    },
                ],
            };
        }
    }
    async wait({ duration }) {
        try {
            await this.computerUse.action({ action: 'wait', duration });
            return { content: [{ type: 'text', text: 'waiting done' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error waiting: ${err.message}`,
                    },
                ],
            };
        }
    }
    async application({ application, }) {
        try {
            await this.computerUse.action({ action: 'application', application });
            return { content: [{ type: 'text', text: 'application opened' }] };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error opening application: ${err.message}`,
                    },
                ],
            };
        }
    }
    async screenshot() {
        try {
            const shot = (await this.computerUse.action({
                action: 'screenshot',
            }));
            return {
                content: [
                    {
                        type: 'image',
                        data: await (0, compressor_1.compressPngBase64Under1MB)(shot.image),
                        mimeType: 'image/png',
                    },
                ],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error taking screenshot: ${err.message}`,
                    },
                ],
            };
        }
    }
    async cursorPosition() {
        try {
            const pos = (await this.computerUse.action({
                action: 'cursor_position',
            }));
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(pos),
                    },
                ],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error getting cursor position: ${err.message}`,
                    },
                ],
            };
        }
    }
    async writeFile({ path, data }) {
        try {
            const result = await this.computerUse.action({
                action: 'write_file',
                path,
                data,
            });
            return {
                content: [
                    {
                        type: 'text',
                        text: result.message || 'File written successfully',
                    },
                ],
            };
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error writing file: ${err.message}`,
                    },
                ],
            };
        }
    }
    async readFile({ path }) {
        try {
            const result = await this.computerUse.action({
                action: 'read_file',
                path,
            });
            if (result.success && result.data) {
                return {
                    content: [
                        {
                            type: 'document',
                            source: {
                                type: 'base64',
                                media_type: result.mediaType || 'application/octet-stream',
                                data: result.data,
                            },
                            name: result.name || 'file',
                            size: result.size,
                        },
                    ],
                };
            }
            else {
                return {
                    content: [
                        {
                            type: 'text',
                            text: result.message || 'Error reading file',
                        },
                    ],
                };
            }
        }
        catch (err) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error reading file: ${err.message}`,
                    },
                ],
            };
        }
    }
};
exports.ComputerUseTools = ComputerUseTools;
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_move_mouse',
        description: 'Moves the mouse cursor to the specified coordinates.',
        parameters: zod_1.z.object({
            coordinates: zod_1.z.object({
                x: zod_1.z.number().describe('The x-coordinate to move the mouse to.'),
                y: zod_1.z.number().describe('The y-coordinate to move the mouse to.'),
            }),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "moveMouse", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_trace_mouse',
        description: 'Moves the mouse cursor along a specified path of coordinates.',
        parameters: zod_1.z.object({
            path: zod_1.z
                .array(zod_1.z.object({
                x: zod_1.z.number().describe('The x-coordinate to move the mouse to.'),
                y: zod_1.z.number().describe('The y-coordinate to move the mouse to.'),
            }))
                .describe('An array of coordinate objects representing the path.'),
            holdKeys: zod_1.z
                .array(zod_1.z.string())
                .optional()
                .describe('Optional array of keys to hold during the trace.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "traceMouse", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_click_mouse',
        description: 'Performs a mouse click at the specified coordinates or current position.',
        parameters: zod_1.z.object({
            coordinates: zod_1.z
                .object({
                x: zod_1.z.number().describe('The x-coordinate to move the mouse to.'),
                y: zod_1.z.number().describe('The y-coordinate to move the mouse to.'),
            })
                .optional()
                .describe('Optional coordinates for the click. If not provided, clicks at the current mouse position.'),
            button: zod_1.z
                .enum(['left', 'right', 'middle'])
                .describe('The mouse button to click.'),
            holdKeys: zod_1.z
                .array(zod_1.z.string())
                .optional()
                .describe('Optional array of keys to hold during the click.'),
            clickCount: zod_1.z
                .number()
                .describe('Number of clicks to perform (e.g., 2 for double-click).'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "clickMouse", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_press_mouse',
        description: 'Presses or releases a specified mouse button at the given coordinates or current position.',
        parameters: zod_1.z.object({
            coordinates: zod_1.z
                .object({
                x: zod_1.z.number().describe('The x-coordinate for the mouse action.'),
                y: zod_1.z.number().describe('The y-coordinate for the mouse action.'),
            })
                .optional()
                .describe('Optional coordinates for the mouse press/release. If not provided, uses the current mouse position.'),
            button: zod_1.z
                .enum(['left', 'right', 'middle'])
                .describe('The mouse button to press or release.'),
            press: zod_1.z
                .enum(['down', 'up'])
                .describe('The action to perform (press or release).'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "pressMouse", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_drag_mouse',
        description: 'Drags the mouse from a starting point along a path while holding a specified button.',
        parameters: zod_1.z.object({
            path: zod_1.z
                .array(zod_1.z.object({
                x: zod_1.z
                    .number()
                    .describe('The x-coordinate of a point in the drag path.'),
                y: zod_1.z
                    .number()
                    .describe('The y-coordinate of a point in the drag path.'),
            }))
                .describe('An array of coordinate objects representing the drag path. The first coordinate is the start point.'),
            button: zod_1.z
                .enum(['left', 'right', 'middle'])
                .describe('The mouse button to hold while dragging.'),
            holdKeys: zod_1.z
                .array(zod_1.z.string())
                .optional()
                .describe('Optional array of keys to hold during the drag.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "dragMouse", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_scroll',
        description: 'Scrolls the mouse wheel up, down, left, or right.',
        parameters: zod_1.z.object({
            coordinates: zod_1.z
                .object({
                x: zod_1.z
                    .number()
                    .describe('The x-coordinate for the scroll action (if applicable).'),
                y: zod_1.z
                    .number()
                    .describe('The y-coordinate for the scroll action (if applicable).'),
            })
                .optional()
                .describe('Coordinates for where the scroll should occur. Behavior might depend on the OS/application.'),
            direction: zod_1.z
                .enum(['up', 'down', 'left', 'right'])
                .describe('The direction to scroll the mouse wheel.'),
            scrollCount: zod_1.z
                .number()
                .describe('The number of times to scroll the mouse wheel.'),
            holdKeys: zod_1.z
                .array(zod_1.z.string())
                .optional()
                .describe('Optional array of keys to hold during the scroll.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "scroll", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_type_keys',
        description: `Simulates typing a sequence of keys, often used for shortcuts involving modifier keys (e.g., Ctrl+C). Presses and releases each key in order.
    
────────────────────────
VALID KEYS
────────────────────────
A, Add, AudioForward, AudioMute, AudioNext, AudioPause, AudioPlay, AudioPrev, AudioRandom, AudioRepeat, AudioRewind, AudioStop, AudioVolDown, AudioVolUp,  
B, Backslash, Backspace,  
C, CapsLock, Clear, Comma,  
D, Decimal, Delete, Divide, Down,  
E, End, Enter, Equal, Escape, F,  
F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18, F19, F20, F21, F22, F23, F24,  
Fn,  
G, Grave,  
H, Home,  
I, Insert,  
J, K, L, Left, LeftAlt, LeftBracket, LeftCmd, LeftControl, LeftShift, LeftSuper, LeftWin,  
M, Menu, Minus, Multiply,  
N, Num0, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9, NumLock,  
NumPad0, NumPad1, NumPad2, NumPad3, NumPad4, NumPad5, NumPad6, NumPad7, NumPad8, NumPad9,  
O, P, PageDown, PageUp, Pause, Period, Print,  
Q, Quote,  
R, Return, Right, RightAlt, RightBracket, RightCmd, RightControl, RightShift, RightSuper, RightWin,  
S, ScrollLock, Semicolon, Slash, Space, Subtract,  
T, Tab,  
U, Up,  
V, W, X, Y, Z`,
        parameters: zod_1.z.object({
            keys: zod_1.z
                .array(zod_1.z.string())
                .describe('An array of key names to type in sequence (e.g., ["control", "c"]).'),
            delay: zod_1.z
                .number()
                .optional()
                .describe('Optional delay in milliseconds between key presses.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "typeKeys", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_press_keys',
        description: `Simulates pressing down or releasing specific keys. Useful for holding modifier keys.     
────────────────────────
VALID KEYS
────────────────────────
A, Add, AudioForward, AudioMute, AudioNext, AudioPause, AudioPlay, AudioPrev, AudioRandom, AudioRepeat, AudioRewind, AudioStop, AudioVolDown, AudioVolUp,  
B, Backslash, Backspace,  
C, CapsLock, Clear, Comma,  
D, Decimal, Delete, Divide, Down,  
E, End, Enter, Equal, Escape, F,  
F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18, F19, F20, F21, F22, F23, F24,  
Fn,  
G, Grave,  
H, Home,  
I, Insert,  
J, K, L, Left, LeftAlt, LeftBracket, LeftCmd, LeftControl, LeftShift, LeftSuper, LeftWin,  
M, Menu, Minus, Multiply,  
N, Num0, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9, NumLock,  
NumPad0, NumPad1, NumPad2, NumPad3, NumPad4, NumPad5, NumPad6, NumPad7, NumPad8, NumPad9,  
O, P, PageDown, PageUp, Pause, Period, Print,  
Q, Quote,  
R, Return, Right, RightAlt, RightBracket, RightCmd, RightControl, RightShift, RightSuper, RightWin,  
S, ScrollLock, Semicolon, Slash, Space, Subtract,  
T, Tab,  
U, Up,  
V, W, X, Y, Z  
      `,
        parameters: zod_1.z.object({
            keys: zod_1.z
                .array(zod_1.z.string())
                .describe('An array of key names to press or release (e.g., ["shift"]).'),
            press: zod_1.z
                .enum(['down', 'up'])
                .describe('Whether to press the keys down or release them up.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "pressKeys", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_type_text',
        description: 'Types a string of text character by character. Use this tool for strings less than 25 characters, or passwords/sensitive form fields.',
        parameters: zod_1.z.object({
            text: zod_1.z.string().describe('The text string to type.'),
            delay: zod_1.z
                .number()
                .optional()
                .describe('Optional delay in milliseconds between key presses.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "typeText", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_paste_text',
        description: 'Copies text to the clipboard and pastes it. Use this tool for typing long text strings or special characters not on the standard keyboard.',
        parameters: zod_1.z.object({
            text: zod_1.z.string().describe('The text string to paste.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "pasteText", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_wait',
        description: 'Pauses execution for a specified duration.',
        parameters: zod_1.z.object({
            duration: zod_1.z
                .number()
                .default(500)
                .describe('The duration to wait in milliseconds.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "wait", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_application',
        description: 'Opens or switches to the specified application and maximizes it.',
        parameters: zod_1.z.object({
            application: zod_1.z.enum([
                'firefox',
                '1password',
                'thunderbird',
                'vscode',
                'terminal',
                'desktop',
                'directory',
            ]),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "application", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_screenshot',
        description: 'Captures a screenshot of the current screen.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "screenshot", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_cursor_position',
        description: 'Gets the current (x, y) coordinates of the mouse cursor.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "cursorPosition", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_write_file',
        description: 'Writes a file to the specified path with base64 encoded data.',
        parameters: zod_1.z.object({
            path: zod_1.z
                .string()
                .describe('The file path where the file should be written.'),
            data: zod_1.z.string().describe('Base64 encoded file data to write.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "writeFile", null);
__decorate([
    (0, mcp_nest_1.Tool)({
        name: 'computer_read_file',
        description: 'Reads a file from the specified path and returns it as a document content block with base64 encoded data.',
        parameters: zod_1.z.object({
            path: zod_1.z.string().describe('The file path to read from.'),
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComputerUseTools.prototype, "readFile", null);
exports.ComputerUseTools = ComputerUseTools = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [computer_use_service_1.ComputerUseService])
], ComputerUseTools);
//# sourceMappingURL=computer-use.tools.js.map