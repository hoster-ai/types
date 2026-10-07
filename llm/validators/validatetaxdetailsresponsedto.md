# validateTaxDetailsResponseDto

**Description:** Validates a TaxDetailsResponseDto object, including the rules between vatRate, treatment, exemptionReason and vatNumberValid, with nothing skipped.

**Source:** `validators/tax-details-response-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TaxDetailsResponseDto } from '../dtos/invoice/responses/tax-details-response.dto';

/**
 * Validates a TaxDetailsResponseDto object using class-validator decorators.
 *
 * Nothing is skipped: the rules between `vatRate`, `treatment`,
 * `exemptionReason` and `vatNumberValid` hold for every consumer, whatever its
 * own validation options.
 *
 * @param data The object to validate as a TaxDetailsResponseDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTaxDetailsResponseDto(data: object): ValidationError[] {
  const dto = plainToInstance(TaxDetailsResponseDto, data);
  const errors = validateSync(dto);

  return errors;
}
```
