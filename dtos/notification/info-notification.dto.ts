import { MessageTypeEnum } from "../../enums/message-type.enum";
import { InfoDto } from "../info.dto";

export class InfoNotificationDto extends InfoDto {
    type: MessageTypeEnum;
}
