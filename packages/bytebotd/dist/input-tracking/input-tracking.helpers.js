"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyInfoMap = void 0;
const uiohook_napi_1 = require("uiohook-napi");
exports.keyInfoMap = {
    [uiohook_napi_1.UiohookKey.Backspace]: {
        name: 'Backspace',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Tab]: {
        name: 'Tab',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Enter]: {
        name: 'Enter',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.CapsLock]: {
        name: 'CapsLock',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Escape]: {
        name: 'Escape',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Space]: {
        name: 'Space',
        isPrintable: true,
        string: ' ',
        shiftString: ' ',
    },
    [uiohook_napi_1.UiohookKey.PageUp]: {
        name: 'PageUp',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.PageDown]: {
        name: 'PageDown',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.End]: {
        name: 'End',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Home]: {
        name: 'Home',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.ArrowLeft]: {
        name: 'Left',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.ArrowUp]: {
        name: 'Up',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.ArrowRight]: {
        name: 'Right',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.ArrowDown]: {
        name: 'Down',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Insert]: {
        name: 'Insert',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Delete]: {
        name: 'Delete',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Numpad0]: {
        name: 'Numpad0',
        isPrintable: true,
        string: '0',
        shiftString: '0',
    },
    [uiohook_napi_1.UiohookKey.Numpad1]: {
        name: 'Numpad1',
        isPrintable: true,
        string: '1',
        shiftString: '1',
    },
    [uiohook_napi_1.UiohookKey.Numpad2]: {
        name: 'Numpad2',
        isPrintable: true,
        string: '2',
        shiftString: '2',
    },
    [uiohook_napi_1.UiohookKey.Numpad3]: {
        name: 'Numpad3',
        isPrintable: true,
        string: '3',
        shiftString: '3',
    },
    [uiohook_napi_1.UiohookKey.Numpad4]: {
        name: 'Numpad4',
        isPrintable: true,
        string: '4',
        shiftString: '4',
    },
    [uiohook_napi_1.UiohookKey.Numpad5]: {
        name: 'Numpad5',
        isPrintable: true,
        string: '5',
        shiftString: '5',
    },
    [uiohook_napi_1.UiohookKey.Numpad6]: {
        name: 'Numpad6',
        isPrintable: true,
        string: '6',
        shiftString: '6',
    },
    [uiohook_napi_1.UiohookKey.Numpad7]: {
        name: 'Numpad7',
        isPrintable: true,
        string: '7',
        shiftString: '7',
    },
    [uiohook_napi_1.UiohookKey.Numpad8]: {
        name: 'Numpad8',
        isPrintable: true,
        string: '8',
        shiftString: '8',
    },
    [uiohook_napi_1.UiohookKey.Numpad9]: {
        name: 'Numpad9',
        isPrintable: true,
        string: '9',
        shiftString: '9',
    },
    [uiohook_napi_1.UiohookKey.NumpadMultiply]: {
        name: 'Multiply',
        isPrintable: true,
        string: '*',
        shiftString: '*',
    },
    [uiohook_napi_1.UiohookKey.NumpadAdd]: {
        name: 'Add',
        isPrintable: true,
        string: '+',
        shiftString: '+',
    },
    [uiohook_napi_1.UiohookKey.NumpadSubtract]: {
        name: 'Subtract',
        isPrintable: true,
        string: '-',
        shiftString: '-',
    },
    [uiohook_napi_1.UiohookKey.NumpadDivide]: {
        name: 'Divide',
        isPrintable: true,
        string: '/',
        shiftString: '/',
    },
    [uiohook_napi_1.UiohookKey.NumpadDecimal]: {
        name: 'Decimal',
        isPrintable: true,
        string: '.',
        shiftString: '.',
    },
    [uiohook_napi_1.UiohookKey.NumpadEnter]: {
        name: 'Enter',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadEnd]: {
        name: 'End',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadArrowDown]: {
        name: 'Down',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadArrowLeft]: {
        name: 'Left',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadArrowRight]: {
        name: 'Right',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadArrowUp]: {
        name: 'Up',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadPageDown]: {
        name: 'PageDown',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadPageUp]: {
        name: 'PageUp',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadInsert]: {
        name: 'Insert',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumpadDelete]: {
        name: 'Delete',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F1]: {
        name: 'F1',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F2]: {
        name: 'F2',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F3]: {
        name: 'F3',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F4]: {
        name: 'F4',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F5]: {
        name: 'F5',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F6]: {
        name: 'F6',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F7]: {
        name: 'F7',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F8]: {
        name: 'F8',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F9]: {
        name: 'F9',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F10]: {
        name: 'F10',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F11]: {
        name: 'F11',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F12]: {
        name: 'F12',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F13]: {
        name: 'F13',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F14]: {
        name: 'F14',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F15]: {
        name: 'F15',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F16]: {
        name: 'F16',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F17]: {
        name: 'F17',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F18]: {
        name: 'F18',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F19]: {
        name: 'F19',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F20]: {
        name: 'F20',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F21]: {
        name: 'F21',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F22]: {
        name: 'F22',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F23]: {
        name: 'F23',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.F24]: {
        name: 'F24',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Semicolon]: {
        name: 'Semicolon',
        isPrintable: true,
        string: ';',
        shiftString: ':',
    },
    [uiohook_napi_1.UiohookKey.Equal]: {
        name: 'Equal',
        isPrintable: true,
        string: '=',
        shiftString: '+',
    },
    [uiohook_napi_1.UiohookKey.Comma]: {
        name: 'Comma',
        isPrintable: true,
        string: ',',
        shiftString: '"',
    },
    [uiohook_napi_1.UiohookKey.Minus]: {
        name: 'Minus',
        isPrintable: true,
        string: '-',
        shiftString: '_',
    },
    [uiohook_napi_1.UiohookKey.Period]: {
        name: 'Period',
        isPrintable: true,
        string: '.',
        shiftString: '>',
    },
    [uiohook_napi_1.UiohookKey.Slash]: {
        name: 'Slash',
        isPrintable: true,
        string: '/',
        shiftString: '?',
    },
    [uiohook_napi_1.UiohookKey.Backquote]: {
        name: 'Grave',
        isPrintable: true,
        string: '`',
        shiftString: '~',
    },
    [uiohook_napi_1.UiohookKey.BracketLeft]: {
        name: 'LeftBracket',
        isPrintable: true,
        string: '[',
        shiftString: '{',
    },
    [uiohook_napi_1.UiohookKey.BracketRight]: {
        name: 'RightBracket',
        isPrintable: true,
        string: ']',
        shiftString: '}',
    },
    [uiohook_napi_1.UiohookKey.Backslash]: {
        name: 'Backslash',
        isPrintable: true,
        string: '\\',
        shiftString: '|',
    },
    [uiohook_napi_1.UiohookKey.Quote]: {
        name: 'Quote',
        isPrintable: true,
        string: "'",
        shiftString: '"',
    },
    [uiohook_napi_1.UiohookKey.Ctrl]: {
        name: 'LeftControl',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.CtrlRight]: {
        name: 'RightControl',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Shift]: {
        name: 'LeftShift',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.ShiftRight]: {
        name: 'RightShift',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Alt]: {
        name: 'LeftAlt',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.AltRight]: {
        name: 'RightAlt',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.Meta]: {
        name: 'LeftMeta',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.MetaRight]: {
        name: 'RightMeta',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.NumLock]: {
        name: 'NumLock',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.ScrollLock]: {
        name: 'ScrollLock',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.PrintScreen]: {
        name: 'Print',
        isPrintable: false,
    },
    [uiohook_napi_1.UiohookKey.A]: {
        name: 'A',
        isPrintable: true,
        string: 'a',
        shiftString: 'A',
    },
    [uiohook_napi_1.UiohookKey.B]: {
        name: 'B',
        isPrintable: true,
        string: 'b',
        shiftString: 'B',
    },
    [uiohook_napi_1.UiohookKey.C]: {
        name: 'C',
        isPrintable: true,
        string: 'c',
        shiftString: 'C',
    },
    [uiohook_napi_1.UiohookKey.D]: {
        name: 'D',
        isPrintable: true,
        string: 'd',
        shiftString: 'D',
    },
    [uiohook_napi_1.UiohookKey.E]: {
        name: 'E',
        isPrintable: true,
        string: 'e',
        shiftString: 'E',
    },
    [uiohook_napi_1.UiohookKey.F]: {
        name: 'F',
        isPrintable: true,
        string: 'f',
        shiftString: 'F',
    },
    [uiohook_napi_1.UiohookKey.G]: {
        name: 'G',
        isPrintable: true,
        string: 'g',
        shiftString: 'G',
    },
    [uiohook_napi_1.UiohookKey.H]: {
        name: 'H',
        isPrintable: true,
        string: 'h',
        shiftString: 'H',
    },
    [uiohook_napi_1.UiohookKey.I]: {
        name: 'I',
        isPrintable: true,
        string: 'i',
        shiftString: 'I',
    },
    [uiohook_napi_1.UiohookKey.J]: {
        name: 'J',
        isPrintable: true,
        string: 'j',
        shiftString: 'J',
    },
    [uiohook_napi_1.UiohookKey.K]: {
        name: 'K',
        isPrintable: true,
        string: 'k',
        shiftString: 'K',
    },
    [uiohook_napi_1.UiohookKey.L]: {
        name: 'L',
        isPrintable: true,
        string: 'l',
        shiftString: 'L',
    },
    [uiohook_napi_1.UiohookKey.M]: {
        name: 'M',
        isPrintable: true,
        string: 'm',
        shiftString: 'M',
    },
    [uiohook_napi_1.UiohookKey.N]: {
        name: 'N',
        isPrintable: true,
        string: 'n',
        shiftString: 'N',
    },
    [uiohook_napi_1.UiohookKey.O]: {
        name: 'O',
        isPrintable: true,
        string: 'o',
        shiftString: 'O',
    },
    [uiohook_napi_1.UiohookKey.P]: {
        name: 'P',
        isPrintable: true,
        string: 'p',
        shiftString: 'P',
    },
    [uiohook_napi_1.UiohookKey.Q]: {
        name: 'Q',
        isPrintable: true,
        string: 'q',
        shiftString: 'Q',
    },
    [uiohook_napi_1.UiohookKey.R]: {
        name: 'R',
        isPrintable: true,
        string: 'r',
        shiftString: 'R',
    },
    [uiohook_napi_1.UiohookKey.S]: {
        name: 'S',
        isPrintable: true,
        string: 's',
        shiftString: 'S',
    },
    [uiohook_napi_1.UiohookKey.T]: {
        name: 'T',
        isPrintable: true,
        string: 't',
        shiftString: 'T',
    },
    [uiohook_napi_1.UiohookKey.U]: {
        name: 'U',
        isPrintable: true,
        string: 'u',
        shiftString: 'U',
    },
    [uiohook_napi_1.UiohookKey.V]: {
        name: 'V',
        isPrintable: true,
        string: 'v',
        shiftString: 'V',
    },
    [uiohook_napi_1.UiohookKey.W]: {
        name: 'W',
        isPrintable: true,
        string: 'w',
        shiftString: 'W',
    },
    [uiohook_napi_1.UiohookKey.X]: {
        name: 'X',
        isPrintable: true,
        string: 'x',
        shiftString: 'X',
    },
    [uiohook_napi_1.UiohookKey.Y]: {
        name: 'Y',
        isPrintable: true,
        string: 'y',
        shiftString: 'Y',
    },
    [uiohook_napi_1.UiohookKey.Z]: {
        name: 'Z',
        isPrintable: true,
        string: 'z',
        shiftString: 'Z',
    },
    [uiohook_napi_1.UiohookKey[0]]: {
        name: '0',
        isPrintable: true,
        string: '0',
        shiftString: ')',
    },
    [uiohook_napi_1.UiohookKey[1]]: {
        name: '1',
        isPrintable: true,
        string: '1',
        shiftString: '!',
    },
    [uiohook_napi_1.UiohookKey[2]]: {
        name: '2',
        isPrintable: true,
        string: '2',
        shiftString: '@',
    },
    [uiohook_napi_1.UiohookKey[3]]: {
        name: '3',
        isPrintable: true,
        string: '3',
        shiftString: '#',
    },
    [uiohook_napi_1.UiohookKey[4]]: {
        name: '4',
        isPrintable: true,
        string: '4',
        shiftString: '$',
    },
    [uiohook_napi_1.UiohookKey[5]]: {
        name: '5',
        isPrintable: true,
        string: '5',
        shiftString: '%',
    },
    [uiohook_napi_1.UiohookKey[6]]: {
        name: '6',
        isPrintable: true,
        string: '6',
        shiftString: '^',
    },
    [uiohook_napi_1.UiohookKey[7]]: {
        name: '7',
        isPrintable: true,
        string: '7',
        shiftString: '&',
    },
    [uiohook_napi_1.UiohookKey[8]]: {
        name: '8',
        isPrintable: true,
        string: '8',
        shiftString: '*',
    },
    [uiohook_napi_1.UiohookKey[9]]: {
        name: '9',
        isPrintable: true,
        string: '9',
        shiftString: '(',
    },
    [133]: {
        name: 'LeftSuper',
        isPrintable: false,
    },
    [134]: {
        name: 'RightSuper',
        isPrintable: false,
    },
    [0]: {
        name: 'Alt',
        isPrintable: false,
    },
};
//# sourceMappingURL=input-tracking.helpers.js.map