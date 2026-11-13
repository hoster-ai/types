import 'reflect-metadata';
import { validateProductRenewResponseDto } from './product-renew-response-validator';
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
  (await validateProductRenewResponseDto(body)).map((e) => e.property);

describe('validateProductRenewResponseDto', () => {
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

  it('accepts an ISO 8601 endDate, as a date-time or a plain date', async () => {
    expect(
      await messages({ ...VALID, endDate: '2027-11-13T10:00:00.000Z' }),
    ).toEqual([]);
    expect(await messages({ ...VALID, endDate: '2027-11-13' })).toEqual([]);
  });

  it('rejects an endDate for a day that does not exist', async () => {
    expect(await messages({ ...VALID, endDate: '2027-02-31' })).toEqual([
      'endDate',
    ]);
  });

  it('accepts a date-time with a numeric offset', async () => {
    expect(
      await messages({ ...VALID, endDate: '2027-11-13T10:00:00+02:00' }),
    ).toEqual([]);
  });

  it.each(['20271113', '2027-W46-3', '2027', '2027-11-13T10:00:00'])(
    'rejects %s, an ISO 8601 form outside RFC 3339',
    async (endDate) => {
      expect(await messages({ ...VALID, endDate })).toEqual(['endDate']);
    },
  );

  it('rejects an endDate that is not an ISO 8601 string', async () => {
    expect(await messages({ ...VALID, endDate: 'next year' })).toEqual([
      'endDate',
    ]);
    expect(await messages({ ...VALID, endDate: 1794564000000 })).toEqual([
      'endDate',
    ]);
  });
});
