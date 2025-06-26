import { IsString } from 'class-validator';

export class SuccessResponseDto {
  /**
   * The ID of the notification that was sent
   */
  @IsString()
  notificationId!: string;
}
