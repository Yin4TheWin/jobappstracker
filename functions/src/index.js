const { onRequest } = require("firebase-functions/v2/https");

const admin = require("firebase-admin");
admin.initializeApp();

function checkForStrongPassword(password){
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

function checkForValidEmail(email){
    return email.split("@").length===2 && email.split("@")[1].split(".").length===2;
}

function checkForValidUsername(username){
    return username.match("^[A-Za-z0-9]+$");
}

exports.createaccount = onRequest({cors: [/jobappstracker\.com$/]}, (request, response) => {
    const email=request.query.email;
    const username=request.query.username;
    const password=request.query.password;
    if(!checkForStrongPassword(password)){
        response.status(400).json({error: "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter and number"});
    } else if(!checkForValidEmail(email)){
        response.status(400).json({error: "Please enter a valid email!"});
    } else if(!checkForValidUsername(username)){
        response.status(400).json({error: "Username must be non-empty and only contain letters or numbers"});
    } else{
        admin.database().ref(`usernames/${username}`).get().then((snapshot)=>{
            if(snapshot.exists()){
                response.status(400).json({error: "Sorry, but an account already exists with this username!"});
            } else{
                admin.auth().createUser({
                    email: email,
                    password: password,
                    displayName: username
                }).then((user)=>{
                    admin.database().ref(`usernames/${username}`).set(user.email).then(()=>{
                        response.status(200).json({message: "Your account has been created! You may now log in with your new credentials."});
                    });
                }).catch((error)=>{
                    response.status(500).json({error: error.message})
                });
            }
        }).catch(error=>{
            response.status(500).json({error: error.message});
        });
    }
});