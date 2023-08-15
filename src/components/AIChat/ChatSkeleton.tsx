import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { Fragment } from "react";

import "../../styles/ChatPage.css";

export default function ChatSkeleton(){
    return (<Fragment>
        <div className="ChatArea">
            <Grid container>
            <Grid item xs={2}/>
            <Grid item xs={8}>
            <Skeleton variant="rectangular">
            <Card
                variant="outlined"
                style={{
                    width: "100%",
                    flex: "none",
                    marginBottom: "3%",
                    alignSelf: "center",
                }}
            >
            <Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Hi, person! 👋
                    </Typography>
                    <Typography variant="body1">
                        I am F.R.A.N.K. 🤖, your Friendly Robotic Assistant for Navigating_career (😉) Knowledge. I'm here to help you find the right career for you. I can help you with the following:
                        <br />
                        <ul>
                            <li>Get information about your job apps (Try, "what jobs am i interviewing for?"")</li>
                            <li>Generate content to strengthen your application (Try "write a follow up email for [name of job]")</li>
                            <li>Answer general questions you have about job searching (Try "what is a good cover letter format?")</li>
                        </ul>
                        Try me out with the text box below! (I'm still learning, so please be patient with me. I'm sure I'll get better with time. 😊)
                    </Typography>
                </CardContent>
            </Fragment>
            </Card>
             </Skeleton>
            </Grid>
            <Grid item xs={2}/>
            </Grid>
            <div className="MessagesArea">
                
            </div>
        </div>
        <div>
            <Skeleton variant="rectangular" style={{
                    width: "90%",
                    marginTop: "1%",
                    marginLeft: "5%",
                    height: '5vh',
                }}>
            </Skeleton>
        </div>
        <div>
            
        </div>
        </Fragment>);
}