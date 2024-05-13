package service

import (
	"net/smtp"
	"strings"
)

var (
	smtpHost     = "smtp.gmail.com"
	smtpPort     = "587"
	smtpUsername = "csymen@gmail.com"
	smtpPassword = "ucfwxcomcuijavza"
)

func SendVerificationEmail(email string, verificationToken string) error {
	// verificationLink := "http://localhost:443/verify?t=" + verificationToken
	// subject := "Verify your email address"
	// body := "Click the following link to verify your email address: " + verificationLink

	// auth := smtp.PlainAuth("", smtpUsername, smtpPassword, smtpHost)

	// to := []string{email}
	// msg := []byte("To: " + strings.Join(to, ",") + "\r\n" +
	// 	"Subject: " + subject + "\r\n" +
	// 	"\r\n" +
	// 	body)

	// err := smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpUsername, to, msg)
	// if err != nil {
	// 	return err
	// }

	return nil
}

func SendForgetPasswordEmail(email string, verificationToken string) error {
	verificationLink := "http://localhost:443/verify?t=" + verificationToken
	subject := "Password reset"
	body := "Click the following link to reset your password: " + verificationLink

	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, smtpHost)

	to := []string{email}
	msg := []byte("To: " + strings.Join(to, ",") + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpUsername, to, msg)
	if err != nil {
		return err
	}

	return nil
}
