package routes

import (
	"SheepTube/api/controller"
	"database/sql"

	"github.com/gorilla/mux"
)

func RegisterAuthRoutes(r *mux.Router, db *sql.DB) {
	r.HandleFunc("/auth/login", controller.APILogin(db)).Methods("POST")
	r.HandleFunc("/auth/register", controller.APIRegister(db)).Methods("POST")
	r.HandleFunc("/auth/update", controller.APIUpdate(db)).Methods("POST")
	r.HandleFunc("/auth/forget", controller.APIForget(db)).Methods("POST")
	r.HandleFunc("/auth/logout", controller.APILogout(db)).Methods("POST")
	r.HandleFunc("/verify", controller.APIVerify(db)).Methods("GET")
	// r.HandleFunc("/reset").Methods("GET")
}
