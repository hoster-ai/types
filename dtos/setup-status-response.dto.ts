import { SetupStatusEnum } from "../enums/setup-status.enum";
import { BaseResponse } from "./base-response.dto";

export class SetupStatusResponseDto extends BaseResponse {
    status: SetupStatusEnum;
}