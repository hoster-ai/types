import { JwtDto } from '../jwt.dto';
import { ProductInfoResponseDto } from './responses/product-info-response.dto';
import { ErrorResponseDto } from '../error-response.dto';
import { ProductCreateRequestDto } from './requests/product-create-request.dto';
import { ProductCreateResponseDto } from './responses/product-create-response.dto';
import { ProductRenewRequestDto } from './requests/product-renew-request.dto';
import { ProductRenewResponseDto } from './responses/product-renew-response.dto';
import { ProductUpgradeResponseDto } from './responses/product-upgrade-response.dto';
import { ProductUpgradeRequestDto } from './requests/product-upgrade-request.dto';
import { ProductDowngradeRequestDto } from './requests/product-downgrade-request.dto';
import { ProductSuspendRequestDto } from './requests/product-suspend-request.dto';
import { ProductUnsuspendRequestDto } from './requests/product-unsuspend-request.dto';
import { ProductUpgradableRequestDto } from './requests/product-upgradable-request.dto';
import { ProductDowngradableRequestDto } from './requests/product-downgradable-request.dto';
import { ProductDowngradeResponseDto } from './responses/product-downgrade-response.dto';
import { ProductUpgradableResponseDto } from './responses/product-upgradable-response.dto';
import { ProductSuspendResponseDto } from './responses/product-suspend-response.dto';
import { ProductUnsuspendResponseDto } from './responses/product-unsuspend-response.dto';
import { ProductDowngradableResponseDto } from './responses/product-downgradable-response.dto';
import { ProductDeleteResponseDto } from './responses/product-delete-response.dto';
import { ProductDeleteRequestDto } from './requests/product-delete-request.dto';
import { ProductValidateAttributesRequestDto } from './requests/product-validate-attributes-request.dto';
import { ProductValidateAttributesResponseDto } from './responses/product-validate-attributes-response.dto';
import { SetupStatusResponseDto } from '../setup-status-response.dto';
import { CompanyDataDto } from '../company-data.dto';

export interface ProductControllerInterface {
  info(request: Request & JwtDto): ProductInfoResponseDto | ErrorResponseDto;

  create(
    requestBody: ProductCreateRequestDto & JwtDto,
  ): Promise<ProductCreateResponseDto>;

  renew(
    requestBody: ProductRenewRequestDto & JwtDto,
  ): Promise<ProductRenewResponseDto>;

  upgrade(
    requestBody: ProductUpgradeRequestDto & JwtDto,
  ): Promise<ProductUpgradeResponseDto>;

  downgrade(
    requestBody: ProductDowngradeRequestDto & JwtDto,
  ): Promise<ProductDowngradeResponseDto>;

  suspend(
    requestBody: ProductSuspendRequestDto & JwtDto,
  ): Promise<ProductSuspendResponseDto>;

  unsuspend(
    requestBody: ProductUnsuspendRequestDto & JwtDto,
  ): Promise<ProductUnsuspendResponseDto>;

  upgradable(
    requestBody: ProductUpgradableRequestDto & JwtDto,
  ): Promise<ProductUpgradableResponseDto>;

  downgradeable(
    requestBody: ProductDowngradableRequestDto & JwtDto,
  ): Promise<ProductDowngradableResponseDto>;

  delete(
    requestBody: ProductDeleteRequestDto & JwtDto,
  ): Promise<ProductDeleteResponseDto>;

  validateProductAttributes(
    requestBody: ProductValidateAttributesRequestDto,
  ): Promise<ProductValidateAttributesResponseDto | ErrorResponseDto>;

  validateItemAttributes(
    requestBody: ProductValidateAttributesRequestDto,
  ): Promise<ProductValidateAttributesResponseDto | ErrorResponseDto>;

  setupStatus(): Promise<SetupStatusResponseDto>;

  install(
    requestBody: CompanyDataDto & JwtDto,
  ): Promise<null | ErrorResponseDto>;

  uninstall(requestBody: JwtDto): Promise<null | ErrorResponseDto>;
}
