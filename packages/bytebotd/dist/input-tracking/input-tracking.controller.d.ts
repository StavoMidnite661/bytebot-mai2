import { InputTrackingService } from './input-tracking.service';
export declare class InputTrackingController {
    private readonly inputTrackingService;
    constructor(inputTrackingService: InputTrackingService);
    start(): {
        status: string;
    };
    stop(): {
        status: string;
    };
}
