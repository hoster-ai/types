import { SuccessResponseDto } from "../../success-response.dto";

export class NotificationSendResponseDto extends SuccessResponseDto {

    notificationId!: string;
}