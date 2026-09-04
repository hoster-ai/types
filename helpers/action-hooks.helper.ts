import { ProductActionsEnum } from '../enums/item-actions.enum';
import { InvoiceTypesEnum } from '../enums/invoice/invoice-types.enum';

/**
 * Where an ACTION's outcome is reported back to the core, relative to the core's host.
 *
 * - `/actions/hooks/{action}`: PUBLIC, well-known route the INTEGRATION posts its deferred
 *   report to — it needs no url from the core, only the host.
 * - `/actions/hooks/internal/{action}`: the route the PROXY WORKER reports on, behind the
 *   shared proxy secret.
 *
 * `{action}` is the contract action in lower case (`ProductActionsEnum` for items, the
 * issued document type for invoices).
 */
export const ACTION_HOOKS_PATH = '/actions/hooks';
export const ACTION_PROXY_HOOKS_PATH = '/actions/hooks/internal';

/** The hook route segment of a contract action: the action, lower-cased. */
export const actionHookSegment = (action: string): string =>
  action.toLowerCase();

/** `/actions/hooks/{action}` — where the integration reports. */
export const actionHookPath = (action: string): string =>
  `${ACTION_HOOKS_PATH}/${actionHookSegment(action)}`;

/** `/actions/hooks/internal/{action}` — where the proxy reports. */
export const actionProxyHookPath = (action: string): string =>
  `${ACTION_PROXY_HOOKS_PATH}/${actionHookSegment(action)}`;

/** The public hook route of every product action: `/actions/hooks/create`, … */
export const PRODUCT_ACTION_HOOK_PATHS: Record<ProductActionsEnum, string> =
  Object.fromEntries(
    Object.values(ProductActionsEnum).map((action) => [
      action,
      actionHookPath(action),
    ]),
  ) as Record<ProductActionsEnum, string>;

/** The public hook route of every issued document type: `/actions/hooks/proforma`, … */
export const INVOICE_ACTION_HOOK_PATHS: Record<InvoiceTypesEnum, string> =
  Object.fromEntries(
    Object.values(InvoiceTypesEnum).map((type) => [type, actionHookPath(type)]),
  ) as Record<InvoiceTypesEnum, string>;
