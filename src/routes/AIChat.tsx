import "../styles/ChatPage.css";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    InputAdornment,
    Grid,
    IconButton,
    Select,
    MenuItem,
} from "@mui/material";
import { Fragment, useEffect, useState, useRef } from "react";
import ChatItem from "../components/AIChat/ChatItem";
import { ThreeDots } from "react-loader-spinner";
import SendIcon from '@mui/icons-material/Send';
import { HistoryType, MessageType } from "../globals/types/MessageTypes";
import SiteNavbar from "./Navbar";

import { db, firebase } from "../globals/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import Login from "../components/Login";
import { get, ref } from "firebase/database";
import ChatSkeleton from "../components/AIChat/ChatSkeleton";
import JobAppFieldsTypes from "../globals/types/JobAppFieldsTypes";
import getSpecificListData from "../globals/getSpecificListData";

async function sendBotResponse(query: string, history: HistoryType[], username: string, listData: {
    [category: string]: {
        [job: string]: JobAppFieldsTypes
    }
}|null = null) {
    console.log(listData)
    let newQuery = "";
    let applied={}, interviewing={}, offered={}, rejected={}
    if(listData!==null){
        if(listData["applied"])
            applied = listData["applied"]
        if(listData["interviewing"])
            interviewing = listData["interviewing"]
        if(listData["offered"])
            offered = listData["offered"]
        if(listData["rejected"])
            rejected = listData["rejected"]
    }
    if(history.length>0){
        newQuery += "Here's what we've talked about so far:\n";
        history.forEach((h: HistoryType) => {
            newQuery += `Q: ${h.question}\nA: ${h.answer}\n`;
        });
        newQuery += `Here's my new question: ${query}`;
    } else{
        newQuery = query;
    }
    const response = await fetch("https://frankai.franklinyin.com/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: newQuery, name: username, applied: applied, interviewing: interviewing, offered: offered, rejected: rejected }),
    })
    .then((res) => {
        return res.json();
    })
    .then((msg) => {
        console.log("message", msg);
        return msg.response.replaceAll("A: ", "");
    })
    .catch((err) => {
        console.log(err.message);
    });
    return response;
}

