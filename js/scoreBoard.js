fetchScores();

function fetchScores() {
    // Specify the URL of the API endpoint
    const url = 'http://127.0.0.1:8080/scores';

    var scoreTab = document.getElementById("scoreTab");

    // Use the fetch API to send a GET request to the URL
    fetch(url)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response body
            return response.json();
        })
        .then(data => {
            // Process the data (the array of scores)
            console.log(data); // Log the scores to the console for now
            var i = 0;

            // Here, you can update your webpage's DOM based on the scores.
            // For example, you might iterate over the scores and display them in a list.
            data.ScoreBoard.forEach(user => {
                
                i++
                let newLine = document.createElement("tr");

                let rankCol = document.createElement("th");
                rankCol.textContent = i;
                newLine.appendChild(rankCol);

                let nameCol = document.createElement("th");
                nameCol.textContent = user.username;
                newLine.appendChild(nameCol);

                let scoreCol = document.createElement("th");
                scoreCol.textContent = user.score;
                newLine.appendChild(scoreCol);

                let timeCol = document.createElement("th");
                timeCol.textContent = user.time;
                newLine.appendChild(timeCol);

                scoreTab.appendChild(newLine);
                console.log(user);
            });
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with your fetch operation:', error);
        });
}


