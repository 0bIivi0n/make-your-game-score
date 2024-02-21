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
	Time     string `json:"time"`
}

func main() {

	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))

	http.HandleFunc("/", getScore)

	log.Println("Starting server on http://127.0.0.1:8080")
	http.ListenAndServe(":8080", nil)

}

func getScore(w http.ResponseWriter, r *http.Request) {
	var username string
	var score string
	var time string

	tmpl := template.Must(template.ParseFiles("./index.html"))

	if r.Method == "POST" {
		username = r.FormValue("username")
		score = r.FormValue("player-score")
		time = r.FormValue("time-elapsed")
	}

	var userScore = UserScore{
		Username: username,
		Score:    score,
		Time:     time,
	}

	fmt.Println(userScore)
	tmpl.Execute(w, userScore)

}
