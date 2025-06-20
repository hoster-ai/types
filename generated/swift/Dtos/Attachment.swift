import Foundation

struct Attachment: Codable {
    let filename: String
    let content: String
    let contentType: String?
}
