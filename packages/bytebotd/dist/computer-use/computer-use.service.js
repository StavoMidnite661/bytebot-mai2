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
var ComputerUseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerUseService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = require("fs/promises");
const path = require("path");
const nut_service_1 = require("../nut/nut.service");
let ComputerUseService = ComputerUseService_1 = class ComputerUseService {
    constructor(nutService) {
        this.nutService = nutService;
        this.logger = new common_1.Logger(ComputerUseService_1.name);
    }
    async action(params) {
        this.logger.log(`Executing computer action: ${params.action}`);
        switch (params.action) {
            case 'move_mouse': {
                await this.moveMouse(params);
                break;
            }
            case 'trace_mouse': {
                await this.traceMouse(params);
                break;
            }
            case 'click_mouse': {
                await this.clickMouse(params);
                break;
            }
            case 'press_mouse': {
                await this.pressMouse(params);
                break;
            }
            case 'drag_mouse': {
                await this.dragMouse(params);
                break;
            }
            case 'scroll': {
                await this.scroll(params);
                break;
            }
            case 'type_keys': {
                await this.typeKeys(params);
                break;
            }
            case 'press_keys': {
                await this.pressKeys(params);
                break;
            }
            case 'type_text': {
                await this.typeText(params);
                break;
            }
            case 'paste_text': {
                await this.pasteText(params);
                break;
            }
            case 'wait': {
                const waitParams = params;
                await this.delay(waitParams.duration);
                break;
            }
            case 'screenshot':
                return this.screenshot();
            case 'cursor_position':
                return this.cursor_position();
            case 'application': {
                await this.application(params);
                break;
            }
            case 'write_file': {
                return this.writeFile(params);
            }
            case 'read_file': {
                return this.readFile(params);
            }
            default:
                throw new Error(`Unsupported computer action: ${params.action}`);
        }
    }
    async moveMouse(action) {
        await this.nutService.mouseMoveEvent(action.coordinates);
    }
    async traceMouse(action) {
        const { path, holdKeys } = action;
        await this.nutService.mouseMoveEvent(path[0]);
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, true);
        }
        for (const coordinates of path) {
            await this.nutService.mouseMoveEvent(coordinates);
        }
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, false);
        }
    }
    async clickMouse(action) {
        const { coordinates, button, holdKeys, clickCount } = action;
        if (coordinates) {
            await this.nutService.mouseMoveEvent(coordinates);
        }
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, true);
        }
        if (clickCount > 1) {
            for (let i = 0; i < clickCount; i++) {
                await this.nutService.mouseClickEvent(button);
                await this.delay(150);
            }
        }
        else {
            await this.nutService.mouseClickEvent(button);
        }
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, false);
        }
    }
    async pressMouse(action) {
        const { coordinates, button, press } = action;
        if (coordinates) {
            await this.nutService.mouseMoveEvent(coordinates);
        }
        if (press === 'down') {
            await this.nutService.mouseButtonEvent(button, true);
        }
        else {
            await this.nutService.mouseButtonEvent(button, false);
        }
    }
    async dragMouse(action) {
        const { path, button, holdKeys } = action;
        await this.nutService.mouseMoveEvent(path[0]);
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, true);
        }
        await this.nutService.mouseButtonEvent(button, true);
        for (const coordinates of path) {
            await this.nutService.mouseMoveEvent(coordinates);
        }
        await this.nutService.mouseButtonEvent(button, false);
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, false);
        }
    }
    async scroll(action) {
        const { coordinates, direction, scrollCount, holdKeys } = action;
        if (coordinates) {
            await this.nutService.mouseMoveEvent(coordinates);
        }
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, true);
        }
        for (let i = 0; i < scrollCount; i++) {
            await this.nutService.mouseWheelEvent(direction, 1);
            await new Promise((resolve) => setTimeout(resolve, 150));
        }
        if (holdKeys) {
            await this.nutService.holdKeys(holdKeys, false);
        }
    }
    async typeKeys(action) {
        const { keys, delay } = action;
        await this.nutService.sendKeys(keys, delay);
    }
    async pressKeys(action) {
        const { keys, press } = action;
        await this.nutService.holdKeys(keys, press === 'down');
    }
    async typeText(action) {
        const { text, delay } = action;
        await this.nutService.typeText(text, delay);
    }
    async pasteText(action) {
        const { text } = action;
        await this.nutService.pasteText(text);
    }
    async delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async screenshot() {
        this.logger.log(`Taking screenshot`);
        const buffer = await this.nutService.screendump();
        return { image: `${buffer.toString('base64')}` };
    }
    async cursor_position() {
        this.logger.log(`Getting cursor position`);
        return await this.nutService.getCursorPosition();
    }
    async application(action) {
        const execAsync = (0, util_1.promisify)(child_process_1.exec);
        const spawnAndForget = (command, args, options = {}) => {
            const child = (0, child_process_1.spawn)(command, args, {
                env: { ...process.env, DISPLAY: ':0.0' },
                stdio: 'ignore',
                detached: true,
                ...options,
            });
            child.unref();
        };
        if (action.application === 'desktop') {
            spawnAndForget('sudo', ['-u', 'user', 'wmctrl', '-k', 'on']);
            return;
        }
        const commandMap = {
            firefox: 'firefox-esr',
            '1password': '1password',
            thunderbird: 'thunderbird',
            vscode: 'code',
            terminal: 'xfce4-terminal',
            directory: 'thunar',
        };
        const processMap = {
            firefox: 'Navigator.firefox-esr',
            '1password': '1password.1Password',
            thunderbird: 'Mail.thunderbird',
            vscode: 'code.Code',
            terminal: 'xfce4-terminal.Xfce4-Terminal',
            directory: 'Thunar',
            desktop: 'xfdesktop.Xfdesktop',
        };
        let appOpen = false;
        try {
            const { stdout } = await execAsync(`sudo -u user wmctrl -lx | grep ${processMap[action.application]}`, { timeout: 5000 });
            appOpen = stdout.trim().length > 0;
        }
        catch (error) {
            if (error.code !== 1 && !error.message?.includes('timeout')) {
                throw error;
            }
        }
        if (appOpen) {
            this.logger.log(`Application ${action.application} is already open`);
            spawnAndForget('sudo', [
                '-u',
                'user',
                'wmctrl',
                '-x',
                '-a',
                processMap[action.application],
            ]);
            spawnAndForget('sudo', [
                '-u',
                'user',
                'wmctrl',
                '-x',
                '-r',
                processMap[action.application],
                '-b',
                'add,maximized_vert,maximized_horz',
            ]);
            return;
        }
        spawnAndForget('sudo', [
            '-u',
            'user',
            'nohup',
            commandMap[action.application],
        ]);
        this.logger.log(`Application ${action.application} launched`);
        return;
    }
    async writeFile(action) {
        try {
            const execAsync = (0, util_1.promisify)(child_process_1.exec);
            const buffer = Buffer.from(action.data, 'base64');
            let targetPath = action.path;
            if (!path.isAbsolute(targetPath)) {
                targetPath = path.join('/home/user/Desktop', targetPath);
            }
            const dir = path.dirname(targetPath);
            try {
                await execAsync(`sudo mkdir -p "${dir}"`);
            }
            catch (error) {
                this.logger.debug(`Directory creation: ${error.message}`);
            }
            const tempFile = `/tmp/bytebot_temp_${Date.now()}_${Math.random().toString(36).substring(7)}`;
            await fs.writeFile(tempFile, buffer);
            try {
                await execAsync(`sudo cp "${tempFile}" "${targetPath}"`);
                await execAsync(`sudo chown user:user "${targetPath}"`);
                await execAsync(`sudo chmod 644 "${targetPath}"`);
                await fs.unlink(tempFile).catch(() => { });
            }
            catch (error) {
                await fs.unlink(tempFile).catch(() => { });
                throw error;
            }
            this.logger.log(`File written successfully to: ${targetPath}`);
            return {
                success: true,
                message: `File written successfully to: ${targetPath}`,
            };
        }
        catch (error) {
            this.logger.error(`Error writing file: ${error.message}`, error.stack);
            return {
                success: false,
                message: `Error writing file: ${error.message}`,
            };
        }
    }
    async readFile(action) {
        try {
            const execAsync = (0, util_1.promisify)(child_process_1.exec);
            let targetPath = action.path;
            if (!path.isAbsolute(targetPath)) {
                targetPath = path.join('/home/user/Desktop', targetPath);
            }
            const tempFile = `/tmp/bytebot_read_${Date.now()}_${Math.random().toString(36).substring(7)}`;
            try {
                await execAsync(`sudo cp "${targetPath}" "${tempFile}"`);
                await execAsync(`sudo chmod 644 "${tempFile}"`);
                const buffer = await fs.readFile(tempFile);
                const { stdout: statOutput } = await execAsync(`sudo stat -c "%s" "${targetPath}"`);
                const fileSize = parseInt(statOutput.trim(), 10);
                await fs.unlink(tempFile).catch(() => { });
                const base64Data = buffer.toString('base64');
                const fileName = path.basename(targetPath);
                const ext = path.extname(targetPath).toLowerCase().slice(1);
                const mimeTypes = {
                    pdf: 'application/pdf',
                    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    doc: 'application/msword',
                    txt: 'text/plain',
                    html: 'text/html',
                    json: 'application/json',
                    xml: 'text/xml',
                    csv: 'text/csv',
                    rtf: 'application/rtf',
                    odt: 'application/vnd.oasis.opendocument.text',
                    epub: 'application/epub+zip',
                    png: 'image/png',
                    jpg: 'image/jpeg',
                    jpeg: 'image/jpeg',
                    webp: 'image/webp',
                    gif: 'image/gif',
                    svg: 'image/svg+xml',
                };
                const mediaType = mimeTypes[ext] || 'application/octet-stream';
                this.logger.log(`File read successfully from: ${targetPath}`);
                return {
                    success: true,
                    data: base64Data,
                    name: fileName,
                    size: fileSize,
                    mediaType: mediaType,
                };
            }
            catch (error) {
                await fs.unlink(tempFile).catch(() => { });
                throw error;
            }
        }
        catch (error) {
            this.logger.error(`Error reading file: ${error.message}`, error.stack);
            return {
                success: false,
                message: `Error reading file: ${error.message}`,
            };
        }
    }
};
exports.ComputerUseService = ComputerUseService;
exports.ComputerUseService = ComputerUseService = ComputerUseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nut_service_1.NutService])
], ComputerUseService);
//# sourceMappingURL=computer-use.service.js.map