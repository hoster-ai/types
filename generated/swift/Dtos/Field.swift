import Foundation

struct Field: Codable {
    let id: String
    let label: [MultilangTextDto]
    let value: String
    let type: FieldTypeEnum
    let required: Bool
    let disabled: Bool
    let hidden: Bool
    let regexValidation: String?
    let regexValidationErrorMessage: [MultilangTextDto]?
    let remoteValidation: Bool?
    let remoteValidationErrorMessage: [MultilangTextDto]?
}
