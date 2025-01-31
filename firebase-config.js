const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Score Save Function (With Authentication)
function saveScore(score) {
    const user = firebase.auth().currentUser;
    if (user) {
        database.ref('users/' + user.uid).set({ score: score });
    } else {
        console.error("User not authenticated!");
    }
}

// Leaderboard Function
function getTopPlayers() {
    database.ref('users').orderByChild('score').limitToLast(10).once('value', snapshot => {
        snapshot.forEach(child => {
            console.log(child.key + ': ' + child.val().score);
        });
    });
}
