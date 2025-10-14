export const ComponentsSchemas = {
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
        "minLength": 1,
        "type": "string",
        "enum": [
          "ajax_call",
          "small_iframe",
          "medium_iframe",
          "large_iframe"
        ],
        "title": "Open Method",
        "description": "Method by which the action's URL should be opened."
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
        "not": {
          "type": "null"
        },
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
        "not": {
          "type": "null"
        },
        "title": "Label",
        "description": "Label of the settings page."
      },
      "icon": {
        "not": {
          "type": "null"
        },
        "type": "string",
        "title": "Icon",
        "description": "Icon of the settings page."
      },
      "description": {
        "not": {
          "type": "null"
        },
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
        "type": "string"
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "not": {
          "type": "null"
        },
        "title": "Label",
        "description": "Label of the settings page."
      },
      "icon": {
        "not": {
          "type": "null"
        },
        "type": "string",
        "title": "Icon",
        "description": "Icon of the settings page."
      },
      "description": {
        "not": {
          "type": "null"
        },
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
        "description": "Tabs shown on the settings page."
      },
      "label": {
        "minLength": 1,
        "type": "string",
        "not": {
          "type": "null"
        },
        "title": "Label",
        "description": "Label of the settings page."
      },
      "icon": {
        "not": {
          "type": "null"
        },
        "type": "string",
        "title": "Icon",
        "description": "Icon of the settings page."
      },
      "description": {
        "not": {
          "type": "null"
        },
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
    "type": "object",
    "required": []
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
    "type": "object",
    "required": []
  },
  "AdminPanelDto": {
    "properties": {
      "tabs": {
        "$ref": "#/components/schemas/AdminPanelTabsDto",
        "title": "Tabs",
        "description": "Tab structure for Admin panel sections.",
        "type": "object",
        "properties": {
          "tabs": {
            "$ref": "#/components/schemas/AdminPanelTabsDto"
          }
        }
      },
      "moreActions": {
        "$ref": "#/components/schemas/AdminPanelMoreActionsDto",
        "title": "More Actions",
        "description": "Additional actions in Admin panel sections.",
        "type": "object",
        "properties": {
          "moreActions": {
            "$ref": "#/components/schemas/AdminPanelMoreActionsDto"
          }
        }
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
    "type": "object",
    "required": []
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
    "type": "object",
    "required": []
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
    "type": "object",
    "required": []
  },
  "ClientPanelDto": {
    "properties": {
      "tabs": {
        "$ref": "#/components/schemas/ClientPanelTabsDto",
        "title": "Tabs",
        "description": "Tab structure for Client panel.",
        "type": "object",
        "properties": {
          "tabs": {
            "$ref": "#/components/schemas/ClientPanelTabsDto"
          }
        }
      },
      "moreActions": {
        "$ref": "#/components/schemas/ClientPanelMoreActionsDto",
        "title": "More Actions",
        "description": "Additional actions in Client panel.",
        "type": "object",
        "properties": {
          "moreActions": {
            "$ref": "#/components/schemas/ClientPanelMoreActionsDto"
          }
        }
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
    "type": "object",
    "required": []
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
          "enum": [
            "aa",
            "af",
            "ak",
            "sq",
            "am",
            "ar",
            "an",
            "hy",
            "as",
            "av",
            "ae",
            "ay",
            "az",
            "bm",
            "ba",
            "eu",
            "be",
            "bn",
            "bh",
            "bi",
            "bs",
            "br",
            "bg",
            "my",
            "ca",
            "ch",
            "ce",
            "ny",
            "zh",
            "cv",
            "kw",
            "co",
            "cr",
            "hr",
            "cs",
            "da",
            "dv",
            "nl",
            "dz",
            "en",
            "eo",
            "et",
            "ee",
            "fo",
            "fj",
            "fi",
            "fr",
            "ff",
            "gl",
            "ka",
            "de",
            "el",
            "gn",
            "gu",
            "ht",
            "ha",
            "he",
            "hz",
            "hi",
            "ho",
            "hu",
            "ia",
            "id",
            "ie",
            "ga",
            "ig",
            "ik",
            "io",
            "is",
            "it",
            "iu",
            "ja",
            "jv",
            "kl",
            "kn",
            "kr",
            "ks",
            "kk",
            "km",
            "ki",
            "rw",
            "ky",
            "kv",
            "kg",
            "ko",
            "ku",
            "kj",
            "la",
            "lb",
            "lg",
            "li",
            "ln",
            "lo",
            "lt",
            "lu",
            "lv",
            "gv",
            "mk",
            "mg",
            "ms",
            "ml",
            "mt",
            "mi",
            "mr",
            "mh",
            "mn",
            "na",
            "nv",
            "nd",
            "ne",
            "ng",
            "nb",
            "nn",
            "no",
            "ii",
            "nr",
            "oc",
            "oj",
            "cu",
            "om",
            "or",
            "os",
            "pa",
            "pi",
            "fa",
            "pl",
            "ps",
            "pt",
            "qu",
            "rm",
            "rn",
            "ro",
            "rh",
            "ru",
            "sa",
            "sc",
            "sd",
            "se",
            "sm",
            "sg",
            "sr",
            "gd",
            "sn",
            "si",
            "sk",
            "sl",
            "so",
            "st",
            "es",
            "su",
            "sw",
            "ss",
            "sv",
            "ta",
            "te",
            "tg",
            "th",
            "ti",
            "bo",
            "tk",
            "tl",
            "tn",
            "to",
            "tr",
            "ts",
            "tt",
            "tw",
            "ty",
            "ug",
            "uk",
            "ur",
            "uz",
            "ve",
            "vi",
            "vo",
            "wa",
            "cy",
            "wo",
            "fy",
            "xh",
            "yi",
            "yo",
            "za",
            "zu"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "not": {
          "type": "null"
        },
        "title": "Supported Languages",
        "description": "Locales supported by the integration.",
        "example": [
          "en"
        ]
      },
      "supportedActions": {
        "items": {
          "enum": [
            "create",
            "renew",
            "upgrade",
            "downgrade",
            "transfer",
            "suspend",
            "unsuspend",
            "delete"
          ],
          "type": "string"
        },
        "type": "array",
        "title": "Supported Actions",
        "description": "Actions supported by this integration."
      },
      "listenEvents": {
        "items": {
          "enum": [
            "user/created",
            "user/updated",
            "user/deleted",
            "user/banned",
            "user/unbanned",
            "user/company/access/added",
            "user/company/access/removed",
            "user/locked",
            "user/credit-balance/updated",
            "user/unlocked",
            "user/password/updated",
            "user/email/updated",
            "user/currency/updated",
            "user/invoice-contact/updated",
            "user/policy/updated",
            "user/languages/updated",
            "user/custom-price-policies/updated",
            "user/custom-addon-price-policies/updated",
            "user/custom-affiliate/added",
            "user/custom-affiliate/removed",
            "user/invoice-interval/updated",
            "user/additional-notification-email/removed",
            "user/additional-notification-email/added",
            "user/comment/added",
            "user/comment/removed",
            "user/comment/updated",
            "user/tags/updated",
            "user/setting/added",
            "user/setting/removed",
            "user/setting/updated",
            "user/start-selling",
            "user/roles/updated",
            "user/roles/added",
            "user/roles/deleted",
            "message/created",
            "message/updated",
            "message/deleted",
            "notification/sent",
            "policy/created",
            "policy/updated",
            "policy/deleted",
            "product-category/created",
            "product-category/updated",
            "product-category/deleted",
            "invoice-contact/created",
            "invoice-contact/updated",
            "invoice-contact/deleted",
            "invoice/created",
            "invoice/updated",
            "invoice/deleted",
            "currency/created",
            "currency/updated",
            "currency/deleted",
            "affiliate/created",
            "affiliate/updated",
            "affiliate/deleted",
            "company/created",
            "company/updated",
            "company/deleted",
            "organization/integration/attached",
            "organization/integration/detached",
            "tld/created",
            "tld/updated",
            "tld/deleted",
            "integration/created",
            "integration/updated",
            "integration/deleted",
            "integration/installed",
            "integration/uninstalled",
            "integration/activated",
            "integration/deactivated",
            "integration/maintenance-started",
            "integration/maintenance-finished",
            "domain-contact/created",
            "domain-contact/updated",
            "domain-contact/deleted",
            "domain-category/created",
            "domain-category/updated",
            "domain-category/deleted",
            "addon/created",
            "addon/updated",
            "addon/deleted",
            "transaction/created",
            "transaction/canceled",
            "transaction/failed",
            "transaction/subscribed",
            "transaction/unsubscribed",
            "transaction/updated",
            "transaction/deleted",
            "transaction/completed",
            "transaction/refunded",
            "template/created",
            "template/updated",
            "template/deleted",
            "coupon/created",
            "coupon/updated",
            "coupon/deleted",
            "template-integration/created",
            "template-integration/updated",
            "template-integration/deleted",
            "order/created",
            "order/status/in-progress",
            "order/status/completed",
            "order/status/canceled",
            "order/status/refunded",
            "order/insufficient-balance",
            "order/updated",
            "order/deleted",
            "setting/created",
            "setting/updated",
            "setting/deleted",
            "issue/created",
            "issue/updated",
            "issue/deleted",
            "task/created",
            "task/updated",
            "task/deleted",
            "task/canceled",
            "task/in-progress",
            "task/completed",
            "task/percentage/updated",
            "product/created",
            "product/updated",
            "product/deleted",
            "product/auto-renew/updated",
            "product/enabled",
            "product/disabled",
            "product/version-created",
            "ip-group/created",
            "ip-group/updated",
            "ip-group/deleted",
            "ip/created",
            "ip/updated",
            "ip/deleted",
            "domain-name/created",
            "domain-name/updated",
            "domain-name/deleted",
            "domain-name/locked",
            "domain-name/unlocked",
            "domain-name/idshield-activated",
            "domain-name/idshield-deactivated",
            "domain-name/bundle-added",
            "domain-name/bundle-removed",
            "domain-name/registrant-updated",
            "domain-name/admin-updated",
            "domain-name/tech-updated",
            "domain-name/billing-updated",
            "domain-name/additional-updated",
            "item/created",
            "item/updated",
            "item/deleted",
            "item/renewed",
            "item/upgraded",
            "item/downgraded",
            "item/ip-attached",
            "item/ip-detached",
            "item/detached-from-order",
            "item/postponed",
            "item/transferred-in",
            "item/canceled",
            "item/suspended",
            "item/unsuspended",
            "item/affiliate/added",
            "item/bundle/attached",
            "item/bundle/detached",
            "item/activated",
            "item/set-inactive",
            "item/processed",
            "order/paid",
            "test",
            "dead-lettering",
            "core-queue"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "title": "Listen Events",
        "description": "Platform events the integration can subscribe to."
      },
      "requiredRoles": {
        "items": {
          "enum": [
            "SIMPLE_USER",
            "FULL_ACCESS",
            "SUPER_ADMIN",
            "ORDER_READ",
            "ORDER_WRITE",
            "ADDON_READ",
            "ADDON_WRITE",
            "AFFILIATE_READ",
            "AFFILIATE_WRITE",
            "COMPANY_READ",
            "COMPANY_WRITE",
            "TEMPLATE_READ",
            "TEMPLATE_WRITE",
            "COUPON_READ",
            "COUPON_WRITE",
            "DOMAIN_CATEGORY_READ",
            "DOMAIN_CATEGORY_WRITE",
            "DOMAIN_CONTACT_READ",
            "DOMAIN_CONTACT_WRITE",
            "DOMAIN_NAME_READ",
            "DOMAIN_NAME_WRITE",
            "INVOICE_CONTACT_READ",
            "INVOICE_CONTACT_WRITE",
            "INVOICE_READ",
            "INVOICE_WRITE",
            "IP_GROUPS_READ",
            "IP_GROUPS_WRITE",
            "IPS_READ",
            "IPS_WRITE",
            "ITEMS_READ",
            "ITEMS_WRITE",
            "ORDERS_READ",
            "ORDERS_WRITE",
            "TRANSACTIONS_READ",
            "TRANSACTIONS_WRITE",
            "POLICIES_READ",
            "POLICIES_WRITE",
            "PRODUCT_CATEGORIES_READ",
            "PRODUCT_CATEGORIES_WRITE",
            "PRODUCTS_READ",
            "PRODUCTS_WRITE",
            "SETTINGS_READ",
            "SETTINGS_WRITE",
            "INTEGRATIONS_READ",
            "INTEGRATIONS_WRITE",
            "TLDS_READ",
            "TLDS_WRITE",
            "USERS_READ",
            "USERS_WRITE",
            "ISSUES_WRITE",
            "ISSUES_READ",
            "ACTION_LOGS_READ"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "title": "Required Roles",
        "description": "Roles required for this integration to operate."
      },
      "adminPanel": {
        "$ref": "#/components/schemas/AdminPanelDto",
        "title": "Admin Panel",
        "description": "Admin UI links, tabs, and actions provided by the integration.",
        "type": "object"
      },
      "clientPanel": {
        "$ref": "#/components/schemas/ClientPanelDto",
        "title": "Client Panel",
        "description": "Client UI links, tabs, and actions provided by the integration.",
        "type": "object"
      },
      "onboardingUrl": {
        "format": "uri",
        "type": "string",
        "title": "Onboarding URL",
        "description": "URL to onboard/configure the integration.",
        "example": "https://example.com/onboarding"
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
        "not": {
          "type": "null"
        },
        "title": "Unit ID",
        "description": "Unit identifier.",
        "example": "messages"
      },
      "unitDescription": {
        "minLength": 1,
        "type": "string",
        "not": {
          "type": "null"
        },
        "title": "Unit Description",
        "description": "What is measured.",
        "example": "Message sent"
      },
      "intervalDescription": {
        "minLength": 1,
        "type": "string",
        "not": {
          "type": "null"
        },
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
        "not": {
          "type": "null"
        },
        "enum": [
          "email",
          "sms",
          "push"
        ],
        "type": "string",
        "title": "Notification Type",
        "description": "Notification channel type.",
        "example": "email"
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
          "enum": [
            "aa",
            "af",
            "ak",
            "sq",
            "am",
            "ar",
            "an",
            "hy",
            "as",
            "av",
            "ae",
            "ay",
            "az",
            "bm",
            "ba",
            "eu",
            "be",
            "bn",
            "bh",
            "bi",
            "bs",
            "br",
            "bg",
            "my",
            "ca",
            "ch",
            "ce",
            "ny",
            "zh",
            "cv",
            "kw",
            "co",
            "cr",
            "hr",
            "cs",
            "da",
            "dv",
            "nl",
            "dz",
            "en",
            "eo",
            "et",
            "ee",
            "fo",
            "fj",
            "fi",
            "fr",
            "ff",
            "gl",
            "ka",
            "de",
            "el",
            "gn",
            "gu",
            "ht",
            "ha",
            "he",
            "hz",
            "hi",
            "ho",
            "hu",
            "ia",
            "id",
            "ie",
            "ga",
            "ig",
            "ik",
            "io",
            "is",
            "it",
            "iu",
            "ja",
            "jv",
            "kl",
            "kn",
            "kr",
            "ks",
            "kk",
            "km",
            "ki",
            "rw",
            "ky",
            "kv",
            "kg",
            "ko",
            "ku",
            "kj",
            "la",
            "lb",
            "lg",
            "li",
            "ln",
            "lo",
            "lt",
            "lu",
            "lv",
            "gv",
            "mk",
            "mg",
            "ms",
            "ml",
            "mt",
            "mi",
            "mr",
            "mh",
            "mn",
            "na",
            "nv",
            "nd",
            "ne",
            "ng",
            "nb",
            "nn",
            "no",
            "ii",
            "nr",
            "oc",
            "oj",
            "cu",
            "om",
            "or",
            "os",
            "pa",
            "pi",
            "fa",
            "pl",
            "ps",
            "pt",
            "qu",
            "rm",
            "rn",
            "ro",
            "rh",
            "ru",
            "sa",
            "sc",
            "sd",
            "se",
            "sm",
            "sg",
            "sr",
            "gd",
            "sn",
            "si",
            "sk",
            "sl",
            "so",
            "st",
            "es",
            "su",
            "sw",
            "ss",
            "sv",
            "ta",
            "te",
            "tg",
            "th",
            "ti",
            "bo",
            "tk",
            "tl",
            "tn",
            "to",
            "tr",
            "ts",
            "tt",
            "tw",
            "ty",
            "ug",
            "uk",
            "ur",
            "uz",
            "ve",
            "vi",
            "vo",
            "wa",
            "cy",
            "wo",
            "fy",
            "xh",
            "yi",
            "yo",
            "za",
            "zu"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "not": {
          "type": "null"
        },
        "title": "Supported Languages",
        "description": "Locales supported by the integration.",
        "example": [
          "en"
        ]
      },
      "supportedActions": {
        "items": {
          "enum": [
            "create",
            "renew",
            "upgrade",
            "downgrade",
            "transfer",
            "suspend",
            "unsuspend",
            "delete"
          ],
          "type": "string"
        },
        "type": "array",
        "title": "Supported Actions",
        "description": "Actions supported by this integration."
      },
      "listenEvents": {
        "items": {
          "enum": [
            "user/created",
            "user/updated",
            "user/deleted",
            "user/banned",
            "user/unbanned",
            "user/company/access/added",
            "user/company/access/removed",
            "user/locked",
            "user/credit-balance/updated",
            "user/unlocked",
            "user/password/updated",
            "user/email/updated",
            "user/currency/updated",
            "user/invoice-contact/updated",
            "user/policy/updated",
            "user/languages/updated",
            "user/custom-price-policies/updated",
            "user/custom-addon-price-policies/updated",
            "user/custom-affiliate/added",
            "user/custom-affiliate/removed",
            "user/invoice-interval/updated",
            "user/additional-notification-email/removed",
            "user/additional-notification-email/added",
            "user/comment/added",
            "user/comment/removed",
            "user/comment/updated",
            "user/tags/updated",
            "user/setting/added",
            "user/setting/removed",
            "user/setting/updated",
            "user/start-selling",
            "user/roles/updated",
            "user/roles/added",
            "user/roles/deleted",
            "message/created",
            "message/updated",
            "message/deleted",
            "notification/sent",
            "policy/created",
            "policy/updated",
            "policy/deleted",
            "product-category/created",
            "product-category/updated",
            "product-category/deleted",
            "invoice-contact/created",
            "invoice-contact/updated",
            "invoice-contact/deleted",
            "invoice/created",
            "invoice/updated",
            "invoice/deleted",
            "currency/created",
            "currency/updated",
            "currency/deleted",
            "affiliate/created",
            "affiliate/updated",
            "affiliate/deleted",
            "company/created",
            "company/updated",
            "company/deleted",
            "organization/integration/attached",
            "organization/integration/detached",
            "tld/created",
            "tld/updated",
            "tld/deleted",
            "integration/created",
            "integration/updated",
            "integration/deleted",
            "integration/installed",
            "integration/uninstalled",
            "integration/activated",
            "integration/deactivated",
            "integration/maintenance-started",
            "integration/maintenance-finished",
            "domain-contact/created",
            "domain-contact/updated",
            "domain-contact/deleted",
            "domain-category/created",
            "domain-category/updated",
            "domain-category/deleted",
            "addon/created",
            "addon/updated",
            "addon/deleted",
            "transaction/created",
            "transaction/canceled",
            "transaction/failed",
            "transaction/subscribed",
            "transaction/unsubscribed",
            "transaction/updated",
            "transaction/deleted",
            "transaction/completed",
            "transaction/refunded",
            "template/created",
            "template/updated",
            "template/deleted",
            "coupon/created",
            "coupon/updated",
            "coupon/deleted",
            "template-integration/created",
            "template-integration/updated",
            "template-integration/deleted",
            "order/created",
            "order/status/in-progress",
            "order/status/completed",
            "order/status/canceled",
            "order/status/refunded",
            "order/insufficient-balance",
            "order/updated",
            "order/deleted",
            "setting/created",
            "setting/updated",
            "setting/deleted",
            "issue/created",
            "issue/updated",
            "issue/deleted",
            "task/created",
            "task/updated",
            "task/deleted",
            "task/canceled",
            "task/in-progress",
            "task/completed",
            "task/percentage/updated",
            "product/created",
            "product/updated",
            "product/deleted",
            "product/auto-renew/updated",
            "product/enabled",
            "product/disabled",
            "product/version-created",
            "ip-group/created",
            "ip-group/updated",
            "ip-group/deleted",
            "ip/created",
            "ip/updated",
            "ip/deleted",
            "domain-name/created",
            "domain-name/updated",
            "domain-name/deleted",
            "domain-name/locked",
            "domain-name/unlocked",
            "domain-name/idshield-activated",
            "domain-name/idshield-deactivated",
            "domain-name/bundle-added",
            "domain-name/bundle-removed",
            "domain-name/registrant-updated",
            "domain-name/admin-updated",
            "domain-name/tech-updated",
            "domain-name/billing-updated",
            "domain-name/additional-updated",
            "item/created",
            "item/updated",
            "item/deleted",
            "item/renewed",
            "item/upgraded",
            "item/downgraded",
            "item/ip-attached",
            "item/ip-detached",
            "item/detached-from-order",
            "item/postponed",
            "item/transferred-in",
            "item/canceled",
            "item/suspended",
            "item/unsuspended",
            "item/affiliate/added",
            "item/bundle/attached",
            "item/bundle/detached",
            "item/activated",
            "item/set-inactive",
            "item/processed",
            "order/paid",
            "test",
            "dead-lettering",
            "core-queue"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "title": "Listen Events",
        "description": "Platform events the integration can subscribe to."
      },
      "requiredRoles": {
        "items": {
          "enum": [
            "SIMPLE_USER",
            "FULL_ACCESS",
            "SUPER_ADMIN",
            "ORDER_READ",
            "ORDER_WRITE",
            "ADDON_READ",
            "ADDON_WRITE",
            "AFFILIATE_READ",
            "AFFILIATE_WRITE",
            "COMPANY_READ",
            "COMPANY_WRITE",
            "TEMPLATE_READ",
            "TEMPLATE_WRITE",
            "COUPON_READ",
            "COUPON_WRITE",
            "DOMAIN_CATEGORY_READ",
            "DOMAIN_CATEGORY_WRITE",
            "DOMAIN_CONTACT_READ",
            "DOMAIN_CONTACT_WRITE",
            "DOMAIN_NAME_READ",
            "DOMAIN_NAME_WRITE",
            "INVOICE_CONTACT_READ",
            "INVOICE_CONTACT_WRITE",
            "INVOICE_READ",
            "INVOICE_WRITE",
            "IP_GROUPS_READ",
            "IP_GROUPS_WRITE",
            "IPS_READ",
            "IPS_WRITE",
            "ITEMS_READ",
            "ITEMS_WRITE",
            "ORDERS_READ",
            "ORDERS_WRITE",
            "TRANSACTIONS_READ",
            "TRANSACTIONS_WRITE",
            "POLICIES_READ",
            "POLICIES_WRITE",
            "PRODUCT_CATEGORIES_READ",
            "PRODUCT_CATEGORIES_WRITE",
            "PRODUCTS_READ",
            "PRODUCTS_WRITE",
            "SETTINGS_READ",
            "SETTINGS_WRITE",
            "INTEGRATIONS_READ",
            "INTEGRATIONS_WRITE",
            "TLDS_READ",
            "TLDS_WRITE",
            "USERS_READ",
            "USERS_WRITE",
            "ISSUES_WRITE",
            "ISSUES_READ",
            "ACTION_LOGS_READ"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "title": "Required Roles",
        "description": "Roles required for this integration to operate."
      },
      "adminPanel": {
        "$ref": "#/components/schemas/AdminPanelDto",
        "title": "Admin Panel",
        "description": "Admin UI links, tabs, and actions provided by the integration.",
        "type": "object"
      },
      "clientPanel": {
        "$ref": "#/components/schemas/ClientPanelDto",
        "title": "Client Panel",
        "description": "Client UI links, tabs, and actions provided by the integration.",
        "type": "object"
      },
      "onboardingUrl": {
        "format": "uri",
        "type": "string",
        "title": "Onboarding URL",
        "description": "URL to onboard/configure the integration.",
        "example": "https://example.com/onboarding"
      }
    },
    "type": "object",
    "required": [
      "type",
      "title",
      "supportedLanguages"
    ]
  },
  "MultilangTextDto": {
    "properties": {
      "language": {
        "not": {
          "type": "null"
        },
        "enum": [
          "aa",
          "af",
          "ak",
          "sq",
          "am",
          "ar",
          "an",
          "hy",
          "as",
          "av",
          "ae",
          "ay",
          "az",
          "bm",
          "ba",
          "eu",
          "be",
          "bn",
          "bh",
          "bi",
          "bs",
          "br",
          "bg",
          "my",
          "ca",
          "ch",
          "ce",
          "ny",
          "zh",
          "cv",
          "kw",
          "co",
          "cr",
          "hr",
          "cs",
          "da",
          "dv",
          "nl",
          "dz",
          "en",
          "eo",
          "et",
          "ee",
          "fo",
          "fj",
          "fi",
          "fr",
          "ff",
          "gl",
          "ka",
          "de",
          "el",
          "gn",
          "gu",
          "ht",
          "ha",
          "he",
          "hz",
          "hi",
          "ho",
          "hu",
          "ia",
          "id",
          "ie",
          "ga",
          "ig",
          "ik",
          "io",
          "is",
          "it",
          "iu",
          "ja",
          "jv",
          "kl",
          "kn",
          "kr",
          "ks",
          "kk",
          "km",
          "ki",
          "rw",
          "ky",
          "kv",
          "kg",
          "ko",
          "ku",
          "kj",
          "la",
          "lb",
          "lg",
          "li",
          "ln",
          "lo",
          "lt",
          "lu",
          "lv",
          "gv",
          "mk",
          "mg",
          "ms",
          "ml",
          "mt",
          "mi",
          "mr",
          "mh",
          "mn",
          "na",
          "nv",
          "nd",
          "ne",
          "ng",
          "nb",
          "nn",
          "no",
          "ii",
          "nr",
          "oc",
          "oj",
          "cu",
          "om",
          "or",
          "os",
          "pa",
          "pi",
          "fa",
          "pl",
          "ps",
          "pt",
          "qu",
          "rm",
          "rn",
          "ro",
          "rh",
          "ru",
          "sa",
          "sc",
          "sd",
          "se",
          "sm",
          "sg",
          "sr",
          "gd",
          "sn",
          "si",
          "sk",
          "sl",
          "so",
          "st",
          "es",
          "su",
          "sw",
          "ss",
          "sv",
          "ta",
          "te",
          "tg",
          "th",
          "ti",
          "bo",
          "tk",
          "tl",
          "tn",
          "to",
          "tr",
          "ts",
          "tt",
          "tw",
          "ty",
          "ug",
          "uk",
          "ur",
          "uz",
          "ve",
          "vi",
          "vo",
          "wa",
          "cy",
          "wo",
          "fy",
          "xh",
          "yi",
          "yo",
          "za",
          "zu"
        ],
        "type": "string"
      },
      "text": {
        "minLength": 1,
        "type": "string"
      }
    },
    "type": "object",
    "required": [
      "language",
      "text"
    ]
  },
  "FieldOptionDto": {
    "properties": {
      "key": {
        "not": {
          "type": "null"
        },
        "type": "string",
        "title": "Key",
        "description": "Internal key for the option."
      },
      "value": {
        "not": {
          "type": "null"
        },
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
  "FieldDto": {
    "properties": {
      "id": {
        "not": {
          "type": "null"
        },
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
      "value": {
        "not": {
          "type": "null"
        },
        "title": "Value",
        "description": "Value of the field. String/Number, or FieldOptionDto/FieldOptionDto[] depending on type.",
        "oneOf": [
          {
            "title": "String",
            "type": "string"
          },
          {
            "title": "Number",
            "type": "number"
          },
          {
            "title": "Option",
            "$ref": "#/components/schemas/FieldOptionDto"
          },
          {
            "title": "Options Array",
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/FieldOptionDto"
            }
          }
        ]
      },
      "type": {
        "not": {
          "type": "null"
        },
        "enum": [
          "TEXT_BOX",
          "TEXT_AREA",
          "SELECT",
          "MULTI_SELECT",
          "DESCRIPTION",
          "RADIO_BOX",
          "CHECKBOX",
          "SLIDER"
        ],
        "type": "string",
        "title": "Field Type",
        "description": "Type of the field."
      },
      "reapetableMin": {
        "type": "number"
      },
      "reapetableMax": {
        "type": "number"
      },
      "required": {
        "not": {
          "type": "null"
        },
        "type": "boolean",
        "title": "Required",
        "description": "Whether the field is required."
      },
      "disabled": {
        "not": {
          "type": "null"
        },
        "type": "boolean",
        "title": "Disabled",
        "description": "Whether the field is disabled."
      },
      "hidden": {
        "not": {
          "type": "null"
        },
        "type": "boolean",
        "title": "Hidden",
        "description": "Whether the field is hidden."
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
        "type": "array",
        "title": "Regex Validation Error Message",
        "description": "Localized error message shown when regex validation fails."
      },
      "triggersRemoteValidation": {
        "type": "boolean",
        "title": "Triggers Remote Validation",
        "description": "If true, field triggers remote validation."
      },
      "remoteValidationErrorMessage": {
        "items": {
          "$ref": "#/components/schemas/MultilangTextDto"
        },
        "type": "array",
        "title": "Remote Validation Error Message",
        "description": "Localized error messages for remote validation."
      },
      "upgradable": {
        "not": {
          "type": "null"
        },
        "type": "boolean",
        "title": "Upgradable",
        "description": "Whether the item attribute is upgradable by the user."
      }
    },
    "type": "object",
    "required": [
      "id",
      "label",
      "value",
      "type",
      "required",
      "disabled",
      "hidden",
      "upgradable"
    ]
  },
  "ProductInfoDto": {
    "properties": {
      "productAttributes": {
        "items": {
          "$ref": "#/components/schemas/FieldDto"
        },
        "type": "array",
        "minItems": 1,
        "title": "Product Attributes",
        "description": "Configurable attributes that apply at the product level."
      },
      "itemAttributes": {
        "items": {
          "$ref": "#/components/schemas/FieldDto"
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
          "enum": [
            "aa",
            "af",
            "ak",
            "sq",
            "am",
            "ar",
            "an",
            "hy",
            "as",
            "av",
            "ae",
            "ay",
            "az",
            "bm",
            "ba",
            "eu",
            "be",
            "bn",
            "bh",
            "bi",
            "bs",
            "br",
            "bg",
            "my",
            "ca",
            "ch",
            "ce",
            "ny",
            "zh",
            "cv",
            "kw",
            "co",
            "cr",
            "hr",
            "cs",
            "da",
            "dv",
            "nl",
            "dz",
            "en",
            "eo",
            "et",
            "ee",
            "fo",
            "fj",
            "fi",
            "fr",
            "ff",
            "gl",
            "ka",
            "de",
            "el",
            "gn",
            "gu",
            "ht",
            "ha",
            "he",
            "hz",
            "hi",
            "ho",
            "hu",
            "ia",
            "id",
            "ie",
            "ga",
            "ig",
            "ik",
            "io",
            "is",
            "it",
            "iu",
            "ja",
            "jv",
            "kl",
            "kn",
            "kr",
            "ks",
            "kk",
            "km",
            "ki",
            "rw",
            "ky",
            "kv",
            "kg",
            "ko",
            "ku",
            "kj",
            "la",
            "lb",
            "lg",
            "li",
            "ln",
            "lo",
            "lt",
            "lu",
            "lv",
            "gv",
            "mk",
            "mg",
            "ms",
            "ml",
            "mt",
            "mi",
            "mr",
            "mh",
            "mn",
            "na",
            "nv",
            "nd",
            "ne",
            "ng",
            "nb",
            "nn",
            "no",
            "ii",
            "nr",
            "oc",
            "oj",
            "cu",
            "om",
            "or",
            "os",
            "pa",
            "pi",
            "fa",
            "pl",
            "ps",
            "pt",
            "qu",
            "rm",
            "rn",
            "ro",
            "rh",
            "ru",
            "sa",
            "sc",
            "sd",
            "se",
            "sm",
            "sg",
            "sr",
            "gd",
            "sn",
            "si",
            "sk",
            "sl",
            "so",
            "st",
            "es",
            "su",
            "sw",
            "ss",
            "sv",
            "ta",
            "te",
            "tg",
            "th",
            "ti",
            "bo",
            "tk",
            "tl",
            "tn",
            "to",
            "tr",
            "ts",
            "tt",
            "tw",
            "ty",
            "ug",
            "uk",
            "ur",
            "uz",
            "ve",
            "vi",
            "vo",
            "wa",
            "cy",
            "wo",
            "fy",
            "xh",
            "yi",
            "yo",
            "za",
            "zu"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "not": {
          "type": "null"
        },
        "title": "Supported Languages",
        "description": "Locales supported by the integration.",
        "example": [
          "en"
        ]
      },
      "supportedActions": {
        "items": {
          "enum": [
            "create",
            "renew",
            "upgrade",
            "downgrade",
            "transfer",
            "suspend",
            "unsuspend",
            "delete"
          ],
          "type": "string"
        },
        "type": "array",
        "title": "Supported Actions",
        "description": "Actions supported by this integration."
      },
      "listenEvents": {
        "items": {
          "enum": [
            "user/created",
            "user/updated",
            "user/deleted",
            "user/banned",
            "user/unbanned",
            "user/company/access/added",
            "user/company/access/removed",
            "user/locked",
            "user/credit-balance/updated",
            "user/unlocked",
            "user/password/updated",
            "user/email/updated",
            "user/currency/updated",
            "user/invoice-contact/updated",
            "user/policy/updated",
            "user/languages/updated",
            "user/custom-price-policies/updated",
            "user/custom-addon-price-policies/updated",
            "user/custom-affiliate/added",
            "user/custom-affiliate/removed",
            "user/invoice-interval/updated",
            "user/additional-notification-email/removed",
            "user/additional-notification-email/added",
            "user/comment/added",
            "user/comment/removed",
            "user/comment/updated",
            "user/tags/updated",
            "user/setting/added",
            "user/setting/removed",
            "user/setting/updated",
            "user/start-selling",
            "user/roles/updated",
            "user/roles/added",
            "user/roles/deleted",
            "message/created",
            "message/updated",
            "message/deleted",
            "notification/sent",
            "policy/created",
            "policy/updated",
            "policy/deleted",
            "product-category/created",
            "product-category/updated",
            "product-category/deleted",
            "invoice-contact/created",
            "invoice-contact/updated",
            "invoice-contact/deleted",
            "invoice/created",
            "invoice/updated",
            "invoice/deleted",
            "currency/created",
            "currency/updated",
            "currency/deleted",
            "affiliate/created",
            "affiliate/updated",
            "affiliate/deleted",
            "company/created",
            "company/updated",
            "company/deleted",
            "organization/integration/attached",
            "organization/integration/detached",
            "tld/created",
            "tld/updated",
            "tld/deleted",
            "integration/created",
            "integration/updated",
            "integration/deleted",
            "integration/installed",
            "integration/uninstalled",
            "integration/activated",
            "integration/deactivated",
            "integration/maintenance-started",
            "integration/maintenance-finished",
            "domain-contact/created",
            "domain-contact/updated",
            "domain-contact/deleted",
            "domain-category/created",
            "domain-category/updated",
            "domain-category/deleted",
            "addon/created",
            "addon/updated",
            "addon/deleted",
            "transaction/created",
            "transaction/canceled",
            "transaction/failed",
            "transaction/subscribed",
            "transaction/unsubscribed",
            "transaction/updated",
            "transaction/deleted",
            "transaction/completed",
            "transaction/refunded",
            "template/created",
            "template/updated",
            "template/deleted",
            "coupon/created",
            "coupon/updated",
            "coupon/deleted",
            "template-integration/created",
            "template-integration/updated",
            "template-integration/deleted",
            "order/created",
            "order/status/in-progress",
            "order/status/completed",
            "order/status/canceled",
            "order/status/refunded",
            "order/insufficient-balance",
            "order/updated",
            "order/deleted",
            "setting/created",
            "setting/updated",
            "setting/deleted",
            "issue/created",
            "issue/updated",
            "issue/deleted",
            "task/created",
            "task/updated",
            "task/deleted",
            "task/canceled",
            "task/in-progress",
            "task/completed",
            "task/percentage/updated",
            "product/created",
            "product/updated",
            "product/deleted",
            "product/auto-renew/updated",
            "product/enabled",
            "product/disabled",
            "product/version-created",
            "ip-group/created",
            "ip-group/updated",
            "ip-group/deleted",
            "ip/created",
            "ip/updated",
            "ip/deleted",
            "domain-name/created",
            "domain-name/updated",
            "domain-name/deleted",
            "domain-name/locked",
            "domain-name/unlocked",
            "domain-name/idshield-activated",
            "domain-name/idshield-deactivated",
            "domain-name/bundle-added",
            "domain-name/bundle-removed",
            "domain-name/registrant-updated",
            "domain-name/admin-updated",
            "domain-name/tech-updated",
            "domain-name/billing-updated",
            "domain-name/additional-updated",
            "item/created",
            "item/updated",
            "item/deleted",
            "item/renewed",
            "item/upgraded",
            "item/downgraded",
            "item/ip-attached",
            "item/ip-detached",
            "item/detached-from-order",
            "item/postponed",
            "item/transferred-in",
            "item/canceled",
            "item/suspended",
            "item/unsuspended",
            "item/affiliate/added",
            "item/bundle/attached",
            "item/bundle/detached",
            "item/activated",
            "item/set-inactive",
            "item/processed",
            "order/paid",
            "test",
            "dead-lettering",
            "core-queue"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "title": "Listen Events",
        "description": "Platform events the integration can subscribe to."
      },
      "requiredRoles": {
        "items": {
          "enum": [
            "SIMPLE_USER",
            "FULL_ACCESS",
            "SUPER_ADMIN",
            "ORDER_READ",
            "ORDER_WRITE",
            "ADDON_READ",
            "ADDON_WRITE",
            "AFFILIATE_READ",
            "AFFILIATE_WRITE",
            "COMPANY_READ",
            "COMPANY_WRITE",
            "TEMPLATE_READ",
            "TEMPLATE_WRITE",
            "COUPON_READ",
            "COUPON_WRITE",
            "DOMAIN_CATEGORY_READ",
            "DOMAIN_CATEGORY_WRITE",
            "DOMAIN_CONTACT_READ",
            "DOMAIN_CONTACT_WRITE",
            "DOMAIN_NAME_READ",
            "DOMAIN_NAME_WRITE",
            "INVOICE_CONTACT_READ",
            "INVOICE_CONTACT_WRITE",
            "INVOICE_READ",
            "INVOICE_WRITE",
            "IP_GROUPS_READ",
            "IP_GROUPS_WRITE",
            "IPS_READ",
            "IPS_WRITE",
            "ITEMS_READ",
            "ITEMS_WRITE",
            "ORDERS_READ",
            "ORDERS_WRITE",
            "TRANSACTIONS_READ",
            "TRANSACTIONS_WRITE",
            "POLICIES_READ",
            "POLICIES_WRITE",
            "PRODUCT_CATEGORIES_READ",
            "PRODUCT_CATEGORIES_WRITE",
            "PRODUCTS_READ",
            "PRODUCTS_WRITE",
            "SETTINGS_READ",
            "SETTINGS_WRITE",
            "INTEGRATIONS_READ",
            "INTEGRATIONS_WRITE",
            "TLDS_READ",
            "TLDS_WRITE",
            "USERS_READ",
            "USERS_WRITE",
            "ISSUES_WRITE",
            "ISSUES_READ",
            "ACTION_LOGS_READ"
          ],
          "type": "string"
        },
        "minItems": 1,
        "type": "array",
        "title": "Required Roles",
        "description": "Roles required for this integration to operate."
      },
      "adminPanel": {
        "$ref": "#/components/schemas/AdminPanelDto",
        "title": "Admin Panel",
        "description": "Admin UI links, tabs, and actions provided by the integration.",
        "type": "object"
      },
      "clientPanel": {
        "$ref": "#/components/schemas/ClientPanelDto",
        "title": "Client Panel",
        "description": "Client UI links, tabs, and actions provided by the integration.",
        "type": "object"
      },
      "onboardingUrl": {
        "format": "uri",
        "type": "string",
        "title": "Onboarding URL",
        "description": "URL to onboard/configure the integration.",
        "example": "https://example.com/onboarding"
      }
    },
    "type": "object",
    "required": [
      "title",
      "supportedLanguages"
    ]
  }
} as const;
