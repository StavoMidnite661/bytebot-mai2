import { NutService } from '../nut/nut.service';
import { ComputerAction } from '@bytebot/shared';
export declare class ComputerUseService {
    private readonly nutService;
    private readonly logger;
    constructor(nutService: NutService);
    action(params: ComputerAction): Promise<any>;
    private moveMouse;
    private traceMouse;
    private clickMouse;
    private pressMouse;
    private dragMouse;
    private scroll;
    private typeKeys;
    private pressKeys;
    private typeText;
    private pasteText;
    private delay;
    screenshot(): Promise<{
        image: string;
    }>;
    private cursor_position;
    private application;
    private writeFile;
    private readFile;
}
