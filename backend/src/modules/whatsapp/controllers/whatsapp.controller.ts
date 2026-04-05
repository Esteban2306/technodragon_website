import { Controller } from "@nestjs/common";
import { WhatsAppService } from "../application/services/whatsapp-message.service";

@Controller("whatsapp")
export class WhatsAppController {
    constructor() {private service: WhatsAppService}
}