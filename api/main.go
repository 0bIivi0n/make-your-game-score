package main

import (
	"fmt"
	"log"
	"net/http"
	"text/template"
)

type UserScore struct {
	Username string `json:"username"`
	Score    string `json:"score"`
}

func main() {

	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))

	http.HandleFunc("/", getScore)

	log.Println("Starting server on http://127.0.0.1:8080")
	http.ListenAndServe(":8080", nil)

}

func getScore(w http.ResponseWriter, r *http.Request) {
	var username string
	var score string

	tmpl := template.Must(template.ParseFiles("./index.html"))

	if r.Method == "POST" {
		username = r.FormValue("username")
		score = r.FormValue("score")
	}

	var userScore = UserScore{
		Username: username,
		Score:    score,
	}

	tmpl.Execute(w, userScore)
	fmt.Println(userScore)

}
