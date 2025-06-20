import Foundation

struct Request: Codable {
    let notificationId: String
    let sender: EmailSenderDto
    let receiver: EmailReceiverDto
}
