import { Box, Button, Card, CardActions, CardContent, Checkbox, Chip, Grid, Link as MuiLink, List, ListItem, ListItemButton, ListItemIcon, ListItemText, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import { countBy, find, forEach, intersectionBy } from "lodash";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { uploadFolder } from "../services/folders";

const UploadButton = ({dispatchFolders}) => {

    const handleUploadFile = (event) =>{
        uploadFolder(dispatchFolders, event.target.files[0])
    }
    return (
    <>
     <Button variant="contained" component="label" startIcon={<AddIcon />}>
            Ajouter
        <input hidden accept=".doc,.docx,.pdf" onChange={handleUploadFile} multiple type="file" />
    </Button>
    </>

        
    )
}
const FolderItem = ({data}) => {

    return (
        <Grid item md={4}>
            <Card sx={{mx:1}}>
                <CardContent>
                    <Box sx={{        
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                    }} >
                        <Stack spacing={0} >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {data.diploma_level}
                            </Typography>
                            <Typography variant="h5" component="div">
                            {data.first_name} {data.last_name}
                            </Typography>
                        </Stack>
                        <Button  component={Link} to={`/dossier/${data.id}`} size="small" color="secondary" variant="outlined" startIcon={<EditIcon />}>
                        Modifier
                        </Button>
                    </Box>
                    
                </CardContent>
                <CardActions>
                <Box sx={{        
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                    }} >
                    
                        <Stack direction="row" spacing={2}>
                            <MuiLink href={data.original_file} target="_blank" size="small" color="secondary"    >
                            Télécharger le cv original
                            </MuiLink>
                            {data.target_file && (
                                <MuiLink href={data.target_file} target="_blank" size="small" color="primary"    >
                                Télécharger
                                </MuiLink>
                            )}
                            
                        </Stack>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}
const SkillFilter = ({data, handleSkillsParams}) => {
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    React.useEffect(()=>{
            const search = new URLSearchParams(checked.map(s=>['competences',s])).toString();
            handleSkillsParams(search);
    },[checked, handleSkillsParams])

    const skills = React.useMemo(()=>{
        var all = [];
        forEach(data, function(value) {
            forEach(value['competences'], function(value) {
                all.push(value);
            });
        });
        var uniqAll = intersectionBy(all,'id');
        forEach(countBy(all, 'id'), (value,key) => {
        find(uniqAll,{'id': parseInt(key)})['count']=value;
        });
        return uniqAll;
    },[data]);

    return (
        <Paper sx={{borderRadius:'16px' }} >
            <OutlinedInput
                sx={{borderRadius: '16px' }}
                startAdornment={<SearchIcon/>}
                fullWidth={true}
                placeholder=" Rechercher dans les competences..."
                type="search"
                variant="standard"
                />
            <List sx={{overflow: 'auto', maxHeight: 400}}>
                {skills.map((value) => (
                <ListItem  key={value.id}>
                    <ListItemButton onClick={handleToggle(value.id)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={value.label} />
                        <Chip label={value.count} />
                        </ListItemButton>
                </ListItem>
                ))}
            </List>    
        </Paper>
    )
}
const LangueFilter = ({data, handleLanguagesParams}) => {
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    React.useEffect(()=>{
            const search = new URLSearchParams(checked.map(s=>['languages',s])).toString();
            handleLanguagesParams(search);
    },[checked, handleLanguagesParams])

    const languages = React.useMemo(()=>{
        var all = [];
        forEach(data, function(value) {
            forEach(value['languages'], function(value) {
                all.push(value);
            });
        });
        var uniqAll = intersectionBy(all,'id');
        forEach(countBy(all, 'id'), (value,key) => {
        find(uniqAll,{'id': parseInt(key)})['count']=value;
        });
        return uniqAll;
    },[data]);

    return (
        <Paper sx={{borderRadius:'16px' }} >
            <Typography align="left" variant="body2" sx={{px:2, pt:2}}>
            Langues:
            </Typography>
            <List sx={{overflow: 'auto', maxHeight: 400}}>
                {languages.map((value) => (
                <ListItem  key={value.id}>
                    <ListItemButton onClick={handleToggle(value.id)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={value.label} />
                        <Chip label={value.count} />
                        </ListItemButton>
                </ListItem>
                ))}
            </List>    
        </Paper>
    )
}
export {SkillFilter, LangueFilter, FolderItem, UploadButton}