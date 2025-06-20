import Foundation

struct PushReceiver: Codable {
    let userId: String
    let deviceTokens: [String]
}
