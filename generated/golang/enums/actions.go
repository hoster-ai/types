package contracts

// ActionsEnum enum values
type ActionsEnum string

const (
	ActionsEnumCREATE ActionsEnum = "CREATE"
	ActionsEnumRENEW ActionsEnum = "RENEW"
	ActionsEnumUPGRADE ActionsEnum = "UPGRADE"
	ActionsEnumDOWNGRADE ActionsEnum = "DOWNGRADE"
	ActionsEnumSUSPEND ActionsEnum = "SUSPEND"
	ActionsEnumUNSUSPEND ActionsEnum = "UNSUSPEND"
	ActionsEnumDELETE ActionsEnum = "DELETE"
)
