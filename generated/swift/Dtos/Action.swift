import Foundation

struct Action: Codable {
    let icon: String
    let label: String?
    let openMethod: OpenMethodEnum
    let url: String
}
