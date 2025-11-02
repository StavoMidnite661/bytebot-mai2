import { ComputerUseService } from '../computer-use/computer-use.service';
export declare class ComputerUseTools {
    private readonly computerUse;
    constructor(computerUse: ComputerUseService);
    moveMouse({ coordinates }: {
        coordinates: {
            x: number;
            y: number;
        };
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    traceMouse({ path, holdKeys, }: {
        path: {
            x: number;
            y: number;
        }[];
        holdKeys?: string[];
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    clickMouse({ coordinates, button, holdKeys, clickCount, }: {
        coordinates?: {
            x: number;
            y: number;
        };
        button: 'left' | 'right' | 'middle';
        holdKeys?: string[];
        clickCount: number;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    pressMouse({ coordinates, button, press, }: {
        coordinates?: {
            x: number;
            y: number;
        };
        button: 'left' | 'right' | 'middle';
        press: 'down' | 'up';
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    dragMouse({ path, button, holdKeys, }: {
        path: {
            x: number;
            y: number;
        }[];
        button: 'left' | 'right' | 'middle';
        holdKeys?: string[];
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    scroll({ coordinates, direction, scrollCount, holdKeys, }: {
        coordinates?: {
            x: number;
            y: number;
        };
        direction: 'up' | 'down' | 'left' | 'right';
        scrollCount: number;
        holdKeys?: string[];
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    typeKeys({ keys, delay }: {
        keys: string[];
        delay?: number;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    pressKeys({ keys, press }: {
        keys: string[];
        press: 'down' | 'up';
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    typeText({ text, delay }: {
        text: string;
        delay?: number;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    pasteText({ text }: {
        text: string;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    wait({ duration }: {
        duration: number;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    application({ application, }: {
        application: 'firefox' | '1password' | 'thunderbird' | 'vscode' | 'terminal' | 'desktop' | 'directory';
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    screenshot(): Promise<{
        content: {
            type: string;
            data: string;
            mimeType: string;
        }[];
    } | {
        content: {
            type: string;
            text: string;
        }[];
    }>;
    cursorPosition(): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    writeFile({ path, data }: {
        path: string;
        data: string;
    }): Promise<{
        content: {
            type: string;
            text: any;
        }[];
    }>;
    readFile({ path }: {
        path: string;
    }): Promise<{
        content: {
            type: string;
            source: {
                type: string;
                media_type: any;
                data: any;
            };
            name: any;
            size: any;
        }[];
    } | {
        content: {
            type: string;
            text: any;
        }[];
    }>;
}
