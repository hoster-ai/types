// Auto-generated from TypeScript
using System.Text.Json.Serialization;

namespace Hoster.Contracts.Enums
{
    /// <summary>
    /// EventsEnum enumeration
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EventsEnum
    {
        [JsonPropertyName("user/created")]
        USER_CREATED,

        [JsonPropertyName("user/updated")]
        USER_UPDATED,

        [JsonPropertyName("user/deleted")]
        USER_DELETED,

        [JsonPropertyName("user/banned")]
        USER_BANNED,

        [JsonPropertyName("user/unbanned")]
        USER_UNBANNED,

        [JsonPropertyName("user/company/access/added")]
        USER_COMPANY_ACCESS_ADDED,

        [JsonPropertyName("user/company/access/removed")]
        USER_COMPANY_ACCESS_REMOVED,

        [JsonPropertyName("user/locked")]
        USER_LOCKED,

        [JsonPropertyName("user/credit-balance/updated")]
        USER_CREDIT_BALANCE_UPDATED,

        [JsonPropertyName("user/unlocked")]
        USER_UNLOCKED,

        [JsonPropertyName("user/password/updated")]
        USER_PASSWORD_UPDATED,

        [JsonPropertyName("user/email/updated")]
        USER_EMAIL_UPDATED,

        [JsonPropertyName("user/currency/updated")]
        USER_CURRENCY_UPDATED,

        [JsonPropertyName("user/invoice-contact/updated")]
        USER_INVOICE_CONTACT_UPDATED,

        [JsonPropertyName("user/policy/updated")]
        USER_POLICY_UPDATED,

        [JsonPropertyName("user/languages/updated")]
        USER_LANGUAGES_UPDATED,

        [JsonPropertyName("user/custom-price-policies/updated")]
        USER_CUSTOM_PRICE_POLICIES_UPDATED,

        [JsonPropertyName("user/custom-addon-price-policies/updated")]
        USER_CUSTOM_ADDON_PRICE_POLICIES_UPDATED,

        [JsonPropertyName("user/custom-affiliate/added")]
        USER_CUSTOM_AFFILIATE_ADDED,

        [JsonPropertyName("user/custom-affiliate/removed")]
        USER_CUSTOM_AFFILIATE_REMOVED,

        [JsonPropertyName("user/invoice-interval/updated")]
        USER_INVOICE_INTERVAL_UPDATED,

        [JsonPropertyName("user/additional-notification-email/removed")]
        USER_ADDITIONAL_NOTIFICATION_EMAIL_REMOVED,

        [JsonPropertyName("user/additional-notification-email/added")]
        USER_ADDITIONAL_NOTIFICATION_EMAIL_ADDED,

        [JsonPropertyName("user/comment/added")]
        USER_COMMENT_ADDED,

        [JsonPropertyName("user/comment/removed")]
        USER_COMMENT_REMOVED,

        [JsonPropertyName("user/comment/updated")]
        USER_COMMENT_UPDATED,

        [JsonPropertyName("user/tags/updated")]
        USER_TAGS_UPDATED,

        [JsonPropertyName("user/setting/added")]
        USER_SETTING_ADDED,

        [JsonPropertyName("user/setting/removed")]
        USER_SETTING_REMOVED,

        [JsonPropertyName("user/setting/updated")]
        USER_SETTING_UPDATED,

        [JsonPropertyName("user/start-selling")]
        USER_START_SELLING,

        [JsonPropertyName("user/roles/updated")]
        USER_ROLES_UPDATED,

        [JsonPropertyName("user/roles/added")]
        USER_ROLES_ADDED,

        [JsonPropertyName("user/roles/deleted")]
        USER_ROLES_REMOVED,

        [JsonPropertyName("message/created")]
        MESSAGE_CREATED,

        [JsonPropertyName("message/updated")]
        MESSAGE_UPDATED,

        [JsonPropertyName("message/deleted")]
        MESSAGE_DELETED,

        [JsonPropertyName("notification/sent")]
        NOTIFICATION_SENT,

        [JsonPropertyName("policy/created")]
        POLICY_CREATED,

        [JsonPropertyName("policy/updated")]
        POLICY_UPDATED,

        [JsonPropertyName("policy/deleted")]
        POLICY_DELETED,

        [JsonPropertyName("product-category/created")]
        PRODUCT_CATEGORY_CREATED,

        [JsonPropertyName("product-category/updated")]
        PRODUCT_CATEGORY_UPDATED,

        [JsonPropertyName("product-category/deleted")]
        PRODUCT_CATEGORY_DELETED,

        [JsonPropertyName("invoice-contact/created")]
        INVOICE_CONTACT_CREATED,

        [JsonPropertyName("invoice-contact/updated")]
        INVOICE_CONTACT_UPDATED,

        [JsonPropertyName("invoice-contact/deleted")]
        INVOICE_CONTACT_DELETED,

        [JsonPropertyName("invoice/created")]
        INVOICE_CREATED,

        [JsonPropertyName("invoice/updated")]
        INVOICE_UPDATED,

        [JsonPropertyName("invoice/deleted")]
        INVOICE_DELETED,

        [JsonPropertyName("currency/created")]
        CURRENCY_CREATED,

        [JsonPropertyName("currency/updated")]
        CURRENCY_UPDATED,

        [JsonPropertyName("currency/deleted")]
        CURRENCY_DELETED,

        [JsonPropertyName("affiliate/created")]
        AFFILIATE_CREATED,

        [JsonPropertyName("affiliate/updated")]
        AFFILIATE_UPDATED,

        [JsonPropertyName("affiliate/deleted")]
        AFFILIATE_DELETED,

        [JsonPropertyName("company/created")]
        COMPANY_CREATED,

        [JsonPropertyName("company/updated")]
        COMPANY_UPDATED,

        [JsonPropertyName("company/deleted")]
        COMPANY_DELETED,

        [JsonPropertyName("organization/integration/attached")]
        COMPANY_INTEGRATION_INSTALLED,

        [JsonPropertyName("organization/integration/detached")]
        COMPANY_INTEGRATION_UNINSTALLED,

        [JsonPropertyName("tld/created")]
        TLD_CREATED,

        [JsonPropertyName("tld/updated")]
        TLD_UPDATED,

        [JsonPropertyName("tld/deleted")]
        TLD_DELETED,

        [JsonPropertyName("integration/created")]
        INTEGRATION_CREATED,

        [JsonPropertyName("integration/updated")]
        INTEGRATION_UPDATED,

        [JsonPropertyName("integration/deleted")]
        INTEGRATION_DELETED,

        [JsonPropertyName("integration/installed")]
        INTEGRATION_INSTALLED,

        [JsonPropertyName("integration/uninstalled")]
        INTEGRATION_UNINSTALLED,

        [JsonPropertyName("domain-contact/created")]
        DOMAIN_CONTACT_CREATED,

        [JsonPropertyName("domain-contact/updated")]
        DOMAIN_CONTACT_UPDATED,

        [JsonPropertyName("domain-contact/deleted")]
        DOMAIN_CONTACT_DELETED,

        [JsonPropertyName("domain-category/created")]
        DOMAIN_CATEGORY_CREATED,

        [JsonPropertyName("domain-category/updated")]
        DOMAIN_CATEGORY_UPDATED,

        [JsonPropertyName("domain-category/deleted")]
        DOMAIN_CATEGORY_DELETED,

        [JsonPropertyName("addon/created")]
        ADDON_CREATED,

        [JsonPropertyName("addon/updated")]
        ADDON_UPDATED,

        [JsonPropertyName("addon/deleted")]
        ADDON_DELETED,

        [JsonPropertyName("payment/created")]
        PAYMENT_CREATED,

        [JsonPropertyName("payment/canceled")]
        PAYMENT_CANCELED,

        [JsonPropertyName("payment/failed")]
        PAYMENT_FAILED,

        [JsonPropertyName("payment/subscribed")]
        PAYMENT_SUBSCRIBED,

        [JsonPropertyName("payment/unsubscribed")]
        PAYMENT_UNSUBSCRIBED,

        [JsonPropertyName("payment/updated")]
        PAYMENT_UPDATED,

        [JsonPropertyName("payment/deleted")]
        PAYMENT_DELETED,

        [JsonPropertyName("payment/completed")]
        PAYMENT_COMPLETED,

        [JsonPropertyName("template/created")]
        TEMPLATE_CREATED,

        [JsonPropertyName("template/updated")]
        TEMPLATE_UPDATED,

        [JsonPropertyName("template/deleted")]
        TEMPLATE_DELETED,

        [JsonPropertyName("coupon/created")]
        COUPON_CREATED,

        [JsonPropertyName("coupon/updated")]
        COUPON_UPDATED,

        [JsonPropertyName("coupon/deleted")]
        COUPON_DELETED,

        [JsonPropertyName("template-integration/created")]
        TEMPLATE_INTEGRATION_CREATED,

        [JsonPropertyName("template-integration/updated")]
        TEMPLATE_INTEGRATION_UPDATED,

        [JsonPropertyName("template-integration/deleted")]
        TEMPLATE_INTEGRATION_DELETED,

        [JsonPropertyName("order/created")]
        ORDER_CREATED,

        [JsonPropertyName("order/status/in-progress")]
        ORDER_STATUS_INPROGRESS,

        [JsonPropertyName("order/status/completed")]
        ORDER_STATUS_COMPLETED,

        [JsonPropertyName("order/status/canceled")]
        ORDER_STATUS_CANCELED,

        [JsonPropertyName("order/status/refunded")]
        ORDER_STATUS_REFUNDED,

        [JsonPropertyName("order/insufficient-balance")]
        ORDER_INSUFFICIENT_BALANCE,

        [JsonPropertyName("order/updated")]
        ORDER_UPDATED,

        [JsonPropertyName("order/deleted")]
        ORDER_DELETED,

        [JsonPropertyName("setting/created")]
        SETTING_CREATED,

        [JsonPropertyName("setting/updated")]
        SETTING_UPDATED,

        [JsonPropertyName("setting/deleted")]
        SETTING_DELETED,

        [JsonPropertyName("issue/created")]
        ISSUE_CREATED,

        [JsonPropertyName("issue/updated")]
        ISSUE_UPDATED,

        [JsonPropertyName("issue/deleted")]
        ISSUE_DELETED,

        [JsonPropertyName("task/created")]
        TASK_CREATED,

        [JsonPropertyName("task/updated")]
        TASK_UPDATED,

        [JsonPropertyName("task/deleted")]
        TASK_DELETED,

        [JsonPropertyName("task/canceled")]
        TASK_CANCELED,

        [JsonPropertyName("task/in-progress")]
        TASK_INPROGRESS,

        [JsonPropertyName("task/completed")]
        TASK_COMPLETED,

        [JsonPropertyName("task/percentage/updated")]
        TASK_UPDATE_PERCENTAGE,

        [JsonPropertyName("product/created")]
        PRODUCT_CREATED,

        [JsonPropertyName("product/updated")]
        PRODUCT_UPDATED,

        [JsonPropertyName("product/deleted")]
        PRODUCT_DELETED,

        [JsonPropertyName("product/auto-renew/updated")]
        PRODUCT_AUTO_RENEW_UPDATED,

        [JsonPropertyName("product/enabled")]
        PRODUCT_ENABLED,

        [JsonPropertyName("product/disabled")]
        PRODUCT_DISABLED,

        [JsonPropertyName("product/version-created")]
        PRODUCT_VERSION_CREATED,

        [JsonPropertyName("ip-group/created")]
        IP_GROUP_CREATED,

        [JsonPropertyName("ip-group/updated")]
        IP_GROUP_UPDATED,

        [JsonPropertyName("ip-group/deleted")]
        IP_GROUP_DELETED,

        [JsonPropertyName("ip/created")]
        IP_CREATED,

        [JsonPropertyName("ip/updated")]
        IP_UPDATED,

        [JsonPropertyName("ip/deleted")]
        IP_DELETED,

        [JsonPropertyName("domain-name/created")]
        DOMAIN_NAME_CREATED,

        [JsonPropertyName("domain-name/updated")]
        DOMAIN_NAME_UPDATED,

        [JsonPropertyName("domain-name/deleted")]
        DOMAIN_NAME_DELETED,

        [JsonPropertyName("domain-name/locked")]
        DOMAIN_NAME_LOCKED,

        [JsonPropertyName("domain-name/unlocked")]
        DOMAIN_NAME_UNLOCKED,

        [JsonPropertyName("domain-name/idshield-activated")]
        DOMAIN_NAME_SHIELD_ACTIVATED,

        [JsonPropertyName("domain-name/idshield-deactivated")]
        DOMAIN_NAME_SHIELD_DEACTIVATED,

        [JsonPropertyName("domain-name/bundle-added")]
        DOMAIN_NAME_BUNDLE_ADDED,

        [JsonPropertyName("domain-name/bundle-removed")]
        DOMAIN_NAME_BUNDLE_REMOVED,

        [JsonPropertyName("domain-name/registrant-updated")]
        DOMAIN_NAME_REGISTRANT_UPDATED,

        [JsonPropertyName("domain-name/admin-updated")]
        DOMAIN_NAME_ADMIN_UPDATED,

        [JsonPropertyName("domain-name/tech-updated")]
        DOMAIN_NAME_TECH_UPDATED,

        [JsonPropertyName("domain-name/billing-updated")]
        DOMAIN_NAME_BILLING_UPDATED,

        [JsonPropertyName("domain-name/additional-updated")]
        DOMAIN_NAME_ADDITIONAL_UPDATED,

        [JsonPropertyName("item/created")]
        ITEM_CREATED,

        [JsonPropertyName("item/updated")]
        ITEM_UPDATED,

        [JsonPropertyName("item/deleted")]
        ITEM_DELETED,

        [JsonPropertyName("item/renewed")]
        ITEM_RENEWED,

        [JsonPropertyName("item/upgraded")]
        ITEM_UPGRADED,

        [JsonPropertyName("item/downgraded")]
        ITEM_DOWNGRADED,

        [JsonPropertyName("item/ip-attached")]
        ITEM_IP_ATTACHED,

        [JsonPropertyName("item/ip-detached")]
        ITEM_IP_DETACHED,

        [JsonPropertyName("item/detached-from-order")]
        ITEM_DETACHED_FROM_ORDER,

        [JsonPropertyName("item/postponed")]
        ITEM_POSTPONED,

        [JsonPropertyName("item/transferred-in")]
        ITEM_TRANSFERRED_IN,

        [JsonPropertyName("item/canceled")]
        ITEM_CANCELED,

        [JsonPropertyName("item/suspended")]
        ITEM_SUSPENDED,

        [JsonPropertyName("item/unsuspended")]
        ITEM_UNSUSPENDED,

        [JsonPropertyName("item/affiliate/added")]
        ITEM_AFFILIATE_ADDED,

        [JsonPropertyName("item/bundle/attached")]
        ITEM_BUNDLE_ATTACHED,

        [JsonPropertyName("item/bundle/detached")]
        ITEM_BUNDLE_DETACHED,

        [JsonPropertyName("item/activated")]
        ITEM_ACTIVATED,

        [JsonPropertyName("item/set-inactive")]
        ITEM_DEACTIVATED,

        [JsonPropertyName("item/processed")]
        ITEM_PROCESSED,

        [JsonPropertyName("order/paid")]
        ORDER_PAID,

        [JsonPropertyName("test")]
        TEST,

        [JsonPropertyName("dead-lettering")]
        DEAD_LETTER,

        [JsonPropertyName("core-queue")]
        CORE_QUEUE

    }
}
