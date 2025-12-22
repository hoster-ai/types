import 'reflect-metadata';
import { UnitDto } from '../dtos/unit.dto';
import { validateNotificationInfoDto } from './notification-info.validator';
import { NotificationMessageTypeEnum } from '../enums/notification/notification-message-type.enum';
import { ActionsEnum } from '../enums/actions.enum';
import { LanguageEnum } from '../enums/language.enum';

describe('NotificationInfoDto Validator', () => {
  const validUnit: UnitDto = { id: "ram", unitDescription: "MB", intervalDescription: "month" };

  const testCases = [
    {
      description: 'should return no errors for valid DTO',
      dto: {
        type: NotificationMessageTypeEnum.EMAIL,
        title: 'Valid Title',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        payPerUseUnits: [validUnit]
      },
      expectedErrorsLength: 0
    },
    {
      description: 'should return error for missing type',
      dto: {
        title: 'Valid Title',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        payPerUseUnits: [validUnit]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return error for invalid payPerUseUnits',
      dto: {
        type: NotificationMessageTypeEnum.EMAIL,
        title: 'Valid Title',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        payPerUseUnits: [{ id: "", unitDescription: "", intervalDescription: "" }] // Invalid unit
      },
      expectedErrorsLength: 1
    }
  ];

  testCases.forEach(({ description, dto, expectedErrorsLength }) => {
    it(description, async () => {
      const errors = await validateNotificationInfoDto(dto);
      expect(errors).toHaveLength(expectedErrorsLength);
    });
  });

  const validationErrorTestCases = [
    {
      description: 'should return ValidationError for missing title',
      dto: {
        type: NotificationMessageTypeEnum.EMAIL,
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        payPerUseUnits: [validUnit]
      },
      expectedErrors: ['title']
    },
    {
      description: 'should return ValidationError for invalid payPerUseUnits',
      dto: {
        type: NotificationMessageTypeEnum.EMAIL,
        title: 'Valid Title',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        payPerUseUnits: [{ id: "", unitDescription: "", intervalDescription: "" }]
      },
      expectedErrors: ['payPerUseUnits']
    }
  ];

  validationErrorTestCases.forEach(({ description, dto, expectedErrors }) => {
    it(description, async () => {
      const errors = await validateNotificationInfoDto(dto);
      const errorProperties = errors.map(error => error.property);
      expectedErrors.forEach(expectedError => {
        expect(errorProperties).toContain(expectedError);
      });
    });
  });
});
