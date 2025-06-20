import Foundation

enum Actions: String, Codable {
    case cREATE = "CREATE"
    case rENEW = "RENEW"
    case uPGRADE = "UPGRADE"
    case dOWNGRADE = "DOWNGRADE"
    case sUSPEND = "SUSPEND"
    case uNSUSPEND = "UNSUSPEND"
    case dELETE = "DELETE"
}
