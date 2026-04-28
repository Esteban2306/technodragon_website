import { EventPayloadMap, EventTypes } from "src/infrastructure/events/event.types";
export declare class CategoryListener {
    handleCategoryCreated(payload: EventPayloadMap[typeof EventTypes.CATEGORY_CREATED]): void;
    handleCategoryUpdated(payload: EventPayloadMap[typeof EventTypes.CATEGORY_UPDATED]): void;
    handleCategoryDeleted(payload: EventPayloadMap[typeof EventTypes.CATEGORY_DELETED]): void;
}
