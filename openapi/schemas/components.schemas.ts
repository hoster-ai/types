export const ComponentsSchemas = {
  "CountryDto": {
    "properties": {
      "name": {
        "minLength": 1,
        "type": "string",
        "title": "Name",
        "description": "Country name."
      },
      "code": {
        "$ref": "#/components/schemas/CountryEnum"
      },
      "isEurope": {
        "type": "boolean",
        "title": "Is Europe",
        "description": "Whether the country is in Europe."
      }
    },
    "type": "object",
    "required": [
      "name",
      "code"
    ]
  },
  "TabDto": {
    "properties": {
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Text label for the tab."
      },
      "url": {
        "minLength": 1,
        "type": "string",
        "format": "uri",
        "title": "URL",
        "description": "URL associated with the tab."
      }
    },
    "type": "object",
    "required": [
      "label",
      "url"
    ]
  },
  "ActionDto": {
    "properties": {
      "icon": {
        "minLength": 1,
        "type": "string",
        "title": "Icon",
        "description": "Name of the icon to display for the action."
      },
      "label": {
        "type": "string",
        "title": "Label",
        "description": "Text label for the action."
      },
      "openMethod": {
        "$ref": "#/components/schemas/OpenMethodEnum"
      },
      "url": {
        "minLength": 1,
        "type": "string",
        "format": "url",
        "title": "URL",
        "description": "URL to navigate to when the action is triggered."
      }
    },
    "type": "object",
    "required": [
      "icon",
      "openMethod",
      "url"
    ]
  },
  "BaseMenuDto": {
    "properties": {
      "icon": {
        "minLength": 1,
        "type": "string",
        "title": "Icon",
        "description": "Icon for the menu item."
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Label for the menu item."
      }
    },
    "type": "object",
    "required": [
      "icon",
      "label"
    ]
  },
  "MenuDtoWithUrl": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "only-url"
        ],
        "minLength": 1,
        "title": "Type",
        "description": "Type of the menu item."
      },
      "url": {
        "minLength": 1,
        "type": "string",
        "format": "uri",
        "title": "URL",
        "description": "URL associated with the menu item."
      },
      "icon": {
        "minLength": 1,
        "type": "string",
        "title": "Icon",
        "description": "Icon for the menu item."
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Label for the menu item."
      }
    },
    "type": "object",
    "required": [
      "type",
      "url",
      "submenu",
      "icon",
      "label"
    ]
  },
  "MenuDtoWithSubmenu": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "with-submenu"
        ],
        "minLength": 1,
        "title": "Type",
        "description": "Type of the menu item."
      },
      "submenu": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "type": "array",
        "title": "Submenu",
        "description": "List of tabs that will appear in the submenu."
      },
      "icon": {
        "minLength": 1,
        "type": "string",
        "title": "Icon",
        "description": "Icon for the menu item."
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Label for the menu item."
      }
    },
    "type": "object",
    "required": [
      "type",
      "url",
      "submenu",
      "icon",
      "label"
    ]
  },
  "SettingsDto": {
    "properties": {
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Label of the settings page."
      },
      "icon": {
        "type": "string",
        "title": "Icon",
        "description": "Icon of the settings page."
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Description of the settings page."
      }
    },
    "type": "object",
    "required": [
      "label",
      "icon",
      "description"
    ]
  },
  "SettingsWithUrlDto": {
    "properties": {
      "url": {
        "format": "url",
        "type": "string",
        "title": "URL",
        "description": "URL to the settings page."
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Label of the settings page."
      },
      "icon": {
        "type": "string",
        "title": "Icon",
        "description": "Icon of the settings page."
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Description of the settings page."
      }
    },
    "type": "object",
    "required": [
      "url",
      "tabs",
      "label",
      "icon",
      "description"
    ]
  },
  "SettingsWithTabsDto": {
    "properties": {
      "tabs": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "type": "array",
        "title": "Tabs",
        "description": "List of tabs for the settings page."
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "title": "Label",
        "description": "Label of the settings page."
      },
      "icon": {
        "type": "string",
        "title": "Icon",
        "description": "Icon of the settings page."
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Description of the settings page."
      }
    },
    "type": "object",
    "required": [
      "tabs",
      "url",
      "label",
      "icon",
      "description"
    ]
  },
  "AdminPanelTabsDto": {
    "properties": {
      "product": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Product Tabs",
        "description": "Tabs shown on the product detail page in Admin panel."
      },
      "item": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Item Tabs",
        "description": "Tabs shown on the item detail page in Admin panel."
      },
      "client": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Client Tabs",
        "description": "Tabs shown on the client profile page in Admin panel."
      },
      "user": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "User Tabs",
        "description": "Tabs shown on the user page in Admin panel."
      },
      "order": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Order Tabs",
        "description": "Tabs shown on the order page in Admin panel."
      }
    },
    "type": "object"
  },
  "AdminPanelMoreActionsDto": {
    "properties": {
      "client": {
        "items": {
          "$ref": "#/components/schemas/ActionDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Client Actions",
        "description": "Additional actions available on the client page."
      },
      "item": {
        "items": {
          "$ref": "#/components/schemas/ActionDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Item Actions",
        "description": "Additional actions available on the item page."
      },
      "invoice": {
        "items": {
          "$ref": "#/components/schemas/ActionDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Invoice Actions",
        "description": "Additional actions available on the invoice page."
      },
      "user": {
        "items": {
          "$ref": "#/components/schemas/ActionDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "User Actions",
        "description": "Additional actions available on the user page."
      },
      "order": {
        "items": {
          "$ref": "#/components/schemas/ActionDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Order Actions",
        "description": "Additional actions available on the order page."
      }
    },
    "type": "object"
  },
  "AdminPanelDto": {
    "properties": {
      "tabs": {
        "$ref": "#/components/schemas/AdminPanelTabsDto"
      },
      "moreActions": {
        "$ref": "#/components/schemas/AdminPanelMoreActionsDto"
      },
      "menu": {
        "title": "Menu",
        "description": "Admin panel main menu (URL or submenu variant).",
        "type": "object",
        "oneOf": [
          {
            "$ref": "#/components/schemas/MenuDtoWithSubmenu"
          },
          {
            "$ref": "#/components/schemas/MenuDtoWithUrl"
          }
        ]
      },
      "settings": {
        "title": "Settings",
        "description": "Admin panel settings page configuration.",
        "type": "object",
        "oneOf": [
          {
            "$ref": "#/components/schemas/SettingsWithUrlDto"
          },
          {
            "$ref": "#/components/schemas/SettingsWithTabsDto"
          }
        ]
      }
    },
    "type": "object"
  },
  "ClientPanelTabsDto": {
    "properties": {
      "item": {
        "items": {
          "$ref": "#/components/schemas/TabDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Item Tabs",
        "description": "Tabs shown on the item page in Client panel."
      }
    },
    "type": "object"
  },
  "ClientPanelMoreActionsDto": {
    "properties": {
      "item": {
        "items": {
          "$ref": "#/components/schemas/ActionDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Item Actions",
        "description": "Additional actions available on the item page in Client panel."
      }
    },
    "type": "object"
  },
  "ClientPanelDto": {
    "properties": {
      "tabs": {
        "$ref": "#/components/schemas/ClientPanelTabsDto"
      },
      "moreActions": {
        "$ref": "#/components/schemas/ClientPanelMoreActionsDto"
      },
      "menu": {
        "title": "Menu",
        "description": "Client panel main menu (URL or submenu variant).",
        "oneOf": [
          {
            "$ref": "#/components/schemas/MenuDtoWithSubmenu"
          },
          {
            "$ref": "#/components/schemas/MenuDtoWithUrl"
          }
        ]
      }
    },
    "type": "object"
  },
  "InfoDto": {
    "properties": {
      "title": {
        "minLength": 1,
        "type": "string",
        "title": "Title",
        "description": "Integration display title.",
        "example": "Example Product"
      },
      "logo": {
        "format": "uri",
        "type": "string",
        "title": "Logo URL",
        "description": "Public HTTPS URL for the integration logo.",
        "example": "https://cdn.example.com/logo.png"
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Short description of the integration.",
        "example": "An example product integration."
      },
      "supportedLanguages": {
        "items": {
          "$ref": "#/components/schemas/LanguageEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Supported Languages",
        "description": "Locales supported by the integration.",
        "example": [
          "EN"
        ]
      },
      "listenEvents": {
        "items": {
          "$ref": "#/components/schemas/EventsEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Listen Events",
        "description": "Platform events the integration can subscribe to."
      },
      "requiredRoles": {
        "items": {
          "$ref": "#/components/schemas/RolesEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Required Roles",
        "description": "Roles required for this integration to operate."
      },
      "adminPanel": {
        "$ref": "#/components/schemas/AdminPanelDto"
      },
      "clientPanel": {
        "$ref": "#/components/schemas/ClientPanelDto"
      },
      "onboardingUrl": {
        "format": "uri",
        "type": "string",
        "title": "Onboarding URL",
        "description": "URL to onboard/configure the integration.",
        "example": "https://example.com/onboarding"
      },
      "setupAttributes": {
        "items": {
          "$ref": "#/components/schemas/AnyFieldDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Setup Attributes",
        "description": "Configurable attributes that are used in the setup process. Each item is a concrete field DTO discriminated by its `type` literal."
      }
    },
    "type": "object",
    "required": [
      "title",
      "supportedLanguages"
    ]
  },
  "UnitDto": {
    "properties": {
      "id": {
        "minLength": 1,
        "type": "string",
        "title": "Unit ID",
        "description": "Unit identifier.",
        "example": "messages"
      },
      "unitDescription": {
        "minLength": 1,
        "type": "string",
        "title": "Unit Description",
        "description": "What is measured.",
        "example": "Message sent"
      },
      "intervalDescription": {
        "minLength": 1,
        "type": "string",
        "title": "Interval Description",
        "description": "Billing interval.",
        "example": "Per month"
      }
    },
    "type": "object",
    "required": [
      "id",
      "unitDescription",
      "intervalDescription"
    ]
  },
  "NotificationInfoDto": {
    "properties": {
      "type": {
        "$ref": "#/components/schemas/NotificationMessageTypeEnum"
      },
      "payPerUseUnits": {
        "items": {
          "$ref": "#/components/schemas/UnitDto"
        },
        "type": "array",
        "title": "Pay-Per-Use Units",
        "description": "Optional metering units for pay-per-use billing.",
        "example": [
          {
            "id": "messages",
            "unitDescription": "Message sent",
            "intervalDescription": "Per month"
          }
        ]
      },
      "title": {
        "minLength": 1,
        "type": "string",
        "title": "Title",
        "description": "Integration display title.",
        "example": "Example Product"
      },
      "logo": {
        "format": "uri",
        "type": "string",
        "title": "Logo URL",
        "description": "Public HTTPS URL for the integration logo.",
        "example": "https://cdn.example.com/logo.png"
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Short description of the integration.",
        "example": "An example product integration."
      },
      "supportedLanguages": {
        "items": {
          "$ref": "#/components/schemas/LanguageEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Supported Languages",
        "description": "Locales supported by the integration.",
        "example": [
          "EN"
        ]
      },
      "listenEvents": {
        "items": {
          "$ref": "#/components/schemas/EventsEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Listen Events",
        "description": "Platform events the integration can subscribe to."
      },
      "requiredRoles": {
        "items": {
          "$ref": "#/components/schemas/RolesEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Required Roles",
        "description": "Roles required for this integration to operate."
      },
      "adminPanel": {
        "$ref": "#/components/schemas/AdminPanelDto"
      },
      "clientPanel": {
        "$ref": "#/components/schemas/ClientPanelDto"
      },
      "onboardingUrl": {
        "format": "uri",
        "type": "string",
        "title": "Onboarding URL",
        "description": "URL to onboard/configure the integration.",
        "example": "https://example.com/onboarding"
      },
      "setupAttributes": {
        "items": {
          "$ref": "#/components/schemas/AnyFieldDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Setup Attributes",
        "description": "Configurable attributes that are used in the setup process. Each item is a concrete field DTO discriminated by its `type` literal."
      }
    },
    "type": "object",
    "required": [
      "type",
      "title",
      "supportedLanguages"
    ]
  },
  "AttributeFieldDto": {
    "properties": {
      "field": {
        "type": "object",
        "title": "Field",
        "description": "The concrete field DTO (discriminated by its `type` literal).",
        "$ref": "#/components/schemas/AnyFieldDto"
      },
      "visibleInOrder": {
        "type": "boolean",
        "title": "Visible In Order",
        "description": "Whether the field is visible in order view."
      },
      "visibleInClientPanel": {
        "type": "boolean",
        "title": "Visible In Client Panel",
        "description": "Whether the field is visible in the client panel."
      },
      "repeatableMin": {
        "type": "number",
        "title": "Repeatable Min",
        "description": "Minimum repeats for repeatable fields."
      },
      "repeatableMax": {
        "type": "number",
        "title": "Repeatable Max",
        "description": "Maximum repeats for repeatable fields."
      }
    },
    "type": "object",
    "required": [
      "field"
    ]
  },
  "ProductInfoDto": {
    "properties": {
      "productAttributes": {
        "items": {
          "$ref": "#/components/schemas/AttributeFieldDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Product Attributes",
        "description": "Configurable attributes that apply at the product level."
      },
      "itemAttributes": {
        "items": {
          "$ref": "#/components/schemas/AttributeFieldDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Item Attributes",
        "description": "Configurable attributes that apply at the item level."
      },
      "payPerUseUnits": {
        "items": {
          "$ref": "#/components/schemas/UnitDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Pay-Per-Use Units",
        "description": "Optional metering units for pay-per-use billing.",
        "example": [
          {
            "id": "requests",
            "unitDescription": "API request",
            "intervalDescription": "Per month"
          }
        ]
      },
      "responseDataFieldNames": {
        "title": "Response Data Field Names",
        "description": "Mapping of field names used in provider responses.",
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "example": {
          "external_id": "id",
          "status_text": "status"
        }
      },
      "supportedActions": {
        "items": {
          "$ref": "#/components/schemas/ProductActionsEnum"
        },
        "type": "array",
        "minLength": 1,
        "title": "Supported Actions",
        "description": "Actions supported by this integration."
      },
      "title": {
        "minLength": 1,
        "type": "string",
        "title": "Title",
        "description": "Integration display title.",
        "example": "Example Product"
      },
      "logo": {
        "format": "uri",
        "type": "string",
        "title": "Logo URL",
        "description": "Public HTTPS URL for the integration logo.",
        "example": "https://cdn.example.com/logo.png"
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Short description of the integration.",
        "example": "An example product integration."
      },
      "supportedLanguages": {
        "items": {
          "$ref": "#/components/schemas/LanguageEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Supported Languages",
        "description": "Locales supported by the integration.",
        "example": [
          "EN"
        ]
      },
      "listenEvents": {
        "items": {
          "$ref": "#/components/schemas/EventsEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Listen Events",
        "description": "Platform events the integration can subscribe to."
      },
      "requiredRoles": {
        "items": {
          "$ref": "#/components/schemas/RolesEnum"
        },
        "minItems": 1,
        "type": "array",
        "title": "Required Roles",
        "description": "Roles required for this integration to operate."
      },
      "adminPanel": {
        "$ref": "#/components/schemas/AdminPanelDto"
      },
      "clientPanel": {
        "$ref": "#/components/schemas/ClientPanelDto"
      },
      "onboardingUrl": {
        "format": "uri",
        "type": "string",
        "title": "Onboarding URL",
        "description": "URL to onboard/configure the integration.",
        "example": "https://example.com/onboarding"
      },
      "setupAttributes": {
        "items": {
          "$ref": "#/components/schemas/AnyFieldDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Setup Attributes",
        "description": "Configurable attributes that are used in the setup process. Each item is a concrete field DTO discriminated by its `type` literal."
      }
    },
    "type": "object",
    "required": [
      "supportedActions",
      "title",
      "supportedLanguages"
    ]
  },
  "MultilangTextDto": {
    "properties": {
      "language": {
        "enum": [
          "AB",
          "AA",
          "AF",
          "AK",
          "SQ",
          "AM",
          "AR",
          "AN",
          "HY",
          "AS",
          "AV",
          "AE",
          "AY",
          "AZ",
          "BM",
          "BA",
          "EU",
          "BE",
          "BN",
          "BI",
          "BS",
          "BR",
          "BG",
          "MY",
          "CA",
          "KM",
          "CH",
          "CE",
          "NY",
          "ZH",
          "CU",
          "CV",
          "KW",
          "CO",
          "CR",
          "HR",
          "CS",
          "DA",
          "DV",
          "NL",
          "DZ",
          "EN",
          "EO",
          "ET",
          "EE",
          "FO",
          "FJ",
          "FI",
          "FR",
          "FF",
          "GL",
          "LG",
          "KA",
          "DE",
          "EL",
          "GN",
          "GU",
          "HT",
          "HA",
          "HE",
          "HZ",
          "HI",
          "HO",
          "HU",
          "IS",
          "IO",
          "IG",
          "ID",
          "IA",
          "IE",
          "IU",
          "IK",
          "GA",
          "IT",
          "JA",
          "JV",
          "KL",
          "KN",
          "KR",
          "KS",
          "KK",
          "KI",
          "RW",
          "KY",
          "KV",
          "KG",
          "KO",
          "KJ",
          "KU",
          "LO",
          "LA",
          "LV",
          "LI",
          "LN",
          "LT",
          "LU",
          "LB",
          "MK",
          "MG",
          "MS",
          "ML",
          "MT",
          "GV",
          "MI",
          "MR",
          "MH",
          "MN",
          "NA",
          "NV",
          "ND",
          "NR",
          "NG",
          "NE",
          "SE",
          "NO",
          "NB",
          "NN",
          "II",
          "OC",
          "OJ",
          "OR",
          "OM",
          "OS",
          "PI",
          "PS",
          "FA",
          "PL",
          "PT",
          "PA",
          "QU",
          "RO",
          "RM",
          "RN",
          "RU",
          "SM",
          "SG",
          "SA",
          "SC",
          "GD",
          "SR",
          "SN",
          "II",
          "SD",
          "SI",
          "SK",
          "SL",
          "SO",
          "ST",
          "ES",
          "SU",
          "SW",
          "SS",
          "SV",
          "TL",
          "TY",
          "TG",
          "TA",
          "TT",
          "TE",
          "TH",
          "BO",
          "TI",
          "TO",
          "TS",
          "TN",
          "TR",
          "TK",
          "TW",
          "UG",
          "UK",
          "UR",
          "UZ",
          "VE",
          "VI",
          "VO",
          "WA",
          "CY",
          "FY",
          "WO",
          "XH",
          "YI",
          "YO",
          "ZA",
          "ZU"
        ],
        "type": "string",
        "title": "Language",
        "description": "The language of the text."
      },
      "text": {
        "minLength": 1,
        "type": "string",
        "title": "Text",
        "description": "The text content in the specified language."
      }
    },
    "type": "object",
    "required": [
      "language",
      "text"
    ]
  },
  "BaseFieldDto": {
    "properties": {
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "BooleanFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "BOOLEAN"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'BOOLEAN' for this DTO."
      },
      "value": {
        "type": "boolean",
        "title": "Value",
        "description": "Boolean value of the field."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "TextFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "TEXT"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'TEXT' for this DTO."
      },
      "value": {
        "type": "string",
        "title": "Value",
        "description": "Text value of the field."
      },
      "minLength": {
        "minimum": 0,
        "type": "integer",
        "title": "Minimum Length",
        "description": "Minimum allowed character length."
      },
      "maxLength": {
        "minimum": 0,
        "type": "integer",
        "title": "Maximum Length",
        "description": "Maximum allowed character length."
      },
      "regexValidation": {
        "type": "string",
        "title": "Regex Validation",
        "description": "Optional regex to validate input.",
        "example": "^[A-Za-z0-9_-]+$"
      },
      "regexValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Regex Validation Error Message",
        "description": "Localized error message shown when regex validation fails."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "TextareaFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "TEXTAREA"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'TEXTAREA' for this DTO."
      },
      "value": {
        "type": "string",
        "title": "Value",
        "description": "Text value of the field."
      },
      "minLength": {
        "minimum": 0,
        "type": "integer",
        "title": "Minimum Length",
        "description": "Minimum allowed character length."
      },
      "maxLength": {
        "minimum": 0,
        "type": "integer",
        "title": "Maximum Length",
        "description": "Maximum allowed character length."
      },
      "regexValidation": {
        "type": "string",
        "title": "Regex Validation",
        "description": "Optional regex to validate input.",
        "example": "^[A-Za-z0-9_-]+$"
      },
      "regexValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Regex Validation Error Message",
        "description": "Localized error message shown when regex validation fails."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "NumberFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "NUMBER"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'NUMBER' for this DTO."
      },
      "value": {
        "type": "number",
        "title": "Value",
        "description": "Numeric value of the field."
      },
      "min": {
        "type": "number",
        "title": "Minimum",
        "description": "Minimum allowed value."
      },
      "max": {
        "type": "number",
        "title": "Maximum",
        "description": "Maximum allowed value."
      },
      "integer": {
        "type": "boolean",
        "title": "Integer Only",
        "description": "When true, only integer values are allowed."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "PhoneFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "PHONE"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'PHONE' for this DTO."
      },
      "value": {
        "type": "string",
        "title": "Value",
        "description": "Phone number in E.164 format (e.g. +14155552671).",
        "example": "+14155552671"
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "EmailFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "EMAIL"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'EMAIL' for this DTO."
      },
      "value": {
        "format": "email",
        "type": "string",
        "title": "Value",
        "description": "Email address."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "UrlFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "URL"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'URL' for this DTO."
      },
      "value": {
        "format": "uri",
        "type": "string",
        "title": "Value",
        "description": "URL."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "CountriesFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "COUNTRIES"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'COUNTRIES' for this DTO."
      },
      "value": {
        "items": {
          "enum": [
            "AF",
            "AX",
            "AL",
            "DZ",
            "AS",
            "AD",
            "AO",
            "AI",
            "AQ",
            "AG",
            "AR",
            "AM",
            "AW",
            "AU",
            "AT",
            "AZ",
            "BS",
            "BH",
            "BD",
            "BB",
            "BY",
            "BE",
            "BZ",
            "BJ",
            "BM",
            "BT",
            "BO",
            "BQ",
            "BA",
            "BW",
            "BV",
            "BR",
            "IO",
            "BN",
            "BG",
            "BF",
            "BI",
            "KH",
            "CM",
            "CA",
            "CV",
            "KY",
            "CF",
            "TD",
            "CL",
            "CN",
            "CX",
            "CC",
            "CO",
            "KM",
            "CG",
            "CD",
            "CK",
            "CR",
            "CI",
            "HR",
            "CU",
            "CW",
            "CY",
            "CZ",
            "DK",
            "DJ",
            "DM",
            "DO",
            "EC",
            "EG",
            "SV",
            "GQ",
            "ER",
            "EE",
            "ET",
            "FK",
            "FO",
            "FJ",
            "FI",
            "FR",
            "GF",
            "PF",
            "TF",
            "GA",
            "GM",
            "GE",
            "DE",
            "GH",
            "GI",
            "GR",
            "GL",
            "GD",
            "GP",
            "GU",
            "GT",
            "GG",
            "GN",
            "GW",
            "GY",
            "HT",
            "HM",
            "VA",
            "HN",
            "HK",
            "HU",
            "IS",
            "IN",
            "ID",
            "IR",
            "IQ",
            "IE",
            "IM",
            "IL",
            "IT",
            "JM",
            "JP",
            "JE",
            "JO",
            "KZ",
            "KE",
            "KI",
            "KP",
            "KR",
            "KW",
            "KG",
            "LA",
            "LV",
            "LB",
            "LS",
            "LR",
            "LY",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MG",
            "MW",
            "MY",
            "MV",
            "ML",
            "MT",
            "MH",
            "MQ",
            "MR",
            "MU",
            "TN",
            "TR",
            "TM",
            "TC",
            "TV",
            "UG",
            "UA",
            "AE",
            "GB",
            "US",
            "UM",
            "UY",
            "UZ",
            "VU",
            "VE",
            "VN",
            "VG",
            "VI",
            "WF",
            "EH",
            "YE",
            "ZM",
            "ZW",
            "YT",
            "MX",
            "FM",
            "MD",
            "MC",
            "MN",
            "ME",
            "MS",
            "MA",
            "MZ",
            "MM",
            "NA",
            "NR",
            "NP",
            "NL",
            "NC",
            "NZ",
            "NI",
            "NE",
            "NG",
            "NU",
            "NF",
            "MP",
            "NO",
            "OM",
            "PK",
            "PW",
            "PS",
            "PA",
            "PG",
            "PY",
            "PE",
            "PH",
            "PN",
            "PL",
            "PT",
            "PR",
            "QA",
            "RE",
            "RO",
            "RU",
            "RW",
            "BL",
            "SH",
            "KN",
            "LC",
            "MF",
            "PM",
            "VC",
            "WS",
            "SM",
            "ST",
            "SA",
            "SN",
            "RS",
            "SC",
            "SL",
            "SG",
            "SX",
            "SK",
            "SI",
            "SB",
            "SO",
            "ZA",
            "GS",
            "SS",
            "ES",
            "LK",
            "SD",
            "SR",
            "SJ",
            "SZ",
            "SE",
            "CH",
            "SY",
            "TW",
            "TJ",
            "TZ",
            "TH",
            "TL",
            "TG",
            "TK",
            "TO",
            "TT"
          ],
          "type": "string"
        },
        "type": "array",
        "title": "Value",
        "description": "Array of ISO 3166-1 alpha-2 country codes."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "CurrencyFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "CURRENCY"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'CURRENCY' for this DTO."
      },
      "value": {
        "enum": [
          "EUR",
          "USD",
          "GBP",
          "CHF",
          "SEK",
          "NOK",
          "DKK",
          "PLN",
          "CZK",
          "HUF",
          "RON",
          "BGN",
          "TRY",
          "RUB",
          "JPY",
          "CNY",
          "AUD",
          "NZD",
          "CAD",
          "ZAR",
          "INR",
          "MXN",
          "BRL",
          "ARS",
          "CLP",
          "COP",
          "PEN",
          "UYU",
          "VES",
          "ILS",
          "AED",
          "SAR",
          "KRW",
          "SGD",
          "HKD",
          "TWD",
          "THB",
          "MYR",
          "IDR",
          "PHP",
          "VND"
        ],
        "type": "string",
        "title": "Value",
        "description": "ISO 4217 currency code."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "DateFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "DATE"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'DATE' for this DTO."
      },
      "value": {
        "oneOf": [
          {
            "format": "date",
            "type": "string"
          },
          {
            "format": "date-time",
            "type": "string"
          }
        ],
        "title": "Value",
        "description": "ISO 8601 date or date-time string.",
        "type": "string",
        "format": "date-time"
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "PasswordFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "PASSWORD"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'PASSWORD' for this DTO."
      },
      "value": {
        "type": "string",
        "title": "Value",
        "description": "Password value.",
        "format": "password"
      },
      "minLength": {
        "minimum": 0,
        "type": "integer",
        "title": "Minimum Length",
        "description": "Minimum allowed length."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "FieldOptionDto": {
    "properties": {
      "key": {
        "type": "string",
        "title": "Key",
        "description": "Internal key for the option."
      },
      "value": {
        "type": "string",
        "title": "Value",
        "description": "Display value for the option."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the option is disabled."
      }
    },
    "type": "object",
    "required": [
      "key",
      "value"
    ]
  },
  "SelectFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "SELECT"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'SELECT' for this DTO."
      },
      "value": {
        "$ref": "#/components/schemas/FieldOptionDto",
        "title": "Value",
        "description": "Selected option."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "MultiSelectFieldDto": {
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "MULTI_SELECT"
        ],
        "title": "Field Type",
        "description": "Discriminator literal — always 'MULTI_SELECT' for this DTO."
      },
      "value": {
        "items": {
          "$ref": "#/components/schemas/FieldOptionDto"
        },
        "type": "array",
        "title": "Value",
        "description": "Array of selected options."
      },
      "id": {
        "type": "string",
        "title": "ID",
        "description": "Unique identifier for the field."
      },
      "label": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Label",
        "description": "Multilingual label for the field."
      },
      "required": {
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "Whether remote validation should be triggered for this field."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "minItems": 1,
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error message shown when remote validation fails."
      },
      "upgradable": {
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      },
      "downgradable": {
        "type": "boolean",
        "title": "Downgradable",
        "description": "Whether the item attribute is downgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "type",
      "id",
      "label",
      "required",
      "disabled"
    ]
  },
  "AnyFieldDto": {
    "title": "AnyFieldDto",
    "description": "Discriminated union of every concrete field DTO. Discriminator is the string-literal `type` property.",
    "oneOf": [
      {
        "$ref": "#/components/schemas/BooleanFieldDto"
      },
      {
        "$ref": "#/components/schemas/TextFieldDto"
      },
      {
        "$ref": "#/components/schemas/TextareaFieldDto"
      },
      {
        "$ref": "#/components/schemas/NumberFieldDto"
      },
      {
        "$ref": "#/components/schemas/PhoneFieldDto"
      },
      {
        "$ref": "#/components/schemas/EmailFieldDto"
      },
      {
        "$ref": "#/components/schemas/UrlFieldDto"
      },
      {
        "$ref": "#/components/schemas/CountriesFieldDto"
      },
      {
        "$ref": "#/components/schemas/CurrencyFieldDto"
      },
      {
        "$ref": "#/components/schemas/DateFieldDto"
      },
      {
        "$ref": "#/components/schemas/PasswordFieldDto"
      },
      {
        "$ref": "#/components/schemas/SelectFieldDto"
      },
      {
        "$ref": "#/components/schemas/MultiSelectFieldDto"
      }
    ],
    "discriminator": {
      "propertyName": "type",
      "mapping": {
        "BOOLEAN": "#/components/schemas/BooleanFieldDto",
        "TEXT": "#/components/schemas/TextFieldDto",
        "TEXTAREA": "#/components/schemas/TextareaFieldDto",
        "NUMBER": "#/components/schemas/NumberFieldDto",
        "PHONE": "#/components/schemas/PhoneFieldDto",
        "EMAIL": "#/components/schemas/EmailFieldDto",
        "URL": "#/components/schemas/UrlFieldDto",
        "COUNTRIES": "#/components/schemas/CountriesFieldDto",
        "CURRENCY": "#/components/schemas/CurrencyFieldDto",
        "DATE": "#/components/schemas/DateFieldDto",
        "PASSWORD": "#/components/schemas/PasswordFieldDto",
        "SELECT": "#/components/schemas/SelectFieldDto",
        "MULTI_SELECT": "#/components/schemas/MultiSelectFieldDto"
      }
    }
  }
} as const;
