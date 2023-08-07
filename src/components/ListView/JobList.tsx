import { Stack, Switch } from "@mui/material";
import { User } from "firebase/auth";
import togglePrivacy from "../../functions/togglePrivacy";

export default function JobList({listId, username, user, isPrivate}: {listId: string, username: string, user: User|null|undefined, isPrivate: boolean}){
    const isOwner = (user && user.displayName === username)
    return (<>
        <h1>
            {listId}
        </h1>
        <p className="mini">
            By {username}
        </p>
        {isOwner && 
        <Stack direction="row" spacing={1} alignItems="center">
        <Switch
        checked={isPrivate}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#000',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            },
        }}
        onChange={()=>{
            togglePrivacy(username, listId, !isPrivate)
        }}
        />
        <p className="mini bold">This list is {isPrivate?"private: only you can view it.":"public: anyone with the link can view it."}</p>
        </Stack>
        }
        <p className="mini">{isOwner ? "Click the \"plus\" icon under any category to add a job to that category, click a job title to view/edit details for that job, or drag and drop job cards between panels to organize them.":"Click a job title to view more information about that job."}</p>
    </>)
}