function AIChat() {
    const [user] = useAuthState(getAuth(firebase));
    const [username, setUsername] = useState("")

    const [loading, setLoading] = useState(true)

    const [listNames, setListNames] = useState<string[]>([])
    const [selectedListIndex, setSelectedListIndex] = useState(0)
    const [selectedListData, setSelectedListData] = useState<{
        [category: string]: {
            [job: string]: JobAppFieldsTypes
        }
    }|null>(null)

    const [query, setQuery] = useState("");
    const [queryText, setQueryText] = useState("");

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [history, setHistory] = useState<HistoryType[]>([]);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        if(messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const blockQueries = useRef(false);

    useEffect(() => {
        scrollToBottom();
      }, [messages]);

    useEffect(() => {
    if(user){
        setUsername(user.displayName!)
        get(ref(db, `users/${user.displayName}/listNames`)).then((snapshot) => {
            if(snapshot.exists()){
                setListNames(Object.keys(snapshot.val()))
            } else {
                setListNames([])
            }
        }).then(()=>{
            setLoading(false)
        }).catch(() => {
            setListNames([])
            setLoading(false)
        })
    }
    }, [user])
    
    useEffect(() => {
        if (!blockQueries.current && query.length > 0) {
            blockQueries.current = true;
            setQuery("");
            sendBotResponse(query, history, username, selectedListData).then((res) => {
                setMessages((m) => [...m, { msg: res, author: "F.R.A.N.K." }]);
                setHistory((h) => [...h.slice(-4), { question: query, answer: res }]);
                blockQueries.current = false;
            });
        }
    }, [query, history, username, selectedListData]);

    return (
        <div>
            <SiteNavbar/>
            {(localStorage.getItem('auth')!==null && localStorage.getItem('auth')!.length>0) ?
            loading?<ChatSkeleton/>:
            <Fragment>
            <div className="ChatArea">
                <Grid container>
                <Grid item xs={2}/>
                <Grid item xs={8}>
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
                                Hi, {username}! 👋
                            </Typography>
                            <Typography variant="body1">
                                I am F.R.A.N.K. 🤖, your Friendly Robotic Assistant for Navigating_career (😉) Knowledge. I'm here to help you find the right career for you. I can help you with the following:
                                <br />
                                <ul>
                                    <li>Get information about your job apps (Try, "what jobs am i interviewing for?"")</li>
                                    <li>Generate content to strengthen your application (Try "write a follow up email for [name of job]")</li>
                                    <li>Answer general questions you have about job searching (Try "what is a good cover letter format?")</li>
                                </ul>
                                Select one of your job lists to use as my knowledge base, then ask me a question!
                            </Typography>
                        </CardContent>
                    </Fragment>
                </Card>
                </Grid>
                <Grid item xs={2}/>
                </Grid>
                <div className="MessagesArea">
                    {messages.map((message, index) => {
                        return (
                            <ChatItem
                                key={index}
                                msg={message.msg}
                                author={message.author}
                            />
                        );
                    })}
                </div>
                <ThreeDots
                    height="50"
                    width="50"
                    radius="7"
                    color="#8080ff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{ marginLeft: "5vw" }}
                    visible={blockQueries.current}
                />
                <div ref={messagesEndRef} />
            </div>
            <div>
                <div style={{
                    width: "90%",
                    marginTop: "1%",
                    marginLeft: "5%",
                }}>
                    <Typography color="black">
                        My current knowledge base is: <Select
                        value={listNames.length>0?listNames[selectedListIndex]:undefined}
                        onChange={(e) => {
                            if(listNames.indexOf(e.target.value as string)!==selectedListIndex)
                                setSelectedListData(null)
                            setSelectedListIndex(listNames.indexOf(e.target.value as string))
                        }}
                        sx={{
                            backgroundColor: "white"
                        }}
                        >
                        {
                            listNames.map((name, index) => {
                                return <MenuItem key={index} value={name}>{name}</MenuItem>
                            })
                        }
                        </Select>
                    </Typography>
                 </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (queryText.length > 0 && !blockQueries.current) {
                            if(selectedListData===null){
                                getSpecificListData(username, listNames[selectedListIndex]).then((data) => {
                                    console.log(data)
                                    setSelectedListData(data["jobs"])
                                    setQuery(queryText);
                                    setMessages((m) => [
                                        ...m,
                                        { msg: queryText, author: "You" },
                                    ]);
                                    setQueryText("");
                                })
                            } else{
                                setQuery(queryText);
                                setMessages((m) => [
                                    ...m,
                                    { msg: queryText, author: "You" },
                                ]);
                                setQueryText("");
                            }
                        }
                    }}
                >
                    <TextField
                        value={queryText}
                        error={blockQueries.current}
                        onChange={(e) => {
                            setQueryText(e.target.value);
                        }}
                        style={{
                           backgroundColor: "white",
                            width: "90%",
                            marginTop: "1%",
                            marginLeft: "5%",
                        }}
                        label={"Ask me something..."}
                        helperText={
                            blockQueries.current
                                ? "Please wait!"
                                : "Press enter to send."
                        }
                        InputProps={{
                            endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={()=>{
                                    if (queryText.length > 0 && !blockQueries.current) {
                                        if(selectedListData===null){
                                            getSpecificListData(username, listNames[selectedListIndex]).then((data) => {
                                                console.log(data)
                                                setSelectedListData(data["jobs"])
                                                setQuery(queryText);
                                                setMessages((m) => [
                                                    ...m,
                                                    { msg: queryText, author: "You" },
                                                ]);
                                                setQueryText("");
                                            })
                                        } else{
                                            setQuery(queryText);
                                            setMessages((m) => [
                                                ...m,
                                                { msg: queryText, author: "You" },
                                            ]);
                                            setQueryText("");
                                        }
                                    }
                                }}>
                                    <SendIcon/>
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </form>
            </div>
            </Fragment>:<Login/>}
        </div>
    );
}

export default AIChat;