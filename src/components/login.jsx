import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {firebase} from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import ModalPopup from "../components/modal";

import '../styles/profile.css'

export default function Login(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loginState, toggleLoginState] = React.useState(true)
    const [confirmPassword, setConfirmedPassword] = React.useState("")
    const [showForgotPasswordModal, toggleModal] = React.useState(false);

    const [showGeneralModal, toggleGeneralModal] = React.useState(false);
    const [generalModalText, setModalText] = React.useState("")
    const [generalModalHeader, setModalHeader] = React.useState("")

    const [auth] = React.useState(getAuth(firebase));

    function checkForStrongPassword(password){
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
    }

    function checkForValidEmail(email){
        return email.split("@").length===2 && email.split("@")[1].split(".").length===2
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
                    createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        generateModal("Sign Up Failed", errorMessage)
                    })
                }
                else
                    generateModal("Password Not Secure!", "Please ensure your password is at least eight characters long and contains at least one uppercase letter, one lowercase letter, and one number.")
            }   
        }     
    }

    function generateModal(header, body){
        toggleGeneralModal(true)
        setModalHeader(header)
        setModalText(body)
    }
    
    return (
        <div className="login-header">
            <ModalPopup showModal={showForgotPasswordModal} toggleModal={()=>{toggleModal(!showForgotPasswordModal)}}
             header={"Forgot Password?"} 
             body={<div>
                <p>Enter the email address you made your account with and press submit to receive a password reset email.</p>
                <Form>
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
            <Form>
                <Form.Group>
                    <Form.Label for="email" size="lg">Email</Form.Label>
                    <Form.Control className="login" type="email" name="email" id="email" value={email} placeholder="email@example.com" size="lg" onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label for="password" size="lg">Password</Form.Label>
                    <Form.Control className="login" type="password" name="password" id="password" placeholder="enter password" size="lg" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    {
                        !loginState?
                        <div>
                            <Form.Label for="Confirm Password" size="lg">Confirm Password</Form.Label>
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
                <Button size="lg" color="primary" className="center" onClick={()=>{
                       handleAuthentication(auth,loginState,email,password,confirmPassword)  
                }}>{loginState?"Log In":"Sign Up"}</Button>
            </Form>
        </div>
    )
}