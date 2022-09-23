import { Box, Button, Card, CardActionArea, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';


const Presentation = ({first_name, last_name, diploma_level, birthday, dispatchEditFolder}) => {

    return (
        <Card elevation={1} sx={{p:2, borderRadius: '16px'}}>
                <Box sx={{
                    py:4,
                    px:4,          
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                    }}>
                    <Typography gutterBottom variant="h5" component="div">
                    Présentation
                    </Typography>
                    
                </Box>
                <Divider />
                <CardContent >
                    <CardActionArea onClick={() => dispatchEditFolder({type: 'EDIT_PRESENTATION'})}>
                        <Grid container>
                            <Grid item md={6}>
                                <Typography variant="h6" align="left" gutterBottom >Nom:</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant="body2" align="left">{last_name}</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant="h6" align="left">Prénom:</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant="body2"align="left">{first_name}</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant="h6" align="left">Niveau de diplôme:</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant="body2" align="left">{diploma_level}</Typography>
                            </Grid>
                        
                            <Grid item md={6}>
                                <Typography variant="h6" align="left">Année de naissance:</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant="body2" align="left">{birthday}</Typography>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </CardContent>
              </Card>
            

    )
}

const Competence = ({data, dispatchEditFolder}) =>{
    return (
    <Card elevation={1} sx={{p:2, borderRadius: '16px'}}>
        <Box sx={{
            py:4,
            px:4,          
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}>
            <Typography gutterBottom variant="h5" component="div">
            Compétences techniques
            </Typography>

            <Button variant="contained" onClick={() => dispatchEditFolder({type: 'EDIT_COMPETENCE'})}  startIcon={<AddIcon />}>
                Ajouter
            </Button> 
        
            
        </Box>
        <Divider />
        <CardContent >
            {data.map((value)=>(
                 <Chip key={value.id} label={value.label} />
            ))
            }
        </CardContent>
    </Card>
  )
}

const Language = ({data, dispatchEditFolder}) => {
    return (
    <Card elevation={1} sx={{p:2, borderRadius: '16px'}}>
        <Box sx={{
            py:4,
            px:4,          
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}>
            <Typography gutterBottom variant="h5" component="div">
            Langues
            </Typography>

            <Button variant="contained" onClick={() => dispatchEditFolder({type: 'EDIT_LANGUAGE'})}  startIcon={<AddIcon />}>
                Ajouter
            </Button> 
        
            
        </Box>
        <Divider />
        <CardContent >
        {data.map((value)=>(
                 <Chip key={value.id} label={value.label} />
            ))
            }
        </CardContent>
    </Card>
    )
}
const Diplome = ({data, dispatchEditFolder}) => {
    return (
    <Card elevation={1} sx={{p:2, borderRadius: '16px'}}>
        <Box sx={{
            py:4,
            px:4,          
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}>
            <Typography gutterBottom variant="h5" component="div">
            Diplôme
            </Typography>

            <Button variant="contained" onClick={() => dispatchEditFolder({type: 'EDIT_DIPLOME'})}  startIcon={<AddIcon />}>
                Ajouter
            </Button> 
        
            
        </Box>
        <Divider />
        <CardContent >
            {data.map((value)=>(
            <CardContent key={value.id}>
                 <CardActionArea onClick={() => dispatchEditFolder({type: 'EDIT_DIPLOME', payload:value.id})}>
                     <Grid container>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left" gutterBottom >Date de début:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.begin_date}</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Date de fin:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2"align="left">{value.end_date}</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Institut:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.institut}</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Description:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.description}</Typography>
                         </Grid>
                     </Grid>
                 </CardActionArea>
                 <Divider />
             </CardContent>
             
            ))
            }
        </CardContent>
    </Card>
    )
}
const Experience = ({data, dispatchEditFolder}) => {
    return (
    <Card elevation={1} sx={{p:2, borderRadius: '16px'}}>
        <Box sx={{
            py:4,
            px:4,          
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}>
            <Typography gutterBottom variant="h5" component="div">
            Expériences
            </Typography>

            <Button variant="contained" onClick={() => dispatchEditFolder({type: 'EDIT_EXPERIENCE'})}  startIcon={<AddIcon />}>
                Ajouter
            </Button> 
        
            
        </Box>
        <Divider />
        <CardContent >
            {data.map((value)=>(
            <CardContent key={value.id}>
                 <CardActionArea onClick={() => dispatchEditFolder({type: 'EDIT_EXPERIENCE', payload:value.id})}>
                     <Grid container>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left" gutterBottom >Date de début:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.begin_date}</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Date de fin:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2"align="left">{value.end_date}</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Entreprise:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.institut}</Typography>
                         </Grid>
                     
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Titre:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.title}</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="h6" align="left">Description:</Typography>
                         </Grid>
                         <Grid item md={6}>
                             <Typography variant="body2" align="left">{value.description}</Typography>
                         </Grid>
                         <Grid item md={12}>
                         {value.competences.map((item)=>(
                            <Chip key={item.id} label={item.label} />
                            ))
                            }
                         </Grid>
                     </Grid>
                 </CardActionArea>
                 <Divider />
             </CardContent>
             
            ))
            }
        </CardContent>
    </Card>
    )
}
export {Presentation, Competence, Language, Experience, Diplome}