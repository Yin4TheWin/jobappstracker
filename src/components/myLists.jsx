import { signOut } from "firebase/auth"

export default function MyLists({auth, user}){
    return (<div className='mylists-header'>
    <h1>My Job Lists</h1>
    <p className="mini">Currently signed in as {user.email}, <button className="link" type="button" onClick={()=>{
        signOut(auth)
    }}>click here to sign out.</button>  </p>
    <p>To create a new jobs list, enter a list name (eg: Summer Internships 2023) in the text input field, then hit "Create". To edit a list, click on its name in the table below.</p>
    </div>)
}