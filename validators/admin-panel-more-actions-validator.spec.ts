import 'reflect-metadata';
import { validate } from 'class-validator';
import { ActionDto } from '../dtos/action.dto';
import { OpenMethodEnum } from '../enums/open-method.enum';
import { AdminPanelMoreActionsDto } from '../dtos/admin-panel.dto';
import { validateAdminPanelMoreActionsDto } from './admin-panel-more-actions.validator';

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

  it('fails when nested ActionDto is invalid', async () => {
    const dto = new AdminPanelMoreActionsDto();
    const invalidAction = minimalValidActionDto();
    // @ts-expect-error testing invalid value
    invalidAction.url = 123; // should be a string
    dto.client = [invalidAction];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('handles unexpected keys gracefully', async () => {
    const dto = new AdminPanelMoreActionsDto();
    dto.client = [minimalValidActionDto()];
    // @ts-expect-error testing unexpected key
    dto.unexpectedKey = 'unexpected';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when input object cannot be converted', async () => {
    const invalidData = {
      client: 'not-an-object',
    };
    const errors = validateAdminPanelMoreActionsDto(invalidData);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('validates complex nested structures', async () => {
    const complexData = {
      client: [{
        icon: 'add',
        openMethod: OpenMethodEnum.AJAX_CALL,
        url: 'https://example.com/api',
        nested: [{
          icon: 'nested-icon',
          openMethod: OpenMethodEnum.AJAX_CALL,
          url: 'https://example.com/nested'
        }]
      }]
    };
    const errors = validateAdminPanelMoreActionsDto(complexData);
    expect(errors.length).toBe(0);
  });

  it('handles edge cases with empty objects', async () => {
    const emptyData = {};
    const errors = validateAdminPanelMoreActionsDto(emptyData);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('fails when all properties are empty arrays', async () => {
    const data = {
      client: [],
      item: [],
      invoice: [],
      user: [],
      order: []
    };
    const errors = validateAdminPanelMoreActionsDto(data);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes with one non-empty property', async () => {
    const data = {
      client: [minimalValidActionDto()]
    };
    const errors = validateAdminPanelMoreActionsDto(data);
    expect(errors.length).toBe(0);
  });

  it('passes with multiple non-empty properties', async () => {
    const data = {
      client: [minimalValidActionDto()],
      item: [minimalValidActionDto()]
    };
    const errors = validateAdminPanelMoreActionsDto(data);
    expect(errors.length).toBe(0);
  });
});
