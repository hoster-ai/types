import Foundation

struct EmailSender: Codable {
    let fullName: String
    let subject: String
    let message: String
    let each: true })
    let attachments: [AttachmentDto]?
}
