import { Card, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CategoryCardTypes from "../../globals/types/CategoryCardTypes";
export default function CategoryCard({title, titleColor, isOwner, toggleModal, setFormState} : CategoryCardTypes){
    return (
        <Card variant="outlined" sx={{width: '100%', height: '100%',  backgroundColor: '#f7f7f7', position: 'relative'}}>
            <p className="mini center" style={{color: titleColor, marginTop: '2%'}}>{title}</p>    
            {isOwner && <IconButton style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
            }}
            onClick={()=>{ 
                toggleModal()
                setFormState({type: 'CHANGE_ALL', payload: {category: title, date: "", color: titleColor, company: "", position: "", link: "", notes: "", recruiterContact: "", recruiterName: "", deadlines: []}})
            }}
            >
                <AddIcon/> 
            </IconButton>  }
        </Card>
    )
}