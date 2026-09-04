import 'reflect-metadata';
import { validateProductUpgradeResponseDto } from './product-upgrade-response-validator';
import { ResponseStatusEnum } from '../enums/response-status.enum';

const VALID = {
  code: 200,
  message: 'ok',
  status: ResponseStatusEnum.SUCCESS,
  outboxId: '66d0a1b2c3d4e5f6a7b8c9d0',
  itemId: 'item-123',
  data: { ip: '1.2.3.4' },
};

const omit = (
  body: Record<string, unknown>,
  ...keys: string[]
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(body).filter(([key]) => !keys.includes(key)),
  );

const messages = async (body: Record<string, unknown>): Promise<string[]> =>
  (await validateProductUpgradeResponseDto(body)).map((e) => e.property);

describe('validateProductUpgradeResponseDto', () => {
  it('accepts a full success report', async () => {
    expect(await messages(VALID)).toEqual([]);
  });

  it('accepts a report without the optional itemId and data', async () => {
    const minimal = omit(VALID, 'itemId', 'data', '');
    expect(await messages(minimal)).toEqual([]);
  });

  it('rejects a report without status — nothing to settle on', async () => {
    const body = omit(VALID, 'status', '');
    expect(await messages(body)).toEqual(['status']);
  });

  it('rejects a report without outboxId — nothing to correlate on', async () => {
    const body = omit(VALID, 'outboxId', '');
    expect(await messages(body)).toEqual(['outboxId']);
  });

  it('rejects a status outside the enum, a non-string outboxId and item id, and non-object data', async () => {
    const errors = await messages({
      ...VALID,
      status: 123,
      outboxId: null,
      itemId: {},
      data: 'text',
    });
    expect(errors.sort()).toEqual(['data', 'itemId', 'outboxId', 'status']);
  });

  it('still requires the base response fields', async () => {
    const body = omit(VALID, 'code', 'message', '');
    expect((await messages(body)).sort()).toEqual(['code', 'message']);
  });
});
