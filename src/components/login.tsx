import { useState, useEffect, SetStateAction } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {firebase} from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

import ModalPopup from "./modal";

import '../styles/profile.css'

export default function Login(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginState, toggleLoginState] = useState(true)
    const [confirmPassword, setConfirmedPassword] = useState("")
    const [showForgotPasswordModal, toggleModal] = useState(false);

    const [showGeneralModal, toggleGeneralModal] = useState(false);
    const [generalModalText, setModalText] = useState("")
    const [generalModalHeader, setModalHeader] = useState("")

    const [auth] = useState(getAuth(firebase));
    const [db] = useState(getDatabase(firebase));

    useEffect(()=>{
        document.title = 'Login';
    },[])

    function checkForStrongPassword(password: string){
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
    }

    function checkForValidEmail(email: string){
        return email.split("@").length===2 && email.split("@")[1].split(".").length===2
    }

    function checkForValidUsername(username: string){
        return username.match("^[A-Za-z0-9]+$");
    }

    function handleAuthentication(){
        if(loginState) {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
            })
            .catch((error) => {
                const errorMessage = error.message;
                generateModal("Sign In Failed", errorMessage)
            })
        }
        else {
            if(password !== confirmPassword)
                generateModal("Passwords Don't Match!", "Please ensure \"Password\" and \"Confirm password\" fields are the same.")
            else {
                if(checkForStrongPassword(password)) {
                    if(checkForValidUsername(username)){
                        get(ref(db,'usernames/'+username.toLowerCase())).then((snapshot)=>{
                            if(snapshot.exists()){
                                generateModal("Username Taken", "Sorry, but an account already exists with this username!")
                            } else {
                                createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    const user=userCredential.user;
                                    updateProfile(user, {
                                        displayName: username.toLowerCase()
                                    }).then(()=>{
                                        console.log(user)
                                        set(ref(db, 'usernames/'+user.displayName), email)
                                    }).catch((error) => {
                                        const errorMessage = error.message;
                                        console.log(errorMessage)
                                    })
                                })
                                .catch((error) => {
                                    const errorMessage = error.message;
                                    generateModal("Sign Up Failed", errorMessage)
                                })
                            }
                        }).catch(error=>{
                            const errorMessage = error.message;
                            generateModal("Sign Up Failed", errorMessage)
                        })
                    } else
                        generateModal("Bad Username", "Username must exist and contain only letters and numbers.")   
                }
                else
                    generateModal("Password Not Secure!", "Please ensure your password is at least eight characters long and contains at least one uppercase letter, one lowercase letter, and one number.")
            }   
        }     
    }

    function generateModal(header: SetStateAction<string>, body: SetStateAction<string>){
        setModalHeader(header)
        setModalText(body)
        toggleGeneralModal(true)
    }
    
    return (
        <div className="login-header">
            <ModalPopup showModal={showForgotPasswordModal} toggleModal={()=>{toggleModal(!showForgotPasswordModal)}}
             header={"Forgot Password?"} 
             body={<div>
                <p>Enter the email address you made your account with and press submit to receive a password reset email.</p>
                <Form onSubmit={(e)=>{
                    e.preventDefault()
                    if(checkForValidEmail(email)){
                        sendPasswordResetEmail(auth,email).then(()=>{
                            generateModal("Check Your Inbox", "If we have your email on file, we'll send a password reset email shortly.")  
                        }).catch((err)=>{
                            generateModal("Something went wrong", err.message)
                        })
                    } else{
                        generateModal("Invalid Email", "Please make sure the inputted email is valid.")
                    }
                }}>
                    <Form.Group>
                      <Form.Control type="email" placeholder="example@email.com" value={email}  onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    </Form.Group>
                </Form>
            </div>
            }
            footer={<div>
                <Button color="primary" onClick={()=>{
                    if(checkForValidEmail(email)){
                        sendPasswordResetEmail(auth,email).then(()=>{
                            generateModal("Check Your Inbox", "If we have your email on file, we'll send a password reset email shortly.")  
                        }).catch((err)=>{
                            generateModal("Something went wrong", err.message)
                        })
                    } else{
                        generateModal("Invalid Email", "Please make sure the inputted email is valid.")
                    }
                }}>Submit</Button>{' '}
                <Button color="secondary" onClick={()=>{toggleModal(!showForgotPasswordModal)}}>Cancel</Button>
            </div>
            }/>
            <ModalPopup showModal={showGeneralModal} toggleModal={()=>{toggleGeneralModal(!showGeneralModal)}}
             header={generalModalHeader} 
             body={<div>
                <p>{generalModalText}</p>
            </div>
            }
            footer={<div>
                <Button color="primary" onClick={()=>{toggleGeneralModal(!showGeneralModal)}}>OK</Button>
            </div>
            }/>
            <h1>{loginState?"Log In":"Sign Up"}</h1>
            <p style={{textAlign:'center'}}>{loginState?"Don't have an account?":"Already have an account?"} <button className="link" onClick={() =>{ 
                toggleLoginState(!loginState) }}>Click here</button> to {loginState?"sign up":"log in"}</p>  
            <Form onSubmit={(e)=>{
                    e.preventDefault()
                    handleAuthentication()  
                }}>
                {
                    !loginState?
                    <Form.Group>
                        <Form.Label size="lg">Username</Form.Label>
                        <Form.Control className="login" value={username} type="text" name="username" id="username" placeholder="enter a username" size="lg" onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                    </Form.Group>:<></>
                }
                <Form.Group>
                    <Form.Label size="lg">Email</Form.Label>
                    <Form.Control className="login" type="email" name="email" id="email" value={email} placeholder="email@example.com" size="lg" onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label size="lg">Password</Form.Label>
                    <Form.Control className="login" type="password" name="password" id="password" placeholder="enter password" size="lg" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    {
                        !loginState?
                        <div>
                            <Form.Label size="lg">Confirm Password</Form.Label>
                            <Form.Control className="login" value={confirmPassword} type="password" name="Confirm Password" id="confirm" placeholder="re-enter password" size="lg" onChange={(e) => {
                                setConfirmedPassword(e.target.value)
                            }} />
                        </div>:<></>
                    }
                    <p style={{fontSize: 15}}>
                        Forgot password? <button className="link" type="button" onClick={()=>{
                            toggleModal(true)
                        }}>Click here.</button>    
                    </p>
                </Form.Group>
                <Button type="submit" size="lg" color="primary" className="center">{loginState?"Log In":"Sign Up"}</Button>
            </Form>
        </div>
    )
}