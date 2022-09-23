
import { Box, Button, CircularProgress, Grid, Slide, Stack } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Competence, Diplome, Experience, Language, Presentation } from "../components/dossier";
import EditView from "../components/dossierEdit";
import { folderEditReducer, folderReducer } from "../hooks/Folder";
import { fetchFolder, generateFolder } from "../services/folder";

const Dossier = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    const [success, setSuccess] = React.useState(false);
    const url = React.useMemo(()=>
    (
        process.env.REACT_APP_API_DOMAIN+'/api/v1/folders/'+id
    ),[id]);

    const [editFolder, dispatchEditFolder] = React.useReducer(folderEditReducer,
        {id: false,isUpdate:true, isEdit: false, isPresentation: false, isCompetence: false, isExperience: false, isLanguage: false, isDiplome: false });
    const [folder, dispatchFolder] = React.useReducer(folderReducer,
        {data: [], isLoading: false, isError: false, isSuccess: false, isUploadSuccess: false});

    React.useEffect(()=> {
        if(editFolder.isUpdate)
            fetchFolder(dispatchFolder, url)
    },[url, editFolder.isUpdate]);

    const handleGenerate = () => {
        generateFolder(dispatchFolder, id, navigate);
        
    }

    const handleLoad = () => {
        setSuccess(true);
    }
    return (
        <>
        {folder.isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    >
                    <CircularProgress />
                </Box>
            )}
        {folder.isSuccess && (
            <Grid sx={{py:3, pr:1}} container columnSpacing={2}>
                <Grid  item md={6} sx={{height: "100EM"}}>
                    <iframe  component="iframe" onLoad={handleLoad} title="webviewer" frameBorder="0" width="100%" height="100%" src={`https://docs.google.com/gview?url=${folder.data.original_file}&embedded=true`}></iframe>
                </Grid>
                {success && (
                    <Grid item md={6} sx={{pt:2}}>
                    <Slide direction="up" in={!editFolder.isEdit} mountOnEnter unmountOnExit>
                        <Stack spacing={2}>
                                <Button onClick={handleGenerate}>Construire</Button>
                                <Presentation dispatchEditFolder={dispatchEditFolder} {...folder.data} />
                                <Competence data={folder.data.competences} dispatchEditFolder={dispatchEditFolder} />
                                <Language data={folder.data.languages} dispatchEditFolder={dispatchEditFolder} />
                                <Diplome data={folder.data.diploma_set} dispatchEditFolder={dispatchEditFolder} />
                                <Experience data={folder.data.experience_set} dispatchEditFolder={dispatchEditFolder} />


                        </Stack>
                    </Slide>
                    <Slide direction="down" in={editFolder.isEdit} mountOnEnter unmountOnExit>
                        <Box sx={{
                            py:4,
                            px:4,          
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                            }}>
                            <Grid container spacing={2}>
                                <Grid item md={2}>
                                    <Button color="secondary" variant="contained" onClick={()=>dispatchEditFolder({type: 'CLOSE_EDIT'})}>Arrière</Button>
                                </Grid>
                                <Grid item md={12}>
                                    <EditView dispatchEditFolder={dispatchEditFolder} edit={editFolder} folder={folder} url={url}/> 
                                </Grid>
                                
                                
                            </Grid>
                    
                        </Box>
                        
                    </Slide>
                    
                </Grid>
                )}
                
            </Grid>
        )}
            
        </>
    )
}
export default Dossier;