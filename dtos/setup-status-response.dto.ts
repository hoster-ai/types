import { SetupStatusEnum } from "../enums/setup-status.enum";
import { BaseResponse } from "./base-response.dto";

export class SetupStatusResponseDto extends BaseResponse {
    /**
     * The current setup status of the application.
     * Corresponds to the values defined in SetupStatusEnum.
     */
    status: SetupStatusEnum;
}