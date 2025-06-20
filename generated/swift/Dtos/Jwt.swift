import Foundation

struct Jwt: Codable {
    let jwt: {
    let integrationId: String
    let userId: String?
    let companyId: String
    let acceptedRoles: [RolesEnum]
}
