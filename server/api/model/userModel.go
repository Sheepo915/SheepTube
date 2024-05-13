package model

import (
	"SheepTube/api/parameter"
	"SheepTube/api/service"
	"crypto/x509"
	"database/sql"
	"encoding/pem"
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID               uuid.UUID
	Username         string
	Bio              string
	Status           string
	ProfilePicture   string
	Email            string
	Password         string
	EmailValidatedAt time.Time
	CreatedAt        time.Time
	UpdatedAt        time.Time
	LastLoginAt      time.Time
}

type JWT struct {
	AccessToken  string
	RefreshToken string
}

var (
	ErrTokenNotFound   = errors.New("token not found")
	ErrTokenNotSave    = errors.New("failed to save token")
	ErrInvalidateToken = errors.New("token validation failed")
	ErrEmailNotSent    = errors.New("failed to send verification email")
	ErrEmailValidated  = errors.New("user has validated the email")
	ErrUserNotCreated  = errors.New("failed to register new user")
	ErrNotAuthorized   = errors.New("invalid email or password")
	ErrUserExists      = errors.New("user exists")
	ErrServerError     = errors.New("internal server error")
)

func (u *User) Login(parameter *parameter.LoginParameter, db *sql.DB, loginTime time.Time) (JWT, error) {
	q := `SELECT "id", "email", "password" FROM "users" WHERE "email" = $1 LIMIT 1`
	var id, email, password string

	err := db.QueryRow(q, parameter.Email).Scan(&id, &email, &password)
	if err == sql.ErrNoRows {
		return JWT{}, ErrNotAuthorized
	} else if err != nil {
		return JWT{}, ErrServerError
	}

	if err := bcrypt.CompareHashAndPassword([]byte(password), []byte(parameter.Password)); err != nil {
		return JWT{}, ErrNotAuthorized
	}

	tokenPair, err := generateJWTPair(id, loginTime)
	if err != nil {
		return JWT{}, ErrServerError
	}

	return tokenPair, nil
}

func (u *User) Register(parameter *parameter.RegisterParameter, db *sql.DB) error {
	if err := u.emailChecker(parameter.Email, db); err != nil {
		return err
	}

	id, err := uuid.NewV7()
	if err != nil {
		return ErrServerError
	}
	emailVerificationToken, err := generateEmailVerificationToken(id.String())
	if err != nil {
		return err
	}

	log.Print(emailVerificationToken)

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	query := `INSERT INTO "users" ("id", "username", "email", "password") VALUES ($1, $2, $3, $4)`

	if _, err := db.Exec(query, id, parameter.Username, parameter.Email, parameter.Password); err != nil {
		return ErrUserNotCreated
	}

	verificationQuery := `INSERT INTO "email_verification_tokens" ("id", "token") VALUES ($1, $2)`

	if _, err := db.Exec(verificationQuery, id, emailVerificationToken); err != nil {
		return ErrTokenNotSave
	}

	if err := service.SendVerificationEmail(parameter.Email, emailVerificationToken); err != nil {
		return ErrEmailNotSent
	}

	return nil
}

func (u *User) Verify(t string, db *sql.DB) error {
	query := `SELECT "id", "token" FROM "email_verification_tokens" WHERE "token" = $1`

	result, err := db.Query(query, t)
	if err != nil {
		return ErrTokenNotFound
	}

	var (
		id               string
		token            string
		emailValidatedAt time.Time
	)

	if err := result.Scan(&id, &token); err != nil {
		if err == sql.ErrNoRows {
			return ErrTokenNotFound
		}
		return ErrServerError
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	checkUserQuery := `SELECT email_validated_at FROM "users" WHERE "id" = $1`
	if result, err := db.Query(checkUserQuery, id); err != nil {
		return ErrNotAuthorized
	} else {
		result.Scan(&emailValidatedAt)
	}

	if emailValidatedAt.IsZero() {
		return ErrEmailValidated
	}

	if claims, err := decryptEmailVerificationToken(token); err != nil {
		return err
	} else if claims["user_id"] != id {
		return ErrNotAuthorized
	}

	updateUserQuery := `UPDATE "users" SET "email_validated_at" = $1 WHERE "id" = $2`
	if _, err := tx.Exec(updateUserQuery, time.Now(), id); err != nil {
		return ErrServerError
	}

	deleteTokenQuery := `DELETE FROM "email_verification_tokens" WHERE "id" = $1`
	if _, err := tx.Exec(deleteTokenQuery, id); err != nil {
		return ErrServerError
	}

	return nil
}

func (u *User) emailChecker(email string, db *sql.DB) error {
	q := `SELECT COUNT(email) FROM "users" WHERE "email" = $1`

	var count int
	err := db.QueryRow(q, email).Scan(&count)

	if err != nil {
		return ErrServerError
	}

	if count > 0 {
		return ErrUserExists
	}

	return nil
}

func generateJWTPair(userId string, loginTime time.Time) (JWT, error) {
	path, err := filepath.Abs("../api/certs/public_key.pem")
	if err != nil {
		return JWT{}, err
	}

	publicKeyFile, err := os.ReadFile(path)
	if err != nil {
		log.Print(err)
		return JWT{}, err
	}
	block, _ := pem.Decode(publicKeyFile)
	publicKey, err := x509.ParsePKCS1PublicKey(block.Bytes)
	if err != nil {
		log.Print(err)
		return JWT{}, err
	}

	accessClaims := jwt.MapClaims{
		"user_id": userId,
		"exp":     loginTime.Add(time.Minute * 15).Unix(),
	}
	accessToken := jwt.NewWithClaims(jwt.SigningMethodRS256, accessClaims)
	accessTokenString, err := accessToken.SignedString(publicKey)
	if err != nil {
		return JWT{}, err
	}

	refreshClaims := jwt.MapClaims{
		"user_id": userId,
		"exp":     loginTime.Add(time.Hour * 24 * 7).Unix(),
	}
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodRS256, refreshClaims)
	refreshTokenString, err := refreshToken.SignedString(publicKey)
	if err != nil {
		return JWT{}, err
	}

	return JWT{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}

func generateEmailVerificationToken(id string) (string, error) {
	path, err := filepath.Abs("../api/certs/public_key.pem")
	if err != nil {
		return "", err
	}

	publicKeyFile, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}
	publicKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKeyFile)
	if err != nil {
		return "", err
	}

	registrationTime := time.Now()
	claims := jwt.MapClaims{
		"user_id": id,
		"exp":     registrationTime.Add(time.Hour + 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	tokenString, err := token.SignedString(publicKey)
	if err != nil {
		return "", nil
	}

	return strings.Replace(tokenString, ".", "-", 3), nil
}

func decryptEmailVerificationToken(token string) (jwt.MapClaims, error) {
	path, err := filepath.Abs("../api/certs/private_key.pem")
	if err != nil {
		return nil, err
	}

	privateKeyFile, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	privateKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKeyFile)
	if err != nil {
		return nil, err
	}

	parsedToken, err := jwt.Parse(strings.Replace(token, "-", ".", 3), func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return privateKey.Public(), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		return claims, nil
	}

	return nil, ErrInvalidateToken
}
