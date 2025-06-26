import { IsString } from 'class-validator';

export class TaskResponseDto {
  /**
   * The ID of the task that was created
   */
  @IsString()
  taskId!: string;
}
