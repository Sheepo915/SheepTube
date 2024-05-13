package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	AppPort string
}

func ApplicationConfig() *AppConfig {
	err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }

	return &AppConfig{
		AppPort: os.Getenv("APP_PORT"),
	}
}
