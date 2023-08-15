import { Fragment } from "react";
import '../../styles/ChatItem.css'
import { MessageType } from "../../globals/types/MessageTypes";


export default function ChatItem({msg, author}: MessageType){
    return(<Fragment>
        <p className={author.toLowerCase().replaceAll(".", "")}>{author}</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <p style={{textAlign: 'left', color:author.toLowerCase()==='you'?'black':'rgb(1, 36, 154)', width: '85vw'}}>{msg.split("\n").map(str=><p style={{textAlign: 'left', color:author.toLowerCase()==='you'?'black':'rgb(1, 36, 154)', width: '85vw'}}>{str}</p>)}</p>
        </div>
        {/* {extractLinkFromText(message, author)} */}
        <hr style={{width: '90vw'}}/>
    </Fragment>)
}