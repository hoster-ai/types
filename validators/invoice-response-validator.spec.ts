import 'reflect-metadata';
import { validateInvoiceResponseDto } from './invoice-response-validator';
import { ResponseStatusEnum } from '../enums/response-status.enum';

const ISSUED = {
  code: 200,
  message: 'ok',
  status: ResponseStatusEnum.SUCCESS,
  outboxId: '66d0a1b2c3d4e5f6a7b8c9d0',
  invoiceUrl: 'https://invoices.example.com/doc-1.pdf',
  invoiceNumber: 'INV-2026-0001',
  invoiceId: 'ext-abc-123',
};

const omit = (
  body: Record<string, unknown>,
  ...keys: string[]
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(body).filter(([key]) => !keys.includes(key)),
  );

const messages = async (body: Record<string, unknown>): Promise<string[]> =>
  (await validateInvoiceResponseDto(body)).map((e) => e.property);

describe('validateInvoiceResponseDto', () => {
  it('accepts an issued document', async () => {
    expect(await messages(ISSUED)).toEqual([]);
  });

  it.each([ResponseStatusEnum.FAILURE, ResponseStatusEnum.PENDING])(
    'accepts a %s report without any document fields — there is no document to describe',
    async (status) => {
      expect(
        await messages({
          code: 200,
          message: 'not issued',
          status,
          outboxId: ISSUED.outboxId,
        }),
      ).toEqual([]);
    },
  );

  it('rejects a success without the document fields', async () => {
    const body = omit(ISSUED, 'invoiceUrl', 'invoiceNumber', 'invoiceId');
    expect((await messages(body)).sort()).toEqual([
      'invoiceId',
      'invoiceNumber',
      'invoiceUrl',
    ]);
  });

  it('rejects a report without status or outboxId — nothing to settle or correlate on', async () => {
    const body = omit(ISSUED, 'status', 'outboxId', '');
    expect((await messages(body)).sort()).toEqual(['outboxId', 'status']);
  });

  it('rejects a status outside the enum and a document url that is not a url', async () => {
    expect((await messages({ ...ISSUED, status: 'done' })).sort()).toEqual([
      'status',
    ]);
    expect(await messages({ ...ISSUED, invoiceUrl: 'not a url' })).toEqual([
      'invoiceUrl',
    ]);
  });
});
