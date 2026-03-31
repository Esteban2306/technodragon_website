import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DomainEvent } from "./event.interface";
import { EventType } from "./event.types";

@Injectable()
export class EventBusService {
    private readonly logger = new Logger(EventBusService.name);

    constructor(private evetnEmitter: EventEmitter2) {}

    emit<T extends EventType>(event: DomainEvent<T>){
        this.logger.debug(`Emitting event: ${event.name} at ${event.occurredAt.toISOString()}`)

        this.evetnEmitter.emit(event.name, event.payload)
    }

    async emitAsync<T extends EventType>(event: DomainEvent<T>){
        this.logger.debug(`Async event emitted: ${event.name}`)

        await this.evetnEmitter.emitAsync(event.name, event.payload)
    }
}