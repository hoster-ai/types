# ProductInfoResponseDto

**Description:** Represents the response containing product information. This DTO extends the `BaseResponse` and includes the detailed product information.

**Source:** `dtos/product/responses/product-info-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { BaseResponse } from '../../base-response.dto';
import { ProductInfoDto } from '../product-info.dto';

/**
 * Represents the response containing product information.
 * This DTO extends the `BaseResponse` and includes the detailed product information.
 */
export class ProductInfoResponseDto extends BaseResponse {
  /**
   * The detailed information of the product.
   * This object contains all the attributes and settings of the product.
   */
  info!: ProductInfoDto;
}
```

