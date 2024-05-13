package utils

type HttpError struct {
	code    int
	message string
}

func Error(code int, message string) *HttpError {
	return &HttpError{
		code:    code,
		message: message,
	}
}