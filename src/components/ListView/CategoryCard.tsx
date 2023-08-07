import { Card, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function CategoryCard({title, titleColor, isOwner} : {title: string, titleColor: string, isOwner: boolean | null | undefined}){
    return (
        <Card variant="outlined" sx={{width: '100%', height: '100%',  backgroundColor: '#f7f7f7', position: 'relative'}}>
            <p className="mini center" style={{color: titleColor, marginTop: '2%'}}>{title}</p>    
            {isOwner && <IconButton style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
            }}>
                <AddIcon/> 
            </IconButton>  }
        </Card>
    )
}