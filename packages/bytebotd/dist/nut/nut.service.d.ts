export declare class NutService {
    private readonly logger;
    private screenshotDir;
    constructor();
    sendKeys(keys: string[], delay?: number): Promise<any>;
    holdKeys(keys: string[], down: boolean): Promise<any>;
    private validateKey;
    typeText(text: string, delayMs?: number): Promise<void>;
    pasteText(text: string): Promise<void>;
    private charToKeyInfo;
    mouseMoveEvent({ x, y }: {
        x: number;
        y: number;
    }): Promise<any>;
    mouseClickEvent(button: 'left' | 'right' | 'middle'): Promise<any>;
    mouseButtonEvent(button: 'left' | 'right' | 'middle', pressed: boolean): Promise<any>;
    mouseWheelEvent(direction: 'right' | 'left' | 'up' | 'down', amount: number): Promise<any>;
    screendump(): Promise<Buffer>;
    getCursorPosition(): Promise<{
        x: number;
        y: number;
    }>;
    private delay;
}
