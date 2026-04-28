import { EventEmitter2 } from "@nestjs/event-emitter";
import { DomainEvent } from "./event.interface";
import { EventType } from "./event.types";
export declare class EventBusService {
    private evetnEmitter;
    private readonly logger;
    constructor(evetnEmitter: EventEmitter2);
    emit<T extends EventType>(event: DomainEvent<T>): void;
    emitAsync<T extends EventType>(event: DomainEvent<T>): Promise<void>;
}
