package contracts

// FieldTypeEnum enum values
type FieldTypeEnum string

const (
	FieldTypeEnumTEXT_BOX FieldTypeEnum = "TEXT_BOX"
	FieldTypeEnumTEXT_AREA FieldTypeEnum = "TEXT_AREA"
	FieldTypeEnumSELECT FieldTypeEnum = "SELECT"
	FieldTypeEnumMULTI_SELECT FieldTypeEnum = "MULTI_SELECT"
	FieldTypeEnumDESCRIPTION FieldTypeEnum = "DESCRIPTION"
	FieldTypeEnumRADIO_BOX FieldTypeEnum = "RADIO_BOX"
	FieldTypeEnumCHECKBOX FieldTypeEnum = "CHECKBOX"
	FieldTypeEnumSLIDER FieldTypeEnum = "SLIDER"
)
