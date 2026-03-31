import { EventType, EventPayloadMap } from "./event.types";

export interface DomainEvent<T extends EventType & keyof EventPayloadMap> {
    name: string;
    occurredAt: Date;
    payload: EventPayloadMap[T]
}