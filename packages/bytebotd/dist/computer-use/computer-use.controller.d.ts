import { ComputerUseService } from './computer-use.service';
import { ComputerActionDto } from './dto/computer-action.dto';
export declare class ComputerUseController {
    private readonly computerUseService;
    private readonly logger;
    constructor(computerUseService: ComputerUseService);
    action(params: ComputerActionDto): Promise<any>;
}
