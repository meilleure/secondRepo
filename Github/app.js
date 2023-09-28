function myFunction() {
    window.open('playerone.html');
    out.innerHTML = ``;

}

{
    
part.style.visibility = 'visible'
parts.style.visibility = 'hidden'
results.style.visibility = 'hidden';
resultcontainer.style.visibility = 'hidden';


}
const battleButton = document.getElementById('battle-button');
const reselectButton = document.getElementById('reselect-button');
const resultContainer = document.getElementById('resultcontainer');
const timeout = document.getElementById('timeout');
const out = document.getElementById('scores');


let player1Data = null;
let player2Data = null;



function showError(message) {
    resultContainer.innerHTML = `<p style="color: red">${message}</p>`;
    resultContainer.style.visibility = 'visible';
}

function calculateScore(data) {
    const followersScore = data.followers;
    const followingScore = data.following;
    const reposScore = data.public_repos / 2;
    return followersScore + followingScore + reposScore;
}

document.getElementById("player1Form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const player1Username = document.getElementById("player1Username").value;

    if (!player1Username) {
        showError("Player One username is required.");
        return;
    }

    fetch(`https://api.github.com/users/${player1Username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                showError("Player One not found on GitHub.");
                return;
            }

            player1Data = data;
            document.getElementById("player1DetailsDiv").removeAttribute("hidden");
            document.getElementById("player1Name").innerHTML = `Name: ${data.name}`;
            document.getElementById("playerUsername").innerHTML = `Username: ${data.login}`;
            document.getElementById("player1FollowerCount").innerHTML = `Followers: ${data.followers}`;
            document.getElementById("player1FollowingCount").innerHTML = `Following: ${data.following}`;
            document.getElementById("player1public_reposCount").innerHTML = `Public Repos: ${data.public_repos}`;
            document.getElementById("player1Avatar").src = data.avatar_url;
            part.style.visibility = 'hidden';
            parts.style.visibility = 'visible';
            results.style.visibility = 'hidden';
            resultcontainer.style.visibility = 'hidden';
        })
        .catch(error => console.error(error));
});

document.getElementById("player2Form").addEventListener("submit", (event) => {
    event.preventDefault();

    const player2Username = document.getElementById("player2Username").value;

    
    fetch(`https://api.github.com/users/${player2Username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                showError("Player Two not found on GitHub.");
                return;
            }
            setTimeout(() =>  {
            player2Data = data;
            document.getElementById("player2DetailsDiv").removeAttribute("hidden");
            document.getElementById("player2Name").innerHTML = `Name: ${data.name}`;
            document.getElementById("playerUsername1").innerHTML = `Username: ${data.login}`;
            document.getElementById("player2FollowerCount").innerHTML = `Followers: ${data.followers}`;
            document.getElementById("player2FollowingCount").innerHTML = `Following: ${data.following}`;
            document.getElementById("player2public_reposCount").innerHTML = `Public Repos: ${data.public_repos}`;
            document.getElementById("player2Avatar").src = data.avatar_url;
            out.innerHTML = ``;
            timeout.innerHTML = ``;
            part.style.visibility = 'hidden';
            parts.style.visibility = 'hidden';
            results.style.visibility = 'visible';
            resultcontainer.style.visibility = 'hidden';
        }, 1000); 

        if (!player2Username) {

            showError("Player Two username is required.");
    
        }

        })
        .catch(error => console.error(error));
});


function displayResults() {


        if (player1Data && player2Data) {
            const player1Score = player1Data.followers + player1Data.following + player1Data.public_repos / 2;
            const player2Score = player2Data.followers + player2Data.following + player2Data.public_repos / 2;

            let resultMessage = "";
            if (player1Score > player2Score) {
                resultMessage = `<h3>Player 1 wins with a score of ${player1Score}!</h3>
                <h3>Player 2 scored ${player2Score}!<h3>`;
            } else if (player2Score > player1Score) {
                resultMessage = `<h3>Player 2 wins with a score of ${player2Score}!</h3>
                <h3>Player 1 scored ${player1Score}!!</h3>`;

            } else {

                resultMessage = "It's a tie!";
            }
            
            resultContainer.innerHTML = `<h3>${resultMessage}</h3>`;
            resultContainer.style.visibility = 'visible';
            timeout.innerHTML = ``
            
        } 

    };


reselectButton.addEventListener('click', () => {
    window.open('playerone.html');
    playerUsername.value = '';
    playerUsername1.value = '';
    resultContainer.innerHTML = '';
});

