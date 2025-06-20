import Foundation

enum FieldType: String, Codable {
    case tEXT_BOX = "TEXT_BOX"
    case tEXT_AREA = "TEXT_AREA"
    case sELECT = "SELECT"
    case mULTI_SELECT = "MULTI_SELECT"
    case dESCRIPTION = "DESCRIPTION"
    case rADIO_BOX = "RADIO_BOX"
    case cHECKBOX = "CHECKBOX"
    case sLIDER = "SLIDER"
}
