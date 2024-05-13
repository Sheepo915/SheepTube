package controller

import (
	"SheepTube/api/model"
	"SheepTube/api/parameter"
	"SheepTube/api/utils"
	"database/sql"
	"log"
	"net/http"
	"time"
)

func APILogin(db *sql.DB) func(http.ResponseWriter, *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		var parameter parameter.LoginParameter

		if err := utils.JSONValidator(request.Body, &parameter); err != nil {
			utils.RespondWithError(response, http.StatusBadRequest, "Invalid Request Payload")
			return
		}

		if isEmailValid, err := utils.EmailFormatValidator(parameter.Email); err != nil || !isEmailValid {
			utils.RespondWithError(response, http.StatusBadRequest, "Invalid Email")
			return
		}

		defer request.Body.Close()

		timeNow := time.Now()
		user := model.User{}
		jwt, err := user.Login(&parameter, db, timeNow)
		if err != nil {
			switch err {
			case model.ErrNotAuthorized:
				utils.RespondWithError(response, http.StatusNotFound, "Not Authorized")
			default:
				log.Println("Internal Server Error:", err)
				utils.RespondWithError(response, http.StatusInternalServerError, "Failed to Login")
			}
			return
		}

		http.SetCookie(response, &http.Cookie{Name: "accessToken", Domain: "/", Value: jwt.AccessToken, Expires: time.Now().Add(time.Minute * 15), HttpOnly: true})
		http.SetCookie(response, &http.Cookie{Name: "refreshToken", Domain: "/", Value: jwt.RefreshToken, Expires: time.Now().Add(time.Hour * 24 * 7), HttpOnly: true})

		utils.RespondWithJSON(response, http.StatusOK, map[string]string{"message": "Login Successful", "token": jwt.AccessToken})
	}
}

func APIRegister(db *sql.DB) func(response http.ResponseWriter, request *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		var parameter parameter.RegisterParameter

		if err := utils.JSONValidator(request.Body, &parameter); err != nil {
			utils.RespondWithError(response, http.StatusBadRequest, "Invalid Request Payload")
			return
		}

		if isEmailValid, err := utils.EmailFormatValidator(parameter.Email); err != nil || !isEmailValid {
			utils.RespondWithError(response, http.StatusBadRequest, "Invalid Email")
			return
		}

		defer request.Body.Close()

		user := model.User{}
		if err := user.Register(&parameter, db); err != nil {
			log.Println("Internal Server Error:", err)
			utils.RespondWithError(response, http.StatusInternalServerError, "Failed to Register")
			return
		}

		utils.RespondWithJSON(response, http.StatusOK, map[string]string{"message": "Registration Successful"})
	}
}

func APIUpdate(db *sql.DB) func(response http.ResponseWriter, request *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {

	}
}

func APIForget(db *sql.DB) func(response http.ResponseWriter, request *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {

	}
}

func APILogout(db *sql.DB) func(response http.ResponseWriter, request *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		clearCookie(response, request, "accessToken")
		clearCookie(response, request, "refreshToken")

		utils.RespondWithJSON(response, http.StatusOK, map[string]string{"message": "Logout successful"})
	}
}

func APIVerify(db *sql.DB) func(response http.ResponseWriter, request *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		query := request.URL.Query()

		if err := utils.QueryValidator([]string{"t"}, query); err != nil {
			utils.RespondWithError(response, http.StatusNotFound, "Nothing to see here")
		}

		user := model.User{}
		if err := user.Verify(query.Get("t"), db); err != nil {
			utils.RespondWithError(response, http.StatusNotAcceptable, "Not authenticated")
		}

		response.Header().Add("Location", "http://localhost:5500/")
	}
}

func clearCookie(response http.ResponseWriter, request *http.Request, cookieName string) {
	if cookie, err := request.Cookie(cookieName); err != nil {
		if err != http.ErrNoCookie {
			utils.RespondWithError(response, http.StatusInternalServerError, "Internal Server Error")
		}
	} else {
		cookie.Expires = time.Now().AddDate(0, 0, -1)
		http.SetCookie(response, cookie)
	}
}
