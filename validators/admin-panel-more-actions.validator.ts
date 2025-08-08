import { ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { AdminPanelMoreActionsDto } from "../dtos/admin-panel.dto";

export function validateAdminPanelMoreActionsDto(data: object): ValidationError[] {
  const dto = plainToInstance(AdminPanelMoreActionsDto, data);
  const errors = validateSync(dto);
  return errors;
}
