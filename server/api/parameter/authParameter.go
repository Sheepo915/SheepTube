package parameter

type LoginParameter struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterParameter struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
