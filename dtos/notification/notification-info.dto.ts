import { NotificationMessageTypeEnum } from "../../enums/notification/notification-message-type.enum";
import { InfoDto } from "../info.dto";

export class NotificationInfoDto extends InfoDto {
    type: NotificationMessageTypeEnum;
}
