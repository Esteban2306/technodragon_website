import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventPayloadMap, EventTypes } from "src/infrastructure/events/event.types";

@Injectable()
export class CategoryListener {
    @OnEvent(EventTypes.CATEGORY_CREATED)
    handleCategoryCreated(payload: EventPayloadMap[typeof EventTypes.CATEGORY_CREATED]) {
        console.log("Category created:", payload);
    }

    @OnEvent(EventTypes.CATEGORY_UPDATED)
    handleCategoryUpdated(payload: EventPayloadMap[typeof EventTypes.CATEGORY_UPDATED]) {
        console.log("Category updated:", payload);
    }

    @OnEvent(EventTypes.CATEGORY_DELETED)
    handleCategoryDeleted(payload: EventPayloadMap[typeof EventTypes.CATEGORY_DELETED]) {
        console.log("Category deleted:", payload);
    }
}