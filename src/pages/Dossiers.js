import { Alert, Backdrop, Box, CircularProgress, Grid, OutlinedInput, Paper, Slider, Snackbar, Stack, Typography } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { foldersReducer } from "../hooks/Folders";
import { fetchAllFolders } from "../services/folders";
import { FolderItem, LangueFilter, SkillFilter, UploadButton } from "../components/dossiers";


const Dossiers = () => {
    const [folders, dispatchFolders] = React.useReducer(foldersReducer,
        {data: [], isLoading: false, isError: false, isSuccess: false, isUploadSuccess: false});
    const [skillsParams, setSkillsParams] = React.useState('');
    const [languagesParams, setLanguagesParams] = React.useState('');
    const [url, setUrl] = React.useState(process.env.REACT_APP_API_DOMAIN+'/api/v1/folders');
    const [openSnack, setOpenSnack] = React.useState(false);

  
    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnack(false);
    };
    React.useEffect(()=>{
        setOpenSnack(true);
    },[folders.isUploadSuccess, folders.isError]);

    React.useEffect(()=>{
        console.log(url)
        fetchAllFolders(dispatchFolders, url);
        
    },[url, folders.isUploadSuccess]);

    React.useEffect(()=>{
        setUrl(process.env.REACT_APP_API_DOMAIN+'/api/v1/folders?'+skillsParams+'&'+languagesParams)
    },[skillsParams, languagesParams])



    return (
        <>
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={folders.isLoading}
                >
                <CircularProgress color="inherit" />
                </Backdrop>
                <>
                    <Box sx={{
                        py:4,
                        px:4,          
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                        }} >
                        <Stack spacing={0} >
                            <Typography align="left" variant="h3">
                                Dossiers
                            </Typography>
                            <Typography align="left" variant="subtitle2" gutterBottom>
                                Les dossiers représentent les cv des condidats.
                            </Typography>
                        </Stack>
                        <UploadButton dispatchFolders={dispatchFolders} />
                    </Box>
                    
                    <Grid container sx={{px:4}}  rowSpacing={2} columnSpacing={2}>
                        <Grid item md={3}>
                            <Stack spacing={2}>
                                <SkillFilter data={folders.data} handleSkillsParams={setSkillsParams} />
                                <Paper sx={{borderRadius:'16px', p:2}}>
                                    <Typography align="left" variant="body2">
                                    Années d'expérience:
                                    </Typography>
                                    <Slider
                                        getAriaLabel={() => 'Age range'}
                                        valueLabelDisplay="auto"
                                        />
                                </Paper>
                                <LangueFilter data={folders.data} handleLanguagesParams={setLanguagesParams}/>
                            </Stack>

                        </Grid>
                        <Grid item md={9}>
                            <Stack spacing={4}>
                                <Paper elevation={1} sx={{ borderRadius: '16px'}}>
                                    <OutlinedInput
                                        sx={{borderRadius: '16px' }}
                                        placeholder="Rechercher dans les dossiers..."
                                        startAdornment={<SearchIcon/>}
                                        fullWidth={true}
                                        type="search"
                                    />
                                </Paper>
                                <Grid container rowSpacing={1}>
                                    {folders.data.map((value)=> (
                                        <FolderItem key={value.id} data={value}/>
                                    ))}
                                </Grid>
                            </Stack>


                        </Grid>
                    </Grid>
                </>
  
            {folders.isUploadSuccess && (
            <Snackbar anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}
            open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
                </Alert>
            </Snackbar>
            )}
            {folders.isError && (
            <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal: 'right' }} open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                Oops!
                </Alert>
            </Snackbar>)}
        </>
        
        
    )
}
export default Dossiers;