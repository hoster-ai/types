import Foundation

struct Info: Codable {
    let label: String
    let url: String
    let icon: String
    let label: String
    let each: true })
    let tabs: [TabDto]
    let title: String
    let logo: String?
    let description: String?
    let each: true })
    let supported_languages: [LanguageEnum]
    let product_attributes: [FieldDto]?
    let item_attributes: [FieldDto]?
    let listen_events: [EventsEnum]?
    let each: true })
    let requiredRoles: [RolesEnum]?
    let unsupportedActions: [ActionsEnum]
    let adminPanel: {?
    let productTabs: [TabDto]?
    let actions: {?
    let client: [ActionDto]?
    let item: [ActionDto]?
    let menu: MenuDto?
    let settings: MenuDto?
    let clientPanel: {?
    let productTabs: [TabDto]?
    let actions: {?
    let item: [ActionDto]?
    let menu: MenuDto?
    let onboardingUrl: String?
    let payPerUseUnits: [UnitDto]?
    let responseDataFieldNames: [keyof ResponseDataDto: String]?
}
