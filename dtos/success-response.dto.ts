import { IsString } from 'class-validator';

/**
 * DTO for a successful response.
 * Used to return the ID of a created resource.
 */
export class SuccessResponseDto {
  /**
   * The ID of the notification that was sent
   */
  @IsString()
  notificationId!: string;
}
