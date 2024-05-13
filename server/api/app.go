package main

import (
	"SheepTube/api/routes"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type App struct {
	Router *mux.Router
	DB     *sql.DB
}

func (a *App) Initialize(user, password, dbName string) {
	connectionString := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", user, password, dbName)

	var err error
	a.DB, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	a.Router = mux.NewRouter()

	routes.RegisterAuthRoutes(a.Router, a.DB)
}

func (a *App) Run(addr string) {
	log.Printf("Server is running on %s", addr)
	log.Fatal(http.ListenAndServe(addr, a.Router))
}
