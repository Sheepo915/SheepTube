package enum

type UserStatusEnum struct {
	Active    string
	Inactive  string
	Suspended string
}

var UserStatus = UserStatusEnum{
	Active:    "active",
	Inactive:  "inactive",
	Suspended: "suspended",
}

type VideoVisibilityEnum struct {
	Public  string
	Private string
}

var UserVisibility = UserStatusEnum{
	Active:    "active",
	Inactive:  "inactive",
	Suspended: "suspended",
}
