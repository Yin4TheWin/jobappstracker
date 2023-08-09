import { useState, useEffect, SetStateAction } from "react";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import {firebase} from '../globals/firebase'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import ModalPopup from "./ModalPoup";

import '../styles/Profile.css'

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

    const [showLoading, toggleLoading] = useState(false)

    const [auth] = useState(getAuth(firebase));

    useEffect(()=>{
        document.title = 'Login';
    },[])

    function checkForValidEmail(email: string){
        return email.split("@").length===2 && email.split("@")[1].split(".").length===2
    }

    function handleAuthentication(){
        toggleLoading(true)
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
                fetch(`https://us-central1-jobappstracker-ae42a.cloudfunctions.net/widgets/createaccount?username=${username}&email=${email}&password=${password}`, {
                    method: "POST",
                }).then((response)=>{
                    return response.json()
                }).then(status=>{
                    if(status.error)
                        generateModal("Signup Failed", status.error)
                    else
                        signInWithEmailAndPassword(auth, email, password)
                })
                .catch(()=>{
                    generateModal("Signup Failed", "Something went wrong. Please try again later.")
                })
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
                <Box
                component="form"
                 onSubmit={(e)=>{
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
                    <TextField
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    />
                </Box>
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
            <ModalPopup showModal={showGeneralModal} toggleModal={()=>{
                toggleGeneralModal(!showGeneralModal)
                toggleLoading(false)}}
             header={generalModalHeader} 
             body={<div>
                <p>{generalModalText}</p>
            </div>
            }
            footer={<div>
                <Button color="primary" onClick={()=>{
                    toggleGeneralModal(!showGeneralModal)
                    toggleLoading(false)
                }}>OK</Button>
            </div>
            }/>
            <h1>{loginState?"Log In":"Sign Up"}</h1>
            <p className="emphasize">{loginState?"Welcome back! Your job lists have been waiting for you.":"Welcome! You're one step away from organizing your job search."}</p>
            <p style={{textAlign:'center'}}>{loginState?"Don't have an account?":"Already have an account?"} <button className="link" onClick={() =>{ 
                toggleLoginState(!loginState) }}>Click here</button> to {loginState?"sign up":"log in"}</p>  
            <Box
            component="form" 
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
            }}
            onSubmit={(e)=>{
                e.preventDefault()
                handleAuthentication()  
            }}>
                {
                    !loginState?
                    <TextField
                    id="username"
                    label="Username"
                    type="text"
                    className="login"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    />:<></>
                }
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    className="login"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    className="login"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                    {
                        !loginState?
                        <TextField
                            id="confirm-password"
                            label="Confirm Password"
                            type="password"
                            className="login"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmedPassword(e.target.value)
                            }}
                        />:<></>
                    }
                    <p style={{fontSize: 15}}>
                        Forgot password? <button className="link" type="button" onClick={()=>{
                            toggleModal(true)
                        }}>Click here.</button>    
                    </p>
                <LoadingButton loading={showLoading} variant="contained" type="submit" size="large" color="primary" className="center">Submit</LoadingButton>
            </Box>
        </div>
    )
}