import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ComputerAction } from '@bytebot/shared';
export declare class InputTrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitAction(action: ComputerAction): void;
    emitScreenshotAndAction(screenshot: {
        image: string;
    }, action: ComputerAction): void;
}
