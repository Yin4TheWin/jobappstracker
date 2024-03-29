const { onRequest } = require("firebase-functions/v1/https");

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));

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

app.post('/createaccount', (request, response) => {
    const email=request.query.email;
    const username=request.query.username;
    const password=request.query.password;
    if(!email||!username||!password)
        response.status(400).send({error: "Requires email, username and password"});
    else if(!checkForStrongPassword(password)){
        response.status(400).send({error: "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter and number"});
    } else if(!checkForValidEmail(email)){
        response.status(400).send({error: "Please enter a valid email!"});
    } else if(!checkForValidUsername(username)){
        response.status(400).send({error: "Username must be non-empty and only contain letters or numbers"});
    } else{
        admin.database().ref(`usernames/${username}`).get().then((snapshot)=>{
            if(snapshot.exists()){
                response.status(400).send({error: "Sorry, but an account already exists with this username!"});
            } else{
                admin.auth().createUser({
                    email: email,
                    password: password,
                    displayName: username
                }).then((user)=>{
                    admin.database().ref(`usernames/${username}`).set(user.email).then(()=>{
                        response.status(200).send({message: "Your account has been created! You may now log in with your new credentials."});
                    });
                }).catch((error)=>{
                    response.status(500).send({error: error.message})
                });
            }
        }).catch(error=>{
            response.status(500).send({error: error.message});
        });
    }
});

exports.widgets = onRequest(app);