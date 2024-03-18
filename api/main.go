package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"text/template"
)

type UserScore struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Score    int    `json:"score"`
	Time     string `json:"time"`
}

var userScore UserScore
var id = 0

func main() {

	_, err := os.Stat("./score.json")
	if os.IsNotExist(err) {
		fmt.Println("score.json doesn't exist")
	} else {
		fmt.Println("score.json exists")
		os.Remove("score.json")
	}

	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))

	http.HandleFunc("/", submitScore)
	http.HandleFunc("/score", postScore)
	http.HandleFunc("/scores", fetchScores)

	log.Println("Starting server on http://127.0.0.1:8080")
	http.ListenAndServe(":8080", nil)

}

func postScore(w http.ResponseWriter, r *http.Request) {

	tmpl := template.Must(template.ParseFiles("score.html"))

	fmt.Println(userScore)
	tmpl.Execute(w, userScore)
}

func fetchScores(w http.ResponseWriter, r *http.Request) {
	// Only allow GET requests for this handler
	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// Open and read the score.json file
	file, err := os.Open("score.json")
	if err != nil {
		http.Error(w, "Error opening score file.", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Deserialize the JSON data into the UserBoard struct
	var scores UserBoard
	err = json.NewDecoder(file).Decode(&scores)
	if err != nil {
		http.Error(w, "Error decoding score data.", http.StatusInternalServerError)
		return
	}

	// Set the content type to application/json
	w.Header().Set("Content-Type", "application/json")

	// Serialize the UserBoard struct back to JSON and send it in the response
	json.NewEncoder(w).Encode(scores)
}

type UserBoard struct {
	ScoreBoard []UserScore
}

var scoreBoard UserBoard

func submitScore(w http.ResponseWriter, r *http.Request) {
	var username string
	var scoreStr string
	var time string
	var score int
	var err error

	tmpl := template.Must(template.ParseFiles("./index.html"))

	if r.Method == "POST" {
		username = r.FormValue("username")
		scoreStr = r.FormValue("player-score")
		time = r.FormValue("time-elapsed")
		id++

		score, err = strconv.Atoi(scoreStr)
		if err != nil {
			panic(err)
		}
	}

	userScore = UserScore{
		Id:       id,
		Username: username,
		Score:    score,
		Time:     time,
	}

	if username != "" {
		scoreBoard.ScoreBoard = append(scoreBoard.ScoreBoard, userScore)
	}

	sort.Slice(scoreBoard.ScoreBoard, func(i, j int) bool {
		return scoreBoard.ScoreBoard[i].Score > scoreBoard.ScoreBoard[j].Score
	})

	data, _ := json.Marshal(scoreBoard)

	file, err := os.OpenFile("score.json", os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		fmt.Println("Couldn't create score.json")
	}

	if _, err = file.Write(data); err != nil {
		panic(err)
	}

	fmt.Println(userScore)
	tmpl.Execute(w, userScore)
}
