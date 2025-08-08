import 'reflect-metadata';
import { validate } from 'class-validator';
import { ActionDto } from '../dtos/action.dto';
import { OpenMethodEnum } from '../enums/open-method.enum';
import { AdminPanelMoreActionsDto } from '../dtos/admin-panel.dto';

const minimalValidActionDto = (): ActionDto => {
  const action = new ActionDto();
  action.icon = 'add';
  action.openMethod = OpenMethodEnum.AJAX_CALL;
  action.url = 'https://example.com/api';
  return action;
};

describe('AdminPanelMoreActionsDto', () => {
  it('fails when all keys are undefined', async () => {
    const dto = new AdminPanelMoreActionsDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('fails when all keys are empty arrays', async () => {
    const dto = new AdminPanelMoreActionsDto();
    dto.client = [];
    dto.item = [];
    dto.invoice = [];
    dto.user = [];
    dto.order = [];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes when one key has a non-empty array', async () => {
    const dto = new AdminPanelMoreActionsDto();
    dto.client = [minimalValidActionDto()];
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('passes when multiple keys have non-empty arrays', async () => {
    const dto = new AdminPanelMoreActionsDto();
    dto.client = [minimalValidActionDto()];
    dto.order = [minimalValidActionDto()];
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when a key has a non-array non-object value', async () => {
    const dto = new AdminPanelMoreActionsDto();
    // @ts-expect-error testing invalid value
    dto.client = 'invalid';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes when nested ActionDto is valid', async () => {
    const dto = new AdminPanelMoreActionsDto();
    dto.client = [minimalValidActionDto()];
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
