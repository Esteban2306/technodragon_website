"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventBusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let EventBusService = EventBusService_1 = class EventBusService {
    evetnEmitter;
    logger = new common_1.Logger(EventBusService_1.name);
    constructor(evetnEmitter) {
        this.evetnEmitter = evetnEmitter;
    }
    emit(event) {
        this.logger.debug(`Emitting event: ${event.name} at ${event.occurredAt.toISOString()}`);
        this.evetnEmitter.emit(event.name, event.payload);
    }
    async emitAsync(event) {
        this.logger.debug(`Async event emitted: ${event.name}`);
        await this.evetnEmitter.emitAsync(event.name, event.payload);
    }
};
exports.EventBusService = EventBusService;
exports.EventBusService = EventBusService = EventBusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], EventBusService);
//# sourceMappingURL=event-bus.service.js.map