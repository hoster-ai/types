import { MessageTypeEnum } from "../../enums/message-type.enum";
import { InfoDto } from "../info.dto";

export class NotificationInfoDto extends InfoDto {
    type: MessageTypeEnum;
}
