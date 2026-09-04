import 'reflect-metadata';
import { validateProxyActionTaskDto } from './proxy-action-task-validator';

const TASK = {
  outboxId: '66d0a1b2c3d4e5f6a7b8c9d0',
  integrationUrl: 'https://provider.example.com/item/create',
  integrationToken: 'eyJhbGciOiJIUzI1NiJ9.e30.abc',
  hookUrl: 'http://localhost:3000/actions/hooks/internal/create',
  deadLetterQueue: 'outbox-actions-dead-letter',
  payload: { itemData: { itemId: '66d0a1b2c3d4e5f6a7b8c9d1' } },
};

const messages = async (body: Record<string, unknown>): Promise<string[]> =>
  (await validateProxyActionTaskDto(body)).map((e) => e.property);

describe('validateProxyActionTaskDto', () => {
  it('accepts a complete task', async () => {
    expect(await messages(TASK)).toEqual([]);
  });

  it('rejects a task missing any field — the proxy holds no state to fill the gap', async () => {
    for (const field of Object.keys(TASK)) {
      const body = Object.fromEntries(
        Object.entries(TASK).filter(([key]) => key !== field),
      );
      expect(await messages(body)).toEqual([field]);
    }
  });

  it('rejects urls that are not absolute, a malformed outboxId and a non-object payload', async () => {
    const errors = await messages({
      ...TASK,
      outboxId: 'not-an-object-id',
      integrationUrl: 'provider.example.com/item/create',
      hookUrl: 'javascript:alert(1)',
      payload: 'text',
    });
    expect(errors.sort()).toEqual([
      'hookUrl',
      'integrationUrl',
      'outboxId',
      'payload',
    ]);
  });
});
