export default function JobList({listId,username}: {listId: string, username: string}){
    return (<>
        <h1>
            {listId}
        </h1>
        <p className="mini">
            By {username}
        </p>
    </>)
}