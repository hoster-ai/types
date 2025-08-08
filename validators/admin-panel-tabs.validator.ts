import { ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AdminPanelTabsDto } from "../dtos/admin-panel.dto";
import { validateSync } from "class-validator";

export function validateAdminPanelTabsDto(data: object): ValidationError[] {
  const dto = plainToInstance(AdminPanelTabsDto, data);
  const errors = validateSync(dto);
  return errors;
}
