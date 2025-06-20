import Foundation

struct PushSender: Codable {
    let messageId: String
    let userId: String
    let title: String
    let message: String
    let subtitle: String?
}
