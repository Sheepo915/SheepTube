package utils

import (
	"encoding/json"
	"errors"
	"io"
	"net/url"
	"regexp"
)

var (
	ErrInvalidToken   = errors.New("invalid token")
	ErrInvalidPayload = errors.New("invalid request payload")
	ErrInvalidEmail   = errors.New("email is invalid")
)

func JSONValidator(content io.Reader, schema interface{}, strict ...bool) error {
	decoder := json.NewDecoder(content)

	defaultStrict := true
	if len(strict) > 0 {
		defaultStrict = strict[0]
	}

	if defaultStrict {
		decoder.DisallowUnknownFields()
	}

	if err := decoder.Decode(schema); err != nil {
		return ErrInvalidPayload
	}

	return nil
}

func EmailFormatValidator(email string) (bool, error) {
	regex := `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`

	return regexp.Match(regex, []byte(email))
}

func QueryValidator(keys []string, query url.Values) error {
	for _, key := range keys {
		if exist := query.Has(key); !exist {
			return ErrInvalidToken
		}
	}

	return nil
}
