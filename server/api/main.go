package main

import (
	"SheepTube/api/config"
	"fmt"
)

func main() {
	app := App{}

	pgConfig := config.PGConfig()
	appConfig := config.ApplicationConfig()

	app.Initialize(pgConfig.DBUser, pgConfig.DBPassword, pgConfig.DBName)

	app.Run(fmt.Sprintf(":%s", appConfig.AppPort))
}
