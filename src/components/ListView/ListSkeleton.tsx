import { Grid, Skeleton } from "@mui/material";

export default function ListSkeleton(){
    return (<>
    <Skeleton variant="text" width="50%" height="7vh"/>
    <Skeleton variant="text" width="30%" height="5vh"/>
    <Skeleton variant="text" width="70%" height="5vh"/>
    <Grid container spacing={2} sx={{marginTop: '1%', minHeight: '70vh'}}>
        <Grid item xs={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height="100%"/>
        </Grid>
        <Grid item xs={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height="100%"/>
        </Grid>
        <Grid item xs={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height="100%"/>
        </Grid>
        <Grid item xs={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height="100%"/>
        </Grid>
    </Grid>
    </>)
}