package routes

import (
	"SheepTube/api/controller"

	"github.com/gorilla/mux"
)

func RegisterVideoRoutes(r *mux.Router) {
	r.HandleFunc("/videos", controller.APIGetVideos).Methods("GET")
}
